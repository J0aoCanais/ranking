import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const objectToFormData = (obj: Record<string, any>) => {
    const formData = new FormData();
    for (const key in obj) {
        formData.append(key, obj[key]);
    }
    return formData;
};

export const request = async (
	method: string,
	endpoint: string,
	body: any = null,
	isMultipart = false,
	accessToken: string = ""
) => {

    const headers: Record<string, string> = {
        Accept: "application/json",
        "Content-Type": isMultipart ? "multipart/form-data" : "application/json",
    };

    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
    }

    const url = `${BASE_URL}${endpoint}`;
    const config = {
        method,
        url,
        headers,
        data: body ? (isMultipart ? objectToFormData(body) : JSON.stringify(body)) : undefined,
    };

    try {
        const response = await axios(config);
        return { success: true, data: response.data };

    } catch (error: any) {
        return { success: false, error: error.response?.data || "Unknown error" };
    }
};
