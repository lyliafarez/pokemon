import React from "react";

export default function Pagination({ gotoNextPage, gotoPrevPage }) {
  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      {gotoPrevPage && <button className="px-2 py-1 bg-white rounded-md" onClick={gotoPrevPage}>Previous</button>}
      {gotoNextPage && <button className="px-2 py-1 bg-white rounded-md" onClick={gotoNextPage}>Next</button>}
    </div>
  );
}