/* eslint-disable react/prop-types */
import { ChevronRight, ChevronLeft } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxPagesToShow = 2;
  const halfMaxPages = Math.floor(maxPagesToShow / 2);

  let startPage = Math.max(1, currentPage - halfMaxPages);
  let endPage = Math.min(totalPages, currentPage + halfMaxPages);

  if (currentPage <= halfMaxPages) {
    endPage = Math.min(maxPagesToShow, totalPages);
  } else if (currentPage >= totalPages - halfMaxPages) {
    startPage = Math.max(totalPages - maxPagesToShow + 1, 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-2 py-1 rounded-lg bg-white text-gray-700 border 
        border-gray-200 hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft />
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`px-2 py-1 rounded-lg ${
              1 === currentPage
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:border-blue-500"
            }`}
          >
            1
          </button>
          {startPage > 2 && <span className="px-2 py-1">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-2 py-1 rounded-lg ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border border-gray-200 hover:border-blue-500"
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`px-2 py-1 rounded-lg ${
              totalPages === currentPage
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:border-blue-500"
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-2 py-1 rounded-lg bg-white text-gray-700 border 
        border-gray-200 hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
