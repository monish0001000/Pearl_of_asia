import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Heart, Leaf, Globe, MapPin, 
  ShoppingBag, Star, MessageCircle, ChevronRight, ChevronLeft,
  ArrowRight, ShieldCheck, Truck, RotateCcw,
  Zap, Compass, Mail, Phone, Send, User
} from 'lucide-react';

// --- Types & Constants ---

interface Product {
  name: string;
  img: string;
  type: string;
  desc?: string;
  category?: string;
  subCategory?: string;
}

interface ItemData {
  title: string;
  desc: string;
  image: string;
  type?: string;
}

const ASSETS = {
  hero: {
    pc: '/src/pc_herosection.webp',
    mob: '/src/mob_herosection.webp'
  },
  chakraCenter: '/src/7chakra.webp',
  sanctuary: [
    { title: "Meditation", desc: "Scientific stillness for the modern mind. Transcending the chatter of daily existence through ancient focus techniques.", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80", type: "Spirituality" },
    { title: "Yoga", desc: "Geometry of the soul. Aligning physical form with cosmic frequencies through sacred posture and breath.", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80", type: "Form" },
    { title: "Astrology", desc: "The cosmic clock. Understanding your path through the lens of celestial alignments and ancient astronomy.", image: "https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?auto=format&fit=crop&w=800&q=80", type: "Wisdom" },
    { title: "Naturopathy", desc: "Healing by nature. Returning to primal elements to restore biological and energetic equilibrium.", image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?auto=format&fit=crop&w=800&q=80", type: "Healing" },
    { title: "Natural Farming", desc: "Conversing with the earth. Rhythms of growth that honor the soil and the soul.", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80", type: "Earth" },
    { title: "Psychotherapy", desc: "Harmonizing the psyche. Music, spiritual, and behavioral therapy for cognitive and emotional clarity.", image: "https://images.unsplash.com/photo-1527133649553-61138f3816ae?auto=format&fit=crop&w=800&q=80", type: "Mind" },
    { title: "Counseling", desc: "Strategic guidance for children, adults, and careers. Navigating life's transitions with high-frequency intent.", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80", type: "Path" },
  ],
  products: [
    { name: "Ulunthangkanji Mix", img: "/src/image (1).webp", type: "Essential Ritual", desc: "Ancient high-protein blend for sustained energy.", category: "Nourishment" },
    { name: "Karuppu Kavuni Rice Mix", img: "/src/image (2).webp", type: "Legacy Grain", desc: "The forbidden rice of kings, rich in antioxidants.", category: "Nourishment" },
    { name: "Fenugreek Kali Mix", img: "/src/image (3).webp", type: "Earthy Healing", desc: "Cooling and restorative blend for internal balance.", category: "Nourishment" },
    { name: "Sprouted Moon Cake", img: "/src/image (4).webp", type: "Sprouted Energy", desc: "Nutrient-dense vitality bites for the modern seeker.", category: "Nourishment" },
    { name: "Millets Health Mix", img: "/src/image (16).webp", type: "Ancient Grains", desc: "A symphony of 18 grains for total high-frequency nutrition.", category: "Nourishment" },
    { name: "Pure Organic Honey", img: "/src/image (11).webp", type: "Wild Nectar", desc: "Harvested from deep Himalayan forests.", category: "Nourishment" },
    { name: "Traditional Ghee", img: "/src/image (15).webp", type: "Liquid Gold", desc: "Clarified butter made with ancient vedic churning.", category: "Nourishment" },
    
    { name: "7 Face Rudraksha", img: "https://images.unsplash.com/photo-1626885930974-4b69aa21bbf9?auto=format&fit=crop&w=800&q=80", type: "Mala", desc: "Extreme clarity and removal of obstacles.", category: "Malas", subCategory: "Hinduism" },
    { name: "Crystal Spathik", img: "https://images.unsplash.com/photo-1515562141541-454508ec3b7b?auto=format&fit=crop&w=800&q=80", type: "Mala", desc: "Cooling energy for mental peace.", category: "Malas", subCategory: "Hinduism" },
    { name: "Bodhi Seed Mala", img: "https://images.unsplash.com/photo-1596435914001-381c00bb9830?auto=format&fit=crop&w=800&q=80", type: "Mala", desc: "The traditional bead of enlightenment.", category: "Malas", subCategory: "Buddhism" },
    { name: "Lotus Seed Mala", img: "https://images.unsplash.com/photo-1621245086578-f6dfce801115?auto=format&fit=crop&w=800&q=80", type: "Mala", desc: "Rising above the mud of material existence.", category: "Malas", subCategory: "Buddhism" },
    
    { name: "Dharma Robe", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80", type: "Attire", desc: "High-quality linen for maximum breathability during rituals.", category: "Attire" },
    { name: "Meditation Shawl", img: "https://images.unsplash.com/photo-1616421275384-a4871cf679d2?auto=format&fit=crop&w=800&q=80", type: "Attire", desc: "Shielding the aura during deep practice.", category: "Attire" },
  ],
  statues: [
    "https://images.unsplash.com/photo-1558236714-d1ae523ca9e2?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1609132718484-cc90df3417f8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1625473449339-444749f7b326?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1590732823181-f5de9140431b?auto=format&fit=crop&w=800&q=80"
  ],
  expeditions: [
    { title: "Mt. Kailash", desc: "The ultimate spiritual peak and axis mundi of the world. A pilgrimage to the home of Lord Shiva.", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80" },
    { title: "Kedarnath", desc: "High-altitude shrine where the spirit meets the snow. A journey of purification and surrender.", image: "https://images.unsplash.com/photo-1625473449339-444749f7b326?auto=format&fit=crop&w=800&q=80" },
    { title: "Kashi Vishwanath", desc: "The city of light. Navigating the oldest living city to touch the source of cosmic wisdom.", image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=800&q=80" },
    { title: "Arunachala", desc: "The hill of fire. A silent circumambulation at the feet of the ultimate non-dual teacher.", image: "https://images.unsplash.com/photo-1596435914001-381c00bb9830?auto=format&fit=crop&w=800&q=80" },
    { title: "Meenakshi Amman", desc: "A geometry of divine proportions. Exploring the architectural frequency of the south.", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80" },
    { title: "Rameswaram", desc: "Dissolving karma in the 22 holy wells of the island sanctuary.", image: "https://images.unsplash.com/photo-1615485500704-8e990fdd9044?auto=format&fit=crop&w=800&q=80" },
    { title: "Chidambaram", desc: "The space of consciousness. Where the dance of the atoms is witnessed in silence.", image: "https://images.unsplash.com/photo-1621245086578-f6dfce801115?auto=format&fit=crop&w=800&q=80" },
    { title: "Muktinath", desc: "The valley of liberation. Where the five elements dance together in holy unison.", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80" },
  ],
  videos: [
    { title: "Buddhist Mindfulness", url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80", type: "Technique" },
    { title: "Vedic Chanting", url: "https://images.unsplash.com/photo-1596435914001-381c00bb9830?auto=format&fit=crop&w=600&q=80", type: "Sound" },
    { title: "Thai-Chi Flow", url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80", type: "Movement" },
    { title: "Singing Bowl Ritual", url: "https://images.unsplash.com/photo-1515562141541-454508ec3b7b?auto=format&fit=crop&w=600&q=80", type: "Healing" },
    { title: "Yogic Weight Loss", url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80", type: "Biology" },
  ],
  journey: [
    { name: "Gayatri Mantra Pendant", img: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=600&q=80" },
    { name: "Zoom Aksh Carnelian Bracelet", img: "https://images.unsplash.com/photo-1573408302185-1d441113280c?auto=format&fit=crop&w=600&q=80" },
    { name: "Anahata Chakra", img: "https://images.unsplash.com/photo-1459231978203-b7d094b9aee4?auto=format&fit=crop&w=600&q=80" },
    { name: "September (Kyanite)", img: "https://images.unsplash.com/photo-1596435914001-381c00bb9830?auto=format&fit=crop&w=600&q=80" },
    { name: "Vishuddha Chakra Bracelet", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80" },
  ],
  testimonials: [
    { name: "Aditi S.", role: "Yoga Practitioner", text: "The energy of the Rudraksha from Pearls of Asia is palpable. It truly feels like a bridge to the Himalayas." },
    { name: "Thomas L.", role: "Meditation Coach", text: "Purity at its peak. The Shilajit has transformed my vitality and mental clarity in ways I didn't expect." },
    { name: "Meera K.", role: "Traditionalist", text: "Vanakkam! I've finally found a source that respects our heritage with such elegance and authenticity." }
  ]
};


// --- Components ---

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  const handleSend = () => {
    if (!message.trim()) return;
    const url = `https://wa.me/917388372388?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="w-full max-w-[90vw] sm:w-80 bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#075E54] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 p-0.5 border border-white/30 overflow-hidden text-white flex items-center justify-center">
                  <User size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-sans flex items-center gap-1.5">
                    Pearls of Asia
                    <div className="w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center">
                      <ShieldCheck size={10} className="text-white" />
                    </div>
                  </h4>
                  <p className="text-[10px] opacity-90 flex items-center gap-1 font-medium">
                    online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="h-96 bg-[#efe7dd] p-4 overflow-y-auto space-y-3 relative scrollbar-hide">
              <div className="absolute inset-0 opacity-[0.08] pointer-events-none grayscale" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: '400px' }} />
              
              <div className="flex flex-col gap-1 max-w-[85%] animate-in fade-in slide-in-from-bottom-2 relative z-10">
                <div className="bg-white p-3 rounded-r-xl rounded-bl-xl shadow-sm relative before:content-[''] before:absolute before:-left-2 before:top-0 before:w-3 before:h-3 before:bg-white before:[clip-path:polygon(100%_0,0_0,100%_100%)]">
                  <p className="text-[13px] text-gray-800 leading-snug">
                    Vanakkam! 🙏<br/>
                    How can we assist your sacred journey to the Himalayas today?
                  </p>
                  <span className="text-[9px] text-gray-400 mt-1 block text-right">09:41 AM</span>
                </div>
              </div>
            </div>

            {/* Footer Input */}
            <div className="bg-[#f0f2f5] p-3 flex items-center gap-2 border-t border-stone-200">
               <div className="bg-white rounded-full flex-grow px-4 py-2.5 flex items-center gap-2 shadow-sm">
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..." 
                    className="bg-transparent border-none w-full text-sm focus:outline-none text-black"
                  />
               </div>
               <button 
                 onClick={handleSend}
                 disabled={!message.trim()}
                 className={`w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-all ${message.trim() ? 'bg-[#075E54] text-white scale-110' : 'bg-gray-300 text-gray-500'}`}
               >
                 <Send size={18} />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover="hover"
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-4 group"
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 10 }}
               className="bg-white px-4 py-2 rounded-full shadow-xl border border-stone-100 hidden md:flex items-center gap-2"
            >
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Connect with us</span>
                <span className="text-[9px] font-black text-black uppercase tracking-tight leading-none">Talk to an Expert</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#128C7E] transition-colors relative">
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {!isOpen && (
             <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-bounce">1</span>
          )}
        </div>
      </motion.button>
    </div>
  );
};

const UniversalModal = ({ activeItem, onClose }: { activeItem: ItemData | null, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {activeItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            className="relative bg-white w-full max-w-5xl lg:h-auto max-h-[90vh] rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/20"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-xl text-white"
            >
              <X size={24} />
            </button>

            {/* Left: Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
              <img 
                src={activeItem.image} 
                alt={activeItem.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
              <div className="absolute bottom-6 left-6 md:hidden">
                 <span className="text-brand-gold font-bold tracking-widest text-[10px] uppercase">{activeItem.type || 'Sanctuary'}</span>
                 <h2 className="text-3xl text-white font-serif">{activeItem.title}</h2>
              </div>
            </div>

            {/* Right: Content */}
            <div className="w-full md:w-1/2 p-8 md:p-14 lg:p-16 flex flex-col justify-center bg-white text-black">
              <div className="hidden md:block mb-8">
                <span className="text-brand-gold font-bold tracking-[0.4em] text-[11px] uppercase mb-4 block">{activeItem.type || 'Sacred Offering'}</span>
                <h2 className="text-4xl lg:text-5xl font-serif tracking-tighter leading-none mb-6">{activeItem.title}</h2>
              </div>
              
              <div className="space-y-6 md:space-y-8">
                <p className="text-lg md:text-xl font-light leading-relaxed text-gray-700 italic">
                  "{activeItem.desc}"
                </p>
                
                <div className="flex flex-col gap-6 pt-6">
                  <div className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-gray-400">
                    <ShieldCheck className="text-brand-gold" size={20} />
                    <span>Traditional Verification Ensured</span>
                  </div>
                  
                  <button 
                    onClick={() => window.open(`https://wa.me/917388372388?text=Vanakkam! I want to book: ${activeItem.title}`, '_blank')}
                    className="group bg-black text-white px-8 py-5 rounded-full font-bold hover:bg-brand-gold transition-all shadow-2xl flex items-center justify-center gap-4 active:scale-95 text-xs tracking-widest uppercase"
                  >
                    GET THIS <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Sections ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white/90 backdrop-blur-md shadow-sm h-16 md:h-20 flex items-center`}>
      <div className="max-w-screen-2xl mx-auto px-4 md:px-12 2xl:px-20 flex items-center justify-between w-full">
        <div className="flex items-center gap-3 md:gap-4 group cursor-pointer">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black flex items-center justify-center text-brand-gold group-hover:rotate-12 transition-transform shadow-xl">
             <Heart size={18} className="md:size-[22px]" fill="currentColor" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-2xl font-serif font-black tracking-tighter text-black uppercase leading-none">Pearls of Asia</span>
            <span className="text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.6em] font-bold text-brand-gold-dark uppercase whitespace-nowrap">Sacred Wisdom</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 xl:gap-10">
          {['Philosophy', 'Chakras', 'Rituals', 'Expeditions'].map(item => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-[10px] xl:text-[11px] font-bold tracking-widest uppercase text-gray-800 hover:text-brand-gold transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          
          <div className="flex items-center gap-6 xl:gap-8 border-l border-stone-200 pl-10">
            <button className="text-black hover:text-brand-gold transition-colors">
              <ShoppingBag size={20} />
            </button>
            <button className="bg-black text-white px-6 xl:px-8 py-2.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-brand-gold transition-all active:scale-95 shadow-xl">
              The Seeker Area
            </button>
          </div>
        </div>

        <button className="lg:hidden p-2 text-black hover:bg-stone-100 rounded-full transition-colors">
          <Menu size={28} className="md:size-[32px]" />
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden bg-white">
      <picture className="absolute inset-0 z-0">
        <source media="(min-width: 768px)" srcSet={ASSETS.hero.pc} />
        <img 
          src={ASSETS.hero.mob} 
          alt="Himalayan Zen" 
          className="w-full h-full object-cover object-top" 
        />
      </picture>
      
      {/* Left side white vignette for better text clarity */}
      <div className="absolute inset-y-0 left-0 w-full md:w-[70%] lg:w-[60%] bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />

      <div className="relative z-20 max-w-screen-2xl mx-auto px-6 md:px-12 2xl:px-20 w-full pt-20 md:pt-0">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="max-w-3xl 2xl:max-w-5xl text-left"
        >
          <span className="text-brand-gold-dark font-black tracking-[0.6em] md:tracking-[0.8em] text-[10px] md:text-sm uppercase mb-4 md:mb-6 block drop-shadow-sm">Ancient Wisdom • Modern Life</span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-black font-serif leading-[0.95] mb-6 md:mb-8 tracking-tighter">
            Path of peace & <br />
            <span className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl italic font-light text-brand-gold-dark/90 underline decoration-brand-gold-dark/20 uppercase">self-reliance</span>
          </h1>
          <p className="text-black text-base md:text-xl font-medium mb-8 md:mb-12 max-w-2xl leading-relaxed italic pr-4 md:pr-0">
            "Harmonizing the pure high-altitude essence of the Himalayas with your intentional modern path."
          </p>
          <div className="flex flex-col sm:flex-row items-start justify-start gap-6 md:gap-8">
            <a 
              href="#sacred-offerings" 
              className="w-auto bg-black text-white font-extrabold px-10 md:px-12 py-4 md:py-5 rounded-full shadow-2xl hover:bg-brand-gold transition-all transform hover:-translate-y-1 text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.3em] uppercase active:scale-95"
            >
              Explore The Sanctuary
            </a>
            <a href="#philosophy" className="flex items-center gap-4 text-black group py-2">
               <span className="font-bold tracking-widest text-[10px] md:text-xs border-b border-black/20 group-hover:border-black transition-all py-1 uppercase">Our Philosophy</span>
               <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-brand-gold group-hover:border-transparent group-hover:text-white transition-all">
                  <ArrowRight size={18} className="md:size-[20px] group-hover:translate-x-1 transition-transform" />
               </div>
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
         <motion.div 
           animate={{ y: [0, 15, 0] }}
           transition={{ repeat: Infinity, duration: 2.5 }}
           className="w-px h-24 bg-gradient-to-b from-brand-gold to-transparent" 
         />
      </div>
    </section>
  );
};

const Philosophy = () => {
  return (
    <section id="philosophy" className="py-24 md:py-32 lg:py-40 bg-pearl relative">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 2xl:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="space-y-12"
        >
          <div className="flex items-center gap-4">
             <Leaf className="text-brand-gold" size={32} />
             <span className="text-brand-gold font-bold tracking-[0.5em] text-xs uppercase underline underline-offset-8">Divine Heritage</span>
          </div>
          <h2 className="text-4xl md:text-7xl lg:text-8xl text-black leading-tight tracking-tighter">
            Authenticity. Purity. <br />
            <span className="text-brand-gold italic font-light">Spiritual Resonance.</span>
          </h2>
          <p className="text-xl text-gray-900 font-light leading-relaxed max-w-xl italic">
            Pearls of Asia is not a brand—it is a sacred embassy. We deliver the high-frequency vibrations of nature, harvested at peaks where the air is thin but the spirit is thick.
          </p>
          <div className="flex gap-12 pt-8">
            <div className="p-8 bg-white rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-xl transition-all">
              <p className="text-4xl text-black font-serif font-black mb-2">100%</p>
              <p className="text-[10px] font-bold text-brand-gold-dark tracking-widest uppercase">Ethical Origins</p>
            </div>
            <div className="p-8 bg-black text-white rounded-[2rem] shadow-xl">
              <p className="text-4xl font-serif font-black mb-2">Ancestral</p>
              <p className="text-[10px] font-bold text-brand-gold tracking-widest uppercase">Wisdom Tech</p>
            </div>
          </div>
        </motion.div>

        <div className="relative">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="aspect-square bg-stone-100 rounded-[4rem] overflow-hidden shadow-2xl relative z-10"
          >
            <img 
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80" 
              className="w-full h-full object-cover grayscale-0 hover:scale-110 transition-transform duration-[3s]" 
              alt="Himalayas" 
            />
          </motion.div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-gold rounded-[3rem] -z-0 opacity-20 blur-3xl animate-pulse" />
        </div>
      </div>
    </section>
  );
};

const ChakraSection = () => {
  const chakras = [
    { name: "Crown", icon: "Sahasrara", desc: "Divine alignment", color: "#9B59B6" },
    { name: "Third Eye", icon: "Ajna", desc: "Intuition & clarity", color: "#3498DB" },
    { name: "Throat", icon: "Vishuddha", desc: "Authentic expression", color: "#34E7E4" },
    { name: "Heart", icon: "Anahata", desc: "Compassion & healing", color: "#2ECC71" },
    { name: "Solar Plexus", icon: "Manipura", desc: "Personal power", color: "#F1C40F" },
    { name: "Sacral", icon: "Svadhisthana", desc: "Creativity & flow", color: "#E67E22" },
    { name: "Root", icon: "Muladhara", desc: "Grounding & stability", color: "#E74C3C" },
  ];

  return (
    <section id="chakras" className="py-12 md:py-16 lg:py-24 2xl:py-32 bg-white relative overflow-hidden flex flex-col justify-center min-h-[85vh]">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 2xl:px-20 w-full">
        <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
          <span className="text-brand-gold-dark font-bold tracking-[0.6em] text-[10px] md:text-xs uppercase mb-4 block">Bio-Energetic Alignment</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-black tracking-tighter mb-4 font-serif">The Seven Energy Portals</h2>
          <p className="text-gray-600 text-sm md:text-base font-light italic px-4">"When the spine is aligned with the mountains, the soul resonates with the stars."</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 xl:gap-16">
          {/* Left Side (First 3) */}
          <div className="hidden lg:flex flex-col w-full lg:w-1/4 space-y-10 text-right">
            {chakras.slice(0, 3).map((c, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-row-reverse items-start gap-6 group"
              >
                <div className="relative pt-1.5 flex flex-col items-center">
                  <div 
                    style={{ backgroundColor: c.color, boxShadow: `0 0 15px ${c.color}44` }}
                    className="w-4 h-4 rounded-full"
                  />
                  <div className="w-px bg-stone-100 flex-grow mt-2 group-last:hidden" />
                </div>
                <div className="pb-4">
                  <h4 className="text-lg font-serif text-black mb-1">{c.name}</h4>
                  <p className="text-[11px] text-gray-500 font-light italic leading-snug">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center Image */}
          <div className="w-full lg:w-2/4 flex justify-center scale-90 md:scale-100">
            <motion.img 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              src={ASSETS.chakraCenter} 
              alt="7 Chakra Alignment" 
              className="w-full max-w-[280px] sm:max-w-md md:max-w-lg xl:max-w-xl h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
            />
          </div>

          {/* Right Side (Last 4) */}
          <div className="hidden lg:flex flex-col w-full lg:w-1/4 space-y-10">
            {chakras.slice(3).map((c, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-6 group"
              >
                <div className="relative pt-1.5 flex flex-col items-center">
                  <div 
                    style={{ backgroundColor: c.color, boxShadow: `0 0 15px ${c.color}44` }}
                    className="w-4 h-4 rounded-full"
                  />
                  <div className="w-px bg-stone-100 flex-grow mt-2 group-last:hidden" />
                </div>
                <div className="pb-4">
                  <h4 className="text-lg font-serif text-black mb-1">{c.name}</h4>
                  <p className="text-[11px] text-gray-500 font-light italic leading-snug">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Display */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 w-full mt-12">
            {chakras.map((c, i) => (
              <motion.div key={i} className="flex items-start gap-5">
                <div style={{ backgroundColor: c.color }} className="w-3 h-3 rounded-full mt-1.5 shrink-0" />
                <div>
                  <h4 className="text-base font-serif text-black leading-none mb-1">{c.name}</h4>
                  <p className="text-[11px] text-gray-500 italic">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const GlobalSanctuary = ({ onOpenItem }: { onOpenItem: (item: ItemData) => void }) => {
  return (
    <section className="py-24 md:py-40 bg-white overflow-hidden relative min-h-screen flex items-center">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 2xl:px-20 relative z-10 w-full">
        <div className="mb-20 text-center lg:text-left">
          <span className="text-brand-gold font-bold tracking-[0.8em] text-xs uppercase mb-6 block">Universal Connection</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-black leading-none tracking-tighter font-serif">The Global <br /> Sanctuary</h2>
        </div>
        <div className="relative h-[1100px] sm:h-[1300px] md:h-[800px] lg:h-[900px] w-full">
          {ASSETS.sanctuary.map((item, i) => {
            // Scattered positions - vertically stacked for mobile, scattered for desktop
            const positions = [
              { top: '0%', left: '5%', mdTop: '5%', mdLeft: '5%', delay: 0 },
              { top: '14%', left: '40%', mdTop: '15%', mdLeft: '32%', delay: 1 },
              { top: '28%', left: '5%', mdTop: '5%', mdLeft: '58%', delay: 2 },
              { top: '42%', left: '40%', mdTop: '35%', mdLeft: '5%', delay: 1.5 },
              { top: '56%', left: '5%', mdTop: '42%', mdLeft: '52%', delay: 0.5 },
              { top: '70%', left: '40%', mdTop: '65%', mdLeft: '8%', delay: 2.5 },
              { top: '84%', left: '5%', mdTop: '68%', mdLeft: '58%', delay: 3 },
            ];
            const pos = positions[i % positions.length];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                animate={{ 
                  y: [0, -20, 0],
                  rotate: i % 2 === 0 ? [0, 2, 0] : [0, -2, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 6 + i, 
                  ease: "easeInOut",
                  delay: pos.delay
                }}
                onClick={() => onOpenItem({ title: item.title, desc: item.desc, image: item.image, type: item.type })}
                className="absolute w-40 sm:w-64 md:w-72 lg:w-80 p-3 sm:p-4 rounded-3xl bg-white/40 backdrop-blur-md border border-white/50 shadow-2xl cursor-pointer group hover:bg-white/80 transition-all z-20"
                style={{ 
                  top: `calc(${window.innerWidth < 768 ? pos.top : (pos.mdTop || pos.top)})`,
                  left: window.innerWidth < 768 ? pos.left : (pos.mdLeft || pos.left)
                }}
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-inner">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                </div>
                <div className="px-2">
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">{item.type}</span>
                  <h3 className="text-xl md:text-2xl text-black font-serif mt-1">{item.title}</h3>
                  <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-black/40 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore Depth <ArrowRight size={12} />
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Background decorative elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[120px] -z-10" />
        </div>
      </div>
    </section>
  );
};

const PathOfPractice = () => {
  return (
    <section className="py-24 md:py-40 bg-pearl overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 2xl:px-20 mb-20">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-brand-gold font-bold tracking-[0.6em] text-xs uppercase mb-6 block">Transmission Library</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-black leading-none tracking-tighter font-serif">Path of Practice</h2>
          </div>
          <p className="text-gray-900 font-light italic text-xl border-l-4 border-brand-gold pl-8 max-w-sm">
            "The body is an instrument. These are the frequencies it must learn to play."
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ width: "fit-content" }}
          className="flex gap-8 px-4 md:px-6 pb-10"
        >
          {[...ASSETS.videos, ...ASSETS.videos].map((v, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="flex-shrink-0 w-[300px] md:w-[450px] group cursor-pointer"
            >
              <div className="aspect-[16/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden relative shadow-2xl mb-6">
                <img src={v.url} alt={v.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-t-[8px] md:border-t-[12px] border-t-transparent border-l-[14px] md:border-l-[20px] border-l-white border-b-[8px] md:border-b-[12px] border-b-transparent ml-2" />
                  </div>
                </div>
                <div className="absolute top-6 left-6">
                   <span className="bg-white/90 backdrop-blur-md text-black px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">{v.type}</span>
                </div>
              </div>
              <h4 className="text-2xl text-black font-serif px-2">{v.title}</h4>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const SacredStore = ({ onOpenItem }: { onOpenItem: (item: ItemData) => void }) => {
  const [activeTab, setActiveTab] = useState('Nourishment');
  const [malaFilter, setMalaFilter] = useState('All');
  const [statueIndex, setStatueIndex] = useState(0);

  useEffect(() => {
    if (activeTab === 'Statues') {
      const interval = setInterval(() => {
        setStatueIndex(prev => (prev + 1) % ASSETS.statues.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const filteredProducts = ASSETS.products.filter(p => {
    if (p.category !== activeTab) return false;
    if (activeTab === 'Malas' && malaFilter !== 'All') {
      return p.subCategory === malaFilter;
    }
    return true;
  });

  return (
    <section id="sacred-offerings" className="py-24 md:py-40 bg-white">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 2xl:px-20">
        <div className="text-center mb-20">
           <span className="text-brand-gold font-bold tracking-[1em] text-[10px] md:text-xs uppercase mb-6 block">The Sacred Store</span>
           <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-black leading-none tracking-tighter font-serif mb-12">Sacred Offerings</h2>
           
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 border-b border-stone-200/50 pb-8">
              {['Nourishment', 'Malas', 'Statues', 'Attire'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm md:text-lg font-black tracking-[0.2em] uppercase transition-all relative py-4 ${activeTab === tab ? 'text-brand-gold scale-110' : 'text-stone-400 hover:text-stone-900'}`}
                >
                  [ {tab} ]
                  {activeTab === tab && (
                    <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-gold rounded-full" />
                  )}
                </button>
              ))}
            </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'Statues' ? (
            <motion.div
              key="statues-slideshow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative h-[600px] md:h-[800px] rounded-[3rem] overflow-hidden group shadow-2xl"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={statueIndex}
                  initial={{ opacity: 0, scale: 1.1, rotateY: 45 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateY: -45 }}
                  transition={{ duration: 1.5, ease: "anticipate" }}
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => onOpenItem({ title: "Divine Statue", desc: "A museum-quality representation of divinity, hand-crafted by master artisans using ancient lost-wax techniques.", image: ASSETS.statues[statueIndex], type: "Iconography" })}
                >
                  <img 
                    src={ASSETS.statues[statueIndex]} 
                    alt="Divine Statue" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-12 md:p-20">
                     <div className="max-w-2xl">
                        <span className="text-brand-gold font-bold tracking-[0.6em] text-xs uppercase mb-4 block">Hand-Crafted Mastery</span>
                        <h3 className="text-4xl md:text-6xl text-white font-serif tracking-tighter leading-none mb-6">Divine Iconography</h3>
                        <p className="text-white/60 text-lg font-light italic leading-relaxed">
                          Synchronizing with the archetypal frequencies of the cosmos through physical form.
                        </p>
                     </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute bottom-10 right-10 flex gap-4 z-30">
                {ASSETS.statues.map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-3 h-3 rounded-full border border-white/50 transition-all ${statueIndex === i ? 'bg-brand-gold scale-150' : 'bg-transparent'}`} 
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {activeTab === 'Malas' && (
                <div className="flex justify-center gap-4">
                  {['All', 'Hinduism', 'Buddhism'].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setMalaFilter(filter)}
                      className={`px-8 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all shadow-sm ${malaFilter === filter ? 'bg-brand-gold text-white rotate-2' : 'bg-stone-50 text-gray-400 hover:bg-stone-100 hover:rotate-2'}`}
                    >
                      {filter} Malas
                    </button>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((p, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -15 }}
                    onClick={() => onOpenItem({ title: p.name, desc: p.desc || '', image: p.img, type: p.type })}
                    className="bg-white rounded-[2.5rem] p-5 shadow-2xl shadow-stone-200/40 group border border-stone-50 cursor-pointer"
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded-[2rem] bg-stone-50 relative mb-6 shadow-inner">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute top-4 right-4">
                        <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-brand-gold shadow-sm hover:bg-brand-gold hover:text-white transition-colors">
                          <Heart size={20} />
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                       <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em] mb-2 block">{p.type}</span>
                       <h3 className="text-2xl text-black font-serif mb-2 leading-tight">{p.name}</h3>
                       <p className="text-[10px] text-gray-400 italic mb-6">Sacred Ritual Collection</p>
                       <button className="w-full bg-black text-white py-4 rounded-full text-[10px] font-black tracking-widest uppercase hover:bg-brand-gold transition-all shadow-xl">
                          Acquire
                       </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const ExpeditionSection = ({ onOpenItem }: { onOpenItem: (item: ItemData) => void }) => {
  return (
    <section id="expeditions" className="py-24 md:py-40 bg-obsidian text-white overflow-hidden relative">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 2xl:px-20 relative z-10">
         <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-12 mb-24">
            <div className="max-w-2xl text-center md:text-left">
               <span className="text-brand-gold font-bold tracking-[1em] text-[10px] md:text-xs uppercase mb-8 block">Fellowship of High Peaks</span>
               <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-[0.9] tracking-tighter font-serif">Sacred <br /> Expeditions</h2>
            </div>
            <p className="text-white/40 text-lg md:text-2xl font-light italic max-w-sm text-center md:text-right border-stone-800 md:border-r-4 md:pr-12 leading-relaxed">
               "Beyond tourism. These are pilgrimages to the source of being and universal consciousness."
            </p>
         </div>

         <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
            {ASSETS.expeditions.map((t, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => onOpenItem({ title: t.title, desc: t.desc, image: t.image, type: "Pilgrimage" })}
                className="relative break-inside-avoid rounded-[2.5rem] overflow-hidden group shadow-2xl bg-black border border-white/10 cursor-pointer"
              >
                <img src={t.image} alt={t.title} className="w-full h-auto object-cover transition-transform duration-[3s] group-hover:scale-110 opacity-70 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-10 md:p-12 flex flex-col justify-end">
                  <h4 className="text-2xl md:text-4xl font-serif text-white mb-3 tracking-tight leading-none">{t.title}</h4>
                  <p className="text-[10px] md:text-[11px] text-brand-gold font-black uppercase tracking-[0.3em] mb-6 drop-shadow-lg opacity-80">{t.title === 'Mt. Kailash' ? 'The Throne' : 'Sacred Valley'}</p>
                  <button className="text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-brand-gold transition-all pb-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-500 w-fit">
                    Join Expedition
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
      </div>
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none grayscale invert px-20">
        <img src={ASSETS.chakraCenter} alt="" className="w-full h-full object-contain" />
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="py-24 md:py-32 lg:py-40 bg-pearl relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 2xl:px-20 relative z-10">
        <div className="text-center mb-16 md:mb-24 lg:mb-32">
          <span className="text-brand-gold font-bold tracking-[0.5em] text-[10px] md:text-xs uppercase mb-4 md:mb-6 block">Sacred Transformation</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-black font-serif tracking-tighter">Voices Of Transformation</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {ASSETS.testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-stone-50 flex flex-col justify-between relative"
            >
              <div className="absolute top-10 right-10 opacity-5">
                 <Heart size={80} fill="currentColor" />
              </div>
              <div className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#D4AF37" color="#D4AF37" />)}
                </div>
                <p className="text-gray-800 text-lg md:text-xl font-light italic leading-relaxed mb-10">"{t.text}"</p>
              </div>
              <div className="flex items-center gap-4 border-t border-stone-50 pt-8">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-brand-gold font-bold text-xl">
                   {t.name[0]}
                </div>
                <div>
                  <h5 className="text-black font-bold text-sm uppercase tracking-widest">{t.name}</h5>
                  <p className="text-[10px] text-brand-gold uppercase tracking-widest font-bold">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const JourneySection = () => {
  const [index, setIndex] = useState(2);
  const items = ASSETS.journey;

  const next = () => setIndex((prev) => (prev + 1) % items.length);
  const prev = () => setIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <section className="py-24 md:py-40 bg-white overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 2xl:px-20 mb-20 text-center">
        <span className="text-brand-gold font-bold tracking-[0.8em] text-[10px] uppercase mb-6 block">Visual Odyssey</span>
        <h2 className="text-4xl sm:text-5xl md:text-7xl text-black font-serif tracking-tighter leading-none mb-4">Discover Your <br /> <span className="text-brand-gold italic">Sacred Journey</span></h2>
      </div>

      <div className="relative h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-10 md:px-20 z-50">
          <button onClick={prev} className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all backdrop-blur-md">
            <ChevronLeft size={32} />
          </button>
          <button onClick={next} className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all backdrop-blur-md">
            <ChevronRight size={32} />
          </button>
        </div>

        <div className="relative w-full max-w-7xl mx-auto h-full flex items-center justify-center">
           <AnimatePresence mode="popLayout" initial={false}>
              {items.map((item, i) => {
                const offset = i - index;
                const absOffset = Math.abs(offset);
                
                // Only show 5 items for performance and clarity
                if (absOffset > 2) return null;

                return (
                  <motion.div
                    key={i}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x > 100) prev();
                      else if (info.offset.x < -100) next();
                    }}
                    initial={{ opacity: 0, scale: 0.5, x: offset * 200 }}
                    animate={{ 
                      opacity: 1 - absOffset * 0.3, 
                      scale: 1 - absOffset * 0.2, 
                      x: offset * (window.innerWidth < 768 ? 150 : 350),
                      zIndex: 10 - absOffset,
                      filter: absOffset > 0 ? 'blur(2px)' : 'blur(0px)'
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onClick={() => setIndex(i)}
                    className="absolute cursor-grab active:cursor-grabbing"
                  >
                    <div className={`relative overflow-hidden rounded-[2rem] md:rounded-[4rem] shadow-2xl transition-all duration-500 ${absOffset === 0 ? 'w-[280px] h-[400px] md:w-[450px] md:h-[600px] border-4 border-brand-gold/20' : 'w-[200px] h-[300px] md:w-[300px] md:h-[450px]'}`}>
                       <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                       <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12 transition-opacity duration-500 ${absOffset === 0 ? 'opacity-100' : 'opacity-0'}`}>
                          <h4 className="text-white text-2xl md:text-4xl font-serif">{item.name}</h4>
                          <p className="text-brand-gold font-bold tracking-[0.4em] text-[10px] md:text-sm uppercase mt-4">Mystic Artifact</p>
                       </div>
                    </div>
                  </motion.div>
                );
              })}
           </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-obsidian pt-24 md:pt-32 lg:pt-40 pb-12 md:pb-20 text-white overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 2xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24 md:mb-40">
          <div className="lg:col-span-12 xl:col-span-5 space-y-8 md:space-y-12">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-[2rem] bg-brand-gold flex items-center justify-center text-obsidian shadow-2xl rotate-12">
                <Heart size={40} fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="text-5xl font-serif font-black tracking-tighter">PEARLS OF ASIA</span>
                <span className="text-xs tracking-[0.6em] font-bold text-brand-gold uppercase mt-2">The Sacred Embassy</span>
              </div>
            </div>
            <p className="text-white/40 text-xl font-light italic leading-relaxed max-w-md">
              "A sanctuary for the intentional seeker. Bridging the ancient high-frequency essence of the Himalayas with modern existence."
            </p>
          </div>

          <div className="lg:col-span-12 xl:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-16">
            <div className="space-y-10">
              <h5 className="text-brand-gold font-bold tracking-widest text-[10px] uppercase underline underline-offset-8">Sanctum</h5>
              <ul className="space-y-6 text-sm text-white/50 font-medium">
                <li className="hover:text-brand-gold transition-colors cursor-pointer">Philosophy</li>
                <li className="hover:text-brand-gold transition-colors cursor-pointer">Expeditions</li>
                <li className="hover:text-brand-gold transition-colors cursor-pointer">Rituals</li>
              </ul>
            </div>
            <div className="space-y-10">
              <h5 className="text-brand-gold font-bold tracking-widest text-[10px] uppercase underline underline-offset-8">Concierge</h5>
              <ul className="space-y-6 text-sm text-white/50 font-medium">
                <li className="hover:text-brand-gold transition-colors cursor-pointer">WhatsApp Live</li>
                <li className="hover:text-brand-gold transition-colors cursor-pointer">Logistics Care</li>
                <li className="hover:text-brand-gold transition-colors cursor-pointer">Partnerships</li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1 space-y-10">
              <h5 className="text-brand-gold font-bold tracking-widest text-[10px] uppercase underline underline-offset-8">Transmission</h5>
              <div className="flex bg-white/5 rounded-full p-2 border border-white/10 focus-within:border-brand-gold transition-all">
                <input type="email" placeholder="Sacred Email" className="bg-transparent border-none px-6 py-2 text-xs focus:outline-none flex-grow" />
                <button className="bg-brand-gold text-white p-3 rounded-full hover:bg-white hover:text-black transition-all">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-20 border-t border-white/5 gap-10">
          <p className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase">© 2026 PEARLS OF ASIA • A DIVINE SANCTUARY</p>
          <div className="flex gap-12 font-bold text-[10px] tracking-widest text-white/20 uppercase">
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const [activeItem, setActiveItem] = useState<ItemData | null>(null);

  return (
    <div className="min-h-screen selection:bg-brand-gold/30">
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <GlobalSanctuary onOpenItem={setActiveItem} />
        <ChakraSection />
        <PathOfPractice />
        <SacredStore onOpenItem={setActiveItem} />
        <JourneySection />
        <ExpeditionSection onOpenItem={setActiveItem} />
        <TestimonialsSection />
      </main>
      <Footer />
      <UniversalModal 
        activeItem={activeItem} 
        onClose={() => setActiveItem(null)} 
      />
      <WhatsAppWidget />
    </div>
  );
};

export default App;
