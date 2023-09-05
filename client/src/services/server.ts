const URL = "https://localhost:3000";

export async function login(username: string, password: string) {
  const credentials = JSON.stringify({ username, password });
  const res = await fetch(`${URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,
    credentials: "include",
  });

  return res;
}

export async function signup(username: string, password: string) {
  const data = JSON.stringify({ username, password });
  const res = await fetch(`${URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
    credentials: "include",
  });

  return res;
}
