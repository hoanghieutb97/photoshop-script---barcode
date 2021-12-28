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
        #include "phoneCase arrangeFile.jsx"; // xử mở và xử lý file, đưa sang document GLLM
         
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
                app.activeDocument.layerSets.getByName("CMYK").visible = false;
                var folder1 = Folder("//192.168.1.101/in/" + type+"-" + FileName);
                if (!folder1.exists) { folder1.create(); }
                app.activeDocument.saveAs(Folder(folder1 + "/khung " + (i + 1) + ".tif"), TiffSaveOptions, false, Extension.LOWERCASE);
            }
            {// lưu file in
                app.activeDocument.channels.getByName("Spot Color 1").remove();
                app.activeDocument.layerSets.getByName("CMYK").visible = true;
                app.activeDocument.saveAs(Folder(folder1 + "/in " + (i + 1) + ".tif"), TiffSaveOptions, false, Extension.LOWERCASE);
            }
            {
                app.activeDocument.activeLayer = app.activeDocument.layerSets.getByName("CMYK");
                app.doAction("createSmarkOBJ", "autoUv");
                app.doAction("selectArea", "autoUv");
                app.doAction("createSPOTWithArea", "autoUv");
                app.activeDocument.artLayers.getByName("CMYK").visible = false;
                app.activeDocument.saveAs(Folder(folder1 + "/white " + (i + 1) + ".tif"), TiffSaveOptions, false, Extension.LOWERCASE);
                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
            }
        }



        { // tạo nhãn
            #include "label 1.jsx";

        }

    } // hết làm file

}

