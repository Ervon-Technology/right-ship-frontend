import { Link } from 'react-router-dom';
import React from 'react';
import { Helmet } from 'react-helmet';
import WorkingImg from '../images/wantToHire/workingInShip.webp';

const HeroSection = () => {
  return (
    <>
      <Helmet>
        <title>Find Marine Industry Candidates - Right Ships Onboarding for Companies</title>
        <meta
          name="description"
          content="Right Ships helps companies in the marine industry find qualified candidates fast. Simplify your hiring process with our advanced recruitment platform tailored to your needs."
        />
        <meta
          name="keywords"
          content="marine industry hiring, company onboarding, find qualified candidates, marine recruitment, job platform for companies"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Find Marine Industry Candidates - Right Ships Onboarding for Companies",
            "description":
              "Right Ships helps companies in the marine industry find qualified candidates fast. Simplify your hiring process with our advanced recruitment platform.",
            "publisher": {
              "@type": "Organization",
              "name": "Right Ships",
              "logo": {
                "@type": "ImageObject",
                "url": "https://example.com/logo.jpg",
              },
            },
          })}
        </script>
      </Helmet>

      <section className="pt-28 w-10/12 py-14 mx-auto">
        <header className="flex flex-col justify-between lg:flex-row">
          <div className="text-center lg:text-left lg:w-[55%]">
            <div className="flex items-center justify-center gap-2 mb-10 lg:justify-start">
              <span className="w-20 h-0.5 bg-[#1165B1]"></span>
              <p className="text-2xl font-medium text-[#1165B1]">Right Ships</p>
            </div>
            <h2 className="mb-10 text-2xl font-bold text-gray-800 md:text-4xl xl:text-6xl">
              Finding Candidates <br /> Post Jobs
            </h2>
            <p className="mb-10 text-sm font-normal text-gray-500 md:text-md xl:text-lg">
              At Right Ships, we help companies in the marine industry streamline their recruitment process. Our platform enables you to find the most qualified candidates quickly and efficiently.
            </p>
            <div className="space-y-5 lg:space-x-5 mb-10">
              <Link
                to="/company/login"
                className="block px-8 py-3 text-lg font-medium text-white transition duration-300 ease-in-out bg-[#1165B1] rounded-md hover:bg-[#1165B1] md:inline"
              >
                Login
              </Link>
              <Link
                to="/company/register"
                className="block px-8 py-3 text-lg font-medium text-[#1165B1] border-2 border-[#1165B1] rounded-md hover:bg-[#1165B1] hover:text-white transition duration-300 ease-linear md:inline"
              >
                Create New Account
              </Link>
            </div>
            <hr className="mb-5 text-gray-500" />
            <span className="text-sm font-normal text-gray-500">
              Reach the Right Candidates for Your Marine Industry Needs
            </span>
          </div>
          <div className="mx-auto lg:mx-0 lg:w-[45%]">
            <img
              src={WorkingImg}
              alt="Marine job portal for companies to find qualified candidates"
              loading="lazy"
              className="w-full h-auto"
            />
          </div>
        </header>
      </section>
    </>
  );
};

export default HeroSection;
