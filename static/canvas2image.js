var Canvas2Image = function () {

    function scaleCanvas (canvas, width, height) {
        var w = width,
            h = height;
        var retCanvas = document.createElement('canvas');
        var retCtx = retCanvas.getContext('2d');
        var $img = document.getElementById('img');
        var rate = $img.width/$img.naturalWidth;
        var cut_height = $('#img_div').scrollTop()/rate;
        retCanvas.width = width;
        retCanvas.height = height - cut_height;
        retCtx.drawImage(canvas, 0, cut_height, w, h, 0, 0, width, height);
        return retCanvas;
    }

    function getDataURL (canvas, type, width, height) {
        canvas = scaleCanvas(canvas, width, height);
        return canvas.toDataURL(type);
    }

    function genImage(strData) {
        var img = document.createElement('img');
        img.width = $('#img_div').width();
        img.id = "cut";
        img.src = strData;
        return img;
    }

    function fixType (type) {
        type = type.toLowerCase().replace(/jpg/i, 'jpeg');
        var r = type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/' + r;
    }

    var convertToImage = function (canvas, width, height, type) {
        type = fixType(type);
		var strData = getDataURL(canvas, type, width, height);
		return genImage(strData);
    };

    return {
        convertToImage: convertToImage
    };

}();