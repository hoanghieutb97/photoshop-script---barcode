function xuLy(arr, wAll, hAll, FileDesign, FileName, type) {
    var yPosition, xPosition, hLast, wLast;
    var stt = 0;
    {
        for (var i = 0; i <= arr.length - 1; i++) { // loop làm file in
            // app.documents.add(wAll, hAll, 300, "GLLM");
            // app.activeDocument.layerSets.add();
            // app.activeDocument.activeLayer.name = "CMYK";

            yPosition = 0;
            xPosition = 0;
            hLast = 0;
            wLast = 0;
            var boxW = 0;
            var boxH = 0;
            var lastName = "";
            // for loop items
            for (var j = 0; j <= arr[i].length - 1; j++) {

                {// "normal image size.jsx"; // xử mở và xử lý file, đưa sang document GLLM
                    try {

                        app.open(File("//192.168.1.99/ps script data/chan cho" + "/" + arr[i][j].type + ".tif"));
                        app.doAction("300ppi", "go");
                        { // thay ten
                            var PSpotKhung1 = app.activeDocument.activeLayer.bounds;

                            var khoangCach = (PSpotKhung1[2] - PSpotKhung1[0]);
                            app.activeDocument.artLayers.getByName("name").textItem.contents = arr[i][j].note;
                            var PSpotKhung = app.activeDocument.activeLayer.bounds;
                            var PSpotKhung = app.activeDocument.activeLayer.bounds; //0-86 2-977
                            app.activeDocument.artLayers["name"].resize(khoangCach * 100 / (PSpotKhung[2] - PSpotKhung[0]), khoangCach * 100 / (PSpotKhung[2] - PSpotKhung[0]), AnchorPosition.MIDDLECENTER);
                            app.doAction("moveLeft", "autoUv");
                            app.activeDocument.activeLayer.translate(PSpotKhung1[0], 0);
                            // app.activeDocument.activeLayer.translate(PSpotKhung1[0], (app.activeDocument.height - PSpotKhung1[3]) * (-1));
                            // app.activeDocument.mergeVisibleLayers(); // gộp all layer 


                        }

                        app.activeDocument.saveAs(Folder("//192.168.1.99/chan cho/" + arr[i][j].type + "-" + arr[i][j].barcode + "-" + arr[i][j].note + ".tif"), TiffSaveOptions);
                        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

                    } catch (error) {
                        alert(arr[i][j].name);
                        // app.open(File(FileDesign + "/" + arr[i][j].sku + ".jpg"));
                    }


                }

            } // hết làm file
        }
    }


}

