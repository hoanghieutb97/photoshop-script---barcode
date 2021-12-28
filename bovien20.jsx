function xuLy(arr, wAll, hAll, FileDesign, FileName, type) {

    var yPosition, xPosition, hLast, wLast;
    var stt = 0;

    for (var i = 0; i <= arr.length - 1; i++) { // loop làm file in

        app.documents.add(wAll, hAll, 300, "GLLM");
        app.activeDocument.layerSets.add();
        app.activeDocument.activeLayer.name = "CMYK";
        app.activeDocument.layerSets.add();
        app.activeDocument.activeLayer.name = "SPOT";

        yPosition = 0;
        xPosition = 0;
        hLast = 0;
        wLast = 0;
        var lastName = "";


        // for loop items
        for (var j = 0; j <= arr[i].length - 1; j++) {
        #include "compute coordinates.jsx"; // tính toán toạ độ
        #include "normal image size bovien20.jsx"; // xử mở và xử lý file, đưa sang document GLLM
            openFileAndResize(FileDesign, arr[i][j].sku, arr[i][j]);
            {
                app.activeDocument.activeLayer.name = arr[i][j].stt;
                app.activeDocument.activeLayer.duplicate(app.documents["GLLM"].layerSets["CMYK"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
                #include "saveDesign.jsx";
                saveImageTool(arr[i][j]);
                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                { // translate layer đến vị trí cần in
                    app.activeDocument.activeLayer = app.activeDocument.layerSets["CMYK"].artLayers.getByName(arr[i][j].stt);
                    app.doAction("moveZero", "autoUv");
                    app.activeDocument.activeLayer.translate(xPosition, (yPosition ) * (-1));
                    // app.open(File("//192.168.1.99/back up in/ps script data/soban.tif"));
                    // app.activeDocument.activeLayer.textItem.contents = arr[i][j].stt;
                    // app.activeDocument.mergeVisibleLayers(); // gộp all layer 
                    // app.activeDocument.activeLayer.duplicate(app.documents["GLLM"].layerSets["CMYK"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
                    // app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                    // app.activeDocument.activeLayer.name = "stt-" + arr[i][j].stt;
                    // app.doAction("moveZero", "autoUv");
                    // app.activeDocument.activeLayer.translate(xPosition, (yPosition) * (-1));

                    // 354px
                }
            }
        }


        {
            var folder1 = Folder("//192.168.1.101/in/" + type + "-" + FileName);
            if (!folder1.exists) { folder1.create(); }

            // app.doAction("rotate 180", "go");
            app.doAction("create spot in bo vien 20", "go");
            app.activeDocument.activeLayer = app.activeDocument.artLayers["CMYK"];
            var PSpotKhung = app.activeDocument.activeLayer.bounds;
            app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);

            app.activeDocument.saveAs(Folder(folder1 + "/in " + (i + 1) + ".tif"), TiffSaveOptions, false, Extension.LOWERCASE);
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        }



        { // tạo nhãn
            #include "label 1.jsx";

        }

    } // hết làm file

}

