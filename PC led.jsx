function xuLy(arr, wAll, hAll, FileDesign, FileName, type) {

    var yPosition, xPosition, hLast, wLast;
    var stt = 0;

    for (var i = 0; i <= arr.length - 1; i++) { // loop làm file in
        app.documents.add(wAll, hAll, 300, "GLLM");
        app.activeDocument.layerSets.add();
        app.activeDocument.activeLayer.name = "CMYK";
        app.activeDocument.layerSets.add();
        app.activeDocument.activeLayer.name = "SPOT";
        app.activeDocument.layerSets.add();
        app.activeDocument.activeLayer.name = "SPOT2";

        yPosition = 0;
        xPosition = 0;
        hLast = 0;
        wLast = 0;
        var lastName = "";


        // for loop items
        for (var j = 0; j <= arr[i].length - 1; j++) {
            #include "compute coordinates.jsx"; // tính toán toạ độ



            try {
                app.open(File(FileDesign + "/" + arr[i][j].sku + ".png"));

            } catch (error) {
                app.open(File(FileDesign + "/" + arr[i][j].sku + ".jpg"));

            }
            app.doAction("canvasHoriz", "go");
            if (app.activeDocument.width !== 1200 || app.activeDocument.height !== 2400) {
                alert(arr[i][j].sku, " khác cỡ 1200 x 2400 !")
            }
            else if (app.activeDocument.artLayers.length === 1) {
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
                    #include "saveDesign.jsx";
                    saveImageTool(arr[i][j], "a", "noneCrop");
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


            // lam SPOT2
            try {
                app.open(File(FileDesign + "/" + arr[i][j].sku + "flash.png"));
                app.doAction("canvasHoriz", "go");

            } catch (error) {
                app.documents.add(1200, 2400, 300, "aaaa");
            }
            if (app.activeDocument.width !== 1200 || app.activeDocument.height !== 2400) {
                alert(arr[i][j].sku, " khác cỡ 1200 x 2400 !")
            }
            else if (app.activeDocument.artLayers.length === 1) {
                app.activeDocument.activeLayer.name = "1";
                app.activeDocument.artLayers.add();
                app.doAction("strokeWhite1px", "autoUv");
                app.activeDocument.mergeVisibleLayers();
                app.activeDocument.activeLayer.duplicate(app.activeDocument.activeLayer, ElementPlacement.PLACEBEFORE); // nhân đôi layer
                app.activeDocument.resizeCanvas(wphone, hphone); // resize canvas về cỡ cần in với loại điện thoại
                { // resize layer về cỡ cần in
                    if ((hphone / wphone) < 2) { var newSize = (wphone * 100 / 1200) }
                    else { var newSize = (hphone * 100 / 2400) }
                    // app.doAction("strokeWhite1px", "autoUv");
                    app.activeDocument.artLayers["Layer 1 copy"].resize(newSize, newSize, AnchorPosition.MIDDLECENTER);
                    app.activeDocument.artLayers.getByName("Layer 1").remove();
                    app.activeDocument.artLayers.add()
                    app.activeDocument.mergeVisibleLayers(); // gộp all layer 
                    app.doAction("strokeWhite1px", "autoUv");
                    app.activeDocument.activeLayer.name = arr[i][j].stt; // đặt tên cho layer voi stt
                    app.activeDocument.activeLayer.duplicate(app.documents["GLLM"].layerSets["SPOT2"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
                    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                    app.activeDocument.activeLayer = app.activeDocument.layerSets["SPOT2"].artLayers.getByName(arr[i][j].stt);
                    app.doAction("moveZero", "autoUv");
                    app.activeDocument.activeLayer.translate(xPosition, yPosition * (-1));
                    if (j > 0) app.activeDocument.activeLayer.merge();
                    app.activeDocument.activeLayer.name = "SPOTWhite";
                }

            }
            else { alert("file design không > 1 layer !") };


        }


        {
            { // xử lý sau khi duplicate hết items
                app.activeDocument.activeLayer = app.activeDocument.layerSets["SPOT"].artLayers.getByName("SPOTKhung");
                var PSpotKhung = app.activeDocument.activeLayer.bounds;
                app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
                // app.activeDocument.rotateCanvas(180);
                app.doAction("selectArea", "autoUv");
                app.doAction("Area expan 1", "autoUv");
                app.doAction("createSPOTWithArea", "autoUv");
            }
            { // lưu file khung
                app.activeDocument.layerSets.getByName("SPOT").visible = false;
                app.activeDocument.layerSets.getByName("SPOT2").visible = false;
                app.activeDocument.layerSets.getByName("CMYK").visible = false;
                var folder1 = Folder("//192.168.1.101/in/" + type + "-" + FileName);
                if (!folder1.exists) { folder1.create(); }
                app.activeDocument.saveAs(Folder(folder1 + "/khung " + (i + 1) + ".tif"), TiffSaveOptions, false, Extension.LOWERCASE);

            }
            {// lưu file in 1
                app.activeDocument.channels.getByName("Spot Color 1").remove();
                app.activeDocument.layerSets.getByName("CMYK").visible = true;
                app.activeDocument.activeLayer = app.activeDocument.layerSets.getByName("CMYK");
                app.doAction("createSmarkOBJ", "autoUv");
                app.doAction("selectArea", "autoUv");
                app.doAction("createSPOTWithArea", "autoUv");
                app.activeDocument.activeLayer = app.activeDocument.layerSets.getByName("SPOT2").artLayers.getByName("SPOTWhite");
                app.doAction("selectArea", "autoUv");
                app.activeDocument.activeChannels = [app.activeDocument.channels.getByName("Spot Color 1")];
                app.doAction("fillChannelsLED0", "autoUv");
                showRGBChannel();

                app.activeDocument.channels.getByName("Spot Color 1").visible = true;
                app.activeDocument.saveAs(Folder(folder1 + "/in 1 " + (i + 1) + ".tif"), TiffSaveOptions, false, Extension.LOWERCASE);

            }
            { // lưu file in 2
                app.activeDocument.channels.getByName("Spot Color 1").remove();
                app.activeDocument.activeLayer = app.activeDocument.artLayers.getByName("CMYK");
                app.doAction("selectArea", "autoUv");
                {
                    var bColor = new SolidColor;
                    bColor.cmyk.cyan = 75;
                    bColor.cmyk.magenta = 68;
                    bColor.cmyk.yellow = 67;
                    bColor.cmyk.black = 90;
                    var wColor = new SolidColor;
                    wColor.cmyk.cyan = 0;
                    wColor.cmyk.magenta = 0;
                    wColor.cmyk.yellow = 0;
                    wColor.cmyk.black = 0;
                }
                app.activeDocument.artLayers.add();
                app.activeDocument.activeLayer.name = "black";
                app.activeDocument.selection.fill(bColor);
                app.activeDocument.artLayers.getByName("CMYK").visible = false;

                app.activeDocument.activeLayer = app.activeDocument.layerSets.getByName("SPOT2").artLayers.getByName("SPOTWhite");
                app.doAction("selectArea", "autoUv");
                app.activeDocument.activeLayer = app.activeDocument.artLayers.getByName("black");
                app.activeDocument.selection.fill(wColor);
                app.activeDocument.selection.deselect();
                app.doAction("createSPOTWithArea", "autoUv");
                app.activeDocument.activeLayer = app.activeDocument.layerSets.getByName("SPOT2").artLayers.getByName("SPOTWhite");
                app.doAction("selectArea", "autoUv");
                app.activeDocument.activeChannels = [app.activeDocument.channels.getByName("Spot Color 1")];
                app.doAction("fillChannelsLED20", "autoUv");
                showRGBChannel();
                app.activeDocument.saveAs(Folder(folder1 + "/in 2 " + (i + 1) + ".tif"), TiffSaveOptions, false, Extension.LOWERCASE);



            }
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        }
        { // tạo nhãn
            #include "label 1.jsx";

        }
    }





} // hết làm file



function showRGBChannel() {
    app.activeDocument.channels.getByName("Red").visible = true;
    app.activeDocument.channels.getByName("Green").visible = true;
    app.activeDocument.channels.getByName("Blue").visible = true;
}