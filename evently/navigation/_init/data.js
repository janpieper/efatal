function(data) {
    var firstItem = true;
    return {"items": data.rows.map(function(row) {
        var active = false;
        if (firstItem) {
            var active = true;
           firstItem = false;
        }
        return {
            "date"   : $.date.format(row.key, "d. mmm yyyy"),
            "anchor" : $.date.format(row.key, "yyyy-mm-dd"),
            "plural" : row.value != 1,
            "count"  : row.value,
            "active" : active
        };
    })};
}
