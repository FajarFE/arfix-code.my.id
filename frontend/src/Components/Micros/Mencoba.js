import React, { useEffect, useState,useParams } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, CardFooter, Typography, Avatar, Tooltip } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { Tilt } from 'react-tilt';
import Navbar from '../Micros/Navbar';
import Headline from '../Micros/Headline';
import Footer from '../Micros/Footer';
import { useSelector,useDispatch } from 'react-redux';
import { fetchPosts,setTotalPage,setStatusId,setCurrentPage } from '../Store/PostsSlice';


const LandingPage = () => {
  const dispatch = useDispatch();
  const { data, loading, error, totalPage, currentPage, status_id } = useSelector((state) => state.posts);

 // Ganti dengan status_id yang diinginkan

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchPosts(currentPage, status_id));
        console.log(response.payload);
        setTotalPage(response.data.last_page);
        console.log(response.payload.data.last_page);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage, status_id]);

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

export default LandingPage;