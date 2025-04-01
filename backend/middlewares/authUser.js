import jwt from "jsonwebtoken";

// Admin authentication middleware
const authUser = async (request, response, next) => {
  try {
    // Verify user token sent from headers
    const {token} = request.headers

    if (!token) {
        return response.json({success: false, message:"Not authorized, login again"})
    }
    
    // Decode token 
    const token_decode = jwt.verify(token, process.env.JWT_SECRET)
    request.body.userId = token_decode.id

    // Will run the function after `authAdmin()`, check `adminRoute.js`
    next()

  } catch (error) {
    console.log(error);
    response.json({ success: false, message: error.message });
  }
};

export default authUser;
