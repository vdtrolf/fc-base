"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegistration = exports.UserAlreadyExistsError = exports.InvalidEmailError = exports.PasswordDoesNotMatchError = exports.MissingParam = void 0;
class MissingParam extends Error {
    constructor(param) {
        super(`Missing parameter: ${param}`);
    }
}
exports.MissingParam = MissingParam;
;
class PasswordDoesNotMatchError extends Error {
    constructor() {
        super('Passwords does not match!');
    }
}
exports.PasswordDoesNotMatchError = PasswordDoesNotMatchError;
;
class InvalidEmailError extends Error {
    constructor() {
        super('Invalid email!');
    }
}
exports.InvalidEmailError = InvalidEmailError;
;
class UserAlreadyExistsError extends Error {
    constructor() {
        super('There is already a user with this email!');
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
;
// UserRegistration use case
class UserRegistration {
    constructor(userRepository, // UserRepository port
    emailValidator) {
        this.userRepository = userRepository;
        this.emailValidator = emailValidator;
    }
    // Use case execution method
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { full_name, email, password, confirmPassword, role } = input;
            const creation_date = "";
            if (!email)
                throw new MissingParam('email');
            if (!password)
                throw new MissingParam('password');
            if (!confirmPassword)
                throw new MissingParam('confirmPassword');
            if (password !== confirmPassword)
                throw new PasswordDoesNotMatchError();
            const isValid = this.emailValidator.validate(email);
            if (!isValid)
                throw new InvalidEmailError();
            const user = yield this.userRepository.findByEmail(email);
            if (user)
                throw new UserAlreadyExistsError();
            const newUser = yield this.userRepository.create({ full_name, email, password, role, creation_date });
            return newUser;
        });
    }
    ;
}
exports.UserRegistration = UserRegistration;
;
//# sourceMappingURL=userRegistration.js.map