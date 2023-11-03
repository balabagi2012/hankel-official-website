import Image from "next/image";

export default function Banner() {
  return (
    <div className="w-full">
      <Image
        alt="Mountains"
        src="/bg_home.png"
        className="z-[-1]"
        quality={100}
        fill
        style={{
          objectFit: "cover",
        }}
      ></Image>
    </div>
  );
}
