import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Thanmay Collections',
  description: 'Digital Personal Data Protection Act compliance and privacy practices for Thanmay Collections clients.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <div className="border-b border-border-soft pb-6 space-y-2">
        <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest">
          Legal & Compliance
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
          Privacy Policy
        </h1>
        <p className="text-xs text-text-secondary">
          Last Updated: November 2026 | In accordance with India&rsquo;s Digital Personal Data Protection (DPDP) Act
        </p>
      </div>

      <div className="prose prose-sm text-xs sm:text-sm text-text-secondary space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-text-primary">1. Overview and Commitment</h2>
          <p>
            At <strong>Thanmay Collections</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), we respect your privacy and are committed to safeguarding the personal data you entrust to us. This policy details how we collect, process, store, and protect your information when you browse our website or submit order requests through our WhatsApp Business order channel.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-text-primary">2. Minimum Data Collection Principle</h2>
          <p>
            We collect only the bare minimum information necessary to fulfill your jewellery order and provide customer support:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Customer Name: for addressing parcels and communications.</li>
            <li>WhatsApp Phone Number: for confirming availability, sharing package dispatches, and courier coordination.</li>
            <li>Delivery Address (Street, City, State, PIN code): to dispatch the shipment via insured domestic courier partners.</li>
            <li>Enquiry messages and preferences: to assist with styling and customization requests.</li>
          </ul>
          <p>
            We <strong>never</strong> collect credit card numbers, CVVs, debit card PINs, or net banking passwords on this website. All payments are settled directly post-confirmation without any web-based payment gateway integration.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-text-primary">3. Purpose and Legal Basis for Processing</h2>
          <p>
            Your data is processed strictly based on your affirmative consent provided at the checkout screen for:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Generating your unique order identification reference (TC-XXXXXXXX).</li>
            <li>Synthesizing your pre-filled WhatsApp message.</li>
            <li>Packaging and dispatching your jewellery parcels safely.</li>
          </ul>
          <p>
            Marketing messages are never sent without separate and explicit consent. You may opt out of promotional updates at any time by messaging &ldquo;STOP&rdquo; on WhatsApp.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-text-primary">4. Data Storage and Row Level Security (RLS)</h2>
          <p>
            Customer orders and snapshots are stored on PostgreSQL databases protected by zero-trust Row Level Security (RLS) policies. Only authenticated administrators with two-factor authorization can access order records. Public listings of customer records or phone numbers are strictly prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-text-primary">5. Your Rights as a Data Principal</h2>
          <p>
            Under India&rsquo;s Digital Personal Data Protection framework, you have the right to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access a summary of your personal data processed by us.</li>
            <li>Request correction or updating of inaccurate delivery addresses.</li>
            <li>Request erasure of your customer order record once the statutory tax and logistics audit retention window has expired.</li>
            <li>Withdraw consent at any time.</li>
          </ul>
          <p>
            To exercise your privacy rights, please email our grievance officer at <strong>privacy@thanmaycollections.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
