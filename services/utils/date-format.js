export const formatDate = (eventDate) => {

    let monthNames =["Janvier","Fevrier",
                     "Mars","Avril",
                     "Mai","Juin",
                     "Juillet","Aout",
                     "Septembre", "Octobre",
                     "Novembre","Decembre"];

    let date = new Date(eventDate).toISOString().slice(0,10)
    let spliceDate = date.toString().split("-");

    let year = spliceDate[0]
    let month = monthNames[parseInt(spliceDate[1])]
    let day = spliceDate[2]

    return day + ' ' + month + ' ' + year ;
}