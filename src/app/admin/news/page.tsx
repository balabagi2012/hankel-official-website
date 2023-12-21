"use client";
import EditorComponent from "@/components/Editor";
import Typography from "@/components/Typography";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function CreateNewsPage() {
  const { register, control, handleSubmit } = useForm({
    values: {
      title: "",
      description: "",
      name: "dayCare",
      banner: "",
      content: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const uploadFile = async (file: File) => {
    setUploading(true);
    const url = `/api/file`;
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(url, {
      method: "POST",
      body: form,
    });
    setUploading(false);
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      return window.alert("Failed to upload file");
    }
    return res.json();
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    const url = `/api/news`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    setLoading(false);
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      return window.alert("Failed to post news");
    }
    window.alert("Successed to post news");
    window.location.href = "/admin";
  };

  return (
    <main className="relative flex-row w-full h-full">
      <div className="flex flex-col w-full items-center h-full bg-gray-200">
        <div className="flex w-full bg-white py-4 px-8 shadow-md h-16 flex-row justify-end items-center">
          <div className="flex-1 flex items-center justify-between p-4 ">
            <div className="flex-1 flex justify-start items-center mr-auto">
              <Link href="/admin" className="mr-2">
                <Typography varient="h2">{"<-"}</Typography>
              </Link>
              <Image
                src="/icons/logo_square.svg"
                width={24}
                height={24}
                alt="logo"
              ></Image>
              <span className="text-xl font-semibold mx-2 text-gray-800">
                Create News
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
                <label>title </label>
                <input
                  className="w-full border px-4 py-2 mb-4 mt-2"
                  {...register("title")}
                ></input>
              </div>
            </div>
            <div className="bg-white px-6 py-3 rounded shadow mt-4">
              <div>
                <label>description </label>
                <input
                  className="w-full border px-4 py-2 mb-4 mt-2"
                  {...register("description")}
                ></input>
              </div>
            </div>
            <div className="bg-white px-6 py-3 rounded shadow mt-4">
              <div>
                <label>category </label>
                <select
                  {...register("name")}
                  className="w-full border px-4 py-2 mb-4 mt-2"
                >
                  <option value="dayCare">dayCare</option>
                  <option value="kindergarten">kindergarten</option>
                  <option value="middleSchool">middleSchool</option>
                  <option value="elementary">elementary</option>
                </select>
              </div>
            </div>
            <div className="bg-white px-6 py-3 rounded shadow mt-4">
              <div>
                <label>banner </label>
                <Controller
                  name={"banner"}
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col items-start justify-start mt-2">
                      <input
                        className="w-full border px-4 py-2 mb-4 mt-2"
                        {...register("banner")}
                      ></input>
                      <input
                        type="file"
                        accept="images/*"
                        id={`file-${field.name}}`}
                        className="invisible h-0"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file) {
                            uploadFile(file).then((data) => {
                              field.onChange(data.file);
                            });
                          }
                        }}
                      />
                      {field.value && (
                        <Image
                          src={field.value}
                          alt={field.name}
                          width={500}
                          height={500}
                        />
                      )}
                      <button
                        className="bg-blue mt-1 px-2 py-2 rounded text-white"
                        disabled={uploading}
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          document
                            .getElementById(`file-${field.name}}`)
                            ?.click();
                        }}
                      >
                        {uploading ? "上傳圖片中" : "更換圖片"}
                      </button>
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="bg-white px-6 py-3 rounded shadow mt-4">
              <div>
                <label>content </label>
                <Controller
                  name={"content"}
                  control={control}
                  render={({ field }) => (
                    <EditorComponent
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                ></Controller>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
