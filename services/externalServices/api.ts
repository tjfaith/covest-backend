import axios from 'axios';

const instance =(BASE_URL:string)=>{ 

return axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});
}



export default instance;
