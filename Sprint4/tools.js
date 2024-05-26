document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('date_id').textContent = new Date().getFullYear();
  
    const maxImagesAllowed = 3;
    const storageKey = 'chosenImages';
    const expirationTime = 30 * 1000; // 30 seconds in milliseconds


  
    // Loads previously chosen images from localStorage
    const storedData = JSON.parse(localStorage.getItem(storageKey)) || { images: [], timestamp: null };
  
    fetch('images.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log('JSON data loaded successfully', data);
        const galleryContainer = document.getElementById('gallery-container');
  
        data.images.forEach((image, index) => {
          const div = document.createElement('div');
          div.className = 'gallery';
          div.innerHTML = `
            <img src="${storedData.images.includes(index) ? data.images[index].src : './img/giftbox.png'}" 
                 alt="${storedData.images.includes(index) ? 'Chosen Image' : 'Gift Box'}" 
                 id="img-${index}" data-original-src="${image.src}">
            <div>${image.day}</div>
          `;
          galleryContainer.appendChild(div);
        });
  
        data.images.forEach((image, index) => {
          const imgElement = document.getElementById(`img-${index}`);
          imgElement.addEventListener('click', function () {
            if (this.src.includes('giftbox.png')) {
              if (storedData.images.length < maxImagesAllowed) {
                this.src = this.getAttribute('data-original-src');
                storeChosenImage(index); // Stores the opened image index
              } else {
                alert('You cannot open more than 3 images!');
              }
            }
          });
        });
  
        function storeChosenImage(index) {
          // Updates the stored data with the new chosen image
          storedData.images.push(index);
          storedData.timestamp = Date.now();
          localStorage.setItem(storageKey, JSON.stringify(storedData));
        }
  
        // Checks if stored images are expired and clears them
        if (storedData.timestamp && Date.now() - storedData.timestamp > expirationTime) {
          localStorage.removeItem(storageKey);
          // Refreshes the page to clear the displayed images
          location.reload();
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  });
  
