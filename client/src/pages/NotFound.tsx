import Circle from '@/assets/images/circle.png'
import { Button } from '@/components/ui/buttons';
import { useNavigate } from 'react-router-dom';
import { ERoutes } from '@/types';
export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="flex justify-center items-center text-blue-500 px-8">
        <p className="font-bold" style={{ fontSize: "18vw"}}>
          4
        </p>
        <div className="relative w-[33.4%] min-w-[200px] aspect-square min-h-3 px-3">
          <div className="w-[52.3%] h-100vh gradient-purple absolute -z-10"/>
          <img src={Circle} alt="circle" className=""/>
        </div>
        <p className="font-bold" style={{ fontSize: "18vw" }}>
          4
        </p>
      </div>

      <p className="md:w-[80%] text-blue-500 text-xl md:text-3xl font-bold text-center mx-auto">
        Oops, It's an Error!
      </p>
      <div>
        <Button onClick={() => navigate(ERoutes.HOME)} className="ml-auto mr-0 block neomorthin">Go back</Button>
      </div>
      <p className="text-center text-slate-500 md:text-l lg:text-xl mt-2">
        The page you were searching for seems to have taken a detour into deep space. But don't worry, we're here to navigate you back.
      </p>
    </>
  )
}