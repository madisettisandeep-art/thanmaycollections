'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MessageCircle, Mail, Clock, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    customer_name: '',
    contact_number: '',
    message: '',
    consent: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER || '919876543210';
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent(
    'Hello Thanmay Collections! I would like to inquire about your jewellery collections and custom orders.'
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit enquiry');
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest">
          Customer Care & Concierge
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-text-primary">
          Contact Thanmay Collections
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
          Have a question about a piece, custom color stone requests, bridal trousseau consultation, or delivery timelines? Our team is at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info Left */}
        <div className="lg:col-span-5 space-y-6">
          {/* WhatsApp Direct Card */}
          <div className="p-6 rounded-3xl bg-cream-warm border border-border-soft shadow-subtle space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-700">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-text-primary">Instant WhatsApp Concierge</h3>
              <p className="text-xs text-text-secondary mt-1">
                For rapid replies, live video previews of jewellery, and order assistance, message our official WhatsApp business number.
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp (+91 98765 43210)</span>
            </a>
          </div>

          {/* Business Details */}
          <div className="p-6 rounded-3xl bg-pure-white border border-border-soft shadow-subtle space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-brand-pink flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-text-primary block">Operating Hours</span>
                <span className="text-text-secondary">Monday to Saturday: 10:00 AM – 8:00 PM IST</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-brand-pink flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-text-primary block">Official Email</span>
                <span className="text-text-secondary">care@thanmaycollections.com</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-brand-pink flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-text-primary block">Dispatch Hub</span>
                <span className="text-text-secondary">Secured Jewellery Vault & Fulfilment Hub, Bengaluru, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enquiry Form Right */}
        <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-pure-white border border-border-soft shadow-card space-y-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-text-primary">Send an Online Enquiry</h3>
            <p className="text-xs text-text-secondary mt-1">
              Fill in your details below and our jewellery concierge will respond via WhatsApp or call within 2-4 business hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center rounded-2xl bg-cream-warm border border-border-soft space-y-3">
              <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
              <h4 className="font-serif text-xl font-bold text-text-primary">Enquiry Received!</h4>
              <p className="text-xs text-text-secondary max-w-sm mx-auto">
                Thank you, <strong className="text-text-primary">{formData.customer_name}</strong>. Our jewellery stylist will reach out on your contact number shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  placeholder="e.g. Shalini Mukherjee"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border-soft bg-pure-white focus:outline-none focus:border-brand-pink transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1">
                  WhatsApp Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.contact_number}
                  onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
                  placeholder="e.g. +91 98450 12345"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border-soft bg-pure-white focus:outline-none focus:border-brand-pink transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1">
                  Message / Piece of Interest *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please specify the jewellery piece name, customization requirement, or wedding date..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border-soft bg-pure-white focus:outline-none focus:border-brand-pink transition-colors"
                />
              </div>

              <div>
                <label className="flex items-start gap-2 cursor-pointer text-xs text-text-secondary leading-snug">
                  <input
                    type="checkbox"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 w-4 h-4 rounded border-border-soft text-brand-pink focus:ring-brand-pink"
                  />
                  <span>
                    I consent to Thanmay Collections processing my enquiry and contacting me via WhatsApp regarding my query.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-brand-pink hover:bg-brand-pink2 text-white font-semibold text-xs rounded-xl shadow-subtle hover:shadow-card flex items-center justify-center gap-2 transition-all disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Enquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Enquiry</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
