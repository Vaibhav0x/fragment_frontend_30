import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Basic Auth headers
const authType = process.env.REACT_APP_AUTH_TYPE;
const user = process.env.REACT_APP_BASIC_USER;
const pass = process.env.REACT_APP_BASIC_PASS;

console.log("User is:", user);
console.log("Password is:", pass);

const headers = authType === 'basic'
    ? { Authorization: `Basic ${btoa(`${user}:${pass}`)}` }
    : {};

export async function createFragment(content) {
    const res = await axios.post(`${API_URL}/v1/fragments`, content, {
        headers: { ...headers, 'Content-Type': 'text/plain' },
    });
    return res.data;
}

export async function listFragments() {
    const res = await axios.get(`${API_URL}/v1/fragments`, { headers });
    return res.data.fragments;
}

export async function getFragmentData(id) {
    const res = await axios.get(`${API_URL}/v1/fragments/${id}/data`, {
        headers,
        responseType: 'arraybuffer',
    });
    return new TextDecoder().decode(res.data);
}
