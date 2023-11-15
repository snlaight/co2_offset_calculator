'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calculator } from 'lucide-react';
import { Roboto } from 'next/font/google';

import cn from '@/utils/helpers/cn';

interface SidebarProps {
  isAdmin: boolean;
}

const roboto = Roboto({ weight: '500', subsets: ['latin'] });

const routes = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-primary-300',
  },
  {
    name: 'Calculator',
    icon: Calculator,
    href: '/calculator',
    color: 'text-secondary-300',
  },
];

const Sidebar = ({ isAdmin } : SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className='space-y-4 py-8 flex flex-col h-full bg-primary-950 text-white'>
      <div className='px-3 py-2 flex-1'>
        <Link href='/dashboard' className='flex items-center  mb-14'>
          <div className='relative w-20 h-20'>
            <Image fill alt='logo' src='/carbon_calc_quest_logo.png' />
          </div>
          <h1 className={cn('text-lg font-bold text-primary-300', roboto.className)}>
            Carbon Calc
            {' '}
            <span className='text-secondary-300'>Quest</span>
          </h1>
        </Link>
        <div className='space-y-1'>
          {routes.map((route) => (
            <Link
              key={route.href}
              href={{
                pathname: route.href,
              }}
              className={cn('text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition text-white', pathname === route.href && 'bg-white/10')}
            >
              <div className='flex items-center flex-1'>
                <route.icon className={cn(route.color, 'h-5 w-5 mr-3')} />
                {route.name}
              </div>
            </Link>
          ))}
          {/** ADMIN SECTION  */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
