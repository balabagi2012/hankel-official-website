'use client';
import Image from 'next/image';
import { ReactElement, useEffect, useState } from 'react';

import { kindergarten } from '@/app/styles/fonts';

import Typography from '../Typography';

interface BannerProps {
  className?: string;
  size?: 'big' | 'large' | 'medium' | 'small';
  name?: string;
  src: string;
  title?: string;
  subtitle?: string;
  description?: string;
  children?: ReactElement;
  lang?: 'en' | 'zh';
  banners?: string[];
}
export default function Banner({
  className,
  title,
  description,
  src,
  subtitle,
  size = 'big',
  name,
  lang = 'en',
  banners = [],
  children,
}: BannerProps) {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (size === 'big') {
      const interval = setInterval(() => {
        setImgIndex((imgIndex + 1) % banners.length);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [size, banners, imgIndex]);

  if (size === 'big') {
    return (
      <div
        className={`w-full h-screen relative flex flex-row justify-center items-center ${
          className ?? ''
        }`}
      >
        <Image
          alt="banner home"
          src={banners[imgIndex]}
          className={`z-[-1] absolute w-auto h-auto object-center object-cover ${
            imgIndex % 2 === 1 ? 'animate__animated animate__fadeIn' : ''
          }`}
          quality={100}
          fill
        ></Image>
        <div className="z-[-1] absolute w-full h-full"></div>
        <div className="z-[-1] absolute w-full h-full md:h-fit md:w-[530px] pt-[50px] md:pt-[20px] pb-[32px] px-[16px] bg-[rgba(255,255,255,.8)] flex flex-col justify-center items-center">
          <Image
            alt="Mountains"
            src="/icons/logo_square.svg"
            quality={100}
            width={60}
            height={60}
            className="w-auto h-auto"
          ></Image>
          <div
            className={`text-deepBlue my-2 font-bold ${
              lang === 'en' ? 'font-serif' : ''
            } leading-[1.5] tracking-[1px] text-[32px] animate__animated animate__fadeIn`}
          >
            {title}
          </div>
          <div
            className={`text-deepBlue text-[16px] ${
              lang === 'en' ? 'font-serif' : ''
            } leading-[2] tracking-[1px] mb-3 text-justify animate__animated animate__fadeIn animate__delay-1s`}
          >
            {subtitle}
          </div>
          <div className="text-[14px] font-sans text-[#4E4E4E] leading-[1.8] text-left animate__animated animate__fadeIn animate__delay-1s whitespace-pre-line">
            {description}
          </div>
        </div>
        <div className="absolute z-[1] bottom-5">
          <div className="flex flex-row gap-x-2">
            {banners.map((banner, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded border border-white ${
                  index === imgIndex ? 'bg-white' : ''
                }`}
              ></div>
            ))}
          </div>
        </div>
        {children}
      </div>
    );
  }
  return (
    <div
      className={`w-full ${
        size === 'large'
          ? 'h-[233px] md:h-[420px]'
          : size === 'medium'
            ? 'h-[343px] md:h-[400px]'
            : 'h-[170px] md:h-[350px]'
      } relative flex flex-row justify-center items-center ${className ?? ''}`}
    >
      <Image
        alt="banner home"
        src={src}
        className="z-[-1] absolute w-auto h-auto object-center object-cover"
        quality={100}
        fill
      ></Image>
      <div className="z-[-1] absolute w-full h-full"></div>
      {size === 'large' && title && description && (
        <div className="z-[-1] absolute w-full px-4 md:px-[80px] flex flex-col justify-center items-start flex-1">
          <Typography
            varient="h2"
            className={`animate__animated animate__fadeIn ${
              lang === 'en' ? 'font-serif' : ''
            } text-white`}
          >
            {title}
          </Typography>
          <Typography
            varient="h5"
            className={`animate__animated animate__fadeIn animate__delay-1s ${
              lang === 'en' ? 'font-serif' : ''
            } text-white whitespace-pre-line`}
          >
            {description}
          </Typography>
        </div>
      )}
      {size === 'medium' && title && description && (
        <div className=" ml-[16px] md:ml-auto mr-[16px] md:mr-[76px] px-[52px] py-[28px] bg-[rgba(255,255,255,.7)] md:bg-white border-b border-blue border-l-8 relative">
          <Typography
            varient="h4"
            className={`${
              name === 'kindergarten'
                ? lang === 'en'
                  ? kindergarten.className
                  : ''
                : lang === 'en'
                  ? 'font-serif'
                  : ''
            } text-textGray`}
          >
            {title}
          </Typography>
          <Typography
            varient="h5"
            className={`${
              name === 'kindergarten' || lang === 'zh' ? '' : 'font-serif'
            }
              text-textGray text-right mt-[12px] whitespace-pre-line`}
          >
            {description}
          </Typography>
          <Image
            src="/icons/Quotes.svg"
            alt="hankel quote"
            width="41"
            height="35"
            className="absolute top-[-17px] left-[-23px]"
          ></Image>
        </div>
      )}
      {children}
    </div>
  );
}
