"use client";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CreateEventPage() {
  const { register, control, handleSubmit } = useForm({
    values: {
      title: { zh: "", en: "" },
      category: "afterSchool",
      date: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setLoading(true);
    const url = `/api/event`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    setLoading(false);
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      return window.alert("Failed to post event");
    }
    window.alert("Successed to post event");
    router.push("/admin/event");
  };

  return (
    <main className="relative flex-row w-full h-full">
      <div className="flex flex-col w-full items-center h-full bg-gray-200">
        <div className="flex w-full bg-white py-4 px-8 shadow-md h-16 flex-row justify-end items-center">
          <div className="flex-1 flex items-center justify-between">
            <div className="flex-1 flex justify-start items-center mr-auto">
              <Link href="/admin/event" className="mr-2">
                <ArrowLeftIcon className="w-6 h-6" />
              </Link>
              <Image
                src="/icons/logo_square.svg"
                width={24}
                height={24}
                alt="logo"
              ></Image>
              <span className="text-xl font-semibold mx-2 text-gray-800">
                Create Event
              </span>
            </div>
          </div>
          <button
            id="save-button"
            className="px-3 py-1 bg-deepBlue font-base text-white border border-gray-300 rounded-lg focus:outline-none"
            onClick={handleSubmit(onSubmit)}
          >
            Create
          </button>
        </div>
        {loading ? (
          <div className="px-8 py-6 w-full h-screen bg-gray-200 overflow-scroll">
            Loading...
          </div>
        ) : (
          <div className="px-8 py-6 w-full h-screen bg-gray-200 overflow-scroll">
            <div className="bg-white px-6 py-3 rounded shadow mt-4">
              <div>
                <label>title[中文]</label>
                <input
                  className="w-full border px-4 py-2 mb-4 mt-2"
                  {...register("title.zh", {
                    required: true,
                  })}
                ></input>
              </div>
            </div>
            <div className="bg-white px-6 py-3 rounded shadow mt-4">
              <div>
                <label>title[EN]</label>
                <input
                  className="w-full border px-4 py-2 mb-4 mt-2"
                  {...register("title.en", {
                    required: true,
                  })}
                ></input>
              </div>
            </div>
            <div className="bg-white px-6 py-3 rounded shadow mt-4">
              <div>
                <label>Date</label>
                <input
                  type="date"
                  className="w-full border px-4 py-2 mb-4 mt-2"
                  {...register("date", {
                    required: true,
                  })}
                ></input>
              </div>
            </div>
            <div className="bg-white px-6 py-3 rounded shadow mt-4">
              <div>
                <label>category</label>
                <select
                  {...register("category")}
                  className="w-full border px-4 py-2 mb-4 mt-2"
                >
                  <option value="afterSchool">afterSchool</option>
                  <option value="kindergarten">kindergarten</option>
                  <option value="highSchool">highSchool</option>
                  <option value="elementary">elementary</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
