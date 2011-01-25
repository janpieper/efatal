(function($) {
    $.application = $.application || {};
    $.extend($.application, {
        run: function() {
            $.couch.db("efatal").view("efatal/errors-by-date", {
                limit: 7,
                group_level: 2,
                descending: true,
                success: function(data) {
                    var list = $("#dates");
                    if (data.rows.length) {
                        for (var index in data.rows) {
                            list.append($.application.item(
                                data.rows[index]
                            ));
                        }
                        $("li a", list).first().click();
                    }
                }
            });
        },
        item: function(row) {
            return $("<li>").append(
                $("<a>").attr({
                    "title": row.value + " error" + ((row.value != 1) ? "s" : ""),
                    "href": "#" + row.key
                }).text(
                    $.date.format(row.key, "d. mmm yyyy")
                ).click(function() {
                    var dateKey = $(this).attr("href").substr(1);
                    $("#dates li.active").first().removeClass("active");
                    $.couch.db("efatal").view("efatal/recent-errors", {
                        key: dateKey,
                        limit: 100,
                        descending: true,
                        success: function(data) {
                            var list = $("#errors").empty();
                            for (var index in data.rows) {
                                list.append($.application.entry(
                                    data.rows[index].value
                                ));
                            }
                            $("#total").text(data.rows.length);
                        }
                    });
                    $(this).parent().addClass("active");
                })
            );
        },
        entry: function(doc) {
            return $("<table>").attr({
                "id": "doc_" + doc._id,
                "class": "error"
            }).append(
                $("<tbody>").append(
                    $("<tr>").append(
                        $("<th>").attr("class", "date").text("Date:")
                    ).append(
                        $("<td>").attr("class", "date").text(
                            $.date.format(doc.date, "yyyy-mm-dd HH:MM:ss")
                        )
                    )
                ).append(
                    $("<tr>").append(
                        $("<th>").attr("class", "type").text("Type:")
                    ).append(
                        $("<td>").attr("class", "type").text(
                            doc.error
                        )
                    )
                ).append(
                    $("<tr>").append(
                        $("<th>").attr("class", "file").text("File @ Line:")
                    ).append(
                        $("<td>").attr("class", "file").text(
                            doc.file + " @ " + doc.line
                        )
                    )
                ).append(
                    $("<tr>").append(
                        $("<th>").attr("class", "message").text("Message:")
                    ).append(
                        $("<td>").attr("class", "message").text(
                            doc.message
                        )
                    )
                )
            );
        }
    });
})(jQuery);
