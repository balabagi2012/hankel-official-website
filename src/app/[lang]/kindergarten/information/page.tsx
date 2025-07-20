import { Metadata } from 'next';

import Information from '@/components/Information';
import { getInformation } from '@/utils/api';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: 'en' | 'zh' };
}): Promise<Metadata> {
  const data = await getInformation('kindergarten');
  return {
    title: data?.seoTitle?.[lang] ?? 'Hankel',
    description: data?.seoDescription?.[lang] ?? 'Hankel',
    openGraph: {
      images: [`https://www.hiape.ntpc.edu.tw${data.banner}`],
    },
    robots: 'index, follow',
  };
}

export default function KindergartenInformation({
  params: { lang },
}: {
  params: { lang: 'en' | 'zh' };
}) {
  return <Information type="kindergarten" lang={lang} name="kindergarten" />;
}
