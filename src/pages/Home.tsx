import React from 'react';
import Hero from '../components/Hero';
import ValueProp from '../components/ValueProp';
import BestSellers from '../components/BestSellers';
import MenuSection from '../components/MenuSection';
import AboutLocations from '../components/AboutLocations';
import Reviews from '../components/Reviews';
import CommunityFranchise from '../components/CommunityFranchise';
import FinalCTA from '../components/FinalCTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <ValueProp />
      <BestSellers />
      <MenuSection />
      <AboutLocations />
      <Reviews />
      <CommunityFranchise />
      <FinalCTA />
    </main>
  );
}
