'use client';
export default function Sharingan({ mangekyou = false }: { mangekyou?: boolean }) {
  return <svg className={`sharingan-svg ${mangekyou ? 'mangekyou' : ''}`} viewBox="0 0 400 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustração animada do Sharingan de Sasuke">
    <defs><radialGradient id="iris"><stop stopColor="#ff667a"/><stop offset=".55" stopColor="#d81e45"/><stop offset="1" stopColor="#2d050e"/></radialGradient><filter id="glow"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <path d="M15 135 Q200 -28 385 135 Q200 298 15 135Z" fill="#0b0815" stroke="#7e243d" strokeWidth="4"/>
    <path d="M26 135Q200-9 374 135Q200 274 26 135Z" fill="#e9b6c2" opacity=".92"/>
    <circle cx="200" cy="135" r="99" fill="url(#iris)" stroke="#30020d" strokeWidth="8" filter="url(#glow)"/>
    <circle cx="200" cy="135" r="73" fill="none" stroke="#19000b" strokeWidth="5" opacity=".8" />
    <g className="sharingan-tomoe" fill="#150309">
      {[0, 120, 240].map(d => <g key={d} transform={`rotate(${d} 200 135)`}><circle cx="200" cy="62" r="13"/><path d="M188 58 Q178 34 205 29 Q196 42 209 61Z"/></g>)}
    </g>
    <g className="sharingan-mangekyou" fill="#18020d">
      <path d="M200 45 C230 85 266 80 279 120 C255 112 236 121 225 144 C239 175 224 206 200 225 C203 190 190 168 161 161 C132 180 106 164 101 135 C128 147 149 137 164 106 C146 82 162 55 200 45Z"/>
      <path d="M199 63 Q220 100 262 119 Q229 125 217 151 Q202 184 198 207 Q185 171 148 153 Q125 139 119 132 Q167 141 182 98Z" fill="#ad183a"/>
    </g>
    <circle cx="200" cy="135" r="24" fill="#17030b"/>
    <circle cx="200" cy="135" r="9" fill="#020106"/>
    <path d="M39 125Q196 -10 361 124" fill="none" stroke="white" opacity=".16" strokeWidth="11" strokeLinecap="round"/>
    <path d="M15 135Q200 -28 385 135" fill="none" stroke="#08050b" strokeWidth="18" strokeLinecap="round"/>
    <path d="M15 135Q200 298 385 135" fill="none" stroke="#08050b" strokeWidth="15" strokeLinecap="round"/>
  </svg>;
}
