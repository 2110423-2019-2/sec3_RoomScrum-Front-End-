export const formReview = {
    review: {
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