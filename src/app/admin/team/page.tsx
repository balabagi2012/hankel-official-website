"use client";

import { Teacher } from "@/app/api/team/route";
import LangSwitch from "@/components/LangSwitch";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

export default function AdminTeamPage() {
  const pageName = "team";
  const tabList = useMemo(
    () => ["elementary", "kindergarten", "highSchool"],
    []
  );
  const [activePageData, setActivePageData] = useState([] as any);
  const [activeTab, setActiveTab] = useState("");
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

  const {
    fields: foreignTeachers,
    append: appendForeignTeacher,
    remove: removeForeignTeacher,
  } = useFieldArray({
    control,
    name: "foreignTeam.teachers",
  });

  const {
    fields: localTeachers,
    append: appendLocalTeachers,
    remove: removeLocalTeachers,
  } = useFieldArray({
    control,
    name: "localTeam.teachers",
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

  const renderField = (key: string, value: string) => {
    if (
      (value.startsWith("/") || value.startsWith("http")) &&
      !key.includes("facebook") &&
      !key.includes("twitter") &&
      !key.includes("linkedin") &&
      !key.includes("youtube") &&
      !key.includes("line")
    ) {
      return (
        <Controller
          name={key}
          control={control}
          render={({ field }) => (
            <div className="flex flex-col items-start justify-start mt-2">
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
                id={`file-${key}}`}
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
                  document.getElementById(`file-${key}}`)?.click();
                }}
              >
                {uploading ? "上傳圖片中" : "更換圖片"}
              </button>
            </div>
          )}
        />
      );
    } else if (value?.length > 80) {
      return (
        <textarea
          key={key}
          disabled={key.includes("type")}
          className="w-full border px-4 py-2 mb-4 mt-2 h-[200px]"
          {...register(key)}
        ></textarea>
      );
    } else {
      return (
        <input
          key={key}
          disabled={key.includes("type")}
          className="w-full border px-4 py-2 mb-4 mt-2"
          {...register(key)}
        ></input>
      );
    }
  };

  const renderRecursive = (obj: object, parentKey = "") => {
    return Object.entries(obj).map(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      if (fullKey.includes("foreignTeam") || fullKey.includes("localTeam")) {
        return null;
      } else if (typeof value === "object") {
        return <div key={fullKey}>{renderRecursive(value, fullKey)}</div>;
      } else if (typeof value === "string" && key !== "_id" && key !== "name") {
        if (
          (fullKey.includes("en") || fullKey.includes("zh")) &&
          !fullKey.includes(lang)
        ) {
          return;
        }
        return (
          <div key={fullKey} className="bg-white px-6 py-3 rounded shadow mt-4">
            <label>
              {fullKey.replace(".zh", " [中文]").replace(".en", " [EN]")}
            </label>
            {renderField(fullKey, value)}
          </div>
        );
      }
      return null;
    });
  };

  const removeTeacher = (name: string, index: number) => {
    if (window.confirm("Do you really want to remove this teacher?")) {
      if (name === "localTeam") {
        removeLocalTeachers(index);
      } else {
        removeForeignTeacher(index);
      }
      handleSubmit(onSubmit);
    }
  };

  const addTeacher = (name: string) => {
    const newTeacher = {
      title: {
        en: "teacher name",
        zh: "老師名字",
      },
      description: {
        en: "teacher description",
        zh: "老師介紹",
      },
      tag: {
        en: "teacher tag",
        zh: "老師標籤",
      },
      img: "/team/avatar.png",
      facebook: "",
      twitter: "",
      linkedin: "",
    };
    if (name === "localTeam") {
      appendLocalTeachers(newTeacher);
    } else {
      appendForeignTeacher(newTeacher);
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
                Team
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
                  {activeTabData && renderRecursive(activeTabData)}
                  <div className="mt-4 align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                    <div className="bg-white flex flex-row items-center">
                      <p
                        className={`px-6 py-4 inline-flex text-2xl font-bold leading-5 `}
                      >
                        ForeignTeam
                      </p>
                      <button
                        className="ml-auto mr-6 px-3 py-1 bg-deepBlue text-white border border-gray-300 text-sm rounded-lg focus:outline-none"
                        onClick={() => addTeacher("foreignTeam")}
                      >
                        Add Teacher
                      </button>
                    </div>
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                          <th className="px-6 py-3 text-left font-medium">
                            Team Title
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            Team Description
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <textarea
                              className="text-sm leading-5 text-gray-900 w-full border"
                              {...register(`foreignTeam.title[${lang}]`)}
                            ></textarea>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <textarea
                              className="text-sm leading-5 text-gray-900 w-full border"
                              {...register(`foreignTeam.description[${lang}]`)}
                            ></textarea>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="w-full overflow-scroll">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                          <th className="px-6 py-3 text-left font-medium">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            Img
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            Description
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            Tag
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            Facebook
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            LinkedIn
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            twitter
                          </th>
                          <th className="px-6 py-3 text-left font-medium"></th>
                        </tr>
                      </thead>
                      <tbody className="w-full bg-white overflow-scroll">
                        {(foreignTeachers as unknown as Teacher[])?.map(
                          (teacher: Teacher, index: number) => (
                            <tr key={`foreignTeam-teacher-${index}`}>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <input
                                  className="text-sm leading-5 text-gray-900 border"
                                  {...register(
                                    `foreignTeam.teachers.${index}.title.${lang}`,
                                    { required: true }
                                  )}
                                ></input>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-15 w-15">
                                    <Controller
                                      name={`foreignTeam.teachers.${index}.img`}
                                      control={control}
                                      render={({ field }) => (
                                        <div className="flex flex-col items-start justify-start mt-2">
                                          <input
                                            className="w-full border px-4 py-2 mb-4 mt-2 text-sm"
                                            value={field.value}
                                            onChange={(event) => {
                                              field.onChange(
                                                event.target.value
                                              );
                                            }}
                                          ></input>
                                          <input
                                            type="file"
                                            accept="images/*"
                                            id={`file-foreignTeam.teachers.${index}.img`}
                                            className="invisible h-0"
                                            onChange={(event) => {
                                              const file =
                                                event.target.files?.[0];
                                              if (file) {
                                                uploadFile(file).then(
                                                  (data) => {
                                                    field.onChange(data.file);
                                                  }
                                                );
                                              }
                                            }}
                                          />
                                          <div className="flex flex-row gap-4">
                                            {field.value &&
                                              (field.value.startsWith("/") ||
                                                field.value.startsWith(
                                                  "http"
                                                )) && (
                                                <Image
                                                  width={40}
                                                  height={40}
                                                  alt={field.value}
                                                  src={field.value}
                                                />
                                              )}
                                            <button
                                              className="bg-blue mt-1 px-2 py-2 rounded text-white text-sm"
                                              disabled={uploading}
                                              onClick={(event) => {
                                                event.preventDefault();
                                                event.stopPropagation();
                                                document
                                                  .getElementById(
                                                    `file-foreignTeam.teachers.${index}.img`
                                                  )
                                                  ?.click();
                                              }}
                                            >
                                              {uploading
                                                ? "上傳圖片中"
                                                : "更換圖片"}
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <textarea
                                  className="text-sm leading-5 text-gray-900 w-[400px] border"
                                  {...register(
                                    `foreignTeam.teachers.${index}.description.${lang}`,
                                    { required: true }
                                  )}
                                ></textarea>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <input
                                  className={`border px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 w-[240px]`}
                                  {...register(
                                    `foreignTeam.teachers.${index}.tag.${lang}`,
                                    { required: true }
                                  )}
                                ></input>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                <input
                                  type="text"
                                  className="border"
                                  {...register(
                                    `foreignTeam.teachers.${index}.facebook`,
                                    { required: false }
                                  )}
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                <input
                                  type="text"
                                  className="border"
                                  {...register(
                                    `foreignTeam.teachers.${index}.linkedin`,
                                    { required: false }
                                  )}
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                <input
                                  type="text"
                                  className="border"
                                  {...register(
                                    `foreignTeam.teachers.${index}.twitter`,
                                    { required: false }
                                  )}
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                <div
                                  onClick={() =>
                                    removeTeacher("foreignTeam", index)
                                  }
                                >
                                  Remove
                                </div>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                    <div className="bg-white flex flex-row items-center">
                      <p
                        className={`px-6 py-4 inline-flex text-2xl font-bold leading-5 `}
                      >
                        LocalTeam
                      </p>
                      <button
                        className="ml-auto mr-6 px-3 py-1 bg-deepBlue text-white border border-gray-300 rounded-lg text-sm focus:outline-none"
                        onClick={() => addTeacher("localTeam")}
                      >
                        Add Teacher
                      </button>
                    </div>
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                          <th className="px-6 py-3 text-left font-medium">
                            Team Title
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            Team Description
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <textarea
                              className="text-sm leading-5 text-gray-900 w-full border"
                              {...register(`localTeam.title[${lang}]`)}
                            ></textarea>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <textarea
                              className="text-sm leading-5 text-gray-900 w-full border"
                              {...register(`localTeam.description[${lang}]`)}
                            ></textarea>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="w-full overflow-scroll">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                          <th className="px-6 py-3 text-left font-medium">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            Img
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            Description
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            Tag
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            Facebook
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            LinkedIn
                          </th>
                          <th className="px-6 py-3 text-left font-medium">
                            twitter
                          </th>
                          <th className="px-6 py-3 text-left font-medium"></th>
                        </tr>
                      </thead>
                      <tbody className="w-full bg-white overflow-scroll">
                        {(localTeachers as unknown as Teacher[])?.map(
                          (teacher: Teacher, index: number) => (
                            <tr key={`localTeam-teacher-${index}`}>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <input
                                  className="text-sm leading-5 text-gray-900 border"
                                  {...register(
                                    `localTeam.teachers.${index}.title.${lang}`,
                                    { required: true }
                                  )}
                                ></input>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-15 w-15">
                                    <Controller
                                      name={`localTeam.teachers.${index}.img`}
                                      control={control}
                                      render={({ field }) => (
                                        <div className="flex flex-col items-start justify-start mt-2">
                                          <input
                                            className="w-full border px-4 py-2 mb-4 mt-2 text-sm"
                                            value={field.value}
                                            onChange={(event) => {
                                              field.onChange(
                                                event.target.value
                                              );
                                            }}
                                          ></input>
                                          <input
                                            type="file"
                                            accept="images/*"
                                            id={`file-localTeam.teachers.${index}.img`}
                                            className="invisible h-0"
                                            onChange={(event) => {
                                              const file =
                                                event.target.files?.[0];
                                              if (file) {
                                                uploadFile(file).then(
                                                  (data) => {
                                                    field.onChange(data.file);
                                                  }
                                                );
                                              }
                                            }}
                                          />
                                          <div className="flex flex-row gap-4">
                                            {field.value &&
                                              (field.value.startsWith("/") ||
                                                field.value.startsWith(
                                                  "http"
                                                )) && (
                                                <Image
                                                  width={40}
                                                  height={40}
                                                  alt={field.value}
                                                  src={field.value}
                                                />
                                              )}
                                            <button
                                              className="bg-blue mt-1 px-2 py-2 rounded text-white text-sm"
                                              disabled={uploading}
                                              onClick={(event) => {
                                                event.preventDefault();
                                                event.stopPropagation();
                                                document
                                                  .getElementById(
                                                    `file-localTeam.teachers.${index}.img`
                                                  )
                                                  ?.click();
                                              }}
                                            >
                                              {uploading
                                                ? "上傳圖片中"
                                                : "更換圖片"}
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <textarea
                                  className="text-sm leading-5 text-gray-900 w-[400px] border"
                                  {...register(
                                    `localTeam.teachers.${index}.description.${lang}`,
                                    { required: true }
                                  )}
                                ></textarea>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <input
                                  className={`border px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 w-[240px]`}
                                  {...register(
                                    `localTeam.teachers.${index}.tag.${lang}`,
                                    { required: true }
                                  )}
                                ></input>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                <input
                                  type="text"
                                  className="border"
                                  {...register(
                                    `localTeam.teachers.${index}.facebook`,
                                    { required: false }
                                  )}
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                <input
                                  type="text"
                                  className="border"
                                  {...register(
                                    `localTeam.teachers.${index}.linkedin`,
                                    { required: false }
                                  )}
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                <input
                                  type="text"
                                  className="border"
                                  {...register(
                                    `localTeam.teachers.${index}.twitter`,
                                    { required: false }
                                  )}
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                <div
                                  onClick={() =>
                                    removeTeacher("localTeam", index)
                                  }
                                >
                                  Remove
                                </div>
                              </td>
                            </tr>
                          )
                        )}
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
