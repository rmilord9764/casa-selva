'use client';
import React, { useState } from 'react';

const LINKS = [
  { href: '#experiencia', label: 'Experience' },
  { href: '#servicios', label: 'Services' },
  { href: '#galeria', label: 'Gallery' },
  { href: '#contacto', label: 'Contact' },
  ];

export default function MobileNav() {
    const [open, setOpen] = useState(false);

  return React.createElement(
        'div',
    { className: 'md:hidden' },
        React.createElement(
                'button',
          {
                    'aria-label': 'Toggle menu',
                    onClick: () => setOpen((o) => !o),
                    className: 'text-2xl leading-none text-[#f7f3ec]',
          },
                open ? '\u2715' : '\u2630'
              ),
        open && React.createElement(
                'div',
          { className: 'absolute inset-x-0 top-full flex flex-col gap-6 bg-[#3a2e22] px-6 py-8 text-sm uppercase tracking-widest text-[#f7f3ec]' },
                LINKS.map((l) => React.createElement(
                          'a',
                  {
                              key: l.href,
                              href: l.href,
                              onClick: () => setOpen(false),
                              className: 'transition hover:text-[#d8c7a8]',
                  },
                          l.label
                        ))
              )
      );
}
