import Image from "next/image";
import Title from "../Title";
import Typography from "../Typography";
import facilitiyImg from "../../../public/facility/home.png";
import Card from "../Card";
export default function Facility() {
  return (
    <>
      <section className="flex flex-col py-[70px] items-center bg-gray">
        <div className="flex flex-col w-[700px]">
          <Title full align="center">
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
      </section>
      <section className="flex flex-col py-[70px] items-center bg-gray">
        <div className="flex flex-col w-[1268px]">
          <Title full align="left">
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
      </section>
    </>
  );
}
