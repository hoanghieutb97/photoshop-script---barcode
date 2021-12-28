function xuLy(arr, wAll, hAll, FileDesign, FileName, type) {
    var yPosition, xPosition, hLast, wLast;
    var stt = 0;
    for (var i = 0; i <= arr.length - 1; i++) { // loop làm file in
        app.documents.add(wAll, hAll, 300, "GLLM");
        app.activeDocument.layerSets.add();
        app.activeDocument.activeLayer.name = "CMYK";
        app.activeDocument.layerSets.add();
        app.activeDocument.activeLayer.name = "SPOT";
        // app.activeDocument.layerSets.add();
        // app.activeDocument.activeLayer.name = "NONE";

        yPosition = 0;
        xPosition = 0;
        hLast = 0;
        wLast = 0;
        var lastName = "";
        // for loop items
        for (var j = 0; j <= arr[i].length - 1; j++) {

            var boxW = 510;
            var boxH = 800;

            // var boxW = 466;
            // var boxH = 726;
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

            { // mat 1
                try {
                    // alert((FileDesign + "/" + arr[i][j].sku + " front.png"))
                    app.open(File(FileDesign + "/" + arr[i][j].sku + " front.png"));

                } catch (error) {
                    app.open(File(FileDesign + "/" + item + ".jpg"));

                }
                app.doAction("300ppi", "go");
                app.activeDocument.activeLayer.name = "1";
                app.doAction("crop keyAL", "go");
                if (app.activeDocument.width > app.activeDocument.height) app.activeDocument.rotateCanvas(90);
                // app.activeDocument.resizeImage(UnitValue(467, "px"), UnitValue(738, "px"), null, ResampleMethod.BICUBIC);
                app.activeDocument.resizeImage(UnitValue(348, "px"), UnitValue(608, "px"), null, ResampleMethod.BICUBIC);

                app.activeDocument.activeLayer.name = arr[i][j].stt;
                app.activeDocument.activeLayer.duplicate(app.documents["GLLM"].layerSets["CMYK"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
                #include "saveDesign.jsx";
                saveImageTool(arr[i][j], "front");
                // #include "saveDesign.jsx";
                // saveImageTool(arr[i][j]);
                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                { // translate layer đến vị trí cần in
                    app.activeDocument.activeLayer = app.activeDocument.layerSets["CMYK"].artLayers.getByName(arr[i][j].stt);
                    app.doAction("moveZero", "autoUv");
                    app.activeDocument.activeLayer.translate(xPosition, yPosition * (-1));
                }
            }

            { // mat 2
                try {
                    app.open(File(FileDesign + "/" + arr[i][j].sku + " back.png"));

                } catch (error) {
                    app.open(File(FileDesign + "/" + arr[i][j].sku + " front.png"));

                }
                app.doAction("300ppi", "go");
                app.activeDocument.activeLayer.name = "1";

                app.doAction("crop keyAL", "go");
                if (app.activeDocument.width > app.activeDocument.height) app.activeDocument.rotateCanvas(90);
                // app.activeDocument.resizeImage(UnitValue(467, "px"), UnitValue(738, "px"), null, ResampleMethod.BICUBIC);

                app.activeDocument.resizeImage(UnitValue(348, "px"), UnitValue(608, "px"), null, ResampleMethod.BICUBIC);

                app.activeDocument.activeLayer.name = arr[i][j].stt;
                app.activeDocument.activeLayer.duplicate(app.documents["GLLM"].layerSets["SPOT"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
                #include "saveDesign.jsx";
                saveImageTool(arr[i][j], "back");
                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                { // translate layer đến vị trí cần in
                    app.activeDocument.activeLayer = app.activeDocument.layerSets["SPOT"].artLayers.getByName(arr[i][j].stt);
                    app.doAction("moveZero", "autoUv");
                    app.activeDocument.activeLayer.translate(xPosition, yPosition * (-1));
                }
            }


        } // hết làm file

        {
            var folder1 = Folder("//192.168.1.101/in/" + type + "-" + FileName);
            if (!folder1.exists) { folder1.create(); }
            app.doAction("crop document key chain", "go");
            app.activeDocument.activeLayer = app.activeDocument.artLayers["CMYK copy"];
            var PSpotKhung = app.activeDocument.activeLayer.bounds;
            app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
            app.activeDocument.artLayers["CMYK copy"].remove();
            app.activeDocument.resizeCanvas(app.activeDocument.width + 30, app.activeDocument.height + 30, AnchorPosition.MIDDLECENTER);
            app.activeDocument.saveAs(Folder(folder1 + "/in " + (i + 1) + ".tif"), TiffSaveOptions, false, Extension.LOWERCASE);
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        }
        { // tạo nhãn
        #include "label 1.jsx";
        }
    }

}