import { fetchWrapper } from "../fetch-wrapper.";

const getAll = () =>{
   return fetchWrapper.get("/workers");  
};