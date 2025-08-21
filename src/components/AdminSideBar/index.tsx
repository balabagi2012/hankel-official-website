'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AdminSideBar() {
  const apiPathList = [
    'home',
    'about',
    'contact',
    'curriculum',
    'facility',
    'information',
    'subschool',
    'team',
    'news',
    'event',
    'logout',
  ];

  const logout = async () => {
    const url = `/api/auth/logout`;
    const res = await fetch(url, {
      method: 'POST',
    });
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      return window.alert('Failed to logout');
    }
    window.location.reload();
  };

  return (
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
            Hankel Admin
          </span>
        </div>
      </div>
      <ul className="flex flex-col px-2 py-6 w-full">
        {apiPathList.map((apiPath) =>
          apiPath === 'logout' ? (
            <div
              key={apiPath}
              onClick={logout}
              className="px-2 py-3 mt-2 hover:bg-gray-900 focus:outline-none focus:text-gray-500 rounded w-full flex items-center"
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
                {apiPath.charAt(0).toUpperCase() + apiPath.slice(1)}
              </span>
            </div>
          ) : (
            <Link
              key={apiPath}
              href={`/admin/${apiPath}`}
              className="px-2 py-3 mt-2 hover:bg-gray-900 focus:outline-none focus:text-gray-500 rounded w-full flex items-center"
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
                {apiPath.charAt(0).toUpperCase() + apiPath.slice(1)}
              </span>
            </Link>
          )
        )}
      </ul>
    </aside>
  );
}
