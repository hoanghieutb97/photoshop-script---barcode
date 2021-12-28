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
        app.activeDocument.activeLayer.name = "KHUNG";
        // app.activeDocument.layerSets.add();
        // app.activeDocument.activeLayer.name = "tem";
        yPosition = 0;
        xPosition = 0;
        hLast = 0;
        wLast = 0;
        var lastName = "";
        // for loop items
        for (var j = 0; j <= arr[i].length - 1; j++) {
        #include "compute coordinates.jsx"; // tính toán toạ độ
            {
                try {

                    app.open(File(FileDesign + "/" + arr[i][j].sku + " front.png"));

                } catch (error) {
                    app.open(File(FileDesign + "/" + arr[i][j].sku + " front.jpg"));

                }
                if (app.activeDocument.mode != "DocumentMode.RGB") app.activeDocument.changeMode(ChangeMode.RGB);
                app.doAction("300ppi", "go");
                { // crop xóa khoảng trắng
                    var PSpotKhung = app.activeDocument.activeLayer.bounds;
                    app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
                }
                app.activeDocument.activeLayer.name = "1";
                if (app.activeDocument.width / arr[i][j].pixel.w > app.activeDocument.height / arr[i][j].pixel.h) {
                    app.activeDocument.resizeImage(null, UnitValue(hphone, "px"), null, ResampleMethod.BICUBIC);
                }
                else {
                    app.activeDocument.resizeImage(UnitValue(wphone, "px"), null, null, ResampleMethod.BICUBIC);
                }
                if (arr[i][j].case == "O.Ceramic-tim") { // tuy chinh product type
                    var idPlc = charIDToTypeID("Plc ");
                    var desc16 = new ActionDescriptor();
                    var idIdnt = charIDToTypeID("Idnt");
                    desc16.putInteger(idIdnt, 2);
                    var idnull = charIDToTypeID("null");
                    desc16.putPath(idnull, new File("//192.168.1.99/ps script data/oal su/tim.png"));
                    var idFTcs = charIDToTypeID("FTcs");
                    var idQCSt = charIDToTypeID("QCSt");
                    var idQcsa = charIDToTypeID("Qcsa");
                    desc16.putEnumerated(idFTcs, idQCSt, idQcsa);
                    var idOfst = charIDToTypeID("Ofst");
                    var desc17 = new ActionDescriptor();
                    var idHrzn = charIDToTypeID("Hrzn");
                    var idPxl = charIDToTypeID("#Pxl");
                    desc17.putUnitDouble(idHrzn, idPxl, 0.000000);
                    var idVrtc = charIDToTypeID("Vrtc");
                    var idPxl = charIDToTypeID("#Pxl");
                    desc17.putUnitDouble(idVrtc, idPxl, 0.000000);
                    var idOfst = charIDToTypeID("Ofst");
                    desc16.putObject(idOfst, idOfst, desc17);
                    var idLnkd = charIDToTypeID("Lnkd");
                    desc16.putBoolean(idLnkd, true);
                    var idAntA = charIDToTypeID("AntA");
                    desc16.putBoolean(idAntA, true);
                    executeAction(idPlc, desc16, DialogModes.NO);

                }
                else if (arr[i][j].case == "O.Ceramic-tron") {
                    var idPlc = charIDToTypeID("Plc ");
                    var desc16 = new ActionDescriptor();
                    var idIdnt = charIDToTypeID("Idnt");
                    desc16.putInteger(idIdnt, 2);
                    var idnull = charIDToTypeID("null");
                    desc16.putPath(idnull, new File("//192.168.1.99/ps script data/oal su/tron.png"));
                    var idFTcs = charIDToTypeID("FTcs");
                    var idQCSt = charIDToTypeID("QCSt");
                    var idQcsa = charIDToTypeID("Qcsa");
                    desc16.putEnumerated(idFTcs, idQCSt, idQcsa);
                    var idOfst = charIDToTypeID("Ofst");
                    var desc17 = new ActionDescriptor();
                    var idHrzn = charIDToTypeID("Hrzn");
                    var idPxl = charIDToTypeID("#Pxl");
                    desc17.putUnitDouble(idHrzn, idPxl, 0.000000);
                    var idVrtc = charIDToTypeID("Vrtc");
                    var idPxl = charIDToTypeID("#Pxl");
                    desc17.putUnitDouble(idVrtc, idPxl, 0.000000);
                    var idOfst = charIDToTypeID("Ofst");
                    desc16.putObject(idOfst, idOfst, desc17);
                    var idLnkd = charIDToTypeID("Lnkd");
                    desc16.putBoolean(idLnkd, true);
                    var idAntA = charIDToTypeID("AntA");
                    desc16.putBoolean(idAntA, true);
                    executeAction(idPlc, desc16, DialogModes.NO);


                }
                else if (arr[i][j].case == "O.Ceramic-sao") {
                    var idPlc = charIDToTypeID("Plc ");
                    var desc16 = new ActionDescriptor();
                    var idIdnt = charIDToTypeID("Idnt");
                    desc16.putInteger(idIdnt, 2);
                    var idnull = charIDToTypeID("null");
                    desc16.putPath(idnull, new File("//192.168.1.99/ps script data/oal su/sao.png"));
                    var idFTcs = charIDToTypeID("FTcs");
                    var idQCSt = charIDToTypeID("QCSt");
                    var idQcsa = charIDToTypeID("Qcsa");
                    desc16.putEnumerated(idFTcs, idQCSt, idQcsa);
                    var idOfst = charIDToTypeID("Ofst");
                    var desc17 = new ActionDescriptor();
                    var idHrzn = charIDToTypeID("Hrzn");
                    var idPxl = charIDToTypeID("#Pxl");
                    desc17.putUnitDouble(idHrzn, idPxl, 0.000000);
                    var idVrtc = charIDToTypeID("Vrtc");
                    var idPxl = charIDToTypeID("#Pxl");
                    desc17.putUnitDouble(idVrtc, idPxl, 0.000000);
                    var idOfst = charIDToTypeID("Ofst");
                    desc16.putObject(idOfst, idOfst, desc17);
                    var idLnkd = charIDToTypeID("Lnkd");
                    desc16.putBoolean(idLnkd, true);
                    var idAntA = charIDToTypeID("AntA");
                    desc16.putBoolean(idAntA, true);
                    executeAction(idPlc, desc16, DialogModes.NO);


                }
                else if (arr[i][j].case == "O.Ceramic-oval") {

                    var idPlc = charIDToTypeID("Plc ");
                    var desc16 = new ActionDescriptor();
                    var idIdnt = charIDToTypeID("Idnt");
                    desc16.putInteger(idIdnt, 2);
                    var idnull = charIDToTypeID("null");
                    desc16.putPath(idnull, new File("//192.168.1.99/ps script data/oal su/oval.png"));
                    var idFTcs = charIDToTypeID("FTcs");
                    var idQCSt = charIDToTypeID("QCSt");
                    var idQcsa = charIDToTypeID("Qcsa");
                    desc16.putEnumerated(idFTcs, idQCSt, idQcsa);
                    var idOfst = charIDToTypeID("Ofst");
                    var desc17 = new ActionDescriptor();
                    var idHrzn = charIDToTypeID("Hrzn");
                    var idPxl = charIDToTypeID("#Pxl");
                    desc17.putUnitDouble(idHrzn, idPxl, 0.000000);
                    var idVrtc = charIDToTypeID("Vrtc");
                    var idPxl = charIDToTypeID("#Pxl");
                    desc17.putUnitDouble(idVrtc, idPxl, 0.000000);
                    var idOfst = charIDToTypeID("Ofst");
                    desc16.putObject(idOfst, idOfst, desc17);
                    var idLnkd = charIDToTypeID("Lnkd");
                    desc16.putBoolean(idLnkd, true);
                    var idAntA = charIDToTypeID("AntA");
                    desc16.putBoolean(idAntA, true);
                    executeAction(idPlc, desc16, DialogModes.NO);

                }


                app.doAction("su-mark", "fx");




                app.activeDocument.activeLayer.name = arr[i][j].stt;
                app.activeDocument.activeLayer.duplicate(app.documents["GLLM"].layerSets["CMYK"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
                #include "saveDesign.jsx";
                saveImageTool(arr[i][j], "front");
                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                { // translate layer đến vị trí cần in
                    app.activeDocument.activeLayer = app.activeDocument.layerSets["CMYK"].artLayers.getByName(arr[i][j].stt);
                    app.doAction("moveZero", "autoUv");
                    app.activeDocument.activeLayer.translate(xPosition, (yPosition) * (-1));
                }
            }

            {
                try {

                    app.open(File(FileDesign + "/" + arr[i][j].sku + " back.png"));

                } catch (error) {
                    try {
                        app.open(File(FileDesign + "/" + arr[i][j].sku + " back.jpg"));

                    } catch (error) {
                        try {
                            app.open(File(FileDesign + "/" + arr[i][j].sku + " front.png"));

                        } catch (error) {
                            app.open(File(FileDesign + "/" + arr[i][j].sku + " front.jpg"));

                        }

                    }

                }
                if (app.activeDocument.mode != "DocumentMode.RGB") app.activeDocument.changeMode(ChangeMode.RGB);

                app.doAction("300ppi", "go");
                { // crop xóa khoảng trắng
                    var PSpotKhung = app.activeDocument.activeLayer.bounds;
                    app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
                }
                app.activeDocument.activeLayer.name = "1";
                if (app.activeDocument.width / arr[i][j].pixel.w > app.activeDocument.height / arr[i][j].pixel.h) {
                    app.activeDocument.resizeImage(null, UnitValue(hphone, "px"), null, ResampleMethod.BICUBIC);
                }
                else {
                    app.activeDocument.resizeImage(UnitValue(wphone, "px"), null, null, ResampleMethod.BICUBIC);
                }

                if (arr[i][j].case == "O.Ceramic-tim") { // tuy chinh product type
                    var idPlc = charIDToTypeID("Plc ");
                    var desc16 = new ActionDescriptor();
                    var idIdnt = charIDToTypeID("Idnt");
                    desc16.putInteger(idIdnt, 2);
                    var idnull = charIDToTypeID("null");
                    desc16.putPath(idnull, new File("//192.168.1.99/ps script data/oal su/tim.png"));
                    var idFTcs = charIDToTypeID("FTcs");
                    var idQCSt = charIDToTypeID("QCSt");
                    var idQcsa = charIDToTypeID("Qcsa");
                    desc16.putEnumerated(idFTcs, idQCSt, idQcsa);
                    var idOfst = charIDToTypeID("Ofst");
                    var desc17 = new ActionDescriptor();
                    var idHrzn = charIDToTypeID("Hrzn");
                    var idPxl = charIDToTypeID("#Pxl");
                    desc17.putUnitDouble(idHrzn, idPxl, 0.000000);
                    var idVrtc = charIDToTypeID("Vrtc");
                    var idPxl = charIDToTypeID("#Pxl");
                    desc17.putUnitDouble(idVrtc, idPxl, 0.000000);
                    var idOfst = charIDToTypeID("Ofst");
                    desc16.putObject(idOfst, idOfst, desc17);
                    var idLnkd = charIDToTypeID("Lnkd");
                    desc16.putBoolean(idLnkd, true);
                    var idAntA = charIDToTypeID("AntA");
                    desc16.putBoolean(idAntA, true);
                    executeAction(idPlc, desc16, DialogModes.NO);

                }
                else if (arr[i][j].case == "O.Ceramic-tron") {
                    var idPlc = charIDToTypeID("Plc ");
                    var desc16 = new ActionDescriptor();
                    var idIdnt = charIDToTypeID("Idnt");
                    desc16.putInteger(idIdnt, 2);
                    var idnull = charIDToTypeID("null");
                    desc16.putPath(idnull, new File("//192.168.1.99/ps script data/oal su/tron.png"));
                    var idFTcs = charIDToTypeID("FTcs");
                    var idQCSt = charIDToTypeID("QCSt");
                    var idQcsa = charIDToTypeID("Qcsa");
                    desc16.putEnumerated(idFTcs, idQCSt, idQcsa);
                    var idOfst = charIDToTypeID("Ofst");
                    var desc17 = new ActionDescriptor();
                    var idHrzn = charIDToTypeID("Hrzn");
                    var idPxl = charIDToTypeID("#Pxl");
                    desc17.putUnitDouble(idHrzn, idPxl, 0.000000);
                    var idVrtc = charIDToTypeID("Vrtc");
                    var idPxl = charIDToTypeID("#Pxl");
                    desc17.putUnitDouble(idVrtc, idPxl, 0.000000);
                    var idOfst = charIDToTypeID("Ofst");
                    desc16.putObject(idOfst, idOfst, desc17);
                    var idLnkd = charIDToTypeID("Lnkd");
                    desc16.putBoolean(idLnkd, true);
                    var idAntA = charIDToTypeID("AntA");
                    desc16.putBoolean(idAntA, true);
                    executeAction(idPlc, desc16, DialogModes.NO);


                }
                else if (arr[i][j].case == "O.Ceramic-sao") {
                    var idPlc = charIDToTypeID("Plc ");
                    var desc16 = new ActionDescriptor();
                    var idIdnt = charIDToTypeID("Idnt");
                    desc16.putInteger(idIdnt, 2);
                    var idnull = charIDToTypeID("null");
                    desc16.putPath(idnull, new File("//192.168.1.99/ps script data/oal su/sao.png"));
                    var idFTcs = charIDToTypeID("FTcs");
                    var idQCSt = charIDToTypeID("QCSt");
                    var idQcsa = charIDToTypeID("Qcsa");
                    desc16.putEnumerated(idFTcs, idQCSt, idQcsa);
                    var idOfst = charIDToTypeID("Ofst");
                    var desc17 = new ActionDescriptor();
                    var idHrzn = charIDToTypeID("Hrzn");
                    var idPxl = charIDToTypeID("#Pxl");
                    desc17.putUnitDouble(idHrzn, idPxl, 0.000000);
                    var idVrtc = charIDToTypeID("Vrtc");
                    var idPxl = charIDToTypeID("#Pxl");
                    desc17.putUnitDouble(idVrtc, idPxl, 0.000000);
                    var idOfst = charIDToTypeID("Ofst");
                    desc16.putObject(idOfst, idOfst, desc17);
                    var idLnkd = charIDToTypeID("Lnkd");
                    desc16.putBoolean(idLnkd, true);
                    var idAntA = charIDToTypeID("AntA");
                    desc16.putBoolean(idAntA, true);
                    executeAction(idPlc, desc16, DialogModes.NO);


                }
                else if (arr[i][j].case == "O.Ceramic-oval") {

                    var idPlc = charIDToTypeID("Plc ");
                    var desc16 = new ActionDescriptor();
                    var idIdnt = charIDToTypeID("Idnt");
                    desc16.putInteger(idIdnt, 2);
                    var idnull = charIDToTypeID("null");
                    desc16.putPath(idnull, new File("//192.168.1.99/ps script data/oal su/oval.png"));
                    var idFTcs = charIDToTypeID("FTcs");
                    var idQCSt = charIDToTypeID("QCSt");
                    var idQcsa = charIDToTypeID("Qcsa");
                    desc16.putEnumerated(idFTcs, idQCSt, idQcsa);
                    var idOfst = charIDToTypeID("Ofst");
                    var desc17 = new ActionDescriptor();
                    var idHrzn = charIDToTypeID("Hrzn");
                    var idPxl = charIDToTypeID("#Pxl");
                    desc17.putUnitDouble(idHrzn, idPxl, 0.000000);
                    var idVrtc = charIDToTypeID("Vrtc");
                    var idPxl = charIDToTypeID("#Pxl");
                    desc17.putUnitDouble(idVrtc, idPxl, 0.000000);
                    var idOfst = charIDToTypeID("Ofst");
                    desc16.putObject(idOfst, idOfst, desc17);
                    var idLnkd = charIDToTypeID("Lnkd");
                    desc16.putBoolean(idLnkd, true);
                    var idAntA = charIDToTypeID("AntA");
                    desc16.putBoolean(idAntA, true);
                    executeAction(idPlc, desc16, DialogModes.NO);

                }

                app.doAction("su-mark", "fx");




                app.activeDocument.activeLayer.name = arr[i][j].stt;
                app.activeDocument.activeLayer.duplicate(app.documents["GLLM"].layerSets["SPOT"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
                #include "saveDesign.jsx";
                saveImageTool(arr[i][j], "back");
                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                { // translate layer đến vị trí cần in
                    app.activeDocument.activeLayer = app.activeDocument.layerSets["SPOT"].artLayers.getByName(arr[i][j].stt);
                    app.doAction("moveZero", "autoUv");
                    app.activeDocument.activeLayer.translate(xPosition, (yPosition) * (-1));
                }
                {// tao khung su

                    if (arr[i][j].case == "O.Ceramic-tim") { // tuy chinh product type
                        app.open(File("//192.168.1.99/ps script data/oal su/khung tim.png"));

                    }
                    else if (arr[i][j].case == "O.Ceramic-tron") {
                        app.open(File("//192.168.1.99/ps script data/oal su/khung tron.png"));


                    }
                    else if (arr[i][j].case == "O.Ceramic-sao") {
                        app.open(File("//192.168.1.99/ps script data/oal su/khung sao.png"));


                    }
                    else if (arr[i][j].case == "O.Ceramic-oval") {

                        app.open(File("//192.168.1.99/ps script data/oal su/khung oval.png"));

                    }
                    app.activeDocument.activeLayer.name = arr[i][j].stt;
                    app.activeDocument.activeLayer.duplicate(app.documents["GLLM"].layerSets["KHUNG"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
                    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                    app.activeDocument.activeLayer = app.activeDocument.layerSets["KHUNG"].artLayers.getByName(arr[i][j].stt);
                    app.doAction("moveZero", "autoUv");
                    app.activeDocument.activeLayer.translate(xPosition, (yPosition) * (-1));

                }
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

            app.activeDocument.saveAs(Folder(folder1 + "/in " + (i + 1) + ".tif"), TiffSaveOptions, false, Extension.LOWERCASE);
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        }
        { // tạo nhãn
            #include "label 1.jsx";
        }
    } // hết làm file
}

