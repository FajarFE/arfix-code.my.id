import React from "react";
import { Facebook,Instagram,Github,Twitter,Logo } from "../../asset";

const Footer =(props) => {
    return(
        <>
        <footer class="relative font-patrick text-white pt-8 pb-6">
        <div class="container mx-auto px-4">
            <div class="flex flex-wrap text-left lg:text-left">
            <div class="w-full lg:w-6/12 px-4">
            <div className="flex flex-shrink-0 items-center">
          <img className="block h-20 w-auto lg:hidden" src={Logo} alt="Your Company"/>
          <img className="hidden h-[150px] w-auto lg:block" src={Logo} alt="Your Company"/>
        </div>
                <div class="mt-6 lg:mb-0 mb-6">
                <button class="p-1 bg-white text-blue shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                     <img src={Facebook} alt="" />
                </button>
                <button class="p-1 bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                    <img src={Twitter} alt="" />
                </button>
                <button class="p-1 bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                    <img src={Github} alt="" />
                </button><button class="p-1 bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                    <img src={Instagram} alt="" />
                </button>
                </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
                <div class="flex flex-wrap items-top mb-6">
                <div class="w-full lg:w-4/12 px-4 ml-auto">
                    <span class="block uppercase 0 text-sm font-semibold mb-2 text-[20px]">Category</span>
                    <ul class="list-unstyled uppercase">
                    <li>
                        <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://www.creative-tim.com/presentation?ref=njs-profile">Front End</a>
                    </li>
                    <li>
                        <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://blog.creative-tim.com?ref=njs-profile">Back End</a>
                    </li>
                    <li>
                        <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://www.github.com/creativetimofficial?ref=njs-profile">FullStack</a>
                    </li>
                    </ul>
                </div>
                <div class="w-full lg:w-4/12 px-4">
                    <span class="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Menu</span>
                    <ul class="list-unstyled">
                    <li>
                        <a class="text-gray hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="/">
                            Home
                        </a>
                    </li>
                    <li>
                        <a class="text-gray hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="/register">
                            Register
                        </a>
                    </li>
                    <li>
                        <a class="text-gray hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="/login">
                            Login
                        </a>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
            <div class="flex flex-wrap items-center md:justify-between justify-center">
            <div class="w-full md:w-4/12 px-2 mx-auto text-center">
                <div class="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © <span id="get-current-year">2023</span><a href="portofolio-fajar.vercel.app" class="text-blueGray-500 hover:text-gray-800" target="_blank"> FAJAR FERNANDI </a>
            
                </div>
            </div>
            </div>
        </div>
        </footer>
        </>
    )
}

export default Footer;