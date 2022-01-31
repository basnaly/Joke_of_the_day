
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const onClick = async () => {
    $(".backdrop").css("visibility", "visible");
    $(".modal-my").css("visibility", "visible").toggleClass("animate__backInDown animate__backOutUp");
    $(".modal-title").html("Today is " + getCurrentDate());
    let data = await sendRequest('GET', requestURL)
        console.log(data);  
    let joke = data.contents.jokes[0].joke.text;
    $(".modal-body").html(joke);
    let copyright = data.contents.copyright;
    $(".copyright").html(copyright);
  
}

const getCurrentDate = () => {
let todayDate = new Date();
let currentDate = +todayDate.getDate() + ' ' + 
        months[todayDate.getMonth()] + ' ' + 
        +todayDate.getFullYear() + ', ' + 
        days[todayDate.getDay()];
    console.log(currentDate);
    return currentDate;
};

const onClickOk = () => {
    $(".modal-my").toggleClass("animate__backOutUp animate__backInDown");
    $(".photo").css("opacity", "1");
    $(".backdrop").css("visibility", "hidden");
}

const requestURL = 'https://api.jokes.one/jod'

function sendRequest(method, url, body = null) {
    const headers = {
        'Content-Type': 'application/json'
    }

    let params = {
        method: method,
        body: JSON.stringify(body),
        headers: headers
    }

    if (!body) {
        params = {
        method: method,
        headers: headers
        }
    }

    return fetch(url, params)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            return response.json().then(error => {
                const e = new Error('Somthing wrong')
                e.data = error
                throw e
            })
        })
}
