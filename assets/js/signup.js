const HOST = "https://cloudpcrv3-dev.azurewebsites.net";
// const HOST = "https://localhost:44300";
const URL = `${HOST}/Account/RegistrationApi`;

function SerializeFormToJson($formOrSelector, { attribute = "name" } = {}) {
    let data = {};
    let fields = $(`[${attribute}]`, $formOrSelector);
    fields.each((i, el) => {
        let $el = $(el);
        let name = $el.attr(attribute);
        data[name] = $el.val();
    });
    return data;
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function SubmitCoreInfo($form) {
    let $form = $("#signupForm")
    let validator = $form.validate();

    if (validator.form()) {
        // let formData = SerializeFormToJson($form);
        // formData.leadOrigin = getUrlParameter("leadOrigin");
        // formData.leadContext = getUrlParameter("leadContext");
        // formData.demo = true;
        // formData.testing = true;
        let name = $("[name=name]", $form).val().trim().split(" ");
        
        let formData = {
            leadOrigin: getUrlParameter("leadOrigin"),
            leadContext: getUrlParameter("leadContext"),
            demo: true,
            emailAddress: $("[name=email]", $form).val(),
            phoneNumber: $("[name=phone]", $form).val(),
            firstName: name[0],
            lastName: name[name.length - 1]
        };
        debugger;
        // let loading = SetLoading();

        jQuery.ajax({
            type: "GET",
            url: URL,
            data: formData
        }).done((data) => {
            // if (data.Success)
            //     window.location = `completeSignup.html?referenceId=${data.ReferenceId}`;
            // else
            //     swal("Oh Snap!", "Maybe you have already signed up?  You can create a new account by trying a different email address, or send us a message using our chat in the bottom right!", "warning");
        }).fail(() => {
            // swal("Oh Snap!", "There was an issue creating your account. If this keeps happening, just send us a message using our chat in the bottom right!", "warning");
        })//.always(() => loading.remove());
    }
    else {
        // swal("Oops!", "There appears to be some information missing, please fill out the form completely", "warning");
    }
}

function SubmitAdditionalInfo() {
    let $form = $("#additionalInfoForm")
    let validator = $form.validate();

    if (validator.form()) {
        let formData = SerializeFormToJson($form);
        formData.referenceId = getUrlParameter("referenceId");
        // formData.testing = true;
        let loading = SetLoading();

        jQuery.ajax({
            type: "GET",
            url: URL,
            data: formData
        }).done((data) => {
            if (data.Success) {
                $("#signuphead").hide();
                $("#finalStage").show();
                swal("Awesome!", "Welcome to the CloudPCR community, please check your e-mail for your log in information!", "success");
            } else
                swal("Oh Snap!", "There was a problem updating your account, but don't worry. Your account was still created and you will be contacted soon!", "warning");
        }).fail(() => {
            swal("Oh Snap!", "There was a problem updating your account, but don't worry. Your account was still created and you will be contacted soon!", "warning");
        }).always(() => loading.remove());
    }
    else
        swal("Oops!", "There appears to be some information missing, please fill out the form completely", "warning");
}

function SetLoading() {
    let loading = $(`<i class="fa fa-spin fa-spinner"></i>`); 
    $("#loading").append(loading);
    return loading;
}
