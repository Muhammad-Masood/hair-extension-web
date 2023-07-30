import React from "react";
import Container from "./container";
import Link from "next/link";
import { Button } from "./ui/button";

const Cta = () => {
  return (
    <Container>
      <div className="flex flex-wrap items-center justify-between w-full max-w-4xl gap-5 mx-auto text-white bg-indigo-600 dark:bg-bronze-200 px-7 py-7 lg:px-12 lg:py-12 lg:flex-nowrap rounded-xl">
        <div className="flex-grow text-center lg:text-left">
          <h2 className="text-2xl font-medium lg:text-3xl">
            Book your appointment now
          </h2>
          <p className="mt-2 font-medium text-white text-opacity-90 lg:text-xl">
            Wan&apos;t to have a one on one call with expert?
          </p>
        </div>
        <div className="flex-shrink-0 w-full text-center lg:w-auto">
          <Link
            href="/appointment"
            rel="noopener">
            {/* className="inline-block py-3 mx-auto text-lg font-medium text-center text-indigo-600 dark:text-black bg-white rounded-md px-7 lg:px-10 lg:py-5 " */}
            <Button variant="default" className="dark:bg-white px-8 py-7 text-lg font-medium text-center rounded-md shadow-2xl">Book Now</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default Cta;