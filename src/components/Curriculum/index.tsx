import Image from "next/image";
import Card from "../Card";
import Title from "../Title";
import Typography from "../Typography";

export interface CurriculumProps {
  type?: "kindergarten";
}
export default function Curriculum(props: CurriculumProps) {
  const { type = "" } = props;

  return (
    <>
      <section className="flex flex-col py-[70px] items-center bg-gray">
        <div className="flex flex-col w-[700px]">
          <Title full align="center" type={type}>
            Our Curriculum
          </Title>
          <Typography varient="h5" className="text-textGray text-center">
            {`At Hankel Education, our curriculum goes beyond traditional
            education. We offer diverse English instruction, STEM, Information
            Technology, Mathematics, and Physical Education programs, sparking
            students' curiosity, innovative spirit, and problem-solving
            abilities. We are committed to fostering a global perspective,
            providing students with rich multicultural experiences, preparing
            them for the international professional world. Besides academic
            excellence, we teach students crucial life skills such as decision
            making, interpersonal, and self-awareness building skills. These and
            other skills will help instill confidence in them to adapt
            effortlessly to future workplaces and diverse environments, becoming
            professionals with a global vision. At our school, we not only shape
            students but also nurture them into individuals who positively
            impact the increasingly interconnected world.`}
          </Typography>
        </div>
      </section>
      <section className="flex flex-col py-[70px] items-center bg-white">
        <div className="flex flex-col w-[1268px]">
          <Title full align="left" type={type}>
            Curriculum
          </Title>
          <div className="flex flex-row justify-between">
            {[1, 2, 3, 4].map((element) => (
              <Card
                key={`curriculum ${element}`}
                type="curriculum"
                img={`/curriculum/${element}.png`}
                alt={`hankel curriculum ${element}`}
                title="Coding in class"
                description={`Provide modern teaching equipment and an environment, including interactive whiteboards and multimedia projection equipment, promoting dynamic and interactive teaching. `}
              ></Card>
            ))}
          </div>
          <div className="flex flex-row justify-between mt-10">
            {[5, 6].map((element) => (
              <Card
                key={`curriculum ${element}`}
                type="curriculum"
                img={`/curriculum/${element}.png`}
                alt={`hankel curriculum ${element}`}
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
