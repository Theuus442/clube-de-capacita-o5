import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { LogOut, BookOpen, CreditCard, BarChart3 } from 'lucide-react';
import TracksManagerIntegrated from '@/components/admin/TracksManagerIntegrated';
import PlansManagerIntegrated from '@/components/admin/PlansManagerIntegrated';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin is authenticated
    const token = localStorage.getItem('adminToken');
    const email = localStorage.getItem('adminEmail');
    
    if (!token) {
      toast.error('Acesso negado. Faça login primeiro.');
      navigate('/admin/login');
      return;
    }
    
    setAdminEmail(email || '');
    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    toast.success('Logout realizado com sucesso');
    navigate('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <div className="bg-background/80 border-b border-border backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Painel Admin</h1>
            <p className="text-sm text-muted-foreground">Gerenciar trilhas, cursos e planos</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{adminEmail}</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatsCard 
            icon={<BookOpen className="w-6 h-6" />}
            label="Trilhas Ativas"
            value="6"
            color="from-blue-500 to-blue-600"
          />
          <StatsCard 
            icon={<CreditCard className="w-6 h-6" />}
            label="Planos Disponíveis"
            value="3"
            color="from-purple-500 to-purple-600"
          />
          <StatsCard 
            icon={<BarChart3 className="w-6 h-6" />}
            label="Total de Cursos"
            value="60+"
            color="from-green-500 to-green-600"
          />
        </div>

        {/* Tabs Section */}
        <Card className="shadow-lg">
          <Tabs defaultValue="trilhas" className="w-full">
            <TabsList className="grid w-full grid-cols-2 border-b border-border">
              <TabsTrigger value="trilhas" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Trilhas e Cursos
              </TabsTrigger>
              <TabsTrigger value="planos" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Planos
              </TabsTrigger>
            </TabsList>

            {/* Trilhas Tab */}
            <TabsContent value="trilhas" className="mt-0">
              <TracksManagerIntegrated />
            </TabsContent>

            {/* Planos Tab */}
            <TabsContent value="planos" className="mt-0">
              <PlansManagerIntegrated />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

const StatsCard = ({ 
  icon, 
  label, 
  value, 
  color 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string;
  color: string;
}) => (
  <Card className="p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-muted-foreground text-sm mb-2">{label}</p>
        <p className="font-display text-3xl font-bold text-foreground">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white/80`}>
        {icon}
      </div>
    </div>
  </Card>
);

export default AdminDashboard;
