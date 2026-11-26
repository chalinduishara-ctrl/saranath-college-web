import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

let introPlayed = false

export function hasIntroPlayed(): boolean {
  return introPlayed
}

function graphemes(text: string): string[] {
  try {
    const Seg = (
      Intl as unknown as {
        Segmenter?: new (l: string, o: { granularity: string }) => { segment(t: string): Iterable<{ segment: string }> }
      }
    ).Segmenter
    if (Seg) return [...new Seg('si', { granularity: 'grapheme' }).segment(text)].map((s) => s.segment)
  } catch {
    /* fall through */
  }
  return text.split(/(\s)/)
}

interface IntroMottoProps {
  motto: string
  mottoEn?: string
  logo: string
  name: string
  location?: string
  founded: number
  onRevealHero?: () => void
}

/**
 * Full-screen opening that introduces the College crest and Sinhala motto,
 * then cross-dissolves directly into the Hero welcome headline.
 */
export default function IntroMotto({
  motto,
  mottoEn = 'Wisdom is the jewel of humankind',
  logo,
  name,
  location = 'Kuliyapitiya',
  founded,
  onRevealHero,
}: IntroMottoProps) {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(() => !introPlayed)

  const parts = useMemo(() => graphemes(motto), [motto])
  const typingEnd = 0.36 + parts.length * 0.038

  const close = useCallback(() => {
    introPlayed = true
    document.body.style.overflow = ''
    onRevealHero?.()
    setShow(false)
  }, [onRevealHero])

  useEffect(() => {
    if (!show) {
      onRevealHero?.()
      return
    }
    document.body.style.overflow = 'hidden'
    const durationMs = reduce ? 420 : Math.round((typingEnd + 0.95) * 1000)
    const timer = window.setTimeout(close, durationMs)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') close()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [show, reduce, typingEnd, close, onRevealHero])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: reduce ? 1 : 1.035 }}
          transition={{ duration: reduce ? 0.2 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${name} welcome`}
          className="fixed inset-0 z-[200] grid cursor-pointer place-items-center overflow-hidden bg-navy-950/92 text-center text-white backdrop-blur-md"
        >
          {/* Warm twilight-to-sunset ambient glow bridging into the hero photograph */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,168,69,0.16)_0%,rgba(28,87,196,0.22)_40%,rgba(3,11,32,0.96)_78%)]" />

          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-400/12 sm:h-[40rem] sm:w-[40rem]"
            initial={{ scale: 0.68, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-400/20 sm:h-[26rem] sm:w-[26rem]"
            initial={{ scale: 0.62, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          />

          <div className="relative px-6">
            <motion.img
              src={logo}
              alt=""
              className="mx-auto h-24 w-auto drop-shadow-[0_0_36px_rgba(230,189,94,0.42)] sm:h-32"
              initial={{ scale: 0.84, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />

            <div
              className="mt-6 font-sinhala text-3xl font-bold leading-snug text-gold-300 sm:mt-8 sm:text-5xl lg:text-6xl"
              aria-label={motto}
            >
              {parts.map((p, i) =>
                p.trim() === '' ? (
                  <span key={i}>&nbsp;</span>
                ) : (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: reduce ? 0 : 0.34 + i * 0.038,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {p}
                  </motion.span>
                ),
              )}
            </div>

            <motion.p
              className="mt-3 font-serif text-base italic text-white/80 sm:text-xl"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : typingEnd - 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {mottoEn}
            </motion.p>

            <motion.div
              className="mx-auto mt-5 h-px w-36 bg-gradient-to-r from-transparent via-gold-400 to-transparent sm:mt-6 sm:w-48"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: reduce ? 0 : typingEnd - 0.05, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.div
              className="mt-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-gold-300/90 sm:mt-5 sm:text-xs sm:tracking-[0.38em]"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : typingEnd + 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Welcome to {name} · {location} · {founded}
            </motion.div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              close()
            }}
            className="absolute bottom-20 right-4 min-h-[44px] min-w-[44px] rounded-full border border-white/25 px-5 py-2 text-[0.7rem] font-bold tracking-[0.25em] text-white/85 whitespace-nowrap transition hover:bg-white/10 lg:bottom-8 lg:right-6"
          >
            SKIP
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
