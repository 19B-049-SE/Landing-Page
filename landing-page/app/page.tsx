// src/app/page.tsx
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import BestSelling from './components/BestSelling';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Header />
      
      <main>
        <HeroSection />
        <BestSelling />
        <FAQSection />
      </main>
      
      <Footer />
    </>
  );
}