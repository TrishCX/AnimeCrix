export default function throwError(response, status, typeofError, message) {
    return response.send({
        status,
        message,
        typeofError,
    });
}
