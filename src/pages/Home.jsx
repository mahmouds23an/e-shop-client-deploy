import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import FeedBackBox from "../components/FeedBackBox";
import OurPolicy from "../components/OurPolicy";
import SummerCollection from "../components/SummerCollection";

const Home = () => {
  return (
    <div>
      <Hero />
      <SummerCollection />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <div className="-mb-28">
        <FeedBackBox />
      </div>
    </div>
  );
};

export default Home;
