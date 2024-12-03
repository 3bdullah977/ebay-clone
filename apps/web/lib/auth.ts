import { BACKEND_URL } from "./constants";
import { fetchWrapper } from "./custom-fetch";
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
    if ("error" in res) {
      return { status: res.status, error: res.error };
    }
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function signin(input: LoginDto): Promise<"success" | "failed"> {
  try {
    const res = await fetchWrapper<any>(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(input),
    });
    if (res.status === 200 && "data" in res) {
      await createSession({
        user: {
          id: res.data.userId,
          name: res.data.username,
        },
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
      return "success";
    }
    console.log("res", res);
    return "failed";
  } catch (error) {
    console.error(error);
    return "failed";
  }
}

export async function refreshToken(oldRefreshToken: string) {
  try {
    const res = await fetchWrapper<any>(`${baseUrl}/refresh-token`, {
      method: "POST",
      body: JSON.stringify({
        refreshToken: oldRefreshToken,
      }),
    });
    if ("data" in res) {
      const { accessToken, refreshToken } = res.data;
      console.log("refresh token body", res.data);

      try {
        await fetch("http://localhost:3000/api/auth/update", {
          method: "POST",
          body: JSON.stringify({ accessToken, refreshToken }),
        });
      } catch (error) {
        console.error("Failed to refresh tokens");
      }

      return accessToken;
    }
  } catch (error) {
    console.error("Refresh token failed!", error);
  }
}
