const btn = document.getElementById('button');
const videoElement = document.getElementById('captureScreen');
let media = null;


async function startCapture() {
    try {
        media = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = media;
        videoElement.onloadedmetadata = () => {
            videoElement.play()
            btn.disabled = false;
        }
    } catch (err) {
        console.error("Error: " + err);
    }
}

btn.addEventListener('click', async () => {
    btn.disabled = true;

    if (videoElement !== document.pictureInPictureElement || !document.pictureInPictureEnabled || videoElement.disablePictureInPicture) {
        btn.innerText = 'Exit picture in Picture Mode'
        await videoElement.requestPictureInPicture()
    } else {
        btn.innerText = 'Enter picture in Picture Mode'
        document.exitPictureInPicture()
    }

    btn.disabled = false;
});

startCapture();