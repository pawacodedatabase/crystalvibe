
// import CollectionComponent from "../components/CollectionComponent";
// import DualImageComponent from "../components/dualimage";
import FeaturedBlog from "../components/Blog/featuredBlog";
import CategorySelector from "../components/categoryselector";
import OccasionEdit from "../components/occasionedit";

import FeaturedProduct from "../products/FeaturedProd";
import Carousel from "./carousel"



const Home: React.FC = () => {
  

  return (
    <>
    <Carousel/> 
     <CategorySelector/>
    <FeaturedProduct/>
    <OccasionEdit/>
    <FeaturedBlog/>
    {/* <BusinessPopup/> */}
  
  
    </>
   
  );
};

export default Home;
