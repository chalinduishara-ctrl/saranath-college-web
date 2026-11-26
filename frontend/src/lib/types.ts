export interface Stat { value: string; suffix: string; label: string }
export interface School {
  name: string; location: string; founded: number; motto_si: string; motto_en: string; tagline: string
  intro_statement: string; address: string; phone: string; email: string; facebook: string; youtube: string
  map_embed_query: string; office_hours: string; hero_image: string; logo: string; stats: Stat[]
  sports_meet_title: string; sports_meet_note: string
}
export interface Principal { name: string; title: string; photo: string; quote: string; message: string }
export interface SiteSettings { school: School; principal: Principal }
export interface News { id: number; slug: string; title: string; category: string; date: string; excerpt: string; body: string; image: string; image_alt: string; featured: boolean; published: boolean }
export interface SchoolEvent { id: number; slug: string; title: string; category: string; date: string; time: string; venue: string; excerpt: string; body: string; outcome: string; image: string; image_alt: string; photos?: string[]; published: boolean }
export interface House { id: number; name: string; name_si: string; symbol: string; colour_name: string; color_hex: string; motto: string; description: string; points: number; captain: string; position: number }
export interface Level { id: number; grade_range: string; name: string; description: string; image: string; position: number }
export interface Stream { id: number; name: string; category: string; focus: string; careers: string; description: string; subjects: string[]; image: string; position: number }
export interface Club { id: number; name: string; kind: 'club' | 'sport'; category: string; description: string; details: string; teacher_in_charge: string; image: string; position: number }
export interface TimelineItem { id: number; year: string; date_note: string; title: string; description: string; position: number }
export interface Photo { id: number; image: string; caption: string; alt: string; category: string; size: 'normal' | 'wide' | 'tall'; position: number }
