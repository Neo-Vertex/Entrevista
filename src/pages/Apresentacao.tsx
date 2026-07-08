import { useEffect, useRef, useState } from 'react'
import { NewMascot } from '../components/NewMascot'
import { ChatNew } from '../components/ChatNew'
import bio from '../data/apresentacao-bio.json'
import extras from '../data/apresentacao-extras.json'
import requisitos from '../data/apresentacao-requisitos.json'
import './Apresentacao.css'

type Stack = { grupo: string; itens: string[] }

type Passo = {
  id: string
  audio: string
  chip: string
  chipCurto: string
  titulo: string
  corpo: string[]
  projeto?: string
  stacks?: Stack[]
}

const SKILLS_STACKS: Stack[] = [
  { grupo: 'Automação & IA', itens: ['n8n', 'OpenAI', 'Gemini', 'Llama self-hosted', 'ElevenLabs', 'LangChain'] },
  { grupo: 'Backend & dados', itens: ['Node / TypeScript', 'PostgreSQL', 'SQL puro', 'API REST + JWT'] },
  { grupo: 'Frontend', itens: ['React', 'Vite', 'Three.js', 'GSAP'] },
  { grupo: 'Infra', itens: ['Docker', 'Coolify CI/CD', 'Prometheus', 'Umami'] },
  { grupo: 'RPA', itens: ['Macro Expert', 'Python (scripts)'] },
]

const WEBHOOK_CHAMAR_NELSON = 'https://n8n.neovertexia.com/webhook/chamar-nelson'
const CHAVE_CHAMADO = 'nv-chamar-nelson-v1'

const PASSOS: Passo[] = [
  {
    id: 'intro',
    audio: '/audio/intro.mp3',
    chip: 'boas-vindas',
    chipCurto: 'boas-vindas',
    titulo: extras.intro.titulo,
    corpo: [extras.intro.script],
  },
  {
    id: 'bio',
    audio: '/audio/bio.mp3',
    chip: 'quem é o Nelson',
    chipCurto: 'a história',
    titulo: bio.titulo,
    corpo: bio.paragrafos,
  },
  {
    id: 'skills',
    audio: '/audio/skills.mp3',
    chip: 'ferramentas',
    chipCurto: 'ferramentas',
    titulo: extras.skills.titulo,
    corpo: [extras.skills.frase],
    stacks: SKILLS_STACKS,
  },
  ...requisitos.map((r) => ({
    id: r.id,
    audio: `/audio/${r.id}.mp3`,
    chip: r.grupo === 'obrigatorio' ? 'requisito obrigatório' : 'diferencial',
    chipCurto: r.req,
    titulo: r.req,
    corpo: [r.script],
    projeto: r.projeto,
  })),
]

function CorpoDigitado({ corpo, frac }: { corpo: string[]; frac: number }) {
  const total = corpo.reduce((soma, p) => soma + p.length, 0)
  let restante = Math.round(total * frac)
  const digitando = frac < 1
  return (
    <>
      {corpo.map((p, i) => {
        const mostra = p.slice(0, Math.max(0, restante))
        const ativo = digitando && mostra.length > 0 && mostra.length < p.length
        restante -= p.length
        if (!mostra) return null
        return (
          <p key={i}>
            {mostra}
            {ativo && <span className="caret" aria-hidden="true" />}
          </p>
        )
      })}
    </>
  )
}

export default function Apresentacao() {
  const [idx, setIdx] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [done, setDone] = useState(false)
  const [audioFalhou, setAudioFalhou] = useState(false)
  const [frac, setFrac] = useState(0)
  const [chamado, setChamado] = useState(() => localStorage.getItem(CHAVE_CHAMADO) === '1')
  const [chamando, setChamando] = useState(false)
  const [erroChamar, setErroChamar] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const idxRef = useRef(idx)
  idxRef.current = idx

  function tocar(i: number) {
    const audio = audioRef.current
    if (!audio) return
    if (timerRef.current) clearTimeout(timerRef.current)
    setIdx(i)
    setDone(false)
    setAudioFalhou(false)
    setFrac(0)
    audio.src = PASSOS[i].audio
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        setPlaying(false)
        setAudioFalhou(true)
        setFrac(1)
      })
  }

  function aoTerminar() {
    setFrac(1)
    setPlaying(false)
    const proximo = idxRef.current + 1
    timerRef.current = setTimeout(() => {
      if (proximo < PASSOS.length) tocar(proximo)
      else setDone(true)
    }, 900)
  }

  function pausarOuContinuar() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {
          setAudioFalhou(true)
          setFrac(1)
        })
    }
  }

  async function chamarNelson() {
    if (chamado || chamando) return
    setChamando(true)
    setErroChamar(false)
    try {
      const res = await fetch(WEBHOOK_CHAMAR_NELSON, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origem: 'apresentacao', quando: new Date().toISOString() }),
      })
      if (!res.ok) throw new Error('webhook falhou')
      localStorage.setItem(CHAVE_CHAMADO, '1')
      setChamado(true)
    } catch {
      setErroChamar(true)
    } finally {
      setChamando(false)
    }
  }

  function pular() {
    const proximo = idxRef.current + 1
    if (proximo < PASSOS.length) {
      tocar(proximo)
    } else {
      audioRef.current?.pause()
      setPlaying(false)
      setDone(true)
    }
  }

  useEffect(() => {
    if (idx < 0) return
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [idx, done])

  useEffect(() => {
    const audio = audioRef.current
    return () => {
      audio?.pause()
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const passo = idx >= 0 ? PASSOS[idx] : null

  return (
    <div className="page">
      <audio
        ref={audioRef}
        onTimeUpdate={() => {
          const audio = audioRef.current
          if (audio && audio.duration > 0) {
            setFrac(Math.min(1, (audio.currentTime + 0.5) / audio.duration))
          }
        }}
        onEnded={aoTerminar}
        onError={() => {
          setPlaying(false)
          setAudioFalhou(true)
          setFrac(1)
        }}
      />

      <div className="eyebrow">Apresentação guiada · na voz do New</div>
      <h1 className="headline">Oi! Eu sou o New — deixa que eu apresento o Nelson</h1>
      <p className="lede">
        Aperte o play e eu conduzo daqui: a história, as ferramentas e os 18 requisitos da vaga — um card de cada
        vez, curto e direto.
      </p>

      <hr className="masthead-rule" />

      {idx < 0 ? (
        <div className="start-hero">
          <NewMascot talking={false} />
          <button className="start-button" type="button" onClick={() => tocar(0)}>
            ▶&nbsp;&nbsp;Começar a apresentação
          </button>
          <p className="start-hint">tem áudio — sobe o volume 🙏</p>
        </div>
      ) : (
        <div className="stage">
          <div className="mascot-col">
            <NewMascot talking={playing} />
            <div className="controls">
              <button
                className="ctrl-play"
                type="button"
                onClick={pausarOuContinuar}
                disabled={done}
                aria-label={playing ? 'pausar' : 'continuar'}
              >
                {playing ? '❚❚' : '▶'}
              </button>
              <button className="ctrl-sec" type="button" onClick={pular} disabled={done}>
                próximo →
              </button>
              <button className="ctrl-sec" type="button" onClick={() => tocar(0)}>
                ↺ recomeçar
              </button>
            </div>
            <span className="progress-label">
              {done ? 'apresentação concluída' : `passo ${idx + 1} de ${PASSOS.length}`}
            </span>
          </div>

          <div className="card-col">
            {passo && !done && (
              <div className="bubble" key={passo.id} ref={cardRef}>
                <div className="bubble-top">
                  <span className="bubble-chip">{passo.chip}</span>
                  {playing && (
                    <span className="speaking" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                  )}
                </div>
                <h2>{passo.titulo}</h2>
                <CorpoDigitado corpo={passo.corpo} frac={frac} />
                {passo.stacks && frac >= 0.15 && (
                  <div className="stack-groups">
                    {passo.stacks.map((s) => (
                      <div className="stack-group" key={s.grupo}>
                        <span className="stack-label">{s.grupo}</span>
                        <span className="stack-chips">
                          {s.itens.map((item) => (
                            <span className="stack-chip" key={item}>{item}</span>
                          ))}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {passo.projeto && frac >= 1 && <span className="qa-project">{passo.projeto}</span>}
                {audioFalhou && (
                  <p className="audio-fallback">
                    o áudio não carregou por aqui — usa o "próximo" que eu sigo no texto mesmo 🙏
                  </p>
                )}
              </div>
            )}

            {done && (
              <div className="bubble" key="fim" ref={cardRef}>
                <div className="bubble-top">
                  <span className="bubble-chip">é isso 🙏</span>
                </div>
                <h2>Ficou com alguma dúvida sobre o Nelson?</h2>
                <p>
                  Pode perguntar aqui embaixo que eu respondo na hora. E aquele RPA clássico de mouse e teclado,
                  estilo Macro Expert? O Nelson constrói esse tipo de automação em Python orientado por Claude Code:
                  descreve o fluxo, revisa o código e coloca pra rodar em minutos.
                </p>

                <ChatNew />

                <div className="call-block">
                  <button
                    className={`call-button ${chamado ? 'called' : ''}`}
                    type="button"
                    onClick={chamarNelson}
                    disabled={chamado || chamando}
                  >
                    {chamado ? (
                      <>✓&nbsp;&nbsp;Nelson já está a caminho</>
                    ) : chamando ? (
                      <>avisando…</>
                    ) : (
                      <>
                        <span className="call-dot" aria-hidden="true" />
                        Chamar Nelson agora
                      </>
                    )}
                  </button>
                  <p className="call-note">
                    {chamado
                      ? 'avisei o Nelson — pode voltar pro WhatsApp que a conversa continua com ele por lá 🙏'
                      : 'ao clicar, aviso o Nelson na hora e a conversa continua com ele no WhatsApp — só funciona uma vez'}
                  </p>
                  {erroChamar && (
                    <p className="call-erro">não consegui avisar agora — tenta de novo em instantes 🙏</p>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      <footer className="page-footer">
        página enviada pelo New quando a conversa no WhatsApp continua além da abertura
      </footer>
    </div>
  )
}
