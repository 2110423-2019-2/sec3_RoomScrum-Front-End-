const MinLength = (length) => (value) => {
    if (!value) return "Required";
    if (value.length < length) return `Must be at least ${length} characters`;
}

const MatchRegex = (regex, msg) => (value) => {
    if (!value) return "Required";
    if (!msg) msg = `Must match regex ${regex}`;
    if (!regex.test(value)) return msg;
}

const Required = (msg) => (value) => {
    if (!msg) msg = "Required";
    if (!value) return msg;
}

export  const userFormDef = {
    username: {
        type: "text",
        label: "Username",
        validator: [
            (value) => {
                const usernameRegex = /^[a-z0-9_-]{3,15}$/;
                if (!value) return "Enter Username";
                if (value.length < 3) return "Must be at least 3 characters";
                if (value.length > 15) return "Must be at most 15 characters";
                if (!usernameRegex.test(value)) return "Must contain only A-Z a-z 0-9 _ -";
            }
        ]
    },
    password: {
        type: "password",
        label: "Password",
        width: "sm-6",
        validator: [
            MinLength(8),
        ]
    },
    confirmPassword: {
        type: "password",
        label: "Confirm Password",
        width: "sm-6",
        ignore: true,
        validator: [
            (value, form) => {
                if (form['password'].value !== value) return "must match password";
                else if (!value) return " ";
            }
        ]
    },
    firstName: {
        type: "text",
        label: "First Name",
        width: "sm-6",
        validator: [
            MinLength(3),
        ]
    },
    lastName: {
        type: "text",
        label: "Last Name",
        width: "sm-6",
        validator: [
            MinLength(3),
        ]
    },
    email: {
        type: "text",
        label: "Email",
        width: "sm-6",
        validator: [
            (value) => {
                const emailRegex = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/
                if (!value) return "Required";
                if (!emailRegex.test(value)) return "Must be valid email";
            }
        ]
    },
    nationalId: {
        type: "text",
        label: "National ID",
        width: "sm-6",
        validator: [
            MatchRegex(/^[0-9]{13}$/)
        ]
    },
    gender: {
        type: "options",
        label: "Gender",
        default: "0",
        choice: [
            {"display": "Select", value: 0},
            {"display": "Male", value: 1},
            {"display": "Female", value: 2},
            {"display": "Other", value: 3},
        ],
        width: "sm-4",
        validator: [
            (value) => {
                if (!value || value == 0) return " ";
            } 
        ]
    },
    birthdate: {
        type: "date",
        label: "Birthdate",
        width: "sm-4",
        validator: [
            Required(" ")
        ]
    },
    phoneNumber: {
        type: "text",
        label: "Phone Number",
        width: "sm-4",
        validator: [
            MatchRegex(/^0[0-9]{8,9}$/, "")
        ]
    },
    address: {
        type: "text",
        label: "Address",
        validator: [
            MinLength(3),
        ]
    },
    subdistrict: {
        type: "text",
        label: "Subdistrict",
        width: "sm-4",
        validator: [
            MinLength(3),
        ]
    },
    district: {
        type: "text",
        label: "District",
        width: "sm-4",
        validator: [
            MinLength(3),
        ]
    },
    cityState: {
        type: "text",
        label: "City/State",
        width: "sm-4",
        validator: [
            MinLength(3),
        ]
    },
    country: {
        type: "text",
        label: "Country",
        width: "sm-4",
        validator: [
            MinLength(3),
        ]
    },
    zipcode: {
        type: "text",
        label: "Zip Code",
        width: "sm-4",
        validator: [
            MatchRegex(/[0-9]{5}/)
        ]
    },
    userType: {
        type: "options",
        label: "I'm Regsitering as ...",
        default: 'H',
        choice: [
            {display: "Hiree", value: 'H'},
            {display: "Musician", value: 'M'}
        ],
        width: "sm-6",
    }
}

export const musicianFormDef = {
    bio: {
        type: "textarea",
        label: "Bio",
    },
    videoUrl: {
        type: "text",
        label: "Autdition Video"
    }
}
