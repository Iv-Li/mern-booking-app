import { PropsWithChildren } from 'react';
import { useAppContext } from '@/context';
import { Navigate } from 'react-router-dom';
import { ERoutes } from '@/types';
export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user } = useAppContext()

  if(!user) {
    return <Navigate to={ERoutes.HOME}/>
  }
  return <>{children}</>
}