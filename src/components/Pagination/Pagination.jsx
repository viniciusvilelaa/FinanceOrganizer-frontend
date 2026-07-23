function getPageNumbers(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, '...', totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-semibold text-slate-500 bg-white hover:border-[#3870EA] hover:text-[#3870EA] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-slate-500 transition-all cursor-pointer"
      >
        ←
      </button>

      {pages.map((p, index) => {
        if (p === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-2 py-1 text-slate-400 font-semibold select-none">
              ...
            </span>
          );
        }

        return (
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
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-semibold text-slate-500 bg-white hover:border-[#3870EA] hover:text-[#3870EA] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-slate-500 transition-all cursor-pointer"
      >
        →
      </button>
    </div>
  );
}