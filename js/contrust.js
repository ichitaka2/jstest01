// color code
let rgbArr1 = convert_colorcode_to_rgb('#2660a1');
let rgbArr2 = convert_colorcode_to_rgb('#ffffff');

// 相対輝度
let luminance1 = getRelativeLuminance(rgbArr1);
let luminance2 = getRelativeLuminance(rgbArr2);

// コントラスト比
let contrast = getContrast(luminance1, luminance2);

// output: 2.849027755287037
console.log(contrast);

// ==================
// ===== 関　数 =====
// ==================

// sRGBを返す
function getSRGB(_8bitColor) {
    return _8bitColor / 255;
}

// 相対輝度計算に使うためのRGBを返す
function getRGBForCalculateLuminance(rgb) {
    if (rgb <= 0.03928){
        return rgb / 12.92;
    } else {
        return Math.pow(((rgb + 0.055) / 1.055), 2.4);
    }
}

// 相対輝度を返す
function getRelativeLuminance(rgbArr) {
    var R = getRGBForCalculateLuminance(getSRGB(rgbArr[0]));
    var G = getRGBForCalculateLuminance(getSRGB(rgbArr[1]));
    var B = getRGBForCalculateLuminance(getSRGB(rgbArr[2]));
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

// コントラスト比を返す
function getContrast(l1, l2) {
    var bright = (l1 > l2) ? l1 : l2; // 明るい方の相対輝度
    var dark   = (l1 < l2) ? l1 : l2; // 暗い方の相対輝度
    return (bright + 0.05) / (dark + 0.05);
}

// カラーコードをrgbに変換する関数
function convert_colorcode_to_rgb(colorcode) {
    // 先頭に#が含まれている場合は除外
    if(colorcode.split('')[0] === '#') {
        colorcode = colorcode.substring(1);
    }
 
    // カラーコードが省略されている場合は6桁に戻す
    if(colorcode.length === 3) {
        var codeArr = colorcode.split('');
        colorcode = codeArr[0] + codeArr[0] + codeArr[1] + codeArr[1] + codeArr[2] + codeArr[2];
    }
 
    // カラーコードが6桁でない場合
    if(colorcode.length !== 6) {
        return false;
    }
    var r = parseInt(colorcode.substring(0, 2), 16);
    var g = parseInt(colorcode.substring(2, 4), 16);
    var b = parseInt(colorcode.substring(4, 6), 16);
    return [r, g, b];
}
