function xuLy(arr, wAll, hAll, FileDesign, FileName, type) {
    var yPosition, xPosition, hLast, wLast;
    var stt = 0;
    // alert("testnet")
    var file = new File("//192.168.1.99/ps script data/autoCut/data.json");
    file.open("r");
    var strFile;
    strFile = file.read();
    file.close();
    var fixImage = JSON.parse(strFile);



    for (var i = 0; i <= arr.length - 1; i++) { // loop làm file in
        app.documents.add(wAll, hAll, 300, "GLLM");
        app.activeDocument.layerSets.add();
        app.activeDocument.activeLayer.name = "CMYK";
        app.activeDocument.layerSets.add();
        app.activeDocument.activeLayer.name = "SPOT";
        app.activeDocument.layerSets.add();
        app.activeDocument.activeLayer.name = "CUT";
        app.activeDocument.layerSets.add();
        app.activeDocument.activeLayer.name = "CUTFIX";
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
        #include "normal image size.jsx"; // xử mở và xử lý file, đưa sang document GLLM
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
                    app.activeDocument.activeLayer.translate(xPosition, (yPosition) * (-1));
                }
            }

            {// check file cut
                var thongtin = {
                    widPerHei: null,
                    c1: null,
                    c2: null,
                    c3: null,
                    c4: null,
                    c5: null,
                    c6: null,
                    c7: null,
                    c8: null,
                    c9: null,
                    call: null,
                    name: null
                }
                app.open(File(FileDesign + "/" + arr[i][j].sku + ".png"));

                var PSpotKhung = app.activeDocument.activeLayer.bounds;
                app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
                if (arr[i][j].pixel.direction == "2")
                    app.activeDocument.resizeImage(UnitValue(wphone, "px"), UnitValue(hphone, "px"), null, ResampleMethod.BICUBIC);
                else if (arr[i][j].pixel.direction == "1") {
                    if (app.activeDocument.width < app.activeDocument.height) {
                        app.activeDocument.resizeImage(null, UnitValue(hphone, "px"), null, ResampleMethod.BICUBIC);
                    }
                    else {
                        app.activeDocument.resizeImage(UnitValue(wphone, "px"), null, null, ResampleMethod.BICUBIC);
                    }
                }

                {// color overlay black
                    var d = new ActionDescriptor();
                    var r = new ActionReference();
                    r.putProperty(stringIDToTypeID("property"), stringIDToTypeID("layerEffects"));
                    r.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
                    d.putReference(stringIDToTypeID("null"), r);
                    var d1 = new ActionDescriptor();
                    var d2 = new ActionDescriptor();
                    var d3 = new ActionDescriptor();
                    d3.putDouble(stringIDToTypeID("red"), 0);
                    d3.putDouble(stringIDToTypeID("green"), 0);
                    d3.putDouble(stringIDToTypeID("blue"), 0);
                    d2.putObject(stringIDToTypeID("color"), stringIDToTypeID("RGBColor"), d3);
                    d1.putObject(stringIDToTypeID("solidFill"), stringIDToTypeID("solidFill"), d2);
                    d.putObject(stringIDToTypeID("to"), stringIDToTypeID("layerEffects"), d1);
                    executeAction(stringIDToTypeID("set"), d, DialogModes.NO);
                }

                { // lay histogram
                    app.doAction("backgroundWhite", "fx");
                    var wid = app.activeDocument.width.value;
                    var hei = app.activeDocument.height.value;

                    thongtin.widPerHei = Math.round(wid * 500 / hei);
                    app.activeDocument.selection.select([[0, 0], [0, hei / 3], [wid / 3, hei / 3], [wid / 3, 0]]); //1
                    thongtin.c1 = Math.round(100 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));

                    app.activeDocument.selection.select([[wid / 3, 0], [wid / 3, hei / 3], [2 * wid / 3, hei / 3], [2 * wid / 3, 0]]); //2
                    thongtin.c2 = Math.round(100 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));

                    app.activeDocument.selection.select([[2 * wid / 3, 0], [2 * wid / 3, hei / 3], [wid, hei / 3], [wid, 0]]); //3
                    thongtin.c3 = Math.round(100 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));

                    app.activeDocument.selection.select([[0, hei / 3], [0, 2 * hei / 3], [wid / 3, 2 * hei / 3], [wid / 3, hei / 3]]); //4
                    thongtin.c4 = Math.round(100 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));

                    app.activeDocument.selection.select([[wid / 3, hei / 3], [wid / 3, 2 * hei / 3], [2 * wid / 3, 2 * hei / 3], [2 * wid / 3, hei / 3]]); //5
                    thongtin.c5 = Math.round(100 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));

                    app.activeDocument.selection.select([[2 * wid / 3, hei / 3], [2 * wid / 3, 2 * hei / 3], [wid, 2 * hei / 3], [wid, hei / 3]]); //6
                    thongtin.c6 = Math.round(100 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));

                    app.activeDocument.selection.select([[0, 2 * hei / 3], [0, hei], [wid / 3, hei], [wid / 3, 2 * hei / 3]]); //7
                    thongtin.c7 = Math.round(100 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));

                    app.activeDocument.selection.select([[wid / 3, 2 * hei / 3], [wid / 3, hei], [2 * wid / 3, hei], [2 * wid / 3, 2 * hei / 3]]); //8
                    thongtin.c8 = Math.round(100 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));

                    app.activeDocument.selection.select([[2 * wid / 3, 2 * hei / 3], [2 * wid / 3, hei], [wid, hei], [wid, 2 * hei / 3]]); //9
                    thongtin.c9 = Math.round(100 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));

                    app.activeDocument.selection.select([[0, 0], [0, hei], [wid, hei], [wid, 0]]); //9
                    thongtin.call = Math.round(100 * app.activeDocument.histogram[0] / (wid * hei));
                }
                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                var importCut = false;
                for (var m = 0; m < fixImage.length; m++) {
                    var bl = [];


                    if (fixImage[m].widPerHei == thongtin.widPerHei) bl.push(true);
                    if (fixImage[m].c1 == thongtin.c1) bl.push(true);
                    if (fixImage[m].c2 == thongtin.c2) bl.push(true);
                    if (fixImage[m].c3 == thongtin.c3) bl.push(true);
                    if (fixImage[m].c4 == thongtin.c4) bl.push(true);
                    if (fixImage[m].c5 == thongtin.c5) bl.push(true);
                    if (fixImage[m].c6 == thongtin.c6) bl.push(true);
                    if (fixImage[m].c7 == thongtin.c7) bl.push(true);
                    if (fixImage[m].c8 == thongtin.c8) bl.push(true);
                    if (fixImage[m].c9 == thongtin.c9) bl.push(true);
                    if (fixImage[m].call == thongtin.call) bl.push(true);
                    // alert("//192.168.1.99/ps script data/fixImage/" + fixImage[m].name)
                    if ((bl.length >= 9) && (bl[0] == true)) {
                        // alert("//192.168.1.99/ps script data/fixImage/" + fixImage[m].name)
                        try {
                            app.open(File("//192.168.1.99/ps script data/autoCut/fixImage/" + fixImage[m].name));
                            app.activeDocument.activeLayer.name = arr[i][j].stt;
                            app.activeDocument.activeLayer.duplicate(app.documents["GLLM"].layerSets["CUT"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
                            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES)
                            { // translate layer đến vị trí cần in
                                app.activeDocument.activeLayer = app.activeDocument.layerSets["CUT"].artLayers.getByName(arr[i][j].stt);
                                app.doAction("moveZero", "autoUv");
                                app.activeDocument.activeLayer.translate(xPosition, (yPosition) * (-1));
                            }
                            importCut = true;
                        } catch (error) {

                        }

                    }

                }
                if (importCut == false) {
                    app.open(File(FileDesign + "/" + arr[i][j].sku + ".png"));
                    app.activeDocument.activeLayer.name = arr[i][j].stt;
                    app.activeDocument.activeLayer.duplicate(app.documents["GLLM"].layerSets["CUTFIX"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
                    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES)
                    { // translate layer đến vị trí cần in
                        app.activeDocument.activeLayer = app.activeDocument.layerSets["CUTFIX"].artLayers.getByName(arr[i][j].stt);
                        app.doAction("moveZero", "autoUv");
                        app.activeDocument.activeLayer.translate(xPosition, (yPosition) * (-1));
                    }
                }
            } // het check cut


        }
        // {
        //     var folder1 = Folder("//192.168.1.101/in/" + type + "-" + FileName);
        //     if (!folder1.exists) { folder1.create(); }
        //     // app.doAction("rotate 180", "go");

        //     app.doAction("crop document normal", "go");
        //     app.activeDocument.activeLayer = app.activeDocument.artLayers["CMYK copy"];
        //     var PSpotKhung = app.activeDocument.activeLayer.bounds;
        //     app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
        //     app.activeDocument.artLayers["CMYK copy"].remove();
        //     app.activeDocument.resizeCanvas(app.activeDocument.width + 30, app.activeDocument.height + 30, AnchorPosition.MIDDLECENTER);

        //     app.activeDocument.saveAs(Folder(folder1 + "/in " + (i + 1) + ".tif"), TiffSaveOptions, false, Extension.LOWERCASE);
        //     app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        // }
        // { // tạo nhãn
        //     #include "label 1.jsx";
        // }
    } // hết làm file
}

