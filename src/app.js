import React, {Component} from 'react';
import {Route, BrowserRouter as Router,} from 'react-router-dom';
import PopularMovies from "./popular-movies";
import MovieDetails from "./movie-details";
import FavoritesBar from "./favorites-bar";
import Favorites from "./favorites";
import './app.css'

class App extends Component {

    state = {
        favoritesMovies: [449924, 980, 419704],
    };

    toggleFavorites = (id) => {
        const ids = this.state.favoritesMovies;
        if(ids.includes(id)){
            ids.splice(ids.indexOf(id),1);
        }else {
            ids.push(id);
        }
            this.setState({
                favoritesMovies: ids,
            });

    };

    render(){
        return(
            <div>
            <Router>
                <Route path="/" render={() => < FavoritesBar count={this.state.favoritesMovies.length} />} />
                <Route path="/" exact render={() => < PopularMovies showMovieDetails={this.showMovieDetails}/>} />
                <Route path="/movieDetails/:id"
                       render={({match}) => {
                           const {id} = match.params;
                           return <MovieDetails id={id} list={this.state.favoritesMovies} toggleFavorites={this.toggleFavorites}/>
                       }}
                />
                <Route path="/favorites" exact render={() => <Favorites  list={this.state.favoritesMovies}/>} />
            </Router>
            </div>
        )
    }
}

export default App;