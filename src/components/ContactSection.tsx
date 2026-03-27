import React from 'react';
import { Phone, MessageCircle, MapPin, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

export const ContactSection: React.FC = () => {
  const phoneNumber = "+92 300 1234567";
  const whatsappNumber = "+92 300 1234567";
  const address = "123 Crispy Street, Foodie District, Karachi, Pakistan";
  const email = "hello@crispyexpress.com";

  return (
    <section className="py-24 bg-charcoal text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-display font-black italic mb-8 uppercase tracking-tighter leading-none">
              GET IN <span className="text-primary">TOUCH</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-md font-medium leading-relaxed">
              Have questions or want to place a large order? Reach out to us anytime!
            </p>

            <div className="space-y-10">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary transition-all duration-500 shadow-xl shadow-black/20 group-hover:shadow-primary/30">
                  <Phone className="text-primary group-hover:text-white" size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Call Us</p>
                  <p className="text-xl font-display font-black italic tracking-tight">{phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#25D366] transition-all duration-500 shadow-xl shadow-black/20 group-hover:shadow-[#25D366]/30">
                  <MessageCircle className="text-[#25D366] group-hover:text-white" size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">WhatsApp</p>
                  <p className="text-xl font-display font-black italic tracking-tight">{whatsappNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-accent transition-all duration-500 shadow-xl shadow-black/20 group-hover:shadow-accent/30">
                  <MapPin className="text-accent group-hover:text-charcoal" size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Our Location</p>
                  <p className="text-xl font-display font-black italic tracking-tight max-w-xs">{address}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-6 mt-16">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 p-10 md:p-16 rounded-[3rem] border border-white/10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/20 transition-colors"></div>
            
            <h3 className="text-3xl font-display font-black italic mb-10 uppercase tracking-tight">OPENING <span className="text-primary">HOURS</span></h3>
            
            <div className="space-y-6">
              {[
                { day: "Monday - Thursday", hours: "11:00 AM - 12:00 AM" },
                { day: "Friday", hours: "02:00 PM - 02:00 AM" },
                { day: "Saturday - Sunday", hours: "11:00 AM - 02:00 AM" }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-gray-400 font-black uppercase tracking-widest text-xs">{item.day}</span>
                  <span className="font-display font-black italic tracking-tight">{item.hours}</span>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 bg-primary rounded-3xl text-center shadow-2xl shadow-primary/20">
              <h4 className="text-2xl font-display font-black italic mb-2 uppercase tracking-tight">LATE NIGHT DELIVERY</h4>
              <p className="text-white/80 font-medium text-sm mb-6 uppercase tracking-widest">Available until 2:00 AM on weekends</p>
              <button className="bg-white text-primary px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform">
                Order Now
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
