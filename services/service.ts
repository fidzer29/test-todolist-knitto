import axios from "axios";

import { PostPayload } from '../interface/index';

const endPoint = "https://jsonplaceholder.typicode.com"

export const getPostsAPI = async (start: number, limit: number) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_start=${start}&_limit=${limit}`);
    const totalResponse = await axios.get('https://jsonplaceholder.typicode.com/todos');
    return {
      data: response.data,
      total: totalResponse.data.length
    };
  };

export const postAPI = async (payload: PostPayload) => {
    const url = `${endPoint}/todos`;
    const response = await axios.post(url, payload);
    return response;
}

export const putAPI = async (payload: PostPayload) => {
    const url = `${endPoint}/todos/${payload.id}`;
    const response = await axios.put(url, payload);
    return response;
}

export const deletePostAPI = async (id: number) => {
    const url = `${endPoint}/posts/${id}`;
    const response = await axios.delete(url);
    return response;
}