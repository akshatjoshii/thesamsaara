import site from '../data/site.json';
import faqs from '../data/faqs.json';

export type Faq = { q: string; a: string; tags?: string[] };

export function faqsByTag(tag?: string): Faq[] {
  if (!tag) return faqs.items;
  return faqs.items.filter((f) => f.tags?.includes(tag));
}

export function faqSchema(items: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

const amenities = [
  'Free Wi-Fi', 'Free parking', 'Swimming pool', 'River front', 'Air-conditioned cottages',
  'Bonfire', 'Riverside camping', 'River rafting', 'Indoor and outdoor games', 'Beach volleyball',
  'Karaoke and music', 'In-house café', 'Wedding and event venue',
];

export function resortSchema() {
  const s: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['Resort', 'LodgingBusiness'],
    '@id': `${site.url}/#resort`,
    name: site.name,
    url: site.url,
    telephone: site.phoneRaw,
    email: site.email,
    image: [new URL(site.branding.shareImage, site.url).href],
    logo: new URL(site.branding.footerLogo, site.url).href,
    description:
      '17 AC cottages and 10 riverside tents on the bank of the Ganga in Shivpuri, Rishikesh. Stays from ₹2,000 per person per night with meals included. Destination weddings, corporate offsites, school trips and celebrations.',
    priceRange: `₹${site.startingPrice.toLocaleString('en-IN')} onwards`,
    currenciesAccepted: 'INR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.googleProfile,
    amenityFeature: amenities.map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
    numberOfRooms: 17,
    sameAs: [site.instagram, site.googleProfile],
  };
  // Only include a rating when it mirrors the real Google rating (edit in site.json)
  if (site.googleRating.show && site.googleRating.count > 0) {
    s.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: site.googleRating.rating,
      reviewCount: site.googleRating.count,
      bestRating: 5,
    };
  }
  return s;
}

export function cafeSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: 'The Samsaara Café',
    url: `${site.url}/cafe/`,
    telephone: site.phoneRaw,
    servesCuisine: ['Indian', 'Chinese', 'Pizza', 'Café'],
    hasMenu: `${site.url}/cafe/#menu`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    containedInPlace: { '@id': `${site.url}/#resort` },
  };
}
