import { useState } from "react";

const LoadingWrapper = () => {
    const [isLoading, setIsLoading] = useState(true);

    if (isLoading) {
        return <p>Loading...</p>;
    } else if (authorization) {
    } else {
    }
};

export default LoadingWrapper;
