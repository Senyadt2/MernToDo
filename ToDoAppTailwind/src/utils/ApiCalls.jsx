import axios from "axios";
import React from "react";

const ApiCalls = () => {
  const BaseUrl = "https://merntodo-k3e3.onrender.com/";
  const fetchToDos = async () => {
    let response = await axios.get(BaseUrl);
    const fetchdata = await response.data;
    // console.log(fetchdata);
    return fetchdata;
  };
  const addToDo = async (endpoint, task) => {
    let url = `${BaseUrl}${endpoint}`;
    // console.log(url);
    let response = await axios.post(url, {
      task: task,
    });
    const postdata = await response.data;
    console.log(postdata);
    return postdata;
  };

  const deleteToDo = async (endpoint) => {
    let url = `${BaseUrl}${endpoint}`;
    console.log(url);

    let response = await axios.delete(url);
    let data = await response.data;
    // console.log(data);
    return data;
  };
  const updateToDo = async (endpoint, task) => {
    let url = `${BaseUrl}${endpoint}`;
    console.log(url);
    let response = await axios.put(url, { task: task });
    let data = await response.data;
    console.log(data);
    return data;
  };
  const completeTask = async (endpoint, done) => {
    let url = `${BaseUrl}${endpoint}`;
    let response = await axios.put(url, { done: done });
    let data = await response.data;
    return data;
  };

  return { fetchToDos, addToDo, deleteToDo, updateToDo, completeTask };
};

export default ApiCalls;
