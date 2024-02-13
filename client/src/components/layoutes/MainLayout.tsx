import { ReactNode, useCallback, useEffect } from 'react';
import { Header, Footer } from '@/components/ui';
import { Outlet, useLocation } from 'react-router-dom';
import { SearchBar } from '@/components/ui';
import { useQuery } from '@tanstack/react-query';
import { validateToken } from '@/api';
import { useAppContext } from '@/context';
import { ERoutes } from '@/types';
interface LayoutProps {
  children?: ReactNode
}
export const MainLayout = ({ children }: LayoutProps) => {
  const { updateUser } = useAppContext()
  const location = useLocation()

  const enableValidation = useCallback((path: string) => {
    switch (path) {
      case ERoutes.LOGIN:
      case ERoutes.FORGOT_PASSWORD:
      case ERoutes.RESET_PASSWORD:
      case ERoutes.REGISTER:
      case ERoutes.TERMS_OF_USE:
        return false;
      default:
        return true
    }
  }, [])

  const { data } = useQuery({
    queryKey: ['fetchValidateToken', location],
    queryFn: validateToken,
    retry: false,
    enabled: enableValidation(location.pathname)
  })

  useEffect(() => {
    updateUser(data?.data)
  }, [data, updateUser]);

  return (
    <div className="flex flex-col min-h-screen">
     <Header />
      <div className="container mx-auto">
        <SearchBar />
      </div>
      <main className="container mx-auto flex-1 py-10">
        {children || <Outlet />}
      </main>
     <Footer />
    </div>
  )
}