"use client";
import { cookies } from "next/headers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Router from "next/router";
import { useForm } from "react-hook-form";

export default function AdminPage() {
  const { register, control, handleSubmit } = useForm({
    values: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const url = `/api/auth/login`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      return window.alert("Failed to login");
    }
    window.alert("Successed to login");
    router.push("/admin/home");
  };

  return (
    <main className="relative flex-row w-full h-full">
      <div className="flex flex-col w-full items-center h-full bg-gray-200">
        <div className="flex w-full bg-white py-4 px-8 shadow-md h-16 flex-row justify-end items-center">
          <div className="flex-1 flex items-center justify-between">
            <div className="flex-1 flex justify-start items-center mr-auto">
              <Image
                src="/icons/logo_square.svg"
                width={24}
                height={24}
                alt="logo"
              ></Image>
              <span className="text-xl font-semibold mx-2 text-gray-800">
                Landing Page
              </span>
            </div>
          </div>
          <button
            id="save-button"
            className="px-3 py-1 bg-deepBlue font-base text-white border border-gray-300 rounded-lg focus:outline-none"
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </button>
        </div>

        <div className="px-8 py-6 w-full h-screen bg-gray-200 overflow-scroll">
          <div className="bg-white px-6 py-3 rounded shadow mt-4">
            <div>
              <label>email</label>
              <input
                className="w-full border px-4 py-2 mb-4 mt-2"
                {...register("email", {
                  required: true,
                })}
              ></input>
            </div>
          </div>
          <div className="bg-white px-6 py-3 rounded shadow mt-4">
            <div>
              <label>password</label>
              <input
                type="password"
                className="w-full border px-4 py-2 mb-4 mt-2"
                {...register("password", {
                  required: true,
                })}
              ></input>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
