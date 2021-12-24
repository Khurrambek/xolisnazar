import React from 'react';
import './_PageHeading.scss';

const PageHeading = ({headingTitle}) => {
    return(
        <div className="row">
            <div className="col-md-10">
                <h3 className="page-heading">{headingTitle}</h3>
                <p className="form-text">
                    Yangiliklar soni umumiy 5 tani tashkil qiladi.
                </p>
            </div>
            <div className="col-md-2 ps-4">
                <button type="submit" className="btn btn-outline-dark  px-4">Save</button>
            </div>
        </div>
    )
}

export default PageHeading;