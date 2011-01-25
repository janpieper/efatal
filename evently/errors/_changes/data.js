function(data) {
    return {"errors": data.rows.map(function(row) {
        return {
            "id"      : row.value._id,
            "date"    : row.value.date,
            "type"    : row.value.error,
            "file"    : row.value.file,
            "line"    : row.value.line,
            "message" : row.value.message
        };
    })};
}
