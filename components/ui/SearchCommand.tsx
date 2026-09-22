'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, BookOpen, Users, Briefcase, Command } from 'lucide-react';
import { getAllSearchItems, removeVietnameseTones } from '@/data/navigation';
import { SearchResultItem } from '@/data/types';
import Glass from './Glass';

interface SearchCommandProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchCommand({ isOpen, onClose }: SearchCommandProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const allItems = useMemo(() => getAllSearchItems(), []);

  // Filter items accent-insensitively
  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return allItems.slice(0, 6);
    }

    const cleanQuery = removeVietnameseTones(query);

    return allItems.filter((item) => {
      const matchTitle = removeVietnameseTones(item.title).includes(cleanQuery);
      const matchSubtitle = removeVietnameseTones(item.subtitle).includes(cleanQuery);
      const matchKeywords = item.keywords.some((kw) =>
        removeVietnameseTones(kw).includes(cleanQuery)
      );
      return matchTitle || matchSubtitle || matchKeywords;
    });
  }, [query, allItems]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle keyboard events inside command palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        router.push(filteredItems[selectedIndex].url);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-stone-900/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <Glass
          variant="prominent"
          cornerRadius={20}
          className="w-full overflow-hidden bg-white/95 shadow-2xl border border-stone-200/80"
        >
          {/* Search Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-stone-100 gap-3">
            <Search className="w-5 h-5 text-stone-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Tìm kiếm lĩnh vực, chuyên gia, bài phân tích... (hỗ trợ gõ không dấu)"
              className="w-full bg-transparent text-base sm:text-lg text-stone-900 placeholder:text-stone-400 focus:outline-none"
            />
            {query ? (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-mono text-stone-400 bg-stone-100 rounded border border-stone-200">
                ESC
              </kbd>
            )}
          </div>

          {/* Search Results */}
          <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-stone-50">
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-stone-500">
                <p className="text-sm">Không tìm thấy kết quả phù hợp với &quot;{query}&quot;</p>
                <p className="text-xs text-stone-400 mt-1">
                  Thử tìm với từ khóa chung như: &quot;dau tu&quot;, &quot;fdi&quot;, &quot;m&a&quot;, &quot;thue&quot;, &quot;lao dong&quot;
                </p>
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                const IconComponent =
                  item.type === 'practice'
                    ? Briefcase
                    : item.type === 'people'
                    ? Users
                    : BookOpen;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      router.push(item.url);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-emerald-900/10 text-emerald-950'
                        : 'hover:bg-stone-50 text-stone-800'
                    }`}
                  >
                    <div className="flex items-start gap-3.5 min-w-0 pr-4">
                      <div
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                          isSelected
                            ? 'bg-[#153E35] text-white'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-emerald-800/80 uppercase tracking-wider">
                            {item.typeLabel}
                          </span>
                        </div>
                        <h4 className="font-medium text-sm sm:text-base text-stone-900 truncate">
                          {item.title}
                        </h4>
                        <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected
                          ? 'text-[#153E35] translate-x-1'
                          : 'text-stone-300'
                      }`}
                    />
                  </div>
                );
              })
            )}
          </div>

          {/* Search Footer */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-stone-50/80 border-t border-stone-100 text-xs text-stone-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-stone-200 font-mono text-[10px]">
                  ↑
                </kbd>
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-stone-200 font-mono text-[10px]">
                  ↓
                </kbd>{' '}
                di chuyển
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-stone-200 font-mono text-[10px]">
                  ↵
                </kbd>{' '}
                chọn
              </span>
            </div>
            <span className="text-[11px] text-stone-400">Phan Anh Law Intelligence</span>
          </div>
        </Glass>
      </div>
    </div>
  );
}
