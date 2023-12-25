import "@/app/styles/globals.scss";
import AdminSideBar from "@/components/AdminSideBar";

export const metadata = {
  title: "Hankel Admin Page",
  description: "Manage your website",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/uploads/favicon.ico" sizes="24x24" />
      </head>
      <body>
        <div className="relative flex-row w-full h-full">
          <AdminSideBar />
          <div className="flex flex-col w-full items-center h-full bg-gray-200 pl-64">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
