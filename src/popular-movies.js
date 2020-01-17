import React, {Component, Fragment} from 'react';
import {getPopularMovies, getSearchingMovies, getGenresList} from "./movie-service";
import './app.css'
import MoviesList from "./movies-list";

class PopularMovies extends Component {

    state = {
        movies: [],
        keyWord: '',
        isFilter: false,
        filteredId: 0,
        currentPage: 1,
    };

    componentDidMount() {
        window.addEventListener('scroll' ,  () => {
            let scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
            if(window.scrollY + 5 >= scrollHeight - innerHeight){
                getPopularMovies(this.state.currentPage + 1)
                    .then((body) => {
                        const newCurrent = [...this.state.movies, ...body];
                        this.setState({
                            movies: newCurrent,
                            currentPage: this.state.currentPage + 1
                        });
                    });
            }
        });

        getPopularMovies(this.state.currentPage).then(json => this.setState({
            movies: json,
        }));
        getGenresList().then(json => this.setState({
            genres: json.genres,
        }));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.keyWord === this.state.keyWord) {
            return;
        }
        if (this.state.keyWord !== '') {
            getSearchingMovies(this.state.keyWord).then(json => this.setState({
                movies: json,
            }));
        } else {
            getPopularMovies().then(json => this.setState({
                movies: json,
            }))
        }

    }

    filterMovies = (e) => {
        const id = e.target.value;
        if(id === this.state.filteredId){
            document.getElementById(id).className = "";
            this.setState({
                filteredId: 0,
                isFilter: false,
            });
        } else {
            if(this.state.filteredId){
                document.getElementById(this.state.filteredId).className = "";
            }
            document.getElementById(id).className = "isFilter";
            this.setState({
                filteredId: id,
                isFilter: true,
            })
        }
    };

    searchMovies = (e) => {
        this.setState({
            keyWord: e.target.value,
        });
    };

    render() {
        let {movies} = this.state;
        if(this.state.isFilter){
            movies = movies.filter(item => item.genre_ids.includes(this.state.filteredId))
        }
        return (
            <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="input-group input-group-lg">
                                <input type="text" className="form-control search-input" onChange={this.searchMovies}
                                       placeholder="search movies"/>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    !this.state.genres? null :
                        <div className="container ">
                            <div className="row ">
                                <div className="col-12 genres">
                                    <div className="row">
                                        <div className="col-12 text-center">
                                            <h2>Genres Of The Movies</h2>
                                        </div>
                                    </div>
                                    <ul onClick={this.filterMovies} className="filter">
                                        {this.state.genres.map(({name, id}) => <li id={id} value={id} key={id}>{name}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                }
                <MoviesList list={movies}/>
            </Fragment>
        )
    }
}

export default PopularMovies