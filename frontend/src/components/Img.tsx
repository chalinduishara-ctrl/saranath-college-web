import { useCallback, useEffect, useRef, useState, type ImgHTMLAttributes } from 'react'

/** Lazy image that fades in smoothly, handles cached images reliably, and falls back gracefully. */
export default function Img({
  src,
  alt = '',
  className = '',
  loading = 'lazy',
  onLoad,
  onError,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)

  // Reset state when src changes and check if new image is already cached
  useEffect(() => {
    setFailed(false)
    if (!src) {
      setLoaded(false)
      return
    }
    const el = imgRef.current
    if (el && el.complete && el.naturalWidth > 0) {
      setLoaded(true)
    } else {
      setLoaded(false)
    }
  }, [src])

  const setRef = useCallback((node: HTMLImageElement | null) => {
    imgRef.current = node
    if (node && node.complete && node.naturalWidth > 0) {
      setLoaded(true)
    }
  }, [])

  if (!src || failed) {
    return (
      <div
        className={`grid place-items-center bg-gradient-to-br from-navy-900/10 via-navy-900/5 to-navy-900/20 text-muted ${className}`}
        role="img"
        aria-label={alt || 'Image placeholder'}
      >
        <img
          src="/media/seed/crest-transparent.webp"
          alt=""
          className="h-1/3 max-h-20 w-auto opacity-20"
        />
      </div>
    )
  }

  const hasTransition = className.includes('transition')
  const fadeClass = hasTransition ? '' : 'transition-opacity duration-300 ease-out'

  return (
    <img
      ref={setRef}
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      referrerPolicy="no-referrer"
      onLoad={(e) => {
        setLoaded(true)
        setFailed(false)
        onLoad?.(e)
      }}
      onError={(e) => {
        setFailed(true)
        setLoaded(false)
        onError?.(e)
      }}
      className={`${className} ${fadeClass} ${loaded ? 'opacity-100' : 'opacity-0'}`}
      {...rest}
    />
  )
}

