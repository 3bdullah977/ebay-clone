import { BACKEND_URL } from "./constants";
import fetchWrapper from "./custom-fetch";
import { SelectUser } from "@ebay-clone/nestjs-libs/db/schema";
import { CreateUserDto, LoginDto } from "@ebay-clone/nestjs-libs/dtos";
import { createSession, updateTokens } from "./session";

const baseUrl = `${BACKEND_URL}/auth`;

export async function signup(input: CreateUserDto) {
  try {
    const res = await fetchWrapper<SelectUser>(`${baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(input),
    });
  } catch (error) {
    console.error(error);
  }
}

export async function signin(input: LoginDto) {
  try {
    const res = (
      await fetchWrapper<any>(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(input),
      })
    ).data;
    if (res) {
      const session = await createSession({
        user: {
          id: res.userId,
          name: res.username,
        },
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
      });
      console.log(session);
    }
    console.log("res", res);
  } catch (error) {
    console.error(error);
  }
}

export async function refreshToken(oldRefreshToken: string) {
  try {
    const res = await fetchWrapper<any>(`${baseUrl}/refresh-token`, {
      body: JSON.stringify({
        refresh: oldRefreshToken,
      }),
    });

    const { accessToken, refreshToken } = res.data;

    try {
      await fetchWrapper("localhost:3000/api/auth/update", {
        method: "POST",
        body: JSON.stringify({ accessToken, refreshToken }),
      });
    } catch (error) {
      console.error("Failed to refresh tokens");
    }

    return accessToken;
  } catch (error) {
    console.error("Refresh token failed!", error);
  }
}
