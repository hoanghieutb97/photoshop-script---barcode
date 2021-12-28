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

            app.open(File("//192.168.1.99/back up in/ps script data/khung Wood Candle.png")); 
            app.activeDocument.activeLayer.name = "k"+(j+1);
            app.activeDocument.activeLayer.duplicate(app.documents["GLLM"].layerSets["SPOT"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
            app.doAction("moveZero", "autoUv");
            app.activeDocument.activeLayer.translate(xPosition, yPosition * (-1));


            try {
                app.open(File(FileDesign + "/" + arr[i][j].sku + ".png"));
              
                
            } catch (error) {
                app.open(File(FileDesign + "/" + arr[i][j].sku + ".jpg"));
           
            }
            app.activeDocument.activeLayer.name = "k"+(j+1);
            app.doAction("strokeWhite1px", "autoUv");

            // app.doAction("300ppi", "go");
            app.activeDocument.activeLayer.duplicate(app.documents["GLLM"].layerSets["CMYK"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
            #include "saveDesign.jsx"; 
            saveImageTool(arr[i][j]);
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
            app.activeDocument.activeLayer = app.documents["GLLM"].layerSets["SPOT"].artLayers["k"+(j+1)];
            app.doAction("setSelectLayer", "autoUv");
            app.activeDocument.activeLayer = app.documents["GLLM"].layerSets["CMYK"].artLayers["k"+(j+1)];
            app.doAction("moveCenterSelection","autoUv");

        }
        {
            var folder1 = Folder("//192.168.1.101/in/" + type + "-" + FileName);
            // var folder1 = Folder("~/Desktop/in anx/" + type + "-" + FileName);
            
            if (!folder1.exists) { folder1.create(); }
            // app.doAction("rotate 180", "go");

            app.doAction("crop document normal", "go");
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
    } // hết làm file
}

