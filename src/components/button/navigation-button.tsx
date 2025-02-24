// SeriesButton.tsx
"use client";

import Link from 'next/link';

interface NavigationButtonProps {
  label: string;
  route: string;
}

export function NavigationButton({ label, route }: NavigationButtonProps) {

  return (
    <Link href={`${route}`} className='bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-full shadow-xl transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center gap-2'>
      {label}
    </Link>
    
  );
}
