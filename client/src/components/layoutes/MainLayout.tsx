import { ReactNode } from 'react';
import { Header, Footer } from '@/components/ui';
import { Outlet } from 'react-router-dom';
import { SearchBar } from '@/components/ui';
interface LayoutProps {
  children?: ReactNode
}
export const MainLayout = ({ children }: LayoutProps) => {
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