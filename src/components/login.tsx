import clsx from "clsx";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

import ChooseSheetButton from "./choose_sheet_modal";

import { type BusseUser } from "../types/auth";
import { useEffect } from "react";

const AuthComponent: React.FC = () => {
  const router = useRouter();
  const data = useSession();
  const userData = data.data?.user as BusseUser;

  const sheetsBaseUrl =
    (typeof window !== "undefined" && window.location.href.split("/")[3]) ?? "";

  const isSheets = sheetsBaseUrl === "sheet";

  return (
    <>
      <div className="flex absolute top-2 right-2">
        <div className="flex justify-between items-center space-x-2">
          {userData && (
            <p className="text-xs md:text-sm italic">
              Logged in as{" "}
              <span className="font-semibold underline">{userData?.Email}</span>
            </p>
          )}
          <button
            className={clsx(
              "px-2 py-1 border-2  rounded-md text-xs md:text-sm font-semibold",
              userData
                ? "border-red-500 text-red-500 hover:text-red-700"
                : "border-blue-500 text-blue-500 hover:text-blue-700"
            )}
            onClick={userData ? () => signOut() : () => signIn()}
          >
            {userData ? "Sign out" : "Sign in"}
          </button>
        </div>
      </div>
      <div className="flex absolute top-2 left-2">
        {userData && isSheets ? (
          <ChooseSheetButton />
        ) : (
          <button
            className="px-2 py-1 border-2  rounded-md text-xs md:text-sm font-semibold border-stone-500 text-stone-500 hover:text-stone-700"
            onClick={() => router.push("/sheet/1")}
          >
            Go to sheets
          </button>
        )}
      </div>
    </>
  );
};

export default AuthComponent;
