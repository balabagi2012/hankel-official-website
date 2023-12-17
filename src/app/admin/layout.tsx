import "@/app/styles/globals.scss";

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
      <body>{children}</body>
    </html>
  );
}
