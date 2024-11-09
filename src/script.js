const gallery = document.getElementById('gallery');
const loadMoreButton = document.getElementById('load-more');
const clearGalleryButton = document.getElementById('clear-gallery');
const removeLastButton = document.getElementById('remove-last');
const reverseGalleryButton = document.getElementById('reverse-gallery');

let images = [];
let page = 1;  


async function fetchImages(count) {
  try {
    
    const timestamp = new Date().getTime(); 
    const randomPage = Math.floor(Math.random() * 100) + 1; 
    const response = await fetch(`https://picsum.photos/v2/list?page=${randomPage}&limit=${count}&_=${timestamp}`);
    const data = await response.json();
    return data.map(image => image.download_url);
  } catch (error) {
    console.error('Помилка при завантаженні картинок:', error);
    return [];
  }
}


function renderGallery() {
  gallery.innerHTML = ''; 
  images.forEach(imageUrl => {
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    gallery.appendChild(imgElement);
  });
}


async function loadMoreImages() {
  const newImages = await fetchImages(4);
  images = [...images, ...newImages];  
  renderGallery();
}


function clearGallery() {
  images = [];
  renderGallery();
}


function removeLastImage() {
  images.pop();
  renderGallery();
}


function reverseGallery() {
  images.reverse();
  renderGallery();
}


async function initGallery() {
  const initialImages = await fetchImages(4);
  images = initialImages;
  renderGallery();
}


loadMoreButton.addEventListener('click', loadMoreImages);
clearGalleryButton.addEventListener('click', clearGallery);
removeLastButton.addEventListener('click', removeLastImage);
reverseGalleryButton.addEventListener('click', reverseGallery);


initGallery();
