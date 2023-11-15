import LandingNavbar from '@/components/landing/Navbar';
import LandingHero from '@/components/landing/Hero';
import LandingContent from '@/components/landing/Content';

const LandingPage = () => (
  <div className='h-full'>
    <LandingNavbar />
    <LandingHero />
    <LandingContent />
  </div>
);

export default LandingPage;
