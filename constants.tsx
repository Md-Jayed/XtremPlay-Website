
import { Page, NavItem, PricingCard } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: Page.Home, labelEn: 'Home', labelAr: 'الرئيسية' },
  { id: Page.PlanVisit, labelEn: 'Plan Your Visit', labelAr: 'خطط لزيارتك' },
  { id: Page.Parties, labelEn: 'Parties', labelAr: 'الحفلات' },
  { id: Page.SchoolTrips, labelEn: 'School Trips', labelAr: 'الرحلات المدرسية' },
  { id: Page.Gallery, labelEn: 'Gallery', labelAr: 'معرض الصور' },
  { id: Page.Contact, labelEn: 'Contact', labelAr: 'اتصل بنا' },
];

export const PARTY_PACKAGES: PricingCard[] = [
  {
    titleEn: 'Xtreme Package',
    titleAr: 'باقة إكستريم',
    priceEn: '99 / 139 SR',
    priceAr: '٩٩ / ١٣٩ ر.س',
    bestValue: true,
    featuresEn: [
      'Themed party room',
      'Full day access to trampoline area',
      'Private party room for two hours',
      'Dedicated party host',
      'Popcorn & Kids meal with juice',
      'Xtreme Play E-card invitation'
    ],
    featuresAr: [
      'غرفة حفلات بطابع خاص',
      'دخول طوال اليوم لمنطقة الترامبولين',
      'غرفة حفلات خاصة لمدة ساعتين',
      'مضيف حفلات مخصص',
      'فشار ووجبة أطفال مع عصير',
      'بطاقة دعوة إلكترونية'
    ]
  },
  {
    titleEn: 'Graduation Package',
    titleAr: 'باقة التخرج',
    priceEn: '139 SR',
    priceAr: '١٣٩ ر.س',
    featuresEn: [
      'Themed party room (graduation)',
      'Full day access to trampoline area',
      'Private party room for one hour',
      'Dedicated Entertainer',
      'Gift and certificate for each kid',
      'Kids meal with juice and water'
    ],
    featuresAr: [
      'غرفة حفلات (طابع تخرج)',
      'دخول طوال اليوم لمنطقة الترامبولين',
      'غرفة حفلات خاصة لمدة ساعة',
      'منشط مخصص',
      'هدية وشهادة لكل طفل',
      'وجبة أطفال مع عصير وماء'
    ]
  }
];

export const SCHOOL_TRIP_PACKAGES: PricingCard[] = [
  {
    titleEn: 'Xtreme Trip',
    titleAr: 'رحلة إكستريم',
    priceEn: '79 SR / Student',
    priceAr: '٧٩ ر.س / طالب',
    bestValue: true,
    featuresEn: [
      'Three hours trip',
      'Access to trampoline and inflatables area',
      'Games and Challenges with coach',
      'Xtreme Play Socks',
      'Kids meal with juice',
      '10% discount for teachers'
    ],
    featuresAr: [
      'رحلة لمدة ثلاث ساعات',
      'دخول لمنطقة الترامبولين والمنفوخات',
      'ألعاب وتحديات مع مدرب',
      'جوارب إكستريم بلاي',
      'وجبة أطفال مع عصير',
      'خصم ١٠٪ للمعلمين والمشرفين'
    ]
  }
];

export const GALLERY_IMAGES = [
  'https://picsum.photos/id/1012/800/600',
  'https://picsum.photos/id/1025/800/600',
  'https://picsum.photos/id/1043/800/600',
  'https://picsum.photos/id/1050/800/600',
  'https://picsum.photos/id/1062/800/600',
  'https://picsum.photos/id/1074/800/600',
  'https://picsum.photos/id/1084/800/600',
  'https://picsum.photos/id/11/800/600',
];
