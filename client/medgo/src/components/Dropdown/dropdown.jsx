import { useState } from 'react';
import Link from 'next/link';

export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);


  const options = [
    { label: 'Login Médico', href: '/login-medico' },
    { label: 'Login ADM', href: '/login-adm' },
    { label: 'Login Consultório', href: '/login-consultorio' },
  ];

  return (
    <div style={{ position: 'relative', width: 200 }}>
      <button
        className="border titulo-cor-padrao-medgo px-2 py-1 rounded-4xl transition"
        onClick={() => setOpen(!open)}
      >
        {selected ?? 'Trabalha conosco?'}
      </button>

      {open && (
        <ul
          className="mt-1 rounded-2xl"
          style={{
            position: 'relative',
            backgroundColor: '#fff',
            border: '1px solid #0357c6',
            width: '100%',
          }}
        >
          {options.map((opt) => (
            <li key={opt.label} style={{ padding: 8 }}>
              <Link
                className="text-black hover:underline block"
                href={opt.href}
                onClick={() => {
                  setSelected(opt.label);
                  setOpen(false);
                }}
              >
                {opt.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

