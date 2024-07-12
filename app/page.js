import Link from "next/link";



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
Hello my Web 
<Link href='/dashboard' className="p-2 bg-lime-500">Go TO Dashboard</Link>
    </main>
  );
}
