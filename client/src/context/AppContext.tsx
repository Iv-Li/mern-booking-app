import { type PropsWithChildren, createContext, useState, useContext } from 'react';
import { Toast } from '@/components/ui';

type ToastMessage = {
  message: string;
  type: "success" | "error";
};
interface IAppContext {
  showToast: (msg: ToastMessage) => void
}

const AppContext = createContext<IAppContext | null>(null)
const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [toastMsg, setToastMsg] = useState<ToastMessage | null>(null)

  return (
    <AppContext.Provider value={{
      showToast: (msg: ToastMessage) => setToastMsg(msg)
    }}>
      {toastMsg && (
        <Toast
          message={toastMsg.message}
          type={toastMsg.type}
          onClose={() => {
            setToastMsg(null)
          }}
        />
      )}
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  const context = useContext(AppContext)
  return context as IAppContext
}

export {
  AppContextProvider,
  // eslint-disable-next-line react-refresh/only-export-components
  useAppContext
}