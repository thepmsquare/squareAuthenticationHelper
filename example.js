import SquareAuthenticationHelper from "./dist/index.js";

let generateRandomUsername = () => {
  const adjectives = [
    "Cool",
    "Swift",
    "Bright",
    "Fuzzy",
    "Mighty",
    "Shiny",
    "Nifty",
  ];
  const nouns = [
    "Tiger",
    "Falcon",
    "Panda",
    "Phoenix",
    "Unicorn",
    "Dragon",
    "Hawk",
  ];
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(Math.random() * 1000); // Add a number at the end for uniqueness
  return `${randomAdjective}${randomNoun}${randomNumber}`;
};

let generateRandomPassword = (length = 12) => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const username = generateRandomUsername();
const password = generateRandomPassword();

console.log("Username:", username);
console.log("Password:", password);

try {
  const squareAuthenticationHelper = new SquareAuthenticationHelper();
  // register
  let registerResponse = await squareAuthenticationHelper.register(
    username,
    password
  );
  console.log(registerResponse);

  // login
  let loginResponse = await squareAuthenticationHelper.login(
    username,
    password
  );
  console.log(loginResponse);

  // generate new access token
  let generateAccessTokenResponse =
    await squareAuthenticationHelper.generateAccessToken(
      loginResponse.user_id,
      loginResponse.refresh_token
    );
  console.log(generateAccessTokenResponse);

  // logout
  let logoutResponse = await squareAuthenticationHelper.logout(
    loginResponse.user_id,
    generateAccessTokenResponse.access_token,
    loginResponse.refresh_token
  );
  console.log(logoutResponse);
} catch (err) {
  console.error(err);
}
