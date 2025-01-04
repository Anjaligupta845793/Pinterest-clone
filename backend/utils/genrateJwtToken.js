import jwt from "jsonwebtoken";
export const genratejwt = async (id, res) => {
  const token = jwt.sign({ id }, process.env.jwt_secret, {
    expiresIn: "15d",
  });
  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
};

export default genratejwt;
