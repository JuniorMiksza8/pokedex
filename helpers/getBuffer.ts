import axios from "axios";

export default function getBuffer(url: string) {
  return axios.get(url, {
    responseType: 'blob'
  })
    .then(response => Buffer.from(response.data))
}