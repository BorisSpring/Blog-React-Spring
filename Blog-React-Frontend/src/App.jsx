import React from 'react';
import { Route, Routes } from 'react-router-dom';

// components
import {
  Navigation,
  Messages,
  UserList,
  HomeSlidersList,
  CategoriesList,
  BlogList,
  CommentsList,
  AddUserForm,
  HomeSliderForm,
  BlogForm,
  Footer,
  LoginForm,
  TagList,
  AdminProtectedRouter,
  UpdateInfo,
} from './components';

//pages
import {
  BlogPage,
  HomePage,
  ContactPage,
  SingleBlog,
  AdminDashboard,
} from './pages';

const App = () => {
  const shoudShowNavigationAndFooter =
    !window.location.pathname.startsWith('/dashboard');

  return (
    <>
      {shoudShowNavigationAndFooter && <Navigation />}
      <Routes>
        <Route exact path='/login' element={<LoginForm />} />
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/blogs/:id?/:authorName?' element={<BlogPage />} />
        <Route exact path='/contact' element={<ContactPage />} />
        <Route exact path='/blog/:blogId/:blogName' element={<SingleBlog />} />
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
            <Route path='addUser/:userId?' element={<AddUserForm />} />
            <Route path='addSlider/:slideId?' element={<HomeSliderForm />} />
            <Route path='addBlog/:blogId?' element={<BlogForm />} />
          </Route>
        </Route>
      </Routes>
      {shoudShowNavigationAndFooter && <Footer />}
    </>
  );
};

export default App;
