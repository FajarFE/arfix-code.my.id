import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Typography, Avatar, Tooltip } from '@material-tailwind/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Tilt } from 'react-tilt';
import Navbar from '../Micros/Navbar';
import Headline from '../Micros/Headline';
import Footer from '../Micros/Footer';
import { fetchPosts, setCurrentPage, setTotalPage } from '../Store/PostsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Micros/Loading';
import DOMPurify from 'dompurify';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {motion} from 'framer-motion';
import CardLanding from '../Micros/Card';




const LandingPage = () => {
  const dispatch = useDispatch();
  const { data,limit, error, currentPage,totalPage,statusId, } = useSelector((state) => state.posts);
  const [loading, setLoading] = useState(true);
  const [currentPageSearch, setCurrentPageSearch] = useState(1);
  const [totalPageSearch, setTotalPageSearch] = useState(0);
  const navigate = useNavigate();
  const status_id = 2; // Ganti dengan status_id yang diinginkan
  const {searchTerm} = useParams();
  const [searchData,setSearchData] = useState([]);
  const baseURL = `${window.location.protocol}//${window.location.hostname}:8000`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/posts`, {
          params: {
            status_id: status_id,
            page: currentPageSearch,
            search_term: searchTerm,
            limit:3,
          },
        });
        console.log(response.data.data);
        setSearchData(response.data.data);
        setTotalPageSearch(response.data.last_page);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [currentPageSearch, status_id, searchTerm]);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        handleTokenExpired();
      }
    } else {
      handleTokenExpired();
    }
  }, []);

  const handleTokenExpired = () => {
    localStorage.removeItem("token"); // Menghapus token dari local storage
 // Redirect ke halaman login
  };
 
  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      dispatch(fetchPosts({ status_id: statusId, page: currentPage,limit:limit }))
        .then((response) => {
          console.log(response.payload);
          dispatch(setTotalPage(response.payload.last_page));
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 1200);
  
    return () => clearTimeout(timer);
  }, [dispatch, statusId, currentPage,limit]);
    
  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
    
  };

   
 
  
  const renderPagination = () => {
    if (totalPage <= 1) {
      return null;
    }
  
    const pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="flex items-center justify-center mt-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${
            currentPage === 1 ? 'hidden' : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
        
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === pageNumber ? 'bg-blue-500 text-white' : 'text-white'
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className={`ml-2 px-4 py-2 rounded ${
            currentPage === totalPage ? 'hidden' : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPage}
        
        >
          Next
        </button>
      </div>
    );
  };
  
  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handlePageChangeSearch = (pageNumber) => {
    setCurrentPageSearch(pageNumber);
  };
  
  const renderPaginationSearch = () => {
    if (totalPageSearch <= 1) {
      return null;
    }
  
    const pageNumbers = [];
    for (let i = 1; i <= totalPageSearch; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="flex items-center justify-center mt-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${
            currentPageSearch === 1 ? 'hidden' : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          onClick={() => handlePageChangeSearch(currentPageSearch - 1)}
          disabled={currentPageSearch === 1}
        >
          Previous
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`mx-1 px-3 py-1 rounded ${
              currentPageSearch === pageNumber ? 'bg-blue-500 text-white' : 'text-white'
            }`}
            onClick={() => handlePageChangeSearch(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className={`ml-2 px-4 py-2 rounded ${
            currentPageSearch === totalPageSearch ? 'hidden' : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          onClick={() => handlePageChangeSearch(currentPageSearch + 1)}
          disabled={currentPageSearch === totalPageSearch}
        >
          Next
        </button>
      </div>
    );
  };
  
  return (
    <>
    
<div className='bg-dark w-screen overflow-hidden '>
      <Navbar />
      <div className="container mb-20 mx-auto flex flex-col justify-center items-center font-patrick">
      <motion.div
  className='h-auto w-full  '
  initial={{ y: -1000 }} // Posisi awal, di atas layar (jauh dari tampilan)
  animate={{ y: 0 }} // Posisi akhir, di tengah layar (posisi normal)
  transition={{ duration: 1 }} // Durasi animasi dalam detik
>
  <Headline/>
</motion.div>
<div className="container flex flex-col mx-auto  ">

{searchData.length > 0 ? (
  <>
   <div className="container mx-auto  font-patrick">
        <div className="my-5 font-bold relative w-full justify-center items-center">
          <h1 className=" flex flex-col text-white text-[30px] justify-center items-center lg:flex-row">Hasil Pencarian : <span className='text-[#b6feff]' >
          {searchTerm} </span> </h1>
          <hr className="absolute bg-purple bottom-1 -z-[99] h-2 w-[280px]" />
        </div>
        <div className="grid  grid-cols-12 lg:gap-10 md:gap-10 block w-full">
        {searchData.map((item, index) =>(
   <CardLanding index={index} id={item.id} title={item.title} paths={item.paths[0]} category_name={item.category_name} content={item.content} user_avatars={item.user_avatar} baseURL={baseURL} created_at={item.created_at} user_name={item.user_name} tipe_name={item.tipe_name}/>
))}

        </div>
        {renderPaginationSearch()}
      </div>

  </>
):(
  <>
   <div className="-mt-20 lg:-mt-0 font-patrick container mb-10 mx-auto flex flex-col gap-5 relative  justify-center items-center">
          <h1 className="text-white text-[30px]">Hasil Pencarian : <span className='text-[#b6feff]' >
          {searchTerm} </span> </h1>
          <p className='text-[#EA5E5E] text-[35px] lg:text-[50px]'>
            Tidak ada artikel yang ditemukan !
          </p>
        </div>
  </>
)}
</div>
<div className="my-5 lg:mt-10 font-bold relative">
  <motion.div
    className='h-auto'
    initial={{ y: 100 }} // Posisi awal, di bawah layar (jauh dari tampilan)
    animate={{ y: 0 }} // Posisi akhir, di tengah layar (posisi normal)
    transition={{ duration: 0.5 }} // Durasi animasi dalam detik
  >
    <h1 className="text-white  text-[50px]">Artikel Terbaru</h1>
    <hr className="absolute bg-purple bottom-1  h-2 w-[280px]" />
  </motion.div>
</div>

        <div className="grid  grid-cols-12 lg:gap-10 md:gap-10 block w-full">
  {data &&
    Array.isArray(data.data) &&
    data.data.map((item, index) => (
      <CardLanding index={index} id={item.id} title={item.title} paths={item.paths[0]} category_name={item.category_name} content={item.content} user_avatars={item.user_avatar} baseURL={baseURL} created_at={item.created_at} user_name={item.user_name} tipe_name={item.tipe_name}/>
    ))}
</div>

        {renderPagination()}
      </div>
      <Footer />
      </div>
    </>
  );
};

export default LandingPage;