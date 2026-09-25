import { NavigationItem } from '@/types';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Categories',
    href: '/categories',
    hasDropdown: true,
    children: [
      { name: 'All Cake Categories', href: '/categories', description: 'Browse all hand-crafted cakes' },
      { name: 'Birthday Celebrations', href: '/categories?cat=birthday', description: 'Fun, festive cakes for birthday milestones' },
      { name: 'Chocolate Confections', href: '/categories?cat=chocolate', description: 'Decadent dark, milk, and white chocolate cakes' },
      { name: 'Fresh Fruit Delights', href: '/categories?cat=fruit', description: 'Seasonal fresh berries and light chiffon' },
      { name: 'Artisan Cheesecakes', href: '/categories?cat=cheesecake', description: 'Basque burnt & New York style' },
      { name: 'Signature & Wedding', href: '/categories?cat=wedding', description: 'Tiered cakes for grand celebrations' },
      { name: 'Petite Pastries & Cupcakes', href: '/categories?cat=cupcakes', description: 'Individual treats & party boxes' },
    ],
  },
  {
    label: 'Best Sellers',
    href: '/hot',
    badge: 'Hot',
  },
  {
    label: 'New Arrivals',
    href: '/new',
    badge: 'New',
  },
  {
    label: 'Register',
    href: '/register',
    isSpecial: true, // Corresponds to the orange highlighted "注册" tab in the reference image
  },
  {
    label: 'Login',
    href: '/login',
  },
];
