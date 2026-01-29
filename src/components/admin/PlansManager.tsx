import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Trash2, Edit2, Save, X, Plus } from 'lucide-react';
import { Crown, Target, Zap } from 'lucide-react';

// Initial plans data - moved from PlansSection
const initialPlans = [
  {
    id: "mensal",
    name: "Plano Mensal",
    description: "Acesso completo à plataforma por 1 mês",
    price: "47,90",
    period: "mês",
    features: [
      "Todos os cursos disponíveis",
      "Certificados inclusos",
      "Acesso por 1 mês",
      "Perfeito para começar",
    ],
    icon: 'Target',
    popular: false,
    highlight: "",
    hotmartUrl: "https://pay.hotmart.com/R73988787U?off=7duma41j",
  },
  {
    id: "anual",
    name: "Plano Anual",
    description: "12 meses de acesso ilimitado à plataforma",
    price: "397",
    period: "ano",
    features: [
      "Todos os cursos disponíveis",
      "Certificados inclusos",
      "Melhor custo-benefício",
      "Ideal para quem pensa no médio e longo prazo",
    ],
    icon: 'Crown',
    popular: true,
    highlight: "Mais vantajoso",
    hotmartUrl: "https://pay.hotmart.com/R73988787U?off=7y9rxgn1",
  },
  {
    id: "semestral",
    name: "Plano Semestral",
    description: "Acesso completo à plataforma por 6 meses",
    price: "297",
    period: "semestre",
    features: [
      "Todos os cursos disponíveis",
      "Certificados inclusos",
      "Acesso por 6 meses",
    ],
    icon: 'Zap',
    popular: false,
    highlight: "",
    hotmartUrl: "https://pay.hotmart.com/R73988787U?off=vaob7i7e",
  },
];

interface Plan {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  icon: string;
  popular: boolean;
  highlight: string;
  hotmartUrl: string;
}

const PlansManager = () => {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  const handleEdit = (plan: Plan) => {
    setEditingId(plan.id);
    setEditingPlan({ ...plan });
  };

  const handleSave = () => {
    if (editingPlan) {
      setPlans(plans.map(p => p.id === editingPlan.id ? editingPlan : p));
      toast.success('Plano atualizado com sucesso!');
      setEditingId(null);
      setEditingPlan(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingPlan(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este plano?')) {
      setPlans(plans.filter(p => p.id !== id));
      toast.success('Plano removido!');
    }
  };

  const handleAddFeature = () => {
    if (editingPlan) {
      setEditingPlan({
        ...editingPlan,
        features: [...editingPlan.features, '']
      });
    }
  };

  const handleRemoveFeature = (index: number) => {
    if (editingPlan) {
      setEditingPlan({
        ...editingPlan,
        features: editingPlan.features.filter((_, i) => i !== index)
      });
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    if (editingPlan) {
      const newFeatures = [...editingPlan.features];
      newFeatures[index] = value;
      setEditingPlan({
        ...editingPlan,
        features: newFeatures
      });
    }
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Crown':
        return <Crown className="w-6 h-6" />;
      case 'Target':
        return <Target className="w-6 h-6" />;
      case 'Zap':
        return <Zap className="w-6 h-6" />;
      default:
        return <Target className="w-6 h-6" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Gerenciar Planos</h3>
        <Button 
          variant="hero" 
          size="sm"
          className="flex items-center gap-2"
          disabled
        >
          <Plus className="w-4 h-4" />
          Novo Plano
        </Button>
      </div>

      <div className="space-y-4">
        {plans.map((plan) => (
          <Card key={plan.id} className={`p-6 transition-all ${editingId === plan.id ? 'ring-2 ring-primary' : ''}`}>
            {editingId === plan.id && editingPlan ? (
              // Edit Mode
              <div className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nome do Plano</label>
                  <Input
                    value={editingPlan.name}
                    onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                    placeholder="ex: Plano Mensal"
                    className="h-10"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Descrição</label>
                  <Input
                    value={editingPlan.description}
                    onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                    placeholder="ex: Acesso completo à plataforma por 1 mês"
                    className="h-10"
                  />
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Preço (R$)</label>
                    <Input
                      value={editingPlan.price}
                      onChange={(e) => setEditingPlan({ ...editingPlan, price: e.target.value })}
                      placeholder="0,00"
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Período</label>
                    <Input
                      value={editingPlan.period}
                      onChange={(e) => setEditingPlan({ ...editingPlan, period: e.target.value })}
                      placeholder="ex: mês, semestre, ano"
                      className="h-10"
                    />
                  </div>
                </div>

                {/* Highlight */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Destaque (opcional)</label>
                  <Input
                    value={editingPlan.highlight}
                    onChange={(e) => setEditingPlan({ ...editingPlan, highlight: e.target.value })}
                    placeholder="ex: Mais vantajoso"
                    className="h-10"
                  />
                </div>

                {/* Popular Toggle */}
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <input
                    type="checkbox"
                    id="popular"
                    checked={editingPlan.popular}
                    onChange={(e) => setEditingPlan({ ...editingPlan, popular: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="popular" className="text-sm font-medium text-foreground cursor-pointer">
                    Marcar como plano popular (destaque especial)
                  </label>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Benefícios</label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddFeature}
                      className="flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Adicionar Benefício
                    </Button>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2 max-h-64 overflow-y-auto">
                    {editingPlan.features.map((feature, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => handleFeatureChange(idx, e.target.value)}
                          placeholder="ex: Todos os cursos disponíveis"
                          className="h-9 flex-1"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFeature(idx)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hotmart URL */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">URL Hotmart</label>
                  <Input
                    value={editingPlan.hotmartUrl}
                    onChange={(e) => setEditingPlan({ ...editingPlan, hotmartUrl: e.target.value })}
                    placeholder="https://pay.hotmart.com/..."
                    className="h-10 text-xs"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button 
                    onClick={handleSave}
                    variant="hero"
                    size="sm"
                    className="flex items-center gap-2 flex-1"
                  >
                    <Save className="w-4 h-4" />
                    Salvar Alterações
                  </Button>
                  <Button 
                    onClick={handleCancel}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <X className="w-4 h-4" />
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-muted-foreground">
                        {getIconComponent(plan.icon)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-foreground text-lg">{plan.name}</h4>
                          {plan.popular && (
                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{plan.description}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Preço: </span>
                        <span className="font-semibold text-foreground">R$ {plan.price} / {plan.period}</span>
                      </div>
                    </div>

                    {plan.features.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase">Benefícios</p>
                        <ul className="space-y-1">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="text-sm text-foreground flex items-center gap-2">
                              <span className="text-primary">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button
                    onClick={() => handleEdit(plan)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 flex-1"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleDelete(plan.id)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm text-blue-900 dark:text-blue-100">
        <p className="font-medium mb-1">Nota sobre persistência:</p>
        <p>As alterações estão sendo salvas em sessão. Para fazer alterações permanentes, integre com Supabase.</p>
      </div>
    </div>
  );
};

export default PlansManager;
