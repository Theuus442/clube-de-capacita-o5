import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Trash2, Edit2, Save, X, Plus } from 'lucide-react';
import { useTracks } from '@/hooks/useTracks';
import { updateTrack, deleteTrack, addCourse, updateCourse, deleteCourse } from '@/lib/tracks-service';
import { Track } from '@/lib/tracks-service';

const TracksManagerIntegrated = () => {
  const { tracks, loading, error, refetch } = useTracks();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTrack, setEditingTrack] = useState<Track | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleEdit = (track: Track) => {
    setEditingId(track.id);
    setEditingTrack({ ...track });
  };

  const handleSave = async () => {
    if (!editingTrack) return;
    
    setSaving(true);
    try {
      // Atualizar trilha
      await updateTrack(editingTrack.id, {
        title: editingTrack.title,
        color: editingTrack.color,
      });

      // Sincronizar cursos
      if (editingTrack.courses) {
        const originalCourses = tracks.find(t => t.id === editingTrack.id)?.courses || [];
        
        // Deletar cursos removidos
        for (const course of originalCourses) {
          if (!editingTrack.courses.find(c => c.id === course.id)) {
            await deleteCourse(course.id);
          }
        }

        // Adicionar/atualizar cursos
        for (let i = 0; i < editingTrack.courses.length; i++) {
          const course = editingTrack.courses[i];
          if (!course.id || course.id.startsWith('temp-')) {
            // Novo curso
            await addCourse(editingTrack.id, course.title, i);
          } else {
            // Curso existente - atualizar
            await updateCourse(course.id, course.title);
          }
        }
      }

      toast.success('Trilha atualizada com sucesso!');
      setEditingId(null);
      setEditingTrack(null);
      refetch();
    } catch (error) {
      toast.error('Erro ao salvar trilha');
      console.error('Error saving track:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingTrack(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar esta trilha? Todos os cursos serão deletados também.')) {
      try {
        await deleteTrack(id);
        toast.success('Trilha removida!');
        refetch();
      } catch (error) {
        toast.error('Erro ao deletar trilha');
        console.error('Error deleting track:', error);
      }
    }
  };

  const handleAddCourse = () => {
    if (editingTrack) {
      const newCourse = {
        id: `temp-${Date.now()}`,
        track_id: editingTrack.id,
        title: '',
        order: editingTrack.courses?.length || 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setEditingTrack({
        ...editingTrack,
        courses: [...(editingTrack.courses || []), newCourse]
      });
    }
  };

  const handleRemoveCourse = (courseId: string) => {
    if (editingTrack) {
      setEditingTrack({
        ...editingTrack,
        courses: editingTrack.courses?.filter(c => c.id !== courseId) || []
      });
    }
  };

  const handleCourseChange = (courseId: string, value: string) => {
    if (editingTrack) {
      const newCourses = editingTrack.courses?.map(c =>
        c.id === courseId ? { ...c, title: value } : c
      ) || [];
      setEditingTrack({
        ...editingTrack,
        courses: newCourses
      });
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center text-muted-foreground">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          Carregando trilhas...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-destructive/10 border border-destructive text-destructive rounded-lg p-4">
          <p className="font-medium mb-2">Erro ao carregar trilhas</p>
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
        <h3 className="text-lg font-semibold text-foreground">Gerenciar Trilhas e Cursos</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => refetch()}
        >
          ↻ Sincronizar
        </Button>
      </div>

      <div className="space-y-4">
        {tracks.map((track) => (
          <Card key={track.id} className={`p-6 transition-all ${editingId === track.id ? 'ring-2 ring-primary' : ''}`}>
            {editingId === track.id && editingTrack ? (
              // Edit Mode
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Título da Trilha</label>
                  <Input
                    value={editingTrack.title}
                    onChange={(e) => setEditingTrack({ ...editingTrack, title: e.target.value })}
                    placeholder="Nome da trilha"
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Cor (Tailwind Gradient)</label>
                  <Input
                    value={editingTrack.color}
                    onChange={(e) => setEditingTrack({ ...editingTrack, color: e.target.value })}
                    placeholder="from-blue-500 to-blue-600"
                    className="h-10"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Cursos</label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddCourse}
                      className="flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Adicionar Curso
                    </Button>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2 max-h-64 overflow-y-auto">
                    {editingTrack.courses?.map((course) => (
                      <div key={course.id} className="flex gap-2">
                        <Input
                          value={course.title}
                          onChange={(e) => handleCourseChange(course.id, e.target.value)}
                          placeholder="Nome do curso"
                          className="h-9 flex-1"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveCourse(course.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
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
                    {saving ? 'Salvando...' : 'Salvar Alterações'}
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
                    <h4 className="font-semibold text-foreground text-lg mb-2">{track.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {track.courses?.length || 0} cursos disponíveis
                    </p>
                    
                    {expandedId === track.id && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex flex-wrap gap-2">
                          {track.courses?.map((course) => (
                            <span 
                              key={course.id}
                              className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-md"
                            >
                              {course.title}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setExpandedId(expandedId === track.id ? null : track.id)}
                    className="flex-1"
                  >
                    {expandedId === track.id ? 'Ocultar Cursos' : 'Ver Cursos'}
                  </Button>
                  <Button
                    onClick={() => handleEdit(track)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleDelete(track.id)}
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

export default TracksManagerIntegrated;
