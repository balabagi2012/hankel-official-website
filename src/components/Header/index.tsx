import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed start-0 w-full h-[80px] px-[80px] flex flex-row items-center bg-white">
      <div className="flex items-center mr-auto flex-1">
        <Image
          src="/logo.svg"
          alt="hankel logo"
          width="200"
          height="42"
        ></Image>
      </div>
      <div className="flex flex-row  items-center gap-x-[56px]">
        <Link href="/" className="text-base" rel="noopener noreferrer">
          <div className="text-base">Home</div>
        </Link>
        <Link href="/about" className="text-base" rel="noopener noreferrer">
          <div className="text-base">About</div>
        </Link>
        <Link href="/dayCare" className="text-base" rel="noopener noreferrer">
          <div className="text-base">Day Care</div>
        </Link>
        <Link
          href="/elementary"
          className="text-base"
          rel="noopener noreferrer"
        >
          <div className="text-base">Elementary</div>
        </Link>
        <Link
          href="/kindergarten"
          className="text-base"
          rel="noopener noreferrer"
        >
          <div className="text-base">Kindergarten</div>
        </Link>
        <Link href="/middleSchool" className="" rel="noopener noreferrer">
          <div className="text-base">Middle School</div>
        </Link>
      </div>
      <div className="ml-[80px] flex flex-row items-center">
        <Image
          src="/icons/LanguageOutlined.svg"
          alt="hankel language"
          width="24"
          height="24"
        ></Image>
        <div className="ml-1 mr-2 font-bold">EN</div>
        <Image
          src="/icons/ChevronTopFilled.svg"
          alt="hankel chevron right"
          width="24"
          height="24"
        ></Image>
      </div>
    </header>
  );
}
