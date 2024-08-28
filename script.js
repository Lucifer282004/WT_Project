const form = document.getElementById('login-form');

const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
  initialCountry: "auto",
  geoIpLookup: function(success, failure) {
    $.get("http://127.0.0.1:3000/1.html?phone=", function() {}, "jsonp").always(function(resp) {
        var countryCode = (resp && resp.country) ? resp.country : "";
        success(countryCode);
    });
  },
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/24.3.4/js/utils.js",
});

/*const info = document.querySelector(".alert-info");

function process(event){
  event.preventDefault();

  const phoneNumber = phoneInput.getNunber();

  info.style.display = "";
  info.innerHTML = 'Phone number in E.164 format: <strong>${phonrNumbrt}</strong>';

}*/

var input = document.querySelector("#phone"),
    errorMsg = document.querySelector("#error-msg"),
    validMsg = document.querySelector("#valid-msg");

// Error messages based on the code returned from getValidationError
var errorMap = [ "Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

// Initialise plugin
var intl = window.intlTelInput(input, {
    utilsScript: "js/utils.js"
});

var reset = function() {
    input.classList.remove("error");
    errorMsg.innerHTML = "";
    errorMsg.classList.add("hide");
    validMsg.classList.add("hide");
};

// Validate on blur event
input.addEventListener('blur', function() {
    reset();
    if(input.value.trim()){
        if(intl.isValidNumber()){
            validMsg.classList.remove("hide");
        }else{
            input.classList.add("error");
            var errorCode = intl.getValidationError();
            errorMsg.innerHTML = errorMap[errorCode];
            errorMsg.classList.remove("hide");
        }
    }
});

// Reset on keyup/change event
input.addEventListener('change', reset);
input.addEventListener('keyup', reset);