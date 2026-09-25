import type { Metadata } from 'next';
import { RegistrationForm } from '@/components/forms/RegistrationForm';

export const metadata: Metadata = {
  title: 'Register New User',
  description: 'Create a new account at Sweet Delight Bakery to save your favorite cake choices and manage delivery addresses.',
};

export default function RegisterPage() {
  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Title - faithfully matches the reference screenshot "注册新用户", styled in vibrant #FF0000 / #BC0202 */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#BC0202] via-[#FF0000] to-[#FF4D4D] drop-shadow-[0_2px_15px_rgba(255,0,0,0.4)]">
            Register New User
          </h1>
          <p className="mt-3 text-sm text-[#D4B8B8] max-w-md mx-auto">
            Please fill in your account information and default delivery details to begin ordering freshly baked luxury artisan cakes.
          </p>
        </div>

        {/* Centered Registration Form Container */}
        <RegistrationForm />
      </div>
    </div>
  );
}
