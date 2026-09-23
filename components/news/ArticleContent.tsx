import type { CSSProperties, ReactNode } from 'react';
import type { JSONContent } from '@tiptap/core';
import { normalizeArticleDocument } from '@/lib/news-content';

function renderMarks(node: JSONContent, child: ReactNode) {
  return (node.marks || []).reduceRight((content, mark) => {
    const attrs = (mark.attrs || {}) as { color?: string; fontFamily?: string; fontSize?: string; href?: string };
    if (mark.type === 'bold') return <strong>{content}</strong>;
    if (mark.type === 'italic') return <em>{content}</em>;
    if (mark.type === 'underline') return <u>{content}</u>;
    if (mark.type === 'strike') return <s>{content}</s>;
    if (mark.type === 'code') return <code>{content}</code>;
    if (mark.type === 'link') {
      return (
        <a href={attrs.href} target="_blank" rel="noreferrer">
          {content}
        </a>
      );
    }
    if (mark.type === 'textStyle') {
      const style: CSSProperties = {
        color: attrs.color,
        fontFamily: attrs.fontFamily,
        fontSize: attrs.fontSize,
      };
      return <span style={style}>{content}</span>;
    }
    return content;
  }, child);
}

function renderNode(node: JSONContent, key: string): ReactNode {
  if (node.type === 'text') return renderMarks(node, node.text || '');
  if (node.type === 'hardBreak') return <br key={key} />;
  if (node.type === 'horizontalRule') return <hr key={key} />;
  if (node.type === 'image') {
    const attrs = (node.attrs || {}) as { src?: string; alt?: string; title?: string };
    if (!attrs.src) return null;
    return <img key={key} src={attrs.src} alt={attrs.alt || ''} title={attrs.title} loading="lazy" />;
  }

  const children = (node.content || []).map((child, index) => renderNode(child, key + '-' + index));
  const rawAlign = (node.attrs as { textAlign?: unknown } | undefined)?.textAlign;
  const textAlign = typeof rawAlign === 'string' && ['left', 'center', 'right', 'justify'].includes(rawAlign) ? rawAlign as CSSProperties['textAlign'] : undefined;
  const style = textAlign ? { textAlign } : undefined;

  if (node.type === 'heading') {
    const level = (node.attrs as { level?: number } | undefined)?.level === 3 ? 3 : 2;
    return level === 3 ? <h3 key={key} style={style}>{children}</h3> : <h2 key={key} style={style}>{children}</h2>;
  }
  if (node.type === 'bulletList') return <ul key={key}>{children}</ul>;
  if (node.type === 'orderedList') return <ol key={key}>{children}</ol>;
  if (node.type === 'listItem') return <li key={key}>{children}</li>;
  if (node.type === 'blockquote') return <blockquote key={key}>{children}</blockquote>;
  return <p key={key} style={style}>{children}</p>;
}

export default function ArticleContent({ body }: { body: unknown }) {
  const document = normalizeArticleDocument(body);
  return <div className="article-content">{(document.content || []).map((node, index) => renderNode(node, String(index)) )}</div>;
}