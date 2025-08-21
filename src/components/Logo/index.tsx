'use client';
import Image from "next/image";
import { useEffect, useState } from 'react';

import { ContactEntity } from '@/app/api/contact/route';

const getContact = async (
  name: string,
  lang: 'en' | 'zh'
): Promise<ContactEntity> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URI}/api/contact/${name}?lang=${lang}`,
    {
      cache: 'no-cache',
    }
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export default function Logo(props: {
  name: string;
  lang: 'en' | 'zh';
}) {
  const { name, lang } = props;
  const [logoSrc, setLogoSrc] = useState(`/logo/${name}.svg`);
  
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const contact = await getContact(name, lang);
        if (contact.logo) {
          setLogoSrc(contact.logo);
        }
      } catch (error) {
        console.error('Failed to fetch logo:', error);
      }
    };
    
    fetchLogo();
  }, [name, lang]);
  
  return (
    <Image
      src={logoSrc}
      alt="hankel logo"
      className="w-full h-auto"
      width="238"
      height="50"
    />
  );
}