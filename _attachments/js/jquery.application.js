(function($) {
    $.application = $.application || {};
    $.extend($.application, {
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
                            $.date.format(doc.date, "HH:MM:ss")
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
