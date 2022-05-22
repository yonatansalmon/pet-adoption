import axios from 'axios';
const baseUrl = 'http://localhost:8000/users';
const tokenLocal = JSON.parse(localStorage.getItem('token'));
let token;
let reqInstance = axios.create({
  headers: {
    Authorization: `Bearer ${token ? token : tokenLocal}`,
  },
});

const signUpApi = async (user) => {
  try {
    const res = await reqInstance.post(`${baseUrl}/signup`, user);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const loginApi = async (user) => {
  try {
    const res = await axios.post(`${baseUrl}/login`, user);
    reqInstance = axios.create({
      headers: {
        Authorization: `Bearer ${res.data.token || token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getAllUsersApi = async () => {
  try {
    const res = await reqInstance.get(`${baseUrl}/all`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getUserByIdApi = async (userId) => {
  try {
    const res = await reqInstance.get(`${baseUrl}/${userId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const editUserApi = async (userId, userInfo) => {
  try {
    const res = await reqInstance.put(`${baseUrl}/${userId}`, userInfo);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export { signUpApi, loginApi, getAllUsersApi, getUserByIdApi, editUserApi };
