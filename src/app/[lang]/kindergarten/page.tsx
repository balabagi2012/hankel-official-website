import Subschool from '@/components/Subschool';
import { getSubschool } from '@/utils/api';
import { Metadata } from 'next';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: 'en' | 'zh' };
}): Promise<Metadata> {
  const data = await getSubschool('kindergarten');
  return {
    title: data?.seoTitle?.[lang] ?? 'Hankel',
    description: data?.seoDescription?.[lang] ?? 'Hankel',
    openGraph: {
      images: [`https://www.hiape.ntpc.edu.tw${data?.banner}`],
    },
    robots: 'index, follow',
  };
}

export default function Kindergarten({
  params: { lang },
}: {
  params: { lang: 'en' | 'zh' };
}) {
  return <Subschool lang={lang} name="kindergarten" />;
}
