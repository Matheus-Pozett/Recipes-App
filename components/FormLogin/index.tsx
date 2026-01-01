'use client';

import { formLoginType, loginFormSchema } from '@/schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
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
      className="flex flex-col gap-4 justify-center items-center"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <div>
        <input type="email" placeholder="Email" {...register('email')} />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          {...register('password')}
        />

        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <button
        disabled={!isValid || isSubmitting}
        className={`p-2 rounded text-white font-bold transition-colors ${
          !isValid || isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isSubmitting ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}
