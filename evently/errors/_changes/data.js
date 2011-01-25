function(data) {
    return {"errors": data.rows.map(function(row) {
        return {
            "id"      : row.value._id,
            "date"    : $.date.format(row.value.date, "HH:MM:ss"),
            "type"    : row.value.error,
            "file"    : row.value.file,
            "line"    : row.value.line,
            "message" : row.value.message
        };
    })};
}
