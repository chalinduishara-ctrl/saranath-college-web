export const CAMPUS_PHOTOS = {
  heroSunset: '/assets/aistudio/WhatsApp_Image_2026-11-26_at_15.42.32__1__31d9bd69.jpeg',
  sportsGroundCollege: '/assets/aistudio/WhatsApp_Image_2026-11-26_at_15.42.31__2__8ebafb11.jpeg',
  mainHall: '/assets/aistudio/WhatsApp_Image_2026-11-26_at_15.42.29_efbd1587.jpeg',
  visionMissionTree: '/assets/aistudio/WhatsApp_Image_2026-11-26_at_15.42.31__1__60d025be.jpeg',
  facultyOfTech: '/assets/aistudio/image_d42eb734.png',
  corridorPalm: '/assets/aistudio/WhatsApp_Image_2026-11-26_at_15.42.31_4221fa26.jpeg',
  corridorWhite: '/assets/aistudio/WhatsApp_Image_2026-11-26_at_15.42.32_62a87b41.jpeg',
  corridorGajaba: '/assets/aistudio/WhatsApp_Image_2026-11-26_at_15.42.33_58e7d245.jpeg',
  muralSriLanka: '/assets/aistudio/IMG_9817_eabecbc6.jpg',
  muralWorldMap: '/assets/aistudio/IMG_9819_d3adefe2.jpg',
  groundsStudents: '/assets/aistudio/IMG_9787_024aee79.jpg',
  groundsSky: '/assets/aistudio/IMG_9788_26e9c8e4.jpg',
  groundsTreeCourtyard: '/assets/aistudio/WhatsApp_Image_2026-11-26_at_15.42.30_76424f68.jpeg',
  groundsUnderTree: '/assets/aistudio/IMG_9789_dee08c14.jpg',
  groundsGrassBlock: '/assets/aistudio/IMG_9796_2883375e.jpg',
  treeSunburst: '/assets/aistudio/IMG_9794_2f8faab3.jpg',
  treeSunbeamsBench: '/assets/aistudio/IMG_9792_2e7d1393.jpg',
  fieldLowAngle: '/assets/aistudio/IMG_9806_74bf653a.jpg',
  fieldGrassTree: '/assets/aistudio/IMG_9801_0d204b66.jpg',
} as const

export interface CampusLandmark {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  orientation: 'landscape' | 'portrait'
}

export const CAMPUS_LANDMARKS: CampusLandmark[] = [
  {
    id: 'main-hall',
    title: 'The Main Hall',
    subtitle: 'Assemblies · Prize Givings · Cultural Stage',
    description:
      'At the heart of campus ceremonies, the two-storey Main Hall brings students, parents and teachers together for Founders’ Day, Prefect Investitures and cultural performances.',
    image: CAMPUS_PHOTOS.mainHall,
    orientation: 'landscape',
  },
  {
    id: 'faculty-tech',
    title: 'Faculty of Technology',
    subtitle: 'තාක්ෂණ පීඨය · Applied Science & Engineering',
    description:
      'Our dedicated three-storey Technology wing supports Engineering Technology, Bio Systems Technology, Science for Technology and ICT laboratories for senior students.',
    image: CAMPUS_PHOTOS.facultyOfTech,
    orientation: 'portrait',
  },
  {
    id: 'sports-grounds',
    title: 'College Sports Grounds',
    subtitle: 'Athletics · Cricket · Inter-House Meets',
    description:
      'Sweeping green turf beside the iconic yellow Sarana College block hosts daily cricket practice, athletics training and the annual Thisara, Mayura, Lihini and Paravi sports meet.',
    image: CAMPUS_PHOTOS.sportsGroundCollege,
    orientation: 'landscape',
  },
  {
    id: 'academic-blocks',
    title: 'Classroom Verandas',
    subtitle: '12 ගජබා ශාලාව · Daily Learning Corridors',
    description:
      'Sunlit, open-windowed classroom wings lined with greenery connect junior secondary, Ordinary Level and Advanced Level sections across the campus.',
    image: CAMPUS_PHOTOS.corridorGajaba,
    orientation: 'portrait',
  },
  {
    id: 'heritage-murals',
    title: 'Educational Wall Murals',
    subtitle: 'Student Group Projects · Sri Lanka & World Geography',
    description:
      'Hand-painted campus murals of Sri Lanka’s nine provinces and the world’s continents turn everyday school walkways into living open-air learning spaces.',
    image: CAMPUS_PHOTOS.muralWorldMap,
    orientation: 'portrait',
  },
  {
    id: 'shade-courtyard',
    title: 'The Shade Tree & Courtyard',
    subtitle: 'Campus Meeting Place · Student Community',
    description:
      'Beneath the canopy beside the stone benches and playing field, generations of Saranathians have gathered between classes and after sports practices.',
    image: CAMPUS_PHOTOS.groundsTreeCourtyard,
    orientation: 'landscape',
  },
]
