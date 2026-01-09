import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Calendar, CreditCard, Sparkles } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  quality: string;
  screens: number;
}

interface SubscriptionSummaryProps {
  plan: Plan;
  isVisible: boolean;
  onConfirm: (name: string, duration: number) => void;
}

const SubscriptionSummary = ({ plan, isVisible, onConfirm }: SubscriptionSummaryProps) => {
  const [userName, setUserName] = useState('');
  const [duration, setDuration] = useState(1);
  const [isRippling, setIsRippling] = useState(false);

  const totalPrice = plan.price * duration;
  const savings = duration >= 12 ? totalPrice * 0.2 : duration >= 6 ? totalPrice * 0.1 : 0;
  const finalPrice = totalPrice - savings;

  const handleConfirm = () => {
    if (!userName.trim()) return;
    setIsRippling(true);
    setTimeout(() => {
      setIsRippling(false);
      onConfirm(userName, duration);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <motion.div
            className="glass-card p-8 max-w-2xl mx-auto"
            initial={{ y: 50, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary/20 rounded-xl">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gradient">Complete Your Subscription</h2>
                <p className="text-muted-foreground">You've selected the {plan.name} plan</p>
              </div>
            </div>

            {/* Selected Plan Summary */}
            <motion.div
              className="bg-secondary/50 rounded-xl p-6 mb-8 border border-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{plan.name} Plan</h3>
                  <p className="text-muted-foreground">{plan.quality} • {plan.screens} screens</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-extrabold text-foreground">${plan.price}</p>
                  <p className="text-sm text-muted-foreground">per month</p>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <div className="space-y-6">
              {/* User Name Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-input border border-border rounded-xl py-4 pl-12 pr-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  />
                </div>
              </motion.div>

              {/* Duration Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Subscription Duration
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full bg-input border border-border rounded-xl py-4 pl-12 pr-4 text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  >
                    {[1, 3, 6, 12].map((months) => (
                      <option key={months} value={months}>
                        {months} {months === 1 ? 'month' : 'months'}
                        {months >= 6 && ' (Save ' + (months >= 12 ? '20%' : '10%') + ')'}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>

              {/* Price Calculation */}
              <motion.div
                className="bg-netflix-gray/50 rounded-xl p-6 space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex justify-between text-muted-foreground">
                  <span>Base price ({duration} {duration === 1 ? 'month' : 'months'})</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                  <motion.div
                    className="flex justify-between text-primary"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <span>Discount ({duration >= 12 ? '20%' : '10%'} off)</span>
                    <span>-${savings.toFixed(2)}</span>
                  </motion.div>
                )}
                <div className="pt-3 border-t border-border flex justify-between">
                  <span className="text-lg font-semibold text-foreground">Total</span>
                  <motion.span
                    className="text-2xl font-extrabold text-foreground"
                    key={finalPrice}
                    initial={{ scale: 1.2, color: 'hsl(357, 91%, 47%)' }}
                    animate={{ scale: 1, color: 'hsl(0, 0%, 98%)' }}
                    transition={{ duration: 0.3 }}
                  >
                    ${finalPrice.toFixed(2)}
                  </motion.span>
                </div>
              </motion.div>

              {/* Confirm Button */}
              <motion.button
                onClick={handleConfirm}
                disabled={!userName.trim()}
                className={`
                  relative w-full netflix-button text-lg
                  ${!userName.trim() ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={userName.trim() ? { scale: 1.02 } : {}}
                whileTap={userName.trim() ? { scale: 0.98 } : {}}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Confirm Subscription
                </span>
                {isRippling && (
                  <motion.span
                    className="absolute inset-0 bg-white/30 rounded-lg"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                )}
              </motion.button>

              <p className="text-center text-xs text-muted-foreground">
                By clicking confirm, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubscriptionSummary;
