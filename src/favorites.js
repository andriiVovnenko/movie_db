import React, {Component} from 'react';
import {getMovieDetails} from "./movie-service";
import MoviesList from "./movies-list";


class Favorites extends Component {

    state = {
      data: [],
    };

    componentDidMount() {
        const listId = this.props.list;
        listId.map(id => getMovieDetails(id).then(({title, poster_path, vote_count, id}) => {
            this.setState(({data})=>{
                data.push({title,poster_path,vote_count, id});
                return {
                    data,
                }
            })
        }));
    };

    render() {
        return (
            <div>
                <MoviesList list={this.state.data} />
            </div>
        )
    }
};

export default Favorites;