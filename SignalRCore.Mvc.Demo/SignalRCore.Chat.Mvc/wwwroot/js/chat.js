var connection = null;

$(function () {
    if (connection === null) {
        connection = new signalR.HubConnectionBuilder()
            .withUrl("/chatHub")
            .build();

        connection.on("Broadcast", function (response) {
            $("#chatRoom").append(
                '<div class="media w-50 ml-auto mb-3">' +
                '<img src="https://img.icons8.com/officel/16/000000/user.png" alt="user" width="50" class="rounded-circle">' +
                '<div class="media-body">' +
                '<div class="bg-primary rounded py-2 px-3 mb-2">' +
                '<p class="text-small mb-0 text-white">' + response.messageBody + '</p>' +
                '</div>' +
                '<p class="small text-muted">' + response.fromUser + '</p>' +
                '<p class="small text-muted">' + response.messageDtTm + '</p>' +
                '</div>' +
                '</div>'
            );

            $('#chatRoom').stop().animate({
                scrollTop: $('#chatRoom')[0].scrollHeight
            });
        });

        connection.on("UserConnected", function (response) {
            $("#chatUsers").append(
                '<a class="list-group-item list-group-item-action active text-white rounded-0">' +
                '<div class= "media">' +
                '<img src="https://img.icons8.com/officel/16/000000/user.png" alt="user" width="50" class="rounded-circle">' +
                '<div class="media-body ml-4">' +
                '<div class="d-flex align-items-center justify-content-between mb-1">' +
                '<h6 class="mb-0">Some User</h6><small class="small font-weight-bold">' + response.connectionDtTm + '</small>' +
                '</div>' +
                '<p class="font-italic mb-0 text-small">' + response.connectionId + '</p>' +
                '</div>' +
                '</div>' +
                '</a>'
            );

            $("#chatRoom").append(
                '<div class="media w-50 mb-3">' +
                '<img src="https://img.icons8.com/dusk/64/000000/user-female-skin-type-1-2.png" alt="user" width="50" class="rounded-circle">' +
                '<div class="media-body ml-3">' +
                '<div class="bg-light rounded py-2 px-3 mb-2">' +
                '<p class="text-small mb-0 text-muted">Welcome to the Chat Room!</p>' +
                '</div>' +
                '<p class="small text-muted">' + response.messageDtTm + '</p>' +
                '</div>'
            );
        });

        connection.on("UserDisconnected", function (message) {
            alert(message);
        });

        connection.on("HubError", function (response) {
            alert(response.error);
        });

        connection.start().then(function () {
            document.getElementById('sendButton').onclick = function () {
                var message = document.getElementById("messageInput").value;
                connection.invoke("BroadcastFromClient", message)
                    .catch(function (err) {
                        return console.error(err.toString());
                    });
            };
        });
    }
});