import axios from 'axios';

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
    const { data } = await blogApi.post(`/api/messages`, message);
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function getAllMessages(params) {
  try {
    const { data } = await blogApiAuth.get('/api/messages', { params: params });
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function markMsgAsRead(msgId) {
  try {
    const { data } = await blogApiAuth.post(`/api/messages/readed/${msgId}`);
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function markAsUnread(msgId) {
  try {
    const { data } = await blogApiAuth.post(`/api/messages/unread/${msgId}`);
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function deleteMessage(msgId) {
  try {
    const { data } = await blogApiAuth.delete(`/api/messages/${msgId}`);
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function addNewUser(formData) {
  try {
    const { data } = await blogApiAuth.post(
      `${BASE_URL}auth/signup`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function findAllUsers(params) {
  try {
    const { data } = await blogApiAuth.get('/api/users', { params: params });
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function unbanUser(userId) {
  try {
    const { data } = await blogApiAuth.post(`/api/users/unban/${userId}`);
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function banUser(userId) {
  try {
    const { data } = await blogApiAuth.post(`/api/users/ban/${userId}`);
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function deleteUser(userId) {
  try {
    const { data } = await blogApiAuth.delete(`/api/users/${userId}`);
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function addHomeSlider(slideRequest) {
  try {
    const { data } = await blogApiAuth.post(`/api/slides`, slideRequest);
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function getAllHomeSliders(params) {
  try {
    const { data } = await blogApiAuth.get(`/api/slides`, { params: params });
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function enableSlide(slideId) {
  try {
    const { data } = await blogApiAuth.post(
      `/api/slides/enableSlide/${slideId}`
    );
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function disableSlide(slideId) {
  try {
    const { data } = await blogApiAuth.post(`/api/slides/disable/${slideId}`);
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function addSlideOrderNumber(slideId, orderNumber) {
  try {
    const { data } = await blogApiAuth.post(
      `/api/slides/${slideId}/${orderNumber}`
    );
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function deleteHomeSlide(slideId) {
  try {
    const { data } = await blogApiAuth.delete(`/api/slides/${slideId}`);
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function createCategory(category) {
  try {
    const { data } = await blogApiAuth.post('/api/categories', category);
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function updateCategory(categoryId, categoryName) {
  try {
    const { data } = await blogApiAuth.post(
      `/api/categories/${categoryId}`,
      categoryName
    );
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function deleteCategoryById(categoryId) {
  try {
    const { data } = await blogApiAuth.delete(`/api/categories/${categoryId}`);
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function getAllCategories() {
  try {
    const { data } = await blogApi.get('/api/categories');
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function updateCategoryOrder(categoryId, orderNumber) {
  try {
    const { data } = await blogApiAuth.post(
      `/api/categories/${categoryId}/${orderNumber}`
    );
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function createNewBlog(formData) {
  try {
    const { data } = await blogApiAuth.post(`/api/blogs`, formData);
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function getAllBlogs(params) {
  try {
    const { data } = await blogApiAuth.get(`/api/blogs/allBlogs`, {
      params: params,
    });
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function deleteBlogById(blogId) {
  try {
    const { data } = await blogApiAuth.delete(`/api/blogs/${blogId}`);
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function makeBlogImportant(blogId) {
  try {
    const { data } = await blogApiAuth.post(`/api/blogs/important/${blogId}`);
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function makeBlogUnImportant(blogId) {
  try {
    const { data } = await blogApiAuth.post(`/api/blogs/unimportant/${blogId}`);
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function disableBlogById(blogId) {
  try {
    const { data } = await blogApiAuth.post(`/api/blogs/disable/${blogId}`);
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function enableBlogById(blogId) {
  try {
    const { data } = await blogApiAuth.post(`/api/blogs/enable/${blogId}`);
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
  }
}

export async function findBlogById(blogId) {
  try {
    const { data } = await blogApi.get(`/api/blogs/${blogId}`);
    return data;
  } catch (error) {
    throw Error(error?.response.data.msg);
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
    const { data } = await blogApiAuth.delete(`/api/comments/${commentId}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}

export async function disableCommentById(commentId) {
  try {
    const { data } = await blogApiAuth.post(
      `/api/comments/disable/${commentId}`
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}

export async function enableCommentById(commentId) {
  try {
    const { data } = await blogApiAuth.post(
      `/api/comments/enable/${commentId}`
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.msg);
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
    throw new Error(error.message);
  }
}

export async function deleteTagById(tagId) {
  try {
    const { data } = await blogApiAuth.delete(`/api/tags/${tagId}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}

export async function updateTagById(tagId, name) {
  try {
    const { data } = await blogApiAuth.post(`/api/tags/${tagId}/${name}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}

export async function createTag(tag) {
  try {
    const { data } = await blogApiAuth.post(`/api/tags`, tag);
    return data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}

export async function findAllTags() {
  try {
    const { data } = await blogApiAuth.get('/api/tags');
    return data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}

export async function findSlideById(slideId) {
  try {
    const { data } = await blogApiAuth.get(`/api/slides/${slideId}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}

export async function updatePasswordRequest(updatePasswordRequest) {
  try {
    const { data } = await blogApiAuth.post(
      `/api/users/update`,
      updatePasswordRequest
    );
    return data;
  } catch (error) {
    console.error(error.response?.data?.msg);
  }
}

export async function deleteUserImage(userId) {
  try {
    const { data } = await blogApiAuth.delete(`/api/users/image/${userId}`);
    return data;
  } catch (error) {
    console.error(error.response?.data?.msg);
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
