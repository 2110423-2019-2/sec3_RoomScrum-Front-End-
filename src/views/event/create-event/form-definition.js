// please use field name same as DTO

export const formUpper = {
  eventName: {
    type: "text",
    label: "Event Name",
    // default: "foo",
    validator: [
      value => {
        if (value) return false;
        return "Event name must be filled";
      }
    ]
  },
  startDate: {
    type: "date",
    label: "Start Date",
    width: "sm-8",
    validator: [
      value => {
        if (value) return false;
        return " ";
      }
    ]
  },
  startTime: {
    type: "time",
    label: "⠀",
    width: "sm-4",
    validator: [
      value => {
        if (value) return false;
        return " ";
      }
    ]
  },
  endDate: {
    type: "date",
    label: "End Date",
    width: "sm-8",
    validator: [
      value => {
        if (value) return false;
        return " ";
      }
    ]
  },
  endTime: {
    type: "time",
    label: "⠀",
    width: "sm-4",
    validator: [
      value => {
        if (value) return false;
        return " ";
      }
    ]
  }
};

export const formBelow = {
  description: {
    type: "textarea",
    label: "Event Details",
    placeholder: "Enter text",
    validator: [
      value => {
        if (value) return false;
        return " ";
      }
    ]
  },
  address: {
    type: "text",
    label: "Address",
    // width: "sm-4",
    validator: [
      value => {
        if (value) return false;
        return " ";
      }
    ]
  },
  subdistrict: {
    type: "text",
    label: "Subdistrict",
    width: "sm-6",
    validator: [
      value => {
        if (value) return false;
        return " ";
      }
    ]
  },
  district: {
    type: "text",
    label: "District",
    width: "sm-6",
    validator: [
      value => {
        if (value) return false;
        return " ";
      }
    ]
  },
  province: {
    type: "text",
    label: "Province",
    width: "sm-6",
    validator: [
      value => {
        if (value) return false;
        return " ";
      }
    ]
  },
  country: {
    type: "text",
    label: "Country",
    width: "sm-6",
    validator: [
      value => {
        if (value) return false;
        return " ";
      }
    ]
    // choice: [
    //     {
    //         display: "China",
    //         value: 1,
    //     },
    //     {
    //         display: "Thailand",
    //         value: 2,
    //     },
    //     {
    //         display: "USA",
    //         value: 3,
    //     }
    // ]
  },
  zipcode: {
    type: "text",
    label: "Zip Code",
    width: "sm-4",
    validator: [
      value => {
        if (/^[0-9]{5}$/.test(value)) return false;
        return "length must be 5";
      }
    ]
  }
};
