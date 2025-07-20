import News from '@/components/News';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hankel - News',
};

export default async function AfterSchoolNews({
  params: { lang },
}: {
  params: { lang: 'en' | 'zh' };
}) {
  return <News lang={lang} name={'afterSchool'} />;
}
