import type { JSONContent } from '@tiptap/core';

const allowedNodes = new Set([
  'doc',
  'paragraph',
  'heading',
  'text',
  'bulletList',
  'orderedList',
  'listItem',
  'blockquote',
  'hardBreak',
  'horizontalRule',
  'image',
]);

const allowedMarks = new Set(['bold', 'italic', 'underline', 'strike', 'link', 'textStyle']);
const allowedFonts = new Set(['Newsreader', 'Inter', 'Georgia', 'system-ui']);
const hexColor = /^#[0-9a-f]{6}$/i;
const fontSize = /^(?:12|14|16|18|20|24|30|36|48)px$/;

export function legacyBodyToDocument(value: unknown): JSONContent {
  if (!Array.isArray(value)) return { type: 'doc', content: [] };

  return {
    type: 'doc',
    content: value
      .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
      .map((text) => ({
        type: 'paragraph',
        content: [{ type: 'text', text }],
      })),
  };
}

function isAllowedLink(value: unknown) {
  if (typeof value !== 'string' || value.length > 2000) return false;
  if ((value.startsWith('/') && !value.startsWith('//')) || value.startsWith('#')) return true;

  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'mailto:' || url.protocol === 'tel:';
  } catch {
    return false;
  }
}

function isAllowedImage(value: unknown) {
  if (typeof value !== 'string' || value.length > 2000) return false;
  if (value.startsWith('/') && !value.startsWith('//')) return true;

  try {
    const url = new URL(value);
    return (
      url.protocol === 'https:' &&
      url.hostname.endsWith('.supabase.co') &&
      url.pathname.includes('/storage/v1/object/public/news-media/')
    );
  } catch {
    return false;
  }
}

function isSafeStyle(attrs: Record<string, unknown>) {
  if (attrs.color !== undefined && (typeof attrs.color !== 'string' || !hexColor.test(attrs.color))) return false;
  if (attrs.fontFamily !== undefined && (typeof attrs.fontFamily !== 'string' || !allowedFonts.has(attrs.fontFamily))) return false;
  if (attrs.fontSize !== undefined && (typeof attrs.fontSize !== 'string' || !fontSize.test(attrs.fontSize))) return false;
  return true;
}

export function isSafeArticleDocument(value: unknown) {
  let count = 0;

  function visit(node: unknown, depth: number): boolean {
    if (!node || typeof node !== 'object' || depth > 12) return false;
    count += 1;
    if (count > 500) return false;

    const current = node as { type?: unknown; text?: unknown; attrs?: unknown; content?: unknown; marks?: unknown };
    if (typeof current.type !== 'string' || !allowedNodes.has(current.type)) return false;

    if (current.type === 'text' && (typeof current.text !== 'string' || current.text.length > 10000)) return false;

    if (current.type === 'heading') {
      const level = (current.attrs as { level?: unknown } | undefined)?.level;
      if (level !== 2 && level !== 3) return false;
    }

    if (current.type === 'image') {
      const attrs = (current.attrs || {}) as { src?: unknown; alt?: unknown };
      if (!isAllowedImage(attrs.src)) return false;
      if (attrs.alt !== undefined && (typeof attrs.alt !== 'string' || attrs.alt.length > 240)) return false;
    }

    if (Array.isArray(current.marks)) {
      for (const mark of current.marks) {
        if (!mark || typeof mark !== 'object' || !allowedMarks.has((mark as { type?: unknown }).type as string)) return false;
        const markRecord = mark as { type: string; attrs?: Record<string, unknown> };
        if (markRecord.type === 'link' && !isAllowedLink(markRecord.attrs?.href)) return false;
        if (markRecord.type === 'textStyle' && !isSafeStyle(markRecord.attrs || {})) return false;
      }
    }

    if (current.content !== undefined) {
      if (!Array.isArray(current.content) || current.content.some((child) => !visit(child, depth + 1))) return false;
    }

    return true;
  }

  return visit(value, 0);
}

export function normalizeArticleDocument(value: unknown): JSONContent {
  const normalized = Array.isArray(value) ? legacyBodyToDocument(value) : value;
  return isSafeArticleDocument(normalized) ? normalized as JSONContent : { type: 'doc', content: [] };
}

export function articleDocumentToText(value: unknown) {
  const document = normalizeArticleDocument(value);
  const chunks: string[] = [];

  function collect(node: JSONContent) {
    if (node.text) chunks.push(node.text);
    node.content?.forEach(collect);
  }

  collect(document);
  return chunks.join(' ').replace(/\s+/g, ' ').trim();
}