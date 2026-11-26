import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, MapPin } from 'lucide-react'
import { CAMPUS_LANDMARKS } from '../lib/campusMedia'
import Img from './Img'
import { Reveal, SectionHeading } from './Reveal'

export default function CampusShowcase({ bg = 'bg-paper' }: { bg?: string }) {
  const [activeId, setActiveId] = useState(CAMPUS_LANDMARKS[0].id)
  const currentIndex = CAMPUS_LANDMARKS.findIndex((item) => item.id === activeId)
  const current = CAMPUS_LANDMARKS[currentIndex >= 0 ? currentIndex : 0]

  return (
    <section className={`${bg} py-16 sm:py-24 lg:py-28`}>
      <div className="wrap">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Life Across Campus"
            title="Inside Saranath"
            lead="Explore the halls, academic wings, playing fields and shaded courtyards where our community learns and grows each day."
          />
          <Reveal className="mb-8 md:mb-12">
            <Link to="/gallery" className="btn-outline w-full sm:w-auto">
              Full campus gallery <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch lg:gap-8">
          {/* Interactive Framed Photography Viewport */}
          <div className="relative overflow-hidden rounded-3xl border border-line bg-navy-950 shadow-[0_24px_54px_-28px_rgba(6,23,61,.4)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0.4, scale: 1.01 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.4 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]"
              >
                {current.orientation === 'portrait' ? (
                  <>
                    <img
                      src={current.image}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-2xl"
                    />
                    <div className="absolute inset-0 bg-navy-950/35" />
                    <Img
                      src={current.image}
                      alt={current.title}
                      className="relative z-10 mx-auto h-full w-auto object-contain"
                    />
                  </>
                ) : (
                  <Img
                    src={current.image}
                    alt={current.title}
                    className="h-full w-full object-cover"
                  />
                )}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent p-5 pt-20 text-white sm:p-8">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-300">
                    <span className="tabular-nums">0{currentIndex + 1} / 0{CAMPUS_LANDMARKS.length}</span>
                    <span aria-hidden="true" className="text-white/40">·</span>
                    <span>{current.subtitle}</span>
                  </div>
                  <h3 className="mt-1.5 font-serif text-2xl font-semibold text-white sm:text-3xl">
                    {current.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/85">
                    {current.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Landmark Selector List */}
          <div className="flex flex-col justify-between gap-4">
            <div
              className="-mx-4 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 pb-1 no-scrollbar lg:mx-0 lg:grid lg:grid-cols-1 lg:gap-2.5 lg:overflow-visible lg:px-0 lg:pb-0"
              role="tablist"
              aria-label="Campus landmarks"
            >
              {CAMPUS_LANDMARKS.map((item, idx) => {
                const active = item.id === current.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveId(item.id)}
                    className={`group flex min-w-[230px] shrink-0 snap-start items-center gap-3.5 rounded-2xl border p-3 text-left transition duration-200 lg:min-w-0 ${
                      active
                        ? 'border-navy-900 bg-navy-900 text-white shadow-sm'
                        : 'border-line bg-white text-navy-900 hover:border-navy-900/30 hover:bg-white'
                    }`}
                  >
                    <div className="h-14 w-16 shrink-0 overflow-hidden rounded-xl bg-navy-950">
                      <Img src={item.image} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`text-[11px] font-semibold uppercase tracking-[0.16em] tabular-nums ${active ? 'text-gold-300' : 'text-gold-600'}`}>
                        {String(idx + 1).padStart(2, '0')} · Landmark
                      </div>
                      <div className="truncate font-serif text-lg font-semibold">
                        {item.title}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="hidden items-center justify-between rounded-2xl border border-line bg-white px-5 py-4 text-xs text-muted lg:flex">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold-600" />
                Kuliyapitiya Campus · North Western Province
              </span>
              <Link to="/contact" className="font-semibold text-navy-900 hover:text-gold-600">
                Visit campus →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
