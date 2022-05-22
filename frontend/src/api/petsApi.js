import axios from 'axios';
const baseUrl = 'http://localhost:8000/pets';
const tokenLocal = JSON.parse(localStorage.getItem('token'));

let reqInstance;

const getAllPetsApi = async (token) => {
  try {
    reqInstance = axios.create({
      headers: {
        Authorization: `Bearer ${token || tokenLocal}`,
      },
    });
    const res = await reqInstance.get(`${baseUrl}/all`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const addPetApi = async (newPet) => {
  try {
    const res = await reqInstance.post(`${baseUrl}/add`, newPet);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getUserPetsApi = async (userId) => {
  try {
    const res = await reqInstance.get(`${baseUrl}/mypets/${userId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getPetByIdApi = async (petId) => {
  try {
    const res = await reqInstance.get(`${baseUrl}/${petId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const adoptPetApi = async (petId, status) => {
  try {
    const res = await reqInstance.post(`${baseUrl}/${petId}/adopt`, status);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const savePetApi = async (petId, action) => {
  try {
    const res = await reqInstance.put(`${baseUrl}/${petId}/save`, action);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const searchPetApi = async (petToSearch) => {
  try {
    const res = await reqInstance.get(
      `${baseUrl}?type=${petToSearch.type}&name=${petToSearch.name}&weight=${petToSearch.weight}&height=${petToSearch.height}&adoptionStatus=${petToSearch.status}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export { savePetApi, getAllPetsApi, getUserPetsApi, getPetByIdApi, adoptPetApi, addPetApi, searchPetApi };
