export type UserRole = 'superadmin' | 'editor'
export type FeedbackKind = 'comment' | 'feedback' | 'suggestion' | 'complaint'
export type FeedbackStatus = 'new' | 'read' | 'resolved' | 'archived'
export type ClubKind = 'club' | 'sport'
export type GalleryCategory = 'sport' | 'learning' | 'arts' | 'community' | 'events'
export type GallerySize = 'normal' | 'wide' | 'tall'

export interface User {
  id: number
  username: string
  full_name: string
  password_hash: string
  role: UserRole
  is_active: boolean
  totp_secret_enc: string | null
  totp_enabled: boolean
  failed_logins: number
  locked_until: number | null
  last_login_at: string | null
  must_change_password: boolean
  created_at: string
  updated_at: string
}

export interface AdminSession {
  id: string
  user_id: number
  csrf_token: string
  created_at: number
  last_seen_at: number
  ip: string
  user_agent: string
}

export interface RateEvent {
  bucket: string
  created_at: number
}

export interface AuditLog {
  id: number
  user_id: number | null
  username: string
  action: string
  target: string
  detail: string
  ip: string
  created_at: string
}

export interface NewsArticle {
  id: number
  slug: string
  title: string
  category: string
  date: string
  excerpt: string
  body: string
  image: string
  image_alt: string
  featured: boolean
  published: boolean
  created_at: string
  updated_at: string
}

export interface EventItem {
  id: number
  slug: string
  title: string
  category: string
  date: string
  time: string
  venue: string
  excerpt: string
  body: string
  outcome: string
  image: string
  image_alt: string
  photos?: string[]
  published: boolean
  created_at: string
  updated_at: string
}

export interface House {
  id: number
  name: string
  name_si: string
  symbol: string
  colour_name: string
  color_hex: string
  motto: string
  description: string
  points: number
  captain: string
  position: number
  created_at: string
  updated_at: string
}

export interface AcademicLevel {
  id: number
  grade_range: string
  name: string
  description: string
  image: string
  position: number
  created_at: string
  updated_at: string
}

export interface AcademicStream {
  id: number
  name: string
  category: string
  focus: string
  careers: string
  description: string
  subjects: string[]
  image: string
  position: number
  created_at: string
  updated_at: string
}

export interface Club {
  id: number
  name: string
  kind: ClubKind
  category: string
  description: string
  details: string
  teacher_in_charge: string
  image: string
  position: number
  created_at: string
  updated_at: string
}

export interface TimelineItem {
  id: number
  year: string
  date_note: string
  title: string
  description: string
  position: number
  created_at: string
  updated_at: string
}

export interface GalleryPhoto {
  id: number
  image: string
  caption: string
  alt: string
  category: GalleryCategory
  size: GallerySize
  position: number
  created_at: string
  updated_at: string
}

export interface FeedbackRecord {
  id: number
  kind: FeedbackKind
  name_enc: string
  email_enc: string
  phone_enc: string
  subject_enc: string
  message_enc: string
  status: FeedbackStatus
  admin_note_enc: string
  created_at: string
}

export interface StatItem {
  value: string
  suffix: string
  label: string
}

export interface SchoolSettings {
  name: string
  location: string
  founded: number
  motto_si: string
  motto_en: string
  tagline: string
  intro_statement: string
  address: string
  phone: string
  email: string
  facebook: string
  youtube: string
  map_embed_query: string
  office_hours: string
  hero_image: string
  logo: string
  stats: StatItem[]
  sports_meet_title: string
  sports_meet_note: string
}

export interface PrincipalSettings {
  name: string
  title: string
  photo: string
  quote: string
  message: string
}
