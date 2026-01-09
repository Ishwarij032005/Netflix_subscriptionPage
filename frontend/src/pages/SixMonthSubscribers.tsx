import { useEffect, useState } from 'react';
import { getSixMonthSubscribers } from '@/services/api';

interface Subscriber {
  _id: string;
  userName: string;
  planName: string;
  duration: number;
  totalAmount: number;
}

const SixMonthSubscribers = () => {
  const [subs, setSubs] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getSixMonthSubscribers();
        if (!mounted) return;
        setSubs(res.subscriptions || []);
      } catch (err: any) {
        console.error('Fetch 6-month subscribers error', err);
        if (!mounted) return;
        setError(err.response?.data?.message || 'Failed to load subscribers');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetch();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">6-Month Subscribers</h1>

      {loading && <p className="text-sm text-muted-foreground">Loading...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="grid gap-4">
          {subs.length === 0 && <p className="text-sm text-muted-foreground">No 6-month subscribers found.</p>}
          {subs.map((s) => (
            <div key={s._id} className="bg-secondary/50 rounded-xl p-4 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">User</div>
                  <div className="font-semibold text-foreground">{s.userName}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Plan</div>
                  <div className="font-semibold text-foreground">{s.planName}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Duration</div>
                  <div className="font-semibold text-foreground">{s.duration} months</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Total</div>
                  <div className="font-semibold text-primary">${s.totalAmount?.toFixed?.(2) ?? s.totalAmount}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SixMonthSubscribers;
