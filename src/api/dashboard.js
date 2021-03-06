import { ErrorBoundary, get, post } from "@/utils/axios";
import { baseURL } from "@/config";

const API = {
  getTabLine: "/dashboard/getTabLine",
  getSaleList: "/dashboard/getSaleList",
  getCardList: "/dashboard/getCardList",
};

export function getCardList(params) {
  return ErrorBoundary(get(`${baseURL}${API.getCardList}`, { params }));
}

export function getTabLine(params) {
  return ErrorBoundary(get(`${baseURL}${API.getTabLine}`, { params }));
}

export function getSaleList(params) {
  return ErrorBoundary(get(`${baseURL}${API.getSaleList}`, { params }));
}
