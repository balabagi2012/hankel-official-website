import { Metadata } from 'next';

import NewsDetail from '@/components/NewsDetail';

export const metadata: Metadata = {
  title: 'Hankel - News',
  robots: 'index, follow',
};

export default async function NewsDetailPage({
  params: { id, lang },
}: {
  params: { id: string; lang: 'en' | 'zh' };
}) {
  return <NewsDetail id={id} lang={lang} />;
}
