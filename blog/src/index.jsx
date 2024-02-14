import React, { Component } from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BlogProvider } from './components/BlogContext';

import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import CreateBlog from './pages/CreateBlog';

class App extends Component{
    render(){
        return (
            <React.Fragment>
                <BrowserRouter>
                    <BlogProvider>
                        <Routes>
                            <Route index element={ <Login /> } />
                            <Route path='/registration' element={<Registration />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/home' element={<Home />} />
                            <Route path='/createBlog' element={<CreateBlog />} />
                        </Routes>
                    </BlogProvider>
                </BrowserRouter>
            </React.Fragment>   
        )
    }
}

var root = document.getElementById("root");
ReactDOM.createRoot(root).render(<App />);