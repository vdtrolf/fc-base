"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegexEmailValidator = void 0;
// An adapter for the EmailValidator using regex,
// but it could be any other implementation
class RegexEmailValidator {
    constructor() {
        this.regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    }
    validate(email) {
        return this.regex.test(email);
    }
    ;
}
exports.RegexEmailValidator = RegexEmailValidator;
;
//# sourceMappingURL=regexEmailValidator.js.map