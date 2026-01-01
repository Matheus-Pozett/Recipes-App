import { FormLogin } from '@/components/FormLogin';
import clsx from 'clsx';
import Image from 'next/image';

export default function Login() {
  return (
    <div
      className={clsx('flex', 'flex-col', 'items-center', 'h-screen', 'w-full')}
    >
      <div className="h-1/2 w-full bg-purple-950 flex justify-center">
        <Image
          src={'/logoRecipesApp.svg'}
          alt="Logo Recipes App"
          width={200}
          height={160}
        />
      </div>

      <div className="flex flex-col items-center justify-center w-full h-1/2">
        <h1 className="text-purple-950 text-2xl font-medium -tracking-tighter italic mb-2">
          LOGIN
        </h1>
        <FormLogin />
      </div>
    </div>
  );
}
