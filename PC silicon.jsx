function xuLy(typePosition, wAll, hAll, FileDesign, FileName, type) {



    hAll = 6496, wAll = 10039;

    { // khoảng cách padding của bàn mica
        paddingBottom = Math.round(10 / 0.084667);
        paddingLeft = Math.round(20 / 0.084667);
    }
    {
        var paddingPrintTB = 4;
        var paddingPrintLR = 3;
    }
    { // khung để đặt ốp, có chiều 100 x 180 mm
        var wk = Math.round(100 / 0.084667);
        var hk = Math.round(180 / 0.084667);
    }


    for (var arr = 0; arr <= typePosition.length - 1; arr++) {

        if (typePosition[arr].length != 0) {
            for (var ban = 0; ban <= typePosition[arr].length - 1; ban++) { // loop  1 bàn
                { // tạo bảng in và group CMYK, SPOT
                    app.documents.add(wAll, hAll, 300, "silicon");
                    app.activeDocument.layerSets.add();
                    app.activeDocument.activeLayer.name = "CMYK";
                    app.activeDocument.layerSets.add();
                    app.activeDocument.activeLayer.name = "CMYK2";
                    app.activeDocument.layerSets.add();
                    app.activeDocument.activeLayer.name = "SPOT";
                }
                // alert(FileDesign + "/" + typePosition[0][0][0][0].sku + ".tif")
                for (var i = 0; i <= typePosition[arr][ban].length - 1; i++) { // loop 1 hàng
                    for (var j = 0; j <= typePosition[arr][ban][i].length - 1; j++) { // lop 1 cái
                        var wphone = typePosition[arr][ban][i][j].pixel.w;
                        var hphone = typePosition[arr][ban][i][j].pixel.h;
                        wphone = Math.round((wphone - paddingPrintLR) / 0.084667);
                        hphone = Math.round((hphone - paddingPrintTB) / 0.084667);


                        try {
                            app.open(File(FileDesign + "/" + typePosition[arr][ban][i][j].sku + ".png"));
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

                            // app.activeDocument.flipCanvas(Direction.HORIZONTAL);
                        } catch (error) {
                            try {
                                app.open(File(FileDesign + "/" + typePosition[arr][ban][i][j].sku + ".jpg"));
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
                            } catch (error) {
                                try {
                                    app.open(File(FileDesign + "/" + typePosition[arr][ban][i][j].sku + ".jpeg"));
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
                                } catch (error) {
                                    app.documents.add(1200, 2400, 300, "aaaa");
                                }

                            }




                        }


                        if (app.activeDocument.artLayers.length === 1) { // nhân đôi layer, kiểm tra nếu có 2 layer là phải làm lại từ đầu
                            app.activeDocument.rotateCanvas(180);
                            app.activeDocument.activeLayer.name = "1";
                            var heightDoc = app.activeDocument.height;
                            var PSpotKhung = app.activeDocument.activeLayer.bounds; // x y w h
                            var trongSuot = false;
                            if (PSpotKhung[3] < heightDoc) trongSuot = true;
                            app.activeDocument.activeLayer.duplicate(app.activeDocument.activeLayer, ElementPlacement.PLACEBEFORE); // nhân đôi layer
                            app.activeDocument.resizeCanvas(wphone, hphone); // resize canvas về cỡ cần in với loại điện thoại

                            { // resize layer về cỡ cần in
                                if ((hphone / wphone) < 2) { var newSize = (wphone * 100 / 1200) }
                                else { var newSize = (hphone * 100 / 2400) }
                                app.activeDocument.artLayers["1 copy"].resize(newSize, newSize, AnchorPosition.MIDDLECENTER);
                            }


                            // app.activeDocument.mergeVisibleLayers(); // gộp all layer 
                            app.activeDocument.artLayers["1"].remove();

                            if (typePosition[arr][ban][i][j].case.slice(0, 6) == "note10")
                                app.doAction("createRectangle20", "autoUv");
                            else if (typePosition[arr][ban][i][j].case.slice(0, 1) == "i")
                                app.doAction("createRectangle120", "autoUv");
                            else
                                app.doAction("createRectangle80", "autoUv");

                            var cropw = wphone * 100 / 1000;
                            var croph = hphone * 100 / 1500;
                            app.activeDocument.activeLayer.resize(cropw, croph, AnchorPosition.MIDDLECENTER);
                            app.doAction("selectAreaLayer", "autoUv");
                            app.activeDocument.artLayers.getByName("Rounded Rectangle 1").remove();
                            app.doAction("duplicateSelection", "autoUv"); // tạo layer mới từ vùng chọn

                            app.activeDocument.artLayers["1 copy"].remove();

                            if (trongSuot == true) {
                                app.doAction('strokeWhite1px', "autoUv");
                                app.activeDocument.activeLayer.name = typePosition[arr][ban][i][j].stt; // đặt tên cho layer voi stt
                                app.activeDocument.activeLayer.duplicate(app.documents["silicon"].layerSets["CMYK2"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
                                #include "saveDesign.jsx";
                                saveImageTool(typePosition[arr][ban][i][j], "a", "noneCrop");
                                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                                app.activeDocument.activeLayer = app.activeDocument.layerSets["CMYK2"].artLayers.getByName(typePosition[arr][ban][i][j].stt);
                            } else {
                                // app.doAction('strokeLayerBlack8', "autoUv");
                                app.activeDocument.activeLayer.name = typePosition[arr][ban][i][j].stt; // đặt tên cho layer voi stt
                                app.activeDocument.activeLayer.duplicate(app.documents["silicon"].layerSets["CMYK"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
                                #include "saveDesign.jsx";
                                saveImageTool(typePosition[arr][ban][i][j], "a", "noneCrop");
                                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                                app.activeDocument.activeLayer = app.activeDocument.layerSets["CMYK"].artLayers.getByName(typePosition[arr][ban][i][j].stt);
                            }

                            app.doAction("moveZero", "autoUv");
                            app.activeDocument.activeLayer.translate(paddingLeft + j * wk + Math.round(paddingPrintLR / (2 * 0.084667)), (paddingBottom + i * hk + Math.round(paddingPrintTB / (2 * 0.084667))) * (-1));


                        }
                        else { alert("file design khong > 1 layer") };


                    }

                }

                app.doAction("createSpotChannelSilicon", "autoUv");
                if (arr == 0) {
                    var folder1 = Folder("//192.168.1.101/in/z9-silicon " + (ban + 1) + "  " + FileName);
                    if (!folder1.exists) { folder1.create(); }
                    app.activeDocument.saveAs(Folder(folder1 + "/z9 " + (ban + 1) + "  " + FileName + ".tif"), TiffSaveOptions, false, Extension.LOWERCASE);
                }
                else {
                    var folder1 = Folder("//192.168.1.101/in/z10-silicon " + (ban + 1) + "  " + FileName);
                    if (!folder1.exists) { folder1.create(); }
                    app.activeDocument.saveAs(Folder(folder1 + "/z10 " + (ban + 1) + "  " + FileName + ".tif"), TiffSaveOptions, false, Extension.LOWERCASE);
                }

                app.activeDocument.close();

            }
            { // tạo nhãn
                #include "label 2 silicon.jsx";

            }
        }
    }

}

