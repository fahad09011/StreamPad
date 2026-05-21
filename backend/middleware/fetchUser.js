import jwt from 'jsonwebtoken';

const fetchuser = async (request, response , next) =>{
// get user id from token which is append is request header
const token = request.header('auth-token');
if (!token) {
    return response.status(401).json({error: 'Please authenticate using a valid jwt token'})
}
try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    request.user = data.user;
    next();
} catch (error) {
    return response.status(401).json({error: 'Please authenticate using a valid jwt token'})

}
};
export default fetchuser;