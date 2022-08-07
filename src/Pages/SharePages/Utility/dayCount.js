import moment from "moment"

const dayCount = (durationOne,durationTwo) => {
    var dates = moment.duration(moment(durationOne,"YYYY-MM-DD").diff(moment(durationTwo,"YYYY-MM-DD"))).asDays();
    // console.log(dates,uniqueTransID);
    return dates
}

export default dayCount;