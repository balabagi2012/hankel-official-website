"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import Typography from "../Typography";

export interface ContactFormProps {
  lang?: "zh" | "en";
  name: string;
}

const sendMail = async (
  subschool: string,
  from: string,
  to: string,
  name: string,
  phone: string,
  email: string,
  message: string
) => {
  const subject = `[Contact from ${subschool}] New message from ${email}`;
  const html = `<div>
  <p>Hi, the following message is from hankel website:</p>
  <br/>
  <br/>
  <B>${message}</B>
  <br/>
  <br/>
  <p>Best,</p>
  <p>${name}</p>
  <p>${phone}</p>
  <p>${email}</p>
</div>`;
  const res = await fetch(`/api/mail`, {
    cache: "no-cache",
    method: "POST",
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
    }),
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to send mail");
  }

  return res.json();
};

export default function ContactForm(props: ContactFormProps) {
  const { lang = "en", name } = props;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      mail: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    sendMail(
      name,
      "smtpshane@gmail.com",
      "balabagi2012@gmail.com",
      data.name,
      data.phone,
      data.mail,
      data.message
    )
      .then(() => window.alert("Successed to send mail"))
      .catch(() => window.alert("Failed to send mail"));
  };

  return (
    <div className="flex-1 ml-4 md:ml-0 mr-4 md:mr-0 flex flex-col pt-7 justify-between">
      <form className="flex flex-col md:flex-row gap-4 mb-5">
        <div className="flex flex-col flex-1">
          <div className="flex flex-row align-top">
            <Typography varient="h5" className="text-deepBlue">
              {lang === "zh" ? "名稱" : "Name"}
            </Typography>
            <Typography varient="h5" className="text-[#D40000]">
              *
            </Typography>
          </div>
          <input
            type="text"
            className="p-1 border rounded border-textGray h-9"
            {...register("name", { required: true, minLength: 2 })}
          />
          {errors.name && (
            <Typography varient="h6" className="text-[#D40000]">
              {lang === "zh"
                ? "名稱必須輸入並且需大於兩個字"
                : "Name has to be “required” and “minLength: 2”"}
            </Typography>
          )}
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex flex-row align-top gap-4">
            <Typography varient="h5" className="text-deepBlue">
              {lang === "zh" ? "電話" : "Phone"}
            </Typography>
            <Typography varient="h5" className="text-[#D40000]">
              *
            </Typography>
          </div>
          <input
            type="text"
            className="p-1 border rounded border-textGray h-9"
            {...register("phone", { required: true, minLength: 5 })}
          />
          {errors.phone && (
            <Typography varient="h6" className="text-[#D40000]">
              {lang === "zh" ? "電話格式錯誤" : "Phone Error"}
            </Typography>
          )}
        </div>
      </form>
      <div className="flex flex-1 flex-col mb-5">
        <div className="flex flex-row align-top gap-4">
          <Typography varient="h5" className="text-deepBlue">
            {lang === "zh" ? "信箱" : "Email"}
          </Typography>
          <Typography varient="h5" className="text-[#D40000]">
            *
          </Typography>
        </div>
        <input
          type="text"
          className="p-1 border rounded border-textGray"
          {...register("mail", {
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          })}
        />
        {errors.mail && (
          <Typography varient="h6" className="text-[#D40000]">
            {lang === "zh"
              ? "信箱必須為 [account]@[host]格式"
              : "Mail has to be [account]@[host]"}
          </Typography>
        )}
      </div>
      <div className="flex flex-1 flex-col mb-8">
        <div className="flex flex-row align-top">
          <Typography varient="h5" className="text-deepBlue">
            {lang === "zh" ? "訊息" : "Message"}
          </Typography>
          <Typography varient="h5" className="text-[#D40000]">
            *
          </Typography>
        </div>
        <textarea
          maxLength={500}
          className="p-1 border h-[130px] rounded border-textGray"
          {...register("message", { required: true, maxLength: 500 })}
        />
        {errors.message && (
          <Typography varient="h6" className="text-[#D40000]">
            {lang === "zh" ? "訊息必須輸入" : "Message has to be input"}
          </Typography>
        )}
      </div>
      <div
        className="bg-blue h-[44px] flex flex-row items-center justify-center rounded"
        onClick={handleSubmit(onSubmit)}
      >
        <Typography varient="h5" color="white">
          {lang === "zh" ? "寄出" : "Send"}
        </Typography>
      </div>
    </div>
  );
}
