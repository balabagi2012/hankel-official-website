import { Metadata } from 'next';

import Curriculum from '@/components/Curriculum';
import { getCurriculum } from '@/utils/api';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: 'en' | 'zh' };
}): Promise<Metadata> {
  const data = await getCurriculum('elementary');
  return {
    title: data?.seoTitle?.[lang] ?? 'Hankel',
    description: data?.seoDescription?.[lang] ?? 'Hankel',
    openGraph: {
      images: [`https://www.hiape.ntpc.edu.tw${data.banner}`],
    },
    robots: 'index, follow',
  };
}

export default function ElementaryCurriculum({
  params: { lang },
}: {
  params: { lang: 'en' | 'zh' };
}) {
  return (
    <Curriculum lang={lang} name="elementary" type="subschool"></Curriculum>
  );
}
