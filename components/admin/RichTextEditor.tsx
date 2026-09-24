'use client';

import { useEffect, useRef, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import type { JSONContent } from '@tiptap/core';
import { Extension } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Code, ImagePlus, Italic, Link2, List, ListOrdered, Minus, Paintbrush, Quote, Redo2, Strikethrough, Underline as UnderlineIcon, Undo2 } from 'lucide-react';
import { uploadNewsImage } from '@/components/admin/uploadNewsImage';

const FontSize = Extension.create({
  name: 'fontSize',
  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize || null,
            renderHTML: (attributes) => attributes.fontSize ? { style: 'font-size: ' + attributes.fontSize } : {},
          },
        },
      },
    ];
  },
});

const colors = ['#153E35', '#111111', '#5F625E', '#9A3E2F', '#7A5B00', '#6D2D68'];
const fonts = [
  { label: 'Newsreader', value: 'Newsreader' },
  { label: 'Inter', value: 'Inter' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Hệ thống', value: 'system-ui' },
];
const sizes = [
  { label: 'Nhỏ', value: '14px' },
  { label: 'Thường', value: '16px' },
  { label: 'Lớn', value: '20px' },
  { label: 'Tiêu đề', value: '30px' },
];

function ToolbarButton({ label, onClick, active, children }: { label: string; onClick: () => void; active?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={'inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-stone-600 transition hover:bg-stone-100 hover:text-[#153E35] ' + (active ? 'bg-emerald-50 text-[#153E35]' : '')}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({
  value,
  onChange,
  onStatus,
}: {
  value: JSONContent;
  onChange: (value: JSONContent) => void;
  onStatus?: (message: string) => void;
}) {
  const imageInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    content: value,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] }, link: false, underline: false }),
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false, autolink: true, linkOnPaste: true }),
      TextStyle,
      Color.configure({ types: ['textStyle'] }),
      FontFamily.configure({ types: ['textStyle'] }),
      FontSize,
      TextAlign.configure({ types: ['heading', 'paragraph'], alignments: ['left', 'center', 'right', 'justify'] }),
      Underline,
      Placeholder.configure({ placeholder: 'Viết nội dung bài viết…' }),
    ],
    editorProps: {
      attributes: {
        class: 'min-h-[360px] px-5 py-4 outline-none prose prose-stone max-w-none',
      },
    },
    onUpdate: ({ editor: currentEditor }) => onChange(currentEditor.getJSON()),
  });

  useEffect(() => {
    if (editor && JSON.stringify(editor.getJSON()) !== JSON.stringify(value)) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) {
    return <div className="min-h-[360px] animate-pulse rounded-b-xl bg-stone-50" />;
  }

  const activeEditor = editor;

  async function handleImage(file: File) {
    if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') {
      onStatus?.('Chỉ nhận ảnh PNG, JPEG, WebP hoặc AVIF.');
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      onStatus?.('Ảnh phải nhỏ hơn 4 MB.');
      return;
    }

    setUploading(true);
    onStatus?.('Đang tải ảnh lên…');
    try {
      const result = await uploadNewsImage(file);
      activeEditor.chain().focus().setImage({ src: result.url, alt: result.alt }).run();
      onStatus?.('Đã chèn ảnh.');
    } catch (error) {
      onStatus?.(error instanceof Error ? error.message : 'Không thể tải ảnh lên.');
    } finally {
      setUploading(false);
      if (imageInput.current) imageInput.current.value = '';
    }
  }

  function setLink() {
    const previous = activeEditor.getAttributes('link').href || '';
    const href = window.prompt('Nhập đường dẫn HTTPS, email hoặc số điện thoại', previous);
    if (href === null) return;
    if (!href) activeEditor.chain().focus().unsetLink().run();
    else activeEditor.chain().focus().setLink({ href }).run();
  }

  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
      <div className="flex flex-wrap items-center gap-1 border-b border-stone-200 bg-stone-50/80 p-2">
        <ToolbarButton label="Hoàn tác" onClick={() => activeEditor.chain().focus().undo().run()}><Undo2 className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Làm lại" onClick={() => activeEditor.chain().focus().redo().run()}><Redo2 className="h-4 w-4" /></ToolbarButton>
        <span className="mx-1 h-6 w-px bg-stone-200" />
        <select
          aria-label="Kiểu đoạn"
          value={activeEditor.isActive('heading', { level: 2 }) ? 'h2' : activeEditor.isActive('heading', { level: 3 }) ? 'h3' : 'p'}
          onChange={(event) => {
            const value = event.target.value;
            if (value === 'h2') activeEditor.chain().focus().toggleHeading({ level: 2 }).run();
            else if (value === 'h3') activeEditor.chain().focus().toggleHeading({ level: 3 }).run();
            else activeEditor.chain().focus().setParagraph().run();
          }}
          className="h-9 rounded-lg border border-stone-200 bg-white px-2 text-xs text-stone-700"
        >
          <option value="p">Đoạn văn</option>
          <option value="h2">Tiêu đề 2</option>
          <option value="h3">Tiêu đề 3</option>
        </select>
        <select
          aria-label="Phông chữ"
          defaultValue=""
          onChange={(event) => {
            if (event.target.value) activeEditor.chain().focus().setFontFamily(event.target.value).run();
          }}
          className="h-9 rounded-lg border border-stone-200 bg-white px-2 text-xs text-stone-700"
        >
          <option value="">Phông chữ</option>
          {fonts.map((font) => <option key={font.value} value={font.value}>{font.label}</option>)}
        </select>
        <select
          aria-label="Cỡ chữ"
          defaultValue=""
          onChange={(event) => {
            if (event.target.value) activeEditor.chain().focus().setMark('textStyle', { fontSize: event.target.value }).run();
          }}
          className="h-9 rounded-lg border border-stone-200 bg-white px-2 text-xs text-stone-700"
        >
          <option value="">Cỡ chữ</option>
          {sizes.map((size) => <option key={size.value} value={size.value}>{size.label}</option>)}
        </select>
        <span className="mx-1 h-6 w-px bg-stone-200" />
        <ToolbarButton label="Đậm" active={activeEditor.isActive('bold')} onClick={() => activeEditor.chain().focus().toggleBold().run()}><Bold className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Nghiêng" active={activeEditor.isActive('italic')} onClick={() => activeEditor.chain().focus().toggleItalic().run()}><Italic className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Gạch chân" active={activeEditor.isActive('underline')} onClick={() => activeEditor.chain().focus().toggleUnderline().run()}><UnderlineIcon className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Gạch ngang" active={activeEditor.isActive('strike')} onClick={() => activeEditor.chain().focus().toggleStrike().run()}><Strikethrough className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Mã code" active={activeEditor.isActive('code')} onClick={() => activeEditor.chain().focus().toggleCode().run()}><Code className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Danh sách" active={activeEditor.isActive('bulletList')} onClick={() => activeEditor.chain().focus().toggleBulletList().run()}><List className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Danh sách số" active={activeEditor.isActive('orderedList')} onClick={() => activeEditor.chain().focus().toggleOrderedList().run()}><ListOrdered className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Trích dẫn" active={activeEditor.isActive('blockquote')} onClick={() => activeEditor.chain().focus().toggleBlockquote().run()}><Quote className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Đường kẻ" onClick={() => activeEditor.chain().focus().setHorizontalRule().run()}><Minus className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Liên kết" active={activeEditor.isActive('link')} onClick={setLink}><Link2 className="h-4 w-4" /></ToolbarButton>
        <label className="relative inline-flex h-9 cursor-pointer items-center justify-center rounded-lg px-2 text-stone-600 transition hover:bg-stone-100 hover:text-[#153E35]" title="Màu chữ">
          <Paintbrush className="h-4 w-4" />
          <input
            type="color"
            aria-label="Màu chữ"
            className="absolute inset-0 cursor-pointer opacity-0"
            defaultValue="#153E35"
            onChange={(event) => activeEditor.chain().focus().setColor(event.target.value).run()}
          />
        </label>
        <ToolbarButton label="Chèn ảnh vào nội dung" onClick={() => imageInput.current?.click()}><ImagePlus className="h-4 w-4" /></ToolbarButton>
        <input
          ref={imageInput}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/avif"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void handleImage(file);
          }}
        />
        {uploading && <span className="ml-2 text-xs text-stone-500">Đang tải ảnh…</span>}
      </div>
      <EditorContent editor={activeEditor} />
    </div>
  );
}