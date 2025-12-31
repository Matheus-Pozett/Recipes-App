import z from 'zod';

export const loginFormSchema = z.object({
  email: z.email('Email inválido'),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
    .regex(/[A-Z]/, {
      message: 'A senha deve conter pelo menos uma letra maiúscula',
    })
    .regex(/[a-z]/, {
      message: 'A senha deve conter pelo menos uma letra minúscula',
    })
    .regex(/[0-9]/, { message: 'A senha deve conter pelo menos um número' })
    .regex(/[^A-Za-z0-9]/, {
      message: 'A senha deve conter pelo menos um caractere especial',
    }),
});

export type formLoginType = z.infer<typeof loginFormSchema>;
