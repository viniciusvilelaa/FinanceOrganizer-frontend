import React from 'react';
import ReactPaginate from 'react-paginate';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Trata o evento de clique do react-paginate (event.selected é baseado em 0)
  const handlePageClick = (event) => {
    onPageChange(event.selected + 1);
  };

  return (
    <ReactPaginate
      // Propriedades principais
      pageCount={totalPages}
      forcePage={currentPage - 1} // react-paginate usa índice 0
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      
      // Rótulos dos botões anterior / próximo / reticências
      previousLabel="←"
      nextLabel="→"
      breakLabel="..."
      
      // Classes do container principal
      containerClassName="flex flex-wrap items-center justify-center gap-2 mt-4 select-none"
      
      // Classes dos botões numéricos
      pageClassName="inline-block"
      pageLinkClassName="block px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-semibold text-slate-500 bg-white hover:border-[#3870EA] hover:text-[#3870EA] transition-all cursor-pointer"
      
      // Classes da página ativa
      activeClassName="active"
      activeLinkClassName="!bg-[#3870EA] !border-[#3870EA] !text-white"
      
      // Classes dos botões Anterior / Próximo
      previousClassName="inline-block"
      previousLinkClassName="block px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-semibold text-slate-500 bg-white hover:border-[#3870EA] hover:text-[#3870EA] transition-all cursor-pointer"
      nextClassName="inline-block"
      nextLinkClassName="block px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-semibold text-slate-500 bg-white hover:border-[#3870EA] hover:text-[#3870EA] transition-all cursor-pointer"
      
      // Classes para o botão desabilitado (ex: anterior na pág 1)
      disabledClassName="opacity-40 pointer-events-none"
      disabledLinkClassName="hover:border-gray-200 hover:text-slate-500 cursor-not-allowed"
      
      // Classes das reticências (...)
      breakClassName="inline-block"
      breakLinkClassName="block px-2 py-1 text-slate-400 font-semibold cursor-default"
    />
  );
}
