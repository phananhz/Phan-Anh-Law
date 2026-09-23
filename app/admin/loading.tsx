export default function AdminLoading() {
  return (
    <div className="px-6 py-10 sm:px-10 lg:px-14 lg:py-14" role="status" aria-label="Đang tải khu vực quản trị">
      <div className="h-3 w-28 animate-pulse rounded bg-stone-200" />
      <div className="mt-4 h-12 w-64 animate-pulse rounded bg-stone-200" />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((item) => <div key={item} className="h-32 animate-pulse rounded-2xl bg-white/70" />)}
      </div>
      <div className="mt-6 h-72 animate-pulse rounded-2xl bg-white/70" />
    </div>
  );
}
