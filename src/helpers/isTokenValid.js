function isTokenValid(decodedToken) {
    if (!decodedToken || !decodedToken.exp) {
        console.log("Token is verlopen");
        return false
    } else {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        console.log(currentTimestamp);

        return decodedToken.exp > currentTimestamp;
    }
}

export default isTokenValid;