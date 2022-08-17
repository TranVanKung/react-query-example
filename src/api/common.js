import axios from "axios";
import qs from "qs";
import {
  API_TIMEOUT,
  USER_SERVICE_BASE_URL,
  EXAM_SERVICE_BASE_URL,
} from "@/util/config";
import { store } from "@/redux/store";

const SUCCESS_STATUS_CODE = [200, 201];

const userApi = async (
  method = "get",
  url,
  requestBody,
  params,
  accessToken
) => {
  try {
    const { Auth } = store.getState();
    const { token } = Auth;

    const res = await axios({
      method,
      url: USER_SERVICE_BASE_URL + url,
      data: requestBody,
      params,
      timeout: API_TIMEOUT,
      headers: {
        Authorization: `Bearer ${accessToken || token}`,
      },
    });

    if (SUCCESS_STATUS_CODE.includes(res.status)) {
      return { data: res?.data, error: null };
    } else {
      return {
        error: res?.data?.message,
        data: null,
      };
    }
  } catch (error) {
    return { error: error?.response?.data?.message };
  }
};

const examApi = async (
  method = "get",
  url,
  requestBody,
  params,
  accessToken
) => {
  try {
    const { Auth } = store.getState();
    const { token } = Auth;

    const res = await axios({
      method,
      url: EXAM_SERVICE_BASE_URL + url,
      data: requestBody,
      params,
      timeout: API_TIMEOUT,
      headers: {
        Authorization: `Bearer ${accessToken || token}`,
      },
    });

    if (SUCCESS_STATUS_CODE.includes(res.status)) {
      return { data: res?.data, error: null };
    } else {
      return {
        error: res?.data?.message,
        data: null,
      };
    }
  } catch (error) {
    return { error: error?.response?.data?.message };
  }
};

const examFormApi = async (
  method = "get",
  url,
  requestBody,
  params,
  accessToken
) => {
  try {
    const { Auth } = store.getState();
    const { token } = Auth;

    const res = await axios({
      method,
      url: EXAM_SERVICE_BASE_URL + url,
      data: qs.stringify(requestBody),
      params,
      timeout: API_TIMEOUT,
      headers: {
        Authorization: `Bearer ${accessToken || token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (SUCCESS_STATUS_CODE.includes(res.status)) {
      return { data: res?.data, error: null };
    } else {
      return {
        error: res?.data?.message,
        data: null,
      };
    }
  } catch (error) {
    return { error: error?.response?.data?.message };
  }
};

const userFormApi = async (method = "get", url, requestBody, params) => {
  try {
    const { Auth } = store.getState();
    const { token } = Auth;

    const res = await axios({
      method,
      url: USER_SERVICE_BASE_URL + url,
      data: qs.stringify(requestBody),
      params,
      timeout: API_TIMEOUT,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (SUCCESS_STATUS_CODE.includes(res.status)) {
      return { data: res?.data, error: null };
    } else {
      return {
        error: res?.data?.message,
        data: null,
      };
    }
  } catch (error) {
    return { error: error?.response?.data?.message };
  }
};

export { userFormApi, examApi, userApi, examFormApi };
