import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Globe, Mail, Phone } from 'lucide-react';
import { people } from '@/data/people';
import SectionHeading from '@/components/ui/SectionHeading';

export default function PeopleSection() {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-8 bg-[#F4F3EF]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="ĐỘI NGŨ CHUYÊN GIA"
          title="Những người đứng sau lời tư vấn."
          description="Được dẫn dắt bởi các luật sư thành viên dày dặn kinh nghiệm, kết hợp giữa tư duy pháp lý quốc tế và sự thấu hiểu sâu sắc thực tiễn áp dụng tại Việt Nam."
          align="split"
          action={
            <Link
              href="/people"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-brand hover:text-emerald-950 transition-colors group"
            >
              <span>Xem danh bạ toàn bộ chuyên gia</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />

        {/* Lawyer Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {people.map((person) => (
            <Link
              key={person.id}
              href={`/people/${person.slug}`}
              className="group flex flex-col justify-between rounded-2xl bg-white border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-800/30 transition-all duration-300"
            >
              <div>
                {/* Photo with subtle scale on hover */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
                  <Image
                    src={person.photoUrl}
                    alt={person.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    <span className="font-medium bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full">
                      Văn phòng: {person.office}
                    </span>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="font-serif text-xl text-[#111111] group-hover:text-emerald-brand transition-colors">
                      {person.name}
                    </h3>
                    <p className="text-xs font-medium text-stone-500 mt-0.5">
                      {person.position}
                    </p>
                  </div>

                  {/* Primary Expertise */}
                  <div className="space-y-1 pt-1 border-t border-stone-100">
                    <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">
                      Lĩnh vực chính:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {person.primaryExpertise.slice(0, 2).map((exp, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                    <Globe className="w-3 h-3 text-emerald-brand" />
                    <span>{person.languages.join(' • ')}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Xem hồ sơ */}
              <div className="px-6 py-4 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between text-xs font-medium text-emerald-brand group-hover:bg-[#153E35] group-hover:text-white transition-colors">
                <span>Xem hồ sơ năng lực</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
