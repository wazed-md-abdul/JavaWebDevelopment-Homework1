'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Lock, UserCheck, Phone, MapPin, CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { UserRegistrationData, RegistrationFormErrors } from '@/types';
import { REGISTRATION_FORM_FIELDS, INITIAL_REGISTRATION_VALUES } from '@/data/formConfig';
import { useApp } from '@/context/AppContext';
import {
  LiquidGlassCard,
  LiquidGlassButton,
  LiquidGlassAlert,
  LiquidGlassCheckbox,
  LiquidGlassInput,
  LiquidGlassAvatar,
} from '@/components/lightswind';

export function RegistrationForm() {
  const { user, registerUser, logoutUser } = useApp();
  const [formData, setFormData] = useState<UserRegistrationData>(INITIAL_REGISTRATION_VALUES);
  const [errors, setErrors] = useState<RegistrationFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field icons mapping with crimson tone
  const fieldIcons: Record<string, React.ReactNode> = {
    username: <User className="h-4 w-4 text-[#A67E7E]" />,
    email: <Mail className="h-4 w-4 text-[#A67E7E]" />,
    password: <Lock className="h-4 w-4 text-[#A67E7E]" />,
    recipientName: <UserCheck className="h-4 w-4 text-[#A67E7E]" />,
    phone: <Phone className="h-4 w-4 text-[#A67E7E]" />,
    deliveryAddress: <MapPin className="h-4 w-4 text-[#A67E7E]" />,
  };

  const handleInputChange = (field: keyof UserRegistrationData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error as user types
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: RegistrationFormErrors = {};

    // 1. Username validation (required)
    if (!formData.username.trim()) {
      newErrors.username = 'Please enter your username.';
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters.';
    }

    // 2. Email validation (required)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. user@example.com).';
    }

    // 3. Password validation (required)
    if (!formData.password) {
      newErrors.password = 'Please enter your password.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    // 4. Phone validation (optional, but if provided must be realistic)
    if (formData.phone.trim()) {
      const cleanPhone = formData.phone.replace(/[\s\-\(\)\+]/g, '');
      if (cleanPhone.length < 7 || !/^\d+$/.test(cleanPhone)) {
        newErrors.phone = 'Please enter a valid phone number (at least 7 digits).';
      }
    }

    // 5. Terms agreement validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms of Service to register.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate swift in-memory registration processing
    setTimeout(() => {
      registerUser({
        username: formData.username.trim(),
        email: formData.email.trim(),
        recipientName: formData.recipientName.trim(),
        phone: formData.phone.trim(),
        deliveryAddress: formData.deliveryAddress.trim(),
        agreeTerms: formData.agreeTerms,
        newsletter: formData.newsletter,
      });
      setIsSubmitting(false);
    }, 400);
  };

  // If user is already registered in memory during this session
  if (user) {
    return (
      <div className="w-full max-w-xl mx-auto space-y-6 animate-in fade-in duration-300">
        <LiquidGlassAlert type="success" title="Registration Completed Successfully!">
          Your new account has been created in memory. You are now recognized across Sweet Delight Noir Patisserie.
        </LiquidGlassAlert>

        <LiquidGlassCard variant="clear" glow className="p-8 border-[#830000]">
          <div className="flex flex-col items-center text-center space-y-4">
            <LiquidGlassAvatar name={user.username} size="lg" status="online" />
            <div>
              <h3 className="font-serif font-bold text-2xl text-white">
                Welcome, {user.username}!
              </h3>
              <p className="text-sm text-[#D4B8B8] mt-1">{user.email}</p>
            </div>

            <div className="w-full bg-[#180404]/90 rounded-xl p-4 text-left border border-[#830000]/60 space-y-2 text-xs text-[#EBDCDC]">
              <div className="flex justify-between border-b border-[#830000]/40 pb-1.5">
                <span className="font-medium text-[#A67E7E]">Member ID:</span>
                <span className="font-mono font-semibold text-[#FF4D4D]">{user.id}</span>
              </div>
              <div className="flex justify-between border-b border-[#830000]/40 pb-1.5">
                <span className="font-medium text-[#A67E7E]">Default Recipient:</span>
                <span className="font-semibold text-white">{user.recipientName || 'Not specified'}</span>
              </div>
              <div className="flex justify-between border-b border-[#830000]/40 pb-1.5">
                <span className="font-medium text-[#A67E7E]">Contact Phone:</span>
                <span className="text-white">{user.phone || 'Not specified'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-[#A67E7E]">Cake Delivery Address:</span>
                <span className="truncate max-w-[240px] text-right text-white">{user.deliveryAddress || 'Not specified'}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full pt-4">
              <Link href="/categories" className="flex-1">
                <LiquidGlassButton
                  variant="primary"
                  size="md"
                  fullWidth
                  icon={<ArrowRight className="h-4 w-4" />}
                  iconPosition="right"
                >
                  Explore Cake Catalog
                </LiquidGlassButton>
              </Link>
              <LiquidGlassButton
                variant="outline"
                size="md"
                onClick={() => {
                  logoutUser();
                  setFormData(INITIAL_REGISTRATION_VALUES);
                  setErrors({});
                }}
                icon={<RotateCcw className="h-4 w-4" />}
              >
                Register Another User
              </LiquidGlassButton>
            </div>
          </div>
        </LiquidGlassCard>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* General validation error banner if multiple errors */}
      {Object.keys(errors).length > 1 && (
        <LiquidGlassAlert
          type="error"
          title="Please Correct The Following Errors"
          onClose={() => setErrors({})}
        >
          Please review the highlighted fields below before submitting your registration.
        </LiquidGlassAlert>
      )}

      {/* Main Glass Form Container mirroring reference layout with #000000 / #830000 styling */}
      <LiquidGlassCard variant="clear" glow className="p-6 sm:p-10 border border-[#830000]/80 bg-[#0C0202]/90 shadow-[0_10px_40px_rgba(131,0,0,0.3)]">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Dynamic rendering of reference form fields */}
          {REGISTRATION_FORM_FIELDS.map((field) => (
            <LiquidGlassInput
              key={field.id}
              id={`reg-${field.id}`}
              label={field.label}
              requiredMark={field.required}
              type={field.type}
              placeholder={field.placeholder}
              value={String(formData[field.id] ?? '')}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              error={errors[field.id]}
              helperText={field.helperText}
              icon={fieldIcons[field.id]}
              autoComplete={field.autoComplete}
            />
          ))}

          {/* Liquid Glass Checkboxes: Terms & Conditions and Newsletter */}
          <div className="pt-2 space-y-3 border-t border-[#830000]/40">
            <LiquidGlassCheckbox
              id="agree-terms"
              checked={formData.agreeTerms}
              onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
              label={
                <span>
                  I agree to the <Link href="#" className="text-[#FF0000] hover:underline font-semibold">Terms of Service</Link> and{' '}
                  <Link href="#" className="text-[#FF0000] hover:underline font-semibold">Bakery Policies</Link> *
                </span>
              }
              error={errors.agreeTerms}
            />

            <LiquidGlassCheckbox
              id="newsletter"
              checked={formData.newsletter}
              onChange={(e) => handleInputChange('newsletter', e.target.checked)}
              label="Keep me updated with seasonal red velvet creations, tasting events, and special discount codes."
            />
          </div>

          {/* Submit Button - styled prominently like the orange "提交" button in the reference screenshot, now with scarlet red gradient */}
          <div className="pt-4 flex justify-center">
            <LiquidGlassButton
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="w-full sm:w-64 font-bold text-base py-3"
            >
              {isSubmitting ? 'Registering...' : 'Submit'}
            </LiquidGlassButton>
          </div>

          <div className="text-center text-xs text-[#A67E7E] pt-2">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-[#FF0000] hover:text-[#FF4D4D] underline underline-offset-2">
              Log in here
            </Link>
          </div>
        </form>
      </LiquidGlassCard>
    </div>
  );
}
