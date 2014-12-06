$(function() {
    $('.create-button').click(function() {
        var fields = $('.input-style').map(function(i, e) { return $(this).val().trim() });
        var today = new Date();
        var body = {
            title: fields[0],
            skill: fields[1],
            location: fields[2],
            difficulty: fields[3],
            summary: fields[4],
            date: today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear(),
        };

        console.log(body);

        $.ajax({
            url: "/projects/new",
            contentType: "application/json",
            type: "POST",
            data: JSON.stringify(body),
            success: function(data, status, xhr) {
                if( data == "Created" ) {
                   window.location.href=xhr.getResponseHeader('Location');
                }
            }
        });
    });
});
