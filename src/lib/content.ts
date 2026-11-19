import site from '../data/site.json';
import { formatINR } from './links';

/**
 * Text from the admin panel can contain {price}; it is replaced with the
 * current starting price from Site settings (e.g. "₹2,000").
 */
export function fill(text: string | undefined | null): string {
  if (!text) return '';
  return text.split('{price}').join(formatINR(site.startingPrice));
}

/** An empty image field in the admin panel falls back to the default share image. */
export function shareImage(image: string | undefined | null): string | undefined {
  return image ? image : undefined;
}
