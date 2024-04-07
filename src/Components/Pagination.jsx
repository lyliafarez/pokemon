//import { BeakerIcon } from '@heroicons/react/24/outline'
function Pagination({ allData,paginatedData ,currentPage, totalPages, handlePageChange, nextPage,prevPage,gotoPage }) {
    const pageNumbers = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    return (
        <div className="flex items-center justify-center">
        {/* Pagination Controls */}
        <div className="mt-6 flex justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            Affichage de {paginatedData.length} sur {allData.length} resultats
          </div>
          <ul className="inline-flex -space-x-px text-sm">
            <li>
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
               prev
              </button>
            </li>
        
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              if (
                totalPages <= 2 ||
                Math.abs(currentPage - pageNumber) < 3 ||
                pageNumber === 1 ||
                pageNumber === totalPages
              ) {
                return (
                  <li key={pageNumber}>
                    <button
                      onClick={() => gotoPage(pageNumber)}
                      className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                        currentPage === pageNumber ? 'text-blue-600 bg-blue-400' : ''
                      }`}
                    >
                      {pageNumber}
                    </button>
                  </li>
                );
              } else if (Math.abs(currentPage - pageNumber) === 3) {
                return (
                  <li key={pageNumber}>
                    <span className="px-2 pb-3 leading-tight text-gray-500 bg-white border border-gray-300">...</span>
                  </li>
                );
              }
              return null;
            })}
  
            <li>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                next
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
}
export default Pagination;