export  const userFormDef = {
    username: {
        type: "text",
        label: "Username",
    },
    password: {
        type: "password",
        label: "Password",
    },
    firstName: {
        type: "text",
        label: "First Name",
        width: "sm-6",
    },
    lastName: {
        type: "text",
        label: "Last Name",
        width: "sm-6",
    },
    email: {
        type: "text",
        label: "Email",
        width: "sm-6",
    },
    nationalId: {
        type: "text",
        label: "National ID",
        width: "sm-6",
    },
    gender: {
        type: "options",
        label: "gender",
        default: "0",
        choice: [
            {"display": "Select", value: 0},
            {"display": "Male", value: 1},
            {"display": "Female", value: 2},
            {"display": "Other", value: 3},
        ],
        width: "sm-4",
    },
    birthdate: {
        type: "date",
        label: "Birthdate",
        width: "sm-4",
    },
    phoneNumber: {
        type: "text",
        label: "Phone Number",
        width: "sm-4",
    },
    address: {
        type: "text",
        label: "Address",
    },
    subdistrict: {
        type: "text",
        label: "Subdistrict",
        width: "sm-4",
    },
    district: {
        type: "text",
        label: "District",
        width: "sm-4",
    },
    cityState: {
        type: "text",
        label: "City/State",
        width: "sm-4",
    },
    country: {
        type: "text",
        label: "Country",
        width: "sm-4",
    },
    zipcode: {
        type: "text",
        label: "Zip Code",
        width: "sm-4",
    },
    userType: {
        type: "options",
        label: "I'm Regsitering as ...",
        default: 'H',
        choice: [
            {display: "Hiree", value: 'H'},
            {display: "Musician", value: 'M'}
        ],
        width: "sm-6"
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
