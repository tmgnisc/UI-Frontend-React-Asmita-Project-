import axios from "axios";
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

//create product api
export const createProductApi = (formData) =>
  Api.post("/api/product/create_product", formData, config);

//get products api
export const getAllProductsApi = () => Api.get("/api/product/get_products");
export const getAllUsersApi = () => Api.get("api/user/get_users");

//get single api
export const getSingleProductApi = (id) =>
  Api.get(`/api/product/get_product/${id}`);
export const getSingleUserApi = (id) => Api.get(`/api/user/get_user/${id}`);

export const getMyProfileApi = () => Api.get("/api/user/my_profile", config);
export const updateMyProfileApi = (formData) =>
  Api.put("/api/user/update_my_profile", formData, config);

//update product
export const updateProductApi = (id, formData) =>
  Api.put(`/api/product/update_product/${id}`, formData, config);
export const updateUserApi = (id, formData) =>
  Api.put(`/api/user/update_user/${id}`, formData, config);
//delete product
export const deleteProductApi = (id) =>
  Api.delete(`/api/product/delete_product/${id}`, config);
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

export const forgetpasswordApi = (data) =>
  Api.post(`/api/user/forgot-password`, data);
export const resetPasswordApi = (data, token) =>
  Api.put(`/api/user/password/reset/${token}`, data);
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