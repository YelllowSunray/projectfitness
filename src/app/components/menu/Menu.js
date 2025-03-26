"use client";

import React, {useState} from "react";
import Link from "next/link";
import Image from 'next/image'
import "./menu.css";
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Log', href: '/log' },
    { name: 'Photos', href: '/photos' },
    { name: 'Blog', href: '/blog' },
    { name: 'Form', href: '/form' },
    { name: 'Dreams', href: '/dreams' }
]

const Menu = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
      <header className="bg-gray-900">
    <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
      <div className="flex lg:flex-1">
        <Link href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Healty Brains</span>
          <Image
            src="/media/logo.png"
            alt=""
            className="h-8 w-auto"
            width='50'
            height='50'
            priority={false}
            style={{
                width: '80%',
                height: 'auto',
            }} 
          />
        </Link>
      </div>
      <div className="flex lg:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 hover:text-gray-300"
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
      </div>
      <div className="hidden lg:flex lg:gap-x-12">
        {navigation.map((item) => (
          <Link key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-300 hover:text-white">
            {item.name}
          </Link>
        ))}
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <Link href="/forum" className="text-sm/6 font-semibold text-gray-300 hover:text-white">
          Forum <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </nav>
    <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
      <div className="fixed inset-0 z-10" />
      <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-800">
        <div className="flex items-center justify-between">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="-m-2.5 rounded-md p-2.5 text-gray-400 hover:text-gray-300"
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-700">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="py-6">
              <Link
                href="/forum"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Forum
              </Link>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
  );
};

export default Menu;