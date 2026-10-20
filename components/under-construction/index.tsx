import Link from "next/link";

const UnderConstruction = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-3">
      <h1 className="text-primary text-2xl font-bold">This page is under construction</h1>
      <p className="text-white text-base">I&apos;m building something magic here</p>
      <Link href="/" className="bg-primary px-4 py-2 rounded-lg">
        Go back
      </Link>
    </div>
  );
};

export default UnderConstruction;
