import { Nav } from '../components/Nav'
import { ReplyBox } from '../components/ReplyBox'
import './Carta.css'

export default function Carta() {
  return (
    <div className="page page-narrow">
      <div className="eyebrow">Escrito pelo mesmo agente que te atendeu no WhatsApp</div>
      <h1 className="headline">Já que estou aqui mesmo…</h1>
      <p className="lede">
        Sou o <b>New</b>, o assistente que recebeu você lá no WhatsApp. Ali eu cuidei da conversa. Aqui, deixa eu
        cuidar de um argumento: por que o Nelson, e o que eu entendi que vocês realmente precisam.
      </p>
      <Nav current="/carta" />

      <hr className="masthead-rule" />

      <div className="section-tab">O que eu entendi que vocês precisam</div>
      <div className="letter">
        <p>
          Lendo a vaga com atenção, o que vocês pedem não é "alguém que sabe codar automação" — é alguém que
          consiga enxergar sozinho onde vale a pena automatizar, construir a solução do início ao fim, e depois
          virar a referência interna quando mais alguém da empresa precisar de automação ou IA. Isso é ownership,
          não só técnica.
        </p>
        <p>
          A Arco Educação se descreve como "feita de pessoas que transformam a educação" — e essa vaga existe pra
          sustentar essa transformação por dentro, com automação e IA generativa. Isso pede alguém confortável em
          ambiente que muda de arquitetura no meio do caminho, não só alguém que segue manual pronto.
        </p>
        <div className="tag-row">
          <span className="tag">automação de processos</span>
          <span className="tag">integração via API</span>
          <span className="tag">Python</span>
          <span className="tag">SQL</span>
          <span className="tag">solução ponta a ponta</span>
          <span className="tag">autonomia</span>
          <span className="tag">comunicação com stakeholders</span>
          <span className="tag">ambiente de transformação</span>
          <span className="tag">IA generativa / agentes de IA</span>
        </div>
      </div>

      <div className="section-tab">Por que eu aposto no Nelson</div>
      <div className="letter">
        <p>
          Eu sou prova de uma coisa antes mesmo de vocês lerem qualquer projeto antigo: fui desenhado, construído e
          colocado no ar em poucos dias, durante o próprio processo seletivo — não é um case desempoeirado que
          alguém foi buscar na gaveta. Detecção de identidade, resposta em áudio gerada na hora, memória de
          conversa, escalonamento configurável: isso é exatamente o "desenvolvimento de agentes de IA" que a vaga
          cita como diferencial, acontecendo em tempo real.
        </p>
        <p>
          E eu não sou o único caso. Atrás de mim tem mais 9 projetos reais em produção: atendimento automatizado,
          integrações com dezenas de APIs — pagamento, calendário, impressão física, IA —, banco de dados modelado
          com SQL puro (incluindo controle de concorrência pra evitar duplo agendamento), deploy contínuo,
          monitoramento. RPA também entra nessa conta: Macro Expert pra rotina de desktop, somado a nove workflows
          de produção em n8n pra automação mais moderna com IA embutida.
        </p>
        <div className="evidence-row">
          <span className="proj-tag">este próprio agente</span>
          <span className="proj-tag">9 projetos</span>
          <span className="proj-tag">Macro Expert</span>
          <span className="proj-tag">n8n</span>
        </div>
        <p>
          Onde ele ainda não tem experiência: um projeto Python completo. Isso eu não vou esconder de vocês — seria
          falta de respeito com quem está decidindo. Mas também não é um vazio total: ele já escreve scripts em
          Python pra tarefas pontuais, como rodar migrations de banco de dados. É pouco, mas é real.
        </p>
        <div className="callout">
          <p>
            <strong>O argumento honesto:</strong> o padrão dele em cada stack nova é aprender rápido, apoiado em IA
            generativa e no hábito de estudar documentação — o mesmo padrão que já se repete nos 9 projetos, em
            stacks diferentes. É esse padrão, não uma experiência inventada, que puxaria ele de "escreve scripts"
            pra "constrói automação completa em Python", rápido, se for isso que o cargo pedir.
          </p>
        </div>
        <p>
          Fora esse ponto, o resto está comprovado, não prometido: automação de processo, integração via API, SQL,
          entrega ponta a ponta, autonomia, IA generativa. A combinação de tudo isso junto é rara — e é exatamente o
          perfil que vocês descrevem como "referência técnica em automação e IA".
        </p>
      </div>

      <div className="signoff">
        <p className="close-line">
          Se você chegou até essa página, já viu o suficiente pra decidir. Eu só queria garantir que a decisão
          fosse tomada com a informação certa na mesa — inclusive a parte que não é perfeita.
        </p>
        <p className="sig">
          — New<small>assistente virtual do Nelson</small>
        </p>
      </div>

      <ReplyBox />

      <footer className="page-footer">
        escrito na voz do mesmo agente configurado para atender a Arco Educação no WhatsApp
      </footer>
    </div>
  )
}
