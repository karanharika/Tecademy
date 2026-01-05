import axios from "axios";

// const URL = "http://localhost:3000"
 const URL = import.meta.env.VITE_API_URL;

export async function getPosts() {
    const response = await axios.get(`${URL}/posts`)

    if (response.status == 200) {
        return response.data
    } else {
        return
    }
}

export async function getPost(id) {
    const response = await axios.get(`${URL}/posts/${id}`)

    if (response.status == 200) {
        return response.data
    } else {
        return
    }
}

export async function createPost(post) {
    console.log("API CALLING...", post)
    const response = await axios.post(`${URL}/posts`, post)
    console.log("API RESPONSE:", response.status);
    return response
}

export async function updatePost(id, post) {
    const response = await axios.put(`${URL}/posts/${id}`, post)
    return response
}

export async function deletePost(id) {
    const response = await axios.delete(`${URL}/posts/${id}`)
    return response
}


// ********************** Users API *******************************

export async function getUsers() {
    const response = await axios.get(`${URL}/users`)

    if (response.status == 200) {
        return response.data
    } else {
        return
    }
}

export async function getUser(username) {
    const response = await axios.get(`${URL}/users/${username}`)

    if (response.status == 200) {
        return response.data
    } else {
        return
    }
}

export async function createUser(user) {
    console.log("API CALLING...", user)
    const response = await axios.post(`${URL}/users`, user)
    console.log("API RESPONSE:", response.status);
    return response
}

