// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import * as jquery from "jquery"
import "semantic-ui"
import "controllers"
import "channels"


window.scroll_bottom = function () {
    const messagesContainer = $('#messages');
    if (messagesContainer.length > 0) {
        messagesContainer.scrollTop(messagesContainer[0].scrollHeight)
    }
}

window.submitMessage = function () {
    const messageBody = $('#message_body');
    messageBody.on('keydown', function (e) {
        if(e.keyCode === 13) {
            $('button').click()
            e.target.value = ""
        }
    })
}
$(document).on('turbo:load', function () {
    scroll_bottom();
    submitMessage();

    $('.ui.dropdown').dropdown();

    $('.message .close').on('click', function () {
        $(this).closest('.message').transition('fade');
    });

});
