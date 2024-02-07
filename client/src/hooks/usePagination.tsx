import { useMemo } from 'react';
import { DOTS } from '@/consts';

export interface IPagination {
  totalCount: number
  pageSize: number
  siblingCount?: number
  currentPage: number
  maxPaginateAmount?: number
  withDots?: boolean
}

type Dots = '...'


const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};
const usePagination = ({
  totalCount,
  siblingCount = 1,
  currentPage
}: IPagination): (Dots | number)[] => {
  const paginationRange = useMemo(() => {
    const totalPageCount = totalCount

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 1 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount - 1); // - 1 = place for DOTS

      return [...leftRange, DOTS];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 1 + 2 * siblingCount;
      const rightRange = range(
        totalPageCount - rightItemCount + 1, //  add + 1, if do not need place for DOTS
        totalPageCount
      );

      return [DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex + 1, rightSiblingIndex - 1);

      return [DOTS, ...middleRange, DOTS];
    }

    return [...range(1, totalPageCount)]
  }, [totalCount, siblingCount, currentPage]);

  return paginationRange;
};


export {
  usePagination
}