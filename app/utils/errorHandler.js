const errCatcher = (fn, name = "") => (req, res, next) => {
    console.log(`errcatcher used in api: ${name}`);
    return Promise.resolve(fn(req, res, next)).catch(next);
}

function errorCatchMapper(obj){
    return Object.keys(obj).forEach(key => {
        obj[key] = errCatcher(obj[key], key)
    });
}

module.exports = {
    errCatcher,
    errorCatchMapper
}