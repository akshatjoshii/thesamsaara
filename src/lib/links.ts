import site from '../data/site.json';

/** Pre-filled WhatsApp link. Message changes per page. */
export function waLink(message = "Hi Samsaara! I'd like to know about availability and the best price.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const telLink = `tel:${site.phoneRaw}`;
export const mailLink = `mailto:${site.email}`;

export const formatINR = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export const mapsEmbed = `https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=14&output=embed`;
export const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${site.geo.lat},${site.geo.lng}`;
