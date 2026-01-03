// app/(main)/layout.tsx
import { Header } from '@/components/Header'; // Ajuste o import
import { ToasterProvider } from '@/components/ToasterProvider';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToasterProvider />
      <Header />
      <main>{children}</main>
    </>
  );
}
