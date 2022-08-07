import moment from "moment";
import { duration } from "moment";

const layOver = (durationOne,durationTwo) =>{
    // console.log(durationOne);
    // console.log(durationTwo);
    var ms = moment(durationOne,"YYYY/MM/DD HH:mm:ss a").diff(moment(durationTwo,"YYYY/MM/DD HH:mm:ss a"));
    // var d = moment(ms,"DD/MMMM/YYYY HH:mm:ss");
    // var s = d.format("hh:mm:ss");
    var seconds = Math.floor((ms / 1000) % 60);
    var minutes = Math.floor((ms / (1000 * 60)) % 60);
    var hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const time = hours+"h " + minutes+"m " ;


    // var date = moment.duration(moment(durationOne,"YYYY/MM/DD").diff(moment(durationTwo,"YYYY/MM/DD"))).asDays();
    // console.log(date);
    // + seconds+"s"
    // console.log(ms);
    // var min = Math.floor((ms/1000/60) << 0);
    // var sec = Math.floor((ms/1000) % 60);
    // console.log(hours, minutes,seconds);
   return time;
}

export default layOver;