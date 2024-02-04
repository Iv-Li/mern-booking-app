import { MouseEvent } from 'react';

interface IHotelFormImgProps {
  url: string
  handleDelete: ( e: MouseEvent<HTMLButtonElement>, imgUrl: string) => void
}
export const HotelFormImg = ({ url, handleDelete }: IHotelFormImgProps) => {
  return (
    <div className="relative group">
      <img src={url} className="min-h-full object-cover"/>
      <button
        onClick={(event) => handleDelete(event, url)}
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
      >
        Delete
      </button>
    </div>
  )
}