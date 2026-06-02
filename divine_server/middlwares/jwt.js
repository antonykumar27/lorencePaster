// sendToken.js
const sendToken = (user, statusCode, res, pointsEarned = 0) => {
  // യൂസർ ഒബ്ജക്റ്റ് Mongoose ഡോക്യുമെന്റ് ആണെങ്കിൽ അതിലെ ഫങ്ക്ഷൻ വിളിക്കും, ഇല്ലെങ്കിൽ നോർമൽ രീതിയിൽ ടോക്കൺ എടുക്കും
  const token =
    typeof user.getJwtToken === "function"
      ? user.getJwtToken()
      : user.token || "";

  const days = parseInt(process.env.COOKIE_EXPIRES_TIME || "2", 10);
  const cookieExpireMs = isNaN(days)
    ? 2 * 24 * 60 * 60 * 1000
    : days * 24 * 60 * 60 * 1000;

  const options = {
    expires: new Date(Date.now() + cookieExpireMs),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
