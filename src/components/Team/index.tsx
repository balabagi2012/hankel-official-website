import Banner from "../Banner";
import Card from "../Card";
import Title from "../Title";
import Typography from "../Typography";

export interface TeamProps {
  type?: "kindergarten" | "subschool";
  banner?: string;
}

export default function Team(props: TeamProps) {
  const { type = "subschool", banner = "/banners/school.png" } = props;

  return (
    <main className="pt-[50px] md:pt-[200px]">
      <Banner size="small" src="/banners/school.png"></Banner>
      <section className="flex flex-col py-[70px] items-center bg-gray">
        <div className="flex flex-col w-[1068px]">
          <Title full align="center" type={type}>
            Leading Foreign team
          </Title>
          <Typography varient="h5" className="text-textGray text-center">
            Our international team comprises carefully selected experts with
            extensive teaching experience in Taiwan. Recruited from around the
            world, they undergo professional training plans, ensuring the
            quality and character of foreign teachers. We introduce certified
            international talents, offering dual-certified, high-quality
            international faculty and staff. 
          </Typography>
          <div className="flex flex-row justify-between mt-[70px]">
            {[1, 2, 3].map((element) => (
              <Card
                key={`team ${element}`}
                type="team"
                img={`/team/${element}.png`}
                alt={`hankel team ${element}`}
                title="Coding in class"
                tag="Teacher | Digital Content Director"
                description={`Provide modern teaching equipment and an environment, including interactive whiteboards and multimedia projection equipment, promoting dynamic and interactive teaching. `}
              ></Card>
            ))}
          </div>
        </div>
      </section>
      <section className="flex flex-col py-[70px] items-center bg-white">
        <div className="flex flex-col w-[1068px]">
          <Title full align="center" type={type}>
            Local Expert team
          </Title>
          <Typography varient="h5" className="text-textGray text-center">
            Our Taiwanese team consists of educational experts, aiming to
            provide each student with a tailored and high-quality education
            journey. With rich teaching experience, they provide the best
            teaching quality through collaborative curriculum preparation and
            teaching workshops. 
          </Typography>
          <div className="flex flex-row justify-between">
            {[1, 2, 3].map((element) => (
              <Card
                key={`team ${element + 3}`}
                type="team"
                img={`/team/${element}.png`}
                alt={`hankel team ${element + 3}`}
                title="Coding in class"
                tag="Teacher | Digital Content Director"
                description={`Provide modern teaching equipment and an environment, including interactive whiteboards and multimedia projection equipment, promoting dynamic and interactive teaching. `}
              ></Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
