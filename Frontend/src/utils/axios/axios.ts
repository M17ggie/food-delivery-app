import axios from "axios"
import { BASE_URL } from "@utils/constants/constants"

export const axiosInstance = axios.create({
    baseURL: `${BASE_URL}/api/v1`,
    withCredentials: true
});