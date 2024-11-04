import Navbar from "./_components/navbar"

interface ProtectedLayoutProp{
    children:React.ReactNode
}
const ProtectedLayout=({children}:ProtectedLayoutProp)=>{
    return(
        <div className="flex flex-col h-screen w-full justify-center items-center bg-gradient-to-r from from-black to-[#131324] text-white ">
         <Navbar/>
         {children}
        </div>
    )
}
export default ProtectedLayout