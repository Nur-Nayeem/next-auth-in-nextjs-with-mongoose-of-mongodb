"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  if (!session.data) {
    return (
      <div className="h-[90vh] flex justify-center items-center bg-base-200">
        LOADING...
      </div>
    );
  }

  if (session.data) {
    return (
      <section className="h-[90vh] flex justify-center items-center bg-base-200">
        <div className="border border-gray-400 p-10 rounded-2xl bg-base-100 space-y-6 flex flex-col items-center">
          {session.data?.user.image && (
            <div className="relative w-[200px] h-[200px] rounded-full border-2 border-white overflow-hidden">
              <Image
                src={session.data?.user.image}
                fill
                sizes="90px 100px 120px 150px"
                priority
                loading="eager"
                alt="userImage"
              />
            </div>
          )}
          <p>{session.data?.user.name}</p>
          <button onClick={handleSignOut} className="btn w-full">
            Sign Out
          </button>
        </div>
      </section>
    );
  }
}
