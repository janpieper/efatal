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
    });
    var navItems = null;
    if (location.href.indexOf("#") != -1) {
        var navItems = $("#dates li a[href*='" + window.location.hash + "']");
    }
    if ((navItems === null) || (navItems.length == 0)) {
        navItems = $("#dates li a");
    }
    if (navItems.length > 0) {
        var navItem = navItems.first();
        window.location.hash = navItem.attr("href");
        navItem.click();
    }
}
