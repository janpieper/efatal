function(doc) {
    // !code lib/date.format.js
    if (doc.type == "error") {
        var d = new Date(doc.date);
        emit([
            d.format("yyyy"), // Year:    2011
            d.format("mm"),   // Month:     01
            d.format("dd"),   // Day:       25
            d.format("HH"),   // Hours:     22
            d.format("MM"),   // Minutes:   49
            d.format("ss")    // Seconds:   40
        ], doc);
    }
}
