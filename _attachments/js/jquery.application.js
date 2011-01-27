(function($) {
    $.application = $.application || {};
    $.extend($.application, {
        init: function() {
            var opts = {ddoc: "efatal"};
            if (document.location.pathname.indexOf("_design") == -1) {
                opts.db = "efatal";
                opts.design = "efatal";
            }
            $.couch.app(function(app) {
                $("#navigation").evently("navigation", app);
                $$("#errors").date = $.date.format(new Date, "yyyy-mm-dd", false);
                $$("#errors").app = app;
            }, opts);
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
                            $.date.format(doc.date, "HH:MM:ss", false)
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
