import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Trash2, Edit2, Save, X, Plus } from 'lucide-react';
import { 
  Rocket, Briefcase, Sparkles, Monitor, 
  GraduationCap, Share2 
} from 'lucide-react';

// Initial tracks data - moved from TracksSection
const initialTracks = [
  {
    id: 1,
    icon: 'Rocket',
    title: "Primeira Oportunidade",
    courses: ["Porteiro", "Frentista", "Fiscal de Loja", "Cuidador de Idosos", "Atendimento de Farmácia", "Operador de Caixa", "Telemarketing", "Elaboração de Currículo"],
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    icon: 'Briefcase',
    title: "Administrativa",
    courses: ["Administração", "Técnicas de Vendas", "Contabilidade", "Departamento Pessoal", "Gestão de RH", "Conhecimentos Bancários", "Estoque e Faturamento"],
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 3,
    icon: 'Sparkles',
    title: "Área da Beleza",
    courses: ["Maquiagem", "Designer de Cílios", "Massagem Modeladora", "Manicure e Pedicure", "Barbeiro", "Instagram para Vendas", "Empreendedorismo"],
    color: "from-pink-500 to-pink-600",
  },
  {
    id: 4,
    icon: 'Monitor',
    title: "Informática e Tecnologia",
    courses: ["Windows", "Segurança na Internet", "Word", "Excel", "PowerPoint", "Introdução a Internet", "Digitação", "Manutenção de PC"],
    color: "from-cyan-500 to-cyan-600",
  },
  {
    id: 5,
    icon: 'GraduationCap',
    title: "Preparatórios",
    courses: ["Português", "Redação", "Matemática", "História", "Geografia", "Biologia", "Física", "Química", "Filosofia", "Sociologia", "Artes"],
    color: "from-green-500 to-green-600",
  },
  {
    id: 6,
    icon: 'Share2',
    title: "Mídias Digitais",
    courses: ["Marketing Digital", "Instagram para Vendas", "Mídias Digitais", "YouTube", "Canva", "Operador de Podcast", "Photoshop CC", "Edição de Vídeo Premiere"],
    color: "from-red-500 to-red-600",
  },
];

interface Track {
  id: number;
  icon: string;
  title: string;
  courses: string[];
  color: string;
}

const TracksManager = () => {
  const [tracks, setTracks] = useState<Track[]>(initialTracks);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTrack, setEditingTrack] = useState<Track | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleEdit = (track: Track) => {
    setEditingId(track.id);
    setEditingTrack({ ...track });
  };

  const handleSave = () => {
    if (editingTrack) {
      setTracks(tracks.map(t => t.id === editingTrack.id ? editingTrack : t));
      toast.success('Trilha atualizada com sucesso!');
      setEditingId(null);
      setEditingTrack(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingTrack(null);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja deletar esta trilha?')) {
      setTracks(tracks.filter(t => t.id !== id));
      toast.success('Trilha removida!');
    }
  };

  const handleAddCourse = (trackId: number) => {
    if (editingTrack && editingTrack.id === trackId) {
      setEditingTrack({
        ...editingTrack,
        courses: [...editingTrack.courses, '']
      });
    }
  };

  const handleRemoveCourse = (trackId: number, courseIndex: number) => {
    if (editingTrack && editingTrack.id === trackId) {
      setEditingTrack({
        ...editingTrack,
        courses: editingTrack.courses.filter((_, i) => i !== courseIndex)
      });
    }
  };

  const handleCourseChange = (trackId: number, courseIndex: number, value: string) => {
    if (editingTrack && editingTrack.id === trackId) {
      const newCourses = [...editingTrack.courses];
      newCourses[courseIndex] = value;
      setEditingTrack({
        ...editingTrack,
        courses: newCourses
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Gerenciar Trilhas e Cursos</h3>
        <Button 
          variant="hero" 
          size="sm"
          className="flex items-center gap-2"
          disabled
        >
          <Plus className="w-4 h-4" />
          Nova Trilha
        </Button>
      </div>

      <div className="space-y-4">
        {tracks.map((track) => (
          <Card key={track.id} className={`p-6 transition-all ${editingId === track.id ? 'ring-2 ring-primary' : ''}`}>
            {editingId === track.id && editingTrack ? (
              // Edit Mode
              <div className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Título da Trilha</label>
                  <Input
                    value={editingTrack.title}
                    onChange={(e) => setEditingTrack({ ...editingTrack, title: e.target.value })}
                    placeholder="Nome da trilha"
                    className="h-10"
                  />
                </div>

                {/* Color */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Cor (Tailwind Gradient)</label>
                  <Input
                    value={editingTrack.color}
                    onChange={(e) => setEditingTrack({ ...editingTrack, color: e.target.value })}
                    placeholder="from-blue-500 to-blue-600"
                    className="h-10"
                  />
                </div>

                {/* Courses */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Cursos</label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddCourse(track.id)}
                      className="flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Adicionar Curso
                    </Button>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2 max-h-64 overflow-y-auto">
                    {editingTrack.courses.map((course, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input
                          value={course}
                          onChange={(e) => handleCourseChange(track.id, idx, e.target.value)}
                          placeholder="Nome do curso"
                          className="h-9 flex-1"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveCourse(track.id, idx)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
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
                    <h4 className="font-semibold text-foreground text-lg mb-2">{track.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {track.courses.length} cursos disponíveis
                    </p>
                    
                    {expandedId === track.id && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex flex-wrap gap-2">
                          {track.courses.map((course, idx) => (
                            <span 
                              key={idx}
                              className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-md"
                            >
                              {course}
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

      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm text-blue-900 dark:text-blue-100">
        <p className="font-medium mb-1">Nota sobre persistência:</p>
        <p>As alterações estão sendo salvas em sessão. Para fazer alterações permanentes, integre com Supabase.</p>
      </div>
    </div>
  );
};

export default TracksManager;
