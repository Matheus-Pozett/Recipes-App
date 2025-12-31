'use client';

import { formLoginType, loginFormSchema } from '@/schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export function FormLogin() {
  const form = useForm<formLoginType>({
    resolver: zodResolver(loginFormSchema),
  });

  const handleSubmit = (data: formLoginType) => {
    console.log(data);
  };

  return (
    <form
      className="flex flex-col gap-4 justify-center items-center bg-amber-200"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <div>
        <input type="email" placeholder="Email" {...form.register('email')} />
        {form.formState.errors.email && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          {...form.register('password')}
        />

        {form.formState.errors.password && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <button>Enter</button>
    </form>
  );
}
