function(data) {
    return {"items": data.rows.map(function(row) {
        return {
            "date"   : $.date.format(row.key, "d. mmm yyyy"),
            "anchor" : $.date.format(row.key, "yyyy-mm-dd"),
            "plural" : row.value != 1,
            "count"  : row.value
        };
    })};
}
