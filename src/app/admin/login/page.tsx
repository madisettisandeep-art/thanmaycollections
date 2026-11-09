'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@thanmaycollections.com');
  const [password, setPassword] = useState('ThanmayLuxury2026!');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid credentials');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-pure-white rounded-3xl border border-border-soft shadow-card p-8 sm:p-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="relative h-14 w-48 mx-auto mb-3">
            <Image
              src="/images/logo.png"
              alt="Thanmay Collections"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[11px] font-semibold text-brand-pink uppercase tracking-widest block">
            Administrative Portal
          </span>
          <h1 className="font-serif text-2xl font-bold text-text-primary">
            Sign In to Manage Store
          </h1>
          <p className="text-xs text-text-secondary">
            Restricted access for authorized Thanmay Collections staff only.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-border-soft bg-cream-warm/20 focus:outline-none focus:border-brand-pink transition-colors"
                placeholder="admin@thanmaycollections.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-border-soft bg-cream-warm/20 focus:outline-none focus:border-brand-pink transition-colors"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-cream-warm/50 border border-border-soft text-[11px] text-text-secondary">
            <span className="font-semibold text-text-primary block mb-0.5">Default System Credentials:</span>
            <span>admin@thanmaycollections.com / ThanmayLuxury2026!</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-brand-pink hover:bg-brand-pink2 text-pure-white font-semibold text-sm rounded-xl shadow-subtle hover:shadow-card flex items-center justify-center gap-2 transition-all disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-text-secondary flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
          <span>Protected with HTTP-only session tokens & rate limiting</span>
        </div>
      </div>
    </div>
  );
}
