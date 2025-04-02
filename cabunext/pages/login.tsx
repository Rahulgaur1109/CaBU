import { Inter } from "next/font/google";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  const [logoError, setLogoError] = useState(false);
  
  return (
    <div className={`min-h-screen w-full flex ${inter.className} overflow-hidden`}>
      <Head>
        <title>CABU - Login</title>
        <meta name="description" content="Login to CABU for a smarter, safer ride!" />
      </Head>

      {/* Left panel - purple rectangle */}
      <div className="w-[132px] h-[1117px] bg-[#8D77AB] shrink-0 fixed top-0 left-0 z-10" />

      <div className="flex-1 pl-[132px] flex justify-center items-center bg-white">
        <div className="relative w-full flex flex-col items-center justify-center">
          {/* Middle rectangle - purple rounded */}
          <div
            className="w-[1107px] h-[700px] rounded-[60px] bg-[#8D77AB] my-[145px] relative"
            style={{ boxShadow: "inset 3px 3px 41.2px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="flex h-full">
              {/* Left content (Login form) */}
              <div className="w-1/2 flex flex-col items-center justify-center pt-5">
                {/* Login form */}
                <div className="w-[478px] flex flex-col space-y-6">
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    className="h-14 rounded-md text-lg" 
                  />
                  <Input 
                    type="password" 
                    placeholder="Password" 
                    className="h-14 rounded-md text-lg" 
                  />
                  <button className="h-[73px] rounded-[10px] bg-white flex items-center justify-center hover:bg-gray-100 transition-colors duration-200">
                    <span className="text-[28px] font-medium leading-[100%] text-black">
                      Log in
                    </span>
                  </button>
                </div>

                {/* Don't have an account? */}
                <div className="flex items-center justify-center space-x-4 mt-12">
                  <span className="text-[28px] font-medium leading-[100%] text-[#FFFFFFA6]">
                    Don&apos;t have an account?
                  </span>
                  
                  <Link href="/" className="text-[28px] font-medium leading-[100%] text-white hover:text-gray-200 transition-colors duration-200">
                    Sign up
                  </Link>
                </div>
              </div>

              {/* Right content (CABU logo and message) */}
              <div className="w-1/2 flex items-center justify-center">
                {/* Rectangle under CABU logo */}
                <div className="w-[406px] h-[403px] rounded-[20px] bg-[#F9F6E6] flex flex-col items-center justify-center">
                  {/* CABU logo */}
                  <div className="mb-8 w-[290px] h-[290px] relative flex items-center justify-center">
                    {logoError ? (
                      <Image
                        src="/cabu-logo.svg"
                        alt="CABU logo"
                        width={290}
                        height={290}
                        className="object-contain"
                        priority
                      />
                    ) : (
                      <Image
                        src="/joinus.png"
                        alt="CABU logo"
                        width={290}
                        height={290}
                        className="object-contain"
                        priority
                        onError={() => setLogoError(true)}
                      />
                    )}
                  </div>

                  {/* Welcome back message */}
                  <div className="text-center w-full px-8">
                    <span className="text-[28px] font-medium leading-[120%] text-black">
                      Welcome back!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Go back button */}
          <Link 
            href="/" 
            className="w-[167px] h-[63px] rounded-[60px] bg-black flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 mt-[-45px] mb-[35px]"
          >
            <span className="text-[28px] font-medium leading-[100%] text-[#F8F3F3]">
              Go back
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
} 