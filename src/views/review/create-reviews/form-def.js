export const formReview = {
    description: {
        type: "textarea",
        label: "",
        width: "12",
        // default: "write a review",
        validator: [
          value => {
            if (value) return false;
            return " ";
          }
        ]
      }
};