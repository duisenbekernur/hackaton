import React from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { getProducts } from "../../app/slices/getProducts";

import styles from "./Pagination.module.scss";

const Pagination = ({ onChangePagination, limitProduct, currentPage }) => {
  const products = useSelector(getProducts);

  const pageCount = Math.ceil(products.length / limitProduct);

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangePagination(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={pageCount}
      previousLabel="<"
    />
  );
};

export default Pagination;
