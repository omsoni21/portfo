/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, MotionConfig } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { ExperienceEducationSection } from './components/ExperienceEducationSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import { ResumeSection } from './components/ResumeSection';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { SectionDivider } from './components/SectionDivider';
import { SkillsSection } from './components/SkillsSection';
import { WhyNativeAndroidSection } from './components/WhyNativeAndroidSection';

const SECTION_REVEAL_PROPS = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-48px' },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
};

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip bg-[#07090B] text-white">
        <ScrollProgressBar />
        <Navbar />
        <main className="pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroSection />
          </motion.div>

          <SectionDivider />
          <motion.div {...SECTION_REVEAL_PROPS}>
            <AboutSection />
          </motion.div>

          <SectionDivider />
          <motion.div {...SECTION_REVEAL_PROPS}>
            <WhyNativeAndroidSection />
          </motion.div>

          <SectionDivider />
          <motion.div {...SECTION_REVEAL_PROPS}>
            <SkillsSection />
          </motion.div>

          <SectionDivider />
          <motion.div {...SECTION_REVEAL_PROPS}>
            <ProjectsSection />
          </motion.div>

          <SectionDivider />
          <motion.div {...SECTION_REVEAL_PROPS}>
            <ExperienceEducationSection />
          </motion.div>

          <SectionDivider />
          <motion.div {...SECTION_REVEAL_PROPS}>
            <ResumeSection />
          </motion.div>

          <SectionDivider />
          <motion.div {...SECTION_REVEAL_PROPS}>
            <ContactSection />
          </motion.div>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
