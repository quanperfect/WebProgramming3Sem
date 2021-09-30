let r = document.getElementById("r");
let checkbox_x = document.getElementById("checkbox_x");
let x = -99 ;
let x5 = document.getElementById("x5");
let x4 = document.getElementById("x4");
let x3 = document.getElementById("x3");
let x2 = document.getElementById("x2");
let x1 = document.getElementById("x1");
let x0 = document.getElementById("x0");
let x01 = document.getElementById("x01");
let x02 = document.getElementById("x02");
let x03 = document.getElementById("x03");
let xarray = [x5,x4,x3,x2,x1,x0,x01,x02,x03];

let y = document.getElementById("y");
let table = document.getElementById("tbody");
// let cookies_data = (Cookies.get("data") !== undefined && Cookies.get("data") !== "") ? Cookies.get("data") : "";


function isValuesValid() {
    let isValid = true
    let xIsSet = false

    for (let i = 0; i < 9; i++)
    {
        //console.log(i);
        if (xarray[i].checked)
        {
            if (xIsSet)
            {
                checkbox_x.style.border = "1px solid red";
                $('#messageX').text("Выберите одно значение");
                $('#messageX').css('color','red');
                isValid = false;
            }
            else
            {
                x = xarray[i].value;
                xIsSet = true;
            }
        }
    }
    if (!xIsSet)
    {
        isValid = false;
    }

    if ((xIsSet) && (isValid))
    {
        checkbox_x.style.border = "0px";
        $('#messageX').text("");
    }
    else
    {
        checkbox_x.style.border = "1px solid red";
        $('#messageX').text("Выберите одно значение");
        $('#messageX').css('color','red');
        isValid = false;
    }

    if (!r.value)
    {
        r.style.border = "1px solid red";
        $('#messageR').text("Необходимо заполнить это поле");
        $('#messageR').css('color','red');
        isValid = false;
    }
    else
    {
        if (r.value > 5 || r.value < 2 || isNaN(r.value))
        {
            r.style.border = "1px solid red";
            $('#messageR').text("Некорректный ввод");
            $('#messageR').css('color','red');
            isValid = false;
        }
        else
        {
            r.style.border = "1px solid #ACACAC";
            $('#messageR').text("");
        }
    }

    if (!y.value)
    {
        y.style.border = "1px solid red";
        $('#messageY').text("Необходимо заполнить это поле");
        $('#messageY').css('color','red');
        isValid = false;
    }
    else
    {
        if (y.value > 3 || y.value < -3 || isNaN(y.value))
        {
            y.style.border = "1px solid red";
            $('#messageY').text("Некорректный ввод");
            $('#messageY').css('color','red');
            isValid = false;
        }
        else
        {
            y.style.border = "1px solid #ACACAC";
            $('#messageY').text("");
        }
    }

    return isValid;
}

$(document).ready(function () {
    $('[reset_button]').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: "restart_session.php",
            async: true,
            type: "POST",
            data: {},
            cache: false,
            success: function(response) {
                table.innerHTML = `
                <tr>
                    <th class="narrowColumn">X</th>
                    <th class="narrowColumn">Y</th>
                    <th class="narrowColumn">R</th>
                    <th class="normalColumn">Результат</th>
                    <th class="normalColumn">Выполнение</th>
                    <th class="normalColumn">Время</th>
                </tr>
                `
            },
            error: function(xhr) {

            }
        });
    })
})

$(document).ready(function() {
        $('[check_button]').on('click', function(event) {
        event.preventDefault();
          if (isValuesValid()) {
              $.ajax({
              url: "save_table.php",
              async: true,
              type: "POST",
              data: {
                  "x": x,
                  "y": y.value,
                  "r": r.value
              },
              cache: false,
              success: function(response) {
                let table = document.getElementById("tbody");
                table.insertAdjacentHTML('beforeend', response);
              },
              error: function (jqXHR, exception) {
                  var msg = '';
                  if (jqXHR.status === 0) {
                      msg = 'Not connect.\n Verify Network.';
                  } else if (jqXHR.status == 404) {
                      msg = 'Requested page not found. [404]';
                  } else if (jqXHR.status == 500) {
                      msg = 'Internal Server Error [500].';
                  } else if (exception === 'parsererror') {
                      msg = 'Requested JSON parse failed.';
                  } else if (exception === 'timeout') {
                      msg = 'Time out error.';
                  } else if (exception === 'abort') {
                      msg = 'Ajax request aborted.';
                  } else {
                      msg = 'Uncaught Error.\n' + jqXHR.responseText;
                  }
                  alert(msg);
              }
          });
      }
    })
});

$(document).ready(function () {
    $.ajax({
        url: "get_from_session.php",
        async: true,
        type: "POST",
        success: function (response){
            let table = document.getElementById("tbody");
            table.insertAdjacentHTML('beforeend', response);
        }
    })
})

