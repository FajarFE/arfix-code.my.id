import React, { useState } from 'react';
import axios from 'axios';

const MyForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category_id', category);
    formData.append('status_id', status);
    formData.append('image', image);

    axios.post('  ', formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log(response.data);
        setMessage(response.data.message);
      })
      .catch(error => {
        console.log(error.response.data);
        setMessage(error.response.data.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" value={title} onChange={event => setTitle(event.target.value)} />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" value={content} onChange={event => setContent(event.target.value)}></textarea>
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <select id="category" name="category" value={category} onChange={event => setCategory(event.target.value)}>
          <option value="">-- Select category --</option>
          <option value="1">Category 1</option>
          <option value="2">Category 2</option>
          <option value="3">Category 3</option>
        </select>
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <select id="status" name="status" value={status} onChange={event => setStatus(event.target.value)}>
          <option value="">-- Select status --</option>
          <option value="1">Status 1</option>
          <option value="2">Status 2</option>
          <option value="3">Status 3</option>
        </select>
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input type="file" id="image" name="image" onChange={event => setImage(event.target.files[0])} />
      </div>
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default MyForm;
