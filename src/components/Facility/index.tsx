import Image from "next/image";
import Title from "../Title";
import Typography from "../Typography";
import facilitiyImg from "../../../public/facility/home.png";
import Card from "../Card";
import Banner from "../Banner";
import Section from "../Section";

export interface FacilityProps {
  type?: "kindergarten" | "subschool";
  banner?: string;
}

export default function Facility(props: FacilityProps) {
  const { type = "subschool", banner = "/banners/school.png" } = props;

  return (
    <main className="pt-[50px] md:pt-[200px]">
      <Banner size="small" src={banner}></Banner>
      <Section className="bg-gray">
        <div className="flex flex-col w-[700px]">
          <Title full align="center" type={type}>
            Appearance Overview
          </Title>
          <Typography varient="h5" className="text-textGray text-center">
            Here, we are dedicated to creating a warm and harmonious learning
            environment. The school interior is cozy and comfortable, with every
            classroom equipped with modern teaching facilities, including
            interactive whiteboards, multimedia projection equipment, promoting
            dynamic and interactive teaching. Additionally, we have a library,
            music classroom, and a vast activity area, providing students with
            diverse learning and exploration opportunities. 
          </Typography>
        </div>
        <div className="w-full mt-[50px]">
          <Image
            src={facilitiyImg}
            alt="hankel Facility"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          ></Image>
        </div>
      </Section>
      <Section className="bg-white">
        <div className="flex flex-col w-[1268px]">
          <Title full align="left" type={type}>
            Facilities
          </Title>
          <div className="flex flex-row justify-between">
            {[1, 2, 3].map((element) => (
              <Card
                key={` ${element}`}
                type="facility"
                img={`/facility/${element}.png`}
                alt={`hankel facility ${element}`}
                title="Coding in class"
                description={`Provide modern teaching equipment and an environment, including interactive whiteboards and multimedia projection equipment, promoting dynamic and interactive teaching. `}
              ></Card>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
