import Hero from "@/Components/hero/Hero";
import Navbar from "@/Components/navbar/Navbar";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-[#0E0E0E]"> {/* Changed: Added h-screen and overflow-hidden */}
      <Navbar />
      <Hero />
    </div>
  );
}