import { useState } from 'react';
import useAuth from './useAuth';
import axios from 'axios';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [statusId, setStatusId] = useState(1);
  const [categoryId, setCategoryId] = useState(1);
  const [error, setError] = useState(null);
  const baseURL = `${window.location.protocol}//${window.location.hostname}:8000`;

  const uploadArticle = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/api/posts`,
        {
          title,
          content,
          user_id: user.id,
          status_id: statusId,
          categories_id: categoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={logout}>Logout</button>

      <h2>Upload Article</h2>
      {error && <p>{error}</p>}
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </label>
        <br />
        <label>
          Status:
          <select value={statusId} onChange={(e) => setStatusId(e.target.value)}>
            <option value={1}>Draft</option>
            <option value={2}>Published</option>
          </select>
        </label>
        <br />
        <label>
          Category:
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value={1}>News</option>
            <option value={2}>Opinion</option>
            <option value={3}>Feature</option>
          </select>
        </label>
        <br />
        <button onClick={uploadArticle}>Upload</button>
      </form>
    </div>
  );
};

export default Dashboard;
