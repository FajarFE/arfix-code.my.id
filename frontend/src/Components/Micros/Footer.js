import React from "react";
import { Facebook,Instagram,Github,Twitter,Logo,Linkedin,Website } from "../../asset";

const Footer =(props) => {
    return(
        <>
        <footer class="relative font-patrick py-4 lg:py-0 md:py-0 text-white items-center flex justify-center">
        <div class="container mx-auto px-4">
            <div class="flex flex-wrap text-left  lg:text-left">
            <div class="w-full lg:w-full  px-4 border-b-4 gap-4 border-white flex justify-center items-center lg:flex-row flex-col  py-5">
            <div className="flex flex-shrink-0 items-center">
          <img className="block h-20 w-auto lg:hidden" src={Logo} alt="Your Company"/>
          <img className="hidden h-[150px] w-auto lg:block" src={Logo} alt="Your Company"/>
        </div>
        <div className="block lg:hidden md:hidden flex">
        <a href="https://www.facebook.com/fajar.fernandi.9/" className="p-2 bg-white text-blue shadow-lg font-normal h-10 w-10 md:w-7 md:h-7 lg:w-10 lg:h-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2">
    <img src={Facebook} alt="" />
</a>


<a href="https://twitter.com/FajarFernandi2" className="p-2 bg-white text-blue shadow-lg font-normal h-10 w-10 md:w-7 md:h-7 lg:w-10 lg:h-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2">
    <img src={Twitter} alt="" />
</a>

<a href="https://github.com/FajarFE" className="p-2 bg-white text-blue shadow-lg font-normal h-10 w-10 md:w-7 md:h-7 lg:w-10 lg:h-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2">
    <img src={Github} alt="" />
</a>

<a href="https://www.instagram.com/faj_fer/" className="p-2 bg-white text-blue shadow-lg font-normal h-10 w-10 md:w-7 md:h-7 lg:w-10 lg:h-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2">
    <img src={Instagram} alt="" />
</a>

<a href="https://www.linkedin.com/in/fajar-fernandi-96a569161/" className="p-2 bg-white text-blue shadow-lg font-normal h-10 w-10 md:w-7 md:h-7 lg:w-10 lg:h-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2">
    <img src={Linkedin} alt="" />
</a>

<a href="https://www.ffajar.my.id" className="p-2 bg-white text-blue shadow-lg font-normal h-10 w-10 md:w-7 md:h-7 lg:w-10 lg:h-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2">
    <img src={Website} alt="" />
</a>

                </div>
            </div>
          
            </div>
            <div class="flex relative flex-wrap py-0 lg:py-4 md:py-4 items-center md:justify-between justify-center">
            <div class="w-full md:w-4/12 px-2 mx-auto py-4 lg:py-0 md:py-0 text-center">
                <div class="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © <span id="get-current-year">2023</span><a href="portofolio-fajar.vercel.app" class="text-blueGray-500 hover:text-gray-800" target="_blank"> FAJAR FERNANDI </a>
               
                </div>
            </div>
            <div className="flex absolute right-0 hidden lg:flex md:flex">
    <a href="https://www.facebook.com/fajar.fernandi.9/" className="p-2 bg-white text-blue shadow-lg font-normal h-10 w-10 md:w-7 md:h-7 lg:w-10 lg:h-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2"><img src={Facebook} alt="" /></a>
    <a href="https://twitter.com/FajarFernandi2" className="p-2 bg-white text-blue shadow-lg font-normal h-10 w-10 md:w-7 md:h-7 lg:w-10 lg:h-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2"><img src={Twitter} alt="" /></a>
    <a href="https://github.com/FajarFE" className="p-2 bg-white text-blue shadow-lg font-normal h-10 w-10 md:w-7 md:h-7 lg:w-10 lg:h-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2"><img src={Github} alt="" /></a>
    <a href="https://www.instagram.com/faj_fer/" className="p-2 bg-white text-blue shadow-lg font-normal h-10 w-10 md:w-7 md:h-7 lg:w-10 lg:h-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2"><img src={Instagram} alt="" /></a>
    <a href="https://www.linkedin.com/in/fajar-fernandi-96a569161/" className="p-2 bg-white text-blue shadow-lg font-normal h-10 w-10 md:w-7 md:h-7 lg:w-10 lg:h-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2"><img src={Linkedin} alt="" /></a>
    <a href="https://www.ffajar.my.id" className="p-2 bg-white text-blue shadow-lg font-normal h-10 w-10 md:w-7 md:h-7 lg:w-10 lg:h-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2"><img src={Website} alt="" /></a>
</div>

            </div>
        </div>
        </footer>
        </>
    )
}

export default Footer;