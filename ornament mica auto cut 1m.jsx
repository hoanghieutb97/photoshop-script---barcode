

function xuLy(arr, wAll, hAll, FileDesign, FileName, type) {


    var file = new File("//192.168.1.99/ps script data/autoCut/data.json"); // lay data
    file.open("r");
    var strFile;
    strFile = file.read();
    file.close();
    var jsonArr = JSON.parse(strFile); //het data

    var yPosition, xPosition, hLast, wLast;
    var stt = 0;
    var arrcut = [];


 
    var wallcut = 14055;
    var hallcut = 9331;

   

    app.documents.add(wallcut, hallcut, 300, "GLLM");
    app.activeDocument.layerSets.add();
    app.activeDocument.activeLayer.name = "CMYK";
    app.activeDocument.layerSets.add();
    app.activeDocument.activeLayer.name = "SPOT";


    // alert(hAll)
    var yPosition = 0;
    var xPosition = 0;
    var hLast = 0;
    var wLast = 0;
    var ban = 0;
    var boxW = 0;
    var boxH = 1100;
    var stt = 0;
    var folderall = Folder("//192.168.1.101/in/" + type + "-" + FileName);
    if (!folderall.exists) { folderall.create(); }
    for (var i = 0; i < arr.length; i++) { // tao arr cut
        for (var j = 0; j <= arr[i].length - 1; j++) {
            arrcut.push(arr[i][j]);
        }
    }
    for (var i = stt; i <= arrcut.length - 1; i++) { // loop làm file in
        // var hphone = Math.round(arrcut[i].pixel.h / 0.084667);
        // var wphone = Math.round(arrcut[i].pixel.w / 0.084667);
        checkHistgram(arrcut[i], FileDesign, jsonArr);

        if (app.activeDocument.width > app.activeDocument.height) app.activeDocument.rotateCanvas(90);


        // qua ban in thi tao ban moi
        if ((yPosition + app.activeDocument.height + 30 + hLast > hallcut) && (xPosition + app.activeDocument.width + 30 + wLast) > wallcut) {
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
            {
                var folder1 = Folder("//192.168.1.101/in/" + type + "-" + FileName + "/ban cut");
                if (!folder1.exists) { folder1.create(); }
                // app.doAction("rotate 180", "go");

                app.doAction("crop document normal", "go");
                app.activeDocument.activeLayer = app.activeDocument.artLayers["CMYK copy"];
                var PSpotKhung = app.activeDocument.activeLayer.bounds;
                app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
                app.activeDocument.artLayers["CMYK copy"].remove();
                app.activeDocument.resizeCanvas(app.activeDocument.width + 30, app.activeDocument.height + 30, AnchorPosition.MIDDLECENTER);
                app.activeDocument.saveAs(Folder(folder1 + "/cut " + (ban + 1) + ".tif"), TiffSaveOptions, false, Extension.LOWERCASE);
                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
            }
            {
                app.open(File("//192.168.1.99/ps script data/tem.tif"));
                for (var j = stt; j < i; j++) {
                    moveTem(arrcut[j], type);
                    var folder1 = Folder("//192.168.1.101/in/" + type + "-" + FileName + "/tem");
                    if (!folder1.exists) { folder1.create(); }

                    folder1 = Folder(folder1 + "/b-" + (ban + 1));
                    if (!folder1.exists) { folder1.create(); }
                    app.activeDocument.saveAs(Folder(folder1 + "/" + arrcut[j].stt + ".jpg"), JPEGSaveOptions, true, Extension.LOWERCASE);
                }
                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
            }


            app.documents.add(wallcut, hallcut, 300, "GLLM");
            app.activeDocument.layerSets.add();
            app.activeDocument.activeLayer.name = "CMYK";
            app.activeDocument.layerSets.add();
            app.activeDocument.activeLayer.name = "SPOT";

            yPosition = 0;
            xPosition = 0;
            hLast = 0;
            wLast = 0;
            ban = ban + 1;
            boxW = 0;
            boxH = 1100;

            checkHistgram(arrcut[i], FileDesign, jsonArr);
            if (app.activeDocument.width > app.activeDocument.height) app.activeDocument.rotateCanvas(90);
            stt = i;
        }
        // qua ban in thi tao ban moi


        {// tinh boxW va boxH moi
            if (app.activeDocument.width > app.activeDocument.height) boxW = (app.activeDocument.height + 30) // dang lam cai nay
            else boxW = (app.activeDocument.width + 30)
            if (xPosition + wLast + boxW <= wallcut) {
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
            app.activeDocument.activeLayer.name = arrcut[i].stt;
            app.activeDocument.activeLayer.duplicate(app.documents["GLLM"].layerSets["CMYK"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in

            // #include "saveDesign.jsx";
            // saveImageTool(arrcut[i]);
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
            { // translate layer đến vị trí cần in
                app.activeDocument.activeLayer = app.activeDocument.layerSets["CMYK"].artLayers.getByName(arrcut[i].stt);
                app.doAction("moveZero", "autoUv");
                app.activeDocument.activeLayer.translate(xPosition, (yPosition) * (-1));
            }
            {

                { // crop xóa khoảng trắng và crop cỡ 9cm
                    app.open(File(FileDesign + "/" + arrcut[i].sku + ".png"));
                    var PSpotKhung = app.activeDocument.activeLayer.bounds;
                    app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
                    if (app.activeDocument.width > app.activeDocument.height) app.doAction("300ppi crop W 9cm", "go")
                    else app.doAction("300ppi crop H 9cm", "go");
                    if (app.activeDocument.width > app.activeDocument.height) app.activeDocument.rotateCanvas(90);
                    app.activeDocument.activeLayer.name = arrcut[i].stt;
                    app.doAction("canvasHoriz", "go");
                    app.activeDocument.activeLayer.duplicate(app.documents["GLLM"].layerSets["SPOT"], ElementPlacement.PLACEATBEGINNING);

                    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                    {
                        app.open(File(FileDesign + "/" + arrcut[i].sku + ".png"));
                    #include "saveDesign.jsx";
                        saveImageTool(arrcut[i]);
                        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                    }
                    app.activeDocument.activeLayer = app.activeDocument.layerSets["SPOT"].artLayers.getByName(arrcut[i].stt);
                    app.doAction("moveZero", "autoUv");
                    app.activeDocument.activeLayer.translate(xPosition, (yPosition) * (-1));
                }


            }
        }
        if (i == arrcut.length - 1) {
            // alert("fsfsv")
            var folder1 = Folder("//192.168.1.101/in/" + type + "-" + FileName + "/ban cut");
            if (!folder1.exists) { folder1.create(); }
            app.doAction("crop document normal", "go");
            app.activeDocument.activeLayer = app.activeDocument.artLayers["CMYK copy"];
            var PSpotKhung = app.activeDocument.activeLayer.bounds;
            app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
            app.activeDocument.artLayers["CMYK copy"].remove();
            app.activeDocument.resizeCanvas(app.activeDocument.width + 30, app.activeDocument.height + 30, AnchorPosition.MIDDLECENTER);
            app.activeDocument.saveAs(Folder(folder1 + "/cut " + (ban + 1) + ".tif"), TiffSaveOptions, false, Extension.LOWERCASE);
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
            {
                app.open(File("//192.168.1.99/ps script data/tem.tif"));
                for (var j = stt; j <= i; j++) {
                    moveTem(arrcut[j], type);
                    var folder1 = Folder("//192.168.1.101/in/" + type + "-" + FileName + "/tem");
                    if (!folder1.exists) { folder1.create(); }

                    folder1 = Folder(folder1 + "/b-" + (ban + 1));
                    if (!folder1.exists) { folder1.create(); }
                    app.activeDocument.saveAs(Folder(folder1 + "/" + arrcut[j].stt + ".jpg"), JPEGSaveOptions, true, Extension.LOWERCASE);
                }
                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
            }

        }

    } // hết làm cut




}


function checkHistgram(item, FileDesign, jsonArr) {
    // alert("hdz")
    { // mo file cut neu co
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


        app.open(File(FileDesign + "/" + item.sku + ".png"));

        { // crop xóa khoảng trắng và crop cỡ 9cm
            var PSpotKhung = app.activeDocument.activeLayer.bounds;
            app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
            if (app.activeDocument.width > app.activeDocument.height) app.doAction("300ppi crop W 9cm", "go")
            else app.doAction("300ppi crop H 9cm", "go")

        }
        {// color overlay black

            app.doAction("overlay black", "go");
        }
        // alert("cxc")
        { // lay histogram
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
            app.activeDocument.selection.select([[0, 0], [0, hei], [wid, hei], [wid, 0]]); //10
            thongtin.call = Math.round(88 * app.activeDocument.histogram[0] / (wid * hei));
        }

        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        var importCut = false;
        for (var m = 0; m < jsonArr.length; m++) {
            var bl = [false];
            if (jsonArr[m].widPerHei == thongtin.widPerHei) bl[0] = true;
            if (jsonArr[m].c1 == thongtin.c1) bl.push(true);
            if (jsonArr[m].c2 == thongtin.c2) bl.push(true);
            if (jsonArr[m].c3 == thongtin.c3) bl.push(true);
            if (jsonArr[m].c4 == thongtin.c4) bl.push(true);
            if (jsonArr[m].c5 == thongtin.c5) bl.push(true);
            if (jsonArr[m].c6 == thongtin.c6) bl.push(true);
            if (jsonArr[m].c7 == thongtin.c7) bl.push(true);
            if (jsonArr[m].c8 == thongtin.c8) bl.push(true);
            if (jsonArr[m].c9 == thongtin.c9) bl.push(true);
            if (jsonArr[m].call == thongtin.call) bl.push(true);
            // if (i == 5) alert(bl.length)
            if ((bl.length >= 9) && (bl[0] == true)) {
                // alert("//192.168.1.99/ps script data/autoCut/fixImage/" + jsonArr[m].name + ".png")
                try {
                    app.open(File("//192.168.1.99/ps script data/autoCut/fixImage/" + jsonArr[m].name + ".png"));
                    importCut = true;
                    var PSpotKhung = app.activeDocument.activeLayer.bounds;
                    app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
                    app.doAction("canvasHoriz", "go");
                    break;
                } catch (error) {

                }

            }


        }
        // alert("hdz")
        if (importCut == false) {
            app.open(File(FileDesign + "/" + item.sku + ".png"));
            { // crop xóa khoảng trắng và crop cỡ 9cm
                var PSpotKhung = app.activeDocument.activeLayer.bounds;
                app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
                if (app.activeDocument.width > app.activeDocument.height) app.doAction("300ppi crop W 9cm", "go")
                else app.doAction("300ppi crop H 9cm", "go")
                app.doAction("canvasHoriz", "go");
            }
        }
    }

}
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
        app.activeDocument.artLayers[4].textItem.contents = item.partner; // thong tin partner
    else
        app.activeDocument.artLayers[4].textItem.contents = "!!!"; // thong tin partner
    app.activeDocument.artLayers[5].textItem.contents = item.dateItem.substr(8, 2) + "-" + item.dateItem.substr(5, 2) // thong tin date

    if (item.amount <= 1) { app.activeDocument.artLayers.getByName("amount").textItem.contents = "" }
    else {
        app.activeDocument.artLayers.getByName("amount").textItem.contents = item.amount;
    }




}