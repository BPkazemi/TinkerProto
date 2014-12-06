$(function() {
    $('.save-button').click(function() {
        // Make async POST request. On return, load user's page
        var fields = $('.edit-field').map(function(i,e) { return $(this).val().trim(); });
        var summary = fields[0];
        var skills = fields[1];
        var contact = fields[2];

        var body = {
            "summary": summary,
            "skills": skills,
            "contact": contact
        };

        $.ajax({
            url: "/users/1/edit",
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
