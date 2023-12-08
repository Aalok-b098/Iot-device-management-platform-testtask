import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

const userToken = localStorage.getItem("authToken")
console.log(localStorage.getItem("authToken"),"local")
const cleanToken = userToken?.replace(/^"(.*)"$/, '$1');


export const getAllDevicesService = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/device/device/`, {
      headers: { Authorization: `Bearer ${cleanToken}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching devices");
  }
};

export const getDeviceByIdService = async (Id) => {
  console.log(Id,"id is shere")
  try {
    const response = await axios.get(`${API_BASE_URL}/device/device/${Id}/`, {
      headers: { Authorization: `Bearer ${cleanToken}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching user with ID ${Id}`);
  }
};

export const getDeviceDataByIdService = async (Id) => {

  try {
    const response = await axios.get(`${API_BASE_URL}/device/device-data/${3}/`, {
      headers: { Authorization: `Bearer ${cleanToken}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching user with ID ${Id}`);
  }
};


export const updateDeviceDataByIdService = async (Id, deviceData) => {

  try {
    const response = await axios.put(`${API_BASE_URL}/device/device-data/${Id}`, deviceData, {
      headers: { Authorization: `Bearer ${cleanToken}` },
    });
    console.log(response, "res akash")
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching user with ID ${Id}`);
  }
};

export const getAllUsers = async () => {
  console.log(cleanToken,"cleanToken")
  try {
    const response = await axios.get(`${API_BASE_URL}/user/users/`, {
      headers: { Authorization: `Bearer ${cleanToken}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

export const getUserByIdService = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/users/${userId}`, {
      headers: { Authorization: `Bearer ${cleanToken}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching user with ID ${userId}`);
  }
};

export const loginApiService = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login/`, userData);
    return response.data;
  } catch (error) {
    throw new Error("Error logging in");
  }
};

export const updateProfileService =  async (id,userData) => {
  console.log(id,"i am from service")
  try {
    const response = axios.put(`${API_BASE_URL}/user/users/${id}/`, userData, {
      headers: { Authorization: `Bearer ${cleanToken}` },
  })
    return response.data;
  } catch (error) {
    throw new Error("Error in updating");
  }
}

export const signupApiService = async (userData) => {
  console.log(userData,"usersDaata")
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/sign-up/`,userData
    );
    
    return response.data;
  } catch (error) {
    throw new Error("Error signing up");
  }
};

export const refreshTokenApi = async (token) => {
  try{
  const res = await axios.post(`${API_BASE_URL}/token/refresh/`, token)
  return res.data
  } catch(error){
    throw new Error("Error refresh token");
  }
}

export const createDeviceApiService = async (device) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/device/device/`, device, {
      headers: { Authorization: `Bearer ${cleanToken}` },
  })
    return response.data; 
  } catch (error) {
    throw new Error("Error signing up");
  }
};