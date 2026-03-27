import React from 'react';
import { Clock, ShieldCheck, Truck, Flame, Heart, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Flame className="text-primary" size={32} />,
      title: "Always Fresh",
      description: "We prepare every meal from scratch using the freshest ingredients available."
    },
    {
      icon: <Truck className="text-primary" size={32} />,
      title: "Fast Delivery",
      description: "Our dedicated delivery team ensures your food arrives hot and crispy in under 30 mins."
    },
    {
      icon: <ShieldCheck className="text-primary" size={32} />,
      title: "Quality Assured",
      description: "Strict hygiene standards and quality checks at every step of preparation."
    },
    {
      icon: <Heart className="text-primary" size={32} />,
      title: "Made with Love",
      description: "Our chefs put their heart into every recipe to give you that home-cooked feel."
    },
    {
      icon: <Award className="text-primary" size={32} />,
      title: "Best in Town",
      description: "Voted #1 for crispy chicken and burgers in the city for three years running."
    },
    {
      icon: <Clock className="text-primary" size={32} />,
      title: "24/7 Service",
      description: "Late night cravings? We've got you covered with our round-the-clock service."
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-black italic mb-4 uppercase tracking-tighter">
            WHY <span className="text-primary">CHOOSE US?</span>
          </h2>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto uppercase tracking-widest text-xs">
            The secret behind our crunch and your smiles
          </p>
          <div className="w-24 h-2 bg-primary mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-6 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl shadow-gray-100 group-hover:shadow-primary/30 group-hover:-rotate-6">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-display font-black italic mb-2 uppercase tracking-tight group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed font-medium text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
