import { useRef, useState } from 'react'
import './PlayButton.css'

export function PlayButton({ src, label, onEnded }: { src: string; label: string; onEnded?: () => void }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [state, setState] = useState<'idle' | 'playing' | 'missing'>('idle')

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (state === 'playing') {
      audio.pause()
      audio.currentTime = 0
      setState('idle')
      return
    }
    audio.currentTime = 0
    audio.play().then(() => setState('playing')).catch(() => setState('missing'))
  }

  return (
    <span className="play-button-wrap">
      <button type="button" className={`play-button ${state}`} onClick={toggle} aria-label={label}>
        {state === 'playing' ? '❚❚' : '▶'}
      </button>
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onEnded={() => {
          setState('idle')
          onEnded?.()
        }}
        onError={() => setState('missing')}
      />
      {state === 'missing' && <span className="play-missing">áudio ainda não gerado</span>}
    </span>
  )
}
