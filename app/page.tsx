"use client";
import { userDataContext } from "@/context/UserContext";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { HiPencil } from "react-icons/hi2";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const data = useContext(userDataContext);
  const router = useRouter();

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut({ callbackUrl: "/login" });
    } catch (error) {
      setLoading(false);
    }
  };

  // Redirect to login if not authenticated
  if (!data?.user) {
    router.push("/login");
    return (
      <div className="h-[90vh] flex justify-center items-center bg-base-200">
        Redirecting...
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-[90vh] flex justify-center items-center bg-base-200">
        LOADING...
      </div>
    );
  }

  return (
    <section className="h-[90vh] flex justify-center items-center bg-base-200">
      <div className="border border-gray-400 p-10 rounded-2xl bg-base-100 space-y-6 flex flex-col items-center relative">
        <HiPencil
          size={22}
          color="black"
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => router.push("/edit")}
        />
        {data?.user?.image && (
          <div className="relative w-[200px] h-[200px] rounded-full border-2 border-white overflow-hidden">
            <Image
              src={data.user.image}
              fill
              sizes="90px 100px 120px 150px"
              priority
              loading="eager"
              alt="userImage"
            />
          </div>
        )}
        <p>{data?.user?.name}</p>
        <button onClick={handleSignOut} className="btn w-full">
          Sign Out
        </button>
      </div>
    </section>
  );
}
