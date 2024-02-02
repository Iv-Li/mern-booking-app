import { useRouteError } from 'react-router-dom';
import { getErrorMsg } from '@/utils/throwError.ts';
export const MyHotelErrorBoundary = () => {
  const error = useRouteError()
  const msg = getErrorMsg(error)

  return (
    <div className="flex">{ msg}</div>
  )
}