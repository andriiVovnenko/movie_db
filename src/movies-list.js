import React from 'react';
import {Link} from "react-router-dom";
import './app.css'

const MoviesList = ({list}) => {
    const srcToImage = "https://image.tmdb.org/t/p/w500_and_h282_face";
    return (
        <div className="container cont">
            <div className="row">
                {
                    list.map(v => <div className="col-12 col-md-6 list" key={v.id}>
                        <Link to={`/movieDetails/:id${v.id}`}> <img src={srcToImage + v.poster_path} alt=""/>
                        <div className="info">
                            <span>Title:{v.title}</span>
                            <span>Vote Count:{v.vote_count}</span>
                        </div> </Link>
                    </div>)
                }
            </div>
        </div>
    )
};

export default (MoviesList);
