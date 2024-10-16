import React, { useEffect, useState } from "react";

export const Navbar = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("dark");

    console.log("isDark", isDark);

    if (isDark) {
      setDark(true);
      document.body.classList.add("dark");
    }
  }, []);

  const handleDark = () => {
    document.body.classList.toggle("dark");

    if (dark) {
      localStorage.removeItem("dark");
    } else {
      localStorage.setItem("dark", "true");
    }

    setDark((prev) => !prev);
  };

  return (
    <div className="md:px-16 px-4 dark:bg-[#2B3945] bg-zinc-50 drop-shadow-md  py-8">
      <div className="container flex justify-between mx-auto">
        <h1 className="dark:text-gray-100 text-black md:text-2xl font-extrabold select-none">
          Where in the world?
        </h1>

        <div
          onClick={() => {
            handleDark();
          }}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          {dark ? (
            <i className="dark:text-gray-100 fa-solid fa-moon md:text-xl"></i>
          ) : (
            <i className="fa-regular fa-moon md:text-xl"></i>
          )}
          <span className="dark:text-gray-100 text-black md:text-lg ">
            Dark Mode
          </span>
        </div>
      </div>
    </div>
  );
};
