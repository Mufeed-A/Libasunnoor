export type CategoryId =
  | 'all'
  | 'thobes'
  | 'jubbas'
  | 'kurtas-bishts'
  | 'caps'
  | 'attar-prayer';

export interface Product {
  id: string;
  sku: string;
  name: string;
  arabicSubtitle: string;
  category: Exclude<CategoryId, 'all'>;
  categoryLabel: string;
  priceInr: number;
  originalPriceInr?: number;
  badge?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  shortDescription: string;
  description: string;
  fabric: string;
  fit: string;
  care: string;
  sizes: string[];
  sizeType: 'thobe-length' | 'standard' | 'cap-size' | 'volume' | 'free-size';
  colors: { name: string; hex: string }[];
  highlights: string[];
  inStock: boolean;
}

export interface CartItem {
  cartKey: string;
  product: Product;
  selectedSize: string;
  selectedColor: string;
  customNotes?: string;
  quantity: number;
}

export interface StoreConfig {
  brandName: string;
  tagline: string;
  whatsappNumber: string; // E.164 digits without +
  displayPhone: string;
  email: string;
  address: string;
  instagramHandle: string;
  freeShippingThresholdInr: number;
}

export const STORE_CONFIG: StoreConfig = {
  brandName: 'Libasunnoor',
  tagline: 'Garments of Light • Heritage Islamic Menswear',
  whatsappNumber: '918086710179',
  displayPhone: '+91 80867 10179',
  email: 'salam@libasunnoor.com',
  address: 'Noor Heritage Arcade, MG Road, Kochi, Kerala 682016',
  instagramHandle: '@libasunnoor.official',
  freeShippingThresholdInr: 2499,
};

export const CATEGORIES: { id: CategoryId; label: string; subtitle: string }[] = [
  { id: 'all', label: 'All Collections', subtitle: 'Complete curated menswear & essentials' },
  { id: 'thobes', label: 'Signature Thobes', subtitle: 'Emirati, Saudi & Omani silhouettes' },
  { id: 'jubbas', label: 'Embroidered Jubbas', subtitle: 'Moroccan & Levantine artisanal cuts' },
  { id: 'kurtas-bishts', label: 'Kurtas & Royal Bishts', subtitle: 'Jummah, Nikah & Eid ceremonial attire' },
  { id: 'caps', label: 'Kufi & Omani Caps', subtitle: 'Hand-stitched prayer & formal headwear' },
  { id: 'attar-prayer', label: 'Oud Attar & Prayer', subtitle: 'Alcohol-free pure oils & velvet sajjadas' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'al-haramain-pearl-emirati-thobe',
    sku: 'LBN-THB-101',
    name: 'Al-Noor Pearl Emirati Kandura',
    arabicSubtitle: 'كندورة النور الإماراتية',
    category: 'thobes',
    categoryLabel: 'Signature Thobes',
    priceInr: 2499,
    originalPriceInr: 2999,
    badge: 'Bestseller',
    rating: 4.9,
    reviewsCount: 148,
    image: '/images/product-white-thobe.jpg',
    shortDescription: 'Crisp wrinkle-resistant Japanese spun cotton Emirati thobe with detachable braided tarboosh tassel.',
    description:
      'Tailored in the timeless Emirati silhouette, the Al-Noor Pearl Kandura is crafted from breathable, cool-touch Japanese Toyobo-grade spun fabric that holds an immaculate drape from Fajr through Isha. Finished with a hand-braided detachable tarboosh tassel, concealed placket snaps, and deep reinforced side pockets.',
    fabric: 'Premium Japanese Toyobo Spun Poly-Cotton (Breathable & Anti-Crease)',
    fit: 'Classic Emirati Flowing Fit (Collarless with Tassel)',
    care: 'Gentle machine wash cold, steam iron on low heat',
    sizes: ['52', '54', '56', '58', '60', '62'],
    sizeType: 'thobe-length',
    colors: [
      { name: 'Pearl White', hex: '#F6F4EE' },
      { name: 'Soft Ivory', hex: '#EDE5D2' },
    ],
    highlights: [
      'Cool-touch Japanese weave ideal for humid & warm climates',
      'Detachable hand-braided silk-finish tarboosh tassel',
      'Two deep side-seam pockets + discreet chest pocket',
      'Non-transparent weave with double-stitched hem',
    ],
    inStock: true,
  },
  {
    id: 'zomorod-royal-emerald-jubba',
    sku: 'LBN-JBA-204',
    name: 'Zomorod Royal Emerald Zari Jubba',
    arabicSubtitle: 'جبة الزمرد الملكية',
    category: 'jubbas',
    categoryLabel: 'Embroidered Jubbas',
    priceInr: 3299,
    originalPriceInr: 3899,
    badge: 'Eid & Nikah Edition',
    rating: 5.0,
    reviewsCount: 94,
    image: '/images/product-emerald-jubba.jpg',
    shortDescription: 'Deep emerald suiting jubba accented with antique champagne-gold Moroccan sfifa embroidery.',
    description:
      'Our flagship heritage piece. Named after finest emerald stone, the Zomorod Jubba pairs structured yet fluid matte suiting fabric with intricate champagne-gold sfifa cord embroidery along the mandarin collar, chest placket, and cuffs. Designed for Jummah, Eid mornings, and Nikah gatherings.',
    fabric: 'Fine Korean Matte Crepe-Suiting Blend with Gold Zari Threadwork',
    fit: 'Tailored Regal Cut with Mandarin Collar',
    care: 'Dry clean recommended or gentle hand wash inside out',
    sizes: ['52', '54', '56', '58', '60'],
    sizeType: 'thobe-length',
    colors: [
      { name: 'Royal Emerald', hex: '#0B4635' },
      { name: 'Forest Pine', hex: '#14332A' },
    ],
    highlights: [
      'Hand-guided antique gold sfifa collar & cuff embroidery',
      'Custom brushed-brass domed buttons along the placket',
      'Structured shoulder line for a dignified silhouette',
      'Wrinkle-resistant drape that travels effortlessly',
    ],
    inStock: true,
  },
  {
    id: 'al-layl-obsidian-saudi-thobe',
    sku: 'LBN-THB-108',
    name: 'Al-Layl Obsidian Collared Saudi Thobe',
    arabicSubtitle: 'ثوب الليل السعودي الفاخر',
    category: 'thobes',
    categoryLabel: 'Signature Thobes',
    priceInr: 2699,
    originalPriceInr: 3199,
    badge: 'New Arrival',
    rating: 4.8,
    reviewsCount: 76,
    image: '/images/product-black-thobe.jpg',
    shortDescription: 'Sleek charcoal-obsidian collared Saudi thobe with concealed snap placket and structured French-style cuffs.',
    description:
      'Commanding understated elegance, the Al-Layl Saudi Thobe features a crisp structured band collar, concealed matte metal snap placket, and tailored wrist cuffs. Cut from rich fade-resistant micro-twill that stays cool while maintaining sharp architectural lines.',
    fabric: 'Premium Fade-Resistant Micro-Twill Suiting',
    fit: 'Structured Saudi Tailored Fit with Band Collar',
    care: 'Machine wash cold with dark colors, hang to dry',
    sizes: ['52', '54', '56', '58', '60', '62'],
    sizeType: 'thobe-length',
    colors: [
      { name: 'Obsidian Black', hex: '#1C1E21' },
      { name: 'Midnight Charcoal', hex: '#2F3438' },
    ],
    highlights: [
      'Crisp structured Saudi collar with dual snap closure',
      'Concealed front placket with satin-matte trim detail',
      'Fade-lock dye retains deep rich tone wash after wash',
      'Tailored sleeve cuffs suitable for cufflinks or snap wear',
    ],
    inStock: true,
  },
  {
    id: 'sahara-linen-kurta-set',
    sku: 'LBN-KRT-302',
    name: 'Sahara Sand Linen-Cotton Kurta Pyjama Set',
    arabicSubtitle: 'طقم قرطا الكتان الصحراوي',
    category: 'kurtas-bishts',
    categoryLabel: 'Kurtas & Royal Bishts',
    priceInr: 2199,
    originalPriceInr: 2599,
    badge: 'Jummah Essential',
    rating: 4.8,
    reviewsCount: 112,
    image: '/images/product-sand-kurta.jpg',
    shortDescription: 'Breathable warm desert-sand linen-cotton kurta with tonal geometric collar stitch & matching pyjama.',
    description:
      'Crafted specifically for warm Indian & Gulf afternoons, the Sahara Kurta Set blends airy flax linen with combed long-staple Giza cotton. Detailed with subtle tonal geometric embroidery on the collar and antique brass buttons, paired with a comfortable tapered drawstring-elastic aligarh pyjama.',
    fabric: '55% European Flax Linen, 45% Long-Staple Combed Cotton',
    fit: 'Relaxed Straight Kurta + Comfort Tapered Pyjama (2-Piece Set)',
    care: 'Gentle cold wash, warm steam iron',
    sizes: ['S (38)', 'M (40)', 'L (42)', 'XL (44)', 'XXL (46)'],
    sizeType: 'standard',
    colors: [
      { name: 'Desert Sand', hex: '#D8C7A8' },
      { name: 'Warm Stone', hex: '#C7B89E' },
    ],
    highlights: [
      'Includes both embroidered Kurta & matching tapered Pyjama',
      'Ultra-breathable natural linen-cotton weave',
      'Tonal geometric collar embroidery with antique brass buttons',
      'Reinforced side slits and deep pockets on both sides',
    ],
    inStock: true,
  },
  {
    id: 'al-majlis-gold-zari-bisht',
    sku: 'LBN-BST-309',
    name: 'Al-Majlis Ceremonial Camel & Gold Zari Bisht',
    arabicSubtitle: 'بشت المجلس الملكي المذهب',
    category: 'kurtas-bishts',
    categoryLabel: 'Kurtas & Royal Bishts',
    priceInr: 5499,
    originalPriceInr: 6499,
    badge: 'Nikah & Groom',
    rating: 5.0,
    reviewsCount: 43,
    image: '/images/product-bisht-cloak.jpg',
    shortDescription: 'Sheer ceremonial camel-beige Najafi weave bisht cloak adorned with authentic royal gold zari trim.',
    description:
      'Worn by grooms, scholars, and elders on the most auspicious occasions, the Al-Majlis Ceremonial Bisht drapes weightlessly over any white or cream thobe. Woven in an airy Najafi-inspired summer gauze weave and bordered with wide, luminous gold zari embroidery and hand-knotted tassels.',
    fabric: 'Sheer Najafi-Style Summer Wool-Blend Gauze & Metallic Gold Zari',
    fit: 'Traditional Flowing Open Cloak (Drapes over Thobe/Kurta)',
    care: 'Specialist dry clean only; store in included garment bag',
    sizes: ['Short (54-56")', 'Regular (58-60")', 'Tall (62")'],
    sizeType: 'free-size',
    colors: [
      { name: 'Camel & Royal Gold', hex: '#C5A477' },
      { name: 'Deep Emerald & Gold', hex: '#0D3F30' },
    ],
    highlights: [
      'Authentic multi-row Hasawi-inspired gold zari border',
      'Featherlight breathable weave that never weighs down your thobe',
      'Hand-finished inner arm slits for effortless movement',
      'Presented in a keepsake Libasunnoor dust cover box',
    ],
    inStock: true,
  },
  {
    id: 'royal-cambodi-oud-attar',
    sku: 'LBN-ATR-401',
    name: 'Oud Al-Mulk Pure Cambodi & Saffron Attar',
    arabicSubtitle: 'دهن عود الملك الكمبودي والزعفران',
    category: 'attar-prayer',
    categoryLabel: 'Oud Attar & Prayer',
    priceInr: 1499,
    originalPriceInr: 1850,
    badge: '100% Alcohol-Free',
    rating: 4.9,
    reviewsCount: 205,
    image: '/images/product-attar-oud.jpg',
    shortDescription: 'Concentrated alcohol-free royal Cambodi oud oil infused with Kashmiri saffron & warm ambergris.',
    description:
      'Housed in an heirloom cut-crystal tola flacon with a precision glass applicator rod, Oud Al-Mulk opens with luminous Kashmiri saffron and Damascus rose before settling into aged, honeyed Cambodi agarwood and golden amber. 100% non-alcoholic and Sunnah-compliant with 12+ hour longevity on fabric.',
    fabric: '100% Pure Concentrated Perfume Oil (Alcohol-Free)',
    fit: 'Cut-Crystal Tola Bottle with Velvet Presentation Box',
    care: 'Store away from direct sunlight; dab lightly on pulse points & cuffs',
    sizes: ['6 ml (Half Tola)', '12 ml (Full Tola)', '24 ml Gift Duo'],
    sizeType: 'volume',
    colors: [{ name: 'Aged Amber Oud', hex: '#8F5319' }],
    highlights: [
      'Zero alcohol — pure concentrated oil safe for prayer & skin',
      'Lasts 10–14 hours on skin and up to 48 hours on cotton thobes',
      'Notes: Kashmiri Saffron, Taif Rose, Aged Cambodi Oud, Amber',
      'Packaged in an emerald velvet gift box — ideal Hadiyah gift',
    ],
    inStock: true,
  },
  {
    id: 'muscat-handstitched-kuma-kufi',
    sku: 'LBN-CAP-501',
    name: 'Muscat Artisanal Embroidered Kuma & Kufi',
    arabicSubtitle: 'كمّة مسقط المطرزة يدوياً',
    category: 'caps',
    categoryLabel: 'Kufi & Omani Caps',
    priceInr: 799,
    originalPriceInr: 999,
    badge: 'Handcrafted',
    rating: 4.9,
    reviewsCount: 167,
    image: '/images/product-kufi-caps.jpg',
    shortDescription: 'Structured breathable cotton Omani kuma & geometric embroidered prayer kufi with cooling eyelets.',
    description:
      'Stitched with dense geometric Arabesque relief motifs, the Muscat Artisanal Kufi holds its dignified crown shape without feeling rigid. Micro-perforated star eyelets allow continuous airflow during long Taraweeh and Jummah prayers.',
    fabric: '100% Double-Mercerized Breathable Cotton Canvas',
    fit: 'Structured Crown Fit (Measured by Head Circumference)',
    care: 'Gentle hand wash with mild soap, air dry on a flat surface',
    sizes: ['21.5" (55 cm)', '22" (56 cm)', '22.5" (57 cm)', '23" (58.5 cm)'],
    sizeType: 'cap-size',
    colors: [
      { name: 'Ivory & Champagne Gold', hex: '#EFE8D5' },
      { name: 'Sandstone & Olive', hex: '#CDBF9F' },
    ],
    highlights: [
      'Intricate high-density geometric thread embroidery',
      'Cooling micro-eyelets for all-day breathability',
      'Sweat-absorbent soft cotton inner headband',
      'Retains crisp cylindrical structure in travel luggage',
    ],
    inStock: true,
  },
  {
    id: 'rawdah-emerald-velvet-sajjada-set',
    sku: 'LBN-PRY-408',
    name: 'Rawdah Mihrab Velvet Sajjada & Onyx Tasbih Set',
    arabicSubtitle: 'طقم سجادة الروضة المخملية والمسبحة',
    category: 'attar-prayer',
    categoryLabel: 'Oud Attar & Prayer',
    priceInr: 1899,
    originalPriceInr: 2299,
    badge: 'Gift Favourite',
    rating: 5.0,
    reviewsCount: 89,
    image: '/images/product-prayer-mat.jpg',
    shortDescription: 'Plush cushioned emerald mihrab velvet prayer rug paired with a 33-bead natural black onyx misbaha.',
    description:
      'Inspired by the serene arches of Al-Masjid an-Nabawi, the Rawdah Sajjada Set combines a dense, knee-cushioning emerald velvet weave embossed with champagne-gold mihrab geometry and a hand-strung 33-bead natural black onyx tasbih. Thoughtfully curated for elders, newlyweds, or your personal musalla.',
    fabric: 'High-Density Turkish-Style Plush Velvet + Natural Onyx Stone Beads',
    fit: 'Generous Adult Musalla Size (115 cm × 70 cm)',
    care: 'Spot clean or gentle hand wash; brush pile in one direction',
    sizes: ['Standard Set (115×70 cm + Tasbih)', 'Deluxe Gift Boxed Set'],
    sizeType: 'free-size',
    colors: [{ name: 'Rawdah Emerald & Gold', hex: '#0F4D3A' }],
    highlights: [
      'Thick cushioned pile offers gentle support for knees & forehead',
      'Non-slip woven cotton backing stays flat on marble or tile floors',
      'Includes matching 33-bead polished black onyx misbaha',
      'Ready for gifting on Nikah, Ramadan, Hajj/Umrah return, or Eid',
    ],
    inStock: true,
  },
];

export const THOBE_SIZE_CHART = [
  { size: '52', heightCm: '158 – 163 cm', heightFt: `5'2" – 5'4"`, chestIn: '40 – 42"', lengthIn: '52"' },
  { size: '54', heightCm: '164 – 169 cm', heightFt: `5'5" – 5'6"`, chestIn: '42 – 44"', lengthIn: '54"' },
  { size: '56', heightCm: '170 – 175 cm', heightFt: `5'7" – 5'9"`, chestIn: '44 – 46"', lengthIn: '56"' },
  { size: '58', heightCm: '176 – 181 cm', heightFt: `5'9" – 5'11"`, chestIn: '46 – 48"', lengthIn: '58"' },
  { size: '60', heightCm: '182 – 187 cm', heightFt: `6'0" – 6'1"`, chestIn: '48 – 50"', lengthIn: '60"' },
  { size: '62', heightCm: '188 – 194 cm', heightFt: `6'2" – 6'4"`, chestIn: '50 – 52"', lengthIn: '62"' },
];

export const TESTIMONIALS = [
  {
    name: 'Abdul Rahman K.',
    location: 'Kochi, Kerala',
    occasion: 'Nikah Reception',
    quote:
      'Ordered the Zomorod Emerald Jubba and Al-Majlis Bisht via WhatsApp on Tuesday and received them impeccably packed by Thursday. The fabric fall and gold zari work rival boutiques in Dubai.',
    rating: 5,
  },
  {
    name: 'Mohammed Nihal',
    location: 'Kozhikode, Kerala',
    occasion: 'Jummah & Daily Wear',
    quote:
      'The Al-Noor Pearl Emirati Kandura is hands-down the most breathable white thobe I have worn in Kerala humidity. Doesn’t cling, doesn’t crease in the car, and ordering on WhatsApp took 30 seconds.',
    rating: 5,
  },
  {
    name: 'Tariq Siddiqui',
    location: 'Bengaluru, Karnataka',
    occasion: 'Eid Gift Order',
    quote:
      'Gifted my father the Rawdah Sajjada Set and Oud Al-Mulk Attar. The fragrance lasted two full days on his kurta and the velvet prayer mat cushioning is extraordinary.',
    rating: 5,
  },
];
