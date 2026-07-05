import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from '../components/Nav'
import './Projetos.css'

type CobreItem = { label: string; reqId: string }
type Project = {
  id: string
  num: string
  name: string
  type: string
  feito: ReactNode
  usei: string[]
  cobre: CobreItem[]
}

const PROJECTS: Project[] = [
  {
    id: 'proj-espaco-familia', num: '01', name: 'Espaço Família', type: 'clínica · agendamento e atendimento',
    feito: (
      <>
        O projeto mais completo tecnicamente do portfólio. Um agente de IA no WhatsApp assume o atendimento e
        escalona pra humano quando necessário, com 18 ferramentas próprias — incluindo um endpoint que precisei
        redesenhar pra eliminar uma condição de corrida quando o agente chamava duas ferramentas em paralelo.
        Migrei a base de Supabase (BaaS) pra PostgreSQL self-hosted em produção, sem parar o sistema. Modelei o
        banco com 113 migrations em SQL puro, sem ORM, com trava de concorrência (<code>pg_advisory_xact_lock</code>)
        pra impedir duplo agendamento. RBAC por perfil (staff/paciente/bot), testes de regressão nomeados pelos
        próprios incidentes que corrigiram, métricas Prometheus por rota, e integração com um sistema legado de
        terceiros via planilhas.
      </>
    ),
    usei: ['Node / TypeScript', 'PostgreSQL puro', 'React / Vite', 'n8n', 'Whisper', 'ElevenLabs', 'Twilio / Retell AI', 'Docker', 'Prometheus'],
    cobre: [
      { label: 'SQL', reqId: 'req-sql' },
      { label: 'Ambiente de transformação', reqId: 'req-transformacao' },
      { label: 'Arquitetura de integração', reqId: 'req-arquitetura' },
      { label: 'Governança', reqId: 'req-governanca' },
      { label: 'Escala', reqId: 'req-escala' },
      { label: 'Análise / resolução de problemas', reqId: 'req-analise' },
      { label: 'Agentes de IA', reqId: 'req-agentes' },
    ],
  },
  {
    id: 'proj-aquarise', num: '02', name: 'Aquarise', type: 'varejo multi-loja · Brasil e Suíça',
    feito: 'Atendimento automatizado por agente conversacional com memória persistente, controle de estoque multi-loja com trilha de auditoria e vendas consignadas, pagamentos regionais — TWINT na Suíça e Asaas no Brasil — no mesmo fluxo de vendas, pipeline de voz completo, e site em múltiplos idiomas.',
    usei: ['n8n + LangChain', 'React / TypeScript', 'API REST + JWT', 'TWINT', 'Asaas'],
    cobre: [
      { label: 'Integração via API', reqId: 'req-api' },
      { label: 'Arquitetura de integração', reqId: 'req-arquitetura' },
      { label: 'Escala', reqId: 'req-escala' },
    ],
  },
  {
    id: 'proj-neovertex', num: '03', name: 'NeoVertex', type: 'marca e consultoria própria do Nelson',
    feito: 'Site e operação da própria marca, com agente automatizado (LangChain), deploy contínuo, analytics self-hosted (Umami) em vez de depender de nuvem de terceiros, e documentação técnica de arquitetura, runbooks e roadmap priorizado por impacto x esforço.',
    usei: ['n8n + LangChain', 'Coolify (CI/CD)', 'Umami'],
    cobre: [
      { label: 'Comunicação com stakeholders', reqId: 'req-comunicacao' },
      { label: 'Operação orientada a dados', reqId: 'req-dados' },
    ],
  },
  {
    id: 'proj-maranatha', num: '04', name: 'Maranatha Digital', type: 'sistema web · backend orientado a dados',
    feito: 'Backend modelado com Prisma ORM e testes de integração reais (Vitest + Supertest) rodando contra um banco de teste isolado, API REST com autenticação JWT, scripts de boot resilientes com diagnóstico e tolerância a falha parcial, e desenvolvimento orientado a spec e plano documentados antes de codar.',
    usei: ['Prisma', 'Vitest / Supertest', 'Node / TypeScript', 'React / Vite'],
    cobre: [{ label: 'Integração via API', reqId: 'req-api' }],
  },
  {
    id: 'proj-luazul', num: '05', name: 'LUAZUL', type: 'experiência web 3D / imersiva',
    feito: 'Gráficos 3D/WebGL interativos (Three.js), com drag, inércia e fallback seguro se o WebGL falhar. Depurei um crash de memória no Safari/Chrome mobile causado por decodificação de WebP frame a frame, até a causa raiz, criando um modo leve com fallback. QA visual automatizado com Playwright antes de cada ajuste de interface.',
    usei: ['Three.js / WebGL', 'Playwright', 'Coolify'],
    cobre: [
      { label: 'Análise / resolução de problemas', reqId: 'req-analise' },
      { label: 'Comunicação com stakeholders', reqId: 'req-comunicacao' },
    ],
  },
  {
    id: 'proj-avantgarde', num: '06', name: 'Avantgarde Investment', type: 'simulação de investimentos',
    feito: 'Simuladores de investimento com fórmulas reais de juros compostos e lineares aplicadas a produtos distintos, um CRM funcional sem backend (Kanban de leads, agenda com notificações nativas do navegador), e site multi-idioma.',
    usei: ['React / TypeScript', 'Notification API'],
    cobre: [
      { label: 'Operação orientada a dados', reqId: 'req-dados' },
      { label: 'Comunicação com stakeholders', reqId: 'req-comunicacao' },
    ],
  },
  {
    id: 'proj-skintech', num: '07', name: 'Skin Tech Switzerland', type: 'estética · Suíça',
    feito: 'Hero em vídeo scroll-driven (GSAP/ScrollTrigger) com chroma-key em tempo real via Canvas API, site em até 6 idiomas simultâneos, interações touch customizadas (carrossel com drag, momentum e física, sem bibliotecas externas), o mesmo tipo de debugging de crash de memória e autoplay quebrado no Safari/iOS, e proteções de produção pro bot de atendimento (rate limit, anti-loop, anti-flood, sanitização de output).',
    usei: ['GSAP / ScrollTrigger', 'Canvas API', 'Umami'],
    cobre: [
      { label: 'Governança', reqId: 'req-governanca' },
      { label: 'Análise / resolução de problemas', reqId: 'req-analise' },
    ],
  },
  {
    id: 'proj-sushi-rodo', num: '08', name: 'Sushi Rodo', type: 'restaurante · pedidos com IA',
    feito: 'Agente de atendimento com dois provedores de LLM no mesmo fluxo (OpenAI e Google Gemini), e impressão automática de comanda em tempo real via integração com PrintNode — automação que sai do digital e vira ação física na cozinha.',
    usei: ['n8n', 'OpenAI + Gemini', 'PrintNode'],
    cobre: [
      { label: 'IA generativa / LLMs', reqId: 'req-ia' },
      { label: 'Agentes de IA', reqId: 'req-agentes' },
    ],
  },
  {
    id: 'proj-new', num: '09', name: 'New — este próprio agente', type: 'assistente de entrevista, ao vivo',
    feito: 'Construído do zero durante este próprio processo seletivo, não é um case antigo: detecção de identidade, resposta em áudio gerado na hora, memória de sessão e escalonamento configurável — rodando nesta mesma entrevista.',
    usei: ['n8n + LangChain', 'ElevenLabs', 'Chatwoot / WhatsApp'],
    cobre: [
      { label: 'Agentes de IA', reqId: 'req-agentes' },
      { label: 'IA generativa / LLMs', reqId: 'req-ia' },
    ],
  },
]

const EXTRAS = [
  {
    title: 'Macro Expert',
    text: 'RPA clássico de automação de desktop, usado na prática pra automatizar rotinas e funções do dia a dia — não é orquestração via webhook/API como o n8n, é a outra ponta do RPA.',
    cobre: { label: 'RPA', reqId: 'req-rpa' },
  },
  {
    title: 'Scripts em Python',
    text: 'Sem projeto Python completo entre os 9, mas com código real: scripts pontuais, como rodar migrations de banco de dados. Não é o suficiente sozinho, mas soma junto com o hábito comprovado de aprender stack nova rápido, com apoio de IA generativa.',
    cobre: { label: 'Python avançado', reqId: 'req-python' },
  },
  {
    title: 'Reuniões de alinhamento',
    text: 'Prática recorrente em vários projetos, não só um sinal indireto em documentação: reuniões de alinhamento tanto com equipe técnica quanto com o dono do negócio/cliente, pra manter escopo, prioridade e expectativa sincronizados ao longo do projeto.',
    cobre: { label: 'Comunicação com stakeholders', reqId: 'req-comunicacao' },
  },
]

export default function Projetos() {
  return (
    <div className="page">
      <div className="eyebrow">Complemento do portfólio por categoria</div>
      <h1 className="headline">Projeto por projeto</h1>
      <p className="lede">
        A mesma experiência do <Link to="/habilidades" style={{ color: 'var(--accent)' }}>portfólio de habilidades</Link>,
        mas organizada por projeto: o que foi feito em cada um, o que foi usado pra construir, e o que isso comprova
        especificamente pra vaga.
      </p>
      <Nav current="/projetos" />

      <hr className="masthead-rule" />

      <div className="baseline-note">
        <p>
          <strong>Antes de entrar projeto por projeto:</strong> automação de processos, autonomia/ownership,
          entrega ponta a ponta e uso de low-code/no-code (n8n) aparecem nos 9 projetos, sem exceção — por isso não
          repito essas quatro tags em cada card abaixo. O que cada card destaca é o que aquele projeto
          especificamente acrescenta além da base.
        </p>
      </div>

      <div className="project-list">
        {PROJECTS.map((p) => (
          <div className="project" id={p.id} key={p.id}>
            <div className="project-head">
              <span className="project-num">{p.num}</span>
              <h2>{p.name}</h2>
              <span className="project-type">{p.type}</span>
            </div>
            <div className="project-block">
              <span className="block-label">O que foi feito</span>
              <p>{p.feito}</p>
            </div>
            <div className="project-block">
              <span className="block-label">O que usei</span>
              <div className="tag-row">
                {p.usei.map((tag) => (
                  <span className="stack-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="project-block">
              <span className="block-label">Cobre da vaga</span>
              <div className="tag-row">
                {p.cobre.map((c) => (
                  <Link className="req-tag" to={`/por-que-nelson#${c.reqId}`} key={c.reqId}>{c.label}</Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="group-head">
        <span className="eyebrow">Fora dos 9 projetos de software</span>
        <h2>Evidência complementar</h2>
      </div>

      <div className="extra-list">
        {EXTRAS.map((e) => (
          <div className="extra" key={e.title}>
            <h3>{e.title}</h3>
            <p>{e.text}</p>
            <div className="tag-row">
              <Link className="req-tag" to={`/por-que-nelson#${e.cobre.reqId}`}>{e.cobre.label}</Link>
            </div>
          </div>
        ))}
      </div>

      <footer className="page-footer">
        baseado na mesma análise de 9 projetos reais usada em habilidades e por que o Nelson
      </footer>
    </div>
  )
}
