function getThumbnail() {
    const url = document.getElementById('videoUrl').value;
    const videoId = extractVideoId(url);
    if (videoId) {
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        document.getElementById('thumbnailContainer').innerHTML = `
            <img src="${thumbnailUrl}" alt="YouTube Thumbnail" width="300">
            <br>
            <button onclick="downloadImage('${thumbnailUrl}')">Download</button>
        `;
    } else {
        alert('Invalid YouTube URL');
    }
}

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

async function downloadImage(url) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = 'thumbnail.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error("Error downloading image:", error);
        alert("Failed to download image");
    }
}