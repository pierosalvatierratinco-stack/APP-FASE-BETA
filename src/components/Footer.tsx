import { Mail, MessageCircle, ArrowUp, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

interface FooterProps {
  logoImage: string;
  logoText: string;
  contactEmail: string;
  contactPhone: string;
  socialFacebook: string;
  socialInstagram: string;
  socialLinkedin: string;
  socialTwitter: string;
  socialTiktok?: string;
  isAdmin: boolean;
  onToggleAdmin: () => void;
}

export default function Footer({ 
  logoImage, 
  logoText,
  contactEmail,
  contactPhone,
  socialFacebook,
  socialInstagram,
  socialLinkedin,
  socialTwitter,
  socialTiktok = '',
  isAdmin,
  onToggleAdmin
}: FooterProps) {
  
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Extract clean number for wa.me WhatsApp direct link
  const cleanWhatsAppNumber = contactPhone.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-[#0A1B10] border-t border-[#006d37]/20 py-16 text-[#ddece2]">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 text-left">
        
        {/* Brand Left Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            {logoImage ? (
              <div className="w-9 h-9 rounded-full overflow-hidden border border-[#006d37]/30 bg-white flex items-center justify-center">
                <img 
                  src={logoImage} 
                  alt="Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center font-display font-black text-white">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-5 h-5 text-white fill-none stroke-current" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.57-.19" />
                </svg>
              </div>
            )}
            <span className="font-display font-extrabold text-lg text-accent tracking-tight uppercase">
              {logoText || 'RECICLAPP'}
            </span>
          </div>
          <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-sm">
            Más que una obligación, una necesidad.<br />
            Innovación para un futuro circular.
          </p>
        </div>

        {/* Links Middle Column */}
        <div className="md:col-span-3 space-y-3.5">
          <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#2ecc71] opacity-95">
            Enlaces
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm font-medium text-neutral-300">
            <li>
              <a href="#sobre-nosotros" className="hover:text-accent transition-colors">Privacidad</a>
            </li>
            <li>
              <a href="#como-funciona" className="hover:text-accent transition-colors">Términos</a>
            </li>
            <li>
              <a href="#beneficios" className="hover:text-accent transition-colors">Contacto</a>
            </li>
            <li>
              <span className="text-emerald-900/60 cursor-not-allowed">Prensa</span>
            </li>
          </ul>
        </div>

        {/* Contact Right Column */}
        <div className="md:col-span-4 space-y-3.5">
          <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#2ecc71] opacity-95">
            Contacto y Redes
          </h4>
          <ul className="space-y-4 text-xs sm:text-sm font-medium text-neutral-300">
            
            {contactPhone && (
              <li className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-accent shrink-0" strokeWidth={2.5} />
                <a 
                  href={`https://wa.me/${cleanWhatsAppNumber || '51999999999'}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-accent transition-colors font-sans text-xs sm:text-sm font-semibold"
                >
                  WhatsApp: {contactPhone}
                </a>
              </li>
            )}

            {socialTiktok && (
              <li className="flex items-center gap-3 pt-3 border-t border-[#006d37]/25">
                <a 
                  href={socialTiktok.startsWith('http') ? socialTiktok : `https://${socialTiktok}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent/20 hover:border-accent text-accent hover:text-white transition-all shrink-0" 
                  title="TikTok"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-3.5 h-3.5 fill-current"
                  >
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.74-.22-.23-.42-.48-.6-.75v7.37c.03 2.2-.85 4.41-2.5 5.86-1.72 1.51-4.22 2.07-6.4 1.41-2.48-.71-4.55-2.85-5.12-5.38-.72-3.12.92-6.53 3.91-7.61.94-.34 1.95-.45 2.95-.36V13.1c-1.25-.13-2.58.21-3.48 1.14-.95 1-1.12 2.65-.41 3.84.69 1.18 2.1 1.94 3.47 1.74 1.48-.22 2.63-1.57 2.64-3.07V.02h.11z"/>
                  </svg>
                </a>
                <a 
                  href={socialTiktok.startsWith('http') ? socialTiktok : `https://${socialTiktok}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-accent transition-colors font-sans text-xs sm:text-sm font-semibold"
                >
                  TikTok
                </a>
              </li>
            )}

          </ul>
        </div>

      </div>

      {/* Underline Copyright */}
      <div className="max-w-[1280px] mx-auto px-6 mt-12 pt-8 border-t border-[#006d37]/20 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-neutral-400">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <p 
            onClick={onToggleAdmin}
            className="hover:text-accent transition-colors cursor-pointer select-none"
            title="Copyright info"
          >
            © 2026 {logoText || 'RECICLAPP'}. Innovación para un futuro circular.
          </p>
        </div>
        
        <button
          onClick={handleScrollToTop}
          className="bg-[#0f2d19] border border-emerald-950/20 hover:border-accent text-accent hover:text-white p-2 rounded-full transition-all duration-300 cursor-pointer shadow-2xs"
          title="Volver Arriba"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

    </footer>
  );
}
