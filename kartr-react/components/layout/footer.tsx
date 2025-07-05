import React from 'react';
import Image from "next/image";

export default function Footer() {
  return (
    <footer className='h-48 bg-card text-sm flex flex-col justify-between items-center w-full pt-10 pb-2 px-2'>
      <div className="flex flex-row items-center gap-2">
        <Image src="/assets/kartr_logo.png" width={100} height={100} alt="Kartr Logo" className="footer-logo" />
        <div className="tagline">Shine and Connect</div>
      </div>
      <div className="flex gap-x-4">
        <a href="#" className="hover:text-ring hover:underline cursor-pointer">Privacy Policy</a>
        <a href="#" className="hover:text-ring hover:underline cursor-pointer">Terms of Service</a>
        <a href="/contact" className="hover:text-ring hover:underline cursor-pointer">Contact Us</a> {/* Replace with your React Router Link if needed */}
      </div>
      <span className="hover:text-ring text-xs mt-3">
        &copy;{new Date().getFullYear()} Kartr. All rights reserved.
      </span>
    </footer>
  );
}
