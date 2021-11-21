import axios from "axios";
import { BACKEND_SERVER_URL } from "../Constants";

export const basic_search = async (term) => {
  const result = await axios
    .post(BACKEND_SERVER_URL + "basicsearch", {
      q: term,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });

  return result;
};

export const advanced_search = async (data) => {
  const result = await axios
    .post(BACKEND_SERVER_URL + "advancedsearch", data)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });

  return result;
};
