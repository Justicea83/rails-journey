$(document).on('turbo:load', function () {
    let submitHandler, stripeResponseHandler, show_error;

    submitHandler = function (event) {
        const $form = $(event.target);
        $form.find("input[type=submit]").prop('disabled', true);

        if(Stripe){
            Stripe.card.createToken($form, stripeResponseHandler)
        }else{
            show_error("Failed to load credit card processing functionality. Please reload this page");
        }
        return false;
    };

    stripeResponseHandler = function (status, response) {
        let token, $form;

        $form = $('.cc_form');

        if(response.error) {
            show_error(response.error.message);
            $form.find("input[type=submit]").prop('disabled', false);
        } else {
            token = response.id;
            $form.append($("<input type='hidden' name='payment[token]' />").val(token));
            $("[data-stripe=number]").remove()
            $("[data-stripe=cvc]").remove()
            $("[data-stripe=exp-year]").remove()
            $("[data-stripe=exp-month]").remove()
            $form.get(0).submit();
        }

        return false;
    }

    show_error = function (message) {
        if($('#flash-messages').size() < 1) {
            $('div.container.main div:first').prepend('<div id="flash-messages"></div>')
        }

        $('#flash-messages').html(`
        <div class="alert alert-warning alert-dismissible fade show mt-2" role="alert">
            <strong>Oops! </strong>${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `);

        $('.alert').delay(5000).fadeOut(3000)
        return false
    }

    $(".cc_form").on('submit', submitHandler)
});