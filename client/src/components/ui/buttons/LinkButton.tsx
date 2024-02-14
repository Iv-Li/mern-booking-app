import { Link, type LinkProps } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';


interface LinkButtonProps extends LinkProps {}
export const LinkButton = ({to, children, className, ...rest }: LinkButtonProps) => {
  return (
    <Link
      {...rest}
      to={to}
      className={twMerge("flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500 rounded " + className)}
    >
      {children}
    </Link>
  )
}