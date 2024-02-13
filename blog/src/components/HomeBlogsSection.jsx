import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import CreateBlog from '../pages/CreateBlog';

function HomeBlogsSection() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogList = async () => {
      try {
        const response = await axios.get('https://apitest.reachstar.io/blog/list');
        const data = response.data;
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blog list:', error);
      }
    };

    fetchBlogList();
  }, []);


  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const updateContainerHeight = () => {
      const container = document.querySelector('.blogs-container');
      if (container) {
        setContainerHeight(container.offsetHeight);
      }
    };

    const debounce = (func, delay) => {
      let timeoutId;
      return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
        }, delay);
      };
    };

    updateContainerHeight();

    window.addEventListener('resize', debounce(updateContainerHeight, 300));

    return () => {
      window.removeEventListener('resize', debounce(updateContainerHeight, 300));
    };
  }, [blogs]);

  const handleBlogCreated = (newBlog) => {
    setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await axios.delete(`https://apitest.reachstar.io/blog/delete/${blogId}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleEditBlog = async (blogId) => {
    console.log(`Editing blog with ID: ${blogId}`);
  };

  return (
    
    <section className="blogs-section container-fluid" style={{ height: containerHeight + 150 }}>
      <div className='blogs-container'>
        <h1>Latest Stories</h1>
        {blogs.map((blog) => (
          <article key={blog.id}>
            <div className='blogsUnderline'></div>
            
            <div className='articleChange'>
              <h2 className='blogTitle'>{blog.title}</h2>
              <div>
                <button>edit</button>
                <button onClick={() => handleDeleteBlog(blog.id)}>delete</button>
              </div>
            </div>
            
            <p className='blogDescription'>{blog.description}</p>
            
            <div className='articleButtons'>
              <button>Read on</button>
              <button>
                <FontAwesomeIcon icon={faBookmark} className='bookmark-icon' />
                read later
              </button>
            </div>
          </article>
        ))}
         <CreateBlog BlogCreated={handleBlogCreated} />
      </div>
          
      <div className='blogs-footer'>
        <h2>Typology</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At vero aliquam animi! Iure, nesciunt blanditiis?</p>
      </div>
    </section>
  )
}

export default HomeBlogsSection