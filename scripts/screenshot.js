javascript:
function screenshot( selector) {
    var element = $(selector)[0];
    html2canvas(element, { onrendered: function(canvas) {
        var imgData = canvas.toDataURL();
        $('#screen_image')[0].src = imgData;
        $('#download')[0].href = imgData;
        $('#download')[0].innerHTML = "Download";
    }});
}
