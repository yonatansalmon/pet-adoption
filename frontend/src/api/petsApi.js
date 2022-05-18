import axios from 'axios';
const baseUrl = 'http://localhost:8000/pets';
const token = JSON.parse(localStorage.getItem('token'));

const getAllPetsApi = async () => {
  try {
    const res = await axios.get(`${baseUrl}/all`, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const loginApi = async (user) => {
  try {
    const res = await axios.post(`${baseUrl}/login`, user);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getAllUsersApi = async () => {
  try {
    const res = await axios.get(`${baseUrl}/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getUserByIdApi = async (userId) => {
  try {
    const res = await axios.get(`${baseUrl}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const editUserApi = async (userId, userInfo) => {
  try {
    const res = await axios.put(`${baseUrl}/${userId}`, userInfo, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export { getAllPetsApi, loginApi, getAllUsersApi, getUserByIdApi, editUserApi };
