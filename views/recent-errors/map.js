function(doc) {
    // !code lib/date.format.js
    if (doc.type == "error") {
        emit((new Date(doc.date)).format("yyyy-mm-dd"), doc);
    }
}
