import { useEffect, useRef, useState } from 'react'
import { NewMascot } from '../components/NewMascot'
import { ReplyBox } from '../components/ReplyBox'
import bio from '../data/apresentacao-bio.json'
import requisitos from '../data/apresentacao-requisitos.json'
import './Apresentacao.css'

type Passo = {
  id: string
  audio: string
  chip: string
  titulo: string
  corpo: string[]
  projeto?: string
}

const PASSOS: Passo[] = [
  { id: 'bio', audio: '/audio/bio.mp3', chip: 'quem é o Nelson', titulo: bio.titulo, corpo: bio.paragrafos },
  ...requisitos.map((r) => ({
    id: r.id,
    audio: `/audio/${r.id}.mp3`,
    chip: r.grupo === 'obrigatorio' ? 'requisito obrigatório' : 'diferencial',
    titulo: r.req,
    corpo: [r.script],
    projeto: r.projeto,
  })),
]

export default function Apresentacao() {
  const [idx, setIdx] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [done, setDone] = useState(false)
  const [audioFalhou, setAudioFalhou] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const idxRef = useRef(idx)
  idxRef.current = idx

  function tocar(i: number) {
    const audio = audioRef.current
    if (!audio) return
    setIdx(i)
    setDone(false)
    setAudioFalhou(false)
    audio.src = PASSOS[i].audio
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        setPlaying(false)
        setAudioFalhou(true)
      })
  }

  function aoTerminar() {
    const proximo = idxRef.current + 1
    if (proximo < PASSOS.length) {
      tocar(proximo)
    } else {
      setPlaying(false)
      setDone(true)
    }
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
        .catch(() => setAudioFalhou(true))
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
    return () => audio?.pause()
  }, [])

  const passo = idx >= 0 ? PASSOS[idx] : null

  return (
    <div className="page">
      <audio
        ref={audioRef}
        onEnded={aoTerminar}
        onError={() => {
          setPlaying(false)
          setAudioFalhou(true)
        }}
      />

      <div className="eyebrow">Apresentação guiada · na voz do New</div>
      <h1 className="headline">Oi! Eu sou o New — deixa que eu apresento o Nelson</h1>
      <p className="lede">
        Aperte o play e eu conduzo daqui: primeiro conto como o Nelson chegou até aqui, depois passo pelos 18
        requisitos da vaga, um card de cada vez, explicando por que ele se encaixa em cada um — sempre com um
        projeto real de exemplo.
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
                {passo.corpo.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {passo.projeto && <span className="qa-project">{passo.projeto}</span>}
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
                <h2>Obrigado por me ouvir até aqui</h2>
                <p>
                  Esses foram os 18 requisitos, um por um. Quer rever algum? É só clicar nele aí embaixo. E se
                  quiser falar com o Nelson em pessoa, volta lá no WhatsApp e diz "falar com Nelson" — eu chamo ele
                  na hora.
                </p>
                <ReplyBox />
              </div>
            )}

            <div className="step-chips">
              {PASSOS.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  className={`step-chip ${i < idx || done ? 'done' : ''} ${i === idx && !done ? 'current' : ''}`}
                  onClick={() => tocar(i)}
                >
                  {i === 0 ? 'a história' : p.titulo}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <footer className="page-footer">
        página enviada pelo New quando a conversa no WhatsApp continua além da abertura
      </footer>
    </div>
  )
}
