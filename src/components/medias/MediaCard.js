import React from "react";
import { Link } from "react-router-dom";

export const MediaCard = (props) => {

    const { media } = props;

  return (

    <div className="col">
      <div className="card">
        <img src= {media.foto} className="card-img-top" alt="Image" />
        <div className="card-body">
          <h5 className="card-title">Características</h5>
          <hr />
          <p className="card-text">{`Serial: ${media.serial}`}</p>
          <p className="card-text">{`Titulo: ${media.titulo.nombre}`}</p>
          <p className="card-text">{`Sinopsis: ${media.sinopsis}`}</p>
          <p className="card-text">{`Genero: ${media.genero.nombre}`}</p>
          <p className="card-text">{`Director: ${media.director.nombre}`}</p>
          <p className="card-text">
                <Link to= {`medias/edit/${media._id}`}>Ver más..</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
