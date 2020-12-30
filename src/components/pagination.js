import React from "react";

const Pagination = ({ totalUsers, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalUsers; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="content">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number}>
            <a onClick={() => paginate(number)} href="#">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
