// src/app/components/BestSelling.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: 'Luxe Armchair',
    price: '$1,299',
    image: 'https://picsum.photos/800/800?random=1&grayscale',
    description: 'Handcrafted with premium leather and walnut wood.'
  },
  {
    id: 2,
    name: 'Marble Coffee Table',
    price: '$2,499',
    image: 'https://picsum.photos/800/800?random=2&grayscale',
    description: 'Italian Carrara marble with brass inlays.'
  },
  {
    id: 3,
    name: 'Velvet Sofa',
    price: '$3,899',
    image: 'https://picsum.photos/800/800?random=3&grayscale',
    description: 'Deep seating with premium velvet upholstery.'
  },
];

export default function BestSelling() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        duration: 1,
        opacity: 0,
        y: 50,
        ease: 'power3.out'
      });

      const validRefs = productRefs.current.filter(ref => ref !== null) as HTMLDivElement[];
      gsap.from(validRefs, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        duration: 1,
        opacity: 0,
        y: 50,
        stagger: 0.2,
        ease: 'power3.out'
      });
    });

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === products.length - 1 ? 0 : prev + 1));
    animateButton('right');
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? products.length - 1 : prev - 1));
    animateButton('left');
  };

  const animateButton = (direction: 'left' | 'right') => {
    const buttonId = direction === 'left' ? 'prevButton' : 'nextButton';
    const button = document.getElementById(buttonId);
    
    if (button) {
      gsap.to(button, {
        scale: 0.9,
        duration: 0.1,
        onComplete: () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.1
          });
        }
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-6 md:px-12 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-light mb-12 text-center">
          Best Selling Products
        </h2>
        
        <div className="relative">
          <div className="md:hidden relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {products.map((product, index) => (
                <div 
                  key={product.id}
                  ref={el => productRefs.current[index] = el}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="aspect-square bg-gray-200 mb-6 rounded-lg overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <p className="text-lg font-medium mb-4">{product.price}</p>
                    <button className="w-full py-3 bg-black text-white hover:bg-gray-800 transition duration-300 rounded">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              id="prevButton"
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
              aria-label="Previous product"
            >
              <FiChevronLeft size={24} />
            </button>
            
            <button
              id="nextButton"
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
              aria-label="Next product"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
          
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div 
                key={product.id}
                ref={el => productRefs.current[index] = el}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition duration-300"
              >
                <div className="aspect-square bg-gray-200 mb-6 rounded-lg overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-lg font-medium mb-4">{product.price}</p>
                <button className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition duration-300 rounded">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}