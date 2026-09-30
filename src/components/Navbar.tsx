import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface NavbarProps {
  onOpenTemplates: () => void;
  onOpenCampaigns?: () => void;
  onCreateCampaign?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTemplates,
  onOpenCampaigns,
  onCreateCampaign,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 24;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAFAF8]/90 backdrop-blur-md border-b border-[rgba(10,10,10,0.08)] py-3 shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Brand Identity + Navigation */}
          <div className="flex items-center gap-10">
            {/* Logo Mark: Black square S + gold AI accent */}
            <a
              href="#"
              className="flex items-center gap-2.5 group select-none cursor-pointer"
              aria-label="SocialMock AI"
            >
              <div className="w-8 h-8 rounded-lg bg-[#0A0A0A] text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-xs transition-transform duration-200 group-hover:scale-105 border border-black/10">
                S
              </div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-extrabold text-base tracking-tight text-[#0A0A0A]">
                  SocialMock
                </span>
                <span className="text-[10px] font-mono font-bold text-[#D4A72C] bg-[#0A0A0A] px-1.5 py-0.5 rounded tracking-widest uppercase">
                  AI
                </span>
              </div>
            </a>

            {/* Editorial Nav Links */}
            <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-[#6B6B67] tracking-wider uppercase">
              <button
                type="button"
                onClick={() => scrollToSection('product')}
                className="hover:text-[#0A0A0A] transition-colors py-1 cursor-pointer"
              >
                Product
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('workflow')}
                className="hover:text-[#0A0A0A] transition-colors py-1 cursor-pointer"
              >
                Workflow
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('templates')}
                className="hover:text-[#0A0A0A] transition-colors py-1 cursor-pointer"
              >
                Templates
              </button>
            </nav>
          </div>

          {/* Right Action Group */}
          <div className="hidden md:flex items-center gap-3">
            {onOpenCampaigns && (
              <button
                type="button"
                onClick={onOpenCampaigns}
                className="text-xs font-semibold text-[#111111] hover:text-[#0A0A0A] px-3.5 py-2 rounded-lg hover:bg-black/5 transition-colors cursor-pointer"
              >
                My Campaigns
              </button>
            )}

            <button
              type="button"
              onClick={onCreateCampaign}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A0A0A] hover:bg-[#D4A72C] text-white hover:text-[#0A0A0A] text-xs font-bold transition-all duration-200 shadow-sm cursor-pointer group border border-transparent hover:border-[#D4A72C]"
            >
              <span>Create Campaign</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/80 group-hover:text-[#0A0A0A] group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={onCreateCampaign}
              className="px-3 py-1.5 rounded-lg bg-[#0A0A0A] text-white text-xs font-bold cursor-pointer"
            >
              Create
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0A0A0A] hover:bg-black/5 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-[#FAFAF8] border-b border-[rgba(10,10,10,0.1)] px-4 pt-3 pb-6 shadow-lg space-y-3"
        >
          <div className="flex flex-col space-y-2 pt-2 text-sm font-semibold text-[#111111]">
            <button
              type="button"
              onClick={() => scrollToSection('product')}
              className="text-left px-3 py-2 rounded-lg hover:bg-black/5"
            >
              Product
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('workflow')}
              className="text-left px-3 py-2 rounded-lg hover:bg-black/5"
            >
              Workflow
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('templates')}
              className="text-left px-3 py-2 rounded-lg hover:bg-black/5"
            >
              Templates
            </button>
            {onOpenCampaigns && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCampaigns();
                }}
                className="text-left px-3 py-2 rounded-lg hover:bg-black/5 text-[#D4A72C]"
              >
                My Campaigns
              </button>
            )}
          </div>

          <div className="pt-3 border-t border-[rgba(10,10,10,0.08)]">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onCreateCampaign?.();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#0A0A0A] text-white text-xs font-bold"
            >
              <span>Create Campaign</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
