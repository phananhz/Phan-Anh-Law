'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Globe, Mail, Phone, ArrowRight, MapPin } from 'lucide-react';
import { people } from '@/data/people';
import { removeVietnameseTones } from '@/data/navigation';
import Glass from '@/components/ui/Glass';

const offices = ['Tất cả', 'Hà Nội', 'TP. Hồ Chí Minh'];
const languages = ['Tất cả', 'English', 'Tiếng Việt', 'Français'];

export default function PeopleDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOffice, setSelectedOffice] = useState('Tất cả');
  const [selectedLanguage, setSelectedLanguage] = useState('Tất cả');

  const filteredPeople = useMemo(() => {
    return people.filter((person) => {
      // Office match
      if (selectedOffice !== 'Tất cả' && person.office !== selectedOffice) {
        return false;
      }

      // Language match
      if (selectedLanguage !== 'Tất cả' && !person.languages.includes(selectedLanguage)) {
        return false;
      }

      // Search match
      if (!searchQuery.trim()) return true;
      const clean = removeVietnameseTones(searchQuery);
      const matchName = removeVietnameseTones(person.name).includes(clean);
      const matchPosition = removeVietnameseTones(person.position).includes(clean);
      const matchExpertise = person.primaryExpertise.some((e) =>
        removeVietnameseTones(e).includes(clean)
      );

      return matchName || matchPosition || matchExpertise;
    });
  }, [searchQuery, selectedOffice, selectedLanguage]);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-8 bg-[#F4F3EF]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl pb-16 border-b border-stone-300/60">
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-brand mb-3">
            LEGAL EXPERTS
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#111111] font-normal tracking-tight mb-4">
            Đội ngũ Chuyên gia & Luật sư
          </h1>
          <p className="text-base sm:text-xl text-stone-600 leading-relaxed font-light">
            Các luật sư giàu kinh nghiệm thực tiễn, am hiểu sâu sắc quy định pháp luật và thông lệ quốc tế, cam kết đồng hành cùng doanh nghiệp.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-stone-200">
          {/* Office & Language Filter */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Văn phòng:
              </span>
              <div className="flex gap-1.5">
                {offices.map((off) => (
                  <button
                    key={off}
                    onClick={() => setSelectedOffice(off)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedOffice === off
                        ? 'bg-[#153E35] text-white'
                        : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                    }`}
                  >
                    {off}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Ngôn ngữ:
              </span>
              <div className="flex gap-1.5">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedLanguage === lang
                        ? 'bg-[#153E35] text-white'
                        : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm chuyên gia theo tên, lĩnh vực..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-emerald-brand shadow-sm"
            />
          </div>
        </div>

        {/* Directory Grid */}
        <div className="pt-8">
          <div className="pb-4 text-xs text-stone-500">
            Hiển thị {filteredPeople.length} chuyên gia
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredPeople.map((person) => (
              <Link
                key={person.id}
                href={`/people/${person.slug}`}
                className="group flex flex-col justify-between rounded-2xl bg-white border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-800/30 transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
                    <Image
                      src={person.photoUrl}
                      alt={person.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute top-3 right-3 text-[10px] font-medium bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded-full">
                      {person.office}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div>
                      <h2 className="font-serif text-xl text-[#111111] group-hover:text-emerald-brand transition-colors">
                        {person.name}
                      </h2>
                      <p className="text-xs font-medium text-stone-500 mt-0.5">
                        {person.position}
                      </p>
                    </div>

                    <div className="space-y-1 pt-2 border-t border-stone-100">
                      <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">
                        Lĩnh vực chính:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {person.primaryExpertise.map((exp, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-stone-400 pt-1">
                      <Globe className="w-3 h-3 text-emerald-brand" />
                      <span>{person.languages.join(' • ')}</span>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-3.5 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between text-xs font-medium text-emerald-brand group-hover:bg-[#153E35] group-hover:text-white transition-colors">
                  <span>Xem hồ sơ & kinh nghiệm</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
