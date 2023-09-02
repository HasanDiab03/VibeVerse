import jwt from "jsonwebtoken";
const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized, please provide token" });
    }
    token = token.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decodedData, "mine");
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token); // no secret, since it was signed by google OAuth and not us.
      console.log(decodedData, "google");
      req.userId = decodedData?.sub; // sub is the unique id of every google user.
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
