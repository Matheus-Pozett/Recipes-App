'use client';

import { formLoginType, loginFormSchema } from '@/schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<formLoginType>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
  });

  const router = useRouter();

  const handleOnSubmit = (data: formLoginType) => {
    localStorage.setItem('user', JSON.stringify({ email: data.email }));
    router.push('/meals');
  };

  return (
    <form
      className="flex flex-col gap-2 justify-center items-center w-full"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <div className="w-full text-center">
        <input
          type="email"
          placeholder="Email"
          {...register('email')}
          className={clsx(
            'border-amber-300',
            'border',
            'rounded',
            'p-3',
            'placeholder:text-purple-900',
            'font-light'
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="w-full text-center">
        <input
          type="password"
          placeholder="Password"
          {...register('password')}
          className={clsx(
            'border-amber-300',
            'border',
            'rounded',
            'p-3',
            'placeholder:text-purple-900',
            'font-light'
          )}
        />

        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <button
        disabled={!isValid}
        className={`p-2 rounded text-white font-bold transition-colors ${
          !isValid
            ? 'bg-yellow-200 cursor-not-allowed'
            : 'bg-yellow-400 hover:bg-purple-900 cursor-pointer'
        } px-28`}
      >
        Enter
      </button>
    </form>
  );
}
