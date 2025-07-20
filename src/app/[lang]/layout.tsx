import 'animate.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import '@/app/styles/globals.scss';

import dynamic from 'next/dynamic';

import { notoSans } from '@/app/styles/fonts';

const Header = dynamic(() => import('@/components/Header'), { ssr: false });

export default function RootLayout({
  params: { lang },
  children,
}: {
  children: React.ReactNode;
  params: { lang: 'en' | 'zh' };
}) {
  return (
    <html lang={lang === 'en' ? 'en' : 'zh-tw'}>
      <head>
        <link rel="icon" href="/uploads/favicon.ico" sizes="24x24" />
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-8VQ577VFZZ"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8VQ577VFZZ');
            `,
          }}
        />
        {/* End Google tag (gtag.js) */}
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-M8NLZHVX');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className={notoSans.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M8NLZHVX"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        {/* End Google Tag Manager (noscript) */}
        <Header />
        {children}
      </body>
    </html>
  );
}
