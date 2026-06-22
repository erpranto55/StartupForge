import Footer from "@/components/shared/Footer";
import MainNavbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MainNavbar />
      <main className="flex-1" />
      <Footer />
    </div>
  );
}
