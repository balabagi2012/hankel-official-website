"use client";

import Typography from "@/components/Typography";
import { useEffect, useState } from "react";
import { SubmitHandler, set, useForm } from "react-hook-form";

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

  const onSubmit: SubmitHandler<any> = (data: any) => console.log(data);

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

  const updateActiveTabData = async (data: any) => {
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

  function renderRecursive(obj: object, parentKey = "") {
    return Object.entries(obj).map(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof value === "object") {
        return <div key={fullKey}>{renderRecursive(value, fullKey)}</div>;
      } else if (typeof value === "string" && key !== "_id") {
        return (
          <div key={fullKey}>
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
    <main className="flex flex-row w-full h-full">
      <div className="flex flex-col w-[300px] h-full bg-deepBlue text-white p-4 items-start justify-start">
        <Typography varient="h2" className="w-full text-white mb-6 border-b-2">
          Admin Page
        </Typography>
        <ul className="flex flex-col gap-y-6">
          {apiList.map((api) => (
            <li key={api} onClick={() => setActivePage(api)}>
              <Typography varient="h3" className="text-white">
                {api.charAt(0).toUpperCase() + api.slice(1)}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col flex-1 items-center p-4">
        <div className="relaive w-full mb-6 border-b-2 flex flex-row justify-center items-center">
          <Typography varient="h1" className="">
            {activePage}
          </Typography>
          <button
            disabled={loading}
            className="absolute right-6 bg-blue text-white rounded-lg px-4 py-2"
            onClick={() => updateActiveTabData(activeTabData)}
          >
            Save
          </button>
        </div>
        <div className="flex flex-row gap-4 mb-6">
          {tabs?.length > 1 &&
            tabs.map((tab: string) => (
              <button key={tab} onClick={() => setActiveTab(tab)}>
                <Typography varient="h3" className="">
                  {tab}
                </Typography>
              </button>
            ))}
        </div>
        <div className="w-full overflow-scroll">
          {loading && activeTabData ? (
            "loading..."
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              {activeTabData && renderRecursive(activeTabData)}
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
