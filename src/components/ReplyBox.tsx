import { useEffect, useRef, useState } from 'react'
import './ReplyBox.css'

export function ReplyBox() {
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
    <>
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
        <p className="rpa-explainer">
          Esse segundo botão não é decoração: é uma automação de verdade, escrita em Python, que move o mouse e o
          teclado de verdade pra preencher e enviar esse formulário sozinha — o mesmo tipo de RPA que o Nelson já
          fazia com o Macro Expert antes até de virar profissão, só que reescrito na linguagem que falta no
          portfólio dele.
        </p>
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
    </>
  )
}
