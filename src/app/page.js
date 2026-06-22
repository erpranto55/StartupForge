import FeaturedStartups from "@/components/home/FeaturedStartups";
import HeroSection from "@/components/home/HeroSection";
import StartupStatistics from "@/components/home/StartupStatistics";
import Footer from "@/components/shared/Footer";
import MainNavbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MainNavbar />
      <HeroSection />
      <StartupStatistics />
      <FeaturedStartups />
      <Footer />
    </div>
  );
}
