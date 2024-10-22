import { Button } from "@/components/ui/button"


export default function Home() {
  return (
    <div className="max-w-screen-xl min-h-screen mx-auto  flex flex-col items-center justify-center">
      <h1 className=" bg-red-200 font-semibold capitalize p-2 rounded-md mt-2" > hey lets learn auth in next.js </h1>
      <Button className=" mt-2" variant="default">Lets go</Button>

    </div>
  );
}
