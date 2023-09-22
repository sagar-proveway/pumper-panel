import jwt from "jsonwebtoken";

const verifyJwt = async (req, res, next) => {
  if (
    req.cookies.token === undefined ||
    req.cookies.token === null ||
    req.cookies.token === ""
  ) {
    return res.status(401).json({
      error: "Token not found",
    });
  }

  try {
    req.payload = jwt.verify(req.cookies.token, process.env.SECRET);
    next();
  } catch (err) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
};

export default verifyJwt;
