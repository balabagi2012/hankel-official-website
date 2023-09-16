import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="relative mx-[80px] mt-[40px] flex flex-row items-center">
      <div className="flex items-center mr-auto">
        <Image src="/logo.svg" alt="hankel logo" width="62" height="77"></Image>
        <div className="text-white ml-[12px] text-lg">
          Hankel International Academy
        </div>
      </div>
      <div className="flex flex-row  items-center gap-x-[56px]">
        <Link
          href="/"
          className="text-base text-white"
          rel="noopener noreferrer"
        >
          <div className="text-base text-white">Home</div>
        </Link>
        <Link
          href="/about"
          className="text-base text-white"
          rel="noopener noreferrer"
        >
          <div className="text-base text-white">About</div>
        </Link>
        <Link
          href="/dayCare"
          className="text-base text-white"
          rel="noopener noreferrer"
        >
          <div className="text-base text-white">Day Care</div>
        </Link>
        <Link
          href="/elementary"
          className="text-base text-white"
          rel="noopener noreferrer"
        >
          <div className="text-base text-white">Elementary</div>
        </Link>
        <Link
          href="/kindergarten"
          className="text-base text-white"
          rel="noopener noreferrer"
        >
          <div className="text-base text-white">Kindergarten</div>
        </Link>
        <Link href="/middleSchool" className="" rel="noopener noreferrer">
          <div className="text-base text-white">Middle School</div>
        </Link>
      </div>
    </header>
  );
}
