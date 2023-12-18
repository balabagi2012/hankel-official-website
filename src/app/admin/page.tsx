"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function AdminPage() {
  const apiList = [
    "about",
    "contact",
    "curriculum",
    "facility",
    "home",
    "information",
    "subschool",
    "team",
  ];
  const [activePage, setActivePage] = useState(apiList[0]);
  const [activePageData, setActivePageData] = useState([] as any);
  const [activeTabData, setActiveTabData] = useState({} as any);
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(false);
  const tabs =
    activePage === "home"
      ? [activePage]
      : Array.isArray(activePageData)
      ? activePageData.map((item: any) => item.name)
      : [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
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

  useEffect(() => {
    setLoading(true);
    fetchPageData(activePage).then((data) => {
      setActivePageData(data);
      setActiveTab(activePage === "home" ? activePage : data[0].name);
      setLoading(false);
    });
  }, [activePage]);

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

  function renderRecursive(obj: object, parentKey = "") {
    return Object.entries(obj).map(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof value === "object") {
        return <div key={fullKey}>{renderRecursive(value, fullKey)}</div>;
      } else if (typeof value === "string" && key !== "_id") {
        return (
          <div key={fullKey} className="bg-white p-6 rounded shadow mt-4">
            <label>
              {fullKey.replace(".zh", " [中文]").replace(".en", " [英文]")}
            </label>
            {value?.length > 80 ? (
              <textarea
                key={fullKey}
                disabled={fullKey.includes("type")}
                className="w-full border px-4 py-2 mb-4 h-[200px]"
                {...register(fullKey)}
              ></textarea>
            ) : (
              <input
                key={fullKey}
                disabled={fullKey.includes("type")}
                className="w-full border px-4 py-2 mb-4"
                {...register(fullKey)}
              ></input>
            )}
          </div>
        );
      }
      return null;
    });
  }

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
            <button
              disabled={loading}
              className="px-3 py-1 bg-deepBlue font-base text-white border border-gray-300 rounded-lg focus:outline-none"
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </button>
          </div>
        </div>
        <div className="flex flex-row gap-6 px-8 w-full bg-white mt-16">
          {tabs?.length > 1 &&
            tabs.map((tab: string) => (
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
