
function moveTem(item, type) {

    // alert(item.case)

    app.activeDocument.artLayers[3].textItem.contents = item.case + " - " + item.stt

    app.activeDocument.artLayers[0].textItem.contents = item.name;
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
    // nameConvert.push("Ë");
    // nameConvert.unshift("Ì");
    nameConvert = nameConvert.join("");
    app.activeDocument.artLayers[2].textItem.contents = String.fromCharCode(203) + nameConvert + String.fromCharCode(204);
    app.activeDocument.activeLayer = app.activeDocument.artLayers.getByName("barcode");




    if (item.amount <= 1) { app.activeDocument.artLayers.getByName("amount").textItem.contents = "" }
    else {
        app.activeDocument.artLayers.getByName("amount").textItem.contents = item.amount;
    }


}
app.open(File("//192.168.1.99/ps script data/tem.tif"));
for (var ban = 0; ban <= typePosition[arr].length - 1; ban++) { // loop  1 bàn
    for (var i = 0; i <= typePosition[arr][ban].length - 1; i++) { // loop 1 hàng
        for (var j = 0; j <= typePosition[arr][ban][i].length - 1; j++) { // lop 1 cái
            moveTem(typePosition[arr][ban][i][j], type);
            var folder2 = Folder(folder1 + "/tem");
            if (!folder2.exists) { folder2.create(); }
            app.activeDocument.saveAs(Folder(folder2+"/"+ typePosition[arr][ban][i][j].stt + ".jpg"), JPEGSaveOptions, true, Extension.LOWERCASE);
        }

    }
}
app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);