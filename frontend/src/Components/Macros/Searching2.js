import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, CardFooter, Typography, Avatar, Tooltip } from '@material-tailwind/react';
import { Link, useNavigate , useParams } from 'react-router-dom';
import { Tilt } from 'react-tilt';
import Navbar from '../Micros/Navbar';
import Headline from '../Micros/Headline';
import Footer from '../Micros/Footer';

const CategoryPages = () => {
  const [data, setData] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPageSearch, setCurrentPageSearch] = useState(1);
  const [totalPageSearch, setTotalPageSearch] = useState(0);
  const navigate = useNavigate();
  const status_id = 2; // Ganti dengan status_id yang diinginkan
  const {searchTerm} = useParams();
  const [searchData,setSearchData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/posts', {
          params: {
            status_id: status_id,
            page: currentPageSearch,
            search_term: searchTerm,
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
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/posts', {
          params: {
            status_id: status_id,
            page: currentPage,
          },
        });
        console.log(response.data.data);
        setData(response.data.data);
        setTotalPage(response.data.last_page);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [currentPage, status_id]);
  
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
            currentPageSearch === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
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
              currentPageSearch === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
            onClick={() => handlePageChangeSearch(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className={`ml-2 px-4 py-2 rounded ${
            currentPageSearch === totalPageSearch ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          onClick={() => handlePageChangeSearch(currentPageSearch + 1)}
          disabled={currentPageSearch === totalPageSearch}
        >
          Next
        </button>
      </div>
    );
  };
  
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
            currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
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
              currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className={`ml-2 px-4 py-2 rounded ${
            currentPage === totalPage ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPage}
        >
          Next
        </button>
      </div>
    );
  };
  

  return (
    <>
      <Navbar />
      <Headline />
      <div className="container flex flex-col mx-auto my-10">

        {searchData.length > 0 ? (
          <>
          <div className="mb-10 font-bold flex flex-col ">
        <span className='text-[50px] decoration-purple capitalize w-[200px] underline decoration-4 underline-purple'>Category</span>
            <p className='ml-56 -mt-7 text-purple text-[30px] uppercase'> {searchTerm} </p>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-5">
          {searchData.map((data, index) => (
            <div className="col-span-3" key={index}>
              <Link to={`/${data.title}/${data.id}`}>
                <Tilt>
                  <Card className="h-full max-w-[24rem] relative">
                    <div className="absolute top-[170px] p-5 flex items-center justify-center -space-x-3 my-4 z-50">
                      {data.img.map((category, index) => (
                        <Avatar
                          key={index}
                          size="m"
                          variant="circular"
                          alt="category"
                          src={category}
                          className="border-2 border-[#fffff] hover:z-10 bg-white p-1"
                        />
                      ))}
                    </div>
                    <CardHeader floated={false} shadow={false} color="transparent" className="m-0 rounded-none relative">
                      <div className=" h-56">
                        <img className="absolute h-full w-full" src={data.paths[1]} alt={data.title} />
                      </div>
                    </CardHeader>
                    <CardBody className="p-0 px-6 my-4">
                      <Typography variant="h5" color="blue-gray" className="text-center flex justify-center items-center capitalize line-clamp-3 h-[40px] mt-[20px]">
                        {data.title}
                      </Typography>
                    </CardBody>
                    <CardFooter className="flex items-center justify-between p-0 px-6 my-4">
                      <div className="flex items-center">
                        <Tooltip content={data.user_name}>
                          <Avatar
                            size="sm"
                            variant="circular"
                            alt="candice wu"
                            src={`http://localhost:8000/storage/avatars/${data.user_avatar}`}
                            className="border-2 border-white hover:z-10"
                          />
                        </Tooltip>
                      </div>
                      <Typography className="font-normal text-[20px]">
                        {new Date(data.created_at).toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </Typography>
                    </CardFooter>
                  </Card>
                </Tilt>
              </Link>
            </div>
          ))}
        </div>
          </>
        ):(
          <>
          <div className="flex justify-center items-center font-bold">
            Hasil Pencarian Tidak Ditemukan
          </div>
          </>
        )}
        {renderPaginationSearch()}
      </div>
      <div className="container mx-auto my-10">
        <div className="mb-10 font-bold relative">
            <h1 className='text-[50px]'>Artikel Terbaru</h1>
           
                <hr className=' absolute bg-purple bottom-1 -z-[99] h-2 w-[280px]' />
        </div>
        <div className="grid grid-cols-12 gap-4 mt-5">
          {data.map((data, index) => (
            <div className="col-span-3" key={index}>
              <Link to={`/${data.title}/${data.id}`}>
                <Tilt>
                  <Card className="h-full max-w-[24rem] relative">
                    <div className="absolute top-[170px] p-5 flex items-center justify-center -space-x-3 my-4 z-50">
                      {data.img.map((category, index) => (
                        <Avatar
                          key={index}
                          size="m"
                          variant="circular"
                          alt="category"
                          src={category}
                          className="border-2 border-[#fffff] hover:z-10 bg-white p-1"
                        />
                      ))}
                    </div>
                    <CardHeader floated={false} shadow={false} color="transparent" className="m-0 rounded-none relative">
                      <div className=" h-56">
                        <img className="absolute h-full w-full" src={data.paths[1]} alt={data.title} />
                      </div>
                    </CardHeader>
                    <CardBody className="p-0 px-6 my-4">
                      <Typography variant="h5" color="blue-gray" className="text-center flex justify-center items-center capitalize line-clamp-3 h-[40px] mt-[20px]">
                        {data.title}
                      </Typography>
                    </CardBody>
                    <CardFooter className="flex items-center justify-between p-0 px-6 my-4">
                      <div className="flex items-center">
                        <Tooltip content={data.user_name}>
                          <Avatar
                            size="sm"
                            variant="circular"
                            alt="candice wu"
                            src={`http://localhost:8000/storage/avatars/${data.user_avatar}`}
                            className="border-2 border-white hover:z-10"
                          />
                        </Tooltip>
                      </div>
                      <Typography className="font-normal text-[20px]">
                        {new Date(data.created_at).toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </Typography>
                    </CardFooter>
                  </Card>
                </Tilt>
              </Link>
            </div>
          ))}
        </div>
        {renderPagination()}
      </div>
      <Footer />
    </>
  );
};

export default CategoryPages;
