import React, { useState, useEffect } from "react";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/posts");
        if (response.data.success) {
          setPosts(response.data.data.data);
        }
      } catch (error) {
        console.error(error);
        alert("Failed to fetch posts");
      }
    }

    fetchData();
  }, []);

  return (
    <>
    <div className="mx-auto container px-3 ">
      <div className="flex justify-center">
      <div className=" grid grid-cols-5 gap-4 ">
      {posts.map((post) => (
        <div className="grid justify-items-center bg-blue" key={post.id}>
          <h2>{post.title}</h2>
          <img style={{height:'40px'}} src={post.image} alt={post.title} />
          <p>{post.content}</p>
        </div>
      ))}
    </div>
      </div>
    
    </div>
    
    </>
    
  );
}

export default Posts;
