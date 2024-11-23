const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:5001/ebuddy-interview/us-central1/api";

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

const handleApiError = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw errorData || { message: "An unknown error occurred" };
  }
};

const apiCall = async (
  method: string,
  url: string,
  body?: any,
): Promise<any> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(`${API_BASE_URL}/${url}`, options);
  await handleApiError(response);
  return response.json();
};

export const updateUserData = async (
  userId: string,
  data: { name: string },
) => {
  try {
    return await apiCall("PUT", `users/update-user-data/${userId}`, data);
  } catch (error) {
    throw error;
  }
};

export const fetchUserData = async (userId: string) => {
  try {
    return await apiCall("GET", `users/fetch-user-data/${userId}`);
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  setAuthToken(null);
};
