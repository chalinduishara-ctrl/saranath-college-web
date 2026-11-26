import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Clock, MapPin, Trophy } from 'lucide-react'
import { motion } from 'motion/react'
import Img from '../components/Img'
import { useEvent } from '../lib/hooks'
import { daysUntil, fmtDate, paragraphs } from '../lib/format'
import NotFound from './NotFound'

export default function EventDetail() {
  const { slug = '' } = useParams()
  const { data: e, isLoading, isError } = useEvent(slug)
  if (isError) return <NotFound />
  if (isLoading || !e) return <div className="wrap pb-20 pt-28 sm:pt-36"><div className="skeleton h-[50vh] sm:h-[60vh]" /></div>
  const d = daysUntil(e.date)

  return (
    <article>
      <header className="relative overflow-hidden bg-navy-950 pb-12 pt-24 text-white sm:pb-16 sm:pt-36 lg:pt-40">
        <Img src={e.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 to-navy-950/40" />
        <div className="wrap relative max-w-4xl">
          <Link to="/events" className="inline-flex min-h-[44px] items-center gap-2 text-sm text-white/75 hover:text-gold-300"><ArrowLeft className="h-4 w-4" />All events</Link>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-300 sm:mt-6 sm:text-sm">
              <span>{e.category}</span>
              <span aria-hidden="true" className="text-white/40">·</span>
              <span className="text-white/85">{d > 0 ? `In ${d} days` : d === 0 ? 'Today' : 'Past event'}</span>
            </div>
            <h1 className="mt-4 text-balance font-serif text-3xl font-semibold leading-tight sm:mt-5 sm:text-5xl lg:text-6xl">{e.title}</h1>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/85 sm:mt-6 sm:gap-x-6 sm:text-base">
              <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 shrink-0 text-gold-400 sm:h-5 sm:w-5" />{fmtDate(e.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
              {e.time && <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 shrink-0 text-gold-400 sm:h-5 sm:w-5" />{e.time}</span>}
              {e.venue && <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0 text-gold-400 sm:h-5 sm:w-5" />{e.venue}</span>}
            </div>
          </motion.div>
        </div>
      </header>
      <div className="wrap max-w-3xl py-10 sm:py-14">
        {e.excerpt && <p className="mb-6 font-serif text-xl leading-snug text-navy-900 sm:mb-8 sm:text-2xl">{e.excerpt}</p>}
        <div className="prose-school">{paragraphs(e.body).filter((p) => p !== e.excerpt).map((p, i) => <p key={i}>{p}</p>)}</div>
        {e.photos && e.photos.length > 0 && (
          <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
            {e.photos.map((src, i) => (
              <div key={src} className="overflow-hidden rounded-2xl border border-line bg-navy-950 shadow-[0_12px_32px_-16px_rgba(6,23,61,.2)]">
                <Img src={src} alt={`${e.title} photo ${i + 1}`} className="aspect-[4/3] h-full w-full object-cover" />
              </div>
            ))}
          </div>
        )}
        {e.outcome && (
          <div className="mt-8 rounded-2xl bg-gold-300/25 p-5 ring-1 ring-gold-500/30 sm:p-6">
            <div className="flex items-center gap-2 font-semibold text-navy-900"><Trophy className="h-5 w-5 text-gold-600" />Highlights & results</div>
            <div className="prose-school mt-3">{paragraphs(e.outcome).map((p, i) => <p key={i}>{p}</p>)}</div>
          </div>
        )}
      </div>
    </article>
  )
}
