import React from 'react';

const Spinner = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 text-center">
                    <div className="spinner-border text-primary text-center" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Spinner;