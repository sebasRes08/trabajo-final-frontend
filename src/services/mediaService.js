import { axiosInstance } from '../helper/axios-config';

const obtenerMedias = () => {
    return axiosInstance.get('media', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const crearMedia = (data) => {
    return axiosInstance.post('media', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const editarMedia = (mediaId, data) => {
    return axiosInstance.put(`media/${mediaId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const getMediaPorId = (mediaId) => {
    return axiosInstance.get(`media/${mediaId}` ,{  
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    obtenerMedias, crearMedia, editarMedia, getMediaPorId
}