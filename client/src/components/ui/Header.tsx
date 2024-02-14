import { Link } from 'react-router-dom';
import { ERoutes } from '@/types';
import { SignOutButton } from '@/components/ui/SignOutButton.tsx';
import { useAppContext } from '@/context';
import { twMerge } from 'tailwind-merge';
import { ThemeToggler } from '@/components/ui/ThemeToggler.tsx';

interface IHeader {
  className?: string
}


export const Header = ({ className }: IHeader) => {
  const { user: isLogged } = useAppContext()

  return (
    <header className={twMerge(`bg-blue-800 py-6 relative outline-0 ${className}`)}>
      <ThemeToggler className="absolute top-1/2 left-3 -translate-y-1/2"/>
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={ERoutes.HOME}>Iv.G.Holiday.com</Link>
        </span>
        <span className="flex space-x-2">
          { isLogged ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to={ERoutes.DONE_BOOKINGS}
              >
                Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to={ERoutes.HOST_HOTELS}
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ): (
            <Link
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
              to={ERoutes.LOGIN}
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </header>
  )
}