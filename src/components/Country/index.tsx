import Link from "next/link";

interface IProps {
  image: string;
  name: string;
  population: number;
  region: string;
  capital: string;
}

export const Country = ({
  image,
  name,
  population,
  capital,
  region,
}: IProps) => {
  return (
    <div className="w-full max-w-80 rounded-xl cursor-pointer group/item shadow-md">
      <Link href={`/${name}`}>
        <img src={image} className="w-full h-48 object-fill rounded-t-xl" />

        <div className="bg-white dark:bg-[#2B3945] p-8 ">
          <span className="font-extrabold text-xl dark:text-white text-black">
            {name}
          </span>

          <div className="block group-hover/item:hidden">
            <div className="mt-4 ">
              <strong className="dark:text-white text-black">
                Population:{" "}
              </strong>
              <span className="dark:text-white text-black">{population}</span>
            </div>
            <div>
              <strong className="dark:text-white text-black">Region: </strong>
              <span className="dark:text-white text-black">{region}</span>
            </div>
            <div>
              <strong className="dark:text-white text-black">Capital: </strong>
              <span className="dark:text-white text-black">{capital}</span>
            </div>
          </div>
          <button
            type="button"
            className="hidden group-hover/item:block text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 w-full mt-9"
          >
            See more
          </button>
        </div>
      </Link>
    </div>
  );
};
