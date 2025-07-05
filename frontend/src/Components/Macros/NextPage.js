import React, { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPostById,
  fetchPosts,
  setCreatedAt,
  setData,
} from '../Store/PostsSlice';
import { fetchCategory } from '../Store/CategorySlice';
import Navbar from '../Micros/Navbar';
import Footer from '../Micros/Footer';
import Loading from '../Micros/Loading';
import '../../App.css';
import { Avatar, Typography } from '@material-tailwind/react';
export default function NextPage() {
  const dispatch = useDispatch();
  const { data, currentPost, createdAt, error, statusId } = useSelector(
    (state) => state.posts,
  );
  const [openFrontend, setOpenFrontend] = useState(false);
  const [openBackend, setOpenBackend] = useState(false);
  const [openFullstack, setOpenFullstack] = useState(false);
  const [isFront, setIsFront] = useState([]);
  const [isBack, setIsBack] = useState([]);
  const [isFull, setIsFull] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const baseURL = `${window.location.protocol}//${window.location.hostname}:8000`;

  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchData = async () => {
        try {
          await dispatch(fetchPostById(id));
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, 1200);

    return () => clearTimeout(timer);
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(setCreatedAt('terbaru'));
  }, [dispatch]);

  // Memanggil fetchPosts ketika nilai createdAt berubah
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams();
        params.append('status_id', statusId);
        params.append('create_at', createdAt);
        params.append('limit', '4');

        const response = await dispatch(fetchPosts(params));
        const filteredPosts = response.payload.filter((post) => post.id !== id);
        console.log(filteredPosts);
        dispatch(setData(filteredPosts));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch, id, createdAt, statusId]);

  const nextSlide = useCallback(() => {
    const pathsLength = currentPost?.paths?.length || 0;
    if (pathsLength === 0) return;
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % pathsLength);
  }, [currentPost?.paths]);

  useEffect(() => {
    dispatch(fetchCategory())
      .then((response) => {
        if (response.payload.success) {
          setIsFront(
            response.payload.data.filter((category) => category.tipe_id === 1),
          );
          setIsBack(
            response.payload.data.filter((category) => category.tipe_id === 2),
          );
          setIsFull(
            response.payload.data.filter((category) => category.tipe_id === 3),
          );
        }
        console.log(response.payload.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, nextSlide]);

  const prevSlide = useCallback(() => {
    const pathsLength = currentPost?.paths?.length || 0;
    if (pathsLength === 0) return;
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + pathsLength) % pathsLength,
    );
  }, [currentPost?.paths]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentPost?.paths) {
        nextSlide();
      }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [currentPost?.paths, nextSlide]);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  const toggleMenuFrontend = () => {
    setIsOpen(!isOpen);
    setOpenFrontend(!openFrontend);
    setOpenBackend(false);
    setOpenFullstack(false);
  };

  const toggleMenuBackend = () => {
    setIsOpen(!isOpen);
    setOpenBackend(!openBackend);
    setOpenFrontend(false);
    setOpenFullstack(false);
  };

  const toggleMenuFullstack = () => {
    setIsOpen(!isOpen);
    setOpenFullstack(!openFullstack);
    setOpenFrontend(false);
    setOpenBackend(false);
  };

  return (
    <>
      <div className="bg-dark text-white  font-patrick overflow-hidden">
        <Navbar />
        {currentPost && (
          <div className="container mx-auto my-8">
            <div className="relative ">
              <div className="flex justify-center items-center flex-col   ">
                <div className="flex justify-center px-2 gap-2 items-center">
                  <p className="uppercase">
                    {currentPost.category_name.replace(/ /g, ' | ')}
                  </p>{' '}
                  <span>|</span>{' '}
                  <p>
                    {' '}
                    {
                      new Date(currentPost.created_at)
                        .toLocaleString('id-ID', {
                          month: 'long',
                        })
                        .replace(',', '') // Menghapus koma setelah tanggal
                    }
                  </p>
                  <p>
                    {' '}
                    {new Date(currentPost.created_at).toLocaleString('id-ID', {
                      day: 'numeric',
                    })}
                    ,
                  </p>
                  <p>
                    {' '}
                    {
                      new Date(currentPost.created_at)
                        .toLocaleString('id-ID', {
                          year: 'numeric',
                        })
                        .replace(',', '') // Menghapus koma setelah tanggal
                    }
                  </p>
                </div>
                <h2 className="capitalize text-[30px] my-2 font-bold break-words leading-none text-center w-full px-5">
                  {currentPost.title}
                </h2>
                <div className="flex items-center justify-center gap-5">
                  <Avatar
                    size="md"
                    variant="circular"
                    alt="natali craig"
                    src={`${baseURL}/storage/avatars/${currentPost.user_avatar}`}
                    className="border-2 border-white hover:z-10 m-0 p-0"
                  />
                  <div className="flex flex-col">
                    <Typography className="font-patrick text-[18px] p-0 m-0">
                      {currentPost.user_name}
                    </Typography>
                    <Typography className="font-patrik opacity-[60%] text-[16px] p-o m-0">
                      {currentPost.tipe_name}
                    </Typography>
                  </div>
                </div>
              </div>
              {currentPost.quote === null ? (
                ''
              ) : (
                <div className="flex justify-center items-center gap-20 text-sm">
                  <p className="text-sm flex font-bold gap-4 uppercase">
                    "{currentPost.quote}"
                  </p>
                </div>
              )}

              <div className="flex flex-col my-10 container mx-auto justify-center gap-10">
                <div className="h-[300px] lg:h-[400px] md:h-[450px] mx-4 lg:mx-0 md:mx-0 ">
                  <div className="grid grid-cols-12 rounded-md  gap-4 md:flex-col h-[200px] md:h-[300px] lg:h-[400px] ">
                    {currentPost.paths.length > 0 && (
                      <>
                        <div className="col-span-12 rounded-md md:col-span-12 lg:col-span-8 w-full bg-white relative">
                          <div className="w-full rounded-md h-[200px] md:h-[300px] lg:h-[400px] flex justify-center items-center">
                            <img
                              className="object-fit w-full h-full"
                              src={currentPost.paths[currentImageIndex]}
                              alt=""
                            />
                          </div>
                          <div className="flex justify-center mt-4 absolute bottom-0 top-0 left-2">
                            <button className="text-white " onClick={prevSlide}>
                              <svg
                                className="w-[30px] h-[30px]  lg:h-[60px] lg:w-[60px]"
                                fill="#16213E"
                                viewBox="0 0 32 32"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM23.010 14.989h-11.264l3.617-3.617c0.39-0.39 0.39-1.024 0-1.414s-1.024-0.39-1.414 0l-5.907 6.062 5.907 6.063c0.195 0.195 0.451 0.293 0.707 0.293s0.511-0.098 0.707-0.293c0.39-0.39 0.39-1.023 0-1.414l-3.68-3.68h11.327c0.552 0 1-0.448 1-1s-0.448-1-1-1z"></path>
                              </svg>
                            </button>
                          </div>
                          <div className="flex justify-between mt-4 absolute bottom-0 top-0 right-2">
                            <button onClick={nextSlide}>
                              <svg
                                className="w-[30px] h-[30px] lg:h-[60px] lg:w-[60px]"
                                fill="#16213E"
                                viewBox="0 0 32 32"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM16.637 9.957c-0.39 0.39-0.39 1.024 0 1.414l3.617 3.617h-11.264c-0.553 0-1 0.448-1 1s0.447 1 1 1h11.327l-3.68 3.68c-0.39 0.39-0.39 1.023 0 1.414 0.195 0.195 0.451 0.293 0.707 0.293s0.512-0.098 0.707-0.293l5.907-6.063-5.907-6.063c-0.391-0.39-1.023-0.39-1.415 0z"></path>
                              </svg>
                            </button>
                          </div>
                          <div className="absolute bottom-2 right-0 left-0 flex justify-center align-items-center gap-5">
                            <button
                              onClick={() => setCurrentImageIndex(0)}
                              className={`${
                                currentImageIndex === 0
                                  ? 'bg-[#16213E] lg:w-[60px] w-[20px] h-[8px] lg:h-[15px] rounded-[8px]'
                                  : '  border-2 lg:border-4 border-[#16213E] lg:w-[60px] w-[20px] h-[8px] lg:h-[15px] rounded-[8px]'
                              }`}
                            ></button>
                            <button
                              onClick={() => setCurrentImageIndex(1)}
                              className={`${
                                currentImageIndex === 1
                                  ? 'bg-[#16213E] lg:w-[60px] w-[20px] h-[8px] lg:h-[15px] rounded-[8px]'
                                  : 'border-2 lg:border-4 border-[#16213E] lg:w-[60px] w-[20px] h-[8px] lg:h-[15px] rounded-[8px]'
                              }`}
                            ></button>
                            <button
                              onClick={() => setCurrentImageIndex(2)}
                              className={`${
                                currentImageIndex === 2
                                  ? 'bg-[#16213E] lg:w-[60px] w-[20px] h-[8px] lg:h-[15px] rounded-[8px]'
                                  : ' border-2 lg:border-4 border-[#16213E] lg:w-[60px] w-[20px] h-[8px] lg:h-[15px] rounded-[8px]'
                              }`}
                            ></button>
                          </div>
                        </div>
                        <div className="col-span-12 md:col-span-12 rounded-md lg:col-span-4 flex h-auto lg:flex-col gap-4 w-full">
                          {currentPost.paths.length >= 2 && (
                            <div className="w-full h-[100px] lg:h-[200px] rounded-md md:h-[150px] bg-white flex justify-center items-center">
                              <img
                                className="object-fit w-full h-full"
                                src={
                                  currentPost.paths[
                                    (currentImageIndex + 1) %
                                      currentPost.paths.length
                                  ]
                                }
                                alt=""
                              />
                            </div>
                          )}
                          {currentPost.paths.length >= 3 && (
                            <div className="w-full h-[100px] lg:h-[200px] rounded-md md:h-[150px] bg-white flex justify-center items-center">
                              <img
                                className="object-fit w-full h-full"
                                src={
                                  currentPost.paths[
                                    (currentImageIndex + 2) %
                                      currentPost.paths.length
                                  ]
                                }
                                alt=""
                              />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4 ">
                  <div className="col-span-12 px-4 lg:px-0 md:px-0 lg:col-span-9 lg:my-10  flex w-full flex-col gap-4 ">
                    <div
                      className="break-words font-sans leading-none  w-full h-full "
                      dangerouslySetInnerHTML={{ __html: currentPost.content }}
                    ></div>

                    <div className="flex jutify-start -space-x-5">
                      {currentPost.img.map((img, index) => (
                        <>
                          <img
                            className="bg-white border-[#000000] w-[60px] p-2 rounded-md h-[60px] border-2 lg:border-4 hover:z-10 drop-shadow-2xl"
                            src={`${baseURL}/${img}`}
                            alt=""
                          />
                        </>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-3 col-span-12  flex justify-center items-center gap-2 flex-col ">
                    <div className="flex flex-col justify-start items-center w-[70%] lg:w-[100%]">
                      <h2 className="underline decoration-4 decoration-[#F7BA3E]  text-[28px] font-bold underline-4">
                        Category
                      </h2>
                      <div
                        className={`w-full rounded-md mt-5 ${
                          openFrontend ? 'h-auto' : 'h-10'
                        } flex justify-center items-center relative border-2 border-white`}
                      >
                        <div className="absolute left-5 -top-5 ">
                          <h2 className="underline decoration-4 decoration-[#199C9E] bg-[#374151] text-[20px] font-bold underline-4 ">
                            Frontend
                          </h2>
                        </div>
                        <button
                          className="absolute right-0 top-0 focus:outline-none"
                          onClick={toggleMenuFrontend}
                        >
                          {openFrontend ? (
                            <svg
                              width="40px"
                              height="40px"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="Arrow / Chevron_Down">
                                <path
                                  id="Vector"
                                  d="M19 9L12 16L5 9"
                                  stroke="#ffffff"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </g>
                            </svg>
                          ) : (
                            <svg
                              width="40px"
                              height="40px"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="Arrow / Chevron_Up">
                                <path
                                  id="Vector"
                                  d="M5 16L12 9L19 16"
                                  stroke="#ffffff"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </g>
                            </svg>
                          )}
                        </button>
                        {openFrontend && (
                          <>
                            <div className="flex flex-col gap-2 justify-center items-center w-full mt-8 p-2">
                              {isFront.map((frontend) => (
                                <Link
                                  to={`/${frontend.name}/${frontend.id}/${frontend.tipe_name}`}
                                  key={frontend.id}
                                  className="text-[#374151] bg-white  w-full p-2 rounded-[8px] text-md flex justify-center font-bold capitalize "
                                  role="menuitem"
                                  tabIndex="-1"
                                >
                                  {frontend.name}
                                </Link>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      <div
                        className={`w-full rounded-md mt-5  ${
                          openBackend ? 'h-auto' : 'h-10'
                        } flex justify-center items-center relative border-2 border-white`}
                      >
                        <div className="absolute left-5 -top-5">
                          <h2 className="underline decoration-4 decoration-[#BF85BF] bg-[#374151] text-[20px] font-bold underline-4 ">
                            Backend
                          </h2>
                        </div>
                        <button
                          className="absolute right-0 top 0"
                          onClick={toggleMenuBackend}
                        >
                          {openBackend ? (
                            <svg
                              width="40px"
                              height="40px"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="Arrow / Chevron_Down">
                                <path
                                  id="Vector"
                                  d="M19 9L12 16L5 9"
                                  stroke="#ffffff"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </g>
                            </svg>
                          ) : (
                            <svg
                              width="40px"
                              height="40px"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="Arrow / Chevron_Up">
                                <path
                                  id="Vector"
                                  d="M5 16L12 9L19 16"
                                  stroke="#ffffff"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </g>
                            </svg>
                          )}
                        </button>
                        {openBackend && (
                          <>
                            <div className="flex flex-col gap-2 justify-center items-center w-full mt-8 p-2">
                              {isBack.map((backend) => (
                                <Link
                                  to={`/${backend.name}/${backend.id}/${backend.tipe_name}`}
                                  key={backend.id}
                                  className="text-[#374151] bg-white  w-full p-2 rounded-[8px] text-md flex justify-center font-bold capitalize "
                                  role="menuitem"
                                  tabIndex="-1"
                                >
                                  {backend.name}
                                </Link>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      <div
                        className={`w-full rounded-md mt-5  ${
                          openFullstack ? 'h-auto' : 'h-10'
                        } flex justify-center items-center relative border-2 border-white`}
                      >
                        <div className="absolute left-5 -top-5">
                          <h2 className="underline decoration-4 bg-[#374151] decoration-[#EA5E5E] text-[20px] font-bold underline-4 ">
                            Full Stack
                          </h2>
                        </div>
                        <button
                          className="absolute right-0 top-0"
                          onClick={toggleMenuFullstack}
                        >
                          {openFullstack ? (
                            <svg
                              width="40px"
                              height="40px"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="Arrow / Chevron_Down">
                                <path
                                  id="Vector"
                                  d="M19 9L12 16L5 9"
                                  stroke="#ffffff"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </g>
                            </svg>
                          ) : (
                            <svg
                              width="40px"
                              height="40px"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="Arrow / Chevron_Up">
                                <path
                                  id="Vector"
                                  d="M5 16L12 9L19 16"
                                  stroke="#ffffff"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </g>
                            </svg>
                          )}
                        </button>
                        {openFullstack && (
                          <>
                            <div className="flex flex-col gap-2 justify-center items-center w-full mt-8 p-2">
                              {isFull.map((fullstack) => (
                                <Link
                                  to={`/${fullstack.name}/${fullstack.id}/${fullstack.tipe_name}`}
                                  key={fullstack.id}
                                  className="text-[#374151] bg-white  w-full p-2 rounded-[8px] text-md flex justify-center font-bold capitalize "
                                  role="menuitem"
                                  tabIndex="-1"
                                >
                                  {fullstack.name}
                                </Link>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <h2 className="underline underline-offset-8 decoration-4 decoration-purple text-[28px] flex justify-center items-center font-bold underline-4 mb-5 mt-10">
                      Artikel Terbaru
                    </h2>
                    {data && Array.isArray(data.data) && (
                      <div className="grid grid-cols-12 gap-4 w-[65%]  lg:w-full md:w-full">
                        {data.data.map((post, index) => (
                          <a
                            href={`/${post.title}/${post.id}`}
                            key={index}
                            className="col-span-12  md:col-span-6 lg:col-span-12 "
                          >
                            <div className="flex justify-center items-center border-2  rounded-[8px] relative">
                              <img
                                src={post.paths[1]}
                                alt={post.title}
                                className="object-fit h-[170px] w-96 rounded-[12px]"
                              />
                              <div className="absolute flex right-0 left-2 bottom-2 -space-x-5">
                                {post.img.map((category, index) => (
                                  <Avatar
                                    key={index}
                                    size="sm"
                                    variant="circular"
                                    alt="category"
                                    src={category}
                                    className="border-2  object-fit hover:z-10"
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="break-words uppercase leading-none text-center font-bold line-clamp-2 w-full">
                              {post.title}
                            </p>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
}
