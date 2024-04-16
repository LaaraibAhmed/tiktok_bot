import "@/app/globals.css";

export const metadata = {
  title: "Avatar Creator",
  description: "...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <body>{children}</body>;
}
