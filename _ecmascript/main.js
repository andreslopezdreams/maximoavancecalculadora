class MainForm {

    constructor() {
        this.mounInput = document.getElementById('mount');
        this.mount = 0;
    }

    initPlugins() {

        let mountDragdealer = new Dragdealer('demo-simple-slider', {
            animationCallback: (x, y) => {
                var lowVal = 1500;
                var highVal = 50000;
                var diff = highVal - lowVal;
                var thisVal = (Math.round(x * diff) + lowVal);
                this.mounInput.value = NumberUtils.moneyFormat(thisVal);

                this.mount = thisVal;

                console.log(this.mount);
            }

        });
    }
}

class NumberUtils {

    static moneyFormat(number, decimalsNumber) {

        var decimals = isNaN(decimalsNumber = Math.abs(decimalsNumber)) ? 0 : decimalsNumber,
            separatorDecimals = ".",
            separatorThousands = ",",
            convert1 = number < 0 ? "-" : "",
            convert2 = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decimals))),
            convert3 = (convert3 = convert2.length) > 3 ? convert3 % 3 : 0;
        return convert1 + (convert3 ? convert2.substr(0, convert3) + separatorThousands : "") + convert2.substr(convert3).replace(/(\d{3})(?=\d)/g, "$1" + separatorThousands) + (decimals ? separatorDecimals + Math.abs(number - convert2).toFixed(decimals).slice(2) : "");
    }

}

window.onload = () => {
    let mainForm = new MainForm();
    mainForm.initPlugins();
};