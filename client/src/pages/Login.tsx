import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoginFormData } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useAppContext } from '@/context/AppContext.tsx';
import { ERoutes } from '@/types';
import { login } from '@/api';
import { Button } from '@/components/ui/buttons';

export const Login = () => {
  const { updateUser } = useAppContext()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>()

  const { showToast } = useAppContext()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: ({ data }) => {
      updateUser(data)
      showToast({ message: 'Login success', type: 'success' })
      navigate(ERoutes.HOME)
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'error' })
    }
  })

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data)
  })

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          autoComplete="new-password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered?{" "}
          <Link className="underline" to={ERoutes.REGISTER}>
            Create an account here
          </Link>
        </span>
        <Button type="submit">Login</Button>
      </span>
    </form>
  )
}