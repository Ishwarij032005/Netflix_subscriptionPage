import { useState } from 'react';
import { motion } from 'framer-motion';
import PlanCard from '@/components/PlanCard';
import SubscriptionSummary from '@/components/SubscriptionSummary';
import SuccessModal from '@/components/SuccessModal';
import { Play } from 'lucide-react';
import { toast } from 'sonner';

interface Plan {
  id: string;
  name: string;
  price: number;
  quality: string;
  screens: number;
  isPopular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 6.99,
    quality: 'SD',
    screens: 1,
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 15.49,
    quality: 'Full HD',
    screens: 2,
    isPopular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 22.99,
    quality: '4K + HDR',
    screens: 4,
  },
];

import { createSubscription, getSubscriptions } from '@/services/api';

const Index = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState({
    userName: '',
    duration: 1,
    totalPrice: 0,
  });
  const [currentSubscription, setCurrentSubscription] = useState<any | null>(null);

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowSummary(true);
  };

  const handleConfirmSubscription = async (name: string, duration: number) => {
    if (!selectedPlan) return;

    try {
      // Pre-check: ensure user does not already have an active subscription
      const existing = await getSubscriptions(name);
      const active = existing?.subscriptions?.find((s: any) => s.status === 'Active');
      if (active) {
        toast.error('User already has an active subscription');
        return;
      }

      const result = await createSubscription({
        userName: name,
        planName: selectedPlan.name,
        monthlyPrice: selectedPlan.price,
        duration: Number(duration)
      });
      setCurrentSubscription(result?.subscription || null);
      // Calculate total for display purposes only
      const basePrice = selectedPlan.price * duration;
      const discount = duration >= 12 ? 0.2 : duration >= 6 ? 0.1 : 0;
      const finalPrice = basePrice - (basePrice * discount);

      setSubscriptionData({
        userName: name,
        duration,
        totalPrice: finalPrice,
      });
      setShowSuccess(true);
      toast.success("Subscription created successfully!");
    } catch (error: any) {
      console.error('Subscription error:', error);
      const errorMessage = error.response?.data?.message || "Failed to process subscription. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setShowSummary(false);
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background Gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <motion.header
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Play className="w-6 h-6 text-primary-foreground fill-current" />
            </div>
            <span className="text-3xl font-extrabold text-foreground tracking-tight">STREAMFLIX</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-gradient">Choose Your Plan</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.
          </motion.p>
        </motion.header>

        {/* Plan Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              style={{
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              <PlanCard
                plan={plan}
                isSelected={selectedPlan?.id === plan.id}
                onSelect={handleSelectPlan}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Subscription Summary */}
        {selectedPlan && (
          <SubscriptionSummary
            plan={selectedPlan}
            isVisible={showSummary}
            onConfirm={handleConfirmSubscription}
          />
        )}

        {/* Footer */}
        <motion.footer
          className="text-center mt-16 text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>© 2024 Streamflix. All rights reserved.</p>
          <p className="mt-2">
            Questions? Call <span className="text-foreground">1-844-505-2993</span>
          </p>
        </motion.footer>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={handleCloseSuccess}
        userName={subscriptionData.userName}
        planName={selectedPlan?.name || ''}
        duration={subscriptionData.duration}
        totalPrice={subscriptionData.totalPrice}
        subscription={currentSubscription}
      />
    </div>
  );
};

export default Index;
