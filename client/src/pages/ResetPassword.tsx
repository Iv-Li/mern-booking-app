import { Link } from 'react-router-dom';
import { ERoutes, ResetPasswordForm } from '@/types';
import { Button } from '@/components/ui/buttons';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '@/api';
import { useAppContext } from '@/context';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@/hooks';

export const ResetPassword = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordForm>()
  const { showToast } = useAppContext()

  const query = useQuery()

  const { mutate, isSuccess } = useMutation({
    mutationKey: ['fetchResetPassword'],
    mutationFn: resetPassword,
    onSuccess: () => showToast({ message: `Password changed successfully`, type: 'success' }),
    onError: (err) => showToast({ message: err.message, type: 'error' })
  })

  const onSubmit = handleSubmit(data => {
    const email = query.get('email')
    const token = query.get('token')

    if(!email || !token) {
      showToast({ message:`Not valid reset link`, type: 'error' })
      return
    }


    mutate({
      email,
      token,
      password: data.password
    })
  })

  if (isSuccess) {
    return <Navigate to={ERoutes.LOGIN}/>
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <label className="text-gray-700 text-sm font-bold flex-1">
        New password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", { required: "This field is required" })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm New password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do no match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered?{" "}
          <Link className="underline" to={ERoutes.REGISTER}>
            Create an account here
          </Link>
        </span>
        <Button type="submit">Submit</Button>
      </span>
    </form>
  )
}