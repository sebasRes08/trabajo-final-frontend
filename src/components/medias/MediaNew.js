import React, { useState, useEffect } from 'react'
import { getDirectores } from '../../services/directorService';
import { getTipos } from '../../services/tipoService';
import { getGeneros } from '../../services/generoService';
import { getProductoras } from '../../services/productoraService'; 
import { crearMedia }  from '../../services/mediaService';  
import Swal from 'sweetalert2';

export const MediaNew = ( { handleOpenModal, listarMedias }) => {

    const [ productoras, setProductoras ] = useState([]);
    const [ tipos, setTipos ] = useState([]);
    const [ generos, setGeneros ] = useState([]);
    const [ directores, setDirectores ] = useState([]);
    const [ valoresForm, setValoresForm ] = useState([]);
    const { serial = '', titulo = '', sinopsis = '', url = '', foto = '', 
    fechaCreacion = '', anoEstreno = '', productora, tipo, genero, director } = valoresForm;
    

    const listarProductoras = async () => {
        try {
            const { data } = await getProductoras();
            setProductoras(data);
         
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarProductoras();
    }, []);

    const listarTipos = async () => {
        try {
            const { data } = await getTipos();
            setTipos(data);
         
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarTipos();
    }, []);

    const listarGeneros = async () => {
        try {
            const { data } = await getGeneros();
            setGeneros(data);
         
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarGeneros();
    }, []);

    const listarDirectores = async () => {
        try {
            const { data } = await getDirectores();
            setDirectores(data);
         
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarDirectores();
    }, []);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const media = {
            serial , titulo , sinopsis , url , foto , 
            fechaCreacion , anoEstreno, 
            productora: {
                _id: productora
            }, 
            tipo: {
                _id: tipo
            }, 
            genero: {
                _id: genero
            }, 
            director: {
                _id: director
            }
        }
        console.log(media);
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargado...'
            });
            Swal.showLoading();
            const { data } = await crearMedia(media)
            handleOpenModal();
            listarMedias();
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

  return (
    <div className='sidebar'> 
        <div className='container-fluid'>
            <div className='row'>

                <div className='col'>
                    <div className='sidebar-header'>
                        <h3>Nueva Pelicula o serie</h3>
                        <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <hr />
                    </div>
                </div>

                <form onSubmit={(e) => handleOnSubmit(e)}>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Serial</label>
                                <input type="text" name='serial'
                                value={serial}  
                                onChange={e => handleOnChange(e) }
                                required
                                className='form-control'
                                />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Titulo</label>
                                <input type="text" name='titulo' 
                                required
                                value={titulo}
                                onChange={(e) => handleOnChange(e)}
                                className='form-control' /> 
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Sinopsis</label>
                                <input type="text" name='sinopsis' 
                                required
                                value={sinopsis}
                                onChange={(e) => handleOnChange(e)}
                                className='form-control' /> 
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">URL</label>
                                <input type="url" name='url' 
                                required
                                value={url}
                                onChange={(e) => handleOnChange(e)}
                                className='form-control' /> 
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Foto</label>
                                <input type="url" name='foto' 
                                value={foto}
                                required
                                onChange={(e) => handleOnChange(e)}
                                className='form-control'/>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Fecha Creación</label>
                                <input type="date" name='fechaCreacion' 
                                required
                                value={fechaCreacion}
                                onChange={(e) => handleOnChange(e)}
                                className='form-control' /> 
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Año de Estreno</label>
                                <input type="number" name='anoEstreno' 
                                 value={anoEstreno}
                                 required
                                 onChange={(e) => handleOnChange(e)}
                                className='form-control' /> 
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Productora</label>
                                <select className="form-select"
                                    required
                                    name='productora'
                                    value={productora}
                                    onChange={(e) => handleOnChange(e)}>
                                    <option value="">--SELECCIONE--</option>
                                    {
                                        productoras.map(({ _id, nombre }) => {
                                            return <option key={_id} value={_id}>{nombre}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                    <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Tipo</label>
                                <select className="form-control"
                                    name='tipo'
                                    value={tipo}
                                    onChange={(e) => handleOnChange(e)}
                                    required>
                                    <option value="">--SELECCIONE--</option>
                                    {
                                        tipos.map(({ _id, nombre }) => {
                                            return <option key={_id} value={_id}>{nombre}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Genero</label>
                                <select className="form-control"
                                    name='genero'
                                    value={genero}
                                    required
                                    onChange={(e) => handleOnChange(e)}>
                                    <option value="">--SELECCIONE--</option>
                                    {
                                        generos.map(({ _id, nombre }) => {
                                            return <option key={_id} value={_id}>{nombre}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Director</label>
                                <select className="form-control"
                                    name='director'
                                    value={director}
                                    required
                                    onChange={(e) => handleOnChange(e)}>
                                    
                                    <option value="">--SELECCIONE--</option>
                                    {
                                        directores.map(({ _id, nombre }) => {
                                            return <option key={_id} value={_id}>{nombre}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                        <button className="btn btn-primary">Guardar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
