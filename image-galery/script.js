document.addEventListener('DOMContentLoaded', function () {
    const grid = document.querySelector('.grid');
    const placeholderImages = document.querySelectorAll('.img.placeholder');
    const apiKey = 'EvxRdzL11S3tEV-rmDF7Bohv8Bhq0jqzl6SZtJ5ixss';
    const apiUrl = 'https://api.unsplash.com';

    document.querySelector("input").focus();

    function loadRandomImages() {
        fetch(`${apiUrl}/photos/random?count=16&client_id=${apiKey}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
            })
            .then(data => {
                const fragment = document.createDocumentFragment();
                data.forEach(item => {
                    const imgNode = document.createElement('div');
                    imgNode.className = 'img';
                    imgNode.style.backgroundImage = `url(${item.urls.small_s3})`;
                    fragment.appendChild(imgNode);
                });

                grid.appendChild(fragment);
                placeholderImages.forEach(img => img.remove());
            })
            .catch(error => {
                alert(error.message);
            });
    }

    loadRandomImages();

    const input = document.getElementById('input');

    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') loadImagesByQuery();
    });

    function removeImages() {
        grid.innerHTML = '';
    }

    function loadImagesByQuery() {
        removeImages();

        fetch(`${apiUrl}/search/photos?query=${input.value}&per_page=16&client_id=${apiKey}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
            })
            .then(data => {
                const fragment = document.createDocumentFragment();
                data.results.forEach(item => {
                    const imgNode = document.createElement('div');
                    imgNode.className = 'img';
                    imgNode.style.backgroundImage = `url(${item.urls.small_s3})`;
                    imgNode.addEventListener('dblclick', function () {
                        window.open(item.links.download, '_blank');
                    });
                    fragment.appendChild(imgNode);
                });

                grid.appendChild(fragment);
            })
            .catch(error => {
                alert(error.message);
            });
    }
});
