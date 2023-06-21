import React from "react";


const Register =()=>{
    return (
        <>
      <div className="w-full h-[100%] flex justify-center items-center">
        <div className="bg-gray[#fff] h-[70%] w-full flex items-center justify-center">
            <form action="POST">
            <label className="block">
                <span className="block text-sm font-medium text-slate-700">Social Security Number</span>
                <input className="w-[400px] rounded-lg h-[30px] mb-2 border border-[]"/>
                <input className="w-[400px] rounded-lg h-[30px]"/>
                <p className="mt-2 opacity-10 contrast-more:opacity-100 text-slate-600 text-sm">
                We need this to steal your identity.
                </p>
            </label>
            </form>
        </div>
      </div>
        
        </>
    )
}

export default Register;