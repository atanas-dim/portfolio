'use client';
import { type FC } from 'react';

import ContactForm from '@/components/contact/Contact';
import Footer from '@/components/footer/Footer';
import Intro from '@/components/intro/Intro';
import Projects from '@/components/projects/Projects';
import Tools from '@/components/tools/Tools';

const HomePage: FC = () => {
  return (
    <>
      <main className="relative w-full overflow-x-hidden before:fixed before:-z-10 before:inset-0 before:bg-yellow-pink-gradients">
        <Intro />
        <Projects />
        <Tools />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
