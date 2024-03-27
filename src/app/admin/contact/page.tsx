"use client";

import LangSwitch from "@/components/LangSwitch";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function AdminContactPage() {
  const pageName = "contact";
  const tabList = useMemo(
    () => ["home", "afterSchool", "elementary", "kindergarten", "highSchool"],
    []
  );
  const [activePageData, setActivePageData] = useState([] as any);
  const [activeTab, setActiveTab] = useState("home");
  const [loading, setLoading] = useState(false);
  const [logoVersion, setLogoVersion] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [lang, setLang] = useState<"en" | "zh">("en");

  const activeTabData = useMemo(
    () =>
      activePageData?.find(({ name }: { name: string }) => name === activeTab),
    [activePageData, activeTab]
  );

  const { register, control, handleSubmit } = useForm({
    values: activeTabData,
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    setLoading(true);
    const url = `/api/${pageName}/${activeTab}`;
    const { _id, ...body } = data;
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    setLoading(false);
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      return window.alert(JSON.stringify(await res.json()));
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
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    loadPageData();
  }, [loadPageData]);

  const uploadFile = async (
    file: File,
    fileName?: string,
    filePath?: string
  ) => {
    setUploading(true);
    const url = `/uploads`;
    const form = new FormData();
    form.append("file", file);
    if (fileName) form.append("fileName", fileName);
    if (filePath) form.append("filePath", filePath);
    const res = await fetch(url, {
      method: "POST",
      body: form,
    });
    setUploading(false);
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      return window.alert(res.json());
    }
    return res.json();
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
                Contact
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
          {loading && activeTabData
            ? "loading..."
            : activeTabData && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mt-4 align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                    <div className="bg-white flex flex-row items-center">
                      <p
                        className={`px-6 py-4 inline-flex text-2xl font-bold leading-5 `}
                      >
                        Contact
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
                          <th className="px-6 py-3 text-left font-medium">
                            Banner Title[{lang}]
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            Banner Description[{lang}]
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <input
                              className="text-sm leading-5 text-gray-900 border"
                              {...register(`title.${lang}`, {
                                required: true,
                              })}
                            ></input>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <textarea
                              className="text-sm leading-5 text-gray-900 w-full border"
                              {...register(`description.${lang}`)}
                            ></textarea>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <input
                              className="text-sm leading-5 text-gray-900 border"
                              {...register(`banner.title.${lang}`, {
                                required: true,
                              })}
                            ></input>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <textarea
                              className="text-sm leading-5 text-gray-900 w-full border"
                              {...register(`banner.description.${lang}`)}
                            ></textarea>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                          <th className="px-6 py-3 text-left font-medium">
                            Banner [1440x396]
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <Controller
                              name={"banner.img"}
                              control={control}
                              render={({ field }) => (
                                <div className="flex-1 flex flex-col items-start justify-start">
                                  <input
                                    className="w-full border px-4 py-2 mb-4 mt-2"
                                    value={field.value as string}
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
                                          handleSubmit(onSubmit);
                                        });
                                      }
                                    }}
                                  />
                                  {field.value &&
                                    (field.value.startsWith("/") ||
                                      field.value.startsWith("http")) && (
                                      <Image
                                        width={720}
                                        height={198}
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
                                        .getElementById(`file-banner`)
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
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                          <th className="px-6 py-3 text-left font-medium">
                            Logo [200x44][svg]
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <Controller
                              name={"logo"}
                              control={control}
                              render={({ field }) => (
                                <div className="flex-1 flex flex-col items-start justify-start">
                                  <input
                                    type="file"
                                    accept="image/svg+xml"
                                    id={`file-logo`}
                                    className="invisible h-0"
                                    onChange={(event) => {
                                      const file = event.target.files?.[0];
                                      if (file) {
                                        uploadFile(
                                          file,
                                          activeTab,
                                          "logo"
                                        ).then((data) => {
                                          field.onChange(data.file);
                                          setLogoVersion((v) => v + 1);
                                        });
                                      }
                                    }}
                                  />
                                  {field.value &&
                                    (field.value.startsWith("/") ||
                                      field.value.startsWith("http")) && (
                                      // eslint-disable-next-line @next/next/no-img-element
                                      <img
                                        width={200}
                                        height={44}
                                        alt={field.value + "?v=" + logoVersion}
                                        src={field.value + "?v=" + logoVersion}
                                        key={logoVersion}
                                      />
                                    )}
                                  <button
                                    className="bg-blue mt-1 px-2 py-2 rounded text-white"
                                    disabled={uploading}
                                    onClick={(event) => {
                                      event.preventDefault();
                                      event.stopPropagation();
                                      document
                                        .getElementById(`file-logo`)
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
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                          <th className="px-6 py-3 text-left font-medium">
                            facebook
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            instagram
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            youtube
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            line
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <input
                              className="text-sm leading-5 text-gray-900 border w-full"
                              {...register(`facebook`)}
                            ></input>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <input
                              className="text-sm leading-5 text-gray-900 border w-full"
                              {...register(`instagram`)}
                            ></input>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <input
                              className="text-sm leading-5 text-gray-900 border w-full"
                              {...register(`youtube`)}
                            ></input>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <input
                              className="text-sm leading-5 text-gray-900 border w-full"
                              {...register(`line`)}
                            ></input>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                          <th className="px-6 py-3 text-left font-medium">
                            email
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            address [{lang}]
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            phone
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <input
                              className="text-sm leading-5 text-gray-900 border w-full"
                              {...register(`email`)}
                            ></input>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <textarea
                              className="text-sm leading-5 text-gray-900 border w-full"
                              {...register(`address.${lang}`)}
                            ></textarea>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <input
                              className="text-sm leading-5 text-gray-900 border w-full"
                              {...register(`phone`)}
                            ></input>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                          <th className="px-6 py-3 text-left font-medium">
                            SEO Title [{lang}]
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            SEO Description [{lang}]
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <textarea
                              className="text-sm leading-5 text-gray-900 border w-full"
                              {...register(`seoTitle.${lang}`)}
                            ></textarea>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <textarea
                              className="text-sm leading-5 text-gray-900 border w-full"
                              {...register(`seoDescription.${lang}`)}
                            ></textarea>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                          <th className="px-6 py-3 text-left font-medium">
                            h1 [{lang}]
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            h2 [{lang}]
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            h3 [{lang}]
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <textarea
                              className="text-sm leading-5 text-gray-900 border w-full"
                              {...register(`h1.${lang}`)}
                            ></textarea>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <textarea
                              className="text-sm leading-5 text-gray-900 border w-full"
                              {...register(`h2.${lang}`)}
                            ></textarea>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <textarea
                              className="text-sm leading-5 text-gray-900 border w-full"
                              {...register(`h3.${lang}`)}
                            ></textarea>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                          <th className="px-6 py-3 text-left font-medium">
                            h4 [{lang}]
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            h5 [{lang}]
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            h6 [{lang}]
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <textarea
                              className="text-sm leading-5 text-gray-900 border w-full"
                              {...register(`h4.${lang}`)}
                            ></textarea>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <textarea
                              className="text-sm leading-5 text-gray-900 border w-full"
                              {...register(`h5.${lang}`)}
                            ></textarea>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <textarea
                              className="text-sm leading-5 text-gray-900 border w-full"
                              {...register(`h6.${lang}`)}
                            ></textarea>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </form>
              )}
        </div>
      </div>
    </div>
  );
}
