import React, {Component, } from 'react';
import { getMovieDetails, getSimilarMovies } from './movie-service';
import {Link} from "react-router-dom";
import MoviesList from "./movies-list";
import Spinner from "./spinner";
import Iframe from "./iframe";

class MovieDetails extends Component{

    state = {
        loading: false,
        loadingSimilar: false,
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.id === this.props.id){
            return;
        } else {
            const id = parseInt(this.props.id.slice(3),10);
            getMovieDetails(id).then(({budget, genres, original_title, overview, popularity, poster_path, release_date, runtime, spoken_languages, vote_average, vote_count}) => this.setState({id, budget, genres, original_title, overview, popularity, poster_path, release_date, runtime, spoken_languages, vote_average, vote_count,
                loading: true,
            }));
            setTimeout(() => getSimilarMovies(id).then(data => {
                this.setState({
                    similarMovies: data.results,
                    loadingSimilar: true,
                });
            }), 1000);
        }
    }

    componentDidMount() {
        const id = parseInt(this.props.id.slice(3),10);
            getMovieDetails(id).then(({budget, genres, original_title, overview, popularity, poster_path, release_date, runtime, spoken_languages, vote_average, vote_count}) => this.setState({
                id, budget, genres, original_title, overview, popularity, poster_path, release_date, runtime, spoken_languages, vote_average, vote_count, loading: true,
            }));
        setTimeout(() =>    getSimilarMovies(id).then(data => {
                this.setState({
                    similarMovies: data.results,
                    loadingSimilar: true,
                });
            }),1000);
    };

    render() {
        let show;
        if(this.state.loading){
            const ids = this.props.list;
            const srcToImage = "https://image.tmdb.org/t/p/w500_and_h282_face";
            const {budget, original_title,poster_path,release_date,runtime,id} = this.state;
            show = <div className="container details">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <img  className="img-fluid" src={srcToImage + poster_path} alt=""/>
                        </div>
                        <div className="col-12 col-md-6">
                            <p>Title :{original_title}</p>
                            <p>Release data :{release_date}</p>
                            <p>Budget :{budget}</p>
                            <p>Runtime :{runtime}</p>
                        </div>
                    </div>
                <div className="row row-btn">
                    <div className="col-12 col-md-4 text-left">
                        <button className="btn btn-primary btn-toggle" onClick={() => this.props.toggleFavorites(id)}>{ids.includes(id)?"delete from favorites" : "add to favorites"}</button>
                        < Iframe value={id}/>
                    </div>
                </div>
            </div>
        }else {
            show = <Spinner/>
        }

        let similar;
        if(this.state.loadingSimilar){
            similar =
                <div>
                    <div className="container similar">
                        <div className="row">
                            <div className="col-12 text-center">
                                <p className="h2 bg-primary text-white">Similar Movies</p>
                            </div>
                        </div>
                        <MoviesList list={this.state.similarMovies}/>;
                    </div>
                </div>
        }else {
            similar = <Spinner/>
        }

        return (
            <div className="container">
                <div className="row text-center">
                    <div className="col-12">
                        <Link to="/"><button className="btn btn-primary">Main Page</button></Link>
                    </div>
                </div>
                {show}
                {similar}
            </div>
        )
    }
}

export default MovieDetails;