import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getMediaPorId, editarMedia } from '../../services/mediaService';
import { getDirectores } from '../../services/directorService';
import { getTipos } from '../../services/tipoService';
import { getGeneros } from '../../services/generoService';
import { getProductoras } from '../../services/productoraService';
import Swal from 'sweetalert2';

export const MediaUpdate = () => {

  const { mediaId = '' } = useParams();
  const [media, setMedia] = useState();
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [valoresForm, setValoresForm] = useState([]);
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


  const getMedia = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'CarGando...'
      });
      Swal.showLoading();
      const { data } = await getMediaPorId(mediaId);
      console.log(data);
      setMedia(data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    getMedia();
  }, [mediaId]);

  useEffect(() => {
    if (media) {
        setValoresForm({
          serial: media.serial,
          titulo: media.titulo,
          sinopsis: media.sinopsis,
          url: media.url,
          foto: media.foto,
          fechaCreacion: media.fechaCreacion,
          anoEstreno: media.anoEstreno,
          productora: media.productora,
          tipo: media.tipo,
          genero: media.generoEquipo,
          director: media.directorEquipo
        });
      }
  }, [ media ]);

  const handleOnChange = ({ tarGet }) => {
    const { name, value } = tarGet;
    setValoresForm({ ...valoresForm, [name]: value });
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const media = {
        serial, titulo, sinopsis, url, foto, 
        fechaCreacion, anoEstreno, 
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
            text: 'CarGado...'
        });
        Swal.showLoading();
        const { data } = await editarMedia(mediaId, media);
        Swal.close();
    } catch (error) {
        console.log(error);
        console.log(error.response.data);
        Swal.close();
        let mensaje;
        if (error  && error.response & error.response.data) {
          mensaje = error.response.data;
        } else {
          mensaje = "Ocurrió un error, por favor intente de nuevo ";
        }
        Swal.fire('Error', 'Ocurrió un error, por favor verifique los datos', 'error');
    }
}

  return (
    <div className='container-fluid mt-3 mb-2'>
      <div className="card">
        <div className='card-header'>
          <h5 className='card-title'> Detalle Activo</h5>
        </div>

        <div className="card-body">
          <div className='row'>
            <div className='col-md-4'>
              <img src={media?.foto} />
            </div>
            <div className='col-md-8'>

              <Form onSubmit={(e) => handleOnSubmit(e)}>
                <div className='row'>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="Form-label">Serial</label>
                      <input type="text" name='serial'
                        value={serial}
                        onChange={e => handleOnChange(e)}
                        required
                        className='Form-control'
                      />
                    </div>
                  </div>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="Form-label">Titulo</label>
                      <input type="text" name='titulo'
                        required
                        value={titulo}
                        onChange={(e) => handleOnChange(e)}
                        className='Form-control' />
                    </div>
                  </div>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="Form-label">Sinopsis</label>
                      <input type="text" name='sinopsis'
                        required
                        value={sinopsis}
                        onChange={(e) => handleOnChange(e)}
                        className='Form-control' />
                    </div>
                  </div>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="Form-label">URL</label>
                      <input type="url" name='url'
                        required
                        value={url}
                        onChange={(e) => handleOnChange(e)}
                        className='Form-control' />
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="Form-label">Foto</label>
                      <input type="url" name='foto'
                        value={foto}
                        required
                        onChange={(e) => handleOnChange(e)}
                        className='Form-control' />
                    </div>
                  </div>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="Form-label">Fecha Creación</label>
                      <input type="date" name='fechaCreacion'
                        required
                        value={fechaCreacion}
                        onChange={(e) => handleOnChange(e)}
                        className='Form-control' />
                    </div>
                  </div>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="Form-label">Año de Estreno</label>
                      <input type="number" name='anoEstreno'
                        value={anoEstreno}
                        required
                        onChange={(e) => handleOnChange(e)}
                        className='Form-control' />
                    </div>
                  </div>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="Form-label">Productora</label>
                      <select className="Form-select"
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
                      <label className="Form-label">Tipo</label>
                      <select className="Form-select"
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
                      <label className="Form-label">Genero</label>
                      <select className="Form-select"
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
                      <label className="Form-label">Director</label>
                      <select className="Form-select"
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
                    <butTon className="btn btn-primary">Guardar</butTon>
                  </div>
                </div>
              </Form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
