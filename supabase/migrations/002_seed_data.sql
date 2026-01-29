-- ============================================================================
-- Migração: Dados Iniciais do Painel Admin
-- Data: 2025
-- Descrição: Popula as tabelas com dados iniciais de trilhas, cursos e planos
-- ============================================================================

-- ============================================================================
-- 1. INSERIR TRILHAS INICIAIS
-- ============================================================================
INSERT INTO tracks (title, icon, color, "order") VALUES
  ('Primeira Oportunidade', 'Rocket', 'from-blue-500 to-blue-600', 1),
  ('Administrativa', 'Briefcase', 'from-purple-500 to-purple-600', 2),
  ('Área da Beleza', 'Sparkles', 'from-pink-500 to-pink-600', 3),
  ('Informática e Tecnologia', 'Monitor', 'from-cyan-500 to-cyan-600', 4),
  ('Preparatórios', 'GraduationCap', 'from-green-500 to-green-600', 5),
  ('Mídias Digitais', 'Share2', 'from-red-500 to-red-600', 6)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 2. INSERIR CURSOS - PRIMEIRA OPORTUNIDADE
-- ============================================================================
INSERT INTO courses (track_id, title, "order")
VALUES 
  ((SELECT id FROM tracks WHERE title = 'Primeira Oportunidade'), 'Porteiro', 1),
  ((SELECT id FROM tracks WHERE title = 'Primeira Oportunidade'), 'Frentista', 2),
  ((SELECT id FROM tracks WHERE title = 'Primeira Oportunidade'), 'Fiscal de Loja', 3),
  ((SELECT id FROM tracks WHERE title = 'Primeira Oportunidade'), 'Cuidador de Idosos', 4),
  ((SELECT id FROM tracks WHERE title = 'Primeira Oportunidade'), 'Atendimento de Farmácia', 5),
  ((SELECT id FROM tracks WHERE title = 'Primeira Oportunidade'), 'Operador de Caixa', 6),
  ((SELECT id FROM tracks WHERE title = 'Primeira Oportunidade'), 'Telemarketing', 7),
  ((SELECT id FROM tracks WHERE title = 'Primeira Oportunidade'), 'Elaboração de Currículo', 8)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 3. INSERIR CURSOS - ADMINISTRATIVA
-- ============================================================================
INSERT INTO courses (track_id, title, "order")
VALUES 
  ((SELECT id FROM tracks WHERE title = 'Administrativa'), 'Administração', 1),
  ((SELECT id FROM tracks WHERE title = 'Administrativa'), 'Técnicas de Vendas', 2),
  ((SELECT id FROM tracks WHERE title = 'Administrativa'), 'Contabilidade', 3),
  ((SELECT id FROM tracks WHERE title = 'Administrativa'), 'Departamento Pessoal', 4),
  ((SELECT id FROM tracks WHERE title = 'Administrativa'), 'Gestão de RH', 5),
  ((SELECT id FROM tracks WHERE title = 'Administrativa'), 'Conhecimentos Bancários', 6),
  ((SELECT id FROM tracks WHERE title = 'Administrativa'), 'Estoque e Faturamento', 7)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 4. INSERIR CURSOS - ÁREA DA BELEZA
-- ============================================================================
INSERT INTO courses (track_id, title, "order")
VALUES 
  ((SELECT id FROM tracks WHERE title = 'Área da Beleza'), 'Maquiagem', 1),
  ((SELECT id FROM tracks WHERE title = 'Área da Beleza'), 'Designer de Cílios', 2),
  ((SELECT id FROM tracks WHERE title = 'Área da Beleza'), 'Massagem Modeladora', 3),
  ((SELECT id FROM tracks WHERE title = 'Área da Beleza'), 'Manicure e Pedicure', 4),
  ((SELECT id FROM tracks WHERE title = 'Área da Beleza'), 'Barbeiro', 5),
  ((SELECT id FROM tracks WHERE title = 'Área da Beleza'), 'Instagram para Vendas', 6),
  ((SELECT id FROM tracks WHERE title = 'Área da Beleza'), 'Empreendedorismo', 7)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 5. INSERIR CURSOS - INFORMÁTICA E TECNOLOGIA
-- ============================================================================
INSERT INTO courses (track_id, title, "order")
VALUES 
  ((SELECT id FROM tracks WHERE title = 'Informática e Tecnologia'), 'Windows', 1),
  ((SELECT id FROM tracks WHERE title = 'Informática e Tecnologia'), 'Segurança na Internet', 2),
  ((SELECT id FROM tracks WHERE title = 'Informática e Tecnologia'), 'Word', 3),
  ((SELECT id FROM tracks WHERE title = 'Informática e Tecnologia'), 'Excel', 4),
  ((SELECT id FROM tracks WHERE title = 'Informática e Tecnologia'), 'PowerPoint', 5),
  ((SELECT id FROM tracks WHERE title = 'Informática e Tecnologia'), 'Introdução a Internet', 6),
  ((SELECT id FROM tracks WHERE title = 'Informática e Tecnologia'), 'Digitação', 7),
  ((SELECT id FROM tracks WHERE title = 'Informática e Tecnologia'), 'Manutenção de PC', 8)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 6. INSERIR CURSOS - PREPARATÓRIOS
-- ============================================================================
INSERT INTO courses (track_id, title, "order")
VALUES 
  ((SELECT id FROM tracks WHERE title = 'Preparatórios'), 'Português', 1),
  ((SELECT id FROM tracks WHERE title = 'Preparatórios'), 'Redação', 2),
  ((SELECT id FROM tracks WHERE title = 'Preparatórios'), 'Matemática', 3),
  ((SELECT id FROM tracks WHERE title = 'Preparatórios'), 'História', 4),
  ((SELECT id FROM tracks WHERE title = 'Preparatórios'), 'Geografia', 5),
  ((SELECT id FROM tracks WHERE title = 'Preparatórios'), 'Biologia', 6),
  ((SELECT id FROM tracks WHERE title = 'Preparatórios'), 'Física', 7),
  ((SELECT id FROM tracks WHERE title = 'Preparatórios'), 'Química', 8),
  ((SELECT id FROM tracks WHERE title = 'Preparatórios'), 'Filosofia', 9),
  ((SELECT id FROM tracks WHERE title = 'Preparatórios'), 'Sociologia', 10),
  ((SELECT id FROM tracks WHERE title = 'Preparatórios'), 'Artes', 11)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 7. INSERIR CURSOS - MÍDIAS DIGITAIS
-- ============================================================================
INSERT INTO courses (track_id, title, "order")
VALUES 
  ((SELECT id FROM tracks WHERE title = 'Mídias Digitais'), 'Marketing Digital', 1),
  ((SELECT id FROM tracks WHERE title = 'Mídias Digitais'), 'Instagram para Vendas', 2),
  ((SELECT id FROM tracks WHERE title = 'Mídias Digitais'), 'Mídias Digitais', 3),
  ((SELECT id FROM tracks WHERE title = 'Mídias Digitais'), 'YouTube', 4),
  ((SELECT id FROM tracks WHERE title = 'Mídias Digitais'), 'Canva', 5),
  ((SELECT id FROM tracks WHERE title = 'Mídias Digitais'), 'Operador de Podcast', 6),
  ((SELECT id FROM tracks WHERE title = 'Mídias Digitais'), 'Photoshop CC', 7),
  ((SELECT id FROM tracks WHERE title = 'Mídias Digitais'), 'Edição de Vídeo Premiere', 8)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 8. INSERIR PLANOS
-- ============================================================================
INSERT INTO plans (name, description, price, period, icon, popular, highlight, hotmart_url, "order") VALUES
  ('Plano Mensal', 'Acesso completo à plataforma por 1 mês', 47.90, 'mês', 'Target', FALSE, '', 'https://pay.hotmart.com/R73988787U?off=7duma41j', 1),
  ('Plano Anual', '12 meses de acesso ilimitado à plataforma', 397.00, 'ano', 'Crown', TRUE, 'Mais vantajoso', 'https://pay.hotmart.com/R73988787U?off=7y9rxgn1', 2),
  ('Plano Semestral', 'Acesso completo à plataforma por 6 meses', 297.00, 'semestre', 'Zap', FALSE, '', 'https://pay.hotmart.com/R73988787U?off=vaob7i7e', 3)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 9. INSERIR BENEFÍCIOS DO PLANO MENSAL
-- ============================================================================
INSERT INTO plan_features (plan_id, feature, "order") VALUES
  ((SELECT id FROM plans WHERE name = 'Plano Mensal'), 'Todos os cursos disponíveis', 1),
  ((SELECT id FROM plans WHERE name = 'Plano Mensal'), 'Certificados inclusos', 2),
  ((SELECT id FROM plans WHERE name = 'Plano Mensal'), 'Acesso por 1 mês', 3),
  ((SELECT id FROM plans WHERE name = 'Plano Mensal'), 'Perfeito para começar', 4)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 10. INSERIR BENEFÍCIOS DO PLANO ANUAL
-- ============================================================================
INSERT INTO plan_features (plan_id, feature, "order") VALUES
  ((SELECT id FROM plans WHERE name = 'Plano Anual'), 'Todos os cursos disponíveis', 1),
  ((SELECT id FROM plans WHERE name = 'Plano Anual'), 'Certificados inclusos', 2),
  ((SELECT id FROM plans WHERE name = 'Plano Anual'), 'Melhor custo-benefício', 3),
  ((SELECT id FROM plans WHERE name = 'Plano Anual'), 'Ideal para quem pensa no médio e longo prazo', 4)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 11. INSERIR BENEFÍCIOS DO PLANO SEMESTRAL
-- ============================================================================
INSERT INTO plan_features (plan_id, feature, "order") VALUES
  ((SELECT id FROM plans WHERE name = 'Plano Semestral'), 'Todos os cursos disponíveis', 1),
  ((SELECT id FROM plans WHERE name = 'Plano Semestral'), 'Certificados inclusos', 2),
  ((SELECT id FROM plans WHERE name = 'Plano Semestral'), 'Acesso por 6 meses', 3)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- VERIFICAÇÃO FINAL
-- ============================================================================
-- Descomente para verificar se os dados foram inseridos corretamente:
-- SELECT COUNT(*) as total_trilhas FROM tracks;
-- SELECT COUNT(*) as total_cursos FROM courses;
-- SELECT COUNT(*) as total_planos FROM plans;
-- SELECT COUNT(*) as total_beneficios FROM plan_features;
