import { type PropsWithChildren, createContext, useState, useContext, useMemo } from 'react';
import { Toast } from '@/components/ui';
import { UserType } from 'server/shared/types';

type ToastMessage = {
  message: string;
  type: "success" | "error";
};

interface IAppContext {
  showToast: (msg: ToastMessage) => void
  user: UserType | undefined
  updateUser: (user: UserType | undefined ) => void
}

const AppContext = createContext<IAppContext | null>(null)
const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [toastMsg, setToastMsg] = useState<ToastMessage | null>(null)
  const [user, setUser] = useState<UserType | undefined>(undefined)

  const value = useMemo(() => {
    return {
      showToast: (msg: ToastMessage) => setToastMsg(msg),
      user,
      updateUser: (user: UserType | undefined) => setUser(user)
    }
  }, [setToastMsg, user, setUser])
  console.log({ user })

  return (
    <AppContext.Provider value={value || {}}>
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