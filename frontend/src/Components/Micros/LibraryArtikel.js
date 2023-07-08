import React, { useState, useEffect } from "react";
import axios from "axios";
import Hookopen from "./hookopen";
import PublishIcon from "@mui/icons-material/Publish";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Link, useParams } from "react-router-dom";
import { Alert } from "@mui/material";
import Category from "./Category";
import { fetchPosts, setCurrentPage, setTotalPage } from '../Store/PostsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Micros/Loading';
import DOMPurify from 'dompurify';

function Detail() {
  const [show, setShow] = useState(null);
  const [limit, setLimit] = useState(12);
  const [createAt, setCreateAt] = useState('terbaru');
  const [statusId, setStatusId] = useState(null);
  const [error, setError] = useState(null);
  const [addCategory, setAddCategory] = useState(false);
  const [originalImages, setOriginalImages] = useState([]);
  const [paths, setPaths] = useState([]);
  const [archived,setArchived] = useState(false);
  const [publish,setPublish] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [draft,setDraft] = useState(false);
  const [all,setAll]=useState(true);
  const dispatch = useDispatch();
  const { data,totalPage,currentPage} = useSelector((state) => state.posts);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const { isOpen, toggleMenu } = Hookopen();
  const baseURL = `${window.location.protocol}//${window.location.hostname}:8000`;

  useEffect(() => {
    // Ambil data posting dari backend saat komponen dimuat
    fetchPosts();
  }, [selectedPosts]); // Menambahkan selectedPosts sebagai dependensi


  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      dispatch(fetchPosts({  status_id: statusId, page: currentPage,limit:limit,create_at: createAt}))
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
  }, [dispatch, statusId, currentPage,limit,createAt]);
    
  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
    
  };

  

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
  };

  const handleCreateAtChange = (e) => {
    setCreateAt(e.target.value);
  };

  const handleAllStatusChange = (e) => {
    setStatusId(null);
    setAll(true);
    setArchived(false);
    setPublish(false);
    setDraft(false);
  };

  const handleArchivedStatusChange = (e) => {
    setStatusId(3);
    setAll(false);
    setArchived(true);
    setPublish(false);
    setDraft(false);
  };

  const handlePublishStatusChange = (e) => {
    setStatusId(2);
    setAll(false);
    setArchived(false);
    setPublish(true);
    setDraft(false);
  };

  const handleDraftStatusChange = (e) => {
    setStatusId(3);
    setAll(false);
    setArchived(false);
    setPublish(false);
    setDraft(true);
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
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      setLoading(true);
      await Promise.all(
        selectedPosts.map(async (postId) => {
          await axios.delete(`${baseURL}/api/posts/${postId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        })
      );
      window.location.reload();
      console.log('Posts deleted successfully');
      setSelectedPosts([]);
      fetchPosts(); // Refresh daftar posting setelah penghapusan
    } catch (error) {
      console.error(error);
      setError('Gagal menghapus posting.');
    } finally {
      setLoading(false);
    }
  };

  const toggleCheckbox = (postId) => {
    if (selectedPosts.includes(postId)) {
      setSelectedPosts(selectedPosts.filter((id) => id !== postId));
    } else {
      setSelectedPosts([...selectedPosts, postId]);
    }
  };

  const handleAddCategory = () => {
    setAddCategory(true);
  };

  const handleClosed = () => {
    setAddCategory(false);
  };

  const handleChange = (event) => {
    setCreateAt(event.target.value);
  };
    return (
        <>
            <div className="h-screen w-screen overflow-y-auto">
                <div className="sm:px-6 w-full">
                    <div className="px-4 md:px-10 py-4 md:py-7">
                        <div className="flex items-center justify-center">
                            <p className="text-base sm:text-lg md:text-xl lg:text-[30px] font-bold leading-normal text-[200px] text-gray-800">Library Artikel</p>
                        

                        </div>
                    </div>
                    <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                        <div className="sm:flex items-center justify-between">
                            <div className="flex items-center">
                              
                                <button
                                onClick = {handleAllStatusChange}
                                >
                                    <div className={`py-2 px-8 ${all?'bg-indigo-100 text-indigo-700':''}  rounded-full`}>
                                        <p>All</p>
                                    </div>
                                </button>
                                <button
                                onClick = {handlePublishStatusChange}
                                >
                                    <div className={`py-2 px-8 ${publish?'bg-indigo-100 text-indigo-700':''}  rounded-full`}>
                                        <p>Publish</p>
                                    </div>
                                </button>
                                <button
                                onClick = {handleArchivedStatusChange}
                                >
                                    <div className={`py-2 px-8 ${archived?'bg-indigo-100 text-indigo-700':''}  rounded-full`}>
                                        <p>Archived</p>
                                    </div>
                                </button>
                                <button
                                onClick = {handleDraftStatusChange}
                                >
                                    <div className={`py-2 px-8 ${draft?'bg-indigo-100 text-indigo-700':''}  rounded-full`}>
                                        <p>Draft</p>
                                    </div>
                                </button>
                            </div>
                            <div className=" px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
  <p>Sort By:</p>
  <select
    value={createAt}
    onChange={handleChange}
    className="focus:outline-none bg-transparent ml-1"
  >
    <option value="terbaru" className="text-sm text-indigo-800">
      Berdasarkan Terbaru
    </option>
    <option value="terlama" className="text-sm text-indigo-800">
      Bedasarkan Terlama
    </option>
  </select>
</div>
<div className="w-20">


                            {selectedPosts.length > 0 && (
            <button className="w-10 h-10 px-2 py-1 rounded-[5px] rounded bg-[#DB005B] flex justify-center items-center" onClick={handleDelete}><svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12V17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 12V17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4 7H20" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg></button>
          )}
</div>
                        </div>
                        <div className="mt-7">
                            <table className="w-full ">
                                <tbody className="gap-2 w-full flex-col justify-center items-center flex">
                                    {data && Array.isArray(data.data) && data.data.map((item, index) => (

                                    <tr className="justify-between rounded-[20px] w-full items-center flex h-16 border border-2 border-gray rounded-m">
                                        <td>
                                            <div className="ml-5">
                                            <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
  <input
    type="checkbox"
    className="checkbox opacity-0 absolute cursor-pointer w-full h-full"
    checked={selectedPosts.includes(item.id)}
    onChange={() => toggleCheckbox(item.id)}
  />
  <div className={`${selectedPosts.includes(item.id) ? 'check-icon bg-indigo-700' : 'border border-2 border-gray-light'} text-white rounded-sm`}>
    <svg className="icon icon-tabler icon-tabler-check" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M5 12l5 5l10 -10" />
    </svg>
  </div>
</div>

                                            </div>
                                        </td>
                                        <td className="w-[40%]">
                                            <div className="flex items-center pl-5">
                                            <p className="text-base font-medium leading-none text-gray-700 mr-2 ">{item.title.slice(0, 30)}...</p>

                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                                    <path d="M6.66669 9.33342C6.88394 9.55515 7.14325 9.73131 7.42944 9.85156C7.71562 9.97182 8.02293 10.0338 8.33335 10.0338C8.64378 10.0338 8.95108 9.97182 9.23727 9.85156C9.52345 9.73131 9.78277 9.55515 10 9.33342L12.6667 6.66676C13.1087 6.22473 13.357 5.62521 13.357 5.00009C13.357 4.37497 13.1087 3.77545 12.6667 3.33342C12.2247 2.89139 11.6251 2.64307 11 2.64307C10.3749 2.64307 9.77538 2.89139 9.33335 3.33342L9.00002 3.66676" stroke="#3B82F6" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M9.33336 6.66665C9.11611 6.44492 8.8568 6.26876 8.57061 6.14851C8.28442 6.02825 7.97712 5.96631 7.66669 5.96631C7.35627 5.96631 7.04897 6.02825 6.76278 6.14851C6.47659 6.26876 6.21728 6.44492 6.00003 6.66665L3.33336 9.33332C2.89133 9.77534 2.64301 10.3749 2.64301 11C2.64301 11.6251 2.89133 12.2246 3.33336 12.6666C3.77539 13.1087 4.37491 13.357 5.00003 13.357C5.62515 13.357 6.22467 13.1087 6.66669 12.6666L7.00003 12.3333" stroke="#3B82F6" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </td>
                                        <td className="pl-24">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                                    <path d="M9.16667 2.5L16.6667 10C17.0911 10.4745 17.0911 11.1922 16.6667 11.6667L11.6667 16.6667C11.1922 17.0911 10.4745 17.0911 10 16.6667L2.5 9.16667V5.83333C2.5 3.99238 3.99238 2.5 5.83333 2.5H9.16667" stroke="#52525B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                    <circle cx="7.50004" cy="7.49967" r="1.66667" stroke="#52525B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <p className="text-sm leading-none text-gray-600 capitalize ml-2">{item.status_name}</p>
                                            </div>
                                        </td>
                                        
                                                                    <td className="pl-5">
                                            <button className="py-3 px-3 text-sm focus:outline-none leading-none text-red-500 bg-red-100 hover:bg-red-200 rounded">Create at  {new Date(item.created_at).toLocaleString("id-ID", {day: "numeric",month: "long",year:"numeric"})}</button>
                                        </td>
                                        <td className="pl-4">
                                            <button className="text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">View</button>
                                        </td>
                                        <td>
                                            <div className="relative px-5 pt-2">
                                                {show == index ? (
                                                    <button className="focus:outline-none" onClick={() => setShow(null)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                                            <path d="M4.16667 10.8332C4.62691 10.8332 5 10.4601 5 9.99984C5 9.5396 4.62691 9.1665 4.16667 9.1665C3.70643 9.1665 3.33334 9.5396 3.33334 9.99984C3.33334 10.4601 3.70643 10.8332 4.16667 10.8332Z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </button>
                                                ) : (
                                                    <button className="focus:outline-none" onClick={() => setShow(index)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                                            <path d="M4.16667 10.8332C4.62691 10.8332 5 10.4601 5 9.99984C5 9.5396 4.62691 9.1665 4.16667 9.1665C3.70643 9.1665 3.33334 9.5396 3.33334 9.99984C3.33334 10.4601 3.70643 10.8332 4.16667 10.8332Z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </button>
                                                )}
                                                {show == index && (
                                                    <div className="dropdown-content bg-white shadow w-24 absolute z-30 right-0 -mr-[16px] ">
                                                        <a href={`${item.id}/edit`} className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                                                            <p>Edit</p>
                                                        </a>
                                                        <button onClick={handleDelete} className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                                                            <p>Delete</p>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>                                                             

                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>  
            </div>
        </>
    );
}

export default Detail;
