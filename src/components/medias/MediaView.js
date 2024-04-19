import React, { useState, useEffect } from 'react'
import { obtenerMedias } from '../../services/mediaService';
import { MediaCard } from './MediaCard';
import { MediaNew } from './MediaNew';

export const MediaView = () => {

  const [ medias, setMedias ] = useState([]);
  const [ openModal, setOpenModal ] = useState(false);

  const listarMedias = async () => {

    try {

      const { data } = await obtenerMedias();
      setMedias(data);

    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    listarMedias();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  return (
    <div className='container'>
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {
          medias.map((medias) => {
            return <MediaCard key = { media._id } media= {medias } />
          })
        }
      </div>
      {
      openModal ? <MediaNew 
      handleOpenModal={ handleOpenModal }
      listarMedias={ listarMedias } /> :
      <button type="button" className="btn btn-primary fab" onClick={ handleOpenModal }>
        <i className="fa-solid fa-plus"></i>
      </button>
      }
    </div>
  )
}