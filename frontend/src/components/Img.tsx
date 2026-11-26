import { useState, type ImgHTMLAttributes } from 'react'

/** Lazy image that fades in, with a soft navy placeholder when there is no picture. */
export default function Img({ src, alt = '', className = '', ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return (
      <div className={`grid place-items-center bg-gradient-to-br from-navy-800 to-navy-900 ${className}`} role="img" aria-label={alt}>
        <img src="/media/seed/crest-transparent.webp" alt="" className="h-1/3 max-h-24 w-auto opacity-30" />
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      className={`${className} transition-[opacity,filter] duration-700 ${loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
      {...rest}
    />
  )
}
