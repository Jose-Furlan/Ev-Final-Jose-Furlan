var UrlApi = "https://www.api-ef-furlan.cetcom.edu.gt/api/";

function ObtenerContinentes() {

    var settings = {
        "url": UrlApi + "ObtenerContinentes",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({

        }),
    };

    $.ajax(settings).done(function(response) {


        $.each(response, function(index, data) {
            var opcion = "<option class='opciones' value='" + data.IdContinente + "'>" + data.TxtContinente + "</option>";
            $(opcion).appendTo("#SelectContinente");
        });

    });
}

function LimpiarFormulario() {
    sessionStorage.setItem('Id', '');
    $("#SelectContinente").val($("#SelectContinente option:first").val());
    $("#TxtPais").val("");
    $("#TxtCapital").val("");
    $("#IntAnioIndependencia").val("");
    $("#IntPoblacion").val("");
    $("#TxtPresidenteActual").val("");
    $("#TxtIdiomaOficial").val("");
    $("#TxtMoneda").val("");
}

function VerificarCampos() {
    let resultado;

    if ($("#SelectContinente").val() === "" ||
        $("#TxtPais").val() === "" ||
        $("#TxtCapital").val() == "" ||
        $("#IntAnioIndependencia").val() == 0 ||
        $("#IntPoblacion").val() == 0 ||
        $("#TxtPresidenteActual").val() == "" ||
        $("#TxtIdiomaOficial").val() == "" ||
        $("#TxtMoneda").val() == ""
    ) {
        Swal.fire({ icon: 'error', title: 'Oops...', text: 'Todos los campos deben de estar llenos!' });
        resultado = true;
    } else {
        resultado = false;
    }

    return resultado;
}

function ObtenerPaises(IdContinente, TxtContinente) {

    document.getElementById("TxtContinente").innerText = TxtContinente;
    sessionStorage.setItem('TxtContinenteEnPantalla', TxtContinente);
    $(".DatosPaises td").remove();

    var settings = {
        "url": UrlApi + "ObtenerPaises",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({

            "IdContinente": IdContinente
        }),
    };

    $.ajax(settings).done(function(response) {


        $.each(response, function(index, data) {

            LimpiarFormulario();

            var fila = "<tr> <td>" + data.TxtPais +
                "</td><td>" + data.TxtCapital +
                "</td><td>" + data.IntAnioIndependencia +
                "</td><td>" + data.IntPoblacion +
                "</td><td>" + data.TxtPresidenteActual +
                "</td><td>" + data.TxtIdiomaOficial +
                "</td><td>" + data.TxtMoneda +
                "<td class='text-center'><a href='#' id='EditarPais' onclick='ObtenerDatosPais(" + data.IdPais + ");'><svg width='2em' height='2em' viewBox='0 0 20 20' class='bi bi-pencil-square text-dark' fill='currentColor' xmlns='http://www.w3.org/2000/svg'> <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z'/><path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'/></svg></a>" +
                "</td><td class='text-center'><a href='#' onclick='EliminarPais(" + data.IdPais + ");'><svg width='1.5em' height='1.5em' viewBox='0 0 16 16' class='bi bi-x-square-fill text-danger' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z'/></svg></a></tr>";

            $(fila).appendTo(".DatosPaises");
            sessionStorage.setItem('ContinenteEnPantalla', IdContinente);

        });

    });
}

function AgregarPais() {

    if (VerificarCampos() == false) {

        var settings = {
            "url": UrlApi + "AgregarPais",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({

                "IdContinente": $("#SelectContinente option:selected").val(),
                "TxtPais": $("#TxtPais").val(),
                "TxtCapital": $("#TxtCapital").val(),
                "IntAnioIndependencia": $("#IntAnioIndependencia").val(),
                "IntPoblacion": $("#IntPoblacion").val(),
                "TxtPresidenteActual": $("#TxtPresidenteActual").val(),
                "TxtIdiomaOficial": $("#TxtIdiomaOficial").val(),
                "TxtMoneda": $("#TxtMoneda").val()

            }),
        };

        $.ajax(settings).done(function(response) {
            $.each(response, function(index, data) {
                if (data.Resultado > 0) {
                    Swal.fire('Perfecto!', 'El pais se agregó correctamente!', 'success');
                    ObtenerPaises(sessionStorage.getItem('ContinenteEnPantalla'), sessionStorage.getItem('TxtContinenteEnPantalla'));
                    LimpiarFormulario();
                    $('#AgregarPaisModal').modal('hide');
                } else {
                    Swal.fire({ icon: 'error', title: 'Oops...', text: 'No se pudo agregar el pais!' });
                }
            });

        });
    }

}

function EliminarPais(IdPais) {
    var settings = {
        "url": UrlApi + "EliminarPais",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdPais": IdPais
        }),
    };
    $.ajax(settings).done(function(response) {
        $.each(response, function(index, data) {
            if (data.Resultado > 0) {

                Swal.fire('Perfecto!', 'El pais se eliminó correctamente!', 'success');
                LimpiarFormulario();
                ObtenerPaises(sessionStorage.getItem('ContinenteEnPantalla'), sessionStorage.getItem('TxtContinenteEnPantalla'));

            } else {
                Swal.fire({ icon: 'error', title: 'Oops...', text: 'No se pudo eliminar el pais!' });
            }
        });
    });
}

function ObtenerDatosPais(IdPais) {
    var settings = {
        "url": UrlApi + "ObtenerDatosPais",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdPais": IdPais,
        }),
    };

    $.ajax(settings).done(function(response) {
        $('#AgregarPaisModal').modal('show');
        LimpiarFormulario();
        sessionStorage.setItem('Id', IdPais);

        $.each(response, function(index, data) {

            $("#SelectContinente option[value=" + data.IdContinente + "]").prop("selected", true);
            $("#TxtPais").val(data.TxtPais);
            $("#TxtCapital").val(data.TxtCapital);
            $("#IntAnioIndependencia").val(data.IntAnioIndependencia);
            $("#IntPoblacion").val(data.IntPoblacion);
            $("#TxtPresidenteActual").val(data.TxtPresidenteActual);
            $("#TxtIdiomaOficial").val(data.TxtIdiomaOficial);
            $("#TxtMoneda").val(data.TxtMoneda);

        });
    });
}

function ActualizarPais() {

    if (VerificarCampos() == false) {

        var settings = {
            "url": UrlApi + "ActualizarPais",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({

                "IdPais": sessionStorage.getItem('Id'),
                "IdContinente": $("#SelectContinente option:selected").val(),
                "TxtPais": $("#TxtPais").val(),
                "TxtCapital": $("#TxtCapital").val(),
                "IntAnioIndependencia": $("#IntAnioIndependencia").val(),
                "IntPoblacion": $("#IntPoblacion").val(),
                "TxtPresidenteActual": $("#TxtPresidenteActual").val(),
                "TxtIdiomaOficial": $("#TxtIdiomaOficial").val(),
                "TxtMoneda": $("#TxtMoneda").val()

            }),
        };

        $.ajax(settings).done(function(response) {
            $.each(response, function(index, data) {
                if (data.Resultado > 0) {
                    Swal.fire('Perfecto!', 'El pais se actualizó correctamente!', 'success');
                    $('#AgregarPaisModal').modal('hide');
                    LimpiarFormulario();
                    ObtenerPaises(sessionStorage.getItem('ContinenteEnPantalla'), sessionStorage.getItem('TxtContinenteEnPantalla'));
                } else {
                    Swal.fire({ icon: 'error', title: 'Oops...', text: 'No se pudo actualizar el pais!' });
                }
            });
        });
    }

}

function Guardar() {
    if (sessionStorage.getItem('Id') > 0) {
        ActualizarPais();
    } else {
        AgregarPais();
    }
}