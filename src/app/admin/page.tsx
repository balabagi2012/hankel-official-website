"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function AdminPage() {
  const schoolList = ["dayCare", "elementary", "kindergarten", "highSchool"];
  const apiList = [
    "about",
    "contact",
    "curriculum",
    "facility",
    "home",
    "information",
    "subschool",
    "team",
    "news",
  ];
  const [activePage, setActivePage] = useState(apiList[0]);
  const [activePageData, setActivePageData] = useState([] as any);
  const [activeTabData, setActiveTabData] = useState({} as any);
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const tabs =
    activePage === "home"
      ? ["home"]
      : ["about", "contact"].includes(activePage)
      ? ["home", ...schoolList]
      : schoolList;

  const { register, control, handleSubmit } = useForm({
    values: activeTabData,
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    setLoading(true);
    const url =
      activePage === "home"
        ? `/api/${activePage}`
        : `/api/${activePage}/${activeTab}`;
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
    loadPageData(activePage);
    return window.alert("Successed to update data");
  };

  const fetchPageData = async (page: string) => {
    const url = `/api/${page}`;
    const res = await fetch(url, {
      cache: "no-cache",
    });
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return res.json();
  };

  const loadPageData = useCallback(async (page: string) => {
    setLoading(true);
    fetchPageData(page).then((data) => {
      setActivePageData(data);
      setActiveTab(
        page === "home" ? page : page === "news" ? "dayCare" : data[0].name
      );
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    loadPageData(activePage);
  }, [loadPageData, activePage]);

  useEffect(() => {
    setActiveTabData(
      activePage === "home"
        ? activePageData
        : Array.isArray(activePageData)
        ? activePageData?.find(
            ({ name }: { name: string }) => name === activeTab
          )
        : {}
    );
  }, [activePage, activePageData, activeTab]);

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
    if (value.startsWith("/")) {
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
              {field.value && (
                <Image src={field.value} alt={key} width={500} height={500} />
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
      if (typeof value === "object") {
        return <div key={fullKey}>{renderRecursive(value, fullKey)}</div>;
      } else if (typeof value === "string" && key !== "_id" && key !== "name") {
        return (
          <div key={fullKey} className="bg-white px-6 py-3 rounded shadow mt-4">
            <label>
              {fullKey.replace(".zh", " [中文]").replace(".en", " [英文]")}
            </label>
            {renderField(fullKey, value)}
          </div>
        );
      }
      return null;
    });
  };

  return (
    <main className="relative flex-row w-full h-full">
      <aside className="fixed w-64 h-full bg-gray-800 text-white items-start justify-start">
        <div className="flex items-center justify-between w-full bg-gray-900 p-4 h-16 ">
          <div className="flex items-center">
            <Image
              src="/icons/logo_square.svg"
              width={24}
              height={24}
              alt="logo"
            ></Image>
            <span className="text-xl font-semibold mx-2 text-gray-300">
              {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
            </span>
          </div>
        </div>
        <ul className="flex flex-col px-2 py-6 w-full">
          {apiList.map((api) => (
            <li
              key={api}
              className="px-2 py-3 mt-2 hover:bg-gray-900 focus:outline-none focus:text-gray-500 rounded w-full flex items-center"
              onClick={() => setActivePage(api)}
            >
              <svg
                className="w-6 text-gray-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              <span className="mx-2 text-gray-300">
                {api.charAt(0).toUpperCase() + api.slice(1)}
              </span>
            </li>
          ))}
        </ul>
      </aside>
      <div className="flex flex-col w-full items-center h-full bg-gray-200 pl-64">
        <div className="fixed left-64 right-0">
          <div className="flex bg-white py-4 px-8 shadow-md h-16 flex-row justify-end items-center">
            {activePage === "news" ? (
              <Link
                href="/admin/news"
                className="px-3 py-1 bg-deepBlue font-base text-white border border-gray-300 rounded-lg focus:outline-none"
              >
                Create
              </Link>
            ) : (
              <button
                id="save-button"
                disabled={loading}
                className="px-3 py-1 bg-deepBlue font-base text-white border border-gray-300 rounded-lg focus:outline-none"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-6 px-8 w-full bg-white mt-16">
          {tabs.map((tab: string) => (
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
        </div>
        <div className="px-8 py-6 w-full h-screen bg-gray-200">
          <div className="w-full h-full overflow-scroll">
            {loading && activeTabData ? (
              "loading..."
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                {activeTabData && renderRecursive(activeTabData)}
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
