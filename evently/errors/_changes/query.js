function() {
    var parts = $$("#errors").date.split("-");
    return {
        view: "recent-errors",
        descending: true,
        limit: 100,
        startkey: [parts[0], parts[1], parts[2], {}],
        endkey: [parts[0], parts[1], parts[2]]
    };
}
