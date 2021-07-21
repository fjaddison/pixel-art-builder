// https://stackoverflow.com/questions/28226677/save-inline-svg-as-jpeg-png-svg
var btn = document.querySelector('#download-btn');
var svg = document.querySelector('.download-container');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

function triggerDownload (imgURI) {
    var evt = new MouseEvent('click', {
        view: window,
        bubbles: false,
        cancelable: true
    });

    var a = document.createElement('a');
    var answer = prompt('What would you like to save your image as?')
    a.setAttribute('download', `${answer}.png`);
    a.setAttribute('href', imgURI);
    a.setAttribute('target', '_blank');
    a.dispatchEvent(evt);

    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

btn.addEventListener('click', function () {
    var data = (new XMLSerializer()).serializeToString(svg);
    var DOMURL = window.URL || window.webkitURL || window;

    var img = new Image();
    var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    var url = DOMURL.createObjectURL(svgBlob);

    img.onload = () => {
        ctx.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);

        var imgURI = canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream');

        triggerDownload(imgURI);
    };

    img.src = url;
});