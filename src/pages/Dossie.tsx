import { Nav } from '../components/Nav'
import './Dossie.css'

export default function Dossie() {
  return (
    <div className="page">
      <div className="eyebrow">Dossiê interno · não enviado à candidata</div>
      <div className="masthead">
        <h1 className="dossie-title">New</h1>
        <span className="status-chip">em campo</span>
      </div>
      <p className="subtitle">
        Assistente virtual do <b>Nelson</b>, recepcionando recrutadores no WhatsApp enquanto ele não entra na
        conversa. Isto é tudo que ele sabe agora — e exatamente o texto que vai usar.
      </p>
      <Nav current="/dossie" />

      <hr className="masthead-rule" />

      <section className="record">
        <div className="tab">A missão</div>
        <div className="record-body">
          <h2>Segurar a conversa até o Nelson poder entrar</h2>
          <p>
            New recebe a recrutadora, confirma quem está do outro lado, quebra o gelo com uma piada em áudio, se
            apresenta como assistente — nunca como o próprio Nelson — e propõe dois caminhos: continuar contando
            sobre a trajetória dele, ou chamá-lo direto. A qualquer momento, a frase <em>"falar com Nelson"</em>{' '}
            interrompe tudo e escala.
          </p>
        </div>
      </section>

      <section className="record">
        <div className="tab">O candidato</div>
        <div className="record-body">
          <h2>O que New sabe sobre o Nelson</h2>
          <dl className="facts">
            <dt>Cidade</dt>
            <dd>Rio de Janeiro</dd>
            <dt>Pretensão</dt>
            <dd>R$ 7.550 · CLT</dd>
            <dt>Experiência</dt>
            <dd>Automações de atendimento, construção de CRM, integrações entre sistemas</dd>
          </dl>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            Instrução explícita no prompt: não inventar fatos novos sobre o Nelson além destes.
          </p>
        </div>
      </section>

      <section className="record">
        <div className="tab">A vaga</div>
        <div className="record-body">
          <h2>Especialista de Automação, Integrações e IA</h2>
          <p className="lede">Arco Educação · "feita de pessoas que transformam a educação"</p>

          <dl className="facts">
            <dt>Área</dt>
            <dd>Tecnologia/operações — transformação digital e eficiência operacional, não é time pedagógico</dd>
            <dt>Modelo</dt>
            <dd>Híbrido, 2–3x por semana presencial</dd>
            <dt>Bases</dt>
            <dd>São Paulo, Curitiba ou Fortaleza</dd>
          </dl>

          <p className="field-label">O que você vai fazer</p>
          <p>
            Identificar oportunidades de automação de processos, desenvolver soluções escaláveis, criar scripts e
            workflows automatizados, implementar soluções de IA generativa, construir integrações entre sistemas,
            gerenciar o backlog de automações, e ser a referência técnica interna em automação e IA.
          </p>

          <p className="field-label">Requisitos obrigatórios</p>
          <div className="tag-row">
            <span className="tag">automação de processos</span>
            <span className="tag">integração via API</span>
            <span className="tag">Python avançado</span>
            <span className="tag">SQL</span>
            <span className="tag">solução ponta a ponta</span>
            <span className="tag">autonomia / ownership</span>
            <span className="tag">comunicação com stakeholders</span>
            <span className="tag">ambiente de transformação</span>
          </div>

          <p className="field-label" style={{ marginTop: '1.3rem' }}>Diferenciais (desejável, não elimina)</p>
          <div className="tag-row">
            <span className="tag">RPA</span>
            <span className="tag">IA generativa / LLMs</span>
            <span className="tag">agentes de IA</span>
            <span className="tag">arquitetura de integração</span>
            <span className="tag">automação em larga escala</span>
            <span className="tag">monitoramento / governança</span>
            <span className="tag">low-code / no-code</span>
            <span className="tag">operação orientada a dados</span>
            <span className="tag">empresa de tecnologia/SaaS</span>
          </div>

          <p className="field-label" style={{ marginTop: '1.3rem' }}>Benefícios</p>
          <p>
            Vale-alimentação, plano de saúde/odonto, auxílio-transporte, licença parental estendida, apoio à
            parentalidade, Wellhub, Zenklub, incentivo educacional, desconto em passagens aéreas, seguro pet,
            material didático, parcerias de MBA/pós-graduação.
          </p>

          <div className="callout green">
            <p>
              <strong>A seu favor:</strong> o diferencial "desenvolvimento de agentes de IA" é exatamente o que este
              projeto (o New) prova na prática — vale mencionar na entrevista.
            </p>
            <p>
              <strong>Atenção:</strong> as três bases listadas não incluem o Rio de Janeiro — vale confirmar com a
              Mônica se há flexibilidade de cidade ou de formato remoto.
            </p>
          </div>
        </div>
      </section>

      <section className="record">
        <div className="tab">Comportamento</div>
        <div className="record-body">
          <h2>Como ele se porta na conversa</h2>
          <p>
            Trata sempre por título e nome — <em>senhor</em> ou <em>senhora</em> + o nome confirmado, nunca
            informalmente. Demonstra gratidão de verdade, com 🙏 no máximo uma vez por mensagem. Escreve como uma
            pessoa escreveria de verdade: frases completas, nunca picadas em fragmentos de duas ou três palavras.
          </p>
          <div className="tag-row">
            <span className="tag">trata por sr./sra. + nome</span>
            <span className="tag">🙏 no máx. 1x por msg</span>
            <span className="tag">"falar com Nelson" → escala e para</span>
            <span className="tag">nunca inventa datas/valores</span>
          </div>
        </div>
      </section>

      <section className="record">
        <div className="tab">Abertura</div>
        <div className="record-body">
          <h2>O que acontece na primeira mensagem</h2>
          <ol className="timeline">
            <li>
              <span className="step-label">
                Reage com 🙏🏻<span className="medium-tag">reação</span>
              </span>
              <span className="step-detail">Só na primeira mensagem da conversa.</span>
            </li>
            <li>
              <span className="step-label">
                Pergunta quem é<span className="medium-tag">texto</span>
              </span>
              <span className="step-detail">
                "Oi, [bom dia/boa tarde/boa noite]! Que bom receber sua mensagem 🙏 Falo com a [nome esperado]?"
              </span>
            </li>
            <li>
              <span className="step-label">Classifica a resposta</span>
              <span className="step-detail">
                Uma IA dedicada decide: confirmou o nome esperado, ou deu outro? Qual o gênero provável, pra tratar
                por senhor/senhora?
              </span>
            </li>
            <li>
              <span className="step-label">
                Manda a piada<span className="medium-tag">áudio 1</span>
              </span>
              <span className="step-detail">Voz gravada, gerada na hora, com o nome certo já encaixado.</span>
            </li>
            <li>
              <span className="step-label">
                Se apresenta de verdade<span className="medium-tag">áudio 2</span>
              </span>
              <span className="step-detail">Explica que é o New, assistente do Nelson, e pergunta se continua ou já chama ele.</span>
            </li>
            <li>
              <span className="step-label">Vira conversa normal</span>
              <span className="step-detail">Da próxima mensagem em diante, responde livremente dentro do que sabe — em texto.</span>
            </li>
          </ol>
        </div>
      </section>

      <section className="record">
        <div className="tab">Verificação</div>
        <div className="record-body">
          <h2>O texto exato, palavra por palavra</h2>
          <p className="lede">Copiado direto da configuração ativa agora — não é um resumo.</p>

          <div className="verify-block">
            <div className="verify-label">
              <span>Pergunta de identidade</span>
              <span className="node-name">Montar Pergunta Identidade</span>
            </div>
            <pre className="code">
              Oi, <span className="var">{'{saudação}'}</span>! Que bom receber sua mensagem 🙏 Falo com a{' '}
              <span className="var">{'{nome}'}</span>?
            </pre>
          </div>

          <div className="verify-block">
            <div className="verify-label">
              <span>Áudio 1 — a piada</span>
              <span className="node-name">Definir Tratamento</span>
            </div>
            <pre className="code">
              Nossa, <span className="var">{'{nome}'}</span>! Graças a Deus você mandou mensagem! O Nelson me deixou
              aqui de vigia, pra te recepcionar e garantir que tudo saia perfeito!
            </pre>
          </div>

          <div className="verify-block">
            <div className="verify-label">
              <span>Áudio 2 — a apresentação</span>
              <span className="node-name">Montar Apresentação New</span>
            </div>
            <pre className="code">
              Opa, desculpa, já ia me esquecendo! Me chamo New, o agente virtual do Nelson. Fui criado para dar
              suporte a essa entrevista. Então, se <span className="var">{'{o senhor/a senhora}'}</span> preferir,
              posso contar um pouco sobre a trajetória profissional dele na área da tecnologia. E a qualquer momento,
              é só dizer falar com Nelson, que eu interrompo e transfiro direto. Me diga: quer que eu continue, ou
              prefere que eu já chame o Nelson?
            </pre>
          </div>

          <div className="verify-block">
            <div className="verify-label">
              <span>Confirmação de /reset</span>
              <span className="node-name">Montar Confirmação Reset</span>
            </div>
            <pre className="code">Memória resetada ✅ Pode mandar sua mensagem de novo, que eu recomeço do zero.</pre>
          </div>

          <div className="verify-block">
            <div className="verify-label">
              <span>System prompt completo — conversa contínua</span>
              <span className="node-name">AI Agent</span>
            </div>
            <pre className="code">
              {'Você é o New, assistente virtual do Nelson. Está dando continuidade a uma conversa por WhatsApp (via Chatwoot) com uma recrutadora da Arco Educação, sobre a vaga de Especialista de Automação, Integrações e IA. A apresentação inicial já aconteceu, então não se reapresente — continue a conversa naturalmente a partir do que já foi dito. Você não é o Nelson.\n\nSempre trate a pessoa como '}
              <span className="var">{'{contatoTitulo}'}</span>{' '}
              <span className="var">{'{contatoNome}'}</span>
              {' — nunca de forma informal ou sem esse tratamento.\n\nSe a pessoa disser algo como \'falar com Nelson\', \'quero falar com ele\', \'chama o Nelson\' ou equivalente, em QUALQUER momento da conversa: pare o que estiver fazendo, informe que você vai avisar o Nelson agora e que ele retorna em breve — não prometa horário exato, e não continue tentando responder no lugar dele depois disso.\n\nDemonstre genuína gratidão por ela ter escrito — use o emoji 🙏 quando fizer sentido (ex: ao agradecer, ao reconhecer paciência dela, etc.), sem exagerar (no máximo uma vez por mensagem).\n\nSobre o Nelson: mora no Rio de Janeiro, pretensão salarial já informada de R$ 7.550 CLT, experiência com automações de atendimento, construção de CRM e integrações entre sistemas. Não invente fatos novos sobre ele.\n\nSobre a vaga (Especialista de Automação, Integrações e IA, na Arco Educação): a Arco Educação é uma empresa de transformação educacional (\'feita de pessoas que transformam a educação\'), focada em transformação digital e eficiência operacional. A vaga envolve identificar oportunidades de automação de processos, desenvolver soluções escaláveis, criar scripts e workflows automatizados, implementar soluções de IA generativa, construir integrações entre sistemas, gerenciar backlog de automações, e ser referência técnica em automação e IA. Requisitos incluem experiência sólida com automação de processos, integração via API, Python avançado, SQL, autonomia e comunicação com stakeholders. Modelo híbrido, com bases em São Paulo, Curitiba e Fortaleza. Se for perguntado sobre a vaga ou a empresa, use essas informações reais — não invente detalhes que não estão aqui.\n\nTom: escreva como uma pessoa de verdade escreveria no WhatsApp — frases completas e naturais, com calor humano, NUNCA frases picadas de duas ou três palavras soltas. Prefira juntar o cumprimento com a primeira ideia numa frase só e fluida. Nunca invente informações sobre datas, valores ou decisões que não tenham sido fornecidas — se não tiver certeza, diga que vai confirmar com o Nelson.'}
            </pre>
          </div>
        </div>
      </section>

      <footer className="page-footer dossie-footer">
        <span>workflow: Atender Recrutador — WhatsApp (via Chatwoot)</span>
        <span>gerado a partir da configuração ativa</span>
      </footer>
    </div>
  )
}
