import { Country } from "@/components/Country";
import { Navbar } from "@/components/Navbar";
import axios from "axios";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

interface ICountry {
  name: {
    common: string;
  };
  capital: string[];
  population: number;
  flags: {
    png: string;
  };
  region: string;
}

export default function Home() {
  const [regions, setRegions] = useState("all");
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [nameCountry, setNameCountry] = useState("");
  const [filterCountry, setFilterCountry] = useState<ICountry[]>([]);

  const handleFilterByRegions = useCallback(async () => {
    if (regions == "all") {
      const response = await axios.get("https://restcountries.com/v3.1/all");

      if (response.status === 200) {
        setCountries([...response.data]);
      }
      console.log(response);
    } else {
      const response = await axios.get(
        `https://restcountries.com/v3.1/region/${regions}`
      );

      if (response.status === 200) {
        setCountries([...response.data]);
      }
    }
  }, [regions]);

  useEffect(() => {
    handleFilterByRegions();
  }, [handleFilterByRegions]);

  const handlFilterByName = useCallback(() => {
    if (nameCountry) {
      const filtered = countries.filter((country) =>
        country.name.common.match(nameCountry)
      );

      setFilterCountry([...filtered]);
    } else {
      setFilterCountry([...countries]);
    }
  }, [countries, nameCountry]);

  useEffect(() => {
    handlFilterByName();
  }, [handlFilterByName]);

  return (
    <div className="dark:bg-[#202C37] bg-zinc-50 min-h-screen">
      <Navbar />
      <Head>
        <title>Countries</title>
      </Head>

      <main className="md:px-16 px-4  py-16 flex w-full">
        {/* Filters */}
        <div className="container flex flex-col mx-auto w-full">
          <div className="flex justify-between w-full flex-wrap gap-4">
            <div className="relative sm:w-96 w-full">
              <div className="absolute inset-y-0 start-5 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="block w-full p-4 ps-16 text-sm text-gray-900  border-none shadow-md rounded-lg bg-white  dark:bg-[#2B3945]  dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for a country..."
                required
                onChange={(e) => {
                  setNameCountry(e.target.value);
                }}
              />
            </div>

            <select
              id="countries"
              onChange={(e) => {
                setRegions(e.target.value);
              }}
              className="bg-white p-4 w-60  border-none shadow-md text-gray-900 text-sm rounded-lg block  p-2.5 dark:bg-[#2B3945]  dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected disabled>
                Filter by Region
              </option>
              <option value="africa">Africa</option>
              <option value="america">America</option>
              <option value="asia">Asia</option>
              <option value="europe">Europe</option>
              <option value="oceania">Oceania</option>
              <option value="all">All</option>
            </select>
          </div>

          {filterCountry.length > 0 ? (
            <div className="flex gap-8 flex-wrap mt-16  justify-center">
              {filterCountry.map((country, index) => {
                return (
                  <Country
                    key={index}
                    capital={country?.capital?.join(", ")}
                    image={country.flags.png}
                    name={country.name.common}
                    population={country.population}
                    region={country.region}
                  />
                );
              })}
            </div>
          ) : (
            <h2 className="text-2xl text-gray-500 font-extrabold text-center mt-16 uppercase">
              ops, Country not found
            </h2>
          )}
        </div>
      </main>
    </div>
  );
}
