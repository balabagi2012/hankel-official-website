import { Metadata } from 'next';

import News from '@/components/News';

export const metadata: Metadata = {
  title: 'Hankel - News',
  robots: 'index, follow',
};

export default async function KindergartenNews({
  params: { lang },
}: {
  params: { lang: 'en' | 'zh' };
}) {
  return <News lang={lang} name={'kindergarten'} />;
}
