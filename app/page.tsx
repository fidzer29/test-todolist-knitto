import Image from "next/image";
import Logo from "../assets/knitto.png";

export default function Home() {
  return (
    <div className="bg-teal-400 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Image
            src={Logo}
            alt="Logo"
            style={{ width: "70px", height: "70px" }}
          />
          <h1>Welcome to HomePage</h1>
          <a
            href="/todo"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Go to Todo Page
          </a>
        </div>
      </main>
    </div>
  );
}
