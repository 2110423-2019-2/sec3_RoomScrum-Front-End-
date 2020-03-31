export const formReview = {
    review: {
        type: "text",
        label: "",
        width: "sm-4",
        // default: "write a review",
        validator: [
          value => {
            if (value) return false;
            return " ";
          }
        ]
      }
};