import { Seo } from "@/app/api/model";

interface SeoHeadingProps extends Seo {
  lang: "en" | "zh";
}

const SeoHeading = (props: SeoHeadingProps) => {
  return (
    <div className="hidden">
      {props?.h1?.[props.lang] && <h1>{props.h1[props.lang]}</h1>}
      {props?.h2?.[props.lang] && <h2>{props.h2[props.lang]}</h2>}
      {props?.h3?.[props.lang] && <h3>{props.h3[props.lang]}</h3>}
      {props?.h4?.[props.lang] && <h4>{props.h4[props.lang]}</h4>}
      {props?.h5?.[props.lang] && <h5>{props.h5[props.lang]}</h5>}
      {props?.h6?.[props.lang] && <h6>{props.h6[props.lang]}</h6>}
    </div>
  );
};

export default SeoHeading;
