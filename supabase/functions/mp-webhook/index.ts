import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
const mpAccessToken = Deno.env.get('MP_ACCESS_TOKEN')

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not configured')
}

const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

// Helper function to fetch payment details from Mercado Pago
async function getPaymentDetails(paymentId: string) {
  if (!mpAccessToken) {
    console.error('❌ MP_ACCESS_TOKEN not configured')
    return null
  }

  try {
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${mpAccessToken}`,
        },
      },
    )

    if (!response.ok) {
      console.error('❌ Error fetching payment details:', response.statusText)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('❌ Error getting payment details:', error)
    return null
  }
}

// Helper function to send email notification
async function sendEmailNotification(
  email: string,
  planType: string,
  status: string,
) {
  // You can integrate with SendGrid, Resend, or another email service here
  console.log(`📧 Email notification would be sent to: ${email}`)
  console.log(`   Plan: ${planType}, Status: ${status}`)

  // Example with Resend (uncomment if you have Resend set up):
  // const resendApiKey = Deno.env.get('RESEND_API_KEY')
  // if (resendApiKey) {
  //   const response = await fetch('https://api.resend.com/emails', {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': `Bearer ${resendApiKey}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       from: 'noreply@seu-site.com',
  //       to: email,
  //       subject: `Pagamento ${status === 'approved' ? 'Confirmado' : 'Processando'}`,
  //       html: `<p>Seu pagamento do plano ${planType} foi ${status}.</p>`,
  //     }),
  //   })
  // }
}

// Webhook handler
serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  // Only accept POST and GET
  if (req.method !== 'POST' && req.method !== 'GET') {
    return new Response(
      JSON.stringify({ error: 'Método não permitido' }),
      {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }

  try {
    // Parse notification
    const url = new URL(req.url)
    const type = url.searchParams.get('type')
    const id = url.searchParams.get('id')
    const action = url.searchParams.get('action')

    console.log('🔔 Webhook recebido do Mercado Pago')
    console.log('Tipo:', type)
    console.log('ID:', id)
    console.log('Ação:', action)

    // Handle payment notifications
    if (type === 'payment' && id) {
      console.log('💳 Notificação de pagamento recebida')
      console.log('Payment ID:', id)

      // Get payment details from Mercado Pago
      const paymentDetails = await getPaymentDetails(id)

      if (!paymentDetails) {
        console.error('❌ Could not fetch payment details')
        return new Response(
          JSON.stringify({ error: 'Could not fetch payment details' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          },
        )
      }

      const paymentStatus = paymentDetails.status // approved, pending, rejected, cancelled, in_process, refunded
      const payerEmail = paymentDetails.payer?.email
      const externalReference = paymentDetails.external_reference // planType sent during preference creation

      console.log('📋 Detalhes do pagamento:')
      console.log('   Status:', paymentStatus)
      console.log('   Email:', payerEmail)
      console.log('   Reference:', externalReference)

      // Only process if we have Supabase configured
      if (supabase) {
        try {
          // Save payment record to database
          const { error: insertError } = await supabase
            .from('payments')
            .insert({
              mercado_pago_id: id,
              user_email: payerEmail,
              plan_type: externalReference || 'unknown',
              status: paymentStatus,
              payment_details: paymentDetails,
              created_at: new Date().toISOString(),
              processed_at: new Date().toISOString(),
            })

          if (insertError) {
            console.error('❌ Error saving payment to database:', insertError)
          } else {
            console.log('✅ Payment saved to database')
          }

          // If payment is approved, send confirmation email
          if (paymentStatus === 'approved' && payerEmail) {
            await sendEmailNotification(
              payerEmail,
              externalReference || 'unknown',
              'confirmado',
            )
          }

          // If payment is pending, send info that we're processing
          if (paymentStatus === 'pending' && payerEmail) {
            await sendEmailNotification(
              payerEmail,
              externalReference || 'unknown',
              'processando',
            )
          }
        } catch (dbError) {
          console.error('❌ Database error:', dbError)
        }
      } else {
        console.warn('⚠️ Supabase not configured, skipping database save')
      }

      console.log('✅ Pagamento processado com sucesso')
    }

    // Handle subscription notifications
    if (type === 'subscription' && id) {
      console.log('📅 Notificação de assinatura recebida')
      console.log('Subscription ID:', id)
      console.log('Ação:', action)

      // Actions: authorized, canceled, suspended, resumed, updated, deleted
      if (supabase) {
        try {
          // Update subscription status in database
          const { error } = await supabase
            .from('subscriptions')
            .update({
              status: action || 'unknown',
              updated_at: new Date().toISOString(),
            })
            .eq('mercado_pago_id', id)

          if (error) {
            console.error('❌ Error updating subscription:', error)
          } else {
            console.log('✅ Subscription updated in database')
          }
        } catch (dbError) {
          console.error('❌ Database error:', dbError)
        }
      }
    }

    // Return 200 OK to Mercado Pago (it needs 200 response to stop retrying)
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Notificação recebida',
        type,
        id,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      },
    )
  } catch (error) {
    console.error('❌ Erro ao processar webhook:', error)

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      },
    )
  }
})
