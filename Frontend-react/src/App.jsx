import { useEffect } from 'react';
import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import ContactPage from './components/ContactPage/ContactPage';
import HomePage from './components/MainPage/HomePage';
import SingleBlog from './components/SingleBlogPage/SingleBlog';
import BlogPage from './components/BlogPage/BlogPage';
import AdminProtectedRouter from './components/Dashboard/AdminProtectedRouter';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import UpdateInfo from './components/Dashboard/users/UpdateInfo';
import Messages from './components/Dashboard/messages/Messages';
import HomeSlidersList from './components/Dashboard/slides/HomeSlidersList';
import HomeSliderForm from './components/Dashboard/slides/HomeSliderForm';
import TagList from './components/Dashboard/tags/TagList';
import UserList from './components/Dashboard/users/UserList';
import CategoriesList from './components/Dashboard/categories/CategoriesList';
import BlogList from './components/Dashboard/blogs/BlogList';
import BlogForm from './components/Dashboard/blogs/BlogForm';
import CommentsList from './components/Dashboard/comments/CommentsList';
import AddUserFrom from './components/Dashboard/users/AddUserForm';

const App = () => {
  const [showFooterNav, setShowFooterNav] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setShowFooterNav(() => !window.location.pathname.startsWith('/dashboard'));
  }, [location]);

  return (
    <>
      {showFooterNav && <Navigation />}
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/login' element={<LoginForm />} />
        <Route exact path='/contact' element={<ContactPage />} />
        <Route exact path='/blog/:blogId/:blogName' element={<SingleBlog />} />
        <Route exact path='/blogs/:id?/:authorName?' element={<BlogPage />} />
        <Route element={<AdminProtectedRouter />}>
          <Route path='/dashboard' element={<AdminDashboard />}>
            <Route path='update' element={<UpdateInfo />} />
            <Route path='messages' element={<Messages />} />
            <Route path='tags' element={<TagList />} />
            <Route path='userList' element={<UserList />} />
            <Route path='sliders' element={<HomeSlidersList />} />
            <Route path='categories' element={<CategoriesList />} />
            <Route path='blogs' element={<BlogList />} />
            <Route path='comments' element={<CommentsList />} />
            <Route path='addUser/:userId?' element={<AddUserFrom />} />
            <Route path='addUser/updateInfo' element={<AddUserFrom />} />
            <Route path='addSlider/:slideId?' element={<HomeSliderForm />} />
            <Route path='addBlog/:blogId?' element={<BlogForm />} />
          </Route>
        </Route>
      </Routes>
      {showFooterNav && <Footer />}
    </>
  );
};

export default App;
