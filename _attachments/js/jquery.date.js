(function($) {
    function pad(val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) val = "0" + val;
        return val;
    };
    $.date = $.date || {};
    $.extend($.date, {
        i18n: {
            formats: {
                "default":      "ddd mmm dd yyyy HH:MM:ss",
                shortDate:      "m/d/yy",
                mediumDate:     "mmm d, yyyy",
                longDate:       "mmmm d, yyyy",
                fullDate:       "dddd, mmmm d, yyyy",
                shortTime:      "h:MM TT",
                mediumTime:     "h:MM:ss TT",
                longTime:       "h:MM:ss TT Z",
                isoDate:        "yyyy-mm-dd",
                isoTime:        "HH:MM:ss",
                isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
                isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
            },
            dayNames: [
                "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
                "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
            ],
            monthNames: [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
            ]
        },
        format: function(date, format, utc) {
            if (typeof date == "string") {
                date = new Date(date);
            } else if (!date instanceof Date) {
                date = new Date();
            }
            if (typeof format == "undefined") {
                format = this.i18n.formats["default"];
            }
            if (typeof utc == "undefined") {
                utc = true;
            }
            var _     = utc ? "getUTC" : "get",
                d     = date[_ + "Date"](),
                D     = date[_ + "Day"](),
                m     = date[_ + "Month"](),
                y     = date[_ + "FullYear"](),
                H     = date[_ + "Hours"](),
                M     = date[_ + "Minutes"](),
                s     = date[_ + "Seconds"](),
                L     = date[_ + "Milliseconds"](),
                o     = utc ? 0 : date.getTimezoneOffset(),
                token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
                tz    = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
                tzc   = /[^-+\dA-Z]/g,
                flags = {
                    d:    d,
                    dd:   pad(d),
                    ddd:  this.i18n.dayNames[D],
                    dddd: this.i18n.dayNames[D + 7],
                    m:    m + 1,
                    mm:   pad(m + 1),
                    mmm:  this.i18n.monthNames[m],
                    mmmm: this.i18n.monthNames[m + 12],
                    yy:   String(y).slice(2),
                    yyyy: y,
                    h:    H % 12 || 12,
                    hh:   pad(H % 12 || 12),
                    H:    H,
                    HH:   pad(H),
                    M:    M,
                    MM:   pad(M),
                    s:    s,
                    ss:   pad(s),
                    l:    pad(L, 3),
                    L:    pad(L > 99 ? Math.round(L / 10) : L),
                    t:    H < 12 ? "a"  : "p",
                    tt:   H < 12 ? "am" : "pm",
                    T:    H < 12 ? "A"  : "P",
                    TT:   H < 12 ? "AM" : "PM",
                    Z:    utc ? "UTC" : (String(date).match(tz) || [""]).pop().replace(tzc, ""),
                    o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                };

            return format.replace(token, function ($0) {
                return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
            });
        }
    });
})(jQuery);
