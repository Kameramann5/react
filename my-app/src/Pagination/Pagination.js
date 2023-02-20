import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./pagination.css";
import PaginationPrevPage from "../Pagination/PaginationPrevPage";
import PaginationNextPage from "../Pagination/PaginationNextPage";
import PaginationCurrentPage from "../Pagination/PaginationCurrentPage";
function Pagination({
  todosPerPage,totalTodos, paginate, prevPage, nextPage,currentPage
}) { 
  

 
const pageNumbers = []
for (let i=1; i<=  Math.ceil(totalTodos/todosPerPage); i++)
{pageNumbers.push(i) }  
  return (
    
    <>
   <div>
   <div><p >Страница: {currentPage} из {pageNumbers.length}</p></div>
<ul className="pagination">

<PaginationPrevPage prevPage={prevPage} currentPage={currentPage}  /> 
  {  
    pageNumbers.map(number => ( 
      <>
      <PaginationCurrentPage    currentPage={currentPage} number={number}  paginate={paginate} pageNumbers={pageNumbers} />
     
      </>
    ))
  }

  <PaginationNextPage nextPage={nextPage} currentPage={currentPage}  pageNumbers={pageNumbers} />
</ul>

   </div>
    
   

    </> 
  );  
}

export default Pagination;
