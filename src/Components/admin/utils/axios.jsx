import axios from 'axios';

// Create an Axios instance for Pengumuman
export const pengumumanApi = axios.create({
  baseURL: 'http://localhost:3000/pengumuman', // Adjust this to your backend URL if needed
});

// Create an Axios instance for Gallery
export const galleryApi = axios.create({
  baseURL: 'http://localhost:3000/gallery', // Adjust this to your backend URL if needed
});

