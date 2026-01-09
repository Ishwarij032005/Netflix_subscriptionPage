import { motion } from 'framer-motion';
import { Check, Monitor, Tv, Smartphone } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  quality: string;
  screens: number;
  isPopular?: boolean;
}

interface PlanCardProps {
  plan: Plan;
  isSelected: boolean;
  onSelect: (plan: Plan) => void;
}

const PlanCard = ({ plan, isSelected, onSelect }: PlanCardProps) => {
  const getQualityIcon = () => {
    switch (plan.quality) {
      case '4K + HDR':
        return <Tv className="w-5 h-5" />;
      case 'Full HD':
        return <Monitor className="w-5 h-5" />;
      default:
        return <Smartphone className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      className="perspective-1000 cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(plan)}
    >
      <motion.div
        className={`
          glass-card preserve-3d p-8 h-full min-h-[420px] flex flex-col
          transition-all duration-500 ease-out
          ${isSelected ? 'glow-border border-2' : 'border border-border hover:border-muted-foreground/30'}
        `}
        animate={{
          rotateX: isSelected ? 0 : 2,
          rotateY: isSelected ? 0 : -2,
        }}
        whileHover={{
          rotateX: 0,
          rotateY: 0,
          boxShadow: isSelected 
            ? '0 0 40px hsl(357 91% 47% / 0.5), 0 35px 60px -15px hsl(0 0% 0% / 0.6)'
            : '0 35px 60px -15px hsl(0 0% 0% / 0.6)',
        }}
        style={{
          boxShadow: isSelected
            ? '0 0 30px hsl(357 91% 47% / 0.4), 0 25px 50px -12px hsl(0 0% 0% / 0.5)'
            : '0 25px 50px -12px hsl(0 0% 0% / 0.5)',
        }}
      >
        {/* Popular Badge */}
        {plan.isPopular && (
          <motion.div
            className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            <span className="text-xs font-bold text-primary-foreground uppercase tracking-wider">
              Most Popular
            </span>
          </motion.div>
        )}

        {/* Plan Name */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gradient mb-2">{plan.name}</h3>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-extrabold text-foreground">${plan.price}</span>
            <span className="text-muted-foreground">/mo</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

        {/* Features */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary/20' : 'bg-secondary'}`}>
              {getQualityIcon()}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Video Quality</p>
              <p className="font-semibold text-foreground">{plan.quality}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary/20' : 'bg-secondary'}`}>
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Screens</p>
              <p className="font-semibold text-foreground">{plan.screens} {plan.screens > 1 ? 'devices' : 'device'}</p>
            </div>
          </div>

          {/* Feature List */}
          <div className="pt-4 space-y-3">
            {['Unlimited movies & TV shows', 'Cancel anytime', 'Watch on any device'].map((feature, index) => (
              <motion.div
                key={feature}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index + 0.3 }}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isSelected ? 'bg-primary' : 'bg-muted'}`}>
                  <Check className="w-3 h-3 text-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Status Badge */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className={`
            inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold
            ${isSelected ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'}
          `}>
            <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`} />
            {isSelected ? 'Selected' : 'Available'}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PlanCard;
