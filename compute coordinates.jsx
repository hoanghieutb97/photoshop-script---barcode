var hphone = Math.round(arr[i][j].pixel.h / 0.084667);
var wphone = Math.round(arr[i][j].pixel.w / 0.084667);
var boxW = Math.round(arr[i][j].pixel.boxW / 0.084667);
var boxH = Math.round(arr[i][j].pixel.boxH / 0.084667);
stt = arr[i][j].stt;
if (xPosition + wLast + boxW <= wAll) {
    xPosition = xPosition + wLast;
    wLast = boxW;
    if (hLast <= boxH)
        hLast = boxH;
}
else {
    xPosition = 0;
    yPosition = yPosition + hLast;
    wLast = boxW;
    hLast = boxH;
}

