import { FacilityEntity } from '@/app/api/facility/route';
import { chunk } from 'lodash';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Card from '../Card';
import Footer from '../Footer';
import Section from '../Section';
import Title from '../Title';
import Typography from '../Typography';
import Head from 'next/head';
import { getFacility } from '@/utils/api';
import SeoHeading from '../SeoHeading';

const Banner = dynamic(() => import('../Banner'), { ssr: false });

export interface FacilityProps {
  type?: 'kindergarten' | 'subschool';
  name: string;
  lang: 'en' | 'zh';
}

export default async function Facility(props: FacilityProps) {
  const { type = 'subschool', lang, name } = props;
  const facility = await getFacility(name);
  return (
    <main className="pt-[50px] md:pt-[200px]">
      <Head>
        <link
          rel="alternate"
          href={`/zh/${name}/facilities`}
          hrefLang="x-default"
        />
        <link
          rel="alternate"
          href={`/en/${name}/facilities`}
          hrefLang="en-US"
        />
        <link
          rel="alternate"
          href={`/zh/${name}/facilities`}
          hrefLang="zh-TW"
        />
        <link rel="canonical" href={`/${lang}/${name}/facilities`} />
      </Head>
      <Banner size="small" src={facility.banner} lang={lang}></Banner>
      <Section className="bg-bgGray">
        <SeoHeading {...facility} lang={lang} />
        <div className="flex flex-col w-full md:w-[700px]">
          <Title full align="center" type={type} lang={lang}>
            {facility.title[lang]}
          </Title>
          <Typography
            varient="h5"
            className="text-textGray text-left whitespace-pre-line"
          >
            {facility.description[lang]}
          </Typography>
        </div>
        <div className="w-full mt-[50px]">
          <Image
            src={facility.facilityImg}
            alt="hankel Facility Image"
            width="1024"
            height="400"
            className={`w-full h-auto ${
              name === 'kindergarten' ? 'rounded-3xl' : ''
            }`}
          ></Image>
        </div>
      </Section>
      <Section className="bg-white">
        <div className="flex flex-col w-full lg:w-[1268px]">
          <Title full align="left" type={type} lang={lang}>
            {facility.facilityTitle[lang]}
          </Title>
          {chunk(facility.facilities, 3).map((chunk, chunkIndex) => (
            <div
              key={`facility-chunk-${chunkIndex}`}
              className="w-full flex flex-col md:flex-row md:flex-wrap items-center md:items-start"
            >
              {chunk.map((element, index) => (
                <Card
                  key={`facility-chunk-${chunkIndex}-${index}`}
                  type={`facility${
                    name === 'kindergarten' ? `-kindergarten` : ''
                  }`}
                  img={element.img}
                  alt={`hankel facility ${index}`}
                  title={element.title[lang]}
                  description={element.description[lang]}
                  lang={lang}
                ></Card>
              ))}
            </div>
          ))}
        </div>
      </Section>
      <Footer lang={lang} name={name} />
    </main>
  );
}
