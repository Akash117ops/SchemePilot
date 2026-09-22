const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

async function request(endpoint, options = {}) {
  const { body, ...requestOptions } = options;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...requestOptions,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body:
      body !== undefined
        ? JSON.stringify(body)
        : undefined,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    console.log("API ERROR STATUS:", response.status);
    console.log("API ERROR RESPONSE:", data);

    throw new Error(
      typeof data?.detail === "string"
        ? data.detail
        : JSON.stringify(data?.detail) ||
            "Something went wrong. Please try again."
    );
  }

  return data;
}

export async function registerUser(userData) {
  return request("/auth/register", {
    method: "POST",
    body: userData,
  });
}

export async function loginUser(email, password) {
  const formData = new URLSearchParams();

  formData.append("username", email);
  formData.append("password", password);

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.detail || "Invalid email or password."
    );
  }

  return data;
}

export async function getProfile() {
  const token = localStorage.getItem("access_token");

  return request("/profile/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function createProfile(profileData) {
  const token = localStorage.getItem("access_token");

  return request("/profile/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: profileData,
  });
}

export async function updateProfile(profileData) {
  const token = localStorage.getItem("access_token");

  return request("/profile/", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: profileData,
  });
}