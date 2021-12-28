

function xuLy(arr, wAll, hAll, FileDesign, FileName, type, button3, button4) {
    // alert("test net")
    var file = new File("//192.168.1.99/ps script data/autoCut/data.json");
    file.open("r");
    var strFile;
    strFile = file.read();
    file.close();
    var jsonArr = JSON.parse(strFile);
    var listadd = [];

    if (button3 == true) {

        for (var i = 0; i <= arr.length - 1; i++) { // loop làm file in
            for (var j = 0; j <= arr[i].length - 1; j++) {
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
                    name: null,
                    amount: 0
                }
                app.open(File(FileDesign + "/" + arr[i][j].sku + " front.png"));

                thongtin.name = arr[i][j].name;
                app.activeDocument.activeLayer.name = 1;
                { // crop xóa khoảng trắng và crop cỡ 9cm
                    var PSpotKhung = app.activeDocument.activeLayer.bounds;
                    app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
                    if (app.activeDocument.width > app.activeDocument.height) app.doAction("300ppi crop W 9cm", "go")
                    else app.doAction("300ppi crop H 9cm", "go")

                }
                // app.activeDocument.save();

                app.doAction("overlay black", "go");


                // app.activeDocument.saveAs(Folder("//192.168.1.99/ps script data/autoCut/fixImage/" + arr[i][j].name), PNGSaveOptions);
                app.doAction("backgroundWhite", "fx");
                var wid = app.activeDocument.width.value;
                var hei = app.activeDocument.height.value;
                // alert(wid.value)

                thongtin.widPerHei = Math.round(wid * 500 / hei);

                app.activeDocument.selection.select([[0, 0], [0, hei / 3], [wid / 3, hei / 3], [wid / 3, 0]]); //1
                thongtin.c1 = Math.round(88 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));

                app.activeDocument.selection.select([[wid / 3, 0], [wid / 3, hei / 3], [2 * wid / 3, hei / 3], [2 * wid / 3, 0]]); //2
                thongtin.c2 = Math.round(88 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));

                app.activeDocument.selection.select([[2 * wid / 3, 0], [2 * wid / 3, hei / 3], [wid, hei / 3], [wid, 0]]); //3
                thongtin.c3 = Math.round(88 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));

                app.activeDocument.selection.select([[0, hei / 3], [0, 2 * hei / 3], [wid / 3, 2 * hei / 3], [wid / 3, hei / 3]]); //4
                thongtin.c4 = Math.round(88 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));

                app.activeDocument.selection.select([[wid / 3, hei / 3], [wid / 3, 2 * hei / 3], [2 * wid / 3, 2 * hei / 3], [2 * wid / 3, hei / 3]]); //5
                thongtin.c5 = Math.round(88 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));

                app.activeDocument.selection.select([[2 * wid / 3, hei / 3], [2 * wid / 3, 2 * hei / 3], [wid, 2 * hei / 3], [wid, hei / 3]]); //6
                thongtin.c6 = Math.round(88 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));

                app.activeDocument.selection.select([[0, 2 * hei / 3], [0, hei], [wid / 3, hei], [wid / 3, 2 * hei / 3]]); //7
                thongtin.c7 = Math.round(88 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));

                app.activeDocument.selection.select([[wid / 3, 2 * hei / 3], [wid / 3, hei], [2 * wid / 3, hei], [2 * wid / 3, 2 * hei / 3]]); //8
                thongtin.c8 = Math.round(88 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));

                app.activeDocument.selection.select([[2 * wid / 3, 2 * hei / 3], [2 * wid / 3, hei], [wid, hei], [wid, 2 * hei / 3]]); //9
                thongtin.c9 = Math.round(88 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));

                app.activeDocument.selection.select([[0, 0], [0, hei], [wid, hei], [wid, 0]]); //9
                thongtin.call = Math.round(88 * app.activeDocument.histogram[0] / (wid * hei));
                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES)
                // thong tin chua histogram anh arr[i][j]
                var check1 = [false];
                var check2 = [false];
                var status1 = false;

                for (var k = 0; k < jsonArr.length; k++) {


                    if (jsonArr[k].widPerHei == thongtin.widPerHei) check1[0] = (true);
                    if (jsonArr[k].c1 == thongtin.c1) check1.push(true);
                    if (jsonArr[k].c2 == thongtin.c2) check1.push(true);
                    if (jsonArr[k].c3 == thongtin.c3) check1.push(true);
                    if (jsonArr[k].c4 == thongtin.c4) check1.push(true);
                    if (jsonArr[k].c5 == thongtin.c5) check1.push(true);
                    if (jsonArr[k].c6 == thongtin.c6) check1.push(true);
                    if (jsonArr[k].c7 == thongtin.c7) check1.push(true);
                    if (jsonArr[k].c8 == thongtin.c8) check1.push(true);
                    if (jsonArr[k].c9 == thongtin.c9) check1.push(true);
                    if (jsonArr[k].call == thongtin.call) check1.push(true);

                    if ((check1.length >= 9) && (check1[0] == true)) {
                        jsonArr[k].amount = jsonArr[k].amount + 1;
                        status1 = true;
                        break;
                    }
                    check1 = [false]

                }
                //   alert("hh")
                if (status1 == false) {
                    if (listadd.length == 0) {
                        thongtin.amount = 1;
                        listadd.push(thongtin);
                    }
                    else {
                        var status2 = false;
                        for (var l = 0; l < listadd.length; l++) {
                            if (listadd[l].widPerHei == thongtin.widPerHei) check2[0] = (true);
                            if (listadd[l].c1 == thongtin.c1) check2.push(true);
                            if (listadd[l].c2 == thongtin.c2) check2.push(true);
                            if (listadd[l].c3 == thongtin.c3) check2.push(true);
                            if (listadd[l].c4 == thongtin.c4) check2.push(true);
                            if (listadd[l].c5 == thongtin.c5) check2.push(true);
                            if (listadd[l].c6 == thongtin.c6) check2.push(true);
                            if (listadd[l].c7 == thongtin.c7) check2.push(true);
                            if (listadd[l].c8 == thongtin.c8) check2.push(true);
                            if (listadd[l].c9 == thongtin.c9) check2.push(true);
                            if (listadd[l].call == thongtin.call) check2.push(true);
                            if ((check2.length >= 9) && (check2[0] == true)) {

                                listadd[l].amount = listadd[l].amount + 1;
                                status2 = true;

                                if (listadd[l].amount == 2) { // luu file cut
                                    app.open(File(FileDesign + "/" + arr[i][j].sku + " front.png"));

                                    listadd[l].name = Date.parse(new Date());
                                    { // crop xóa khoảng trắng và crop cỡ 9cm
                                        app.activeDocument.activeLayer.name = 1;
                                        var PSpotKhung = app.activeDocument.activeLayer.bounds;
                                        app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);

                                        if (app.activeDocument.width > app.activeDocument.height) app.doAction("300ppi crop W 9cm", "go")
                                        else app.doAction("300ppi crop H 9cm", "go")

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
                                        d3.putDouble(stringIDToTypeID("red"), 255);
                                        d3.putDouble(stringIDToTypeID("green"), 0);
                                        d3.putDouble(stringIDToTypeID("blue"), 0);
                                        d2.putObject(stringIDToTypeID("color"), stringIDToTypeID("RGBColor"), d3);
                                        d1.putObject(stringIDToTypeID("solidFill"), stringIDToTypeID("solidFill"), d2);
                                        d.putObject(stringIDToTypeID("to"), stringIDToTypeID("layerEffects"), d1);
                                        executeAction(stringIDToTypeID("set"), d, DialogModes.NO);

                                    }

                                    app.activeDocument.saveAs(Folder("//192.168.1.99/ps script data/autoCut/fixImage/" + listadd[l].name + ".png"), PNGSaveOptions);
                                    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);


                                    jsonArr.push(listadd[l]);
                                    // alert(jsonArr.length)

                                    var saveFile = File("//192.168.1.99/ps script data/autoCut/data.json")
                                    if (saveFile.exists)
                                        saveFile.remove();
                                    saveFile.encoding = "UTF8";
                                    saveFile.open("e", "TEXT", "????");

                                    saveFile.writeln(JSON.stringify(jsonArr));
                                    saveFile.close();



                                }
                                break;
                            }
                            check2 = [false]
                        }
                        if (status2 == false) {
                            thongtin.amount = 1;
                            listadd.push(thongtin);
                        }
                        status2 = false;



                    }
                }
                // if (dup - xdup > 1) alert(arr[i][j].stt)

            }
        } // hết làm file

    }
    else if (button4 == true) {
        for (var i = 0; i <= arr.length - 1; i++) { // loop làm file in
            for (var j = 0; j <= arr[i].length - 1; j++) {
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
                    name: null,
                    amount: 0
                }
                app.open(File(FileDesign + "/" + arr[i][j].sku + ".png"));

                thongtin.name = arr[i][j].name;
                app.activeDocument.activeLayer.name = 1;
                { // crop xóa khoảng trắng và crop cỡ 9cm
                    var PSpotKhung = app.activeDocument.activeLayer.bounds;
                    app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
                    if (app.activeDocument.width > app.activeDocument.height) app.doAction("300ppi crop W 9cm", "go")
                    else app.doAction("300ppi crop H 9cm", "go")

                }
            
                app.doAction("overlay black", "go");
                app.doAction("backgroundWhite", "fx");
                var wid = app.activeDocument.width.value;
                var hei = app.activeDocument.height.value;
                thongtin.widPerHei = Math.round(wid * 500 / hei);
                app.activeDocument.selection.select([[0, 0], [0, hei / 3], [wid / 3, hei / 3], [wid / 3, 0]]); //1
                thongtin.c1 = Math.round(88 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));
                app.activeDocument.selection.select([[wid / 3, 0], [wid / 3, hei / 3], [2 * wid / 3, hei / 3], [2 * wid / 3, 0]]); //2
                thongtin.c2 = Math.round(88 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));
                app.activeDocument.selection.select([[2 * wid / 3, 0], [2 * wid / 3, hei / 3], [wid, hei / 3], [wid, 0]]); //3
                thongtin.c3 = Math.round(88 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));
                app.activeDocument.selection.select([[0, hei / 3], [0, 2 * hei / 3], [wid / 3, 2 * hei / 3], [wid / 3, hei / 3]]); //4
                thongtin.c4 = Math.round(88 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));
                app.activeDocument.selection.select([[wid / 3, hei / 3], [wid / 3, 2 * hei / 3], [2 * wid / 3, 2 * hei / 3], [2 * wid / 3, hei / 3]]); //5
                thongtin.c5 = Math.round(88 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));
                app.activeDocument.selection.select([[2 * wid / 3, hei / 3], [2 * wid / 3, 2 * hei / 3], [wid, 2 * hei / 3], [wid, hei / 3]]); //6
                thongtin.c6 = Math.round(88 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));
                app.activeDocument.selection.select([[0, 2 * hei / 3], [0, hei], [wid / 3, hei], [wid / 3, 2 * hei / 3]]); //7
                thongtin.c7 = Math.round(88 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));
                app.activeDocument.selection.select([[wid / 3, 2 * hei / 3], [wid / 3, hei], [2 * wid / 3, hei], [2 * wid / 3, 2 * hei / 3]]); //8
                thongtin.c8 = Math.round(88 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));
                app.activeDocument.selection.select([[2 * wid / 3, 2 * hei / 3], [2 * wid / 3, hei], [wid, hei], [wid, 2 * hei / 3]]); //9
                thongtin.c9 = Math.round(88 * app.activeDocument.histogram[0] / ((wid / 3) * (hei / 3)));
                app.activeDocument.selection.select([[0, 0], [0, hei], [wid, hei], [wid, 0]]); //9
                thongtin.call = Math.round(88 * app.activeDocument.histogram[0] / (wid * hei));
                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES)
                // thong tin chua histogram anh arr[i][j]
                var check1 = [false];
                var check2 = [false];
                var status1 = false;

                for (var k = 0; k < jsonArr.length; k++) {


                    if (jsonArr[k].widPerHei == thongtin.widPerHei) check1[0] = (true);
                    if (jsonArr[k].c1 == thongtin.c1) check1.push(true);
                    if (jsonArr[k].c2 == thongtin.c2) check1.push(true);
                    if (jsonArr[k].c3 == thongtin.c3) check1.push(true);
                    if (jsonArr[k].c4 == thongtin.c4) check1.push(true);
                    if (jsonArr[k].c5 == thongtin.c5) check1.push(true);
                    if (jsonArr[k].c6 == thongtin.c6) check1.push(true);
                    if (jsonArr[k].c7 == thongtin.c7) check1.push(true);
                    if (jsonArr[k].c8 == thongtin.c8) check1.push(true);
                    if (jsonArr[k].c9 == thongtin.c9) check1.push(true);
                    if (jsonArr[k].call == thongtin.call) check1.push(true);

                    if ((check1.length >= 9) && (check1[0] == true)) {
                        jsonArr[k].amount = jsonArr[k].amount + 1;
                        status1 = true;
                        break;
                    }
                    check1 = [false]

                }
                //   alert("hh")
                if (status1 == false) {
                    if (listadd.length == 0) {
                        thongtin.amount = 1;
                        listadd.push(thongtin);
                    }
                    else {
                        var status2 = false;
                        for (var l = 0; l < listadd.length; l++) {
                            if (listadd[l].widPerHei == thongtin.widPerHei) check2[0] = (true);
                            if (listadd[l].c1 == thongtin.c1) check2.push(true);
                            if (listadd[l].c2 == thongtin.c2) check2.push(true);
                            if (listadd[l].c3 == thongtin.c3) check2.push(true);
                            if (listadd[l].c4 == thongtin.c4) check2.push(true);
                            if (listadd[l].c5 == thongtin.c5) check2.push(true);
                            if (listadd[l].c6 == thongtin.c6) check2.push(true);
                            if (listadd[l].c7 == thongtin.c7) check2.push(true);
                            if (listadd[l].c8 == thongtin.c8) check2.push(true);
                            if (listadd[l].c9 == thongtin.c9) check2.push(true);
                            if (listadd[l].call == thongtin.call) check2.push(true);
                            if ((check2.length >= 9) && (check2[0] == true)) {

                                listadd[l].amount = listadd[l].amount + 1;
                                status2 = true;

                                if (listadd[l].amount == 2) { // luu file cut
                                    app.open(File(FileDesign + "/" + arr[i][j].sku + ".png"));

                                    listadd[l].name = Date.parse(new Date());
                                    { // crop xóa khoảng trắng và crop cỡ 9cm
                                        app.activeDocument.activeLayer.name = 1;
                                        var PSpotKhung = app.activeDocument.activeLayer.bounds;
                                        app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);

                                        if (app.activeDocument.width > app.activeDocument.height) app.doAction("300ppi crop W 9cm", "go")
                                        else app.doAction("300ppi crop H 9cm", "go")

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
                                        d3.putDouble(stringIDToTypeID("red"), 255);
                                        d3.putDouble(stringIDToTypeID("green"), 0);
                                        d3.putDouble(stringIDToTypeID("blue"), 0);
                                        d2.putObject(stringIDToTypeID("color"), stringIDToTypeID("RGBColor"), d3);
                                        d1.putObject(stringIDToTypeID("solidFill"), stringIDToTypeID("solidFill"), d2);
                                        d.putObject(stringIDToTypeID("to"), stringIDToTypeID("layerEffects"), d1);
                                        executeAction(stringIDToTypeID("set"), d, DialogModes.NO);

                                    }

                                    app.activeDocument.saveAs(Folder("//192.168.1.99/ps script data/autoCut/fixImage/" + listadd[l].name + ".png"), PNGSaveOptions);
                                    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);


                                    jsonArr.push(listadd[l]);
                                    // alert(jsonArr.length)

                                    var saveFile = File("//192.168.1.99/ps script data/autoCut/data.json")
                                    if (saveFile.exists)
                                        saveFile.remove();
                                    saveFile.encoding = "UTF8";
                                    saveFile.open("e", "TEXT", "????");

                                    saveFile.writeln(JSON.stringify(jsonArr));
                                    saveFile.close();
                                }
                                break;
                            }
                            check2 = [false]
                        }
                        if (status2 == false) {
                            thongtin.amount = 1;
                            listadd.push(thongtin);
                        }
                        status2 = false;
                    }
                }

            }
        } // hết làm file
    }

}
