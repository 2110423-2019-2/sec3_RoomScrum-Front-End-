// please use field name same as DTO

const createEventFormDefinition = {
    name: {
        type: "text",
        label: "Event Name",
        default: "foo",
        validator: [
            () => "Fake error",
            () => "Fake error2",
        ],
        width: "sm-6"
    },
    date: {
        type: "date",
        label: "Event Date",
        width: "sm-3",
    },
    description: {
        type: "text",
        label: "Event Details",
        default: "lorem ipsum",
        width: "sm-3",
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
        type: "text",
        label: "Country",
    },
}

export default createEventFormDefinition;