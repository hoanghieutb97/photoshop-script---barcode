function xuLy(arr, wAll, hAll, FileDesign, FileName, type) {
    var yPosition, xPosition, hLast, wLast;
    var stt = 0;
    for (var i = 0; i <= arr.length - 1; i++) { // loop làm file in
        app.documents.add(wAll, hAll, 300, "GLLM");
        app.activeDocument.layerSets.add();
        app.activeDocument.activeLayer.name = "CMYK";
        // app.activeDocument.layerSets.add();
        // app.activeDocument.activeLayer.name = "SPOT";

        yPosition = 0;
        xPosition = 0;
        hLast = 0;
        wLast = 0;
        var lastName = "";
        // for loop items
        for (var j = 0; j <= arr[i].length - 1; j++) {
            app.open(File("//192.168.1.99/ps script data/khung dls.png"))
        #include "compute coordinates.jsx"; // tính toán toạ độ
            try {

                app.open(File(FileDesign + "/" + arr[i][j].sku + ".png"));

            } catch (error) {
                try {
                    app.open(File(FileDesign + "/" + arr[i][j].sku + ".jpg"));

                } catch (error) {
                    app.open(File("//192.168.1.99/ps script data/dsl loi.png"));

                }
            }
            app.activeDocument.activeLayer.name = "1 copy";

            app.doAction("strokeWhite1px", "autoUv");
            app.activeDocument.activeLayer.duplicate(app.documents["khung dls.png"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

            app.doAction("moveCenter", "autoUv");
            { // scliping layer
                var idGrpL = charIDToTypeID("GrpL");
                var desc91 = new ActionDescriptor();
                var idnull = charIDToTypeID("null");
                var ref31 = new ActionReference();
                var idLyr = charIDToTypeID("Lyr ");
                var idOrdn = charIDToTypeID("Ordn");
                var idTrgt = charIDToTypeID("Trgt");
                ref31.putEnumerated(idLyr, idOrdn, idTrgt);
                desc91.putReference(idnull, ref31);
                executeAction(idGrpL, desc91, DialogModes.NO);
            }
            app.activeDocument.mergeVisibleLayers();


            {
                app.activeDocument.activeLayer.name = arr[i][j].stt;
                app.activeDocument.activeLayer.duplicate(app.documents["GLLM"].layerSets["CMYK"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
                #include "saveDesign.jsx";
                saveImageTool(arr[i][j]);
                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                { // translate layer đến vị trí cần in
                    app.activeDocument.activeLayer = app.activeDocument.layerSets["CMYK"].artLayers.getByName(arr[i][j].stt);
                    app.doAction("moveZero", "autoUv");
                    app.activeDocument.activeLayer.translate(xPosition, (yPosition) * (-1));
                }

                if (app.activeDocument.layerSets["CMYK"].layers.length > 1) app.activeDocument.activeLayer.merge();
                app.activeDocument.activeLayer.name = arr[i][j].stt;
            }
        }
        {
            var folder1 = Folder("//192.168.1.101/in/" + type + "-" + FileName);
            if (!folder1.exists) { folder1.create(); }
            // app.doAction("rotate 180", "go");

            app.doAction("crop document normal", "go");
            app.activeDocument.activeLayer = app.activeDocument.artLayers["CMYK copy"];
            var PSpotKhung = app.activeDocument.activeLayer.bounds;
            app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
            app.activeDocument.artLayers["CMYK copy"].remove();
            app.activeDocument.resizeCanvas(app.activeDocument.width + 30, app.activeDocument.height + 30, AnchorPosition.MIDDLECENTER);
            app.doAction("create spot in normal", "go");
            app.activeDocument.saveAs(Folder(folder1 + "/in " + (i + 1) + ".tif"), TiffSaveOptions, false, Extension.LOWERCASE);
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        }
        { // tạo nhãn
            #include "label 1.jsx";
        }
    } // hết làm file
}

