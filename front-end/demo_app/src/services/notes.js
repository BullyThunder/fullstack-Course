import axios  from "axios";
const baseUrl = 'http://localhost:3001/notes';
const urlPersons = 'http://localhost:3001/persons'
const getAll = () =>{
  const request = axios.get(baseUrl);
  return request.then(response => response.data)
}

const create = newObject =>{
   const request = axios.post(baseUrl, newObject);
   return request.then(response => response.data)
}

const update = (id,newObject) =>{
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data)
}

const deleteElement = (id) =>{
    const request = axios.delete(`${baseUrl}/${id}`);
     return request.then(response => response.data)
}
const deleteElementPersons = (id) =>{
    const request = axios.delete(`${urlPersons}/${id}`);
     return request.then(response => response.data)
}
const getAllpersons = () =>{
  const request =  axios.get(urlPersons);
   return request.then(response => response.data)
}

const createPersons = newObjects =>{
   const request = axios.post(urlPersons, newObjects);
    return request.then(response => response.data)
}

const updatePersons = (id,newObjects) =>{
    const request = axios.put(`${urlPersons}/${id}`, newObjects);
     return request.then(response => response.data)
}
export default {
    getAll: getAll,
    create: create,
    update: update,
    deleteElement: deleteElement,
    deleteElementPersons: deleteElementPersons,
    getAllpersons: getAllpersons,
    createPersons: createPersons,
    updatePersons:  updatePersons
}