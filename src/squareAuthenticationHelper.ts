class LapaAuthenticationHelper {
  lapaAuthenticationUrl: string;
  constructor(
    lapaAuthenticationProtocol: string = "http",
    lapaAuthenticationIp: string = "localhost",
    lapaAuthenticationPort: string = "10011"
  ) {
    this.lapaAuthenticationUrl = `${lapaAuthenticationProtocol}://${lapaAuthenticationIp}:${lapaAuthenticationPort}`;
  }

  register = async (username: string, password: string) => {
    try {
      let url: string = `${this.lapaAuthenticationUrl}/register_username?username=${username}&password=${password}`;
      const response = await fetch(url, {
        method: "GET",
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        throw new Error(`Failed to register: ${response}`);
      }
    } catch (exc) {
      throw exc;
    }
  };

  login = async (username: string, password: string) => {
    try {
      let url: string = `${this.lapaAuthenticationUrl}/login_username/?username=${username}&password=${password}`;
      const response = await fetch(url, {
        method: "GET",
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        throw new Error(`Failed to login: ${response}`);
      }
    } catch (exc) {
      throw exc;
    }
  };

  generateAccessToken = async (userId: string, refreshToken: string) => {
    try {
      let url: string = `${this.lapaAuthenticationUrl}/generate_access_token/?user_id=${userId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "refresh-token": refreshToken,
        },
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        throw new Error(`Failed to generate access token : ${response}`);
      }
    } catch (exc) {
      throw exc;
    }
  };

  logout = async (
    userId: string,
    accessToken: string,
    refreshToken: string
  ) => {
    try {
      let url: string = `${this.lapaAuthenticationUrl}/logout/?user_id=${userId}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "access-token": accessToken,
          "refresh-token": refreshToken,
        },
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        throw new Error(`Failed to authenticate user on logout : ${response}`);
      }
    } catch (exc) {
      throw exc;
    }
  };
}

export default LapaAuthenticationHelper;
