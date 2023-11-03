import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full h-[340px] bg-deepBlue flex flex-row px-[70px] py-[41px]">
      <div className="flex flex-col">
        <div>
          <Image
            src="/logo.svg"
            alt="hankel logo"
            width="62"
            height="77"
          ></Image>
        </div>
        <div>Phone : (02) 7751-9199</div>
        <div>Mail : hankel@heipe.edu.tw</div>
        <div>
          Adress : No. 457, Section 2, Wenhua 3rd Rd, Linkou District, New
          Taipei City, 244
        </div>
        <div>IG FB YT</div>
      </div>
      <div className="flex flex-col">
        <div>map</div>
        <div>© Copyright Jeffrey Sebastian Taiwan 2023</div>
        <div>
          Hankel International Academy Mockup site by Jeffrey Sebastian
          Multimedia studios 2023
        </div>
      </div>
    </footer>
  );
}
