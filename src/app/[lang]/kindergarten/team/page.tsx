import Team from '@/components/Team';
import { getTeam } from '@/utils/api';
import { Metadata } from 'next';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: 'en' | 'zh' };
}): Promise<Metadata> {
  const data = await getTeam('kindergarten');
  return {
    title: data?.seoTitle?.[lang] ?? 'Hankel',
    description: data?.seoDescription?.[lang] ?? 'Hankel',
    openGraph: {
      images: [`https://www.hiape.ntpc.edu.tw${data.banner}`],
    },
    robots: 'index, follow',
  };
}

export default function KindergartenTeam({
  params: { lang },
}: {
  params: { lang: 'en' | 'zh' };
}) {
  return <Team type="kindergarten" lang={lang} name="kindergarten" />;
}
