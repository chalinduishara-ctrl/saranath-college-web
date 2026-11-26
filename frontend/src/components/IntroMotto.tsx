import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

let seenInSession = false
const EASE_OUT = [0.22, 1, 0.36, 1] as const
const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const

interface IntroMottoProps {
  motto: string
  mottoEn?: string
  logo: string
  name: string
  location?: string
  founded: number
  onReveal?: () => void
}

/** Choreographed opening veil: crest & motto settle, clear cleanly, then lift to reveal the Home hero. */
export default function IntroMotto({
  motto,
  mottoEn = 'Wisdom is the jewel of humankind',
  logo,
  name,
  location = 'Kuliyapitiya',
  founded,
  onReveal,
}: IntroMottoProps) {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<'enter' | 'clearing' | 'done'>(() => (seenInSession ? 'done' : 'enter'))
  const revealedRef = useRef(false)

  const triggerReveal = () => {
    if (!revealedRef.current) {
      revealedRef.current = true
      onReveal?.()
    }
  }

  useEffect(() => {
    if (phase === 'done') {
      triggerReveal()
      return
    }
    document.body.style.overflow = 'hidden'

    if (reduce) {
      const t = setTimeout(() => finish(), 300)
      return () => {
        clearTimeout(t)
        document.body.style.overflow = ''
      }
    }

    // 1) Let crest & motto rest comfortably, then gently clear text before lifting the veil
    const clearTimer = setTimeout(() => {
      setPhase('clearing')
    }, 2250)

    // 2) Lift the veil & trigger hero reveal in sync
    const liftTimer = setTimeout(() => {
      finish()
    }, 2620)

    return () => {
      clearTimeout(clearTimer)
      clearTimeout(liftTimer)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce])

  function finish() {
    seenInSession = true
    document.body.style.overflow = ''
    triggerReveal()
    setPhase('done')
  }

  const clearing = phase === 'clearing'

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="intro-curtain"
          className="fixed inset-0 z-[200] flex cursor-pointer items-center justify-center overflow-hidden bg-[#040a18] text-center text-white select-none"
          initial={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: reduce ? 0.25 : 0.95, ease: CURTAIN_EASE }}
          onClick={finish}
          role="dialog"
          aria-label={`${name} welcome`}
        >
          {/* Ambient twilight radial glow + warm sunset horizon light at the bottom edge */}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(28,87,196,0.22),transparent_55%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: clearing ? 0.3 : 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_85%_60%_at_50%_100%,rgba(217,168,69,0.2),transparent_72%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          {/* Centerpiece: gently drifts up and clears before the curtain sweeps upward */}
          <motion.div
            className="relative z-10 max-w-2xl px-6"
            animate={clearing ? { opacity: 0, y: -22 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: CURTAIN_EASE }}
          >
            <motion.div
              className="relative mx-auto w-fit"
              initial={{ opacity: 0, y: 18, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, ease: EASE_OUT }}
            >
              <div className="pointer-events-none absolute -inset-8 rounded-full bg-gold-400/15 blur-2xl" />
              <img
                src={logo}
                alt=""
                className="relative h-24 w-auto drop-shadow-[0_14px_30px_rgba(0,0,0,0.65)] sm:h-32"
              />
            </motion.div>

            <div className="mt-6 overflow-hidden sm:mt-8">
              <motion.p
                className="font-sinhala text-3xl font-bold leading-snug text-gold-300 sm:text-5xl"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ delay: 0.32, duration: 0.85, ease: EASE_OUT }}
              >
                {motto}
              </motion.p>
            </div>

            <motion.div
              className="mx-auto mt-5 h-px w-28 origin-center bg-gradient-to-r from-transparent via-gold-400/80 to-transparent sm:w-40"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.75, ease: EASE_OUT }}
            />

            <div className="mt-4 overflow-hidden">
              <motion.p
                className="font-serif text-lg italic text-white/85 sm:text-2xl"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ delay: 0.72, duration: 0.8, ease: EASE_OUT }}
              >
                “{mottoEn}”
              </motion.p>
            </div>

            <motion.div
              className="mt-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/55 sm:text-xs"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.92, duration: 0.7, ease: EASE_OUT }}
            >
              {name} · {location} · Est. {founded}
            </motion.div>
          </motion.div>

          {/* Warm gold horizon line along the curtain's bottom leading edge */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />

          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: clearing ? 0 : 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            onClick={(e) => {
              e.stopPropagation()
              finish()
            }}
            className="absolute bottom-7 right-6 z-20 min-h-[44px] whitespace-nowrap rounded-full border border-white/20 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-white/75 transition hover:border-gold-300/60 hover:bg-white/10 hover:text-white sm:bottom-10 sm:right-10"
          >
            Skip
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
