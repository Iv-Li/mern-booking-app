import { useMutation } from '@tanstack/react-query';
import { logout } from '@/api';
import { useAppContext } from '@/context';
import { Button } from '@/components/ui/buttons';

export const SignOutButton = () => {
  const { updateUser } = useAppContext()
  const { mutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: ({ data  }) =>  updateUser(data)
  })

  return (
    <Button
      variant="white"
      onClick={() => mutate()}
    >
      Sign Out
    </Button>
  )
}