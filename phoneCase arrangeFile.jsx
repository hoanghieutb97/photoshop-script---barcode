try {
    app.open(File(FileDesign + "/" + arr[i][j].sku + ".png"));
    app.doAction("300ppi", "go");
    app.activeDocument.activeLayer.name = "1";
    var hh = app.activeDocument.height;
    var ww = app.activeDocument.width;
    app.activeDocument.activeLayer.duplicate(app.activeDocument.activeLayer, ElementPlacement.PLACEBEFORE); // nhân đôi layer
    app.activeDocument.resizeCanvas(1200, 2400); // resize canvas về cỡ cần in với loại điện thoại
    { // resize layer về cỡ cần in
        if ((hh / ww) > 2) { var newSize = (1200 * 100 / ww) }
        else { var newSize = (2400 * 100 / hh) }
        app.activeDocument.artLayers["1 copy"].resize(newSize, newSize, AnchorPosition.MIDDLECENTER);
        app.activeDocument.mergeVisibleLayers(); // gộp all layer 

    }
    app.activeDocument.flipCanvas(Direction.HORIZONTAL);
} catch (error) {
    try {
        app.open(File(FileDesign + "/" + arr[i][j].sku + ".jpg"));
        app.doAction("300ppi", "go");
        app.activeDocument.activeLayer.name = "1";
        var hh = app.activeDocument.height;
        var ww = app.activeDocument.width;
        app.activeDocument.activeLayer.duplicate(app.activeDocument.activeLayer, ElementPlacement.PLACEBEFORE); // nhân đôi layer
        app.activeDocument.resizeCanvas(1200, 2400); // resize canvas về cỡ cần in với loại điện thoại
        { // resize layer về cỡ cần in
            if ((hh / ww) > 2) { var newSize = (1200 * 100 / ww) }
            else { var newSize = (2400 * 100 / hh) }
            app.activeDocument.artLayers["1 copy"].resize(newSize, newSize, AnchorPosition.MIDDLECENTER);
            app.activeDocument.mergeVisibleLayers(); // gộp all layer 

        }
        app.activeDocument.flipCanvas(Direction.HORIZONTAL);
    } catch (error) {
        app.documents.add(1200, 2400, 300, "aaaa");

    }
}
if (app.activeDocument.width !== 1200 || app.activeDocument.height !== 2400) {
    alert(app.activeDocument.width);
    alert(app.activeDocument.height);
    alert(arr[i][j].sku, " khác cỡ 1200 x 2400 !")
}
#include "saveDesign.jsx";
saveImageTool(arr[i][j], "a", "noneCrop");

if (app.activeDocument.artLayers.length === 1) {
    app.activeDocument.activeLayer.name = "1";
    app.activeDocument.activeLayer.duplicate(app.activeDocument.activeLayer, ElementPlacement.PLACEBEFORE); // nhân đôi layer
    app.activeDocument.resizeCanvas(wphone, hphone); // resize canvas về cỡ cần in với loại điện thoại
    { // resize layer về cỡ cần in
        if ((hphone / wphone) < 2) { var newSize = (wphone * 100 / 1200) }
        else { var newSize = (hphone * 100 / 2400) }
        app.activeDocument.artLayers["1 copy"].resize(newSize, newSize, AnchorPosition.MIDDLECENTER);
        app.activeDocument.mergeVisibleLayers(); // gộp all layer 

    }
    { // xử lý file in và duplicate sang bàn GLLM
        app.activeDocument.activeLayer.name = arr[i][j].stt; // đặt tên cho layer voi stt
        app.activeDocument.activeLayer.duplicate(app.documents["GLLM"].layerSets["CMYK"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in

        app.activeDocument.artLayers.add();
        app.activeDocument.artLayers.getByName(arr[i][j].stt).remove();
        app.doAction("strokeRed1px", "autoUv");

        app.activeDocument.artLayers.add();
        app.activeDocument.activeLayer.kind = LayerKind.TEXT;
        app.activeDocument.activeLayer.textItem.contents = arr[i][j].stt;
        app.activeDocument.activeLayer.textItem.size = 30;
        var textColor = new SolidColor;
        textColor.rgb.red = 255;
        textColor.rgb.green = 0;
        textColor.rgb.blue = 0;
        app.activeDocument.activeLayer.textItem.color = textColor;
        app.activeDocument.activeLayer.name = "1 copy";
        app.doAction("moveCenter", "autoUv");
        app.activeDocument.activeLayer.name = "1 copy 2";


        if (arr[i][j].case != lastName) {
            app.activeDocument.artLayers.add();
            app.activeDocument.activeLayer.kind = LayerKind.TEXT;
            app.activeDocument.activeLayer.textItem.contents = arr[i][j].case;
            app.activeDocument.activeLayer.textItem.size = 40;
            app.activeDocument.activeLayer.textItem.color = textColor;
            app.activeDocument.activeLayer.name = "1 copy";
            app.doAction("moveCenter", "autoUv");
            app.activeDocument.activeLayer.translate(0, 300);
            lastName = arr[i][j].case;
        }
        app.activeDocument.mergeVisibleLayers();
        app.activeDocument.activeLayer.name = arr[i][j].stt;

        app.activeDocument.activeLayer.duplicate(app.documents["GLLM"].layerSets["SPOT"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }

    { // translate layer đến vị trí cần in
        app.activeDocument.activeLayer = app.activeDocument.layerSets["CMYK"].artLayers.getByName(arr[i][j].stt);
        app.doAction("moveZero", "autoUv");
        app.activeDocument.activeLayer.translate(xPosition, yPosition * (-1));
        app.activeDocument.activeLayer = app.activeDocument.layerSets["SPOT"].artLayers.getByName(arr[i][j].stt);
        app.doAction("moveZero", "autoUv");
        app.activeDocument.activeLayer.translate(xPosition, yPosition * (-1));
        if (j > 0) app.activeDocument.activeLayer.merge();
        app.activeDocument.activeLayer.name = "SPOTKhung";
    }
}
else { alert("file design không > 1 layer !") };


