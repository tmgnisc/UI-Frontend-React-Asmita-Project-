import axios from "axios";
const API_BASE_URL = "https://api.videosdk.live";
const VIDEOSDK_TOKEN = process.env.REACT_APP_VIDEOSDK_TOKEN;
const API_AUTH_URL = process.env.REACT_APP_AUTH_URL;
const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

//configuration for axios
const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

//creating test api
export const testApi = () => Api.get("/test");

//creating register api
export const registerApi = (data) => Api.post("/api/user/create", data);
export const loginApi = (data) => Api.post("/api/user/login", data);

export const forgetpasswordApi = (data) =>
  Api.post(`/api/user/forgot-password`, data);
export const resetPasswordApi = (data, token) =>
  Api.put(`/api/user/password/reset/${token}`, data);

//create product api
export const createArticleApi = (formData) =>
  Api.post("/api/article/create_article", formData);

//get products api
export const getAllArticlesApi = () => Api.get("/api/article/get_articles");

//get single api
export const getSingleArticleApi = (id) =>
  Api.get(`http://localhost:5000/api/article/get_article/${id}`);

//update product
export const updateArticleApi = (id, formData) =>
  Api.put(`/api/article/update_article/${id}`, formData, config);
//delete product
export const deleteArticleApi = (id) =>
  Api.delete(`/api/article/delete_article/${id}`, config);

export const getPaginatedArticlesApi = async (page) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/article/get_pagination?page=${page}`
    );
    return response;
  } catch (error) {
    // Handle error
    console.error(error);
  }
};

//
export const createCounselorApi = (formData) =>
  Api.post("/api/counselor/create_counselor", formData);
export const loginCounselorApi = (data) =>
  Api.post("/api/counselor/login_counselor", data);

//get products api
export const getAllCounselorsApi = () =>
  Api.get("/api/counselor/get_counselors");

//get single api
export const getSingleCounselorApi = (id) =>
  Api.get(`http://localhost:5000/api/counselor/get_counselor/${id}`);

//update product
export const updateCounselorApi = (id, formData) =>
  Api.put(`/api/counselor/update_counselor/${id}`, formData, config);
//delete product
export const deleteCounselorApi = (id) =>
  Api.delete(`/api/counselor/delete_counselor/${id}`, config);

export const getPaginatedCounselorsApi = async (page) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/counselor/get_pagination?page=${page}`
    );
    return response;
  } catch (error) {
    // Handle error
    console.error(error);
  }
};

export const createReviewApi = async (reviewData, token) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/counselor/review",
      reviewData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating review", error);
    throw error;
  }
};

export const getReviewsApi = (counselorId) =>
  axios.get(`http://localhost:5000/api/counselor/reviews/${counselorId}`);

///
//create product api
// export const createProductApi = (formData) =>
//   Api.post("/api/product/create_product", formData, config);

//get products api
// export const getAllProductsApi = () => Api.get("/api/product/get_products");
// export const getAllUsersApi = () => Api.get("api/user/get_users");

//get single api
// export const getSingleProductApi = (id) =>
//   Api.get(`/api/product/get_product/${id}`);
// export const getSingleUserApi = (id) => Api.get(`/api/user/get_user/${id}`);

// export const getMyProfileApi = () =>
//   Api.get("http://localhost:5000/api/user/my_profile", config);
// export const updateMyProfileApi = (formData) =>
//   Api.put("/api/user/update_my_profile", formData, config);

export const getMyProfileApi = () => {
  const token = localStorage.getItem("token"); // Retrieve the JWT token from localStorage
  return axios.get("http://localhost:5000/api/user/my_profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserResultsApi = (userId) => {
  return axios.get(
    `http://localhost:5000/api/questionnaire/results/${userId}`,
    {}
  );
};
// //update product
// export const updateProductApi = (id, formData) =>
//   Api.put(`/api/product/update_product/${id}`, formData, config);
// export const updateUserApi = (id, formData) =>
//   Api.put(`/api/user/update_user/${id}`, formData, config);
// //delete product
// export const deleteProductApi = (id) =>
//   Api.delete(`/api/product/delete_product/${id}`, config);

export const submitQuestionnaire = async (answers) => {
  try {
    const user = JSON.parse(localStorage.getItem("user")); // Retrieve user data from local storage
    const userId = user._id; // Assuming the user object contains an _id field

    const response = await axios.post(
      "http://localhost:5000/api/questionnaire/submit",
      { answers, userId }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting questionnaire", error);
    throw error;
  }
};
export const getUserResults = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user")); // Retrieve user data from local storage
    const userId = user._id; // Assuming the user object contains an _id field

    const response = await axios.get(
      `http://localhost:5000/api/results/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user results", error);
    throw error;
  }
};

//
export const createIssueApi = (formData) =>
  Api.post("/api/issue/create_issue", formData);

//get products api
export const getAllIssuesApi = () => Api.get("/api/issue/get_issues");

//get single api
export const getSingleIssueApi = (id) =>
  Api.get(`http://localhost:5000/api/issue/get_issue/${id}`);

//update
export const updateIssueApi = (id, formData) =>
  Api.put(`/api/issue/update_issue/${id}`, formData, config);
//delete
export const deleteIssueApi = (id) =>
  Api.delete(`/api/issue/delete_issue/${id}`, config);

export const getPaginatedIssueApi = async (page) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/issue/get_pagination_issue?page=${page}`
    );
    return response;
  } catch (error) {
    // Handle error
    console.error(error);
  }
};

//not used
//
///
///
//
///
////
////
///
//
//
///
///

export const deleteUserApi = (id) =>
  Api.delete(`/api/user/delete_user/${id}`, config);

export const getPaginatedProductsApi = async (page) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/product/get_pagination?page=${page}`
    );
    return response;
  } catch (error) {
    // Handle error
    console.error(error);
  }
};

export const addHealthInfoApi = async (userId, healthInfoData) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/user/${userId}/healthinfo`,
      healthInfoData
    );
    return response;
  } catch (error) {
    console.error("Error adding health information:", error);
    throw error;
  }
};

export const getHealthInfoApi = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/user/${userId}/healthinfo`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching health information:", error.response);
    throw error;
  }
};

export const getUserCalendarEventsApi = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/calendar/user/${userId}/calendar`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching calendar events:", error.response);
    throw error;
  }
};

// export const getHealthInfoApi = async (userId) => {
//   const response = await axios.get(
//     `http://localhost:5000/api/healthinfo/get_health_info/${userId}`,
//     config
//   );
//   return response;
// };
// export const updateHealthInfoApi = async (userId, healthInfoData) => {
//   const response = await axios.put(
//     `/api/healthinfo/update_health_info/${userId}`,
//     healthInfoData,
//     config
//   );
//   return response;
// };
// export const deleteHealthInfoApi = async (userId) => {
//   const response = await axios.delete(
//     `/api/healthinfo/delete_health_info/${userId}`,
//     config
//   );
//   return response;
// };

export const getAllCategoryApi = (data) =>
  Api.get(`/api/category/allCategories`, data);
export const filterCategoryandPrice = (data) =>
  Api.post(`/api/product/product-filters`, data);

export const orderCategory = (data) => Api.post(`/api/order/create`, data);
export const getOrders = () => Api.get(`/api/order/getOrders`, config);
export const getOrdersByuserId = (userId) =>
  Api.get(`/api/order/getOrdersByUser/${userId}`);
export const updateOrdersApi = (orderId, formData) =>
  Api.put(`/api/order/update_order/${orderId}/status`, formData, config);

export const getToken = async () => {
  if (VIDEOSDK_TOKEN && API_AUTH_URL) {
    console.error(
      "Error: Provide only ONE PARAMETER - either Token or Auth API"
    );
  } else if (VIDEOSDK_TOKEN) {
    return VIDEOSDK_TOKEN;
  } else if (API_AUTH_URL) {
    const res = await fetch(`${API_AUTH_URL}/get-token`, {
      method: "GET",
    });
    const { token } = await res.json();
    return token;
  } else {
    console.error("Error: ", Error("Please add a token or Auth Server URL"));
  }
};

export const createMeeting = async ({ token }) => {
  const url = `${API_BASE_URL}/v2/rooms`;
  const options = {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const response = await fetch(url, options);
  const data = await response.json();

  if (data.roomId) {
    return { meetingId: data.roomId, err: null };
  } else {
    return { meetingId: null, err: data.error };
  }
};

export const validateMeeting = async ({ roomId, token }) => {
  const url = `${API_BASE_URL}/v2/rooms/validate/${roomId}`;

  const options = {
    method: "GET",
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const response = await fetch(url, options);

  if (response.status === 400) {
    const data = await response.text();
    return { meetingId: null, err: data };
  }

  const data = await response.json();

  if (data.roomId) {
    return { meetingId: data.roomId, err: null };
  } else {
    return { meetingId: null, err: data.error };
  }
};
