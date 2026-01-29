import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Lock, Mail } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Integrate with Supabase Auth or backend verification
      // For now, using simple validation - replace with actual auth
      const adminEmail = 'admin@threynnare.com.br';
      const adminPassword = 'admin123'; // Should be moved to secure backend validation

      if (email === adminEmail && password === adminPassword) {
        // Store auth token in localStorage (simplified)
        localStorage.setItem('adminToken', 'authenticated');
        localStorage.setItem('adminEmail', email);
        toast.success('Login realizado com sucesso!');
        navigate('/admin/dashboard');
      } else {
        toast.error('Email ou senha incorretos');
      }
    } catch (error) {
      toast.error('Erro ao fazer login');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">Painel Admin</h1>
            <p className="text-muted-foreground text-sm mt-2">Acesso restrito a administradores</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@threynnare.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="h-10"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Senha
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="h-10"
                required
              />
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              variant="hero" 
              size="lg" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Autenticando...' : 'Entrar'}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center mb-3">Credenciais de Demonstração:</p>
            <div className="bg-muted/50 rounded-lg p-3 space-y-1 text-xs text-muted-foreground">
              <p><span className="font-medium">Email:</span> admin@threynnare.com.br</p>
              <p><span className="font-medium">Senha:</span> admin123</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;
