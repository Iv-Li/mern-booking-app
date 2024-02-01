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
export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [toastMsg, setToastMsg] = useState<ToastMessage | null>(null)

  return (
    <AppContext.Provider value={{
      showToast: setToastMsg
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

export const useAppContext = () => {
  const context = useContext(AppContext)
  return context as IAppContext
}