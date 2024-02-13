import { ReactNode, useEffect, useMemo } from 'react';
import { Header, Footer } from '@/components/ui';
import { Outlet, useLocation } from 'react-router-dom';
import { SearchBar } from '@/components/ui';
import { useQuery } from '@tanstack/react-query';
import { validateToken } from '@/api';
import { useAppContext } from '@/context';
import { ERoutes } from '@/types';
interface LayoutProps {
  children?: ReactNode
  isFooterHidden?: boolean
}
export const MainLayout = ({ children, isFooterHidden }: LayoutProps) => {
  const { updateUser } = useAppContext()
  const location = useLocation()

  const enableValidation = useMemo(() => {
    switch (location.pathname) {
      case ERoutes.HOME:
      case ERoutes.BOOKING:
      case ERoutes.DONE_BOOKINGS:
      case ERoutes.HOST_HOTELS:
      case ERoutes.EDIT_HOTEL:
      case ERoutes.ADD_HOTEL:
        return true;
      default:
        return false
    }
  }, [location])

  const enableSearchBar = useMemo(() => {
    switch (location.pathname) {
      case ERoutes.HOME:
      case ERoutes.SEARCH:
        return true;
      default:
        return false
    }
  }, [location])

  const { data, isLoading } = useQuery({
    queryKey: ['fetchValidateToken', location],
    queryFn: validateToken,
    retry: false,
    enabled: enableValidation
  })

  useEffect(() => {
    if (!isLoading && enableValidation) {
      updateUser(data?.data)
    }

  }, [data, isLoading, updateUser, enableValidation]);

  return (
    <div className="flex flex-col min-h-screen">
     <Header className={enableSearchBar ? "pb-14" : ""} />
      {enableSearchBar && (
        <div className="container mx-auto">
          <SearchBar/>
        </div>
      )}
      <main className="container mx-auto flex-1 py-10">
        {children || <Outlet />}
      </main>
      {isFooterHidden || <Footer/>}
    </div>
  )
}