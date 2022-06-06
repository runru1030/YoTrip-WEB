export const ironOptions = {
  cookieName: "token",
  password: "yoTrip_990160_test_12345678999999999999999999999999999",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
