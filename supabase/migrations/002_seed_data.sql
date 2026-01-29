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
SELECT id, title, "order" FROM (
  VALUES 
    ('Porteiro', 1),
    ('Frentista', 2),
    ('Fiscal de Loja', 3),
    ('Cuidador de Idosos', 4),
    ('Atendimento de Farmácia', 5),
    ('Operador de Caixa', 6),
    ('Telemarketing', 7),
    ('Elaboração de Currículo', 8)
) AS courses(title, "order")
WHERE track_id = (SELECT id FROM tracks WHERE title = 'Primeira Oportunidade')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 3. INSERIR CURSOS - ADMINISTRATIVA
-- ============================================================================
INSERT INTO courses (track_id, title, "order")
SELECT (SELECT id FROM tracks WHERE title = 'Administrativa'), title, "order" FROM (
  VALUES 
    ('Administração', 1),
    ('Técnicas de Vendas', 2),
    ('Contabilidade', 3),
    ('Departamento Pessoal', 4),
    ('Gestão de RH', 5),
    ('Conhecimentos Bancários', 6),
    ('Estoque e Faturamento', 7)
) AS courses(title, "order")
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 4. INSERIR CURSOS - ÁREA DA BELEZA
-- ============================================================================
INSERT INTO courses (track_id, title, "order")
SELECT (SELECT id FROM tracks WHERE title = 'Área da Beleza'), title, "order" FROM (
  VALUES 
    ('Maquiagem', 1),
    ('Designer de Cílios', 2),
    ('Massagem Modeladora', 3),
    ('Manicure e Pedicure', 4),
    ('Barbeiro', 5),
    ('Instagram para Vendas', 6),
    ('Empreendedorismo', 7)
) AS courses(title, "order")
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 5. INSERIR CURSOS - INFORMÁTICA E TECNOLOGIA
-- ============================================================================
INSERT INTO courses (track_id, title, "order")
SELECT (SELECT id FROM tracks WHERE title = 'Informática e Tecnologia'), title, "order" FROM (
  VALUES 
    ('Windows', 1),
    ('Segurança na Internet', 2),
    ('Word', 3),
    ('Excel', 4),
    ('PowerPoint', 5),
    ('Introdução a Internet', 6),
    ('Digitação', 7),
    ('Manutenção de PC', 8)
) AS courses(title, "order")
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 6. INSERIR CURSOS - PREPARATÓRIOS
-- ============================================================================
INSERT INTO courses (track_id, title, "order")
SELECT (SELECT id FROM tracks WHERE title = 'Preparatórios'), title, "order" FROM (
  VALUES 
    ('Português', 1),
    ('Redação', 2),
    ('Matemática', 3),
    ('História', 4),
    ('Geografia', 5),
    ('Biologia', 6),
    ('Física', 7),
    ('Química', 8),
    ('Filosofia', 9),
    ('Sociologia', 10),
    ('Artes', 11)
) AS courses(title, "order")
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 7. INSERIR CURSOS - MÍDIAS DIGITAIS
-- ============================================================================
INSERT INTO courses (track_id, title, "order")
SELECT (SELECT id FROM tracks WHERE title = 'Mídias Digitais'), title, "order" FROM (
  VALUES 
    ('Marketing Digital', 1),
    ('Instagram para Vendas', 2),
    ('Mídias Digitais', 3),
    ('YouTube', 4),
    ('Canva', 5),
    ('Operador de Podcast', 6),
    ('Photoshop CC', 7),
    ('Edição de Vídeo Premiere', 8)
) AS courses(title, "order")
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
INSERT INTO plan_features (plan_id, feature, "order")
SELECT id, feature, "order" FROM (
  VALUES
    ('Todos os cursos disponíveis', 1),
    ('Certificados inclusos', 2),
    ('Acesso por 1 mês', 3),
    ('Perfeito para começar', 4)
) AS features(feature, "order")
WHERE plan_id = (SELECT id FROM plans WHERE name = 'Plano Mensal')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 10. INSERIR BENEFÍCIOS DO PLANO ANUAL
-- ============================================================================
INSERT INTO plan_features (plan_id, feature, "order")
SELECT id, feature, "order" FROM (
  VALUES
    ('Todos os cursos disponíveis', 1),
    ('Certificados inclusos', 2),
    ('Melhor custo-benefício', 3),
    ('Ideal para quem pensa no médio e longo prazo', 4)
) AS features(feature, "order")
WHERE plan_id = (SELECT id FROM plans WHERE name = 'Plano Anual')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 11. INSERIR BENEFÍCIOS DO PLANO SEMESTRAL
-- ============================================================================
INSERT INTO plan_features (plan_id, feature, "order")
SELECT id, feature, "order" FROM (
  VALUES
    ('Todos os cursos disponíveis', 1),
    ('Certificados inclusos', 2),
    ('Acesso por 6 meses', 3)
) AS features(feature, "order")
WHERE plan_id = (SELECT id FROM plans WHERE name = 'Plano Semestral')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- VERIFICAÇÃO FINAL
-- ============================================================================
-- Descomente para verificar se os dados foram inseridos corretamente:
-- SELECT COUNT(*) as total_trilhas FROM tracks;
-- SELECT COUNT(*) as total_cursos FROM courses;
-- SELECT COUNT(*) as total_planos FROM plans;
-- SELECT COUNT(*) as total_beneficios FROM plan_features;
