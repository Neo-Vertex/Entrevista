import type { ReactNode } from 'react'
import { Nav } from '../components/Nav'
import './Habilidades.css'

type Proof = { text: ReactNode; tags: string[] }
type Category = { num: string; title: string; lede: string; proofs: Proof[] }
type CovRow = { req: string; status: 'ok' | 'partial' | 'gap'; label: string }

const CATEGORIES: Category[] = [
  {
    num: '01',
    title: 'Automação & agentes de IA',
    lede: 'O fio condutor de quase todo o portfólio — e o que mais se aproxima do dia a dia da vaga.',
    proofs: [
      { text: 'Orquestração de agentes conversacionais com LangChain + n8n: memória persistente, ferramentas customizadas, sub-workflows encadeados.', tags: ['Aquarise', 'Espaço Família', 'NeoVertex', '+3'] },
      { text: 'Agente com múltiplos provedores de LLM no mesmo fluxo (OpenAI GPT + Google Gemini).', tags: ['Sushi Rodo'] },
      { text: 'Pipeline de voz completo: transcrição (Whisper), geração de fala (ElevenLabs) e telefonia (Twilio/Retell AI).', tags: ['Aquarise', 'Espaço Família'] },
      { text: 'Atendimento multi-canal (WhatsApp + Chatwoot + Baileys/Z-API) com escalonamento automático para humano.', tags: ['6 de 9 projetos'] },
      { text: 'Agente com 18 ferramentas em produção, incluindo endpoint atômico desenhado para evitar race condition em tool-calling paralelo.', tags: ['Espaço Família'] },
      { text: 'Automação de ação física no mundo real: impressão automática de comanda via integração com PrintNode.', tags: ['Sushi Rodo'] },
      { text: 'RPA clássico de automação de desktop com Macro Expert, além da automação orientada a API/IA via n8n.', tags: ['Macro Expert'] },
      { text: 'Proteções de produção desenhadas para o bot: rate limiting, anti-loop, anti-flood, sanitização de output.', tags: ['Skin Tech', 'Espaço Família'] },
    ],
  },
  {
    num: '02',
    title: 'Backend & banco de dados',
    lede: 'Modelagem de dados e regras de negócio no servidor, não só CRUD.',
    proofs: [
      { text: 'Modelagem relacional em PostgreSQL puro (SQL cru, sem ORM), com 113 migrations incrementais versionadas.', tags: ['Espaço Família'] },
      { text: <>Controle de concorrência com <code>pg_advisory_xact_lock</code> para evitar duplo agendamento simultâneo.</>, tags: ['Espaço Família'] },
      { text: 'Scripts em Python para tarefas pontuais de banco de dados, como rodar migrations — não é um projeto completo na linguagem, mas é código real em produção.', tags: ['Python · scripts'] },
      { text: 'ORM Prisma com testes de integração reais (Vitest + Supertest) rodando contra banco de teste isolado.', tags: ['Maranatha'] },
      { text: 'RBAC granular multi-perfil (staff, paciente, bot) com cache em memória e privilégio mínimo por padrão.', tags: ['Espaço Família'] },
      { text: 'API REST modular com autenticação JWT e rotas protegidas.', tags: ['Aquarise', 'Maranatha', 'Espaço Família'] },
      { text: 'Migração de arquitetura em produção (BaaS/Supabase → Postgres self-hosted) sem interromper o sistema.', tags: ['Espaço Família'] },
      { text: 'Controle de estoque multi-loja com trilha de auditoria e vendas consignadas.', tags: ['Aquarise'] },
    ],
  },
  {
    num: '03',
    title: 'Frontend & experiência',
    lede: 'De painéis administrativos a interações visuais que exigiram debugging de baixo nível.',
    proofs: [
      { text: 'React 18/19 + TypeScript + Vite, com shadcn/ui e TanStack Query.', tags: ['Aquarise', 'Maranatha', 'Espaço Família'] },
      { text: 'Animações scroll-driven com GSAP/ScrollTrigger e processamento de vídeo em tempo real (chroma-key via Canvas API).', tags: ['Skin Tech'] },
      { text: 'Gráficos 3D/WebGL interativos com Three.js (drag, inércia, fallback seguro se WebGL falhar).', tags: ['LUAZUL'] },
      { text: 'Internacionalização completa, até 6 idiomas simultâneos com fallback resiliente.', tags: ['Skin Tech', 'Aquarise', 'Avantgarde'] },
      { text: 'Debugging cross-browser de baixo nível: crash de memória e autoplay de vídeo quebrado no Safari/iOS, resolvidos com causa raiz identificada.', tags: ['LUAZUL', 'Skin Tech'] },
      { text: 'Interações touch customizadas — carrossel com drag, momentum e física, sem bibliotecas externas.', tags: ['Skin Tech'] },
    ],
  },
  {
    num: '04',
    title: 'DevOps & infraestrutura',
    lede: 'Do código em produção de verdade, com monitoramento — não só "funciona na minha máquina".',
    proofs: [
      { text: 'Docker multi-stage (build + runtime numa imagem só) em praticamente todos os projetos.', tags: ['8 de 9 projetos'] },
      { text: 'Deploy contínuo via Coolify com CI/CD automático (push-to-deploy).', tags: ['NeoVertex', 'LUAZUL'] },
      { text: 'Observabilidade em produção com métricas Prometheus customizadas, prontas para Grafana.', tags: ['Espaço Família'] },
      { text: 'Analytics self-hosted (Umami) como alternativa deliberada a serviços de terceiros na nuvem.', tags: ['NeoVertex', 'Skin Tech'] },
      { text: 'Scripts de boot resilientes, com diagnóstico e tolerância a falha parcial em produção.', tags: ['Maranatha'] },
    ],
  },
  {
    num: '05',
    title: 'Integrações de negócio & regionais',
    lede: 'Adaptação a regras de mercados específicos, não só integração técnica genérica.',
    proofs: [
      { text: 'Pagamentos regionais: TWINT (Suíça) e Asaas (Brasil) no mesmo fluxo de vendas.', tags: ['Aquarise'] },
      { text: 'Simuladores financeiros reais (juros compostos e lineares) aplicados a produtos de investimento distintos.', tags: ['Avantgarde'] },
      { text: 'Integração com sistema legado de terceiros (Clinicorp) via import/export de planilhas.', tags: ['Espaço Família'] },
      { text: 'CRM funcional sem backend — Kanban de leads, agenda com notificações nativas do navegador.', tags: ['Avantgarde'] },
    ],
  },
  {
    num: '06',
    title: 'Metodologia & qualidade',
    lede: 'Como o trabalho é conduzido, não só o que é entregue.',
    proofs: [
      { text: 'Desenvolvimento orientado a spec e plano documentados antes de codar.', tags: ['LUAZUL', 'Maranatha'] },
      { text: 'Testes de regressão nomeados por incidentes reais já corrigidos (não testes genéricos).', tags: ['Espaço Família'] },
      { text: 'QA visual automatizado com Playwright antes de cada ajuste de UI.', tags: ['LUAZUL'] },
      { text: 'Documentação técnica de nível profissional — arquitetura, runbooks, design system, roadmap priorizado.', tags: ['NeoVertex', 'Avantgarde'] },
      { text: 'Reuniões de alinhamento recorrentes, tanto com equipe técnica quanto com o dono do negócio/cliente, pra manter escopo e prioridade sincronizados.', tags: ['reuniões de alinhamento'] },
    ],
  },
]

const COV_OBRIGATORIOS: CovRow[] = [
  { req: 'Automação de processos', status: 'ok', label: 'comprovado' },
  { req: 'Integração via API', status: 'ok', label: 'comprovado' },
  { req: 'Python avançado', status: 'partial', label: 'parcial (scripts, sem projeto completo)' },
  { req: 'SQL', status: 'ok', label: 'comprovado' },
  { req: 'Solução ponta a ponta', status: 'ok', label: 'comprovado' },
  { req: 'Autonomia / ownership', status: 'ok', label: 'comprovado' },
  { req: 'Comunicação com stakeholders', status: 'ok', label: 'comprovado (reuniões de alinhamento)' },
  { req: 'Ambiente de transformação', status: 'ok', label: 'comprovado' },
]

const COV_DIFERENCIAIS: CovRow[] = [
  { req: 'RPA', status: 'ok', label: 'comprovado (Macro Expert)' },
  { req: 'IA generativa / LLMs', status: 'ok', label: 'forte' },
  { req: 'Desenvolvimento de agentes de IA', status: 'ok', label: 'forte' },
  { req: 'Arquitetura de integração', status: 'ok', label: 'comprovado' },
  { req: 'Automação em larga escala', status: 'partial', label: 'parcial' },
  { req: 'Monitoramento / governança', status: 'ok', label: 'comprovado' },
  { req: 'Low-code / no-code', status: 'ok', label: 'comprovado' },
  { req: 'Operação orientada a dados', status: 'partial', label: 'parcial' },
  { req: 'Empresa de tecnologia/SaaS', status: 'partial', label: 'produtos SaaS-like, não empresa SaaS' },
]

export default function Habilidades() {
  return (
    <div className="page">
      <div className="eyebrow">Portfólio técnico · 9 projetos reais analisados</div>
      <h1 className="habilidades-title">Habilidades em Automação, Integrações e IA</h1>
      <p className="lede">
        Levantamento feito projeto por projeto — <b>Aquarise, NeoVertex, Espaço Família, Maranatha Digital, LUAZUL,
        Avantgarde Investment, Skin Tech Switzerland e Sushi Rodo</b> — mostrando o que cada um prova na prática, não
        só o que está no currículo.
      </p>
      <Nav current="/habilidades" />

      <hr className="masthead-rule" />

      {CATEGORIES.map((cat) => (
        <section className="category" key={cat.num}>
          <div className="cat-head">
            <span className="cat-num">{cat.num}</span>
            <h2>{cat.title}</h2>
          </div>
          <p className="cat-lede">{cat.lede}</p>
          <div className="proof-list">
            {cat.proofs.map((proof, i) => (
              <div className="proof" key={i}>
                <p>{proof.text}</p>
                <div className="proof-evidence">
                  {proof.tags.map((tag) => (
                    <span className="proj-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="category">
        <div className="cat-head">
          <span className="cat-num">07</span>
          <h2>Cobertura dos requisitos da vaga</h2>
        </div>
        <p className="cat-lede">Comparação honesta com o que a Arco Educação pede — inclusive o que ainda não está comprovado.</p>

        <div className="coverage-group">
          <h3>Obrigatórios</h3>
          {COV_OBRIGATORIOS.map((row) => (
            <div className="cov-row" key={row.req}>
              <span className="cov-req">{row.req}</span>
              <span className={`status-pill ${row.status}`}>{row.label}</span>
            </div>
          ))}
        </div>

        <div className="coverage-group">
          <h3>Diferenciais</h3>
          {COV_DIFERENCIAIS.map((row) => (
            <div className="cov-row" key={row.req}>
              <span className="cov-req">{row.req}</span>
              <span className={`status-pill ${row.status}`}>{row.label}</span>
            </div>
          ))}
        </div>

        <div className="callout">
          <p>
            <strong>Ponto de atenção real:</strong> Python avançado é obrigatório na vaga e não há um projeto
            completo na linguagem entre os 9 analisados — todos usam TypeScript/JavaScript/Node no backend. Mas não
            é um vazio total: já existem scripts em Python escritos para tarefas pontuais, como rodar migrations de
            banco de dados. O argumento honesto pra levar na entrevista: esse ponto de partida real + forte domínio
            de IA generativa (comprovado em quase todo o portfólio) + hábito de estudar documentação nova rápido —
            base concreta pra evoluir de scripts pontuais pra RPA completo em Python, em vez de alegar experiência
            que não existe.
          </p>
        </div>
      </section>

      <footer className="page-footer">
        <span className="proj-count">9 projetos</span> — Aquarise, NeoVertex, Espaço Família, Maranatha Digital,
        LUAZUL, Avantgarde Investment, Skin Tech Switzerland, Sushi Rodo (n8n) + este próprio agente New
      </footer>
    </div>
  )
}
