import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar.jsx';
import Footer from '../../components/Footer.jsx';
// Basic components not needed for dynamic product routing
// import ProductHero from '../../components/Product/ProductHero.jsx';
// import FeaturesShowcase from '../../components/Product/FeaturesShowcase.jsx';
// import DashboardOverview from '../../components/Product/DashboardOverview.jsx';
// import ProductCTA from '../../components/Product/ProductCTA.jsx';

// Specific Product Pages
import AudibleBook from './AudibleBook';
import AthenoraLive from './AthenoraLive';
import OperonAI from './OperonAI';
import DesignovaAI from './DesignovaAI';
import CourseCreator from './CourseCreator';
import AthenaPayment from './AthenaPayment';

const Product = () => {
  const { productId } = useParams();

  // Route to specific product pages if a productId is provided
  if (productId === 'audible-book') return <AudibleBook />;
  if (productId === 'athenora-live') return <AthenoraLive />;
  if (productId === 'operon') return <OperonAI />;
  if (productId === 'designova') return <DesignovaAI />;
  if (productId === 'course-creator') return <CourseCreator />;
  if (productId === 'athena-payment') return <AthenaPayment />;

  // No default product landing page - remove it as it was non-working/filler
  return null;
};
export default Product;