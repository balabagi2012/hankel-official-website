import Image from 'next/image';
import Link from 'next/link';

import { ContactEntity } from '@/app/api/contact/route';

const getContact = async (
  name: string,
  lang: 'en' | 'zh'
): Promise<ContactEntity> => {
  const res = await fetch(
    `${process.env.API_URI}/api/contact/${name}?lang=${lang}`,
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

export interface FooterProps {
  lang: 'en' | 'zh';
  name?: string;
}

export default async function Footer(props: FooterProps) {
  const { lang = 'zh', name = 'home' } = props;
  const contact = await getContact(name, lang);

  return (
    <footer className="w-full md:h-[340px] bg-deepBlue flex flex-col md:flex-row px-3 py-10 md:px-[70px] md:py-[41px]">
      <div className="flex flex-col flex-1 items-stretch">
        <div className="flex flex-1 mb-[8px]">
          <Image
            src="/icons/logo_square.svg"
            alt="hankel footer logo"
            width="62"
            height="77"
            className="w-auto h-auto"
          ></Image>
        </div>
        <div className="flex md:hidden flex-row justify-center items-center mb-9">
          {contact?.address && (
            <iframe
              width="340"
              height="150"
              style={{ border: 0 }}
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAP_API_KEY}&q=${contact?.address[lang]}`}
            ></iframe>
          )}
        </div>
        <div className="text-white flex flex-1 mb-5 md:mb-0">
          {lang === 'zh' ? '電話 : ' : 'Phone : '}
          {contact?.phone ?? '02-2602-8000'}
        </div>
        <div className="text-white flex flex-1 mb-5 md:mb-0">
          {lang === 'zh' ? '信箱 : ' : 'Email : '}
          {contact?.email ?? 'hankel@heipe.edu.tw'}
        </div>
        <div className="text-white flex flex-1 mb-7 md:mb-0">
          {lang === 'zh' ? '地址 : ' : 'Address : '}
          {contact.address[lang] ??
            'No. 457, Section 2, Wenhua 3rd Rd, Linkou District, NewTaipei City, 244'}
        </div>
        <div className="flex flex-row flex-1 gap-x-6">
          {contact?.line && contact?.line?.length > 0 && (
            <Link href={contact.line} rel="noopener noreferrer">
              <Image
                src="/icons/Line.svg"
                alt="hankel line"
                width="24"
                height="24"
              ></Image>
            </Link>
          )}
          {contact?.instagram && contact?.instagram?.length > 0 && (
            <Link href={contact.instagram} rel="noopener noreferrer">
              <Image
                src="/icons/Instagram.svg"
                alt="hankel Instagram"
                width="24"
                height="24"
              ></Image>
            </Link>
          )}
          {contact?.facebook && contact?.facebook?.length > 0 && (
            <Link href={contact.facebook} rel="noopener noreferrer">
              <Image
                src="/icons/Facebook.svg"
                alt="hankel Facebook"
                width="24"
                height="24"
              ></Image>
            </Link>
          )}
          {contact?.youtube && contact?.youtube?.length > 0 && (
            <Link href={contact.youtube} rel="noopener noreferrer">
              <Image
                src="/icons/Youtube.svg"
                alt="hankel Youtube"
                width="24"
                height="24"
              ></Image>
            </Link>
          )}
        </div>
      </div>
      <div className="hidden md:flex flex-col">
        {contact?.address && (
          <iframe
            width="450"
            height="250"
            style={{ border: 0, marginLeft: 'auto' }}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAP_API_KEY}&q=${contact?.address[lang]}`}
          ></iframe>
        )}
      </div>
    </footer>
  );
}
