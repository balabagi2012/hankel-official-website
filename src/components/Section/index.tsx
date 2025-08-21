export interface SectionProps {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
}

export default function Section({ children, className = '' }: SectionProps) {
  return (
    <section
      className={`text-center pt-8 md:pt-[66px] pb-10 md:pb-[115px] px-4 md:px-[80px] flex flex-col items-center ${className}`}
    >
      {children}
    </section>
  );
}
