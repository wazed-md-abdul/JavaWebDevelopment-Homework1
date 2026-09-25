'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import {
  LiquidGlassCard,
  LiquidGlassButton,
  LiquidGlassInput,
  LiquidGlassAlert,
} from '@/components/lightswind';

export default function LoginPage() {
  const { user, registerUser, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    // In-memory simulation
    if (user && user.email.toLowerCase() === email.trim().toLowerCase()) {
      showToast(`Welcome back, ${user.username}!`, 'success', 'Session Active');
      setError('');
    } else {
      const inferredUsername = email.split('@')[0];
      registerUser({
        username: inferredUsername,
        email: email.trim(),
        recipientName: inferredUsername,
        phone: '',
        deliveryAddress: '',
        agreeTerms: true,
      });
      showToast(`Logged in as ${inferredUsername}!`, 'success');
      setError('');
    }
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#BC0202] via-[#FF0000] to-[#FF4D4D] drop-shadow-[0_2px_15px_rgba(255,0,0,0.4)]">
            Member Login
          </h1>
          <p className="mt-2 text-xs text-[#D4B8B8]">
            Sign in to access your in-memory cake favorites and order history.
          </p>
        </div>

        {error && (
          <LiquidGlassAlert type="error" onClose={() => setError('')}>
            {error}
          </LiquidGlassAlert>
        )}

        <LiquidGlassCard variant="clear" glow className="p-8 border-[#830000]/80 bg-[#0C0202]/90 shadow-[0_10px_35px_rgba(131,0,0,0.3)]">
          <form onSubmit={handleLogin} className="space-y-4">
            <LiquidGlassInput
              id="login-email"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="h-4 w-4" />}
              requiredMark
            />

            <LiquidGlassInput
              id="login-password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="h-4 w-4" />}
              requiredMark
            />

            <div className="pt-2">
              <LiquidGlassButton
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              >
                Sign In
              </LiquidGlassButton>
            </div>

            <div className="text-center text-xs text-[#A67E7E] pt-3 border-t border-[#830000]/40">
              Don&apos;t have an account yet?{' '}
              <Link
                href="/register"
                className="font-semibold text-[#FF0000] hover:text-[#FF4D4D] underline underline-offset-2"
              >
                Register here
              </Link>
            </div>
          </form>
        </LiquidGlassCard>
      </div>
    </div>
  );
}
