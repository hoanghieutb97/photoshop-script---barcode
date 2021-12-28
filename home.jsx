#target photoshop;
app.preferences.rulerUnits = Units.PIXELS; // hệ đo pixel
"object" != typeof JSON && (JSON = {}), function () { "use strict"; var rx_one = /^[\],:{}\s]*$/, rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, rx_four = /(?:^|:|,)(?:\s*\[)+/g, rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta, rep; function f(t) { return t < 10 ? "0" + t : t } function this_value() { return this.valueOf() } function quote(t) { return rx_escapable.lastIndex = 0, rx_escapable.test(t) ? '"' + t.replace(rx_escapable, function (t) { var e = meta[t]; return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + t + '"' } function str(t, e) { var r, n, o, u, f, a = gap, i = e[t]; switch (i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(t)), "function" == typeof rep && (i = rep.call(e, t, i)), typeof i) { case "string": return quote(i); case "number": return isFinite(i) ? String(i) : "null"; case "boolean": case "null": return String(i); case "object": if (!i) return "null"; if (gap += indent, f = [], "[object Array]" === Object.prototype.toString.apply(i)) { for (u = i.length, r = 0; r < u; r += 1)f[r] = str(r, i) || "null"; return o = 0 === f.length ? "[]" : gap ? "[\n" + gap + f.join(",\n" + gap) + "\n" + a + "]" : "[" + f.join(",") + "]", gap = a, o } if (rep && "object" == typeof rep) for (u = rep.length, r = 0; r < u; r += 1)"string" == typeof rep[r] && (o = str(n = rep[r], i)) && f.push(quote(n) + (gap ? ": " : ":") + o); else for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (o = str(n, i)) && f.push(quote(n) + (gap ? ": " : ":") + o); return o = 0 === f.length ? "{}" : gap ? "{\n" + gap + f.join(",\n" + gap) + "\n" + a + "}" : "{" + f.join(",") + "}", gap = a, o } } "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null }, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value), "function" != typeof JSON.stringify && (meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, JSON.stringify = function (t, e, r) { var n; if (gap = "", indent = "", "number" == typeof r) for (n = 0; n < r; n += 1)indent += " "; else "string" == typeof r && (indent = r); if (rep = e, e && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw new Error("JSON.stringify"); return str("", { "": t }) }), "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) { var j; function walk(t, e) { var r, n, o = t[e]; if (o && "object" == typeof o) for (r in o) Object.prototype.hasOwnProperty.call(o, r) && (void 0 !== (n = walk(o, r)) ? o[r] = n : delete o[r]); return reviver.call(t, e, o) } if (text = String(text), rx_dangerous.lastIndex = 0, rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function (t) { return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4) })), rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({ "": j }, "") : j; throw new SyntaxError("JSON.parse") }) }();


var selectFileJson;
{ // thông số dialog
    var visibleDialog = true;
    var dialog = new Window("dialog");
    dialog.text = "auto";
    dialog.preferredSize.width = 300;
    dialog.preferredSize.height = 150;
    dialog.orientation = "column";
    dialog.alignChildren = ["center", "top"];
    dialog.spacing = 10;
    dialog.margins = 16;

    // PANEL1
    // ======
    var panel1 = dialog.add("panel", undefined, undefined, { name: "panel1" });
    panel1.text = "File in";
    panel1.preferredSize.width = 300;
    panel1.orientation = "row";
    panel1.alignChildren = ["center", "fill"];
    panel1.spacing = 10;
    panel1.margins = 10;

    var selectJson = panel1.add("button", undefined, undefined, { name: "selectJson" });
    selectJson.text = "Select file";
    selectJson.justify = "left";

    var statictext1 = panel1.add("statictext", undefined, undefined, { name: "statictext1" });
    statictext1.text = "...";
    statictext1.preferredSize.width = 180;
    statictext1.justify = "center";
    // button
    var radiobutton1 = dialog.add("radiobutton", undefined, undefined, { name: "radiobutton1" });
    radiobutton1.text = "Check 1m";

    // button
    var radiobutton2 = dialog.add("radiobutton", undefined, undefined, { name: "radiobutton2" });
    radiobutton2.text = "Check 2m";
    var radiobutton3 = dialog.add("radiobutton", undefined, undefined, { name: "radiobutton3" });
    radiobutton3.text = "Check cut 2m";
    var radiobutton4 = dialog.add("radiobutton", undefined, undefined, { name: "radiobutton4" });
    radiobutton4.text = "Check cut 1m";
    // GROUP1
    // ======
    var group1 = dialog.add("group", undefined, { name: "group1" });
    group1.orientation = "row";
    group1.alignChildren = ["left", "center"];
    group1.spacing = 10;
    group1.margins = [0, 0, 0, 0];

    var button1 = group1.add("button", undefined, undefined, { name: "button1" });
    button1.text = "Create";

    var button2 = group1.add("button", undefined, undefined, { name: "button2" });
    button2.text = "Cancel";
}
selectJson.onClick = function () {
    selectFileJson = File.openDialog("Please select file .json", "*.json");
    if (selectFileJson != null) {
        statictext1.text = decodeURI(selectFileJson.name);
    }
}
button2.onClick = function () { dialog.hide(); }
button1.onClick = function () {
    dialog.hide();
    // alert(radiobutton1[1]);
    {
        if (statictext1.text !== "...") {
            var file = new File(selectFileJson); file.open("r"); var strFile; strFile = file.read(); file.close();
            // read data from json

            var data = JSON.parse(strFile);
            var type = data.type;
            var arr = data.items;
            var FileName = data.FileName;
            var FileDesign = data.thongso.FileDesign;
            var hAll = Math.round(data.thongso.hAll / 0.084667);
            var wAll = Math.round(data.thongso.wAll / 0.084667);



            // alert(key)
            if (radiobutton3.value == true || radiobutton4.value == true) {
                #include "TN-checkFileError.jsx";
                xuLy(arr, wAll, hAll, FileDesign, FileName, type, radiobutton3.value, radiobutton4.value);
            }
            else if ((radiobutton1.value == false) && (radiobutton2.value == false))
                switch (type) {
                    case "glass":
                #include "PC glass.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;

                    case "luminous":
                    #include "PC luminous.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;

                    case "led":
                    #include "PC led.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;

                    case "silicon":
                    #include "PC silicon.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;

                    case "bovien20":
                    #include "bovien20.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;
                    case "normal":
                    #include "normal.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;
                    case "mirror normal":
                    #include "mirror normal.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;

                    case "keyChain normal":
                    #include "keyChain normal.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;

                    case "keyChain mirror":
                    #include "keyChain mirror.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;

                    case "keyChain Alunium":
                    #include "keyChain Alunium.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;

                    case "tem normal":
                    #include "tem normal.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;

                    case "mug":
                    #include "mug.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;

                    case "candle holder":
                    #include "candle holder.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;
                    case "dock":
                    #include "dock.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;

                    case "mica carOrnament 2m":
                    #include "mica carOrnament 2m.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;
                    case "mica carOrnament 2m testNet":
                    #include "mica carOrnament 2m testNet.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;
                        case "wood carOrnament 2m testNet":
                            #include "wood carOrnament 2m testNet.jsx";
                                xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                                break;
                        
                    case "ornament auto cut 1m":
                        #include "ornament auto cut 1m.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;
                    case "ornament mica auto cut 1m":
                        #include "ornament mica auto cut 1m.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;

                    case "oAL1":
                    #include "oal1.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;

                    case "oal 2m":
                            #include "oal 2m.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;
                        case "dia than 2m":
                            #include "dia than 2m.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;


                        
                    case "wood orrnament 2layer":
                    #include "wood orrnament 2layer.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);

                        break;

                    case "ornament dzt":
                    #include "ornament dzt.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;
                    case "print metal":
                    #include "print metal.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;
                    case "cut metal":
                    #include "cut metal.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;
                    case "custom ornament titanium":
                    #include "custom ornament titanium.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;
                    case "wood orrnament 2m":
                    #include "wood orrnament 2m.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;
                    case "wood cut raw":
                    #include "wood cut raw.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;
                    case "ornament su":
                    #include "ornament su.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;
                        case "ornament su tron":
                            #include "ornament su tron.jsx";
                                xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                                break;

                    case "ornament su 2m":
                    #include "ornament su 2m.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;
                    case "wood cut raw render":
                    #include "wood cut raw render.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;

                    case "testNet":
                        #include "testNet.jsx";
                        xuLy(arr, wAll, hAll, FileDesign, FileName, type);
                        break;

                    default:
                        alert("loi type ! home.jsx");
                        break;


                }
            else {
                #include "checkFileError.jsx";
                xuLy(arr, wAll, hAll, FileDesign, FileName, type, radiobutton1.value, radiobutton2.value);
            }




        }
        else { alert("hay chon file .Json") }
    }


}








dialog.show();









