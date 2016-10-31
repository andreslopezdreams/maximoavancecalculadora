class MainForm {

    constructor() {
        this.mounInput = document.getElementById('mount');
        this.weeksInput = document.getElementById('weeks');

        this.mount = 0;
        this.weeks = 0;
    }

    init() {
        this.initPlugins();
    }

    initPlugins() {

        let mountDragdealer = new Dragdealer('slider-mount', {
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


        let timelineDragdealer = new Dragdealer('slider-timelimit', {
            animationCallback: (x, y) => {
                var lowVal = 13;
                var highVal = 52;
                var diff = highVal - lowVal;
                var thisVal = (Math.round(x * diff) + lowVal);

                this.weeksInput.value = thisVal;
                this.weeks = thisVal;

                console.log(this.weeks);
            }

        });


    }
}

class NumberUtils {

    static moneyFormat(number, decimalsNumber) {

        let decimals = isNaN(decimalsNumber = Math.abs(decimalsNumber)) ? 0 : decimalsNumber,
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

}

window.onload = () => {
    console.log("inicio");
    let mainForm = new MainForm();
    mainForm.init();


};