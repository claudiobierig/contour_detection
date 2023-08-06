
var fileUploadEl = document.getElementById('file-upload'),
    srcImgEl = document.getElementById('src-image'),
    dstImgEl = document.getElementById('dst-image')

fileUploadEl.addEventListener("change", function (e) {
    srcImgEl.src = URL.createObjectURL(e.target.files[0]);
}, false);

srcImgEl.onload = function () {
    convert()
}

// opencv loaded?
window.onOpenCvReady = function () {
    document.getElementById('loading-opencv-msg').remove();
}

const valueBlockSize = document.getElementById("blockSize");
const inputBlockSize = document.getElementById("blockSizeInput");
valueBlockSize.textContent = inputBlockSize.value;
inputBlockSize.addEventListener("input", (event) => {
    valueBlockSize.textContent = event.target.value;
    convert()
});

const inputC = document.getElementById("cInput");
const valueC = document.getElementById("c");
valueC.textContent = inputC.value;
inputC.addEventListener("input", (event) => {
    valueC.textContent = event.target.value;
    convert()
});

function convert()
{
    var src = cv.imread(srcImgEl); // load the image from <img>
    var dst = new cv.Mat();

    cv.cvtColor(src, src, cv.COLOR_BGR2RGB, 0);
    cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);

    cv.adaptiveThreshold(src, dst, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, parseInt(inputBlockSize.value), parseInt(inputC.value))
    cv.imshow('the-canvas', dst); // display the output to canvas
    const canvas = document.getElementById('the-canvas')
    dstImgEl.src    = canvas.toDataURL('image/png')

    src.delete(); // remember to free the memory
    dst.delete();
}
