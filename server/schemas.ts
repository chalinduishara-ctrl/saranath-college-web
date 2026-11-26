import { z } from 'zod'

const IMAGE_RE =
  /^(\/uploads\/[A-Za-z0-9_-]+\.(webp|jpg|jpeg|png)|\/media\/[A-Za-z0-9_\-/]+\.(webp|jpg|jpeg|png|svg)|\/assets\/aistudio\/[A-Za-z0-9_.-]+\.(webp|jpg|jpeg|png))?$/
const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}$/
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const CONTROL_RE = /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g // eslint-disable-line no-control-regex

function cleanStr(v: string): string {
  return v.replace(CONTROL_RE, '').trim()
}

function text(maxLen: number, minLen = 0) {
  return z
    .string()
    .transform(cleanStr)
    .refine((v) => v.length >= minLen, {
      message: minLen === 1 ? 'This field is required.' : `Must be at least ${minLen} characters.`,
    })
    .refine((v) => v.length <= maxLen, {
      message: `Must be at most ${maxLen} characters.`,
    })
}

const imagePath = z
  .string()
  .trim()
  .max(300)
  .refine((v) => !v.includes('..') && IMAGE_RE.test(v), { message: 'Image must be uploaded through the admin panel' })

const hexColor = z
  .string()
  .trim()
  .refine((v) => HEX_COLOR_RE.test(v), { message: 'Must be a valid hex colour like #1c57c4' })

const dateStr = z
  .string()
  .trim()
  .refine((v) => DATE_RE.test(v) && !Number.isNaN(Date.parse(v)), { message: 'Must be a valid YYYY-MM-DD date' })

export const NewsInSchema = z
  .object({
    title: text(200, 3),
    category: text(60).default('General'),
    date: dateStr,
    excerpt: text(400).default(''),
    body: text(20000).default(''),
    image: imagePath.default(''),
    image_alt: text(200).default(''),
    featured: z.boolean().default(false),
    published: z.boolean().default(true),
  })
  .strict()

export const EventInSchema = z
  .object({
    title: text(200, 3),
    category: text(60).default('General'),
    date: dateStr,
    time: text(40).default(''),
    venue: text(160).default(''),
    excerpt: text(400).default(''),
    body: text(20000).default(''),
    outcome: text(5000).default(''),
    image: imagePath.default(''),
    image_alt: text(200).default(''),
    photos: z.array(imagePath).max(12).optional(),
    published: z.boolean().default(true),
  })
  .strict()

export const HouseInSchema = z
  .object({
    name: text(60, 1),
    name_si: text(60).default(''),
    symbol: text(60).default(''),
    colour_name: text(60).default(''),
    color_hex: hexColor.default('#1c57c4'),
    motto: text(160).default(''),
    description: text(2000).default(''),
    points: z.number().int().min(0).max(1_000_000).default(0),
    captain: text(120).default(''),
    position: z.number().int().min(0).max(10_000).default(0),
  })
  .strict()

export const HousePointsInSchema = z
  .object({
    points: z.number().int().min(0).max(1_000_000),
  })
  .strict()

export const LevelInSchema = z
  .object({
    grade_range: text(60, 1),
    name: text(120, 1),
    description: text(2000).default(''),
    image: imagePath.default(''),
    position: z.number().int().min(0).max(10_000).default(0),
  })
  .strict()

export const StreamInSchema = z
  .object({
    name: text(120, 1),
    category: text(80).default(''),
    focus: text(300).default(''),
    careers: text(300).default(''),
    description: text(3000).default(''),
    subjects: z.array(text(120)).max(20).default([]),
    image: imagePath.default(''),
    position: z.number().int().min(0).max(10_000).default(0),
  })
  .strict()

export const ClubInSchema = z
  .object({
    name: text(120, 1),
    kind: z.enum(['club', 'sport']).default('club'),
    category: text(60).default(''),
    description: text(2000).default(''),
    details: text(4000).default(''),
    teacher_in_charge: text(120).default(''),
    image: imagePath.default(''),
    position: z.number().int().min(0).max(10_000).default(0),
  })
  .strict()

export const TimelineInSchema = z
  .object({
    year: text(20, 1),
    date_note: text(40).default(''),
    title: text(160, 1),
    description: text(2000).default(''),
    position: z.number().int().min(0).max(10_000).default(0),
  })
  .strict()

export const GalleryInSchema = z
  .object({
    image: imagePath.refine((v) => v.length >= 1, { message: 'Photo is required.' }),
    caption: text(160).default(''),
    alt: text(200).default(''),
    category: z.enum(['sport', 'learning', 'arts', 'community', 'events']).default('community'),
    size: z.enum(['normal', 'wide', 'tall']).default('normal'),
    position: z.number().int().min(0).max(10_000).default(0),
  })
  .strict()

export const FeedbackInSchema = z
  .object({
    kind: z.enum(['comment', 'feedback', 'suggestion', 'complaint']),
    name: text(120).default(''),
    email: z.string().trim().email('Please enter a valid email.').nullable().optional(),
    phone: z
      .string()
      .trim()
      .max(20)
      .refine((v) => /^[0-9+\-\s()]*$/.test(v), { message: 'Use numbers only.' })
      .default(''),
    subject: text(160).default(''),
    message: text(4000, 10),
    website: z.string().max(200).default(''),
  })
  .strict()

export const FeedbackUpdateSchema = z
  .object({
    status: z.enum(['new', 'read', 'resolved', 'archived']),
    admin_note: text(2000).default(''),
  })
  .strict()

const StatItemSchema = z
  .object({
    value: text(20),
    suffix: text(10).default(''),
    label: text(60),
  })
  .strict()

const HttpsUrl = z
  .string()
  .trim()
  .max(300)
  .refine((v) => /^(https:\/\/[^\s<>'"]+)?$/.test(v), { message: 'Must start with https://' })
  .default('')

export const SchoolSettingsSchema = z
  .object({
    name: text(120).default('Saranath College'),
    location: text(120).default('Kuliyapitiya'),
    founded: z.number().int().min(1500).max(2100).default(1882),
    motto_si: text(120).default(''),
    motto_en: text(200).default(''),
    tagline: text(300).default(''),
    intro_statement: text(800).default(''),
    address: text(300).default(''),
    phone: text(40).default(''),
    email: text(120).default(''),
    facebook: HttpsUrl,
    youtube: HttpsUrl,
    map_embed_query: text(200).default(''),
    office_hours: text(120).default(''),
    hero_image: imagePath.default(''),
    logo: imagePath.default(''),
    stats: z.array(StatItemSchema).max(8).default([]),
    sports_meet_title: text(120).default('Inter-House Sports Meet'),
    sports_meet_note: text(400).default(''),
  })
  .strict()

export const PrincipalSettingsSchema = z
  .object({
    name: text(120).default(''),
    title: text(120).default('Principal'),
    photo: imagePath.default(''),
    quote: text(400).default(''),
    message: text(8000).default(''),
  })
  .strict()

export const LoginInSchema = z
  .object({
    username: text(64, 1),
    password: z.string().min(1).max(128),
    otp: z
      .string()
      .regex(/^\d{6}$/)
      .nullable()
      .optional(),
  })
  .strict()

export const ChangePasswordInSchema = z
  .object({
    current_password: z.string().min(1).max(128),
    new_password: z.string().min(1).max(128),
  })
  .strict()

export const TotpConfirmInSchema = z
  .object({
    otp: z.string().regex(/^\d{6}$/),
  })
  .strict()

export const TotpDisableInSchema = z
  .object({
    password: z.string().min(1).max(128),
  })
  .strict()

export const UserInSchema = z
  .object({
    username: z.string().trim().regex(/^[a-zA-Z0-9_.-]{3,64}$/, 'Username must be 3-64 characters (letters, numbers, dot, dash, underscore).'),
    full_name: text(120).default(''),
    role: z.enum(['superadmin', 'editor']).default('editor'),
    password: z.string().min(1).max(128),
  })
  .strict()

export const UserUpdateSchema = z
  .object({
    full_name: text(120).default(''),
    role: z.enum(['superadmin', 'editor']).default('editor'),
    is_active: z.boolean().default(true),
    reset_password: z.string().max(128).nullable().optional(),
  })
  .strict()

export function parseBody<T>(schema: z.ZodType<T>, raw: unknown): { ok: true; data: T } | { ok: false; errors: { field: string; message: string }[] } {
  const res = schema.safeParse(raw)
  if (res.success) return { ok: true, data: res.data }
  const errors = res.error.issues.slice(0, 10).map((issue) => ({
    field: issue.path.join('.'),
    message: issue.message,
  }))
  return { ok: false, errors }
}
