import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert } from '@mui/material';

export default function EditUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [motivation, setMotivation] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [id, setId] = useState('');
  const [profile, setProfile] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isEdit, setIsEdit] = useState(true);
  const [error, setError] = useState('');
  const baseURL = `${window.location.protocol}//${window.location.hostname}:8000`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseURL}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { name, email, motivation, avatar, id } = response.data.user;
        setName(name);
        setEmail(email);
        setId(id);
        setMotivation(motivation);
        setAvatar(avatar);
        console.log({ name, email, motivation, avatar, id });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [baseURL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('motivation', motivation);
    formData.append('current_password', currentPassword);
    formData.append('confirm_password', passwordConfirmation);

    if (profile && profile instanceof File) {
      formData.append('avatar', profile);
    }

    try {
      const response = await axios.post(
        `${baseURL}2/api/update/${id}?_method=PUT`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response.data);
      window.location.reload(true);
    } catch (error) {
      console.error(error);
      console.log(error.response.data);
      if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors);
      } else {
        setError('Terjadi kesalahan');
      }
    }
  };

  function handleInputChange(e) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setProfile(file);
      setAvatar(null);
    } else {
      const value = e.target.value;
      setProfile(null);
      setAvatar(value);
    }
  }
  return (
    <>
      {isEdit ? (
        <div
          className=" flex flex-col justify-start overflow-y-scroll"
          style={{ height: '100vh', width: '85%' }}
        >
          <div className="flex justify-start flex-col mx-32 my-10">
            <div className="flex justify-center my-5 items-center">
              <h4 className="text-[50px] upercase">Profile</h4>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="w-full flex justify-center items-center">
                <div className="flex w-[80%] bg-purple px-5 py-20 rounded-xl justify-center items-center flex-col gap-5">
                  <div
                    className="rounded-full bg-white my-5 relative flex  justify-center items-center"
                    style={{ height: '160px', width: '160px' }}
                  >
                    <div className="h-[150px] w-[150px] rounded-full p-5">
                      <img
                        src={avatar}
                        alt=""
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={(e) => setIsEdit(false)}
                    className="w-[20%] px-4 py-2 rounded-md text-center bg-[#C1AEFC]"
                  >
                    Ubah Profile
                  </button>
                  <div className="flex justify-start items-center gap-10">
                    <div className="flex flex-col justify-center w-[200px] items-center gap-2">
                      <label htmlFor="email" className="font-bold text-[15px]">
                        Name
                      </label>
                      <div className="p-2 rounded-md bg-white w-full">
                        {name}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center w-[200px] items-center gap-2">
                      <label htmlFor="email" className="font-bold text-[15px]">
                        E-mail
                      </label>
                      <div className="p-2 rounded-md bg-white w-full">
                        {email}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 justify-center w-[70%] items-center">
                    <label
                      htmlFor="motivation"
                      className="text-[15px] font-bold"
                    >
                      Motivation
                    </label>
                    <div className="rounded-md bg-white w-full items-center justify-center text-center h-auto flex gap-4 p-5">
                      <span
                        className="text-[40px] font-bold"
                        // Ensure the span takes up the full width
                      >
                        "
                      </span>
                      <p
                        className="text-[20px] break-all font-bold"
                        style={{ flexBasis: '100%' }} // Ensure the paragraph takes up the full width
                      >
                        {motivation}
                      </p>
                      <span
                        className="text-[40px] font-bold"
                        // Ensure the span takes up the full width
                      >
                        "
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div
          className=" flex flex-col justify-start overflow-y-scroll"
          style={{ height: '100vh', width: '85%' }}
        >
          <div className="flex justify-start flex-col mx-32 my-5">
            <h2 className="text-[40px] mt-2 uppercase flex justify-center font-bold">
              Account
            </h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="w-full flex justify-center items-center">
                <div className="flex w-[80%] bg-purple p-5 rounded-xl justify-center items-center flex-col gap-5">
                  <div
                    className="rounded-full bg-white my-5 relative flex  justify-center items-center"
                    style={{ height: '160px', width: '160px' }}
                  >
                    <div className="h-[150px] w-[150px] rounded-full p-5">
                      <img
                        src={avatar}
                        alt=""
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                    <label htmlFor="image-input">
                      <div className="absolute inset-0 top-[120px] bg-gray w-12 h-12 flex items-center justify-center rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </div>
                      <input
                        onChange={handleInputChange}
                        type="file"
                        id="image-input"
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="flex justify-start items-center gap-10">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-[15px] font-bold">
                        Name
                      </label>
                      <input
                        className="focus:outline-none rounded-md p-2"
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                      <label htmlFor="email" className="font-bold text-[15px]">
                        E-mail
                      </label>
                      <input
                        className="focus:outline-none rounded-md p-2"
                        type="text"
                        email="email"
                        id="email"
                        value={email}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 justify-center w-[70%] items-center">
                    <label
                      htmlFor="motivation"
                      className="text-[15px] font-bold"
                    >
                      Motivation
                    </label>
                    <input
                      type="text"
                      className="text-center w-full h-[70px] focus:outline-none rounded-md p-2"
                      name="motivation"
                      id="motivation"
                      value={motivation}
                      onChange={(e) => setMotivation(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center items-center gap-10 w-[70%]">
                    <div className="flex flex-col justify-center items-center gap-2">
                      <label
                        htmlFor="password"
                        className="text-[15px] font-bold"
                      >
                        Current Password
                      </label>
                      <input
                        className=" rounded-md p-2"
                        type="password"
                        name="password"
                        id="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                      <label htmlFor="email" className="text-[15px] font-bold">
                        Konfirmasi Password
                      </label>
                      <input
                        className="rounded-md p-2"
                        type="password"
                        name="password_confirm"
                        id="password_confirm"
                        value={passwordConfirmation}
                        onChange={(e) =>
                          setPasswordConfirmation(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  {error.current_password && (
                    <Alert severity="error">{error.current_password}</Alert>
                  )}
                  {error.confirm_password && (
                    <Alert severity="error">{error.confirm_password}</Alert>
                  )}
                  <button
                    type="submit"
                    className="w-[56%] py-2 rounded-xl font-bold text-[20px] bg-[#C1AEFC] text-white shadow-xl"
                  >
                    Berubah
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
