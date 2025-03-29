import jwt from "jsonwebtoken";

// Admin authentication middleware
const authAdmin = async (request, response, next) => {
  try {
    // Verify token (if admin) when using APIs only for admin
    const {atoken} = request.headers

    if (!atoken) {
        return response.json({success: false, message:"Not authorized, login again"})
    }
    
    // Decode token 
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)
    
    // Check if same with admin email and password
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
        return response.json({success: false, message:"Not authorized, login again"})
    }

    // Callback function if everything is the same (authenticated)
    // Will run the function after `authAdmin()`, check `adminRoute.js`
    next()

  } catch (error) {
    console.log(error);
    response.json({ success: false, message: error.message });
  }
};

export default authAdmin;
