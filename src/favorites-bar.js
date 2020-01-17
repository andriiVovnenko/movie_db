import React  from 'react';
import {Link, withRouter} from 'react-router-dom';
import './app.css';

const FavoritesBar = ({count, history}) => {
    const link = history.location.pathname !== '/favorites'? <Link to="/favorites" ><span>SH<i className="fa fa-star fa-start-large"></i>W FAVORITES</span></Link> : <Link to="/" >Back</Link>;
    return (
        <div className="container header">
            <div className="row ">
                <div className="col-6 text-left">
                    <h2>Your Favorites Movies : {count}</h2>
                </div>
                    <div className="col-6 text-right header-right">
                        {link}
                    </div>
                </div>
            </div>
    )
};

export default withRouter(FavoritesBar);