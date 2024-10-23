import { Button } from "@/components/ui/button"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils";//for  combining class names
const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
})
export default async function Home() {

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-r from-indigo-500 to-pink-500
">
      <h1 className={cn(
        "text-7xl font-semibold text-white drop-shadow-md",
        font.className
      )}>🔐Auth</h1>
      <p className="text-xl font-medium capitalize text-white  "> 
       A simple Auth service</p>
       <Button size='lg'  className=" mt-2 bg-slate-50 text-black  outline-none font-serif font-medium text-lg " > Sign-in</Button>
    </main>
  );
}
//bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent purple to pink