import { useEffect } from 'react';

interface IToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export const Toast = ({ message, type, onClose }: IToastProps) => {

  useEffect(() => {
    const timerId = setTimeout(() => onClose())

    return () => {
      clearTimeout(timerId)
    }
  }, [])
  const styles = type === 'success' ? 'bg-green-600' : 'bg-red-600'

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-md text-white max-w-md ${styles}`}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  )
}