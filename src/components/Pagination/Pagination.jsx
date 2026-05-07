export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 mt-4">

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-semibold text-slate-500 bg-white hover:border-[#3870EA] hover:text-[#3870EA] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-slate-500 transition-all cursor-pointer"
      >
        ←
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1.5 rounded-lg border text-sm font-semibold transition-all cursor-pointer
            ${currentPage === p
              ? 'bg-[#3870EA] border-[#3870EA] text-white'
              : 'bg-white border-gray-200 text-slate-500 hover:border-[#3870EA] hover:text-[#3870EA]'
            }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-semibold text-slate-500 bg-white hover:border-[#3870EA] hover:text-[#3870EA] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-slate-500 transition-all cursor-pointer"
      >
        →
      </button>

    </div>
  )
}