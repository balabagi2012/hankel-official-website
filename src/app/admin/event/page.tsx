"use client";
import { NewsEntity } from "@/app/api/news/route";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminEventPage() {
  const [newsList, setNewsList] = useState<NewsEntity[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      const url = `/api/news?limit=1000`;
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
                Event
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
            <div className="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-3 text-left font-medium">Title</th>
                    <th className="px-6 py-3 text-left font-medium">Banner</th>
                    <th className="px-6 py-3 text-left font-medium">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left font-medium">Status</th>
                    <th className="px-6 py-3 text-left font-medium">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-left font-medium"></th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {newsList.map((news) => (
                    <tr key={news._id}>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="text-sm leading-5 text-gray-900">
                          {news.title.en}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-15 w-15">
                            <Image
                              width={40}
                              height={40}
                              alt={news.banner}
                              src={news.banner}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm leading-5 font-medium text-gray-900"></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="text-sm leading-5 text-gray-900">
                          {news.description.en}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800`}
                        >
                          {news.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                        {new Date(news.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                        <Link href={`/admin/news/${news._id}`}>Show</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
