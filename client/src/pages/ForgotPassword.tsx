import { Link } from 'react-router-dom';
import { ERoutes, type ForgotPasswordForm } from '@/types';
import { Button } from '@/components/ui/buttons';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '@/api';
import { useAppContext } from '@/context';

export const ForgotPassword = () => {
  const { showToast } = useAppContext()
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<ForgotPasswordForm>()

  const { mutate, isSuccess } = useMutation({
    mutationKey: ['fetchForgotPassword'],
    mutationFn: forgotPassword,
    onError: (err) => {
      showToast({ message: err.message, type: 'error'})
    }
  })

  const onSubmit = handleSubmit(data => {
    console.log({ data })
    mutate(data)
  })

  if (isSuccess) {
    return (
      <h2 className="text-3xl font-bold">Check your email for reseting link</h2>
    )
  }


  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Write your email to get reset link
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
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