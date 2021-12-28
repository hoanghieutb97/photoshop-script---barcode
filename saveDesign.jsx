var linkFolder = "~/Desktop/img barcode/";
// var linkServerCheckFile = "//192.168.1.188/Production/";
var linkServerCheckFile = "//192.168.1.101/img barcode/";
// var jpgOptions = new JPEGSaveOptions;
// jpgOptions.quality = 7;
// jpgOptions.scan = 3;

var sfwOptions = new ExportOptionsSaveForWeb();   
sfwOptions.format = SaveDocumentType.JPEG;   
sfwOptions.includeProfile = false;   
sfwOptions.interlaced = false;   
sfwOptions.optimized = true;   
sfwOptions.quality = 90;
//  tk: tecmint
// mk: 1Q2w3e4r5t@#
function saveImageTool(item, value, crop) {
    var dateitem = [];
    if (item.dateItem != undefined) {
        if (item.dateItem.split("-").length > 1) {
            dateitem = item.dateItem;
            dateitem = dateitem.split("-");
        }
        else {
            var dkm = ("0" + item.dateItem).split("/");
            dateitem[0] = "2021";
            dateitem[1] = dkm[0];
        }
    }

    if (crop != "noneCrop") {
        { // crop xóa khoảng trắng
            var PSpotKhung = app.activeDocument.activeLayer.bounds;
            app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
        }
        if (app.activeDocument.width < app.activeDocument.height) {
            app.activeDocument.resizeImage(null, UnitValue(400, "px"), null, ResampleMethod.BICUBIC);
        }
        else {
            app.activeDocument.resizeImage(UnitValue(400, "px"), null, null, ResampleMethod.BICUBIC);
        }
    }

    try {
        if (value == "front") {
            activeDocument.exportDocument( Folder(linkServerCheckFile + dateitem[0] + "/" + dateitem[1] + "/" + item.barcode + "-A.jpg"), ExportType.SAVEFORWEB, sfwOptions ); 
            // app.activeDocument.saveAs(Folder(linkServerCheckFile + dateitem[0] + "/" + dateitem[1] + "/" + item.barcode + "-A.jpg"), jpgOptions, true);
        }
        else if (value == "back") {
            // app.activeDocument.saveAs(Folder(linkServerCheckFile + dateitem[0] + "/" + dateitem[1] + "/" + item.barcode + "-B.jpg"), jpgOptions, true);
            activeDocument.exportDocument( Folder(linkServerCheckFile + dateitem[0] + "/" + dateitem[1] + "/" + item.barcode + "-B.jpg"), ExportType.SAVEFORWEB, sfwOptions ); 

        }
        else
            activeDocument.exportDocument( Folder(linkServerCheckFile + dateitem[0] + "/" + dateitem[1] + "/" + item.barcode + ".jpg"), ExportType.SAVEFORWEB, sfwOptions ); 
            // app.activeDocument.saveAs(Folder(linkServerCheckFile + dateitem[0] + "/" + dateitem[1] + "/" + item.barcode + ".jpg"), jpgOptions, true);

    } catch (error) {

        alert("loi //192.168.1.188/Production/");

    }

}