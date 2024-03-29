export const createCookie = (res, token) => {
  // 30 Minutes :     1800000
  // 1 day : 86400000
  // 1  Year    : 31536000000

  const expiryDate = new Date(Number(new Date()) + 86400000);

  res.cookie("token", token, {
    expires: expiryDate,
    httpsOnly: true,
    sameSite: "none",
    secure: true,
  });
};
