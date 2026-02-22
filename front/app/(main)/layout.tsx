import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from '@/components/AuthProvider'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthProvider>
        <Header />
        {children}
        <Footer />
      </AuthProvider>
    </>
  );
}
