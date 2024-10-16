/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import Head from "next/head";

const AboutCountry = () => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>({});

  const fetchData = useCallback(async () => {
    if (router.query.name) {
      await axios
        .get(
          `https://restcountries.com/v3.1/name/${router.query.name}?fullText=true`
        )
        .then((response) => {
          if (response.status === 200) {
            setData(response.data[0]);

            console.log(response.data[0]);
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            router.push("404");
          }
        });
    }
  }, [router.query.name]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  if (data)
    return (
      <div className="dark:bg-[#202C37] bg-zinc-50 min-h-screen">
        <Head>
          <title>{data?.name?.common}</title>
        </Head>
        <Navbar />
        <main className="md:px-16 px-4  py-16 flex w-full">
          <div className="container flex flex-col w-full">
            <button className="p-2 w-32 bg-white shadow-md rounded-md dark:bg-[#2B3945]">
              <Link href="/" className="dark:text-white">
                <i className="fa-solid fa-arrow-left mr-2 dark:text-white"></i>
                Back
              </Link>
            </button>

            <div className="flex lg:gap-32 gap-10 mt-8 items-center justify-between flex-wrap">
              <div className="md:p-6 p-2 lg:w-2/4  w-full bg-white dark:bg-[#1f2831] shadow-md rounded-md">
                <img
                  className="w-full object-cover lg:h-96"
                  src={data?.flags?.png}
                  alt=""
                />
              </div>
              <div className="md:w-2/6">
                <h2 className="font-extrabold text-3xl dark:text-white">
                  {data?.name?.common}
                </h2>

                <div className="mt-8 flex md:flex-row flex-col justify-between w-full">
                  <div className="flex flex-col gap-2 flex-wrap w-full">
                    <div className="w-full">
                      <strong className="dark:text-white text-black">
                        Native name:{" "}
                      </strong>
                      {data?.name?.nativeName
                        ? Object.values(data?.name?.nativeName).map(
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (value: any, index) => {
                              if (index == 0)
                                return (
                                  <span
                                    className="dark:text-white text-black"
                                    key={index}
                                  >
                                    {value.common}
                                  </span>
                                );
                            }
                          )
                        : ""}
                    </div>
                    <div>
                      <strong className="dark:text-white text-black">
                        Population:{" "}
                      </strong>
                      <span className="dark:text-white text-black">
                        {data?.population}
                      </span>
                    </div>
                    <div>
                      <strong className="dark:text-white text-black">
                        Region:{" "}
                      </strong>
                      <span className="dark:text-white text-black">
                        {data?.region}
                      </span>
                    </div>
                    <div>
                      <strong className="dark:text-white text-black">
                        Sub Region:{" "}
                      </strong>
                      <span className="dark:text-white text-black">
                        {data?.subregion ?? ""}
                      </span>
                    </div>
                    <div>
                      <strong className="dark:text-white text-black">
                        Capital:{" "}
                      </strong>
                      <span className="dark:text-white text-black">
                        {data?.capital}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 md:mt-0 mt-8 w-full">
                    <div>
                      <strong className="dark:text-white text-black">
                        Top level domain:{" "}
                      </strong>
                      <span className="dark:text-white text-black">
                        {data?.tld?.join(", ")}
                      </span>
                    </div>
                    <div>
                      <strong className="dark:text-white text-black">
                        Currencies:{" "}
                      </strong>
                      <span className="dark:text-white text-black">
                        {data?.currencies
                          ? Object.values(data?.currencies).map(
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              (value: any, index) => {
                                if (
                                  Object.values(data?.currencies).length ===
                                  index + 1
                                )
                                  return (
                                    <span
                                      className="dark:text-white text-black"
                                      key={index}
                                    >
                                      {value.name}
                                    </span>
                                  );
                                return (
                                  <span
                                    className="dark:text-white text-black"
                                    key={index}
                                  >
                                    {value.name},{" "}
                                  </span>
                                );
                              }
                            )
                          : ""}
                      </span>
                    </div>
                    <div>
                      <strong className="dark:text-white text-black">
                        Languages:{" "}
                      </strong>
                      <span className="dark:text-white text-black">
                        {data?.languages
                          ? Object.values(data?.languages).map(
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              (value: any, index) => {
                                if (
                                  Object.values(data?.languages).length ===
                                  index + 1
                                )
                                  return (
                                    <span
                                      className="dark:text-white text-black"
                                      key={index}
                                    >
                                      {value}
                                    </span>
                                  );
                                return (
                                  <span
                                    className="dark:text-white text-black"
                                    key={index}
                                  >
                                    {value},{" "}
                                  </span>
                                );
                              }
                            )
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-16 flex flex-wrap gap-2">
                  <strong className="dark:text-white text-black ">
                    Borders Countries:{" "}
                  </strong>

                  <div className="gap-2 flex flex-wrap">
                    {data?.borders?.map((value: any, index: any) => {
                      return (
                        <button
                          className="p-2 w-32 bg-white shadow-md rounded-md dark:bg-[#2B3945] dark:text-white"
                          key={index}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
};

export default AboutCountry;
