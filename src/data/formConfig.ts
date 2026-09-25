import { UserRegistrationData } from '@/types';

export interface FormFieldConfig {
  id: keyof UserRegistrationData;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  autoComplete?: string;
  helperText?: string;
}

export const REGISTRATION_FORM_FIELDS: FormFieldConfig[] = [
  {
    id: 'username',
    label: 'Username',
    type: 'text',
    placeholder: 'Please enter your username',
    required: true,
    autoComplete: 'username',
    helperText: 'Must be 3-20 characters (letters, numbers, underscores).',
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Please enter your email',
    required: true,
    autoComplete: 'email',
    helperText: 'We will send order receipts and delivery tracking here.',
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Please enter your password',
    required: true,
    autoComplete: 'new-password',
    helperText: 'At least 6 characters with letters and numbers.',
  },
  {
    id: 'recipientName',
    label: 'Recipient Name',
    type: 'text',
    placeholder: 'Please enter recipient name',
    required: false,
    autoComplete: 'name',
    helperText: 'Name of the lucky cake receiver or party host.',
  },
  {
    id: 'phone',
    label: 'Phone Number',
    type: 'tel',
    placeholder: 'Please enter phone number',
    required: false,
    autoComplete: 'tel',
    helperText: 'For delivery rider contact and courier verification.',
  },
  {
    id: 'deliveryAddress',
    label: 'Delivery Address',
    type: 'text',
    placeholder: 'Please enter delivery address',
    required: false,
    autoComplete: 'street-address',
    helperText: 'Apartment, suite, street, and city for cake delivery.',
  },
];

export const INITIAL_REGISTRATION_VALUES: UserRegistrationData = {
  username: '',
  email: '',
  password: '',
  recipientName: '',
  phone: '',
  deliveryAddress: '',
  agreeTerms: false,
  newsletter: true,
};
