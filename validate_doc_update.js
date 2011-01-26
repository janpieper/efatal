function(newDoc, oldDoc, userCtx)
{
    function forbidden(message) {
        throw({forbidden: message});
    };
    
    function unauthorized(message) {
        throw({unauthorized: message});
    };
    
    function require(beTrue, message) {
        if (!beTrue) { forbidden(message); }
    };
    
    if ((oldDoc || newDoc)['type'] == "error")
    {
        require(newDoc.date, "Errors must have an 'date' attribute.");
        require(newDoc.error, "Errors must have an 'error' attribute.");
        require(newDoc.file, "Errors must have an 'file' attribute.");
        require(newDoc.line, "Errors must have an 'line' attribute.");
        require(newDoc.message, "Errors must have an 'message' attribute.");
        
        if (!newDoc.date.match(/\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}\+\d{2}:\d{2}/)) {
            forbidden("Sorry, '" + newDoc.date + "' is not a valid date format. Try: 2011-01-26T22:37:14+00:00");
        }
        
        if (oldDoc && oldDoc.date != newDoc.date) {
            forbidden("Changing 'date' attribute is not allowed.");
        }
    }
    
    return true;
}
