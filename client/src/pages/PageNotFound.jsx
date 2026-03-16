import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section className="p-10 bg-white pt-[100px]">
      <div className="text-center">
        <div
          className="h-[400px] bg-center bg-no-repeat bg-contain"
          style={{
            backgroundImage:
              "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)",
          }}
        >
          <h1 className="text-6xl font-extrabold text-black">404</h1>
        </div>

        <div className="-mt-12">
          <h3 className="text-4xl mb-1">Looks like you're lost</h3>

          <p className="mb-4">The page you are looking for is not available!</p>

          <Link
            to="/"
            className="py-3 px-10 text-lg bg-green-400 hover:bg-green-500 my-5 inline-block rounded-full font-semibold duration-300"
          >
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
