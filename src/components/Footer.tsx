import React from 'react';
import {
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  ExternalLink,
} from 'lucide-react';

interface FooterProps {
  onOpenTemplates: () => void;
  onOpenCampaigns?: () => void;
  onCreateCampaign?: () => void;
  onOpenExport?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTemplates,
  onOpenCampaigns,
  onCreateCampaign,
  onOpenExport,
}) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0A0A0A] text-white pt-16 md:pt-20 pb-8 border-t border-white/10 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 5-Column Link Grid (Direct match to reference layout) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 pb-14 text-left">
          {/* Column 1: Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-tight">Company</h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('workflow')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About us
                </button>
              </li>
              <li>
                <a
                  href="#careers"
                  onClick={(e) => {
                    e.preventDefault();
                    onCreateCampaign?.();
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Careers
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('workflow')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQs
                </button>
              </li>
              <li>
                <a
                  href="mailto:support@socialmock.ai"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Products */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-tight">Products</h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li>
                <button
                  type="button"
                  onClick={onCreateCampaign}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Campaign Studio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('platforms')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Multi-Format Engine
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTemplates}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Preset Templates
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenExport}
                  className="text-[#D4A72C] hover:text-[#E7C45A] font-semibold transition-colors cursor-pointer flex items-center gap-1 text-left"
                >
                  <span>Export Suite (Part 4)</span>
                  <span className="text-[9px] font-mono bg-[#D4A72C]/20 px-1 rounded">PRO</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-tight">Resources</h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('workflow')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Blog
                </button>
              </li>
              <li>
                <a
                  href="#newsletter"
                  onClick={(e) => {
                    e.preventDefault();
                    onCreateCampaign?.();
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Newsletter
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('product')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Media Kit
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('platforms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  White paper
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-tight">Legal</h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Security</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Terms of use</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Acceptance policy</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Cookies</span>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div className="space-y-4 col-span-2 sm:col-span-1">
            <h4 className="text-sm font-bold text-white tracking-tight">Contact</h4>
            <ul className="space-y-2.5 text-xs text-white/60 font-mono">
              <li>
                <a
                  href="mailto:support@socialmock.ai"
                  className="hover:text-[#D4A72C] transition-colors break-all"
                >
                  support@socialmock.ai
                </a>
              </li>
              <li>
                <span className="text-white/80">+1 (800) 555-SMOK</span>
              </li>
              <li>
                <span className="text-white/80">07000-SOCIALMOCK</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Full-width Thin Horizontal Divider */}
        <div className="w-full h-px bg-white/10 my-6" />

        {/* Bottom Bar: HQ Address + Copyright & Circular Social Icons */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-4 pb-12">
          {/* Left: Office / HQ Address & Copyright */}
          <div className="text-xs text-white/60 text-left space-y-1.5 font-normal">
            <p className="text-white/80">
              SocialMock HQ, 500 Howard Street, SoMa, San Francisco, CA 94105.
            </p>
            <p>© 2026 SocialMock AI. All rights reserved.</p>
          </div>

          {/* Right: Circular Social Media Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4A72C] text-white hover:text-[#0A0A0A] flex items-center justify-center transition-colors cursor-pointer border border-white/10"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4A72C] text-white hover:text-[#0A0A0A] flex items-center justify-center transition-colors cursor-pointer border border-white/10"
              aria-label="X (Twitter)"
            >
              <Twitter className="w-4 h-4" />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4A72C] text-white hover:text-[#0A0A0A] flex items-center justify-center transition-colors cursor-pointer border border-white/10"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4A72C] text-white hover:text-[#0A0A0A] flex items-center justify-center transition-colors cursor-pointer border border-white/10"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Massive Ghost Watermark Wordmark across bottom (Direct match to reference image) */}
      <div className="w-full overflow-hidden flex justify-center pointer-events-none select-none -mb-4 sm:-mb-8 md:-mb-12">
        <span className="font-black text-[13vw] sm:text-[14vw] tracking-tighter text-white/[0.04] leading-none uppercase whitespace-nowrap">
          SocialMock
        </span>
      </div>
    </footer>
  );
};
