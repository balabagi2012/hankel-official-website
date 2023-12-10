import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full md:h-[340px] bg-deepBlue flex flex-col md:flex-row px-3 py-10 md:px-[70px] md:py-[41px]">
      <div className="flex flex-col flex-1 items-stretch">
        <div className="flex flex-1 mb-[8px]">
          <Image
            src="/logo_square.svg"
            alt="hankel footer logo"
            width="62"
            height="77"
          ></Image>
        </div>
        <div className="flex md:hidden flex-row justify-center items-center mb-9">
          <iframe
            width="340"
            height="150"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAP_API_KEY}&q=Hankel+International+Academy,New Taipei+Taiwan`}
          ></iframe>
        </div>
        <div className="text-white flex flex-1 mb-5 md:mb-0">
          Phone : (02) 7751-9199
        </div>
        <div className="text-white flex flex-1 mb-5 md:mb-0">
          Mail : hankel@heipe.edu.tw
        </div>
        <div className="text-white flex flex-1 mb-7 md:mb-0">
          Adress : No. 457, Section 2, Wenhua 3rd Rd, Linkou District, New
          Taipei City, 244
        </div>
        <div className="flex flex-row flex-1">
          <Image
            src="/icons/Instagram.svg"
            alt="hankel Instagram"
            width="24"
            height="24"
            className="mr-[24px]"
          ></Image>
          <Image
            src="/icons/Facebook.svg"
            alt="hankel Facebook"
            width="24"
            height="24"
            className="mr-[24px]"
          ></Image>
          <Image
            src="/icons/Youtube.svg"
            alt="hankel Youtube"
            width="24"
            height="24"
          ></Image>
        </div>
      </div>
      <div className="hidden md:flex flex-col">
        <iframe
          width="450"
          height="250"
          style={{ border: 0, marginLeft: "auto" }}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAP_API_KEY}&q=Hankel+International+Academy,New Taipei+Taiwan`}
        ></iframe>
      </div>
    </footer>
  );
}
