'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem, RegisteredUser, ToastMessage } from '@/types';

interface AppContextType {
  // In-memory Shopping Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, selectedWeight?: string) => void;
  removeFromCart: (productId: string, selectedWeight?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedWeight?: string) => void;
  clearCart: () => void;

  // In-memory User Registration Session (NO localStorage/sessionStorage/cookies)
  user: RegisteredUser | null;
  registerUser: (userData: Omit<RegisteredUser, 'id' | 'registeredAt'>) => void;
  logoutUser: () => void;

  // Search query
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Toast notifications
  toast: ToastMessage | null;
  showToast: (message: string, type?: ToastMessage['type'], title?: string) => void;
  hideToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // In-memory cart items
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // In-memory user state (initialized to null, completely in-memory)
  const [user, setUser] = useState<RegisteredUser | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Toast notifications
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (message: string, type: ToastMessage['type'] = 'success', title?: string) => {
    const id = Date.now().toString();
    setToast({ id, message, type, title });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 4500);
  };

  const hideToast = () => {
    setToast(null);
  };

  const addToCart = (product: Product, quantity: number = 1, selectedWeight?: string) => {
    const weight = selectedWeight || product.weights[0] || 'Standard';

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedWeight === weight
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, quantity, selectedWeight: weight }];
      }
    });

    showToast(`Added "${product.name}" (${weight}) to your cart!`, 'success', 'Cart Updated');
  };

  const removeFromCart = (productId: string, selectedWeight?: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && (!selectedWeight || item.selectedWeight === selectedWeight))
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, selectedWeight?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedWeight);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId && (!selectedWeight || item.selectedWeight === selectedWeight)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Purely in-memory registration handler
  const registerUser = (userData: Omit<RegisteredUser, 'id' | 'registeredAt'>) => {
    const newUser: RegisteredUser = {
      ...userData,
      id: `usr-${Date.now()}`,
      registeredAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };
    setUser(newUser);
    showToast(`Welcome to Sweet Delight Bakery, ${newUser.username}!`, 'success', 'Account Created');
  };

  const logoutUser = () => {
    setUser(null);
    showToast('You have been logged out.', 'info');
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        user,
        registerUser,
        logoutUser,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        toast,
        showToast,
        hideToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
