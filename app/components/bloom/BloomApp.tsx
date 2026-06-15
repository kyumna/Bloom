'use client';

import { useBloomMotion } from '../../hooks/useBloomMotion';
import Background from './Background';
import Nav from './Nav';
import HeroSection from './sections/HeroSection';
import ShowcaseSection from './sections/ShowcaseSection';
import BuilderSection from './sections/BuilderSection';
import CtaSection from './sections/CtaSection';
import MotionControls from './MotionControls';

export default function BloomApp() {
  useBloomMotion();

  return (
    <>
      <Background />
      <Nav />

      <main id="top">
        <HeroSection />
        <ShowcaseSection />
        <BuilderSection />
        <CtaSection />
      </main>

      <MotionControls />
    </>
  );
}
