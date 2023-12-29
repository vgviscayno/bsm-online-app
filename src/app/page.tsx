import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Image
        src="/bsm-logo-square.png"
        alt="Bestseller Meatshop Logo"
        width={500}
        height={500}
      />
      <h1>Coming Soon :)</h1>
    </main>
  );
}
