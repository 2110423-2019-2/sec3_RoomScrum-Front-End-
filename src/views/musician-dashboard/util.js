export const sortByTimestampDesc = (app1, app2) => {
    // you can subtract date directly!
    // console.log("date diff", new Date(app2) - new Date(app1));
    return new Date(app2.timestamp) - new Date(app1.timestamp);
}
