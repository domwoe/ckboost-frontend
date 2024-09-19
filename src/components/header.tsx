import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const menuItems = [
  { name: 'Base', href: '#' },
  { name: 'Wtf?', href: '#' },
  { name: 'Stats', href: '#' },

];

const Header: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-20 top-0 left-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="w-8 h-8 mr-3"
            aria-label="ckBoost logo"
          >
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#4a90e2', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#2c3e50', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <polygon
              points="50,10 20,90 50,70 80,90"
              fill="url(#grad1)"
              stroke="#2c3e50"
              strokeWidth="2"
            />
            <polygon
              points="50,10 35,50 50,40 65,50"
              fill="#ffffff"
              stroke="#2c3e50"
              strokeWidth="1"
            />
          </svg>
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            ckBoost
          </span>
        </a>
        <div className="flex md:order-2">
          <Button size="sm" className="mr-2 hidden sm:block">
            Become a booster
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;