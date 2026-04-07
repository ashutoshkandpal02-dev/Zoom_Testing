'use client';

import { Link, useNavigate } from 'react-router-dom';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring
} from 'framer-motion';
import { ArrowRight, Sparkles, Rocket, Globe, ShieldCheck, Zap } from 'lucide-react';

const CTA = () => {
  const navigate = useNavigate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const background = useMotionTemplate`
    radial-gradient(
      700px circle at ${smoothX}px ${smoothY}px,
      rgba(59,130,246,0.25),
      transparent 60%
    )
  `;

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const rect = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - rect.left);
    mouseY.set(clientY - rect.top);
  }

  const benefits = [
    { icon: Rocket, text: "Rapid Deployment" },
    { icon: Globe, text: "Global Scalability" },
    { icon: ShieldCheck, text: "Enterprise Security" },
    { icon: Zap, text: "AI-Native Engine" }
  ];

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.005 }}
          className="group relative bg-slate-900 rounded-[2rem] p-6 md:p-10 overflow-hidden shadow-2xl border border-white/10"
        >
          {/* spotlight glow */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition duration-500"
            style={{ background }}
          />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">

            <div className="flex-1">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                Build Your AI Platform <span className="text-blue-400 italic">Now</span>
              </h2>
              <p className="text-slate-400 text-sm md:text-base mt-2">
                Design, automate, and launch faster with our next-generation AI platform.
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-xl shadow-xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-2 overflow-hidden group/btn"
              >
                <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="tracking-tight relative z-10">Get Started Now</span>
                <ArrowRight size={20} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;