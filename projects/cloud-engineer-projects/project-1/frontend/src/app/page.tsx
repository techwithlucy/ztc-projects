import Main from "@/components/main/Main";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My todo app",
  description: "Todo app with nextjs and tailwindcss hosted on AWS Amplify",
  keywords: "nextjs, tailwindcss, aws, amplify, typescript, react, todo, app",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 text-center ">
      <Main />
    </main>
  );
}
