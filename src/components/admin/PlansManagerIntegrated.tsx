import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Trash2, Edit2, Save, X, Plus } from 'lucide-react';
import { usePlans } from '@/hooks/usePlans';
import { updatePlan, deletePlan, addPlanFeature, updatePlanFeature, deletePlanFeature } from '@/lib/plans-service';
import { Plan } from '@/lib/plans-service';
import { Crown, Target, Zap } from 'lucide-react';

const PlansManagerIntegrated = () => {
  const { plans, loading, error, refetch } = usePlans();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [saving, setSaving] = useState(false);

  const handleEdit = (plan: Plan) => {
    setEditingId(plan.id);
    setEditingPlan({ ...plan });
  };

  const handleSave = async () => {
    if (!editingPlan) return;

    setSaving(true);
    try {
      // Atualizar plano
      await updatePlan(editingPlan.id, {
        name: editingPlan.name,
        description: editingPlan.description,
        price: editingPlan.price,
        period: editingPlan.period,
        highlight: editingPlan.highlight,
        popular: editingPlan.popular,
        hotmart_url: editingPlan.hotmart_url,
      });

      // Sincronizar benefícios
      if (editingPlan.features) {
        const originalPlan = plans.find(p => p.id === editingPlan.id);
        const originalFeatures = originalPlan?.features || [];

        // Deletar benefícios removidos
        for (const feature of originalFeatures) {
          if (!editingPlan.features.find(f => f.id === feature.id)) {
            await deletePlanFeature(feature.id);
          }
        }

        // Adicionar/atualizar benefícios
        for (let i = 0; i < editingPlan.features.length; i++) {
          const feature = editingPlan.features[i];
          if (!feature.id || feature.id.startsWith('temp-')) {
            // Novo benefício
            await addPlanFeature(editingPlan.id, feature.feature, i);
          } else {
            // Benefício existente
            await updatePlanFeature(feature.id, feature.feature);
          }
        }
      }

      toast.success('Plano atualizado com sucesso!');
      setEditingId(null);
      setEditingPlan(null);
      refetch();
    } catch (error) {
      toast.error('Erro ao salvar plano');
      console.error('Error saving plan:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingPlan(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar este plano? Todos os benefícios serão deletados também.')) {
      try {
        await deletePlan(id);
        toast.success('Plano removido!');
        refetch();
      } catch (error) {
        toast.error('Erro ao deletar plano');
        console.error('Error deleting plan:', error);
      }
    }
  };

  const handleAddFeature = () => {
    if (editingPlan) {
      const newFeature = {
        id: `temp-${Date.now()}`,
        plan_id: editingPlan.id,
        feature: '',
        order: editingPlan.features?.length || 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setEditingPlan({
        ...editingPlan,
        features: [...(editingPlan.features || []), newFeature]
      });
    }
  };

  const handleRemoveFeature = (featureId: string) => {
    if (editingPlan) {
      setEditingPlan({
        ...editingPlan,
        features: editingPlan.features?.filter(f => f.id !== featureId) || []
      });
    }
  };

  const handleFeatureChange = (featureId: string, value: string) => {
    if (editingPlan) {
      const newFeatures = editingPlan.features?.map(f =>
        f.id === featureId ? { ...f, feature: value } : f
      ) || [];
      setEditingPlan({
        ...editingPlan,
        features: newFeatures
      });
    }
  };

  const getIconComponent = (iconName: string) => {
    const Icons: Record<string, JSX.Element> = {
      'Crown': <Crown className="w-6 h-6" />,
      'Target': <Target className="w-6 h-6" />,
      'Zap': <Zap className="w-6 h-6" />,
    };
    return Icons[iconName] || <Target className="w-6 h-6" />;
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center text-muted-foreground">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          Carregando planos...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-destructive/10 border border-destructive text-destructive rounded-lg p-4">
          <p className="font-medium mb-2">Erro ao carregar planos</p>
          <p className="text-sm mb-4">{error.message}</p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Tentar Novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Gerenciar Planos</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => refetch()}
        >
          ↻ Sincronizar
        </Button>
      </div>

      <div className="space-y-4">
        {plans.map((plan) => (
          <Card key={plan.id} className={`p-6 transition-all ${editingId === plan.id ? 'ring-2 ring-primary' : ''}`}>
            {editingId === plan.id && editingPlan ? (
              // Edit Mode
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nome do Plano</label>
                  <Input
                    value={editingPlan.name}
                    onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                    placeholder="ex: Plano Mensal"
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Descrição</label>
                  <Input
                    value={editingPlan.description}
                    onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                    placeholder="ex: Acesso completo à plataforma por 1 mês"
                    className="h-10"
                  />
                </div>

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

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Destaque (opcional)</label>
                  <Input
                    value={editingPlan.highlight}
                    onChange={(e) => setEditingPlan({ ...editingPlan, highlight: e.target.value })}
                    placeholder="ex: Mais vantajoso"
                    className="h-10"
                  />
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <input
                    type="checkbox"
                    id="popular"
                    checked={editingPlan.popular}
                    onChange={(e) => setEditingPlan({ ...editingPlan, popular: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="popular" className="text-sm font-medium text-foreground cursor-pointer">
                    Marcar como plano popular
                  </label>
                </div>

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
                      Adicionar
                    </Button>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2 max-h-64 overflow-y-auto">
                    {editingPlan.features?.map((feature) => (
                      <div key={feature.id} className="flex gap-2">
                        <Input
                          value={feature.feature}
                          onChange={(e) => handleFeatureChange(feature.id, e.target.value)}
                          placeholder="ex: Todos os cursos disponíveis"
                          className="h-9 flex-1"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFeature(feature.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">URL Hotmart</label>
                  <Input
                    value={editingPlan.hotmart_url}
                    onChange={(e) => setEditingPlan({ ...editingPlan, hotmart_url: e.target.value })}
                    placeholder="https://pay.hotmart.com/..."
                    className="h-10 text-xs"
                  />
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button 
                    onClick={handleSave}
                    variant="hero"
                    size="sm"
                    className="flex items-center gap-2 flex-1"
                    disabled={saving}
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Salvando...' : 'Salvar'}
                  </Button>
                  <Button 
                    onClick={handleCancel}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    disabled={saving}
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

                    {plan.features && plan.features.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase">Benefícios</p>
                        <ul className="space-y-1">
                          {plan.features.map((feature) => (
                            <li key={feature.id} className="text-sm text-foreground flex items-center gap-2">
                              <span className="text-primary">✓</span>
                              {feature.feature}
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

      <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4 text-sm text-green-900 dark:text-green-100">
        <p className="font-medium mb-1">✅ Sincronizado com Supabase</p>
        <p>Todas as alterações são salvas automaticamente no banco de dados.</p>
      </div>
    </div>
  );
};

export default PlansManagerIntegrated;
