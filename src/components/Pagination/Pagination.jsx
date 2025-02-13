import React from 'react';

export default function Pagination({ totalItems, itemsPerPage, paginate, currentPage }) {
  const pageNumbers = [];

  // حساب عدد الصفحات
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // التنقل إلى الصفحة السابقة
  const previousPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  // التنقل إلى الصفحة التالية
  const nextPage = () => {
    if (currentPage < pageNumbers.length) {
      paginate(currentPage + 1);
    }
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {/* زر السابق */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a className="page-link" href="#" aria-label="Previous" onClick={previousPage}>
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>

        {/* النقاط الخاصة بالصفحات */}
        {pageNumbers.map(number => (
          <li key={number} className={` ${number === currentPage ? 'active' : ''}`}>
            <span className="page-link" onClick={() => paginate(number)}>
              {number}
            </span>
          </li>
        ))}

        {/* زر التالي */}
        <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
          <a className="page-link" href="#" aria-label="Next" onClick={nextPage}>
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
