// lib/linkedin.ts
export type LinkedInUrn = `urn:li:person:${string}`;

export function generateLinkedInUrn(sub: string): LinkedInUrn {
  if (!sub || typeof sub !== 'string') {
    throw new Error('Invalid sub value provided');
  }
  return `urn:li:person:${sub}`;
}
