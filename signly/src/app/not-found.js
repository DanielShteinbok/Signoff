import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="p-4 sm:p-8 md:p-12 lg:p-16 xl:p-24">
        <Image
          src="/404_not_found.png"
          alt="404 page not found"
          width={500}
          height={300}
          layout="responsive"
        />

        <h4 className="mt-4 text-center">
          Oops... The page you're looking for isn't here.{" "}
          <Link className="text-cyan-700 underline" href="/">
            Go Home.
          </Link>
        </h4>
      </div>
    </div>
  );
}
