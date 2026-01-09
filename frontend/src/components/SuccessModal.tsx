import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, PartyPopper, X } from 'lucide-react';

import { useState } from 'react';
import { updateSubscription, deleteSubscription } from '@/services/api';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  planName: string;
  duration: number;
  totalPrice: number;
  subscription?: any | null;
}

const SuccessModal = ({ isOpen, onClose, userName, planName, duration, totalPrice, subscription }: SuccessModalProps) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmCancel, setIsConfirmCancel] = useState(false);
  const [editPlan, setEditPlan] = useState(subscription?.planName || planName);
  const [editDuration, setEditDuration] = useState<number>(duration);
  const [loading, setLoading] = useState(false);

  const plans = [
    { name: 'Basic', price: 6.99 },
    { name: 'Standard', price: 15.49 },
    { name: 'Premium', price: 22.99 },
  ];

  const handleSaveEdit = async () => {
    if (!subscription) return;
    setLoading(true);
    try {
      const monthlyPrice = plans.find((p) => p.name === editPlan)?.price || subscription.monthlyPrice;
      const resp = await updateSubscription(subscription._id, {
        planName: editPlan,
        monthlyPrice,
        duration: editDuration,
      });
      // update local subscription object
      subscription.planName = resp.subscription?.planName || editPlan;
      subscription.monthlyPrice = resp.subscription?.monthlyPrice || monthlyPrice;
      subscription.endDate = resp.subscription?.endDate || subscription.endDate;
      subscription.status = resp.subscription?.status || subscription.status;
      setIsEditing(false);
    } catch (err: any) {
      console.error('Update error', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmCancel = async () => {
    if (!subscription) return;
    setLoading(true);
    try {
      await deleteSubscription(subscription._id);
      subscription.status = 'Expired';
      subscription.endDate = new Date().toISOString();
      setIsConfirmCancel(false);
    } catch (err) {
      console.error('Cancel error', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative glass-card p-8 max-w-md w-full text-center glow-border border-2"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Success Icon */}
            <motion.div
              className="w-20 h-20 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <CheckCircle className="w-10 h-10 text-primary" />
            </motion.div>

            {/* Confetti Animation */}
            <motion.div
              className="absolute top-8 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <PartyPopper className="w-8 h-8 text-primary" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gradient mb-2">Welcome to Netflix!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for subscribing, <span className="text-foreground font-semibold">{userName}</span>!
              </p>

              {/* Summary */}
              <div className="bg-secondary/50 rounded-xl p-4 mb-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="font-semibold text-foreground">{subscription?.planName || planName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold text-foreground">{subscription?.duration || duration} {duration === 1 ? 'month' : 'months'}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="text-muted-foreground">Total Paid</span>
                  <span className="font-bold text-primary text-lg">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Manage Subscription (shows only when subscription exists and is Active) */}
              {subscription && subscription.status === 'Active' && (
                <div className="space-y-3 mb-4">
                  {!isEditing ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="w-1/2 netflix-button"
                      >
                        Edit Subscription
                      </button>
                      <button
                        onClick={() => setIsConfirmCancel(true)}
                        className="w-1/2 bg-red-600 hover:bg-red-700 text-white rounded-xl py-3"
                      >
                        Cancel Subscription
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <select
                          value={editPlan}
                          onChange={(e) => setEditPlan(e.target.value)}
                          className="bg-input border border-border rounded-xl py-3 px-3"
                        >
                          {plans.map((p) => (
                            <option key={p.name} value={p.name}>{p.name}</option>
                          ))}
                        </select>
                        <select
                          value={editDuration}
                          onChange={(e) => setEditDuration(Number(e.target.value))}
                          className="bg-input border border-border rounded-xl py-3 px-3"
                        >
                          {[1,3,6,12].map((m) => <option key={m} value={m}>{m} {m===1? 'month':'months'}</option>)}
                        </select>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={handleSaveEdit} disabled={loading} className="w-1/2 netflix-button">Save Changes</button>
                        <button onClick={() => setIsEditing(false)} className="w-1/2 bg-secondary/60 rounded-xl py-3">Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Cancel confirmation */}
              {isConfirmCancel && (
                <div className="bg-red-50 p-4 rounded-xl mb-4">
                  <p className="text-sm text-red-700 mb-3">Are you sure you want to cancel your subscription? This will end access immediately.</p>
                  <div className="flex gap-3">
                    <button onClick={handleConfirmCancel} disabled={loading} className="w-1/2 bg-red-600 hover:bg-red-700 text-white rounded-xl py-3">Yes, cancel</button>
                    <button onClick={() => setIsConfirmCancel(false)} className="w-1/2 bg-secondary/60 rounded-xl py-3">No, keep it</button>
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  onClose();
                  navigate('/browse');
                }}
                className="netflix-button w-full"
              >
                Start Watching
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
