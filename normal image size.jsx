

function openFileAndResize(FileDesign, sku, item) {
    try {

        app.open(File(FileDesign + "/" + sku + ".png"));

    } catch (error) {

        var nameSKU = sku;
        nameSKU = nameSKU.split(" ");

        if (nameSKU[nameSKU.length - 1].toLowerCase() === "back") {
            nameSKU.pop();
            nameSKU = nameSKU.join(" ");

            app.open(File(FileDesign + "/" + nameSKU + " front.png"));

        }
        else
            app.open(File(FileDesign + "/" + sku + ".jpg"));

    }
    if (app.activeDocument.mode != "DocumentMode.RGB") app.activeDocument.changeMode(ChangeMode.RGB);

    app.doAction("300ppi", "go");


    app.activeDocument.activeLayer.name = "1";
    // app.doAction("path xu ly vien", "autoUv");
    // app.doAction("xu ly canh thot", "autoUv");
    { // crop xóa khoảng trắng
        var PSpotKhung = app.activeDocument.activeLayer.bounds;
        app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
    }

    if (item.pixel.direction == "2")
        app.activeDocument.resizeImage(UnitValue(wphone, "px"), UnitValue(hphone, "px"), null, ResampleMethod.BICUBIC);
    else if (item.pixel.direction == "1") {
        if (app.activeDocument.width < app.activeDocument.height) {
            app.activeDocument.resizeImage(null, UnitValue(hphone, "px"), null, ResampleMethod.BICUBIC);
        }
        else {
            app.activeDocument.resizeImage(UnitValue(wphone, "px"), null, null, ResampleMethod.BICUBIC);
        }
    }
    // app.activeDocument.save();

}
