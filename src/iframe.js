import React, {Component} from 'react';
import {getKeyIframe} from './movie-service';


class Iframe extends Component{
    state = {
        key :'',
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.key !== ''){
            this.setState({
                key: "",
            });
        }
    };

    iframe = () => {
        if (this.state.key !== ''){
            this.setState({
                key: "",
            });
        } else {
            const key = this.props.value;
            getKeyIframe(key).then(data => {
                this.setState({
                    key: data.results[0].key,
                });
            });
        }
    };

    render() {
        const iframe = this.state.key === '' ? null : <div className="embed-responsive embed-responsive-16by9">
                                                          <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/${this.state.key}?rel=0`} allowFullScreen></iframe>
                                                      </div>;
        const classToBtn = this.state.key === ""? "btn btn-outline-success btn-toggle" : "btn btn-success btn-toggle";
        return (
            <div className="iframe">
                <button className={classToBtn} onClick={this.iframe} >{`Trailer ${this.state.key === ""? 'on' : 'off'}`}</button>
                {iframe}
            </div>
        )
    }
}

export default Iframe;