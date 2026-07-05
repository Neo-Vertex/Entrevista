import { Nav } from '../components/Nav'
import { PlayButton } from '../components/PlayButton'
import bio from '../data/apresentacao-bio.json'
import requisitos from '../data/apresentacao-requisitos.json'
import './Apresentacao.css'

const OBRIGATORIOS = requisitos.filter((r) => r.grupo === 'obrigatorio')
const DIFERENCIAIS = requisitos.filter((r) => r.grupo === 'diferencial')

export default function Apresentacao() {
  return (
    <div className="page">
      <div className="eyebrow">Continuação da apresentação, enviada pelo New</div>
      <h1 className="headline">Os requisitos da vaga, um por um — com o New respondendo</h1>
      <p className="lede">
        Cada requisito da vaga, o porquê o Nelson se encaixa nele, e um projeto real que resolveria essa questão na
        prática. Clique no play pra ouvir o New respondendo, com a mesma voz de quem te recebeu no WhatsApp.
      </p>
      <Nav current="/apresentacao" />

      <hr className="masthead-rule" />

      <div className="bio-section">
        <div className="bio-head">
          <h2>{bio.titulo}</h2>
          <PlayButton src="/audio/bio.mp3" label="ouvir o New apresentando o Nelson" />
        </div>
        {bio.paragrafos.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="qa-group-head">
        <span className="eyebrow">Requisitos obrigatórios</span>
        <h2>O que a vaga exige pra considerar o candidato</h2>
      </div>
      <div className="qa-list">
        {OBRIGATORIOS.map((item) => (
          <div className="qa-card" id={item.id} key={item.id}>
            <div className="qa-head">
              <h3>{item.req}</h3>
              <PlayButton src={`/audio/${item.id}.mp3`} label={`ouvir o New responder sobre ${item.req}`} />
            </div>
            <p>{item.script}</p>
            <span className="qa-project">{item.projeto}</span>
          </div>
        ))}
      </div>

      <div className="qa-group-head">
        <span className="eyebrow">Diferenciais</span>
        <h2>O que não elimina, mas separa candidatos</h2>
      </div>
      <div className="qa-list">
        {DIFERENCIAIS.map((item) => (
          <div className="qa-card" id={item.id} key={item.id}>
            <div className="qa-head">
              <h3>{item.req}</h3>
              <PlayButton src={`/audio/${item.id}.mp3`} label={`ouvir o New responder sobre ${item.req}`} />
            </div>
            <p>{item.script}</p>
            <span className="qa-project">{item.projeto}</span>
          </div>
        ))}
      </div>

      <footer className="page-footer">
        página enviada pelo New quando a conversa no WhatsApp continua além da abertura
      </footer>
    </div>
  )
}
