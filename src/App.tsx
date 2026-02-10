import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Animated counter hook
function useCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!startOnView || isInView) {
      let startTime: number;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [end, duration, isInView, startOnView]);

  return { count, ref };
}

// Floating particle component
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-cyan-400/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

// Glowing orb component
function GlowOrb({ color, size, position }: { color: string; size: string; position: string }) {
  return (
    <div
      className={`absolute ${size} ${position} rounded-full blur-3xl opacity-20 pointer-events-none`}
      style={{ background: color }}
    />
  );
}

// Navigation
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 md:py-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-amber-400 flex items-center justify-center">
            <span className="font-display text-black text-lg md:text-xl font-bold">N</span>
          </div>
          <span className="font-display text-xl md:text-2xl tracking-wider text-white">NEXUS</span>
        </motion.div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Services', 'Work', 'About', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-400 hover:text-white transition-colors font-body text-sm tracking-wide"
              whileHover={{ y: -2 }}
            >
              {item}
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-body font-semibold text-sm rounded-full"
          >
            Start Project
          </motion.button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-white transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-full h-0.5 bg-white transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 bg-white transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden mt-4"
      >
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl p-6 space-y-4">
          {['Services', 'Work', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block text-gray-300 hover:text-white font-body text-lg py-2"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-body font-semibold rounded-full mt-4">
            Start Project
          </button>
        </div>
      </motion.div>
    </motion.nav>
  );
}

// Hero Section
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950 pt-20 md:pt-0">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black" />
      <GlowOrb color="#06b6d4" size="w-64 h-64 md:w-96 md:h-96" position="top-1/4 -left-32 md:-left-48" />
      <GlowOrb color="#f59e0b" size="w-48 h-48 md:w-72 md:h-72" position="bottom-1/4 -right-24 md:-right-36" />
      <Particles />

      {/* Diagonal line accent */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent transform rotate-12 origin-top-right hidden md:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-32">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 text-cyan-400 font-body text-xs md:text-sm tracking-wider mb-4 md:mb-6">
                ARTIFICIAL INTELLIGENCE AGENCY
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white leading-none tracking-tight"
            >
              WE BUILD
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400">
                THE FUTURE
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 md:mt-8 text-gray-400 font-body text-base md:text-lg lg:text-xl max-w-xl leading-relaxed"
            >
              Transforming visionary ideas into intelligent systems. We architect AI solutions
              that redefine what's possible for forward-thinking enterprises.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(6, 182, 212, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-body font-bold text-sm md:text-base rounded-full flex items-center justify-center gap-2"
              >
                Explore Our Work
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-white/20 text-white font-body font-medium text-sm md:text-base rounded-full"
              >
                Watch Showreel
              </motion.button>
            </motion.div>
          </div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Rotating rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border border-cyan-500/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-8 border border-amber-500/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-16 border border-cyan-500/30 rounded-full"
              />

              {/* Center orb */}
              <div className="absolute inset-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-amber-500/20 backdrop-blur-xl flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-amber-400"
                />
              </div>

              {/* Floating data points */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-cyan-400"
                  style={{
                    left: `${50 + 40 * Math.cos((angle * Math.PI) / 180)}%`,
                    top: `${50 + 40 * Math.sin((angle * Math.PI) / 180)}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 p-4 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          {[
            { value: 150, suffix: '+', label: 'Projects Delivered' },
            { value: 98, suffix: '%', label: 'Client Retention' },
            { value: 50, suffix: 'M+', label: 'Data Points Processed' },
            { value: 24, suffix: '/7', label: 'AI Systems Running' },
          ].map((stat, i) => {
            const counter = useCounter(stat.value);
            return (
              <div key={i} className="text-center">
                <span ref={counter.ref} className="font-display text-3xl md:text-4xl lg:text-5xl text-white">
                  {counter.count}{stat.suffix}
                </span>
                <p className="mt-1 md:mt-2 text-gray-500 font-body text-xs md:text-sm">{stat.label}</p>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 rounded-full bg-cyan-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Services Section
function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Machine Learning',
      description: 'Custom ML models trained on your data, delivering predictive insights that drive business decisions.',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'Conversational AI',
      description: 'Intelligent chatbots and voice assistants that understand context and deliver human-like interactions.',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: 'Computer Vision',
      description: 'Image recognition, object detection, and visual analysis systems for automated visual intelligence.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Predictive Analytics',
      description: 'Forecast trends, optimize operations, and anticipate market shifts with AI-powered analytics.',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section id="services" ref={ref} className="relative py-16 md:py-32 bg-gray-950 overflow-hidden">
      <GlowOrb color="#06b6d4" size="w-48 h-48 md:w-64 md:h-64" position="top-1/3 -right-24 md:-right-32" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-amber-500/30 text-amber-400 font-body text-xs md:text-sm tracking-wider mb-4 md:mb-6">
            OUR CAPABILITIES
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white">
            WHAT WE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400">
              DELIVER
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-4 md:mb-6 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="font-display text-xl md:text-2xl text-white mb-2 md:mb-3">{service.title}</h3>
              <p className="font-body text-gray-400 text-sm md:text-base leading-relaxed">{service.description}</p>

              <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Process Section
function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    { number: '01', title: 'Discovery', description: 'Deep dive into your challenges, data landscape, and business objectives.' },
    { number: '02', title: 'Architecture', description: 'Design scalable AI systems tailored to your unique requirements.' },
    { number: '03', title: 'Development', description: 'Agile build cycles with continuous testing and refinement.' },
    { number: '04', title: 'Deployment', description: 'Seamless integration with ongoing optimization and support.' },
  ];

  return (
    <section className="relative py-16 md:py-32 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] md:bg-[size:100px_100px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 text-cyan-400 font-body text-xs md:text-sm tracking-wider mb-4 md:mb-6">
            HOW WE WORK
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white">
            OUR PROCESS
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connection line - hidden on mobile */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent hidden md:block" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative text-center"
              >
                <div className="relative mx-auto w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-900 border border-cyan-500/30 flex items-center justify-center mb-4 md:mb-6">
                  <span className="font-display text-xl md:text-2xl text-cyan-400">{step.number}</span>
                  <div className="absolute inset-0 rounded-full bg-cyan-500/10 animate-pulse" />
                </div>
                <h3 className="font-display text-xl md:text-2xl text-white mb-2">{step.title}</h3>
                <p className="font-body text-gray-500 text-sm md:text-base">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" ref={ref} className="relative py-16 md:py-32 bg-gray-950 overflow-hidden">
      <GlowOrb color="#f59e0b" size="w-64 h-64 md:w-96 md:h-96" position="top-0 left-1/4" />
      <GlowOrb color="#06b6d4" size="w-48 h-48 md:w-72 md:h-72" position="bottom-0 right-1/4" />

      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-6 md:mb-8">
            READY TO
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400">
              TRANSFORM?
            </span>
          </h2>
          <p className="font-body text-gray-400 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 md:mb-12">
            Let's discuss how AI can revolutionize your business. Our team is ready to architect your next breakthrough.
          </p>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(6, 182, 212, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="px-10 md:px-12 py-4 md:py-5 bg-gradient-to-r from-cyan-500 via-cyan-400 to-amber-400 text-black font-body font-bold text-base md:text-lg rounded-full inline-flex items-center gap-3"
          >
            Start the Conversation
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-black py-8 md:py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-amber-400 flex items-center justify-center">
                <span className="font-display text-black text-lg md:text-xl font-bold">N</span>
              </div>
              <span className="font-display text-xl md:text-2xl tracking-wider text-white">NEXUS</span>
            </div>
            <p className="font-body text-gray-500 text-sm max-w-md">
              Pioneering AI solutions that transform businesses. We bridge the gap between ambitious vision and intelligent reality.
            </p>
          </div>

          <div>
            <h4 className="font-display text-white text-sm mb-4">QUICK LINKS</h4>
            <ul className="space-y-2">
              {['Services', 'Work', 'About', 'Careers'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-body text-gray-500 text-sm hover:text-cyan-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-white text-sm mb-4">CONNECT</h4>
            <ul className="space-y-2">
              {['LinkedIn', 'Twitter', 'GitHub', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-body text-gray-500 text-sm hover:text-cyan-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-gray-600 text-xs md:text-sm">
            © 2024 Nexus AI Agency. All rights reserved.
          </p>
          <p className="font-body text-gray-600/60 text-xs">
            Requested by @vladyy__01 · Built by @clonkbot
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main App
export default function App() {
  return (
    <div className="bg-gray-950 text-white min-h-screen font-body overflow-x-hidden">
      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

      <Navigation />
      <Hero />
      <Services />
      <Process />
      <CTA />
      <Footer />
    </div>
  );
}
