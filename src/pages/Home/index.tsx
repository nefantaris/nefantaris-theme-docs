import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "nefantaris-theme-docs";
  }, []);

  return (
    <div className="bg-brand-background flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h1 className="text-brand-black text-5xl font-bold">
          nefantaris-theme-docs
        </h1>
        <p className="text-brand-gray mt-4 text-xl">
          Documentation theme for Nefantaris sites
        </p>
      </div>
    </div>
  );
};

export default Home;
