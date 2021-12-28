
function tachdoifile(FileDesign, sku, item) {
    app.open(File(FileDesign + "/" + sku + ".png"));
    var Ngang2 = [
        [2834, 1416],
        [4252, 2126],
        [3605, 1800],
        [3000, 1500],
        [898, 720],
        [2400, 1200],
        [1400, 2400],
        [2301, 1064],
        [2300, 1063],
        [2834, 1417],
        [2702, 1350],
        [2200, 1063],
        [2398, 1200],
        [2197, 1098],
        ["2126", "1063"],
        [2126, 1149],
        [2126, 1066],
        [2126, 1067],
        [2126, 1068],
        [2126, 1069],
        [2126, 1070],
        [2126, 1071],
        [2126, 1072],
        [2126, 1073],
        [2126, 1076],
        [2126, 1074],
        [2126, 1075],
        [2126, 1077],
        [2126, 1078],
        [2126, 1079],
        [2126, 1080],
        [2126, 1081],
        [2126, 1082],
        [2126, 1092],
        [2126, 1083],
        [2126, 1065],
        [2126, 1064],
        [3282, 1417],
        [2254, 1098],
        [1999, 924],
        [2691, 1350],
        [2694, 1350],
        [2695, 1350],
        [2696, 1350],
        [7086, 3543],
        [2102, 1535],
        [2400, 1200],
        [1182, 591],
        [1108, 720],
        [1063, 525],
        [1062, 531],
        [1050, 525],
        [1063, 532],
        [808, 404],
        [686, 602],
        [600, 300],
        [552, 255]
    ]
    var Doc2 = [
        [1063, 2125],
        [1063, 2126],
        [1063, 2150],
        [1121, 2162],
        [1200, 2400],
        [2126, 5315],
        [1053, 2126],
        [1063, 2300],
        [1036, 2126],
        [2000, 4000],
        [1063, 2153],
        [1063, 2131],
        [1063, 2185],
        [1000, 2000],
        [1063, 2175],
        [899, 2084],
        [1200, 1800],
        [1603, 2126],
        [1800, 3200],
        [1063, 2167],
        [1063, 2149],
        [1069, 2126],
        [640, 2110],
        [1001, 1788],
        [1033, 2103],
        [1006, 2105],
        [789, 2050],
        [737, 2076],
        [756, 2002],
        [765, 2002],
        [707, 2119],
        [979, 2054],
        [927, 2004],
        [540, 2035],
        [643, 2089],
        [653, 2105],
        [368, 2060],
        [884, 2065],
        [965, 2049],
        [902, 2084],
        [917, 2084],
        [864, 2031],
        [741, 2060],
        [878, 2058],
        [315, 2030],
        [1063, 2169],
        [512, 1024],
        [388, 947],
        [803, 2056],
        [1019, 1994],
        [914, 2088],
        [868, 2065],
        [1050, 1634],
        [1035, 2026],
        [399, 2110],
        [628, 2098],
        [664, 2091],
        [797, 2079],
        [830, 2105],
        [1055, 2076],
        [853, 2068],
        [610, 2095],
        [855, 2109],
        [591, 1182],
        [765, 2030],
        [255, 510],
        [683, 2003]
    ];

    var Doc3 = [
        [1000, 3000],
        [2250, 6750],
        [278, 1462],
        [278, 1463],
        [426, 1280]
    ];
    var checkNgang2 = false;
    for (var g = 0; g < Ngang2.length; g++) {
        if ((Number(app.activeDocument.width.value) - Number(Ngang2[g][0]) == 0) && (Number(app.activeDocument.height.value) - Number(Ngang2[g][1]) == 0)) checkNgang2 = true;
    }
    var checkDoc2 = false;
    for (var g = 0; g < Doc2.length; g++) {

        if ((Number(app.activeDocument.width.value) - Number(Doc2[g][0]) == 0) && (Number(app.activeDocument.height.value) - Number(Doc2[g][1]) == 0)) checkDoc2 = true;
    }
    // if (checkDoc2 == true) alert("true")
    var checkDoc3 = false;
    for (var g = 0; g < Doc3.length; g++) {
        if ((Number(app.activeDocument.width.value) - Number(Doc3[g][0]) == 0) && (Number(app.activeDocument.height.value) - Number(Doc3[g][1]) == 0)) checkDoc3 = true;
    }
    // |app.activeDocument.width==2834 && app.activeDocument.height==1417 
    // alert("higg")

    if (checkNgang2 == true) {
        

        
    var PSpotKhung = app.activeDocument.activeLayer.bounds;
    app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
        var wd = app.activeDocument.width;
        app.activeDocument.activeLayer.name = "1";
        app.activeDocument.resizeCanvas(wd / 2, app.activeDocument.height, AnchorPosition.BOTTOMLEFT);
        app.activeDocument.saveAs(Folder(FileDesign + "/" + sku + ".png"), PNGSaveOptions);
        app.activeDocument.resizeCanvas(wd, app.activeDocument.height, AnchorPosition.BOTTOMLEFT);
        app.activeDocument.resizeCanvas(wd / 2, app.activeDocument.height, AnchorPosition.BOTTOMRIGHT);
        var name2 = sku;
        name2 = name2.split(" ");
        name2.pop();
        name2.push(" back");
        name2 = name2.join("")
        app.activeDocument.saveAs(Folder(FileDesign + "/" + name2 + ".png"), PNGSaveOptions);

    }
    else if (checkDoc3 == true) {
        var wd = app.activeDocument.height;
        app.activeDocument.activeLayer.name = "1";
        app.activeDocument.resizeCanvas(app.activeDocument.width, 2 * wd / 3, AnchorPosition.BOTTOMLEFT);
        wd = app.activeDocument.height;
        app.activeDocument.resizeCanvas(app.activeDocument.width, wd / 2, AnchorPosition.TOPLEFT);
        app.activeDocument.saveAs(Folder(FileDesign + "/" + sku + ".png"), PNGSaveOptions);
        app.activeDocument.resizeCanvas(app.activeDocument.width, wd, AnchorPosition.TOPLEFT);
        app.activeDocument.resizeCanvas(app.activeDocument.width, wd / 2, AnchorPosition.BOTTOMRIGHT);
        var name2 = sku;
        name2 = name2.split(" ");
        name2.pop();
        name2.push(" back");
        name2 = name2.join("")
        app.activeDocument.saveAs(Folder(FileDesign + "/" + name2 + ".png"), PNGSaveOptions);
    }
    else if (checkDoc2 == true) {
        
    var PSpotKhung = app.activeDocument.activeLayer.bounds;
    app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
        var wd = app.activeDocument.height;
        app.activeDocument.activeLayer.name = "1";
        app.activeDocument.resizeCanvas(app.activeDocument.width, wd / 2, AnchorPosition.TOPLEFT);
        app.activeDocument.saveAs(Folder(FileDesign + "/" + sku + ".png"), PNGSaveOptions);
        app.activeDocument.resizeCanvas(app.activeDocument.width, wd, AnchorPosition.TOPLEFT);
        app.activeDocument.resizeCanvas(app.activeDocument.width, wd / 2, AnchorPosition.BOTTOMRIGHT);
        var name2 = sku;
        name2 = name2.split(" ");
        name2.pop();
        name2.push(" back");
        name2 = name2.join("")
        app.activeDocument.saveAs(Folder(FileDesign + "/" + name2 + ".png"), PNGSaveOptions);
    }
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);


}