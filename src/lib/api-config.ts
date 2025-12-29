/**
 * Get the correct API endpoint for Mercado Pago checkout
 * In development: uses Vite proxy to avoid CORS issues
 * In production: calls Supabase function directly with proper configuration
 */
export function getMercadoPagoApiUrl(): string {
  const isDevelopment = import.meta.env.DEV;

  if (isDevelopment) {
    // Use local proxy (configured in vite.config.ts)
    return '/api/mercado-pago';
  } else {
    // Use Supabase function directly in production
    return 'https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-checkout';
  }
}

/**
 * Check if we're using the proxy (development only)
 */
export function isUsingProxy(): boolean {
  return import.meta.env.DEV;
}

/**
 * Get Supabase Anonymous Key for authentication
 */
export function getSupabaseAnonKey(): string {
  return import.meta.env.VITE_SUPABASE_ANON_KEY || '';
}

/**
 * Get Supabase URL
 */
export function getSupabaseUrl(): string {
  return import.meta.env.VITE_SUPABASE_URL || '';
}
