import Hero from "@/components/hero";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen flex justify-center items-center overflow-y-hidden">
      <Hero />
    </main>
  );
}
