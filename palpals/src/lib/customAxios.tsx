import axios , {AxiosInstance} from 'axios'

export const customAxios : AxiosInstance = axios.create({
  baseURL: `http://ec2-3-37-207-126.ap-northeast-2.compute.amazonaws.com:9999/api`,
  headers : {
    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`
  }
})