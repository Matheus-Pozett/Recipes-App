// app/(main)/layout.tsx
import { Header } from '@/components/Header'; // Ajuste o import

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
