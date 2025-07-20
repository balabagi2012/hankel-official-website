'use client';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme

import Image from 'next/image';
import Link from 'next/link';
import { Paginator } from 'primereact/paginator';
import { useEffect, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { NewsEntity } from '@/app/api/news/route';
import { NewsPageEntity } from '@/app/api/newsPage/route';
import LangSwitch from '@/components/LangSwitch';

export default function AdminNewsPage() {
  const [newsList, setNewsList] = useState<NewsEntity[]>([]);
  const [activePageData, setActivePageData] = useState([] as any);
  const [activeTab, setActiveTab] = useState('newsList');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pagination, setPagination] = useState({ first: 0, rows: 10, page: 0 });
  const [lang, setLang] = useState<'en' | 'zh'>('en');
  const tabList = useMemo(
    () => [
      'newsList',
      'afterSchool',
      'elementary',
      'kindergarten',
      'highSchool',
      'middleSchool',
    ],
    []
  );

  const onPageChange = (event: { first: number; rows: number }) => {
    setPagination({ ...pagination, ...event });
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    const url = `https://www.hiape.ntpc.edu.tw/uploads`;
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(url, {
      method: 'POST',
      body: form,
    });
    setUploading(false);
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      return window.alert('Failed to upload file');
    }
    return res.json();
  };

  const getNews = async (): Promise<NewsEntity[]> => {
    const res = await fetch(`/api/news?limit=1000`, {
      cache: 'no-cache',
    });
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }

    return res.json();
  };

  const getNewsPage = async (): Promise<NewsPageEntity[]> => {
    const res = await fetch(`/api/newsPage`, {
      cache: 'no-cache',
    });
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }

    return res.json();
  };
  const fetchPageData = async () => {
    setLoading(true);
    getNews().then((data) => setNewsList(data));
    getNewsPage().then((data) => setActivePageData(data));
    setLoading(false);
  };

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
    const url = `/api/newsPage/${activeTab}`;
    const { _id, ...body } = data;
    const res = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({ name: activeTab, ...body }),
    });
    setLoading(false);
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      return window.alert('Failed to update data');
    }
    fetchPageData();
    return window.alert('Successed to update data');
  };

  useEffect(() => {
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
          {activeTab === 'newsList' ? (
            <Link
              href={`/admin/news/create`}
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
        <div className="flex flex-row gap-6 px-8 w-full bg-white mt-[1px] ">
          {tabList.map((tab: string) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-2 font-serif ${
                tab === activeTab
                  ? 'font-bold border-b-2 border-deepBlue text-blue'
                  : 'text-blue'
              }`}
            >
              {tab}
            </button>
          ))}
          <LangSwitch value={lang} onChange={(value) => setLang(value)} />
        </div>
        {loading ? (
          <div className="px-8 py-6 w-full h-screen bg-gray-200 overflow-scroll">
            Loading...
          </div>
        ) : activeTab === 'newsList' ? (
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
                  {newsList
                    .slice(pagination.first, pagination.first + pagination.rows)
                    .map((news) => (
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
              <Paginator
                first={pagination.first}
                rows={10}
                totalRecords={newsList.length}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        ) : (
          <div className="px-8 py-6 w-full h-screen bg-gray-200 overflow-scroll">
            <div className="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-3 text-left font-medium">
                      Title [{lang}]
                    </th>
                    <th className="px-6 py-3 text-left font-medium">Banner</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <input
                        className="text-sm leading-5 text-gray-900 border"
                        {...register(`title.${lang}`)}
                      ></input>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <Controller
                        name={'banner'}
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
                              (field.value.startsWith('/') ||
                                field.value.startsWith('http')) && (
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
                              {uploading ? '上傳圖片中' : '更換圖片'}
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
          </div>
        )}
      </div>
    </main>
  );
}
