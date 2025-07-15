// src/app/components/FAQSection.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'What materials are used in your products?',
    answer: 'We use only the finest materials including Italian leather, solid hardwoods, Carrara marble, and premium fabrics. Each material is carefully selected for its durability and aesthetic qualities.'
  },
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 5-7 business days within the continental US. For international orders, please allow 10-14 business days. Expedited shipping options are available at checkout.'
  },
  {
    question: 'Do you offer customization options?',
    answer: 'Yes, many of our products can be customized. You can choose from various fabrics, finishes, and configurations. Please contact our design team for more information about customization options.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for unused items in their original packaging. Custom or made-to-order items are final sale. Please contact our customer service team to initiate a return.'
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useScrollTrigger(sectionRef.current!, () => {
    if (!sectionRef.current) return;

    gsap.from(sectionRef.current, {
      duration: 1,
      opacity: 0,
      y: 50,
      ease: 'power3.out'
    });

    const validRefs = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    gsap.from(validRefs, {
      duration: 0.8,
      opacity: 0,
      y: 30,
      stagger: 0.1,
      ease: 'power3.out'
    });
  });

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-6 md:px-12"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-light mb-12 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              ref={el => (itemRefs.current[index] = el)}
              className="border-b border-gray-200 pb-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left py-4 hover:text-gray-600 transition"
              >
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <span className="text-xl">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </button>
              
              <div
                className={`transition-all duration-400 ease-in-out overflow-hidden ${
                  activeIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600 pb-4">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}