import FeaturedOpportunities from "@/components/home/FeaturedOpportunities";
import FeaturedStartups from "@/components/home/FeaturedStartups";
import HeroSection from "@/components/home/HeroSection";
import StartupStatistics from "@/components/home/StartupStatistics";
import Testimonials from "@/components/home/Testimonials";
import WhyJoinStartupForge from "@/components/home/WhyJoinStartupForge";
import Footer from "@/components/shared/Footer";
import MainNavbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <HeroSection />
      <StartupStatistics />
      <FeaturedStartups />
      <FeaturedOpportunities />
      <WhyJoinStartupForge />
      <Testimonials />
    </div>
  );
}
