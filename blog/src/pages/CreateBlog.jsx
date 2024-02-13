import React, { useState } from 'react';
import axios from 'axios';
import '../style.css';
import Header from '../components/Header';

const CreateBlog = ({ BlogCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleBlogCreated = async () => {
    try {
      const response = await axios.post('https://apitest.reachstar.io/blog/add', {
        title,
        description,
      });

      const newBlog = response.data;
      if (typeof BlogCreated === 'function') {
        BlogCreated(newBlog);
      }
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