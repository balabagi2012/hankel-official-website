import { Metadata } from 'next';

import Subschool from '@/components/Subschool';
import { getSubschool } from '@/utils/api';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: 'en' | 'zh' };
}): Promise<Metadata> {
  const data = await getSubschool('elementary');
  return {
    title: data?.seoTitle?.[lang] ?? 'Hankel',
    description: data?.seoDescription?.[lang] ?? 'Hankel',
    openGraph: {
      images: [`https://www.hiape.ntpc.edu.tw${data?.banner}`],
    },
    robots: 'index, follow',
  };
}

export default function Elementary({
  params: { lang },
}: {
  params: { lang: 'en' | 'zh' };
}) {
  return <Subschool lang={lang} name="elementary" />;
}
