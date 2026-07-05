import { Nav } from '../components/Nav'
import './PorQueNelson.css'

type Status = 'ok' | 'partial' | 'gap'

type CaseItem = {
  id: string
  num: string
  req: string
  status: Status
  statusLabel: string
  title: string
  paragraphs: string[]
  evidence: string[]
  honestNote?: string
  segLabel: string
  short: string
}

const OBRIGATORIOS: CaseItem[] = [
  {
    id: 'req-automacao', num: '01', req: 'Experiência sólida com automação de processos', status: 'ok', statusLabel: 'comprovado',
    title: 'Automação não é um projeto pontual — é o padrão de trabalho do Nelson',
    paragraphs: [
      'Em 9 projetos entregues de ponta a ponta, automação de processos aparece como fio condutor, não como feature isolada: atendimento, agendamento, cobrança, estoque, notificação de status, impressão de comanda. E o próprio agente que está conduzindo essa conversa com você agora foi construído, do zero, durante o processo seletivo — prova em tempo real, não um projeto antigo desempoeirado.',
    ],
    evidence: ['9 projetos', 'este próprio agente'],
    segLabel: 'Automação de processos — comprovado', short: 'Automação',
  },
  {
    id: 'req-api', num: '02', req: 'Integração via API', status: 'ok', statusLabel: 'comprovado',
    title: 'Já integrou dezenas de APIs de terceiros, de pagamento a impressão física',
    paragraphs: [
      'Chatwoot, WhatsApp (Baileys/Z-API), Google Calendar/Drive, OpenAI, ElevenLabs, Whisper, Twilio, Retell AI, PrintNode, Asaas, TWINT, CoinGecko/Finnhub/AwesomeAPI. A variedade importa mais que o número: prova capacidade de ler documentação de API nova, lidar com autenticação diferente em cada uma, e desenhar contra falhas (timeout, retry, fallback) — não só o caminho feliz.',
    ],
    evidence: ['Aquarise', 'Maranatha', 'Espaço Família', 'Sushi Rodo'],
    segLabel: 'Integração via API — comprovado', short: 'API',
  },
  {
    id: 'req-python', num: '03', req: 'Python avançado', status: 'partial', statusLabel: 'parcial',
    title: 'Não tem projeto completo em Python — mas já tem código real rodando',
    paragraphs: [
      'Os 9 projetos analisados foram construídos majoritariamente em TypeScript/JavaScript (Node.js no backend, React no front) — não há um projeto Python de ponta a ponta nesse conjunto. Não faz sentido fingir o contrário.',
      'Mas também não é um vazio total: já existem scripts em Python escritos para tarefas pontuais, como rodar migrations de banco de dados — código real em produção, só que em escopo pequeno, não um sistema completo. Somado a isso, forte trabalho com IA generativa, comprovado em praticamente todo o portfólio, incluindo o próprio agente construído durante este processo seletivo — e disposição/hábito de estudar documentação nova para aprender rápido. Na prática, isso significa conseguir evoluir de "escreve scripts pontuais" pra "constrói RPA e automações completas em Python" rapidamente, usando IA generativa como acelerador — o mesmo padrão de aprendizado que já se repete em cada stack diferente usada nos 9 projetos.',
    ],
    evidence: ['scripts Python · migrations'],
    honestNote: 'ser direto sobre o que existe (scripts pontuais, não um projeto de produção) e usar o argumento real — velocidade de aprendizado comprovada, apoiada em IA generativa — em vez de inflar a experiência. Costuma pesar mais a favor do que tentar disfarçar.',
    segLabel: 'Python avançado — parcial (scripts, sem projeto completo)', short: 'Python',
  },
  {
    id: 'req-sql', num: '04', req: 'SQL para análise de dados', status: 'ok', statusLabel: 'comprovado',
    title: 'SQL puro em produção, não só consultas geradas por ORM',
    paragraphs: [
      'O projeto Espaço Família tem 113 migrations incrementais escritas em SQL puro — sem ORM — incluindo controle de concorrência via pg_advisory_xact_lock para evitar duplo agendamento simultâneo. Isso é SQL usado pra resolver um problema real de concorrência, não só "sei fazer SELECT com JOIN".',
    ],
    evidence: ['Espaço Família'],
    segLabel: 'SQL — comprovado', short: 'SQL',
  },
  {
    id: 'req-e2e', num: '05', req: 'Capacidade de desenvolver soluções ponta a ponta', status: 'ok', statusLabel: 'comprovado',
    title: 'Cada projeto vai do schema de banco ao deploy monitorado — sozinho',
    paragraphs: [
      'Não são protótipos: são sistemas com banco de dados modelado, backend com regras de negócio no servidor, frontend funcional, containerização Docker e deploy contínuo em produção (Coolify), alguns com observabilidade via Prometheus. Isso comprova capacidade de tocar um projeto real sem depender de um time inteiro por trás.',
    ],
    evidence: ['9 de 9 projetos'],
    segLabel: 'Solução ponta a ponta — comprovado', short: 'Ponta a ponta',
  },
  {
    id: 'req-analise', num: '06', req: 'Habilidades analíticas e de resolução de problemas', status: 'ok', statusLabel: 'comprovado',
    title: 'Depurou problemas que não têm resposta pronta no Stack Overflow',
    paragraphs: [
      'Dois exemplos concretos: um crash de memória no Safari/Chrome mobile causado por decodificação de WebP frame-a-frame, resolvido identificando a causa raiz e criando um modo leve com fallback seguro; e uma condição de corrida em tool-calling paralelo de um agente de IA, resolvida consolidando duas operações num único endpoint atômico. Os dois exigem entender o problema de verdade antes de sair copiando solução.',
    ],
    evidence: ['LUAZUL', 'Espaço Família'],
    segLabel: 'Habilidades analíticas — comprovado', short: 'Análise',
  },
  {
    id: 'req-autonomia', num: '07', req: 'Autonomia e mentalidade de dono', status: 'ok', statusLabel: 'comprovado',
    title: 'Nove sistemas de produção, entregues de forma independente',
    paragraphs: [
      'Cada um desses projetos foi levado do zero até produção sem um time de engenharia por trás — decisão de stack, modelagem de dados, integração, deploy e manutenção, tudo sob a responsabilidade do próprio Nelson. Isso é ownership, não só saber programar.',
    ],
    evidence: ['9 projetos'],
    segLabel: 'Autonomia — comprovado', short: 'Autonomia',
  },
  {
    id: 'req-comunicacao', num: '08', req: 'Comunicação com stakeholders', status: 'ok', statusLabel: 'comprovado',
    title: 'Não é só indício em documentação — é prática recorrente de reunião',
    paragraphs: [
      'Além dos sinais em código (documentação técnica escrita para outras pessoas lerem, sites multi-idioma pensados para públicos diferentes em três países, decisões arquiteturais justificadas por escrito antes de implementar), há prática direta e recorrente: reuniões de alinhamento tanto com equipe técnica quanto com o dono do negócio/cliente, pra manter escopo, prioridade e expectativa sincronizados ao longo dos projetos. É comunicação com stakeholders exercida de verdade, não só inferida por quem lê o código depois.',
    ],
    evidence: ['NeoVertex', 'Avantgarde', 'LUAZUL', 'reuniões de alinhamento'],
    segLabel: 'Comunicação com stakeholders — comprovado', short: 'Comunicação',
  },
  {
    id: 'req-transformacao', num: '09', req: 'Experiência em ambiente de transformação', status: 'ok', statusLabel: 'comprovado',
    title: 'Já migrou arquitetura em produção sem quebrar o sistema',
    paragraphs: [
      'O projeto Espaço Família saiu de uma base em Supabase (BaaS com RLS) para PostgreSQL self-hosted — uma decisão de arquitetura de peso, documentada e executada sem interromper o sistema em uso. Isso é exatamente o tipo de mudança estrutural que uma "empresa em transformação digital" precisa de alguém confortável em conduzir.',
    ],
    evidence: ['Espaço Família'],
    segLabel: 'Ambiente de transformação — comprovado', short: 'Transformação',
  },
]

const DIFERENCIAIS: CaseItem[] = [
  {
    id: 'req-rpa', num: '01', req: 'Ferramentas de RPA', status: 'ok', statusLabel: 'comprovado',
    title: 'Experiência direta com Macro Expert, além do n8n',
    paragraphs: [
      'Uso prático de Macro Expert para automatizar funções e rotinas do dia a dia — RPA clássico de automação de desktop, não só orquestração via webhook/API. Somado aos nove workflows de produção em n8n (automação multi-sistema mais moderna, com IA embutida), cobre as duas pontas da categoria: RPA tradicional e automação orientada a API/IA.',
    ],
    evidence: ['Macro Expert', 'n8n · 9 projetos'],
    segLabel: 'RPA — comprovado (Macro Expert)', short: 'RPA',
  },
  {
    id: 'req-ia', num: '02', req: 'Conhecimento de IA generativa e LLMs', status: 'ok', statusLabel: 'comprovado',
    title: 'O ponto mais forte de todo o portfólio',
    paragraphs: [
      'Agentes conversacionais com memória persistente, múltiplos provedores de LLM no mesmo fluxo (OpenAI e Google Gemini), pipeline de voz completo (transcrição + geração de fala + telefonia), e proteções de produção desenhadas manualmente (rate limit, anti-loop, anti-flood, sanitização de output). Isso não é "usei o ChatGPT uma vez" — é engenharia de produção em cima de LLM.',
    ],
    evidence: ['6 de 9 projetos'],
    segLabel: 'IA generativa / LLMs — comprovado', short: 'IA generativa',
  },
  {
    id: 'req-agentes', num: '03', req: 'Experiência com desenvolvimento de agentes de IA', status: 'ok', statusLabel: 'comprovado',
    title: 'A prova está acontecendo agora, nesta própria conversa',
    paragraphs: [
      'O agente que recepcionou essa conversa no WhatsApp — com detecção de identidade, resposta em áudio gerada na hora, escalonamento configurável e memória de sessão — foi desenhado e construído especificamente para este processo seletivo. Não é um case antigo: é a demonstração viva da habilidade sendo exigida.',
    ],
    evidence: ['este próprio agente', 'Sushi Rodo', 'Espaço Família'],
    segLabel: 'Agentes de IA — comprovado', short: 'Agentes de IA',
  },
  {
    id: 'req-arquitetura', num: '04', req: 'Familiaridade com arquitetura de integração', status: 'ok', statusLabel: 'comprovado',
    title: 'Múltiplos sistemas conversando entre si, com responsabilidade separada',
    paragraphs: [
      'Padrão recorrente: webhook duplo para auditoria independente do fluxo principal, sub-workflows especializados (buscar, agendar, escalonar, notificar) orquestrados por um workflow central, e endpoints desenhados especificamente para evitar problemas de concorrência entre sistemas. Isso é pensar em arquitetura, não só "conectar A no B".',
    ],
    evidence: ['Espaço Família', 'Aquarise'],
    segLabel: 'Arquitetura de integração — comprovado', short: 'Arquitetura',
  },
  {
    id: 'req-escala', num: '05', req: 'Automação em larga escala', status: 'ok', statusLabel: 'comprovado',
    title: 'Comprovado em escala de PME/multi-unidade — não em escala enterprise',
    paragraphs: [
      'Estoque multi-loja com trilha de auditoria, atendimento simultâneo de múltiplas conversas com fila e lock, e sistemas rodando em produção real para negócios de verdade. É honesto dizer que "larga escala" aqui significa dezenas de lojas/conversas simultâneas, não milhões de transações — mas a base arquitetural (filas, locks, idempotência) é exatamente o que sustenta esse próximo salto de escala.',
    ],
    evidence: ['Aquarise', 'Espaço Família'],
    segLabel: 'Automação em larga escala — comprovado', short: 'Escala',
  },
  {
    id: 'req-governanca', num: '06', req: 'Compreensão de monitoramento e governança', status: 'ok', statusLabel: 'comprovado',
    title: 'Métricas de produção e proteções contra abuso, não só logs soltos',
    paragraphs: [
      'Endpoint Prometheus customizado por rota (evitando explosão de cardinalidade por ID), auditoria com mascaramento de PII, e limites de segurança desenhados no próprio agente de IA (rate limit, anti-loop, anti-flood). Governança tratada como parte do design, não como reação a um incidente.',
    ],
    evidence: ['Espaço Família', 'Skin Tech'],
    segLabel: 'Monitoramento e governança — comprovado', short: 'Governança',
  },
  {
    id: 'req-lowcode', num: '07', req: 'Experiência com plataformas low-code/no-code', status: 'ok', statusLabel: 'comprovado',
    title: 'n8n como ferramenta principal de automação em praticamente todo o portfólio',
    paragraphs: [
      'Não como atalho pra evitar código — os workflows incluem lógica customizada via nós de código (JavaScript), tools próprias para agentes de IA, e integrações que exigem entender a API de cada serviço por trás. Low-code aqui significa velocidade de entrega, não superficialidade.',
    ],
    evidence: ['9 de 9 projetos'],
    segLabel: 'Low-code / no-code — comprovado', short: 'Low-code',
  },
  {
    id: 'req-dados', num: '08', req: 'Vivência com operações orientadas a dados', status: 'ok', statusLabel: 'comprovado',
    title: 'Analytics self-hosted e simuladores com lógica financeira real',
    paragraphs: [
      'Escolha deliberada de analytics próprio (Umami) em vez de depender de nuvem de terceiros, simuladores de investimento com fórmulas reais de juros compostos/lineares aplicadas a múltiplos produtos, e um quiz de qualificação de leads com sistema de pontuação. Dados usados para decisão, não só para exibir número bonito no dashboard.',
    ],
    evidence: ['NeoVertex', 'Avantgarde'],
    segLabel: 'Operação orientada a dados — comprovado', short: 'Dados',
  },
  {
    id: 'req-saas', num: '09', req: 'Experiência em empresa de tecnologia/SaaS', status: 'partial', statusLabel: 'indireto',
    title: 'Construiu produtos SaaS-like de forma independente, não empregado numa',
    paragraphs: [
      'O Nelson não trabalhou formalmente dentro de uma empresa SaaS — mas construiu, sozinho, sistemas com a mesma complexidade de produto (multi-tenant, painel administrativo, automação de ponta a ponta, deploy contínuo). É uma experiência equivalente em prática, ainda que diferente em contexto — vale essa distinção ficar clara na conversa.',
    ],
    evidence: ['Aquarise', 'Espaço Família'],
    segLabel: 'Empresa de tecnologia/SaaS — indireto', short: 'SaaS',
  },
]

function CaseCard({ item }: { item: CaseItem }) {
  return (
    <div className={`case ${item.status}`} id={item.id}>
      <div className="case-head">
        <span className="case-num">{item.num}</span>
        <span className="req">{item.req}</span>
        <span className={`status-pill ${item.status}`}>{item.statusLabel}</span>
      </div>
      <h3>{item.title}</h3>
      {item.paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <div className="evidence-row">
        {item.evidence.map((tag) => (
          <span className="proj-tag" key={tag}>{tag}</span>
        ))}
      </div>
      {item.honestNote && (
        <div className="honest-note">
          <strong>Recomendação:</strong> {item.honestNote}
        </div>
      )}
    </div>
  )
}

export default function PorQueNelson() {
  const allCases = [...OBRIGATORIOS, ...DIFERENCIAIS]
  const okCount = allCases.filter((c) => c.status === 'ok').length
  const partialCount = allCases.filter((c) => c.status === 'partial').length

  return (
    <div className="page">
      <div className="eyebrow">Para quem está avaliando essa candidatura</div>
      <h1 className="headline">Por que o Nelson é a escolha certa para esta vaga</h1>
      <p className="lede">
        Ponto a ponto, cada exigência da vaga de Especialista de Automação, Integrações e IA respondida com
        evidência real de projetos entregues — não promessas.
      </p>
      <Nav current="/por-que-nelson" />

      <div className="scorecard">
        <p className="scorecard-head">
          <strong>{okCount}</strong>de {allCases.length} exigências da vaga com evidência direta e forte
        </p>
        <div
          className="segment-bar"
          role="img"
          aria-label={`${okCount} comprovadas, ${partialCount} parciais, de ${allCases.length} exigências no total`}
        >
          {OBRIGATORIOS.map((item) => (
            <a key={item.id} className={`seg ${item.status}`} href={`#${item.id}`} title={item.segLabel} />
          ))}
          <span className="seg-divider" aria-hidden="true" />
          {DIFERENCIAIS.map((item) => (
            <a key={item.id} className={`seg ${item.status}`} href={`#${item.id}`} title={item.segLabel} />
          ))}
        </div>
        <div className="scorecard-legend">
          <span className="legend-item"><i className="dot ok" />{okCount} comprovadas</span>
          <span className="legend-item"><i className="dot partial" />{partialCount} parciais (evidência real, mas incompleta ou indireta)</span>
        </div>

        <div className="quicknav">
          <div className="quicknav-group">
            <span className="quicknav-label">Obrigatórios</span>
            {OBRIGATORIOS.map((item) => (
              <a key={item.id} href={`#${item.id}`}>{item.short}</a>
            ))}
          </div>
          <div className="quicknav-group">
            <span className="quicknav-label">Diferenciais</span>
            {DIFERENCIAIS.map((item) => (
              <a key={item.id} href={`#${item.id}`}>{item.short}</a>
            ))}
          </div>
        </div>
      </div>

      <hr className="masthead-rule" />

      <div className="group-head">
        <span className="eyebrow">Requisitos obrigatórios</span>
        <h2>O que a vaga exige pra considerar o candidato</h2>
      </div>

      <div className="case-list">
        {OBRIGATORIOS.map((item) => (
          <CaseCard item={item} key={item.id} />
        ))}
      </div>

      <div className="group-head">
        <span className="eyebrow">Diferenciais</span>
        <h2>O que não elimina, mas separa candidatos</h2>
      </div>

      <div className="case-list">
        {DIFERENCIAIS.map((item) => (
          <CaseCard item={item} key={item.id} />
        ))}
      </div>

      <div className="closing">
        <p>
          <strong>Resumo:</strong> de 18 exigências (9 obrigatórias + 9 diferenciais), 16 têm evidência direta e
          forte em projetos reais entregues (ou experiência prática direta, como Macro Expert para RPA e reuniões de
          alinhamento recorrentes para comunicação com stakeholders). Nenhuma é um vazio total de evidência: mesmo
          os dois pontos mais frágeis — Python avançado (scripts pontuais, sem projeto completo) e empresa SaaS
          (experiência equivalente, mas em contexto diferente) — têm alguma evidência real, e vale explorá-los com
          honestidade na própria conversa.
        </p>
        <p>
          O ponto mais forte não é nenhum item isolado — é a combinação rara de automação + IA generativa +
          integração de sistemas + autonomia total de entrega, exatamente o perfil que a vaga descreve como
          "referência técnica em automação e IA".
        </p>
      </div>

      <footer className="page-footer">
        baseado na análise de 9 projetos reais e nos requisitos publicados da vaga (Arco Educação)
      </footer>
    </div>
  )
}
