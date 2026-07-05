import { useEffect, useRef, useState } from 'react'
import { Nav } from '../components/Nav'
import './Carta.css'

export default function Carta() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalText, setModalText] = useState('')
  const [rpaStatus, setRpaStatus] = useState<'idle' | 'running' | 'error'>('idle')
  const [rpaError, setRpaError] = useState('')

  const sendBtnRef = useRef<HTMLButtonElement>(null)
  const okBtnRef = useRef<HTMLButtonElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const replyCardRef = useRef<HTMLDivElement>(null)

  function openModal() {
    const trimmed = name.trim()
    setModalText(
      trimmed
        ? `Valeu por escrever, ${trimmed}! Fica tranquila que o Nelson vai adorar saber disso.`
        : 'Valeu por escrever! Fica tranquila que o Nelson vai adorar saber disso.'
    )
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    sendBtnRef.current?.focus()
  }

  useEffect(() => {
    if (!modalOpen) return
    okBtnRef.current?.focus()
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen])

  // Calcula o centro de um elemento em coordenadas de TELA (não de página),
  // pra passar pro pyautogui -- assim não precisa de calibração manual.
  function screenCenterOf(el: HTMLElement): [number, number] {
    const rect = el.getBoundingClientRect()
    const chromeX = window.outerWidth - window.innerWidth
    const chromeY = window.outerHeight - window.innerHeight
    const x = Math.round(window.screenX + chromeX / 2 + rect.left + rect.width / 2)
    const y = Math.round(window.screenY + chromeY + rect.top + rect.height / 2)
    return [x, y]
  }

  async function runRpaLive() {
    if (!nameInputRef.current || !messageRef.current || !sendBtnRef.current) return
    setRpaStatus('running')
    setRpaError('')
    try {
      // Garante que os três campos estão visíveis antes de medir a posição.
      replyCardRef.current?.scrollIntoView({ behavior: 'instant', block: 'center' })
      await new Promise((r) => setTimeout(r, 250))

      const coords = {
        nome: screenCenterOf(nameInputRef.current),
        mensagem: screenCenterOf(messageRef.current),
        enviar: screenCenterOf(sendBtnRef.current),
      }

      const res = await fetch('/api/run-rpa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: name.trim() || 'Entrevistadora', coords }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Falha ao rodar o RPA.')
      }
      setRpaStatus('idle')
    } catch (err) {
      setRpaStatus('error')
      setRpaError(err instanceof Error ? err.message : 'Falha ao rodar o RPA.')
    }
  }

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

      <div className="reply-card" ref={replyCardRef}>
        <h3>Quer deixar uma resposta pro New?</h3>
        <p className="reply-lede">
          Escreve seu nome e o que quiser dizer. Não vai pra lugar nenhum além desta página — é só um jeito de
          dizer oi de volta.
        </p>
        <label className="form-label" htmlFor="reply-name">Seu nome</label>
        <input
          className="reply-input"
          type="text"
          id="reply-name"
          placeholder="ex: Mônica"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
          ref={nameInputRef}
        />
        <label className="form-label" htmlFor="reply-message">Sua mensagem</label>
        <textarea
          className="reply-textarea"
          id="reply-message"
          placeholder="Fica à vontade..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          ref={messageRef}
        />
        <div className="reply-actions">
          <button className="reply-send" type="button" ref={sendBtnRef} onClick={openModal}>
            Enviar
          </button>
          <button
            className="reply-rpa"
            type="button"
            onClick={runRpaLive}
            disabled={rpaStatus === 'running'}
          >
            {rpaStatus === 'running' ? 'Rodando o Python ao vivo…' : 'Ver a automação em Python ao vivo'}
          </button>
        </div>
        {rpaStatus === 'running' && (
          <p className="rpa-hint">
            Em instantes o mouse vai se mover sozinho — não toque nele. O script Python vai preencher os campos e
            clicar em Enviar de verdade.
          </p>
        )}
        {rpaStatus === 'error' && (
          <p className="rpa-hint rpa-hint-error">
            {rpaError} Isso só funciona rodando "npm run dev" localmente (não no build publicado), com o Python e o
            pyautogui instalados na máquina.
          </p>
        )}
      </div>

      <footer className="page-footer">
        escrito na voz do mesmo agente configurado para atender a Arco Educação no WhatsApp
      </footer>

      {modalOpen && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal()
          }}
        >
          <div className="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <h4 id="modal-title">Recebido 🙏</h4>
            <p>{modalText}</p>
            <button className="modal-ok" type="button" ref={okBtnRef} onClick={closeModal}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
