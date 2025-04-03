import jwt from "jsonwebtoken";

// Doctor authentication middleware
const authDoctor = async (request, response, next) => {
  try {
    // Verify doctor token sent from headers
    const { dtoken } = request.headers;

    if (!dtoken) {
      return response.json({
        success: false,
        message: "Not authorized, login again",
      });
    }

    // Decode token
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
    request.body.docId = token_decode.id;

    // Will run the function after `authDoctor()`, check `adminRoute.js`
    next();
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: error.message });
  }
};

export default authDoctor;
