import { ReactNode } from 'react';
import { Header, Footer } from '@/components/ui';
import { Outlet } from 'react-router-dom';
interface LayoutProps {
  children?: ReactNode
}
export const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
     <Header />
      <main className="container mx-auto">
        {children || <Outlet />}
      </main>
     <Footer />
    </div>
  )
}