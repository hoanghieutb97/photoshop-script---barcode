

function openFileAndResize(FileDesign, sku, item) {
    try {
        #include "tachdoifile.jsx";
        tachdoifile(FileDesign, sku, item);
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



    app.activeDocument.activeLayer.name = "1";

    { // crop xóa khoảng trắng và crop cỡ 9cm
        var PSpotKhung = app.activeDocument.activeLayer.bounds;
        app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
        if (app.activeDocument.width > app.activeDocument.height) app.doAction("300ppi crop W 9cm", "go")
        else app.doAction("300ppi crop H 9cm", "go")

    }

}
