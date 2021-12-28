function xuLy(arr, wAll, hAll, FileDesign, FileName, type) {
    var yPosition, xPosition, hLast, wLast;
    var stt = 0;
    for (var i = 0; i <= arr.length - 1; i++) { // loop làm file in
        app.documents.add(2480, 3508, 300, "GLLM"); // tao trang a4
        app.activeDocument.layerSets.add();
        app.activeDocument.activeLayer.name = "CMYK";

        // for loop items
        for (var j = 0; j <= arr[i].length - 1; j++) {
            var hphone = Math.round(arr[i][j].pixel.h / 0.084667);
            var wphone = Math.round(arr[i][j].pixel.w / 0.084667);
            var newSize = 100;
            try {
                app.open(File(FileDesign + "/" + arr[i][j].sku + ".jpg"));


            } catch (error) {
                app.open(File(FileDesign + "/" + arr[i][j].sku + ".png"));
            }
            var width = app.activeDocument.width;
            var height = app.activeDocument.height;

            app.activeDocument.activeLayer.name = "1"
            app.activeDocument.activeLayer.duplicate(app.activeDocument.activeLayer, ElementPlacement.PLACEBEFORE); // nhân đôi layer
            app.activeDocument.resizeCanvas(wphone, hphone); // resize canvas về cỡ cần in với loại điện thoại
            if ((height / hphone) < width / wphone) { newSize = (wphone * 100 / width) }
            else { newSize = (hphone * 100 / height) }

            app.activeDocument.artLayers["1 copy"].resize(newSize, newSize, AnchorPosition.MIDDLECENTER);
            app.doAction("fillbackgroundWhite", "autoUv");
            app.activeDocument.mergeVisibleLayers(); // gộp all layer 
            app.doAction("canvasHoriz", "go");
            app.activeDocument.activeLayer.duplicate(app.documents["GLLM"].layerSets["CMYK"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
            #include "saveDesign.jsx";
            saveImageTool(arr[i][j]);
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
            app.activeDocument.activeLayer.name = j;
            app.doAction('moveBL', "autoUv");
            switch (j) {
                case 0:
                    {
                        app.activeDocument.activeLayer.translate(0, 0);

                        createName(arr[i][j].name, -1080)
                    }
                    break;
                case 1:
                    {
                        app.activeDocument.activeLayer.translate(0, -1170);
                        createName(arr[i][j].name, -2255);
                    }
                    break;
                case 2:
                    {
                        app.activeDocument.activeLayer.translate(0, -2340);
                        createName(arr[i][j].name, -3425);
                    }
                    break;
                default:
                    break;
            }



        }
        {// lưu file in
            var folder1 = Folder("//192.168.1.101/in/" + type + "-" + FileName);
            if (!folder1.exists) { folder1.create(); }

            app.activeDocument.saveAs(Folder(folder1 + "/" + (i + 1) + ".tif"), TiffSaveOptions, false, Extension.LOWERCASE);
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES); // tat file gllm
        }

    } // hết làm file
}

function createName(name, HPosition) {
    app.activeDocument.artLayers.add(); // tao layer text
    app.activeDocument.activeLayer.kind = LayerKind.TEXT;
    app.doAction("changeFontVH", "autoUv");
    app.activeDocument.activeLayer.textItem.contents = name;
    app.doAction('moveBL', "autoUv");
    app.activeDocument.activeLayer.translate(800, HPosition);
}