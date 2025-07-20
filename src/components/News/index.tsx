import dynamic from 'next/dynamic';
import Head from 'next/head';

import { getNewsPageByName } from '@/utils/api';

import NewsList from '../NewsList';
import Section from '../Section';
import SeoHeading from '../SeoHeading';
import Title from '../Title';
const Banner = dynamic(() => import('../Banner'), { ssr: false });

const fetchLatestNews = async (name: string) => {
  const url = `${process.env.API_URI}/api/news?limit=16${
    name === 'home' ? '' : `&category=${name}`
  }`;
  const res = await fetch(url, {
    cache: 'no-cache',
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export interface NewsProps {
  name: string;
  lang: 'en' | 'zh';
}

export default async function News({ name, lang }: NewsProps) {
  const news = await fetchLatestNews(name);
  const newsPage = await getNewsPageByName(name);

  return (
    <main className="pt-[50px] md:pt-[80px]">
      <Head>
        <link rel="alternate" href={`/zh/${name}/news`} hrefLang="x-default" />
        <link rel="alternate" href={`/en/${name}/news`} hrefLang="en-US" />
        <link rel="alternate" href={`/zh/${name}/news`} hrefLang="zh-TW" />
      </Head>
      <Banner size="large" src={newsPage.banner} lang={lang}></Banner>
      <Section className="bg-bgGray">
        <SeoHeading {...newsPage} lang={lang} />
        <div className="flex flex-col w-full p-4 md:p-0">
          <div className="flex flex-row">
            <Title full align="left" lang={lang}>
              {newsPage?.title[lang] ?? 'News'}
            </Title>
          </div>
          <NewsList news={news} lang={lang} />
        </div>
      </Section>
    </main>
  );
}
