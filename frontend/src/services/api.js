// * Realiza a importação do Axios
import axios from 'axios';

// * Cria a instância do Axios e define a URL base
const api = axios.create({
    baseURL: 'http://localhost:3333'
});

// * Exporta a instância do Axios
export default api;