import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function PageHero({ eyebrow, title, lead, image, crumbs = [] }: { eyebrow: string; title: string; lead?: string; image?: string; crumbs?: { to: string; label: string }[] }) {
  return (
    <section className="relative overflow-hidden bg-navy-900 pb-12 pt-24 text-white sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-44">
      {image && <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950/90 via-navy-900/80 to-navy-700/60" />
      <div className="pointer-events-none absolute -left-40 top-0 h-full w-80 animate-beam bg-gradient-to-r from-transparent via-gold-300/20 to-transparent blur-2xl" />
      <div className="wrap relative">
        <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-xs text-white/60 sm:mb-6">
          <Link to="/" className="py-1 hover:text-gold-300">Home</Link>
          {crumbs.map((c) => (
            <span key={c.to} className="inline-flex items-center gap-1"><ChevronRight className="h-3 w-3" /><Link to={c.to} className="py-1 hover:text-gold-300">{c.label}</Link></span>
          ))}
          <ChevronRight className="h-3 w-3" /><span className="text-white/90">{title}</span>
        </nav>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
          <div className="eyebrow text-gold-400">{eyebrow}</div>
          <h1 className="mt-2.5 max-w-4xl text-balance font-serif text-4xl font-semibold leading-[1.04] sm:mt-3 sm:text-6xl lg:text-7xl">{title}</h1>
          {lead && <p className="mt-4 max-w-2xl text-base leading-7 text-white/75 sm:mt-6 sm:text-lg sm:leading-8">{lead}</p>}
        </motion.div>
      </div>
    </section>
  )
}
