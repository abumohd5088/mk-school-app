// Simple function
function showMessage() {
    document.getElementById('output').innerText = 'आपने बटन दबाया! 🎉';
}

// PWA service worker registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(() => console.log('Service Worker Registered'))
        .catch(() => console.log('Registration failed'));
}
