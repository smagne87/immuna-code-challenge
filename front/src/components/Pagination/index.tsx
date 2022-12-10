import clsx from "clsx";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "./pagination.css";

type PaginationProps = {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (nextPage: number) => void;
};

type PageItem = {
  pageNumber: number;
  isCurrentPage: boolean;
};

const MAX_PAGES = 5;

const Pagination = ({
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
}: PaginationProps) => {
  const pages: PageItem[] = [];
  const totalPages = Math.ceil(totalItems / pageSize);
  const firstPage = currentPage <= MAX_PAGES ? 1 : currentPage - MAX_PAGES + 1;
  const renderPages =
    totalPages < MAX_PAGES ? totalPages : firstPage + MAX_PAGES;
  for (let i = firstPage; i <= renderPages; i += 1) {
    const pageNumber = i;
    if (pageNumber <= totalPages) {
      pages.push({
        pageNumber,
        isCurrentPage: pageNumber === currentPage,
      });
    }
  }

  const handlePageButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newPage = e.currentTarget.value;
    onPageChange(Number.parseInt(newPage, 10));
  };

  return (
    <div className="flex items-center gap-1 py-6 px-2 bg-white rounded-md">
      <button
        onClick={handlePageButtonClick}
        value={currentPage - 1}
        disabled={currentPage === 1}
        className="page"
      >
        <MdChevronLeft />
      </button>
      {pages.map((page) => (
        <button
          key={page.pageNumber}
          onClick={handlePageButtonClick}
          value={page.pageNumber}
          className={clsx("page", {
            "page-active": page.isCurrentPage,
          })}
        >
          {page.pageNumber}
        </button>
      ))}
      <button
        onClick={handlePageButtonClick}
        value={currentPage + 1}
        disabled={currentPage === totalPages}
        className="page"
      >
        <MdChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
