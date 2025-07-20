import Contact from '@/components/Contact';
import { getContact } from '@/utils/api';
import { Metadata } from 'next';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: 'en' | 'zh' };
}): Promise<Metadata> {
  const data = await getContact('middleSchool');
  return {
    title: data?.seoTitle?.[lang] ?? 'Hankel',
    description: data?.seoDescription?.[lang] ?? 'Hankel',
    openGraph: {
      images: [data.banner.img],
    },
    robots: 'index, follow',
  };
}

export default function MiddleSchoolContact({
  params: { lang },
}: {
  params: { lang: 'en' | 'zh' };
}) {
  return <Contact lang={lang} name="middleSchool" type="subschool" />;
}
