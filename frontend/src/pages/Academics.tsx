import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowDown, ArrowRight, BookOpen, Briefcase, Check, ChevronUp, GraduationCap, Layers, Target, X } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Reveal, SectionHeading } from '../components/Reveal'
import Img from '../components/Img'
import { Skeletons } from '../components/Cards'
import { CAMPUS_PHOTOS } from '../lib/campusMedia'
import { useAcademics } from '../lib/hooks'
import type { Level } from '../lib/types'

type StageKey = 'junior' | 'ol' | 'al'

interface StageMeta {
  key: StageKey
  subtitle: string
  highlights: string[]
  summaryLabel: string
  assessment: string
  ctaLabel: string
  activeCtaLabel: string
  detail?: {
    overview: string
    groups: { title: string; items: string[] }[]
    support: string
  }
}

const STAGE_META: Record<StageKey, StageMeta> = {
  junior: {
    key: 'junior',
    subtitle: 'Sinhala, Tamil & English Mediums',
    highlights: [
      'Core literacy & numeracy in Sinhala, English, Tamil, Maths & Science',
      'Humanities & civic values through History, Geography & Religion',
      'Applied & aesthetic discovery across ICT, Health, Art, Music & Drama',
    ],
    summaryLabel: '11 Core & Aesthetic Subjects',
    assessment: 'Term evaluations & continuous projects',
    ctaLabel: 'View curriculum & subjects',
    activeCtaLabel: 'Hide curriculum details',
    detail: {
      overview:
        'Grades 6 to 8 bridge primary learning and secondary scholarship, giving every Saranath student a broad foundation in languages, scientific inquiry, mathematics and creative expression.',
      groups: [
        {
          title: 'Core Academic Subjects',
          items: [
            'First Language (Sinhala / Tamil)',
            'English Language & Second National Language',
            'Mathematics & Integrated Science',
            'History, Geography & Civic Education',
            'Religious Education',
          ],
        },
        {
          title: 'Practical, Aesthetic & Co-Curricular',
          items: [
            'Information & Communication Technology (ICT)',
            'Health & Physical Education',
            'Practical & Technical Skills',
            'Art, Oriental & Western Music, Dancing & Drama',
            'Junior Science, Literary Circles & House Sports',
          ],
        },
      ],
      support:
        'Taught across the Gajaba Hall classrooms, junior science rooms, school library and sports grounds with guided transition into Grade 9.',
    },
  },
  ol: {
    key: 'ol',
    subtitle: 'G.C.E. (O/L) National Track',
    highlights: [
      '6 national core subjects: Religion, First Language, English, Maths, Science & History',
      '3 elective basket groups spanning Commerce, ICT, Agriculture & Aesthetics',
      'Exam readiness with School-Based Assessments (SBA), lab work & model papers',
    ],
    summaryLabel: '9 Examination Subjects',
    assessment: 'SBA & G.C.E. Ordinary Level Exam',
    ctaLabel: 'View O/L subjects & baskets',
    activeCtaLabel: 'Hide O/L details',
    detail: {
      overview:
        'Across Grades 9 to 11, students master six national core subjects alongside three specialised elective baskets, building strong analytical habits for the G.C.E. Ordinary Level examination and senior A/L stream selection.',
      groups: [
        {
          title: 'Six Compulsory Core Subjects',
          items: [
            'Religion (Buddhism / Hinduism / Catholicism / Islam)',
            'First Language (Sinhala or Tamil)',
            'English Language',
            'Mathematics',
            'Science',
            'History',
          ],
        },
        {
          title: 'Three Elective Basket Groups (I, II & III)',
          items: [
            'Basket I: Business & Accounting, Geography, Civic Education, Second Languages',
            'Basket II: Art, Dancing, Oriental & Western Music, Sinhala / English Literature, Drama',
            'Basket III: Information & Communication Technology (ICT), Agriculture, Health & Physical Education',
          ],
        },
      ],
      support:
        'Supported by dedicated O/L Science and ICT laboratories, termly revision clinics, and individual A/L pathway guidance in Grade 11.',
    },
  },
  al: {
    key: 'al',
    subtitle: '5 Specialised Streams · University Track',
    highlights: [
      'Physical Science, Biological Science, Commerce, Arts & Technology streams',
      'Three-storey Faculty of Technology, Science laboratories & research library',
      'General English, Common General Test & university Z-score mentoring',
    ],
    summaryLabel: '5 A/L Streams',
    assessment: 'G.C.E. Advanced Level Examination',
    ctaLabel: 'Choose your A/L stream',
    activeCtaLabel: 'Viewing A/L streams below',
  },
}

function resolveStageKey(level: Level, index: number): StageKey {
  const text = `${level.name} ${level.grade_range}`.toLowerCase()
  if (text.includes('advanced') || text.includes('a/l') || text.includes('12')) return 'al'
  if (text.includes('ordinary') || text.includes('o/l') || text.includes('9')) return 'ol'
  if (text.includes('junior') || text.includes('6')) return 'junior'
  return (['junior', 'ol', 'al'] as const)[index] ?? 'junior'
}

const OVERVIEW_FACTS = [
  { value: 'Grades 6–13', label: 'Secondary & Collegiate Wings' },
  { value: 'Sinhala · Tamil · English', label: 'Trilingual Learning Heritage' },
  { value: 'Core + 3 Baskets', label: 'Balanced O/L Curriculum' },
  { value: '5 A/L Streams', label: 'Science, Commerce, Arts & Tech' },
]

export default function Academics() {
  const { data } = useAcademics()
  const [searchParams, setSearchParams] = useSearchParams()
  const [active, setActive] = useState(0)
  const [openStage, setOpenStage] = useState<StageKey | null>(null)
  const [streamsOpen, setStreamsOpen] = useState(false)
  const streamsSectionRef = useRef<HTMLElement | null>(null)

  const streams = useMemo(() => data?.streams ?? [], [data?.streams])
  const s = streams[active]

  // Open A/L streams automatically only if explicitly requested via URL query (e.g. from Home stream links)
  useEffect(() => {
    const requested = searchParams.get('stream')
    if (!requested || streams.length === 0) return
    const idx = streams.findIndex((st) => st.name.toLowerCase() === requested.toLowerCase())
    if (idx >= 0) setActive(idx)
    setStreamsOpen(true)
    setOpenStage('al')
    const timer = window.setTimeout(() => {
      streamsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 140)
    return () => window.clearTimeout(timer)
  }, [searchParams, streams])

  const handleStageClick = (key: StageKey) => {
    if (key === 'al') {
      setStreamsOpen(true)
      setOpenStage('al')
      window.setTimeout(() => {
        streamsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 90)
      return
    }
    setOpenStage((prev) => (prev === key ? null : key))
  }

  const handleCloseStreams = () => {
    setStreamsOpen(false)
    if (openStage === 'al') setOpenStage(null)
    if (searchParams.has('stream')) {
      const next = new URLSearchParams(searchParams)
      next.delete('stream')
      setSearchParams(next, { replace: true })
    }
  }

  const activeStageMeta = openStage && openStage !== 'al' ? STAGE_META[openStage] : null
  const activeStageLevel =
    openStage && openStage !== 'al' && data
      ? data.levels.find((l, i) => resolveStageKey(l, i) === openStage)
      : undefined

  return (
    <>
      <PageHero
        eyebrow="Education & Academic Pathways"
        title="Academics"
        lead="A learning journey from junior secondary through the G.C.E. Ordinary Level and Advanced Level programmes."
        image={CAMPUS_PHOTOS.corridorPalm}
      />

      <section className="bg-paper py-16 sm:py-24">
        <div className="wrap">
          <SectionHeading
            eyebrow="01. Stages of Learning"
            title="Stages of learning"
            lead="Three structured stages guide students from foundational literacy and exploration to national examinations and five specialised A/L pathways."
          />

          {/* Curriculum Overview Strip */}
          <Reveal className="mb-10 grid grid-cols-2 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            {OVERVIEW_FACTS.map((fact) => (
              <div key={fact.label} className="px-5 py-4 sm:px-6 sm:py-5">
                <div className="font-serif text-lg font-bold text-navy-900 tabular-nums sm:text-xl">{fact.value}</div>
                <div className="mt-0.5 text-xs text-muted">{fact.label}</div>
              </div>
            ))}
          </Reveal>

          <div className="relative grid gap-5 sm:gap-6 md:grid-cols-3">
            <div className="absolute left-0 right-0 top-[3.25rem] hidden h-px bg-gradient-to-r from-gold-500/0 via-gold-500 to-gold-500/0 md:block" />
            {data ? (
              data.levels.map((l, i) => {
                const key = resolveStageKey(l, i)
                const meta = STAGE_META[key]
                const isSelected = key === 'al' ? streamsOpen : openStage === key

                return (
                  <Reveal
                    key={l.id}
                    delay={i * 0.08}
                    className={`card group relative flex flex-col overflow-hidden transition-all duration-200 ${
                      isSelected
                        ? 'border-navy-900 ring-2 ring-gold-500/70'
                        : 'hover:-translate-y-0.5 hover:border-navy-900/30'
                    }`}
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      aria-expanded={isSelected}
                      onClick={() => handleStageClick(key)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleStageClick(key)
                        }
                      }}
                      className="flex flex-1 cursor-pointer flex-col text-left focus-visible:outline-none"
                    >
                      <div className="flex items-center gap-4 p-5 sm:p-6">
                        <div
                          className={`grid h-12 w-12 shrink-0 place-items-center rounded-full font-serif text-xl font-bold ring-4 ring-paper tabular-nums transition-colors sm:h-14 sm:w-14 sm:text-2xl sm:ring-8 ${
                            isSelected ? 'bg-gold-500 text-navy-900' : 'bg-navy-900 text-gold-400'
                          }`}
                        >
                          {i + 1}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold uppercase tracking-[0.18em] text-gold-600">{l.grade_range}</div>
                          <h3 className="font-serif text-xl font-semibold text-navy-900 sm:text-2xl">{l.name}</h3>
                          <div className="mt-0.5 text-xs text-muted">{meta.subtitle}</div>
                        </div>
                      </div>

                      <Img src={l.image} alt={l.name} className="aspect-[4/3] w-full object-cover object-center" />

                      <div className="flex flex-1 flex-col p-5 sm:p-6">
                        <p className="text-sm leading-7 text-muted">{l.description}</p>

                        <div className="mt-5 border-t border-line pt-4">
                          <div className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-navy-900/60">
                            Key Curriculum Focus
                          </div>
                          <ul className="mt-3 space-y-2.5">
                            {meta.highlights.map((item) => (
                              <li key={item} className="flex items-start gap-2.5 text-[0.83rem] leading-5 text-ink/85">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-line pt-4 text-xs text-muted">
                          <span className="font-semibold text-navy-900">{meta.summaryLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span>{meta.assessment}</span>
                        </div>

                        <div className="mt-5 pt-1">
                          <span
                            className={`inline-flex min-h-[42px] w-full items-center justify-between rounded-xl px-4 py-2.5 text-xs font-semibold transition-colors sm:text-sm ${
                              key === 'al'
                                ? isSelected
                                  ? 'bg-gold-500 text-navy-900'
                                  : 'bg-navy-900 text-white group-hover:bg-navy-800'
                                : isSelected
                                  ? 'bg-navy-900 text-white'
                                  : 'border border-line bg-paper text-navy-900 group-hover:border-navy-900/30 group-hover:bg-white'
                            }`}
                          >
                            <span className="whitespace-nowrap">
                              {isSelected ? meta.activeCtaLabel : meta.ctaLabel}
                            </span>
                            {key === 'al' ? (
                              <ArrowDown className={`h-4 w-4 shrink-0 transition-transform ${isSelected ? 'rotate-180' : ''}`} />
                            ) : isSelected ? (
                              <ChevronUp className="h-4 w-4 shrink-0" />
                            ) : (
                              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )
              })
            ) : (
              <Skeletons n={3} className="h-96" />
            )}
          </div>

          {/* Expandable Curriculum Breakdown for Junior Secondary / Ordinary Level */}
          <AnimatePresence mode="wait">
            {activeStageMeta?.detail && activeStageLevel && (
              <motion.div
                key={activeStageMeta.key}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="card mt-8 overflow-hidden"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line bg-navy-950 px-6 py-6 text-white sm:px-8">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">
                      {activeStageLevel.grade_range} · Curriculum Guide
                    </div>
                    <h3 className="mt-1.5 font-serif text-2xl font-semibold sm:text-3xl">{activeStageLevel.name}</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-7 text-white/80">{activeStageMeta.detail.overview}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenStage(null)}
                    aria-label="Close curriculum details"
                    className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-full border border-white/25 px-3.5 py-1.5 text-xs font-semibold text-white whitespace-nowrap transition hover:bg-white/10"
                  >
                    <X className="h-3.5 w-3.5" />
                    Close
                  </button>
                </div>

                <div className="grid gap-6 p-6 sm:gap-8 sm:p-8 md:grid-cols-2">
                  {activeStageMeta.detail.groups.map((group) => (
                    <div key={group.title}>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
                        <Layers className="h-4 w-4" />
                        <span>{group.title}</span>
                      </div>
                      <ul className="mt-4 space-y-2.5">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm font-medium text-navy-900">
                            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-500 text-navy-900">
                              <Check className="h-3 w-3" />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line bg-paper px-6 py-4 text-sm text-muted sm:px-8">
                  <div className="flex items-start gap-2.5">
                    <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                    <span>{activeStageMeta.detail.support}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleStageClick('al')}
                    className="inline-flex min-h-[40px] shrink-0 items-center gap-2 rounded-full bg-navy-900 px-4 py-2 text-xs font-semibold text-white whitespace-nowrap transition hover:bg-navy-800"
                  >
                    <BookOpen className="h-3.5 w-3.5 text-gold-400" />
                    Continue to A/L Streams
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {streamsOpen && (
          <motion.section
            ref={streamsSectionRef}
            id="choose-stream"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-20 bg-white py-16 sm:py-24"
          >
            <div className="wrap">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <SectionHeading
                  eyebrow="02. Advanced Level"
                  title="Choose your stream"
                  lead="Subject combinations and availability can change. Please contact the school office for current A/L options."
                />
                <div className="mb-8 sm:mb-12">
                  <button
                    type="button"
                    onClick={handleCloseStreams}
                    className="btn-outline min-h-[40px] px-4 py-2 text-xs whitespace-nowrap shrink-0"
                  >
                    <X className="h-4 w-4" />
                    Hide A/L streams
                  </button>
                </div>
              </div>

              {streams.length > 0 && s && (
                <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:gap-8">
                  <div
                    className="-mx-4 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 pb-2 no-scrollbar lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
                    role="tablist"
                    aria-label="A/L streams"
                  >
                    {streams.map((st, i) => (
                      <button
                        key={st.id}
                        type="button"
                        role="tab"
                        aria-selected={i === active}
                        onClick={() => setActive(i)}
                        className={`relative min-h-[56px] shrink-0 snap-start rounded-2xl px-4 py-3 text-left transition sm:px-5 sm:py-4 ${
                          i === active ? 'text-white' : 'bg-paper text-navy-900 hover:bg-line/60'
                        }`}
                      >
                        {i === active && (
                          <motion.span
                            layoutId="stream-pill"
                            className="absolute inset-0 rounded-2xl bg-navy-900"
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          />
                        )}
                        <span className="relative flex items-center gap-3.5 sm:gap-4">
                          <span
                            className={`font-serif text-xl font-bold tabular-nums sm:text-2xl ${
                              i === active ? 'text-gold-400' : 'text-navy-900/30'
                            }`}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span>
                            <span className="block whitespace-nowrap text-sm font-semibold sm:text-base">{st.name}</span>
                            <span className={`block whitespace-nowrap text-xs ${i === active ? 'text-white/70' : 'text-muted'}`}>
                              {st.category}
                            </span>
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={s.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.28 }}
                      className="card overflow-hidden"
                    >
                      <div className="grid bg-navy-950 text-white md:grid-cols-[1.05fr_0.95fr]">
                        <div className="relative aspect-[4/3] overflow-hidden bg-navy-950 md:aspect-auto md:min-h-[340px]">
                          {s.image === CAMPUS_PHOTOS.mainHall ? (
                            <Img src={s.image} alt={s.name} className="h-full w-full object-cover object-center" />
                          ) : (
                            <>
                              <img
                                src={s.image}
                                alt=""
                                aria-hidden="true"
                                loading="lazy"
                                decoding="async"
                                className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-xl"
                              />
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

                      <div className="grid gap-6 p-5 sm:gap-8 sm:p-8 md:grid-cols-2">
                        <div>
                          <div className="eyebrow">Pathway Overview</div>
                          <div className="mt-4 space-y-4 text-sm">
                            {s.focus && (
                              <div className="flex gap-3">
                                <Target className="h-5 w-5 shrink-0 text-gold-600" />
                                <div>
                                  <b className="text-navy-900">Focus.</b> {s.focus}
                                </div>
                              </div>
                            )}
                            {s.careers && (
                              <div className="flex gap-3">
                                <Briefcase className="h-5 w-5 shrink-0 text-gold-600" />
                                <div>
                                  <b className="text-navy-900">Careers.</b> {s.careers}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="rounded-2xl bg-paper p-5 sm:p-6">
                          <div className="eyebrow">Subjects</div>
                          <ul className="mt-4 space-y-3">
                            {s.subjects.map((sub, i) => (
                              <motion.li
                                key={sub}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.06 + i * 0.04 }}
                                className="flex items-start gap-3 text-sm font-medium text-navy-900"
                              >
                                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-500 text-navy-900">
                                  <Check className="h-3 w-3" />
                                </span>
                                {sub}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  )
}
