import './NewMascot.css'

// O New em pessoa: um rapaz engravatado estilo mascote (na linha do Clippy).
// Quando talking=true, a boca abre e fecha, o braço acena e as sobrancelhas
// sobem — tudo via CSS, sem lib de animação.
export function NewMascot({ talking }: { talking: boolean }) {
  return (
    <svg
      className={`mascot ${talking ? 'talking' : ''}`}
      viewBox="0 0 220 300"
      role="img"
      aria-label="New, o assistente virtual do Nelson"
    >
      <ellipse cx="110" cy="290" rx="52" ry="8" fill="rgba(0,0,0,0.14)" />
      <g className="m-float">
        {/* pernas e sapatos */}
        <rect x="88" y="246" width="15" height="30" rx="7" fill="#232830" />
        <rect x="117" y="246" width="15" height="30" rx="7" fill="#232830" />
        <ellipse cx="93" cy="279" rx="15" ry="7" fill="#171b20" />
        <ellipse cx="127" cy="279" rx="15" ry="7" fill="#171b20" />

        {/* braço esquerdo (parado) */}
        <rect x="56" y="176" width="18" height="64" rx="9" fill="#2f3640" transform="rotate(9 65 180)" />
        <circle cx="58" cy="243" r="9" fill="#f2c29b" />

        {/* corpo / paletó */}
        <rect x="66" y="160" width="88" height="98" rx="28" fill="#2f3640" />
        {/* camisa */}
        <path d="M110 162 L92 162 L110 210 L128 162 Z" fill="#f6f7f1" />
        {/* lapelas */}
        <path d="M92 162 L110 186 L92 180 Z" fill="#262c34" />
        <path d="M128 162 L110 186 L128 180 Z" fill="#262c34" />
        {/* gravata */}
        <rect x="104.5" y="163" width="11" height="7" rx="2.5" fill="var(--accent, #2b6b57)" />
        <path d="M110 169 L103 178 L110 204 L117 178 Z" fill="var(--accent, #2b6b57)" />

        {/* braço direito (acena quando fala) */}
        <g className="m-arm-wave">
          <rect x="141" y="152" width="18" height="58" rx="9" fill="#2f3640" transform="rotate(-38 150 207)" />
          <circle cx="177" cy="153" r="10" fill="#f2c29b" />
        </g>

        {/* cabeça */}
        <g className="m-head">
          <rect x="101" y="146" width="18" height="18" rx="6" fill="#e8b48d" />
          <circle cx="53" cy="98" r="9" fill="#f2c29b" />
          <circle cx="167" cy="98" r="9" fill="#f2c29b" />
          <circle cx="110" cy="98" r="56" fill="#f2c29b" />
          {/* cabelo */}
          <path d="M54 98 A56 56 0 0 1 166 98 L155 98 A45 45 0 0 0 65 98 Z" fill="#3a2f2a" />
          <path d="M65 98 A45 45 0 0 1 110 53 C 90 60 76 74 71 98 Z" fill="#3a2f2a" />
          {/* sobrancelhas */}
          <rect className="m-brow" x="76" y="79" width="22" height="6" rx="3" fill="#3a2f2a" />
          <rect className="m-brow" x="122" y="79" width="22" height="6" rx="3" fill="#3a2f2a" />
          {/* olhos */}
          <ellipse cx="88" cy="97" rx="12" ry="13" fill="#ffffff" />
          <ellipse cx="132" cy="97" rx="12" ry="13" fill="#ffffff" />
          <circle cx="90" cy="99" r="5.2" fill="#23282e" />
          <circle cx="134" cy="99" r="5.2" fill="#23282e" />
          <circle cx="92" cy="97" r="1.8" fill="#ffffff" />
          <circle cx="136" cy="97" r="1.8" fill="#ffffff" />
          {/* pálpebras (piscada) */}
          <rect className="m-lid" x="75" y="83" width="26" height="28" rx="10" fill="#f2c29b" />
          <rect className="m-lid" x="119" y="83" width="26" height="28" rx="10" fill="#f2c29b" />
          {/* nariz */}
          <path d="M108 104 q5 7 -2 9" stroke="#dda47c" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* bochechas */}
          <circle cx="72" cy="112" r="6.5" fill="rgba(224,122,95,0.25)" />
          <circle cx="148" cy="112" r="6.5" fill="rgba(224,122,95,0.25)" />
          {/* boca: sorriso parado + boca falante */}
          <path className="m-smile" d="M96 122 Q110 134 124 122" stroke="#b96a4b" strokeWidth="4" fill="none" strokeLinecap="round" />
          <g className="m-talk">
            <ellipse cx="110" cy="126" rx="11" ry="9" fill="#7c3b32" />
            <ellipse cx="110" cy="130" rx="6" ry="3.5" fill="#e07a5f" />
          </g>
        </g>
      </g>
    </svg>
  )
}
