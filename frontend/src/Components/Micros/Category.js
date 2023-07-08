import { useState } from 'react';
import axios from 'axios';

export default function Category  (props) {
    const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages ] = useState([]);
  const [name, setName] = useState('');
  const [tipe, setTipe] = useState('');
  const baseURL = `${window.location.protocol}//${window.location.hostname}:8000`;
   
  const handleFileChange = (event) => {
    const fileList = Array.from(event.target.files);
    const previewURLs = fileList.map(file => URL.createObjectURL(file));
    setPreviewImages(prevPreviewImages => [...prevPreviewImages, ...previewURLs]);
    setImages(prevImages => [...prevImages, ...fileList]);
  };
  
  const handleFileRemove = (index) => {
    const newPreviewImages = [...previewImages];
    const newImages = [...images];
    newPreviewImages.splice(index, 1);
    newImages.splice(index, 1);
    setPreviewImages(newPreviewImages);
    setImages(newImages);
  };
  
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy';
  };
  
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const fileList = Array.from(event.dataTransfer.files);
    const previewURLs = fileList.map(file => URL.createObjectURL(file));
    setPreviewImages(prevPreviewImages => [...prevPreviewImages, ...previewURLs]);
    setImages(prevImages => [...prevImages, ...fileList]);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('name', name);
    images.forEach((image, index) => {
      formData.append('images[]', image);
    });
    formData.append('tipe_id', tipe);
    
    try {
      const response = await axios.post(`${baseURL}/api/categories`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
      props.closed();
    } catch (error) {
      console.log(error.response.data.errors);
    }
  };
  
    return(
        <>
        <div className="w-full h-full absolute flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(192, 192, 192, 0.5' }}>
    <div className="w-[800px] h-[600px] rounded-xl relative flex-col flex items-center">
      <button className='absolute left-0 top-0'
      onClick={props.onClick}
      >
      <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Edit / Close_Circle">
<path id="Vector" d="M9 9L11.9999 11.9999M11.9999 11.9999L14.9999 14.9999M11.9999 11.9999L9 14.9999M11.9999 11.9999L14.9999 9M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>
      </button>
      <h1 className="uppercase my-5">Masukan Category</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="my-5 w-full">
        <div className="flex w-full justify-between gap-8">
          <label htmlFor="name" className="flex flex-col w-[50%]">
            <span>Nama</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="focus:outline-none p-2 rounded-xl w-full"
              placeholder="Masukan Nama"
            />
          </label>
          <label htmlFor="tipe" className="flex flex-col w-[50%]">
            <span>Tipe</span>
            <select
              name="tipe"
              id="tipe"
              value={tipe}
              onChange={(e) => setTipe(e.target.value)}
              className="p-2 rounded-xl focus:outline-none"
            >
              <option value="" disabled defaultValue>Pilih Tipe</option>
              <option value={1}>Frontend</option>
              <option value={2}>Backend</option>
              <option value={3}>Fullstack</option>
            </select>
          </label>
        </div>
        <div
          className="bg-white w-full my-10 flex justify-center items-center flex-col py-4 rounded-xl outline outline-4 outline-dashed"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="extraOutline p-4 bg-white w-[50%]">
            <svg className="w-24 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <div className="input_field flex flex-col w-max mx-auto text-center">
              <label>
                <input className="text-sm cursor-pointer w-36 hidden" type="file" multiple onChange={handleFileChange} />
                <div className="text bg-indigo-600 text-gray border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-yellow">Select</div>
              </label>
              <div className="title text-indigo-500 uppercase">or drop files here</div>
            </div>
          </div>
          {previewImages.length > 0 ? (
            <div className="flex gap-4 items-center justify-center">
              {previewImages.map((previewURL, index) => (
                <div className="flex justify-center flex-col items-center" key={index}>
                  <img src={previewURL} alt={`Preview ${index}`} style={{ maxWidth: '50px', marginTop: '0.5rem' }} />
                  <button className="mt-1 text-sm text-white bg-[#DE3163] p-1 rounded-sm" onClick={() => handleFileRemove(index)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
              SVG, PNG, JPG or GIF (MAX. 800x400px).
            </p>
          )}
        </div>
        <button type="submit" className="bg-[#DE3163] text-white p-2 rounded-xl w-full">Submit</button>
      </form>
    </div>
  </div>
        </>
    )
}