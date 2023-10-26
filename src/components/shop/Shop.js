import React, { useState } from "react";
import ShopModal from "./ShopModal";
import { NavLink } from "react-router-dom";
import { useProductContext } from "../context/ContextApi";

export default function Shop() {
  const { isLoading, products } = useProductContext();
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return <div>....Loading...</div>;
  }

  const itemsPerPage = 8;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, products.length);

  // Calculate the total number of pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Generate an array of page numbers
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const displayedItems = products.slice(startIndex, endIndex);

  return (
    <div>
      <div className="container">
        <div className="row ">
          {displayedItems.map((CurELem) => {
            return (
              <div className="col-sm-3 box" key={CurELem.id}>
                <NavLink to={`/SingleProduct/${CurELem.id}`}>
                  <ShopModal item={CurELem} key={CurELem.id} />
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-center">
        <div className="page">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={currentPage === pageNumber ? "active" : ""}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={endIndex >= products.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
