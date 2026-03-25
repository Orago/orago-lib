export class ToType {
    static safeJsonParse(input) {
        try {
            return JSON.parse(input);
        }
        catch (E) {
            return {};
        }
    }
    static boolean($, defaults) {
        return typeof $ === "boolean" ? $ : defaults === true;
    }
    static number($, defaults = 0) {
        $ = Number($);
        return isNaN($) ? defaults : $;
    }
    static int($, defaults = 0) {
        return Math.trunc(ToType.number($, defaults));
    }
    static string($, defaults = "") {
        if (typeof $ === "string" || typeof $ === "number") {
            return $ + "";
        }
        else if (typeof $ === "object") {
            try {
                return JSON.stringify($);
            }
            catch (e) { }
        }
        return defaults + "";
    }
    static object($) {
        if (typeof $ == "string") {
            return ToType.object(ToType.safeJsonParse($));
        }
        else if (typeof $ != "object" || $ == null || Array.isArray($)) {
            return new Object();
        }
        return $;
    }
    static array($) {
        if (typeof $ == "string") {
            return ToType.array(ToType.safeJsonParse($));
        }
        else if (Array.isArray($) != true) {
            return [];
        }
        return $;
    }
}
