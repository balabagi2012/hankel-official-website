import { ContactEntity } from '@/app/api/contact/route';
import { kindergarten } from '@/app/styles/fonts';
import { getSubschool } from '@/utils/api';
import { chunk } from 'lodash';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import Card from '../Card';
import ContactForm from '../ContactForm';
import ContactInfo from '../ContactInfo';
import Footer from '../Footer';
import LatestNews from '../LatestNews';
import Section from '../Section';
import Title from '../Title';
import Typography from '../Typography';
import SeoHeading from '../SeoHeading';

const Banner = dynamic(() => import('../Banner'), { ssr: false });

interface SubschoolProps {
  name:
    | 'afterSchool'
    | 'elementary'
    | 'kindergarten'
    | 'highSchool'
    | 'middleSchool';
  lang: 'en' | 'zh';
}

const getContact = async (name: string): Promise<ContactEntity> => {
  const res = await fetch(`${process.env.API_URI}/api/contact/${name}`, {
    cache: 'no-cache',
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

interface InstagramPost {
  id: string;
  media_url: string;
}

interface InstagramPostsResponse {
  data: InstagramPost[];
}

const getInstagramPosts = async (
  name: string,
  facebook: string,
  accessToken: string,
  expireTime: number
): Promise<InstagramPostsResponse> => {
  try {
    const now = Date.now();
    let token = accessToken;
    const day = 1000 * 60 * 60 * 24 * 7;
    if (now > (expireTime ?? now) - day) {
      const res = await fetch(
        `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`,
        {
          cache: 'no-cache',
        }
      );
      if (!res.ok) {
        return { data: [] };
      }
      const result = await res.json();
      await fetch(`${process.env.API_URI}/api/subschool/${name}`, {
        cache: 'no-cache',
        method: 'PATCH',
        body: JSON.stringify({
          socialMedia: {
            facebook,
            instagram: result.access_token,
            instagramExpireTime: now + result.expires_in * 1000,
          },
        }),
      });
      token = result.access_token;
      console.log(result);
    }
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url&access_token=${token}`,
      {
        cache: 'no-cache',
      }
    );
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
    const igPosts = await res.json();
    return {
      data: igPosts.data.filter(
        (item: any) =>
          item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM'
      ),
    };
  } catch (error) {
    return { data: [] };
  }
};

const getSubschoolData = async (name: string) => {
  const [subschool, contact] = await Promise.all([
    getSubschool(name),
    getContact(name),
  ]);

  const instagramPosts = await getInstagramPosts(
    name,
    subschool.socialMedia.facebook,
    subschool.socialMedia.instagram,
    subschool.socialMedia.instagramExpireTime
  );

  return {
    ...subschool,
    contact,
    instagramPosts,
  };
};

export default async function Subschool(props: SubschoolProps) {
  const { name, lang } = props;

  const data = await getSubschoolData(name);

  return (
    <main className="pt-[50px] md:pt-[200px]">
      <Head>
        <link rel="alternate" href={`/zh/${name}`} hrefLang="x-default" />
        <link rel="alternate" href={`/en/${name}`} hrefLang="en-US" />
        <link rel="alternate" href={`/zh/${name}`} hrefLang="zh-TW" />
      </Head>
      <Banner size="small" src={data.banner} lang={lang} />
      <Section className="bg-bgGray">
        <SeoHeading {...data} lang={lang} />
        <Title align="center" type={name} lang={lang}>
          {data.title[lang]}
        </Title>
        <div className="w-full md:w-[1024px] flex-col items-center">
          <Typography varient="h5" className="mb-[80px] text-left">
            {data.description[lang]}
          </Typography>
          {chunk(data.experiences, 3).map((element, index) => (
            <div
              key={'course-chunk' + index}
              className="flex flex-col items-center md:items-start md:flex-row md:justify-start gap-4 w-full"
            >
              {element.map((element, index) => (
                <Card
                  key={`experience ${index}`}
                  type={`course${
                    name === 'kindergarten' ? `-kindergarten` : ''
                  }`}
                  img={element.img}
                  alt={element.title[lang]}
                  title={element.title[lang]}
                  description={element.description[lang]}
                  lang={lang}
                ></Card>
              ))}
            </div>
          ))}
        </div>
      </Section>
      <Banner
        size="medium"
        src={data.subBanner.img}
        title={data.subBanner.title[lang]}
        description={data.subBanner.description[lang]}
        name={name}
        lang={lang}
      ></Banner>
      <LatestNews lang={lang} name={name} className="bg-white" />
      <Section className="bg-bgGray">
        <Title align="center" type={name} lang={lang}>
          {lang === 'en' ? 'Social Media Post' : '社群媒體'}
        </Title>
        <div className="flex flex-col md:flex-row mb-[52px] gap-4">
          <div className="flex flex-col">
            <Typography
              varient="h2"
              className={`font-serif text-deepBlue mb-5 ${
                name === 'kindergarten' ? kindergarten.className : ''
              }`}
            >
              Instagram
            </Typography>
            <div className="flex flex-col gap-y-5">
              <div className="flex flex-row flex-1 flex-wrap gap-5 justify-between">
                {data?.instagramPosts?.data?.slice(0, 4).map((post) => (
                  <Image
                    key={post.id}
                    src={post.media_url}
                    alt={post.id}
                    width="200"
                    height="200"
                    className="w-[160px] h-[160px] md:w-[200px] md:h-[200px]"
                  ></Image>
                ))}
              </div>
              <div className="flex flex-row flex-1 flex-wrap gap-5 justify-between">
                {data?.instagramPosts?.data?.slice(4, 8).map((post) => (
                  <Image
                    key={post.id}
                    src={post.media_url}
                    alt={post.id}
                    width="200"
                    height="200"
                    className="w-[160px] h-[160px] md:w-[200px] md:h-[200px]"
                  ></Image>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Typography
              varient="h2"
              className={`text-deepBlue mb-5 ${
                name === 'kindergarten'
                  ? kindergarten.className
                  : lang === 'en'
                    ? 'font-serif'
                    : ''
              }`}
            >
              Facebook
            </Typography>
            <iframe
              src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com/${data.socialMedia.facebook}&tabs=timeline&width=280&height=420&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=1540608879363126`}
              width="280"
              height="420"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          </div>
        </div>
      </Section>
      <Section>
        <div className="flex flex-col md:flex-row w-full lg:w-[1024px]">
          <ContactInfo
            lang={lang}
            type={name === 'kindergarten' ? 'kindergarten' : 'subschool'}
            contact={data.contact}
          />
          <ContactForm lang={lang} name={name} mail={data.contact.email} />
        </div>
      </Section>
      <Footer lang={lang} name={name} />
    </main>
  );
}
