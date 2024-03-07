"use client";

import LangSwitch from "@/components/LangSwitch";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

export default function AdminSubschoolPage() {
  const pageName = "subschool";
  const tabList = useMemo(
    () => ["afterSchool", "elementary", "kindergarten", "highSchool"],
    []
  );
  const [activePageData, setActivePageData] = useState([] as any);
  const [activeTab, setActiveTab] = useState("afterSchool");
  const [loading, setLoading] = useState(false);
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
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
      setLoading(false);
    });
  }, []);

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

  const handleRemove = (index: number) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      remove(index);
      handleSubmit(onSubmit);
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
                Subschool
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
                        Subschool
                      </p>
                    </div>
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                          <th className="px-6 py-3 text-left font-medium">
                            title [{lang}]
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            description [{lang}]
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            Banner [1440x396]
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <input
                              className="text-sm leading-5 text-gray-900 border w-full"
                              {...register(`title.${lang}`, { required: true })}
                            ></input>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <textarea
                              className="text-sm leading-5 text-gray-900 border w-full"
                              {...register(`description.${lang}`, {
                                required: true,
                              })}
                            ></textarea>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <Controller
                              name={"banner"}
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
                            subBanner title [{lang}]
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            subBanner description [{lang}]
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            subBanner img [1440x396]
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <input
                              className="text-sm leading-5 text-gray-900 border w-full"
                              {...register(`subBanner.title.${lang}`, {
                                required: true,
                              })}
                            ></input>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <textarea
                              className="text-sm leading-5 text-gray-900 border w-full"
                              {...register(`subBanner.description.${lang}`, {
                                required: true,
                              })}
                            ></textarea>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <Controller
                              name={"subBanner.img"}
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
                                    id={`file-subBanner.img`}
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
                                        .getElementById(`file-subBanner.img`)
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
                            Social Media Instgram Token
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            Social Media facebook
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <input
                              disabled
                              className="text-sm leading-5 text-gray-900 border w-full"
                              {...register(`socialMedia.instagram`, {
                                required: true,
                              })}
                            ></input>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <textarea
                              className="text-sm leading-5 text-gray-900 border w-full"
                              {...register(`socialMedia.facebook`, {
                                required: true,
                              })}
                            ></textarea>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="bg-white flex flex-row items-center">
                      <p
                        className={`px-6 py-4 inline-flex text-2xl font-bold leading-5 `}
                      >
                        Course
                      </p>
                      <button
                        className="ml-auto mr-6 px-3 py-1 bg-deepBlue text-white border border-gray-300 text-sm rounded-lg focus:outline-none"
                        onClick={() =>
                          append({
                            title: {
                              en: "course example",
                              zh: "course example",
                            },
                            description: {
                              en: "course example",
                              zh: "course example",
                            },
                            img: "/course/1.png",
                          })
                        }
                      >
                        Add course
                      </button>
                    </div>
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                          <th className="px-6 py-3 text-left font-medium">
                            course title [{lang}]
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            course description [{lang}]
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            course img [322x200]
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {fields.map((item, index) => (
                          <tr key={`experience-${index}`}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <input
                                className="text-sm leading-5 text-gray-900 border w-full"
                                {...register(
                                  `experiences.${index}.title.${lang}`,
                                  {
                                    required: true,
                                  }
                                )}
                              ></input>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <textarea
                                className="text-sm leading-5 text-gray-900 border w-full h-[200px]"
                                {...register(
                                  `experiences.${index}.description.${lang}`,
                                  {
                                    required: true,
                                  }
                                )}
                              ></textarea>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <Controller
                                key={`experiences.${index}.img`}
                                name={`experiences.${index}.img`}
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
                                      id={`experiences.${index}.img`}
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
                                          .getElementById(
                                            `experiences.${index}.img`
                                          )
                                          ?.click();
                                      }}
                                    >
                                      {uploading ? "上傳圖片中" : "更換圖片"}
                                    </button>
                                  </div>
                                )}
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <button
                                disabled={loading}
                                className="px-3 py-1 bg-red-600 font-base text-white border border-red-300 rounded-lg focus:outline-none"
                                onClick={() => handleRemove(index)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
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
