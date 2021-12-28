function xuLy(arr, wAll, hAll, FileDesign, FileName, type) {
    var yPosition, xPosition, hLast, wLast;
    var stt = 0;

    app.documents.add(wAll, hAll, 300, "GLLM");
    app.activeDocument.layerSets.add();
    app.activeDocument.activeLayer.name = "CMYK";
    // alert(hAll)
    yPosition = 0;
    xPosition = 0;
    hLast = 0;
    wLast = 0;
    var ban = 0;
    var boxW = 0;
    var boxH = 1087;
    var stt = 0;
    for (var i = stt; i <= arr.length - 1; i++) { // loop làm file in\
        try {
            app.open(File(FileDesign + "/" + arr[i].sku + ".png"));

        } catch (error) {
            app.open(File(FileDesign + "/" + arr[i].sku + ".tif"));
            if (app.activeDocument.layers.length > 1)
                app.activeDocument.mergeVisibleLayers(); // gộp all layer 


        }
        app.doAction("300ppi", "go");
        {
            { // crop xóa khoảng trắng
                var PSpotKhung = app.activeDocument.activeLayer.bounds;
                app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
            }
            var hphone = Math.round(arr[i].pixel.h / 0.084667);
            var wphone = Math.round(arr[i].pixel.w / 0.084667);
            // if (arr[i].pixel.direction == "2")
            //     app.activeDocument.resizeImage(UnitValue(wphone, "px"), UnitValue(hphone, "px"), null, ResampleMethod.BICUBIC);
            // else if (arr[i].pixel.direction == "1") {
            //     if (app.activeDocument.width < app.activeDocument.height) {
            //         app.activeDocument.resizeImage(null, UnitValue(hphone, "px"), null, ResampleMethod.BICUBIC);
            //     }
            //     else {
            //         app.activeDocument.resizeImage(UnitValue(wphone, "px"), null, null, ResampleMethod.BICUBIC);
            //     }
            // }
        }
        if (app.activeDocument.width > app.activeDocument.height) app.activeDocument.rotateCanvas(90);
        var PSpotKhung = app.activeDocument.activeLayer.bounds;
        app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
        if ((yPosition + app.activeDocument.height + 18 + hLast > hAll) && (xPosition + app.activeDocument.width + 18 + wLast) > wAll) {
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
            {
                var folder1 = Folder("//192.168.1.101/in/" + type + "-" + FileName);
                if (!folder1.exists) { folder1.create(); }
                // app.doAction("rotate 180", "go");

                // app.doAction("crop document normal", "go");
                // app.activeDocument.activeLayer = app.activeDocument.artLayers["CMYK copy"];
                // var PSpotKhung = app.activeDocument.activeLayer.bounds;
                // app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
                // app.activeDocument.artLayers["CMYK copy"].remove();
                app.activeDocument.resizeCanvas(app.activeDocument.width + 30, app.activeDocument.height + 30, AnchorPosition.MIDDLECENTER);

                app.activeDocument.saveAs(Folder(folder1 + "/in " + (ban + 1) + ".tif"), TiffSaveOptions, false, Extension.LOWERCASE);
                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

            }
            {
                function moveTem(item, type) {

                    // alert(item.case)

                    app.activeDocument.artLayers[3].textItem.contents = item.case + " - " + item.stt // thong tin stt

                    app.activeDocument.artLayers[0].textItem.contents = item.name; // thong tin order
                    const obj = {
                        "00": "!",
                        "01": '"',
                        "02": "#",
                        "03": "$",
                        "04": "%",
                        "05": "&",
                        "06": "'",
                        "07": "(",
                        "08": ")",
                        "09": "*",
                        "10": "+",
                        "11": ",",
                        "12": "-",
                        "13": ".",
                        "14": "/",
                        "15": "0",
                        "16": "1",
                        "17": "2",
                        "18": "3",
                        "19": "4",
                        "20": "5",
                        "21": "6",
                        "22": "7",
                        "23": "8",
                        "24": "9",
                        "25": ":",
                        "26": ";",
                        "27": "<",
                        "28": "=",
                        "29": ">",
                        "30": "?",
                        "31": "@",
                        "32": "A",
                        "33": "B",
                        "34": "C",
                        "35": "D",
                        "36": "E",
                        "37": "F",
                        "38": "G",
                        "39": "H",
                        "40": "I",
                        "41": "J",
                        "42": "K",
                        "43": "L",
                        "44": "M",
                        "45": "N",
                        "46": "O",
                        "47": "P",
                        "48": "Q",
                        "49": "R",
                        "50": "S",
                        "51": "T",
                        "52": "U",
                        "53": "V",
                        "54": "W",
                        "55": "X",
                        "56": "Y",
                        "57": "Z",
                        "58": "[",
                        "59": "\\",
                        "60": "]",
                        "61": "^",
                        "62": "_",
                        "63": "`",
                        "64": "a",
                        "65": "b",
                        "66": "c",
                        "67": "d",
                        "68": "e",
                        "69": "f",
                        "70": "g",
                        "71": "h",
                        "72": "i",
                        "73": "j",
                        "74": "k",
                        "75": "l",
                        "76": "m",
                        "77": "n",
                        "78": "o",
                        "79": "p",
                        "80": "q",
                        "81": "r",
                        "82": "s",
                        "83": "t",
                        "84": "u",
                        "85": "v",
                        "86": "w",
                        "87": "x",
                        "88": "y",
                        "89": "z",
                        "90": "{",
                        "91": "|",
                        "92": "}",
                        "93": "~",
                        "94": String.fromCharCode(197),
                        "95": String.fromCharCode(198),
                        "96": String.fromCharCode(199),
                        "97": String.fromCharCode(200),
                        "98": String.fromCharCode(201),
                        "99": String.fromCharCode(202),
                        "START": "Ë",
                        "STOP": "Ì",


                    };


                    var nameItem = item.barcode.split("");

                    var nameConvert = [];
                    for (var i = 0; i < nameItem.length; i = i + 2) {
                        nameConvert.push(nameItem[i].concat(nameItem[i + 1]));

                    }
                    for (var j = 0; j < nameConvert.length; j++) {
                        nameConvert[j] = obj[nameConvert[j]]

                    }
                    nameConvert = nameConvert.join("");
                    app.activeDocument.artLayers[2].textItem.contents = String.fromCharCode(203) + nameConvert + String.fromCharCode(204); // thong bin barcode
                    if (item.partner !== null)
                        app.activeDocument.artLayers[4].textItem.contents = item.note; // thong tin partner
                    else
                        app.activeDocument.artLayers[4].textItem.contents = "!!!"; // thong tin partner
                    app.activeDocument.artLayers[5].textItem.contents = item.dateItem.substr(8, 2) + "-" + item.dateItem.substr(5, 2) // thong tin date

                    if (item.amount <= 1) { app.activeDocument.artLayers.getByName("amount").textItem.contents = "" }
                    else {
                        app.activeDocument.artLayers.getByName("amount").textItem.contents = item.amount;
                    }




                }
                app.open(File("//192.168.1.99/ps script data/tem.tif"));
                for (var j = stt; j < i; j++) {
                    moveTem(arr[j], type);
                    var folder1 = Folder("//192.168.1.101/in/" + type + "-" + FileName + "/tem");
                    if (!folder1.exists) { folder1.create(); }

                    folder1 = Folder(folder1 + "/b-" + (ban + 1));
                    if (!folder1.exists) { folder1.create(); }
                    app.activeDocument.saveAs(Folder(folder1 + "/" + arr[j].stt + ".jpg"), JPEGSaveOptions, true, Extension.LOWERCASE);
                }
                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
            }

            app.documents.add(wAll, hAll, 300, "GLLM");
            app.activeDocument.layerSets.add();
            app.activeDocument.activeLayer.name = "CMYK";
            yPosition = 0;
            xPosition = 0;
            hLast = 0;
            wLast = 0;
            ban = ban + 1;
            boxW = 0;
            boxH = 1087;
            try {
                app.open(File(FileDesign + "/" + arr[i].sku + ".png"));

            } catch (error) {
                app.open(File(FileDesign + "/" + arr[i].sku + ".tif"));
                if (app.activeDocument.layers.length > 1)
                    app.activeDocument.mergeVisibleLayers(); // gộp all layer 


            }
            stt = i;
            app.doAction("300ppi", "go");
            {
                { // crop xóa khoảng trắng
                    var PSpotKhung = app.activeDocument.activeLayer.bounds;
                    app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
                }
                var hphone = Math.round(arr[i].pixel.h / 0.084667);
                var wphone = Math.round(arr[i].pixel.w / 0.084667);
                // if (arr[i].pixel.direction == "2")
                //     app.activeDocument.resizeImage(UnitValue(wphone, "px"), UnitValue(hphone, "px"), null, ResampleMethod.BICUBIC);
                // else  if (arr[i].pixel.direction == "1"){
                //     if (app.activeDocument.width < app.activeDocument.height) {
                //         app.activeDocument.resizeImage(null, UnitValue(hphone, "px"), null, ResampleMethod.BICUBIC);
                //     }
                //     else {
                //         app.activeDocument.resizeImage(UnitValue(wphone, "px"), null, null, ResampleMethod.BICUBIC);
                //     }
                // }
            }

            if (app.activeDocument.width > app.activeDocument.height) app.activeDocument.rotateCanvas(90);
            var PSpotKhung = app.activeDocument.activeLayer.bounds;
            app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);


        }

        {// tinh boxW va boxH moi
            if (app.activeDocument.width > app.activeDocument.height) boxW = (app.activeDocument.height + 18) // dang lam cai nay
            else boxW = (app.activeDocument.width + 18)

            if (xPosition + wLast + boxW <= wAll) {
                xPosition = xPosition + wLast;
                wLast = boxW;
                if (hLast <= boxH)
                    hLast = boxH;
            }
            else {
                xPosition = 0;
                yPosition = yPosition + hLast;
                wLast = boxW;
                hLast = boxH;
            }


        }
        {
            app.activeDocument.activeLayer.name = arr[i].stt;
            app.activeDocument.activeLayer.duplicate(app.documents["GLLM"].layerSets["CMYK"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
            #include "saveDesign.jsx";
            saveImageTool(arr[i]);
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
            { // translate layer đến vị trí cần in
                app.activeDocument.activeLayer = app.activeDocument.layerSets["CMYK"].artLayers.getByName(arr[i].stt);
                app.doAction("moveZero", "autoUv");
                app.activeDocument.activeLayer.translate(xPosition, (yPosition) * (-1));
                // alert(xPosition)
            }
        }

        if (i == arr.length - 1) {
            // alert("fsfsv")
            var folder1 = Folder("//192.168.1.101/in/" + type + "-" + FileName);
            if (!folder1.exists) { folder1.create(); }
            // app.doAction("crop document normal", "go");
            // app.activeDocument.activeLayer = app.activeDocument.artLayers["CMYK copy"];
            // var PSpotKhung = app.activeDocument.activeLayer.bounds;
            // app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
            // app.activeDocument.artLayers["CMYK copy"].remove();
            app.activeDocument.resizeCanvas(app.activeDocument.width + 30, app.activeDocument.height + 30, AnchorPosition.MIDDLECENTER);
            app.activeDocument.saveAs(Folder(folder1 + "/in " + (ban + 1) + ".tif"), TiffSaveOptions, false, Extension.LOWERCASE);
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

            function moveTem(item, type) {

                // alert(item.case)

                app.activeDocument.artLayers[3].textItem.contents = item.case + " - " + item.stt // thong tin stt

                app.activeDocument.artLayers[0].textItem.contents = item.name; // thong tin order
                const obj = {
                    "00": "!",
                    "01": '"',
                    "02": "#",
                    "03": "$",
                    "04": "%",
                    "05": "&",
                    "06": "'",
                    "07": "(",
                    "08": ")",
                    "09": "*",
                    "10": "+",
                    "11": ",",
                    "12": "-",
                    "13": ".",
                    "14": "/",
                    "15": "0",
                    "16": "1",
                    "17": "2",
                    "18": "3",
                    "19": "4",
                    "20": "5",
                    "21": "6",
                    "22": "7",
                    "23": "8",
                    "24": "9",
                    "25": ":",
                    "26": ";",
                    "27": "<",
                    "28": "=",
                    "29": ">",
                    "30": "?",
                    "31": "@",
                    "32": "A",
                    "33": "B",
                    "34": "C",
                    "35": "D",
                    "36": "E",
                    "37": "F",
                    "38": "G",
                    "39": "H",
                    "40": "I",
                    "41": "J",
                    "42": "K",
                    "43": "L",
                    "44": "M",
                    "45": "N",
                    "46": "O",
                    "47": "P",
                    "48": "Q",
                    "49": "R",
                    "50": "S",
                    "51": "T",
                    "52": "U",
                    "53": "V",
                    "54": "W",
                    "55": "X",
                    "56": "Y",
                    "57": "Z",
                    "58": "[",
                    "59": "\\",
                    "60": "]",
                    "61": "^",
                    "62": "_",
                    "63": "`",
                    "64": "a",
                    "65": "b",
                    "66": "c",
                    "67": "d",
                    "68": "e",
                    "69": "f",
                    "70": "g",
                    "71": "h",
                    "72": "i",
                    "73": "j",
                    "74": "k",
                    "75": "l",
                    "76": "m",
                    "77": "n",
                    "78": "o",
                    "79": "p",
                    "80": "q",
                    "81": "r",
                    "82": "s",
                    "83": "t",
                    "84": "u",
                    "85": "v",
                    "86": "w",
                    "87": "x",
                    "88": "y",
                    "89": "z",
                    "90": "{",
                    "91": "|",
                    "92": "}",
                    "93": "~",
                    "94": String.fromCharCode(197),
                    "95": String.fromCharCode(198),
                    "96": String.fromCharCode(199),
                    "97": String.fromCharCode(200),
                    "98": String.fromCharCode(201),
                    "99": String.fromCharCode(202),
                    "START": "Ë",
                    "STOP": "Ì",


                };


                var nameItem = item.barcode.split("");

                var nameConvert = [];
                for (var i = 0; i < nameItem.length; i = i + 2) {
                    nameConvert.push(nameItem[i].concat(nameItem[i + 1]));

                }
                for (var j = 0; j < nameConvert.length; j++) {
                    nameConvert[j] = obj[nameConvert[j]]

                }
                nameConvert = nameConvert.join("");
                app.activeDocument.artLayers[2].textItem.contents = String.fromCharCode(203) + nameConvert + String.fromCharCode(204); // thong bin barcode
                if (item.partner !== null)
                    app.activeDocument.artLayers[4].textItem.contents = item.note; // thong tin partner
                else
                    app.activeDocument.artLayers[4].textItem.contents = "!!!"; // thong tin partner
                app.activeDocument.artLayers[5].textItem.contents = item.dateItem.substr(8, 2) + "-" + item.dateItem.substr(5, 2) // thong tin date

                if (item.amount <= 1) { app.activeDocument.artLayers.getByName("amount").textItem.contents = "" }
                else {
                    app.activeDocument.artLayers.getByName("amount").textItem.contents = item.amount;
                }




            }
            app.open(File("//192.168.1.99/ps script data/tem.tif"));
            for (var j = stt; j <= i; j++) {
                moveTem(arr[j], type);
                var folder1 = Folder("//192.168.1.101/in/" + type + "-" + FileName + "/tem");
                if (!folder1.exists) { folder1.create(); }

                folder1 = Folder(folder1 + "/b-" + (ban + 1));
                if (!folder1.exists) { folder1.create(); }
                app.activeDocument.saveAs(Folder(folder1 + "/" + arr[j].stt + ".jpg"), JPEGSaveOptions, true, Extension.LOWERCASE);
            }
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

        }

    } // hết làm file
}

