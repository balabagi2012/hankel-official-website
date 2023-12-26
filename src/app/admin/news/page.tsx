"use client";
import { NewsEntity } from "@/app/api/news/route";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminNewsPage() {
  const [newsList, setNewsList] = useState<NewsEntity[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      const url = `/api/news`;
      const res = await fetch(url);
      const data = await res.json();
      setNewsList(data);
      setLoading(false);
    };
    fetchPageData();
  }, []);

  return (
    <main className="relative flex-row w-full h-full">
      <div className="flex flex-col w-full items-center h-full bg-gray-200">
        <div className="flex w-full bg-white py-4 px-8 shadow-md h-16 flex-row justify-end items-center">
          <div className="flex-1 flex items-center justify-between">
            <div className="flex-1 flex justify-start items-center mr-auto">
              <Image
                src="/icons/logo_square.svg"
                width={24}
                height={24}
                alt="logo"
              ></Image>
              <span className="text-xl font-semibold mx-2 text-gray-800">
                News
              </span>
            </div>
          </div>
          <Link
            href={`/admin/news/create`}
            className="px-3 py-1 bg-deepBlue font-base text-white border border-gray-300 rounded-lg focus:outline-none"
          >
            Create
          </Link>
        </div>
        {loading ? (
          <div className="px-8 py-6 w-full h-screen bg-gray-200 overflow-scroll">
            Loading...
          </div>
        ) : (
          <div className="px-8 py-6 w-full h-screen bg-gray-200 overflow-scroll">
            <ul>
              {newsList.map((news) => (
                <li key={news._id}>
                  <Link href={`/admin/news/${news._id}`}>
                    <p>{news._id}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
