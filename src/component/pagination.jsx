import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const showEllipsis = totalPages > 11;

    if (showEllipsis) {
      if (currentPage <= 6) {
        for (let i = 1; i <= 7; i++) {
          pageNumbers.push(renderPageButton(i));
        }
        pageNumbers.push(<span key="ellipsis1">...</span>);
        pageNumbers.push(renderPageButton(totalPages));
      } else if (currentPage >= totalPages - 5) {
        pageNumbers.push(renderPageButton(1));
        pageNumbers.push(<span key="ellipsis1">...</span>);
        for (let i = totalPages - 6; i <= totalPages; i++) {
          pageNumbers.push(renderPageButton(i));
        }
      } else {
        pageNumbers.push(renderPageButton(1));
        pageNumbers.push(<span key="ellipsis1">...</span>);
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pageNumbers.push(renderPageButton(i));
        }
        pageNumbers.push(<span key="ellipsis2">...</span>);
        pageNumbers.push(renderPageButton(totalPages));
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderPageButton(i));
      }
    }

    return pageNumbers;
  };

  const renderPageButton = (pageNum) => (
    <button
      key={pageNum}
      onClick={() => onPageChange(pageNum)}
      className={`px-3 py-1 ${
        pageNum === currentPage
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      } rounded-md mx-1`}
    >
      {pageNum}
    </button>
  );

  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      <button
        onClick={handlePrevPage}
        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNextPage}
        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;