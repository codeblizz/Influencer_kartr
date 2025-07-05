import React from 'react';
import { ContactForm } from '@/components/forms/contact-form';

function Contact() {
  return (
    <div className="min-h-screen w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
      <ContactForm />
    </div>
  );
}

export default Contact;
