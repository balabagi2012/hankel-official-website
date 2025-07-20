import { Metadata } from 'next';

import Contact from '@/components/Contact';
import { getContact } from '@/utils/api';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: 'en' | 'zh' };
}): Promise<Metadata> {
  const data = await getContact('home');
  return {
    title: data?.seoTitle?.[lang] ?? 'Hankel',
    description: data?.seoDescription?.[lang] ?? 'Hankel',
    openGraph: {
      images: [data.banner.img],
    },
    robots: 'index, follow',
  };
}

export default function HomeContact({
  params: { lang },
}: {
  params: { lang: 'en' | 'zh' };
}) {
  return <Contact lang={lang} name="home" type="home" />;
}
