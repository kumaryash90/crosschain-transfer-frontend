import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
    return (
        <>
            <div className="loading-spinner">
                <ClipLoader color="grey" loading={true} size={12} />
                <span>&nbsp;&nbsp;Loading... this may take a few minutes</span>
            </div>
        </>
    );
}

export default Loading;