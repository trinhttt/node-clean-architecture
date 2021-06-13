// params need to be in order 
export default (err, res,req, next) => {
    console.log(err)
    return res.status(err.status || 400).json({
        isSuccess: false,
        message: err.message || 'Unknown error happened'
    });
};