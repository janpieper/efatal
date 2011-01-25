function(data) {
    return {"items": data.rows.map(function(row) {
        var datestr = row.key[0] + "-" + row.key[1] + "-" + row.key[2];
        return {
            "date"   : $.date.format(datestr, "d. mmm yyyy", false),
            "anchor" : datestr,
            "plural" : row.value != 1,
            "count"  : row.value
        };
    })};
}
