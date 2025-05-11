import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import PromoSection from '../components/home/PromoSection';
import BrandsBanner from '../components/home/BrandsBanner';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroBanner />
      <CategoryGrid />
      <FeaturedProducts />
      <PromoSection />
      <BrandsBanner />
    </div>
  );
};

export default HomePage;