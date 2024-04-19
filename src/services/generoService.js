import { axiosInstance } from '../helper/axios-config';

const getGeneros = () => {
    return axiosInstance.get('genero', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const crearGenero = (data) => {
    return axiosInstance.post('genero', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const editarGenero = (generoId, data) => {
    return axiosInstance.put(`genero/${generoId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getGeneros, crearGenero, editarGenero
}