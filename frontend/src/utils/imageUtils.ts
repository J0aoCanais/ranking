// Helper to build a usable image URL from API's foto field
export const buildPhotoUrl = (foto?: string | null): string | undefined => {
  if (!foto || foto === 'null') return undefined;
  // Already absolute
  if (/^https?:\/\//i.test(foto)) return foto;

  // Prepend backend base URL when relative path is provided
  const base = (import.meta.env.VITE_BACKEND_URL || '').trim();
  if (!base) return foto; // fallback: return as-is

  const baseNorm = base.endsWith('/') ? base.slice(0, -1) : base;
  const path = foto.startsWith('/') ? foto : `/${foto}`;
  return `${baseNorm}${path}`;
};

export const placeholderPhoto = 'https://via.placeholder.com/190';
