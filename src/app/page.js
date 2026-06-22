import Image from "next/image";
import Banner from "../components/banner.jsx";
import FeaturedProperties from "../components/Featured.jsx";
import WhyChooseUs from "../components/why.jsx";
import FeaturedLocations from "../components/topLocations.jsx";
import MarketStats from "@/components/marketStats.jsx";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedProperties />
      <FeaturedLocations />
      <MarketStats />
      <WhyChooseUs />
    </div>
  );
}
