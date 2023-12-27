"use client";

import LangSwitch from "@/components/LangSwitch";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function AdminCurriculumPage() {
  const pageName = "curriculum";
  const tabList = useMemo(
    () => ["elementary", "kindergarten", "highSchool"],
    []
  );
  const [activePageData, setActivePageData] = useState([] as any);
  const [lang, setLang] = useState("en");
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
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
      ((value.startsWith("/") || value.startsWith("http")) &&
        key.includes("img")) ||
      key.includes("file") ||
      key.includes("banner")
    ) {      return (
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
                Curriculum
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
              {activeTabData && renderRecursive(activeTabData)}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
