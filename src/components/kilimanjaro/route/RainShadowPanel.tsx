import { CloudRain } from "lucide-react";

export default function RainShadowPanel() {
  return (
    <section aria-labelledby="rongai-rain-shadow-heading" className="overflow-hidden rounded-3xl border border-sky-200 bg-sky-50 p-6 shadow-card sm:p-8">
      <div className="grid items-center gap-8 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-eyebrow text-terracotta">A different side of the mountain</p>
          <h2 id="rongai-rain-shadow-heading" className="mt-3 font-heading text-3xl text-earth">Why Rongai Stays Drier</h2>
          <p className="mt-4 leading-7 text-muted">The prevailing winds bring most rain to Kilimanjaro&apos;s southern slopes. By the time the air reaches the northern side, it has lost much of its moisture. Rongai&apos;s rain-shadow position often means drier trails when the south is wet, though mountain weather can never be guaranteed.</p>
        </div>
        <figure>
          <svg viewBox="0 0 640 230" role="img" aria-labelledby="rongai-diagram-title rongai-diagram-description" className="w-full">
            <title id="rongai-diagram-title">Kilimanjaro&apos;s northern rain shadow</title>
            <desc id="rongai-diagram-description">Moist winds bring rain to the southern slopes while the northern Rongai approach is often drier.</desc>
            <defs>
              <linearGradient id="rongai-slope" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#d7bf80" />
                <stop offset="100%" stopColor="#66816a" />
              </linearGradient>
            </defs>
            <path d="M56 190 Q150 178 215 145 L300 45 L386 145 Q468 181 584 190 Z" fill="url(#rongai-slope)" />
            <path d="M267 82 L300 45 L334 82 L319 74 L300 82 L283 72 Z" fill="#f8f6ec" />
            <path d="M42 70 C105 54 150 62 197 80" fill="none" stroke="#4387a5" strokeWidth="5" strokeLinecap="round" strokeDasharray="12 10" />
            <path d="M197 81 C222 100 231 125 238 145" fill="none" stroke="#4387a5" strokeWidth="4" strokeLinecap="round" strokeDasharray="7 9" />
            <path d="M426 74 C470 60 510 64 562 80" fill="none" stroke="#c89a41" strokeWidth="5" strokeLinecap="round" strokeDasharray="12 10" />
            <path d="M462 106 L462 125 M486 108 L486 127 M510 106 L510 125" stroke="#4387a5" strokeWidth="3" strokeLinecap="round" />
            <text x="54" y="46" fill="#355b6a" fontSize="16" fontWeight="600">Moist winds</text>
            <text x="103" y="214" fill="#382f25" fontSize="15" fontWeight="600">South: more rain</text>
            <text x="430" y="214" fill="#382f25" fontSize="15" fontWeight="600">North: Rongai, often drier</text>
            <g className="rain-shadow-sun">
              <circle cx="523" cy="50" r="19" fill="#e6b94f" />
              <path d="M523 20 V10 M523 90 V80 M493 50 H483 M563 50 H553 M502 29 L495 22 M551 78 L544 71 M544 29 L551 22 M495 78 L502 71" stroke="#d9a83b" strokeWidth="3" strokeLinecap="round" />
            </g>
            <CloudRain aria-hidden="true" x={149} y={71} width={34} height={34} color="#4387a5" />
          </svg>
          <figcaption className="sr-only">A simple illustration of the southern rain and the drier northern Rongai approach.</figcaption>
        </figure>
      </div>
    </section>
  );
}
