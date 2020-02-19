export  const regsiterFormDef = {
    description: {
        type: "textarea",
        label: "Event Details",
        default: "lorem ipsum",
    },
    address: {
        type: "text",
        label: "Address",
        width: "sm-4"
    },
    subdistrict: {
        type: "text",
        label: "Subdistrict",
        width: "sm-8"
    },
    city_state: {
        type: "text",
        label: "City / State",
    },
    zipcode: {
        type: "text",
        label: "Zip Code",
        validator: [
            (value) => {
                if (/^[0-9]{5}$/.test(value)) return false;
                return "length must be 5";
            }
        ]
    },
    country: {
        type: "options",
        label: "Country",
        choice: [
            {
                display: "China",
                value: 1,
            },
            {
                display: "Thailand",
                value: 2,
            },
            {
                display: "USA",
                value: 3,
            }
        ]
    },
}
