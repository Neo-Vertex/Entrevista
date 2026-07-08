import { useEffect, useRef, useState } from 'react'
import './ChatNew.css'

const WEBHOOK_PERGUNTAR = 'https://n8n.neovertexia.com/webhook/perguntar-new'

type Msg = { de: 'new' | 'voce'; texto: string }

const SUGESTOES = [
  'Ele topa o modelo híbrido?',
  'Quais projetos ele já entregou?',
  'Ele sabe Python?',
]

function novaSessao(): string {
  try {
    return crypto.randomUUID()
  } catch {
    return 'sess-' + Math.random().toString(36).slice(2) + Date.now().toString(36)
  }
}

export function ChatNew() {
  const [sessionId] = useState(novaSessao)
  const [msgs, setMsgs] = useState<Msg[]>([
    { de: 'new', texto: 'Pode me perguntar o que quiser sobre o Nelson que eu respondo na hora 🙏' },
  ])
  const [texto, setTexto] = useState('')
  const [pensando, setPensando] = useState(false)
  const fimRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [msgs, pensando])

  async function enviar(pergunta: string) {
    const p = pergunta.trim()
    if (!p || pensando) return
    setMsgs((m) => [...m, { de: 'voce', texto: p }])
    setTexto('')
    setPensando(true)
    try {
      const res = await fetch(WEBHOOK_PERGUNTAR, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta: p, sessionId }),
      })
      const data = await res.json()
      const resposta =
        (data && (data.resposta || data.output || data.text)) ||
        'Deixa eu confirmar isso com o Nelson e já te retorno 🙏'
      setMsgs((m) => [...m, { de: 'new', texto: String(resposta) }])
    } catch {
      setMsgs((m) => [
        ...m,
        { de: 'new', texto: 'Ops, não consegui responder agora — tenta de novo daqui a pouquinho 🙏' },
      ])
    } finally {
      setPensando(false)
    }
  }

  return (
    <div className="chat-new">
      <div className="chat-log">
        {msgs.map((m, i) => (
          <div key={i} className={`chat-msg ${m.de}`}>
            {m.texto}
          </div>
        ))}
        {pensando && (
          <div className="chat-msg new">
            <span className="chat-typing" aria-label="digitando">
              <i />
              <i />
              <i />
            </span>
          </div>
        )}
        <div ref={fimRef} />
      </div>

      {msgs.length <= 1 && (
        <div className="chat-sug">
          {SUGESTOES.map((s) => (
            <button key={s} type="button" className="chat-sug-chip" onClick={() => enviar(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        className="chat-input-row"
        onSubmit={(e) => {
          e.preventDefault()
          enviar(texto)
        }}
      >
        <input
          className="chat-input"
          type="text"
          placeholder="Pergunte sobre o Nelson…"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          disabled={pensando}
        />
        <button className="chat-send" type="submit" disabled={pensando || !texto.trim()} aria-label="enviar">
          ➤
        </button>
      </form>
    </div>
  )
}
