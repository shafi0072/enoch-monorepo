import jwtDecode from "jwt-decode";
import { formatDistanceToNow } from "date-fns";
import { ACCESS_TOKEN } from "../constants";

export function decodeTokenValue() {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    return jwtDecode(token);
  }
}

export const convertNumberToShortString = (data: number) => {
  let newViews;
  if (data > 1000)
    return (newViews = Math.floor(data / 1000)).toString().concat("K");
  return Number(data);
};

export const mergeClassNames = (classNames: Array<string>) => {
  return classNames.join(" ");
};

export const noopFunc = () => undefined;

export const formatBytes = (bytes: any, decimals: number = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
export function toAlphabetColumnName(x: number) {
  let num = x + 1;
  let str = "";
  for (let a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
    str = String.fromCharCode(Number((num % b) / a) + 65) + str;
  }
  return str;
}

export const arrayToObj = (array: any) => {
  const dataObj = array.reduce((acc: any, options: any) => {
    const { option, optionIndex } = options;
    return { ...acc, [`option${optionIndex}`]: option };
  }, {});
  return dataObj;
};

export const getFile = async (url: any, name: string) => {
  let response = await fetch(url);
  let data = await response.blob();
  let metadata = {
    type: "application/*",
  };
  let file = new File([data], name, metadata);
  return file;
};
export const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const getRemainingTime = (timestamps: number) => {
  const date = new Date(timestamps).toLocaleDateString();
  return formatDistanceToNow(new Date(date));
};

export const getPercentage = (number = 0, totalNumber = 0) =>
  ((number / totalNumber) * 100).toFixed();
