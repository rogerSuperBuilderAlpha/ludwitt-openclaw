/**
 * HTML / SVG sanitization utilities using DOMPurify.
 *
 * All `dangerouslySetInnerHTML` values MUST pass through one of these
 * helpers before being rendered.
 */

import DOMPurify from 'isomorphic-dompurify'

/**
 * Sanitize an SVG string.
 * Allows only safe SVG elements and attributes; strips scripts,
 * event handlers, foreign objects, and dangerous URI schemes.
 */
export function sanitizeSvg(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    USE_PROFILES: { svg: true, svgFilters: true },
    ADD_TAGS: ['use'],
    ADD_ATTR: [
      'xmlns',
      'viewBox',
      'fill',
      'stroke',
      'stroke-width',
      'd',
      'cx',
      'cy',
      'r',
      'rx',
      'ry',
      'x',
      'y',
      'x1',
      'y1',
      'x2',
      'y2',
      'width',
      'height',
      'transform',
      'text-anchor',
      'dominant-baseline',
      'font-size',
      'font-weight',
      'font-family',
      'opacity',
      'stroke-dasharray',
      'stroke-linecap',
      'stroke-linejoin',
      'marker-end',
      'marker-start',
      'points',
      'dx',
      'dy',
    ],
  })
}

/**
 * Sanitize an HTML string (e.g. hint text with LaTeX delimiters).
 * Strips all tags except basic formatting and math containers.
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'b',
      'i',
      'em',
      'strong',
      'sub',
      'sup',
      'br',
      'span',
      'code',
      'p',
      'div',
    ],
    ALLOWED_ATTR: ['class', 'style'],
  })
}
