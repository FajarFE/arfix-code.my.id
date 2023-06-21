import React, { useState, useEffect, useRef } from "react";
import Hookopen from "./hookopen";
import Add from "./Add";
import axios from "axios";
import JoditEditor from "jodit-react";
import Alert from "@mui/material/Alert";
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";

const FormArtikel = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [message, setMessage] = useState("");
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { id } = useParams();
  const [Tipe, setTipe] = React.useState([]);
  const [selectedTipe, setSelectedTipe] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [originalImages, setOriginalImages] = useState([]);
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:8000/api/posts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { title, content, status_id, category_id, paths } =
          response.data;
        setTitle(title);
        setContent(content);
        setPaths(paths); // Simpan paths data dari response
        if (paths && paths.length > 0) {
          setImages(paths);
          setPreviewImages(paths);
        } else {
          setImages([...originalImages]); // Mengisi images dengan nilai originalImages
          setPreviewImages([...originalImages]); // Mengisi previewImages dengan nilai originalImages
        }
        setStatus(status_id);
        setSelectedCategory(category_id);
        setLoading(false);

      } catch (error) {
        console.error(error);
        setMessage("Failed to fetch post");
        setLoading(false);
        console.log(error.response.data);
      }
    };

    fetchPost();
  }, []);

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const fileList = Array.from(event.dataTransfer.files);
    const updatedImages =
      fileList.length > 0 ? [...fileList] : [...originalImages];
    setImages(updatedImages);
  };

  const handleImageChange = (event) => {
    const fileList = event.target.files;
    const updatedImages =
      fileList.length > 0 ? [...fileList] : [...originalImages];
    setImages(updatedImages);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
  };
  const handleRemovePreview = (index) => {
    const newImages = [...images];
    const newOriginalImages = [...originalImages];
    newImages.splice(index, 1);
    newOriginalImages.splice(index, 1);
    setImages(newImages);
    setOriginalImages(newOriginalImages);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const userToken = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category_id", selectedCategory);
    formData.append("status_id", status);
    if (images.length === 0) {
      paths.forEach((path, index) => {
        formData.append(`images[${index}]`, path);
      });
    } else {
      images.forEach((image) => {
        formData.append("images[]", image);
      });
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/posts/${id}?_method=PUT`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setMessage(response.data.message);
      console.log("sukses");
    } catch (error) {
      console.error(error); 
      const { errors } = error.response.data;
      console.log(errors.response.data);
      setError(errors);
    }
  };

  const [pesan, setPesan] = useState("");

  const handleDraftClick = () => {
    setStatus(1);
    // setTimeout(() => {
    //   setPesan('Artikel Berhasil di Simpan');
    //   window.location.reload();
    // }, 2500);
  };

  const handleArchivedClick = () => {
    setStatus(3);
    // setTimeout(() => {
    //   setPesan('Artikel Berhasil di Simpan');
    //   window.location.reload();
    // }, 2500);
  };

  const handlePublishClick = () => {
    setStatus(2);
    // setTimeout(() => {
    //   setPesan('Artikel Berhasil di Simpan');
    //   window.location.reload();
    // }, 2500);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/api/tipe");
        if (response.data && response.data.success && response.data.data) {
          setTipe(response.data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  let isAlertRendered = false;
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8000/api/categories"
        );
        if (response.data && response.data.success && response.data.data) {
          setCategories(response.data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const renderCategoryOptions = () => {
    // filter kategori berdasarkan tipe_id
    const filteredCategories = categories.filter(
      (category) => category.tipe_id == selectedTipe
    );

    return filteredCategories.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ));
  };
  const { isOpen, toggleMenu } = Hookopen();

  return (
    <>
      <div
        className=" flex flex-col justify-start overflow-y-scroll"
        style={{ height: "100vh", width: isOpen ? "74%" : "85%" }}
      >
        <h2 className="text-[40px] mt-2 uppercase font-bold">EDIT ARTIKEL</h2>
        <div className="flex justify-start mx-32 my-5">
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center">
                <a
                  href="#"
                  class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    class="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  Home
                </a>
              </li>
              <li>
                <div class="flex items-center">
                  <svg
                    aria-hidden="true"
                    class="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <a
                    href="#"
                    class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    Projects
                  </a>
                </div>
              </li>
              <li aria-current="page">
                <div class="flex items-center">
                  <svg
                    aria-hidden="true"
                    class="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                    Flowbite
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="w-[100%] flex justify-center items-center ">
            <div className="w-[80%] bg-gray-light h-[130px] rounded-t-[10px] shadow-xl">
              <label htmlFor="" className="flex flex-col w-[100%] items-center">
                {error.title && <p>{error.title[0]}</p>}{" "}
                {/* Menampilkan pesan kesalahan untuk field title */}
                <span className="text-left px-5 my-2 font-bold w-[100%]">
                  Judul
                </span>
                <input
                  type="text"
                  name="title"
                  value={title}
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-[96%] rounded-[10px] bg-white h-[40px] px-5 focus:outline-none"
                  placeholder="Masukan Judulnya"
                />
              </label>
            </div>
          </div>
          <div className="w-full my-5 flex justify-center items-center">
            <div className="w-[80%] bg-gray-light h-auto shadow-xl rounded-[10px]">
              <div
                className="bg-white m-5 rounded-lg gap-2 py-2 justify-center shadow-lg border-2 border-dashed flex flex-col text-center w-auto"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="flex flex-col justify-center items-center">
                  <div
                    className="file_upload p-5 relative rounded-lg"
                    style={{ width: "450px" }}
                  >
                    <svg
                      className="text-indigo-500 w-24 mx-auto mb-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <div className="input_field text-center flex-col items-center flex justify-center">
                      <label>
                        <input
                          className="text-sm cursor-pointer w-[200px] hidden"
                          type="file"
                          placeholder="Upload s"
                          id="images"
                          name="images"
                          accept="images/*"
                          multiple
                          onChange={handleImageChange}
                        />

                        <div className="text bg-indigo-600 text-gray border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-yellow">
                          Select
                        </div>
                      </label>
                      <div className="title text-indigo-500 uppercase">
                        or drop files here
                      </div>
                      <div className="flex gap-10 justify-center items-center">
                        {images.map((image, index) => (
                          <div
                            className="flex flex-col justify-center items-center"
                            key={index}
                          >
                            {typeof image === "string" ? (
                              <>
                                <img
                                  src={image}
                                  alt={`Preview ${index}`}
                                  style={{ width: "70px" }}
                                />
                                <a
                                  className="bg-purple  px-4 py-2  mt-2 text-white"
                                  href={image}
                                >
                                  Download
                                </a>
                              </>
                            ) : (
                              <>
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt={`Preview ${index}`}
                                  style={{ width: "70px" }}
                                />
                                <button
                                  onClick={() => handleRemovePreview(index)}
                                >
                                  Remove
                                </button>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {error.images &&
                    Object.keys(error.images).map((key) =>
                      error.images[key].map((errorMessage, index) => (
                        <Alert key={`${key}-${index}`} severity="warning">
                          {errorMessage}
                        </Alert>
                      ))
                    )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full my-5  flex justify-center items-center ">
            <div className="w-[80%] bg-gray-light h-auto shadow-xl">
              {error.content && <p>{error.content[0]}</p>}
              <JoditEditor
                ref={editor}
                value={content}
                onChange={(newContent) => setContent(newContent)}
              />
            </div>
          </div>
          <div className="w-[100%] my-2 flex justify-center items-center ">
            <div className="w-[80%] h-auto grid grid-cols-2 gap-4">
              <div className="h-auto w-full bg-gray-light p-4 shadow-xl rounded-[7px]">
                <label htmlFor="category-frontend">
                  <span className="text-left my-2 font-bold w-full">Tipe</span>
                  <select
                    name="category-frontend"
                    id="category-frontend"
                    className="w-full rounded-10px bg-white h-[30px] rounded-[10px] my-2 px-5 focus:outline-none"
                    value={selectedTipe}
                    onChange={(event) => setSelectedTipe(event.target.value)}
                  >
                    <option value="">Pilih Kategori</option>
                    {Tipe.map((tipe) => (
                      <option key={tipe.id} value={tipe.id}>
                        {tipe.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="h-auto p-4 shadow-xl rounded-[7px] bg-gray-light w-auto">
                <label htmlFor="category-selection">
                  <span className="text-left px-5 my-2 font-bold w-full">
                    Kategori
                  </span>
                  <select
                    name="category-selection"
                    id="category-selection"
                    className="w-full rounded-10px bg-white h-[30px] rounded-[10px] my-2 px-5 focus:outline-none"
                    value={selectedCategory}
                    onChange={(event) =>
                      setSelectedCategory(event.target.value)
                    }
                  >
                    <option value="">Pilih Kategori</option>
                    {renderCategoryOptions()}
                  </select>
                </label>
              </div>
            </div>
          </div>
          <div className="w-full my-5 flex justify-center items-center">
            <div className="w-[80%] h-auto shadow-xl">
              {message && <Alert severity="success">{message}</Alert>}
            </div>
          </div>
          <div className="w-[100%] my-5 flex justify-center items-center ">
            <div className="w-[80%] h-auto flex justify-end gap-5">
              <button
                type="submit"
                onClick={handleDraftClick}
                value={status}
                className="bg-white h-10 w-[200px] rounded-[5px] shadow-xl flex items-center justify-center"
              >
                <svg
                  fill="#000000"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21,4a1,1,0,0,0-1-1H17V2a1,1,0,0,0-1-1H8A1,1,0,0,0,7,2V3H4A1,1,0,0,0,3,4V22a1,1,0,0,0,1,1H20a1,1,0,0,0,1-1ZM9,3h6V5H9ZM19,21H5V5H7V6A1,1,0,0,0,8,7h8a1,1,0,0,0,1-1V5h2Zm-6-3a1,1,0,0,1-1,1H8a1,1,0,0,1,0-2h4A1,1,0,0,1,13,18Zm4-4a1,1,0,0,1-1,1H8a1,1,0,0,1,0-2h8A1,1,0,0,1,17,14Zm0-4a1,1,0,0,1-1,1H8A1,1,0,0,1,8,9h8A1,1,0,0,1,17,10Z" />
                </svg>{" "}
                Draft
              </button>
              <button
                type="submit"
                onClick={handleArchivedClick}
                value={status}
                className="bg-white h-10 w-[200px] rounded-[5px] shadow-xl flex items-center justify-center"
              >
                {" "}
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#000000"
                    d="M128 320v576h576V320H128zm-32-64h640a32 32 0 0 1 32 32v640a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32zM960 96v704a32 32 0 0 1-32 32h-96v-64h64V128H384v64h-64V96a32 32 0 0 1 32-32h576a32 32 0 0 1 32 32zM256 672h320v64H256v-64zm0-192h320v64H256v-64z"
                  />
                </svg>{" "}
                Archived
              </button>
              <button
                type="submit"
                onClick={handlePublishClick}
                value={status}
                className="bg-white h-10 w-[200px] rounded-[5px] shadow-xl flex items-center justify-center"
              >
                {" "}
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m 4 0 c -1.644531 0 -3 1.355469 -3 3 v 10 c 0 1.644531 1.355469 3 3 3 h 3 c 0.550781 0 1 -0.449219 1 -1 s -0.449219 -1 -1 -1 h -3 c -0.570312 0 -1 -0.429688 -1 -1 v -10 c 0 -0.570312 0.429688 -1 1 -1 h 5.585938 l 3.414062 3.414062 v 0.585938 c 0 0.550781 0.449219 1 1 1 s 1 -0.449219 1 -1 v -1 c 0 -0.265625 -0.105469 -0.519531 -0.292969 -0.707031 l -4 -4 c -0.1875 -0.1875 -0.441406 -0.292969 -0.707031 -0.292969 z m 7 8 v 3 h -3 v 2 h 3 v 3 h 2 v -3 h 3 v -2 h -3 v -3 z m 0 0"
                    fill="#2e3436"
                  />
                </svg>{" "}
                Publish
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormArtikel;