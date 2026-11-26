import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Briefcase, Check, ChevronDown, Target } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Reveal, SectionHeading } from '../components/Reveal'
import Img from '../components/Img'
import { Skeletons } from '../components/Cards'
import { CAMPUS_PHOTOS } from '../lib/campusMedia'
import { useAcademics } from '../lib/hooks'

export default function Academics() {
  const { data } = useAcademics()
  const [searchParams] = useSearchParams()
  const streamParam = searchParams.get('stream')
  const alParam = searchParams.get('al')
  const initialStream = streamParam !== null && !Number.isNaN(Number(streamParam)) ? Math.max(0, Number(streamParam)) : 0

  const [showStreams, setShowStreams] = useState(() => alParam === 'open' || streamParam !== null)
  const [active, setActive] = useState(initialStream)
  const streamsRef = useRef<HTMLDivElement>(null)

  const streams = data?.streams ?? []
  const s = streams[active] ?? streams[0]

  useEffect(() => {
    if (streamParam !== null && !Number.isNaN(Number(streamParam))) {
      setShowStreams(true)
      setActive(Math.max(0, Number(streamParam)))
    } else if (alParam === 'open') {
      setShowStreams(true)
    }
  }, [streamParam, alParam])

  useEffect(() => {
    if ((alParam === 'open' || streamParam !== null) && streams.length > 0 && streamsRef.current) {
      streamsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [alParam, streamParam, streams.length])

  const toggleAL = () => {
    setShowStreams((prev) => {
      const next = !prev
      if (next) {
        setTimeout(() => {
          streamsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 120)
      }
      return next
    })
  }

  return (
    <>
      <PageHero eyebrow="Education & Academic Pathways" title="Academics" lead="A learning journey from junior secondary through the G.C.E. Ordinary Level and Advanced Level programmes." image={CAMPUS_PHOTOS.corridorPalm} />

      <section className="bg-paper py-16 sm:py-24">
        <div className="wrap">
          <SectionHeading eyebrow="01. Stages of Learning" title="Stages of learning" />
          <div className="relative grid gap-5 sm:gap-6 md:grid-cols-3">
            <div className="absolute left-0 right-0 top-[3.25rem] hidden h-px bg-gradient-to-r from-gold-500/0 via-gold-500 to-gold-500/0 md:block" />
            {data ? data.levels.map((l, i) => {
              const isAL = /a\/l|advanced level/i.test(l.name)
              if (isAL) {
                return (
                  <Reveal key={l.id} delay={i * 0.08} className="h-full">
                    <button
                      type="button"
                      onClick={toggleAL}
                      aria-expanded={showStreams}
                      aria-controls="al-streams"
                      className={`card group relative flex h-full w-full flex-col overflow-hidden text-left transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-18px_rgba(6,23,61,.26)] ${showStreams ? 'ring-2 ring-gold-500' : ''}`}
                    >
                      <div className="flex items-center gap-4 p-5 sm:p-6">
                        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy-900 font-serif text-xl font-bold text-gold-400 ring-4 ring-paper tabular-nums sm:h-14 sm:w-14 sm:text-2xl sm:ring-8">{i + 1}</div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.18em] text-gold-600">{l.grade_range}</div>
                          <h3 className="font-serif text-xl font-semibold text-navy-900 sm:text-2xl">{l.name}</h3>
                        </div>
                      </div>
                      <Img src={l.image} alt={l.name} className="aspect-[4/3] w-full object-cover object-center transition duration-500 group-hover:scale-[1.03]" />
                      <p className="flex-1 p-5 text-sm leading-7 text-muted sm:p-6">{l.description}</p>
                      <div className="flex items-center justify-between border-t border-line bg-paper/60 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-navy-900 sm:px-6">
                        <span>{showStreams ? 'Hide A/L streams' : 'Choose your stream'}</span>
                        <ChevronDown className={`h-4 w-4 text-gold-600 transition-transform duration-300 ${showStreams ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                  </Reveal>
                )
              }
              return (
                <Reveal key={l.id} delay={i * 0.08} className="card relative flex h-full flex-col overflow-hidden">
                  <div className="flex items-center gap-4 p-5 sm:p-6">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy-900 font-serif text-xl font-bold text-gold-400 ring-4 ring-paper tabular-nums sm:h-14 sm:w-14 sm:text-2xl sm:ring-8">{i + 1}</div>
                    <div><div className="text-xs font-bold uppercase tracking-[0.18em] text-gold-600">{l.grade_range}</div><h3 className="font-serif text-xl font-semibold text-navy-900 sm:text-2xl">{l.name}</h3></div>
                  </div>
                  <Img src={l.image} alt={l.name} className="aspect-[4/3] w-full object-cover object-center" />
                  <p className="p-5 text-sm leading-7 text-muted sm:p-6">{l.description}</p>
                </Reveal>
              )
            }) : <Skeletons n={3} className="h-96" />}
          </div>

          <AnimatePresence initial={false}>
            {showStreams && streams.length > 0 && s && (
              <motion.div
                id="al-streams"
                ref={streamsRef}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12 scroll-mt-24 rounded-3xl border border-line bg-white p-6 shadow-[0_12px_36px_-18px_rgba(6,23,61,.16)] sm:mt-16 sm:p-10"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <SectionHeading
                    eyebrow="02. Advanced Level"
                    title="Choose your stream"
                    lead="Subject combinations and availability can change. Please contact the school office for current A/L options."
                  />
                  <button
                    type="button"
                    onClick={() => setShowStreams(false)}
                    className="btn-outline mb-8 shrink-0 self-start sm:mb-12 sm:self-auto"
                  >
                    Close <ChevronDown className="h-4 w-4 rotate-180" />
                  </button>
                </div>

                <div className="space-y-8">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="tablist" aria-label="A/L streams">
                    {streams.map((st, i) => {
                      const isActive = i === active
                      return (
                        <button
                          key={st.id}
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => setActive(i)}
                          className={`group relative flex flex-col overflow-hidden rounded-2xl text-left transition duration-300 ${
                            isActive
                              ? 'bg-navy-900 text-white ring-2 ring-gold-500 shadow-[0_18px_36px_-18px_rgba(6,23,61,.45)]'
                              : 'border border-line bg-paper text-navy-900 hover:-translate-y-0.5 hover:border-navy-900/25 hover:bg-white hover:shadow-md'
                          }`}
                        >
                          <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-950">
                            <Img
                              src={st.image}
                              alt={st.name}
                              className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
                            <span
                              className={`absolute left-3.5 top-3 font-serif text-xl font-bold tabular-nums sm:text-2xl ${
                                isActive ? 'text-gold-400' : 'text-white/85'
                              }`}
                            >
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="absolute bottom-2.5 left-3.5 right-3.5 truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300">
                              {st.category}
                            </span>
                          </div>
                          <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                            <div>
                              <h3 className="font-serif text-xl font-semibold leading-snug sm:text-2xl">{st.name}</h3>
                              <p className={`mt-1.5 line-clamp-2 text-xs leading-5 ${isActive ? 'text-white/75' : 'text-muted'}`}>
                                {st.focus || st.description}
                              </p>
                            </div>
                            <div className={`mt-3 border-t pt-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] tabular-nums ${isActive ? 'border-white/15 text-gold-300' : 'border-line text-navy-900/65'}`}>
                              {st.subjects.length} subjects
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div key={s.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }} className="card overflow-hidden">
                      <div className="grid bg-navy-950 text-white md:grid-cols-[1.05fr_0.95fr]">
                        <div className="relative aspect-[4/3] overflow-hidden bg-navy-950 md:aspect-auto md:min-h-[340px]">
                          {s.image === CAMPUS_PHOTOS.mainHall || s.image === CAMPUS_PHOTOS.scienceSection ? (
                            <Img src={s.image} alt={s.name} className="h-full w-full object-cover object-center" />
                          ) : (
                            <>
                              <img src={s.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-2xl" />
                              <div className="absolute inset-0 bg-navy-950/30" />
                              <Img src={s.image} alt={s.name} className="relative z-10 mx-auto h-full w-auto object-contain" />
                            </>
                          )}
                          <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-navy-950/40" />
                        </div>
                        <div className="flex flex-col justify-center p-6 sm:p-8">
                          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">{s.category}</div>
                          <h3 className="mt-2 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">{s.name}</h3>
                          <p className="mt-3 text-sm leading-7 text-white/80 sm:text-base">{s.description}</p>
                        </div>
                      </div>
                      <div className="grid gap-6 p-5 sm:gap-8 sm:p-8 md:grid-cols-[0.85fr_1.15fr]">
                        <div>
                          <div className="eyebrow">Pathway Overview</div>
                          <div className="mt-4 space-y-4 text-sm">
                            {s.focus && <div className="flex gap-3"><Target className="h-5 w-5 shrink-0 text-gold-600" /><div><b className="text-navy-900">Focus.</b> {s.focus}</div></div>}
                            {s.careers && <div className="flex gap-3"><Briefcase className="h-5 w-5 shrink-0 text-gold-600" /><div><b className="text-navy-900">Careers.</b> {s.careers}</div></div>}
                          </div>
                        </div>
                        <div className="rounded-2xl bg-paper p-5 sm:p-6">
                          <div className="eyebrow">Subjects</div>
                          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                            {s.subjects.map((sub, i) => (
                              <motion.li
                                key={sub}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.04 + i * 0.03 }}
                                className="flex items-start gap-2.5 rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-medium text-navy-900"
                              >
                                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-500 text-navy-900"><Check className="h-3 w-3" /></span>
                                <span>{sub}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
