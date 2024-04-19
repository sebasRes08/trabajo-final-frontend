import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Header } from './components/peliculas/Header';
import { DirectorView } from './components/directores/DirectorView';
import { MediaView } from './components/medias/MediaView';
import { TipoView } from './components/tipos/TipoView';
import { GeneroView } from './components/generos/GeneroView';
import { ProductoraView } from './components/productoras/ProductoraView';
import { MediaUpdate } from './components/medias/MediaUpdate';

const App = () => {
  return <Router>
        <Header />
        <Switch>
            <Route exact path='/' component={ MediaView } />
            <Route exact path='/productoras' component={ ProductoraView }/>
            <Route exact path='/tipos' component={ TipoView } />
            <Route exact path='/directores' component={ DirectorView }/>
            <Route exact path='/generos' component={ GeneroView } />
            <Route exact path='/medias/edit/:mediaId' component={ MediaUpdate } />
            <Redirect to='/' />
        </Switch>
  </Router>
  
}

export {
    App,
}
