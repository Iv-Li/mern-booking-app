import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { usePagination } from '@/hooks';
import { twMerge } from 'tailwind-merge';
import { DOTS } from '@/consts';

interface IPaginationProps {
  currentPage: number
  totalPagesAmount: number
  onPageChange: (number: number) => void
  pageSize?: number
}

export const Pagination = ({ currentPage, totalPagesAmount, onPageChange, pageSize = 5 }: IPaginationProps) => {
  const paginationRange = usePagination({
    totalCount: totalPagesAmount,
    pageSize,
    currentPage,
  })
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    currentPage != totalPagesAmount && onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    currentPage !== 1 && onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="flex justify-center">
      <ul className="flex border border-slate-300">
        <li
          role="button"
          onClick={onPrevious}
          className={twMerge("px-2 py-1 bg-gray-200 flex justify-center items-center *:fill-gray-700" + ' ' +
            `${currentPage === 1 ? 'bg-gray-200 *:fill-gray-300' : ''}`)}
        >
          <FaArrowLeft />
        </li>
        {paginationRange.map((number, order) => {
          if (number === DOTS) {
            return <li className="px-2 py-1 flex justify-center items-center"
                       key={number + order}>&#8230;</li>;
          }
          return (
            <li className={`px-2 py-1 ${currentPage === number ? "bg-gray-200" : ""}`}>
              <button onClick={() => onPageChange(number)}>{number}</button>
            </li>
          )
        })}
        <li
          role="button"
          onClick={onNext}
          className={twMerge("px-2 py-1 bg-gray-200 flex justify-center items-center *:fill-gray-700" + ' ' +
            `${currentPage === lastPage ? 'bg-gray-200 *:fill-gray-300' : ''}`)}
        >
          <FaArrowRight />
        </li>
      </ul>
    </div>
  )
}