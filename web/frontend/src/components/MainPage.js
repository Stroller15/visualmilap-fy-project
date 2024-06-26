import '../index.css'
import HeroSection from './HeroSection';
import AboutFeature from './AboutFeature';
import CtaPage from './CtaPage';

export default function App() {
  return (
    <main className="relative min-w-full min-h-full m-auto max-w-[351px] sm:max-w-[617px] md:max-w-[737px] lg:max-w-[992px] xl:max-w-[1520px] " style={{overflow: 'hidden'}}>
      <HeroSection />
      <AboutFeature/>
      <CtaPage/>
    </main>
  )
}