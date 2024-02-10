import { Link } from 'react-router-dom';
import { ERoutes } from '@/types';
export const Footer = () => {
  return (
    <footer className="bg-blue-800 py-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          Iv.G.Holiday.com
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <Link className="cursor-pointer" to={ERoutes.PRIVACY_POLICY}>Privacy Policy</Link>
          <Link className="cursor-pointer" to={ERoutes.TERMS_OF_USE}>Terms of Service</Link>
        </span>
      </div>
    </footer>
  )
}