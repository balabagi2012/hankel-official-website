import Curriculum from '@/components/Curriculum';
import { getCurriculum } from '@/utils/api';
import { Metadata } from 'next';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: 'en' | 'zh' };
}): Promise<Metadata> {
  const data = await getCurriculum('highSchool');
  return {
    title: data?.seoTitle?.[lang] ?? 'Hankel',
    description: data?.seoDescription?.[lang] ?? 'Hankel',
    openGraph: {
      images: [`https://www.hiape.ntpc.edu.tw${data.banner}`],
    },
    robots: 'index, follow',
  };
}

export default function HighSchoolCurriculum({
  params: { lang },
}: {
  params: { lang: 'en' | 'zh' };
}) {
  return (
    <Curriculum lang={lang} name="highSchool" type="subschool"></Curriculum>
  );
}
