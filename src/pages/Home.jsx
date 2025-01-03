import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import FeedBackBox from "../components/FeedBackBox";
import OurPolicy from "../components/OurPolicy";

const Home = () => {
  return (
    <div>
      {/* <Hero /> */}
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <FeedBackBox />
    </div>
  );
};

export default Home;
