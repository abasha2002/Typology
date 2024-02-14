import React, { useState, useContext } from 'react';
import { useBlogContext } from '../components/BlogContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import '../style.css';
import Header from '../components/Header';

const CreateBlog = ({ BlogCreated }) => {
  const { addBlog, setBlogs } = useBlogContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleBlogCreated = async () => {
    try {
      const response = await axios.post('https://apitest.reachstar.io/blog/add', {
        title,
        description,
      });

      const newBlog = response.data;

      if (!newBlog.id) {
        newBlog.id = uuidv4();
        console.warn('New blog is missing an "id". Generated a unique id:', newBlog.id);
      }

      setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);

      navigate('/home');
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };


  return (
    <>
      <Header />
      <section className='container-fluid createBlogSection'>
        <h1>Create a New Blog</h1>

        <form>
          <div>
            <label>Title:</label>
            <input type="text" placeholder='Blog title' value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <label>Description:</label>
            <textarea value={description} placeholder='Blog text' onChange={(e) => setDescription(e.target.value)} />
          </div>

          <button type="button" onClick={handleBlogCreated}>
            Create Blog
          </button>
        </form>
      </section>
    </>
  );
};

export default CreateBlog;