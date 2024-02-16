import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style.css';
import { useBlogContext } from './BlogContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';

function HomeBlogsSection() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState({ id: '', title: '', description: '' });
  const { blogs, setBlogs } = useBlogContext();

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


  const handleDeleteBlog = async (blogId) => {
    try {
      await axios.delete(`https://apitest.reachstar.io/blog/delete/${blogId}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

 
  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`https://apitest.reachstar.io/blog/edit/${editingBlog.id}`, {
        title: editingBlog.title,
        description: editingBlog.description,
      });

      // Update the local state with the edited blog
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === editingBlog.id ? { ...blog, title: editingBlog.title, description: editingBlog.description } : blog
        )
      );

      // Close the edit modal
      handleCloseEditModal();
    } catch (error) {
      console.error('Error editing blog:', error);
    }
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
                <button onClick={() => handleEditBlog(blog)}>edit</button>
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

      </div>
          
      <div className='blogs-footer'>
        <h2>Typology</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At vero aliquam animi! Iure, nesciunt blanditiis?</p>
      </div>


      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editBlogTitle">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={editingBlog.title}
                onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="editBlogDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={editingBlog.description}
                onChange={(e) => setEditingBlog({ ...editingBlog, description: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  )
}

export default HomeBlogsSection