const Authlayout =({children}:{children:React.ReactNode})=>{
    return(
        <div className="flex flex-col min-h-screen justify-center items-center bg-gradient-to-r from from-black to-[#131324] ">
         {children}
        </div>
    )
}

export default Authlayout;