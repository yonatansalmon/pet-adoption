import axios from 'axios';
const baseUrl = 'http://localhost:8000/pets';
const token = JSON.parse(localStorage.getItem('token'));

const headers = { headers: { Authorization: `Bearer ${token}` } };

const getAllPetsApi = async () => {
  try {
    const res = await axios.get(`${baseUrl}/all`, headers);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const addPetApi = async (newPet) => {
  try {
    const res = await axios.post(`${baseUrl}/add`, newPet, headers);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getUserPetsApi = async (userId) => {
  try {
    const res = await axios.get(`${baseUrl}/mypets/${userId}`, headers);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getPetByIdApi = async (petId) => {
  try {
    const res = await axios.get(`${baseUrl}/${petId}`, headers);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const adoptPetApi = async (petId, status) => {
  try {
    const res = await axios.post(`${baseUrl}/${petId}/adopt`, status, headers);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};


const savePetApi = async (petId, action) => {
  try {
    const res = await axios.put(`${baseUrl}/${petId}/save`, action, headers);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};


const searchPetApi = async (petToSearch) => {
  try {
    const res = await axios.get(`${baseUrl}?type=${petToSearch.type}&name=${petToSearch.name}&weight=${petToSearch.weight}&height=${petToSearch.height}&adoptionStatus=${petToSearch.status}`, headers);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export { savePetApi, getAllPetsApi, getUserPetsApi, getPetByIdApi, adoptPetApi, addPetApi, searchPetApi };
