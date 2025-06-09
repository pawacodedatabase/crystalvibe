import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/home';
import Header from './Pages/header';
// import Shop from './Pages/products/shop';
import Wishlist from './Pages/products/wishlist';
import Cart from './Pages/products/cartt';
import ProductDetail from './Pages/products/productDetail';
import Checkout from './Pages/products/checkout';
import OrderHistory from './Pages/products/orderhistory';
// import AboutBrand from './Pages/about';
import ContactUs from './Pages/contact';
import Footer from './Pages/footer';
import ScrollToTop from './Pages/components/scroll';
import Collections from './Pages/products/collections';
import FAQAccordion from './Pages/faq';
import WhatsAppIcon from './Pages/components/whatsapp';
import AdminPage from './Pages/Admin';
import ProductPage from './Pages/newProducts/products';
import Blog from './Pages/components/Blog/blog';
import BlogDetail from './Pages/components/Blog/blogDetails';
import LegSizeGuide from './Pages/components/guide';
import LegalTerms from './Pages/components/LegalTerm';
import PaymentPage from './Pages/products/paymentpage';


// Importing pages


const App: React.FC = () => {
  return (
    <Router>
      <div>
      
 <ScrollToTop/>
          <Header/>
          
        <Routes>
         
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ProductPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        {/* <Route path="/about" element={<AboutBrand />} /> */}
        <Route path="/cart/history" element={<OrderHistory />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/faq" element={<FAQAccordion/>} />
        <Route path="/admin" element={<AdminPage/>} />
        <Route path="/products" element={<ProductPage/>} />
        <Route path="/collection" element={<Collections/>} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/legal" element={<LegalTerms/>} />
        <Route path="/guide" element={<LegSizeGuide/>} />
        <Route path="/payment" element={<PaymentPage/>} />
        <Route path="/blog/:id" element={<BlogDetail/>} />
        <Route path="/product/:id" element={<ProductDetail />} />
         </Routes>
         <Footer/>
         <WhatsAppIcon/>
      </div>
    </Router>
  );
};

export default App;
