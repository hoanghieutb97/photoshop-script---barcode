
function xuLy(arr, wAll, hAll, FileDesign, FileName, type, Om, Tm) {
    if (Om == true) {
        var danhsach = [];
        for (var i = 0; i <= arr.length - 1; i++) { // loop làm file in
            for (var j = 0; j <= arr[i].length - 1; j++) {
                try {
                    app.open(File(FileDesign + "/" + arr[i][j].sku + ".png"));
                    app.activeDocument.close();
                } catch (error) {
                    try {
                        app.open(File(FileDesign + "/" + arr[i][j].sku + ".jpg"));
                        app.activeDocument.close();
                    } catch (error) {
                        danhsach.push(arr[i][j].stt + ", ")
                    }
                    // danhsach.push(arr[i][j].stt + ", ")
                }
            }
        } // hết làm file
        if (danhsach.length != 0) alert(danhsach.join())

    }
    else {
        // alert("CHECK 2M");
        var danhsach = [];
        for (var i = 0; i <= arr.length - 1; i++) { // loop làm file in
            for (var j = 0; j <= arr[i].length - 1; j++) {
                try {
                    // openFileAndResize(FileDesign, arr[i][j].sku + " front", arr[i][j]);
                    #include "tachdoifile.jsx";
                    tachdoifile(FileDesign, arr[i][j].sku + " front", arr[i][j]);
                    // app.activeDocument.close();
                } catch (error) {
                    danhsach.push(arr[i][j].stt + ", ")


                }

            }
        } // hết làm file
        if (danhsach.length != 0) alert(danhsach.join())
    }
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function openFileAndResize(FileDesign, sku, item) {






}