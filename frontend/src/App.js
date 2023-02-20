import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
//import Footer from './components/Footer'
import MyBooks from './components/MyBooks'
import Login from './components/Login'
import BookDetails from './components/BookDetails'
import AddBookForm from './components/AddBookForm'
import Signup from './components/Signup'
import Profile from './components/Profile'
import AllBooks from './components/AllBooks'
import Blogs from './components/Blogs'
import { useAuthContext } from './hooks/useAuthContext'
import AddBlog from './components/AddBlog'
import BlogDetails from './components/BlogDetails'


function App() {

  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            
            <Route exact path='/' element={<Home />}/>
            <Route exact path='/books' element={<AllBooks />} />
            <Route exact path="/books/:id" element={<BookDetails />} />

            <Route exact path="/blogs" element={<Blogs/>} />
            <Route exact path="/post-blogs" element={<AddBlog/> } />
            <Route exact path="/blogs/:id" element={<BlogDetails/>} />



            <Route exact path='/my-books' element={<MyBooks />}/>
           

            <Route exact path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
            <Route exact path='/signup' element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route exact path='/post-book' element={user ? <AddBookForm /> : <Navigate to="/login" />} />
            <Route exact path='/profile' element={<Profile />} />

          </Routes>
        </div>
        {/* <Footer /> */}
      </BrowserRouter>

    </div>
  );
}

export default App;
