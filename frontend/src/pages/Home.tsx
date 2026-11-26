import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, BookOpen, ChevronDown, MessageSquareHeart, Users } from 'lucide-react'
import IntroMotto, { hasIntroPlayed } from '../components/IntroMotto'
import { Reveal, SectionHeading } from '../components/Reveal'
import CountUp from '../components/CountUp'
import Timeline from '../components/Timeline'
import HouseStandings from '../components/HouseStandings'
import EventsTV from '../components/EventsTV'
import VisionMissionSection from '../components/VisionMissionSection'
import CampusShowcase from '../components/CampusShowcase'
import { NewsCard, Skeletons } from '../components/Cards'
import Img from '../components/Img'
import { CAMPUS_PHOTOS } from '../lib/campusMedia'
import { splitEvents, useAcademics, useClubs, useEvents, useGallery, useHouses, useNews, useSettings, useTimeline } from '../lib/hooks'
import { paragraphs } from '../lib/format'

const rise = { hidden: { y: '110%', opacity: 0 }, show: { y: 0, opacity: 1 } }

export default function Home() {
  const { data: site } = useSettings()
  const school = site?.school
  const principal = site?.principal
  const { data: timeline } = useTimeline()
  const { data: houses } = useHouses()
  const { data: events } = useEvents()
  const { data: news } = useNews()
  const { data: academics } = useAcademics()
  const { data: clubs } = useClubs()
  const { data: gallery } = useGallery()
  const { upcoming, past } = splitEvents(events)

  const [heroReady, setHeroReady] = useState(() => hasIntroPlayed())
  const handleRevealHero = useCallback(() => setHeroReady(true), [])

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const founded = school?.founded ?? 1882
  const age = new Date().getFullYear() - founded
  const motto = school?.motto_si || 'පඤ්ඤා නරානං රතනං'

  return (
    <>
      <IntroMotto
        motto={motto}
        mottoEn={school?.motto_en || 'Wisdom is the jewel of humankind'}
        logo={school?.logo || '/media/seed/crest-transparent.webp'}
        name={school?.name || 'Saranath College'}
        location={school?.location || 'Kuliyapitiya'}
        founded={founded}
        onRevealHero={handleRevealHero}
      />

      {/* HERO */}
      <section ref={heroRef} className="relative flex min-h-[580px] h-[100svh] max-h-[960px] flex-col justify-center overflow-hidden bg-navy-950">
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <motion.img
            src={school?.hero_image || CAMPUS_PHOTOS.heroSunset} alt="Saranath College campus walkway at sunset"
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover object-[center_36%]"
            initial={{ scale: 1.14 }}
            animate={{ scale: heroReady ? 1.03 : 1.14 }}
            transition={{ duration: heroReady ? 6.5 : 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/35 to-navy-950/92" />
        <div className="pointer-events-none absolute -left-1/4 top-0 h-full w-1/2 animate-beam bg-gradient-to-r from-transparent via-gold-300/15 to-transparent blur-3xl" />
        <motion.img
          src={school?.logo || '/media/seed/crest-transparent.webp'}
          alt=""
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: heroReady ? 0.06 : 0, scale: heroReady ? 1 : 0.94 }}
          transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute -right-24 bottom-0 hidden h-[80%] w-auto lg:block"
        />

        <motion.div style={{ opacity: fade }} className="wrap relative pt-10 pb-16 text-white sm:pt-16">
          <motion.div
            initial="hidden"
            animate={heroReady ? 'show' : 'hidden'}
            transition={{ staggerChildren: 0.11, delayChildren: 0.08 }}
          >
            <div className="overflow-hidden">
              <motion.div variants={rise} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }} className="font-serif text-xl italic text-gold-300 sm:text-3xl">
                Welcome to
              </motion.div>
            </div>
            <div className="overflow-hidden pb-2">
              <motion.h1 variants={rise} transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }} className="font-serif text-[clamp(2.75rem,11vw,8.25rem)] font-semibold leading-[0.96] tracking-tight">
                {school?.name || 'Saranath College'}
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.div variants={rise} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }} className="mt-3 text-[11px] font-semibold tracking-[0.24em] text-white/85 sm:mt-4 sm:text-sm sm:tracking-[0.4em]">
                {(school?.location || 'Kuliyapitiya').toUpperCase()} · SINCE {founded}
              </motion.div>
            </div>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap"
            >
              <Link to="/about" className="btn-gold w-full sm:w-auto">Discover our story <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/events" className="btn-ghost w-full sm:w-auto">Upcoming events</Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.a
          href="#legacy"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: heroReady ? 1 : 0, y: heroReady ? 0 : 8 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="absolute bottom-20 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[0.65rem] font-bold tracking-[0.3em] text-white/75 lg:bottom-8"
        >
          SCROLL <ChevronDown className="h-4 w-4 animate-bounce" />
        </motion.a>
      </section>

      {/* STATEMENT + STATS */}
      <section id="legacy" className="relative bg-white py-16 sm:py-24 lg:py-32">
        <div className="wrap text-center">
          <Reveal><div className="eyebrow">A legacy of {age} years</div></Reveal>
          <Reveal delay={0.08}><div className="mx-auto my-5 h-[3px] w-14 rounded-full bg-gold-500 sm:my-6" /></Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto max-w-4xl text-balance font-serif text-2xl leading-snug text-navy-900 sm:text-4xl lg:text-[2.6rem]">{school?.intro_statement}</p>
          </Reveal>
        </div>
        <div className="wrap mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line sm:mt-20 sm:rounded-3xl lg:grid-cols-4">
          {(school?.stats ?? []).map((s, i) => (
            <Reveal key={i} delay={i * 0.08} className="bg-white px-4 py-7 text-center sm:px-6 sm:py-10">
              <div className="font-serif text-4xl font-bold text-navy-900 tabular-nums sm:text-5xl lg:text-6xl"><CountUp value={s.value} suffix={s.suffix} /></div>
              <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted sm:text-xs sm:tracking-[0.2em]">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* VISION & MISSION */}
      <VisionMissionSection bg="bg-paper" />

      {/* HISTORY */}
      <section className="bg-white py-16 sm:py-24 lg:py-32">
        <div className="wrap">
          <SectionHeading center eyebrow="Our History" title="A Journey Through Time" lead="The milestones that shaped our College, from a humble beginning to the institution we are proud of today." />
          {timeline ? <Timeline items={timeline} /> : <div className="mx-auto grid max-w-3xl gap-4"><Skeletons n={4} className="h-24" /></div>}
        </div>
      </section>

      {/* PRINCIPAL */}
      {principal?.message && (
        <section className="relative overflow-hidden bg-paper py-16 sm:py-24 lg:py-32">
          <div className="wrap grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <Reveal className="relative mx-auto w-full max-w-[300px] sm:max-w-sm">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-navy-900 shadow-[0_24px_48px_-24px_rgba(6,23,61,.4)]">
                {principal.photo ? <Img src={principal.photo} alt={principal.name} className="h-full w-full object-cover" /> : (
                  <div className="grid h-full place-items-center"><img src={school?.logo} alt="" className="h-32 w-auto opacity-90 sm:h-40" /></div>
                )}
              </div>
              <div className="relative -mt-8 mx-4 rounded-2xl bg-navy-900 px-5 py-3.5 text-white shadow-xl sm:-mt-10 sm:mx-6 sm:px-6 sm:py-4">
                <div className="font-serif text-lg font-semibold sm:text-xl">{principal.name}</div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-gold-400">{principal.title}</div>
              </div>
            </Reveal>
            <div>
              <Reveal><div className="eyebrow">From the Principal</div></Reveal>
              <Reveal delay={0.08}><h2 className="mt-3 font-serif text-3xl font-semibold text-navy-900 sm:text-5xl">Principal's Message</h2></Reveal>
              <Reveal delay={0.12}>
                <blockquote className="my-6 border-y border-line py-5 font-serif text-xl italic leading-snug text-navy-800 sm:my-8 sm:py-6 sm:text-3xl">
                  “{principal.quote}”
                </blockquote>
              </Reveal>
              <Reveal delay={0.16}><p className="leading-7 text-muted sm:leading-8">{paragraphs(principal.message)[0]}</p></Reveal>
              <Reveal delay={0.2}><Link to="/about#principal" className="btn-navy mt-7 w-full sm:mt-8 sm:w-auto">Read the full message <ArrowRight className="h-4 w-4" /></Link></Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ACADEMICS */}
      <section className="bg-white py-16 sm:py-24 lg:py-32">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHeading eyebrow="Education & Academic Pathways" title="Learning for the future" lead="A learning journey from junior secondary through G.C.E. Ordinary Level and Advanced Level." />
            <Reveal className="mb-8 md:mb-12"><Link to="/academics" className="btn-outline w-full sm:w-auto">All pathways <ArrowRight className="h-4 w-4" /></Link></Reveal>
          </div>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {(academics?.levels ?? []).map((l, i) => (
              <Reveal key={l.id} delay={i * 0.08}>
                <Link to="/academics" className="group relative block aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[4/5] sm:rounded-3xl">
                  <Img src={l.image} alt={l.name} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-gold-400">{l.grade_range}</div>
                    <h3 className="mt-1.5 font-serif text-2xl font-semibold sm:mt-2 sm:text-3xl">{l.name}</h3>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-white/80 sm:mt-2 sm:line-clamp-3">{l.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 flex flex-wrap justify-center gap-2 sm:mt-10">
            {(academics?.streams ?? []).map((s) => (
              <Link to={`/academics?stream=${encodeURIComponent(s.name)}`} key={s.id} className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-navy-900 transition hover:bg-navy-900 hover:text-white">
                <BookOpen className="h-4 w-4 shrink-0 text-gold-600" />
                <span className="whitespace-nowrap">{s.name}</span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CAMPUS SHOWCASE */}
      <CampusShowcase bg="bg-paper" />

      {/* HOUSES */}
      <section className="relative overflow-hidden bg-navy-900 py-16 sm:py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(28,87,196,.35),transparent_60%)]" />
        <div className="wrap relative">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHeading light eyebrow={school?.sports_meet_title || 'Inter-House Sports Meet'} title="House Standings" lead={school?.sports_meet_note} />
            <Reveal className="mb-8 md:mb-12"><Link to="/houses" className="btn-ghost w-full sm:w-auto">About our houses <ArrowRight className="h-4 w-4" /></Link></Reveal>
          </div>
          {houses ? <HouseStandings houses={houses} compact /> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Skeletons n={4} className="h-48" /></div>}
        </div>
      </section>

      {/* EVENTS TV */}
      <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-24 lg:py-32">
        <div className="wrap relative">
          <SectionHeading light center eyebrow="Upcoming & Past Events" title="Saranath TV" lead="Tune in to what's coming up at the College, or replay the highlights." />
          {events ? <EventsTV upcoming={upcoming} past={past} /> : <div className="skeleton mx-auto aspect-[4/5] max-w-5xl sm:aspect-video" />}
          <Reveal className="mt-8 text-center sm:mt-10"><Link to="/events" className="btn-gold w-full sm:w-auto">Full events calendar <ArrowRight className="h-4 w-4" /></Link></Reveal>
        </div>
      </section>

      {/* NEWS */}
      <section className="bg-paper py-16 sm:py-24 lg:py-32">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHeading eyebrow="Latest School News" title="Stories from Saranath" />
            <Reveal className="mb-8 md:mb-12"><Link to="/news" className="btn-outline w-full sm:w-auto">All news <ArrowRight className="h-4 w-4" /></Link></Reveal>
          </div>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {news ? news.slice(0, 3).map((n, i) => <Reveal key={n.id} delay={i * 0.08}><NewsCard n={n} /></Reveal>) : <Skeletons n={3} className="h-96" />}
          </div>
        </div>
      </section>

      {/* CLUBS MARQUEE + GALLERY */}
      <section className="overflow-hidden bg-white py-16 sm:py-24 lg:py-32">
        <div className="wrap">
          <SectionHeading center eyebrow="Clubs, Societies & Sports" title="Find your place" lead="Try a new interest, build a skill and meet people who are excited about the same things you are." />
        </div>
        <div className="relative flex overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="flex shrink-0 animate-marquee gap-3 pr-3 hover:[animation-play-state:paused]">
            {[...(clubs ?? []), ...(clubs ?? [])].map((c, i) => (
              <Link key={i} to="/student-life" className="flex min-h-[48px] shrink-0 items-center gap-3 rounded-full bg-paper py-1.5 pl-1.5 pr-4 ring-1 ring-line transition hover:bg-navy-900 hover:text-white">
                <Img src={c.image} alt="" className="h-9 w-9 rounded-full object-cover" /><span className="text-sm font-semibold whitespace-nowrap">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="wrap mt-10 grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-3 sm:mt-14 sm:auto-rows-[200px] md:grid-cols-4">
          {(gallery ?? []).slice(0, 7).map((g, i) => (
            <Reveal
              key={g.id}
              delay={i * 0.05}
              className={`group relative overflow-hidden rounded-2xl ${
                g.size === 'tall' ? 'row-span-2' : ''
              } ${g.size === 'wide' ? 'col-span-2' : ''}`}
            >
              <Img src={g.image} alt={g.alt} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy-950/80 via-transparent p-3.5 opacity-100 transition sm:p-4 sm:opacity-0 sm:group-hover:opacity-100">
                <span className="text-xs font-semibold text-white sm:text-sm">{g.caption}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="wrap mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
          <Link to="/student-life" className="btn-navy w-full sm:w-auto"><Users className="h-4 w-4" />Clubs & sports</Link>
          <Link to="/gallery" className="btn-outline w-full sm:w-auto">Open the gallery</Link>
        </Reveal>
      </section>

      {/* MOTTO + FEEDBACK */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 py-16 text-center text-white sm:py-24 lg:py-32">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-400/10 sm:h-[40rem] sm:w-[40rem]" />
        <div className="wrap relative">
          <Reveal><img src={school?.logo} alt="Saranath College crest" className="mx-auto h-20 w-auto sm:h-24" /></Reveal>
          <Reveal delay={0.08}><div className="eyebrow mt-6 text-gold-400 sm:mt-8">Our Motto</div></Reveal>
          <Reveal delay={0.12}><div className="mt-3 font-sinhala text-3xl font-bold text-gold-300 sm:mt-4 sm:text-5xl lg:text-6xl">{motto}</div></Reveal>
          <Reveal delay={0.16}><div className="mt-3 font-serif text-xl italic text-white/80 sm:mt-4 sm:text-2xl">“{school?.motto_en}”</div></Reveal>
          <Reveal delay={0.22} className="mx-auto mt-10 max-w-xl rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur sm:mt-14 sm:p-8">
            <MessageSquareHeart className="mx-auto h-8 w-8 text-gold-400" />
            <h3 className="mt-3 font-serif text-2xl font-semibold sm:text-3xl">Your voice matters</h3>
            <p className="mt-2 text-sm leading-7 text-white/75">Send the school a comment, suggestion or concern. Messages go privately to the school administration and are never shown publicly.</p>
            <Link to="/contact#feedback" className="btn-gold mt-6 w-full sm:w-auto">Share feedback</Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
