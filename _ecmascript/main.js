var MainForm = function () {

    var numberUtils = new NumberUtils();

    var montoInputText = document.getElementById('mount');
    var semanasInputText = document.getElementById('weeks');

    var tasaInteresAnualInputText = document.getElementById('');
    var CATInputText = document.getElementById('');
    var totalPagarInputText = document.getElementById('');




    var monto, semanas;

    this.init = function () {
        initPlugins();
        bindEvents();
    }

    function initPlugins() {

        var montoDragdealer = new Dragdealer('slider-mount', {
            animationCallback: function (x, y) {
                var lowVal = 1500;
                var highVal = 50000;
                var diff = highVal - lowVal;
                var thisVal = (Math.round(x * diff) + lowVal);

                montoInputText.value = numberUtils.moneyFormat(thisVal);
                monto = thisVal;


            }

        });

        var semanasDragdealer = new Dragdealer('slider-timelimit', {
            animationCallback: function (x, y) {
                var lowVal = 13;
                var highVal = 52;
                var diff = highVal - lowVal;
                var thisVal = (Math.round(x * diff) + lowVal);

                semanasInputText.value = numberUtils.moneyFormat(thisVal);
                semanas = thisVal;

            }

        });

    }

    function bindEvents() {

    }

};

var NumberUtils = function () {

    this.moneyFormat = function (number, decimalsNumber) {

        var decimals = isNaN(decimalsNumber = Math.abs(decimalsNumber)) ? 0 : decimalsNumber,
            separatorDecimals = ".",
            separatorThousands = ",",
            convert1 = number < 0 ? "-" : "",
            convert2 = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decimals))),
            convert3 = (convert3 = convert2.length) > 3 ? convert3 % 3 : 0;

        return convert1 + (convert3 ? convert2.substr(0, convert3) + separatorThousands : "")
            + convert2.substr(convert3).replace(/(\d{3})(?=\d)/g, "$1" + separatorThousands)
            + (decimals ? separatorDecimals
            + Math.abs(number - convert2).toFixed(decimals).slice(2) : "");
    }
};

window.onload = function () {
    var mainForm = new MainForm();
    mainForm.init();
    
};