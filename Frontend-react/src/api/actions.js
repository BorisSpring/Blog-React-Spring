import axios from 'axios';
import { comment } from 'postcss';

const BASE_URL = 'http://localhost:8080/';

export function getCsrfCookie() {
  const cookies = document.cookie.split(';');
  let csrfToken = null;

  cookies?.forEach((cookie) => {
    const trimmedCookie = cookie?.trim();
    if (trimmedCookie.startsWith('XSRF-TOKEN')) {
      csrfToken = trimmedCookie.split('=')[1];
    }
  });
  return csrfToken;
}

const blogApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const blogApiAuth = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
});

blogApiAuth.interceptors.request.use(
  (config) => {
    console.log('HTTP zahtev:', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function sendMessage(message) {
  try {
    const res = await blogApi.post(`/api/messages`, message);
    return res.data;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data.message;
  }
}

export async function getAllMessages(params) {
  try {
    const { data } = await blogApiAuth.get('/api/messages', { params: params });
    return data;
  } catch (error) {
    console.error(error.response?.data.message);
  }
}

export async function markMsgAsRead(msgId) {
  try {
    return await blogApiAuth.put(`/api/messages/readed/${msgId}`);
  } catch (error) {
    return error.response.data.message;
  }
}

export async function markAsUnread(msgId) {
  try {
    return await blogApiAuth.put(`/api/messages/unread/${msgId}`);
  } catch (error) {
    return error.response.data.message;
  }
}

export async function deleteMessage(msgId) {
  try {
    return await blogApiAuth.delete(`/api/messages/${msgId}`);
  } catch (error) {
    return error.response.data.message;
  }
}

export async function addNewUser(formData) {
  try {
    return await blogApiAuth.post(`${BASE_URL}auth/signup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
}

export async function findAllUsers(params) {
  try {
    const { data } = await blogApiAuth.get('/api/users', { params: params });
    return data;
  } catch (error) {
    return error.response.data.msg;
  }
}

export async function unbanUser(userId) {
  try {
    return await blogApiAuth.put(`/api/users/unban/${userId}`);
  } catch (error) {
    return error.response.data.msg;
  }
}

export async function banUser(userId) {
  try {
    return await blogApiAuth.put(`/api/users/ban/${userId}`);
  } catch (error) {
    return error.response.data.msg;
  }
}

export async function deleteUser(userId) {
  try {
    return await blogApiAuth.delete(`/api/users/${userId}`);
  } catch (error) {
    return error.response.data.message;
  }
}

export async function addHomeSlider(slideRequest) {
  try {
    return await blogApiAuth.post(`/api/slides`, slideRequest, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}

export async function getAllHomeSliders(params) {
  try {
    const { data } = await blogApiAuth.get(`/api/slides/allSlides`, {
      params: params,
    });
    return data;
  } catch (error) {
    console.log(error.response?.data);
  }
}

export async function enableSlide(slideId) {
  try {
    return await blogApiAuth.put(`/api/slides/enableSlide/${slideId}`);
  } catch (error) {
    return error.response.data;
  }
}

export async function disableSlide(slideId) {
  try {
    return await blogApiAuth.put(`/api/slides/disable/${slideId}`);
  } catch (error) {
    return error.response.data;
  }
}

export async function addSlideOrderNumber(slideId, orderNumber) {
  try {
    return await blogApiAuth.put(`/api/slides/${slideId}/${orderNumber}`);
  } catch (error) {
    return error.response.data;
  }
}

export async function deleteHomeSlide(slideId) {
  try {
    return await blogApiAuth.delete(`/api/slides/${slideId}`);
  } catch (error) {
    return error.response.data;
  }
}

export async function createCategory(category) {
  try {
    return await blogApiAuth.post('/api/categories', category);
  } catch (error) {
    return error.response.data.msg;
  }
}

export async function updateCategory(categoryId, categoryName) {
  try {
    return await blogApiAuth.put(`/api/categories/${categoryId}`, categoryName);
  } catch (error) {
    return error.response.data.msg;
  }
}

export async function deleteCategoryById(categoryId) {
  try {
    return await blogApiAuth.delete(`/api/categories/${categoryId}`);
  } catch (error) {
    return error.response.data.msg;
  }
}

export async function getAllCategories() {
  try {
    const { data } = await blogApi.get('/api/categories');
    return data;
  } catch (error) {
    return error.response.data.message;
  }
}

export async function updateCategoryOrder(categoryId, orderNumber) {
  try {
    return await blogApiAuth.put(
      `/api/categories/${categoryId}/${orderNumber}`
    );
  } catch (error) {
    return error.response.data.msg;
  }
}

export async function createNewBlog(formData) {
  try {
    return await blogApiAuth.post(`/api/blogs`, formData, {
      headers: {
        ' Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    return error.response.data;
  }
}

export async function getAllBlogs(params) {
  try {
    const { data } = await blogApiAuth.get(`/api/blogs/allBlogs`, {
      params: params,
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
}

export async function deleteBlogById(blogId) {
  try {
    return await blogApiAuth.delete(`/api/blogs/${blogId}`);
  } catch (error) {
    return error.response.data.msg;
  }
}

export async function makeBlogImportant(blogId) {
  try {
    return await blogApiAuth.put(`/api/blogs/important/${blogId}`);
  } catch (error) {
    return error.response.data.msg;
  }
}

export async function makeBlogUnImportant(blogId) {
  try {
    return await blogApiAuth.put(`/api/blogs/unimportant/${blogId}`);
  } catch (error) {
    return error.response.data.msg;
  }
}

export async function disableBlogById(blogId) {
  try {
    return await blogApiAuth.put(`/api/blogs/disable/${blogId}`);
  } catch (error) {
    return error.response.data.msg;
  }
}

export async function enableBlogById(blogId) {
  try {
    return await blogApiAuth.put(`/api/blogs/enable/${blogId}`);
  } catch (error) {
    return error.response.data.msg;
  }
}

export async function findBlogById(blogId) {
  try {
    const { data } = await blogApi.get(`/api/blogs/${blogId}`);
    return data;
  } catch (error) {
    console.error(error.response.data.msg);
    return error.response.data.msg;
  }
}

export async function findNewest() {
  try {
    const { data } = await blogApi.get(`/api/blogs/newest`);
    return data;
  } catch (error) {
    throw Error(error.response.data.msg);
  }
}

export async function findLastThreeImportnat() {
  try {
    const { data } = await blogApi.get(`/api/blogs/lastThreeImportant`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}

export async function findBlogsForPage(params) {
  try {
    const { data } = await blogApi.get(`/api/blogs`, { params: params });
    return data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}

export async function find3newest(params) {
  try {
    const { data } = await blogApi.get(`/api/blogs/threeNewest`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}

export async function addBlogComment(blogId, comment) {
  try {
    const { data } = await blogApi.post(`/api/comments/${blogId}`, comment);
    return data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}

export async function findAllComments(params) {
  try {
    const { data } = await blogApiAuth.get(`/api/comments`, { params: params });
    return data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}

export async function deleteCommentById(commentId) {
  try {
    return await blogApiAuth.delete(`/api/comments/${commentId}`);
  } catch (error) {
    console.error(error.response.data.msg);
    return error.response.data.msg;
  }
}

export async function disableCommentById(commentId) {
  try {
    return await blogApiAuth.put(`/api/comments/disable/${commentId}`);
  } catch (error) {
    console.error(error.response.data.msg);
    return error.response.data.msg;
  }
}

export async function enableCommentById(commentId) {
  try {
    return await blogApiAuth.put(`/api/comments/enable/${commentId}`);
  } catch (error) {
    console.error(error.response.data.msg);
    return error.response.data.msg;
  }
}

export async function loginUser(loginReq) {
  try {
    const data = await blogApi.post(`/auth/login`, loginReq);
    return data.data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}

export async function getLoggedUser() {
  try {
    const res = await blogApiAuth.get(`/auth/logged`);
    return res.data;
  } catch (error) {
    return error.response.data.msg;
  }
}

export async function deleteTagById(tagId) {
  try {
    return await blogApiAuth.delete(`/api/tags/${tagId}`);
  } catch (error) {
    return error.response.data.message;
  }
}

export async function updateTagById(tagId, name) {
  try {
    return await blogApiAuth.put(`/api/tags/${tagId}/${name}`);
  } catch (error) {
    return error.response.data.msg;
  }
}

export async function createTag(tagName) {
  try {
    return await blogApiAuth.post(`/api/tags`, tagName);
  } catch (error) {
    return error.response.data;
  }
}

export async function findAllTags() {
  try {
    const { data } = await blogApiAuth.get('/api/tags');
    return data;
  } catch (error) {
    return error.response.data.message;
  }
}

export async function findSlideById(slideId) {
  try {
    const { data } = await blogApiAuth.get(`/api/slides/${slideId}`);
    return data;
  } catch (error) {
    return error.response.data.message;
  }
}

export async function updatePasswordRequest(updatePasswordRequest) {
  try {
    return await blogApiAuth.put(
      `/api/users/changePassword`,
      updatePasswordRequest
    );
  } catch (error) {
    console.error(error.response.data.msg);
    return error.response.data;
  }
}

export async function deleteUserImage(userId) {
  try {
    const { data } = await blogApiAuth.delete(`/api/users/image/${userId}`);
    return data;
  } catch (error) {
    return error.response.data.message;
  }
}

export async function updateUserImage(image, userId) {
  try {
    const { data } = await blogApiAuth.post(
      `/api/users/updateImage/${userId}`,
      image,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getEnabledSlides() {
  try {
    const { data } = await blogApi.get(`/api/slides`);
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function updateInfoApi(updateInfoRequest) {
  try {
    return await blogApiAuth.put('/api/users/updateInfo', updateInfoRequest);
  } catch (error) {
    console.error(error.response.data.msg);
    return error.response.data.msg;
  }
}
