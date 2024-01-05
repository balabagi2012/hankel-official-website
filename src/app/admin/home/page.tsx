"use client";

import { Program } from "@/app/api/home/route";
import LangSwitch from "@/components/LangSwitch";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

export default function AdminHomePage() {
  const pageName = "home";
  const tabList = useMemo(() => ["banner", "program", "subBanner"], []);
  const [activePageData, setActivePageData] = useState([] as any);
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const activeTabData = useMemo(() => activePageData, [activePageData]);
  const [lang, setLang] = useState<"en" | "zh">("en");

  const keyList = useMemo(() => {
    switch (activeTab) {
      case "banner":
        return ["title", "subtitle", "banner", "description"];
      case "program":
        return ["programTitle", "programs"];
      case "subBanner":
      default:
        return ["subBanner"];
    }
  }, [activeTab]);

  const { register, control, handleSubmit } = useForm({
    values: activeTabData,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "programs",
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    setLoading(true);
    const url = `/api/${pageName}`;
    const { _id, ...body } = data;
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    setLoading(false);
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      return window.alert("Failed to update data");
    }
    loadPageData();
    return window.alert("Successed to update data");
  };

  const fetchPageData = async () => {
    const url = `/api/${pageName}`;
    const res = await fetch(url, {
      cache: "no-cache",
    });
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };

  const loadPageData = useCallback(async () => {
    setLoading(true);
    fetchPageData().then((data) => {
      setActivePageData(data);
      setActiveTab(tabList[0]);
      setLoading(false);
    });
  }, [tabList]);

  useEffect(() => {
    loadPageData();
  }, [loadPageData]);

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

  const renderTable = (key: string) => {
    switch (key) {
      case "banner":
        return (
          <div className="mt-4 align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
            <div className="bg-white flex flex-row items-center">
              <p
                className={`px-6 py-4 inline-flex text-2xl font-bold leading-5 `}
              >
                Banner
              </p>
            </div>
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3 text-left font-medium">
                    Title[{lang}]
                  </th>
                  <th className="px-6 py-3 text-left font-medium">
                    Subtitle[{lang}]
                  </th>
                  <th className="px-6 py-3 text-left font-medium">
                    Description[{lang}]
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <textarea
                      className="text-sm leading-5 text-gray-900 w-full border"
                      {...register(`title[${lang}]`)}
                    ></textarea>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <textarea
                      className="text-sm leading-5 text-gray-900 w-full border"
                      {...register(`subtitle[${lang}]`)}
                    ></textarea>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <textarea
                      className="text-sm leading-5 text-gray-900 w-full border"
                      {...register(`description[${lang}]`)}
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3 text-left font-medium">
                    Banner [1440x811]
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td
                    key="banner"
                    className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 flex flex-col items-start justify-start"
                  >
                    <Controller
                      name={"banner"}
                      control={control}
                      render={({ field }) => (
                        <div className="flex-1 flex flex-col items-start justify-start">
                          <input
                            className="w-full border px-4 py-2 mb-4 mt-2"
                            value={field.value}
                            onChange={(event) => {
                              field.onChange(event.target.value);
                            }}
                          ></input>
                          <input
                            type="file"
                            accept="images/*"
                            id={`file-banner`}
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
                          {field.value &&
                            (field.value.startsWith("/") ||
                              field.value.startsWith("http")) && (
                              <Image
                                width={500}
                                height={500}
                                alt={field.value}
                                src={field.value}
                              />
                            )}
                          <button
                            className="bg-blue mt-1 px-2 py-2 rounded text-white"
                            disabled={uploading}
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              document.getElementById(`file-banner`)?.click();
                            }}
                          >
                            {uploading ? "上傳圖片中" : "更換圖片"}
                          </button>
                        </div>
                      )}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case "program":
        return (
          <div className="mt-4 align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
            <div className="bg-white flex flex-row items-center">
              <p
                className={`px-6 py-4 inline-flex text-2xl font-bold leading-5 `}
              >
                Programs
              </p>
            </div>
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3 text-left font-medium">
                    Program Title[{lang}]
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <textarea
                      className="text-sm leading-5 text-gray-900 w-full border"
                      {...register(`programTitle[${lang}]`)}
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="w-full overflow-scroll">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3 text-left font-medium">
                    Title[{lang}]
                  </th>
                  <th className="px-6 py-3 text-left font-medium">
                    Content[{lang}]
                  </th>
                  <th className="px-6 py-3 text-left font-medium">Line</th>
                  <th className="px-6 py-3 text-left font-medium">Facebook</th>
                  <th className="px-6 py-3 text-left font-medium">Instagram</th>
                  <th className="px-6 py-3 text-left font-medium">Youtube</th>
                  <th className="px-6 py-3 text-left font-medium"></th>
                </tr>
              </thead>
              <tbody className="w-full bg-white overflow-scroll">
                {(fields as unknown as Program[])?.map(
                  (program: Program, index: number) => (
                    <tr key={`program-${index}`}>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <input
                          className="text-sm leading-5 text-gray-900 border"
                          {...register(`programs.${index}.title.${lang}`, {
                            required: true,
                          })}
                        ></input>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <textarea
                          className="text-sm leading-5 text-gray-900 w-[400px] border"
                          {...register(`programs.${index}.content.${lang}`, {
                            required: true,
                          })}
                        ></textarea>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <input
                          className="text-sm leading-5 text-gray-900 border"
                          {...register(`programs.${index}.line`)}
                        ></input>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <input
                          className="text-sm leading-5 text-gray-900 border"
                          {...register(`programs.${index}.facebook`)}
                        ></input>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                        <input
                          className="text-sm leading-5 text-gray-900 border"
                          {...register(`programs.${index}.instagram`)}
                        ></input>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                        <input
                          className="text-sm leading-5 text-gray-900 border"
                          {...register(`programs.${index}.youtube`)}
                        ></input>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        );
      case "subBanner":
      default:
        return (
          <div className="mt-4 align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
            <div className="bg-white flex flex-row items-center">
              <p
                className={`px-6 py-4 inline-flex text-2xl font-bold leading-5 `}
              >
                SubBanner
              </p>
            </div>
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3 text-left font-medium">
                    Title[{lang}]
                  </th>
                  <th className="px-6 py-3 text-left font-medium">
                    Description[{lang}]
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <textarea
                      className="text-sm leading-5 text-gray-900 w-full border"
                      {...register(`subBanner.title[${lang}]`)}
                    ></textarea>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <textarea
                      className="text-sm leading-5 text-gray-900 w-full border"
                      {...register(`subBanner.description[${lang}]`)}
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3 text-left font-medium">
                    subBanner Img [1440x396]
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td
                    key="subBanner"
                    className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 flex flex-col items-start justify-start"
                  >
                    <Controller
                      name={"subBanner.img"}
                      control={control}
                      render={({ field }) => (
                        <div className="flex-1 flex flex-col items-start justify-start">
                          <input
                            className="w-full border px-4 py-2 mb-4 mt-2"
                            value={field.value}
                            onChange={(event) => {
                              field.onChange(event.target.value);
                            }}
                          ></input>
                          <input
                            type="file"
                            accept="images/*"
                            id={`file-subBanner`}
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
                          {field.value &&
                            (field.value.startsWith("/") ||
                              field.value.startsWith("http")) && (
                              <Image
                                width={500}
                                height={500}
                                alt={field.value}
                                src={field.value}
                              />
                            )}
                          <button
                            className="bg-blue mt-1 px-2 py-2 rounded text-white"
                            disabled={uploading}
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              document
                                .getElementById(`file-subBanner`)
                                ?.click();
                            }}
                          >
                            {uploading ? "上傳圖片中" : "更換圖片"}
                          </button>
                        </div>
                      )}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col w-full items-center h-full ">
      <div className="fixed left-64 right-0">
        <div className="flex bg-white py-4 px-8 shadow-md h-16 flex-row justify-end items-center">
          <div className="flex-1 flex items-center justify-between">
            <div className="flex-1 flex justify-start items-center mr-auto">
              <Image
                src="/icons/logo_square.svg"
                width={24}
                height={24}
                alt="logo"
              ></Image>
              <span className="text-xl font-semibold mx-2 text-gray-800">
                Home
              </span>
            </div>
          </div>
          <button
            id="save-button"
            disabled={loading}
            className="px-3 py-1 bg-deepBlue font-base text-white border border-gray-300 rounded-lg focus:outline-none"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-6 px-8 w-full bg-white mt-16">
        {tabList.map((tab: string) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 px-2 font-serif ${
              tab === activeTab
                ? "font-bold border-b-2 border-deepBlue text-blue"
                : "text-blue"
            }`}
          >
            {tab}
          </button>
        ))}
        <LangSwitch value={lang} onChange={(value) => setLang(value)} />
      </div>
      <div className="px-8 py-6 w-full h-screen bg-gray-200">
        <div className="w-full h-full overflow-scroll">
          {loading && activeTabData ? (
            "loading..."
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              {activeTabData && renderTable(activeTab)}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
