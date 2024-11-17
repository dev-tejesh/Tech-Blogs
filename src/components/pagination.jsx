// import React from 'react';
import './pagination.css';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
  const maxPageNumbers = 2; // Display 5 page numbers at a time

  // Total number of pages
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Determine the range of page numbers to display
  const startIndex = Math.floor((currentPage - 1) / maxPageNumbers) * maxPageNumbers;
  const endIndex = Math.min(startIndex + maxPageNumbers, totalPages);
  const displayedPageNumbers = pageNumbers.slice(startIndex, endIndex);

  const handleLeftClick = () => {
    if (startIndex > 0) {
      paginate(startIndex);
    }
  };

  const handleRightClick = () => {
    if (endIndex < totalPages) {
      paginate(endIndex + 1);
    }
  };

  if (totalPosts === 0) {
    return null; // Don't render the pagination if no posts are available
  }

  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li className="page-item">
          <a onClick={handleLeftClick} className={startIndex === 0 ? 'disabled' : ''}>
            &laquo;
          </a>
        </li>

        {displayedPageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              className={number === currentPage ? 'active' : ''}
              onClick={() => paginate(number)}
            >
              {number}
            </a>
          </li>
        ))}

        <li className="page-item">
          <a onClick={handleRightClick} className={endIndex === totalPages ? 'disabled' : ''}>
            &raquo;
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
