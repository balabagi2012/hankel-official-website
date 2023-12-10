import Typography from "../Typography";

export default function ContactForm() {
  return (
    <div className="flex-1 ml-4 md:ml-[70px] mr-4 md:mr-0 flex flex-col pt-7 justify-between">
      <div className="flex flex-col md:flex-row gap-4 mb-5">
        <div className="flex flex-col flex-1">
          <div className="flex flex-row align-top">
            <Typography varient="h5" className="text-deepBlue">
              Name
            </Typography>
            <Typography varient="h5" className="text-[#D40000]">
              *
            </Typography>
          </div>
          <input type="text" className="border rounded border-textGray h-9" />
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex flex-row align-top gap-4">
            <Typography varient="h5" className="text-deepBlue">
              Phone
            </Typography>
            <Typography varient="h5" className="text-[#D40000]">
              *
            </Typography>
          </div>
          <input type="text" className="border rounded border-textGray h-9" />
        </div>
      </div>
      <div className="flex flex-1 flex-col mb-5">
        <div className="flex flex-row align-top gap-4">
          <Typography varient="h5" className="text-deepBlue">
            Email
          </Typography>
          <Typography varient="h5" className="text-[#D40000]">
            *
          </Typography>
        </div>
        <input type="text" className="border rounded border-textGray" />
      </div>
      <div className="flex flex-1 flex-col mb-8">
        <div className="flex flex-row align-top">
          <Typography varient="h5" className="text-deepBlue">
            Message
          </Typography>
          <Typography varient="h5" className="text-[#D40000]">
            *
          </Typography>
        </div>
        <textarea className="border h-[130px] rounded border-textGray" />
      </div>
      <div className="bg-blue h-[44px] flex flex-row items-center justify-center rounded">
        <Typography varient="h5" color="white">
          Send
        </Typography>
      </div>
    </div>
  );
}
