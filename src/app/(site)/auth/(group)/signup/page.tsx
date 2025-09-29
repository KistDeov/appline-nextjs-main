"use client";

import { GoogleAuth } from "@/components/Auth/google-auth";
import { MagicLinkForm } from "@/components/Auth/magic-link-form";
import { TabContent, TabList, Tabs, TabTrigger } from "@/components/ui/tabs";
import { SignUpForm } from "./_components/form";

const TABS = [
  { value: "password", label: "Jelszó" }
];

export default function Register() {
  return (
    <>
      <div className="text-center">
        <h3 className="mb-[10px] text-2xl font-bold text-black sm:text-[28px] dark:text-white">
          Fiók létrehozása
        </h3>
        <p className="text-body mb-11 text-base">
          Teljesen ingyenes és nagyon egyszerű
        </p>

        <GoogleAuth label="Regisztráció Google-lal" />

        <div className="relative my-7.5 flex items-center">
          <div className="bg-stroke dark:bg-stroke-dark h-[1px] w-full max-[200px]:hidden" />
          <p className="text-body absolute right-1/2 translate-x-1/2 bg-[#F8FAFB] px-5 min-[200px]:whitespace-nowrap dark:bg-[#15182A]">
            Vagy regisztrálj az email címeddel
          </p>
        </div>
      </div>

      <Tabs defaultValue="password">
        <TabContent value="password">
          <SignUpForm />
        </TabContent>
      </Tabs>
    </>
  );
}
