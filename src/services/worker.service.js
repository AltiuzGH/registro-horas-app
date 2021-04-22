import { fetchWrapper } from "../fetch-wrapper.";

const getAll = () =>{
   return fetchWrapper.get("/employees");  
};

export default{
   getAll
}