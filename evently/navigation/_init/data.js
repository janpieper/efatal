function(data) {
    return {"items": data.rows.map(function(row) {
        return {
            "date"   : $.date.format(row.key, "d. mmm yyyy", false),
            "anchor" : $.date.format(row.key, "yyyy-mm-dd", false),
            "plural" : row.value != 1,
            "count"  : row.value
        };
    })};
}
