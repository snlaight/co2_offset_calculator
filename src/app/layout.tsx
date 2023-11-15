import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';

import './globals.css';
import TRPCProvider from '@/providers/trpcProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CarbonCalc Quest',
  description: 'Carbon Footprint Calculator',
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode,
}) => (
  <ClerkProvider>
    <html lang='en'>
      <TRPCProvider>
        <body className={inter.className}>
          <Toaster position='top-right' richColors closeButton />
          {children}
        </body>
      </TRPCProvider>
    </html>
  </ClerkProvider>
);

export default RootLayout;
