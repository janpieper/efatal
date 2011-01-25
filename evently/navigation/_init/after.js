function() {
    $("#dates li a").click(function() {
        var dateKey = $(this).attr("href").substr(1);
        var parts = dateKey.split("-");
        $("#dates li.active").first().removeClass("active");
        $(this).parent().addClass("active");
        $.couch.db("efatal").view("efatal/recent-errors", {
            startkey: [parts[0], parts[1], parts[2], {}],
            endkey: [parts[0], parts[1], parts[2]],
            descending: true,
            limit: 100,
            success: function(data) {
                var list = $("#errors").empty();
                for (var index in data.rows) {
                    list.append($.application.entry(
                        data.rows[index].value
                    ));
                }
            }
        });
        var container = $("#errors");
        if ($.date.format(new Date, "yyyy-mm-dd", false) == dateKey) {
            container.evently("errors", $$("#errors").app);
        } else {
            container.unbind();
        }
    }).first().click();
}
