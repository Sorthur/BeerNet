export class ValidationPassword {
    /**
     * @returns null if valid otherwise string with message
     */
    static checkIfPasswordIsCorrect(password: string): string | null {
        if (password.length < 6) {
            return 'Passwords must be at least 6 characters';
        }
        else if (password.match("^((?![a-z]).)*$")) {
            return "Passwords must have at least one lowercase ('a'-'z')";
        }
        else if (password.match("^((?![A-Z]).)*$")) {
            return "Passwords must have at least one uppercase ('A'-'Z')";
        }
        else if (password.match("^((?![0-9]).)*$")) {
            return "Passwords must have at least one digit ('0'-'9')";
        }
        else if (password.match(`^[^<>?:"{}|~!@#$%^&*()_+\`\\-=[\\]\;',.\\/]+$`)) {
            return 'Passwords must have at least one non alphanumeric character';
        }
        return null;
    }
}