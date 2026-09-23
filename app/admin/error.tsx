'use client';

export default function AdminError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="px-6 py-16 sm:px-10 lg:px-14">
      <div className="max-w-xl rounded-2xl border border-red-200 bg-red-50 p-6 text-red-950">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-red-700">ADMIN ERROR</div>
        <h1 className="mt-3 font-serif text-3xl">Không thể tải dữ liệu</h1>
        <p className="mt-3 text-sm leading-relaxed">Kết nối hoặc truy vấn đang gặp sự cố. Dữ liệu chưa được thay đổi.</p>
        <button type="button" onClick={() => reset()} className="mt-6 rounded-full bg-[#153E35] px-4 py-2 text-sm font-semibold text-white">Thử lại</button>
      </div>
    </div>
  );
}
