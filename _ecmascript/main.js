var MainForm = function () {

    var numberUtils = new NumberUtils();

    var txtMonto = $("#txtMonto");
    var hiddenMonto = $("#hiddenMonto");
    var txtSemanas = $("#txtSemanas");
    var txtTasaInteres = $("#txtTasaInteres");
    var txtCAT = $("#txtCAT");
    var txtTotalPagar = $("#txtTotalPagar");
    var txtNombre = $("#txtNombre");
    var txtEdad = $("#txtEdad");
    var txtTelefono = $("#txtTelefono");
    var ddlEstados = $("#ddlEstados");

    this.init = function () {
        initPlugins();
        bindEvents();
    }

    function initPlugins() {

        var montoDragdealer = new Dragdealer('slider-mount', {
            animationCallback: function (x, y) {
                var minValue = 1500;
                var maxVal = 50000;
                var diff = maxVal - minValue;
                var value = (Math.round(x * diff) + minValue);

                txtMonto.val(numberUtils.moneyFormat(value));
                hiddenMonto.val(value);
            }

        });

        var semanasDragdealer = new Dragdealer('slider-timelimit', {
            animationCallback: function (x, y) {
                var minValue = 13;
                var maxVal = 52;
                var diff = maxVal - minValue;
                var value = (Math.round(x * diff) + minValue);

                txtSemanas.val(value);


            }

        });

    }

    function bindEvents() {
        $("#form-contact").submit(sendInformation);
    }

    function sendInformation(event) {
        event.preventDefault();

        if(validate()) {
            var periodo = $("input[name='rdbtnPeriodo']:checked").val();
            var tipoTelefono = $("input[name='rrdbtnTipoTelefono']:checked").val();

            var data = {
                monto: hiddenMonto.val(),
                periodo: periodo,
                plazo: txtSemanas.val(),
                tasaInteres: txtTasaInteres.val(),
                cat: txtCAT.val(),
                totalPagar: txtTotalPagar.val(),
                nombre: txtNombre.val(),
                edad: txtEdad.val(),
                telefono: txtTelefono.val(),
                tipoTelefono: tipoTelefono,
                estado: ddlEstados.val()
            };

            alert(JSON.stringify(data));

            //Aqui se puede cambiar la funcionalidad para que se envia la informacion del formulario
        }

    }

    function validate() {

        if(txtNombre.val().trim().length <= 5) {
            alert("Debes ingresar un nombre válido.");
            txtNombre.focus();
            return false;
        }

        if(txtEdad.val() < 18) {
            alert("Debes de ser mayor de edad.");
            txtEdad.focus();
            return false;
        }

        if(txtTelefono.val().trim().length < 8) {
            alert("Debes ingresar un número telefónico válido.");
            txtTelefono.focus();
            return false;
        }


        return true;
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

$(document).on("ready", function () {
    var mainForm = new MainForm();
    mainForm.init();
})