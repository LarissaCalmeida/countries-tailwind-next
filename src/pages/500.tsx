/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navbar } from "@/components/Navbar";
import Head from "next/head";
import Link from "next/link";

const Erro500 = () => {
  return (
    <div className="dark:bg-[#202C37] bg-zinc-50 min-h-screen">
      <Head>
        <title>Countries | Erro 500</title>
      </Head>
      <Navbar />
      <main className="md:px-16 px-4  py-8 flex w-full">
        <div className="container flex flex-col w-full items-center">
          <img src="/500.svg" alt="" className="w-2/4" />
          <button className="px-4  py-2 bg-white shadow-md rounded-md dark:bg-[#2B3945]">
            <Link href="/" className="dark:text-white">
              <i className="fa-solid fa-arrow-left mr-2 dark:text-white"></i>
              Back to home
            </Link>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Erro500;
