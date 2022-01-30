
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



// $(function(){
//     getItems();
// })

// class Item {
//     constructor(itemName, price, amount, note, bought){
//         this.itemName = itemName;
//         this.price = +price;
//         this.amount = +amount;
//         this.note = note;
//         this.bought = bought;
//     }

//     async sendToServer() {
//         if (this.isValid() === false) {
//             return;
//         }
//         let result = await sendRequest('POST', requestURL+".json", {
//             "item": this.itemName,
//             "price": this.price,
//             "amount": this.amount,
//             "note": this.note,
//             "bought": this.bought
//             })
//             console.log(result);
//     }
    
//     isValid() {
//         if (!!this.itemName === false || !!this.amount === false) {
//             alert("Please enter the values")
//             return false;
//         }
//         return true;
//     }
// }



    


// const onClickSave = async () => {
//     let itemNameNew = $("#item").val();
//     let priceNew = $("#price").val();
//     let amountNew = $("#amount").val();
//     let noteNew = $("#note").val();
//     let boughtNew = $("#bought").is(":checked");
//     console.log(boughtNew);
//     const itemNew = new Item(itemNameNew, priceNew, amountNew, noteNew, boughtNew);
//     await itemNew.sendToServer();
//     getItems();
// } 

// const getItems = async () => {
//     let spinner = $(`<div class="spinner-border text-info" role="status">
//         <span class="visually-hidden">Loading...</span></div>`).css({
//             "position": "absolute",
//             "top": "30%", 
//             "right": "50%"
//         });
//     $("table").html(spinner);
    

// const buildTable = (data) => {
//     console.log(data);
//     let table = $("<table></table>");
//     let tr = $("<tr></tr>");
//     let th1 = $("<th></th>").html("Item");
//     let th2 = $("<th></th>").html("Price");
//     let th3 = $("<th></th>").html("Amount");
//     let th4 = $("<th></th>").html("Note");
//     let th5 = $("<th></th>").html("Bought");
//     let th6 = $("<th></th>").html("Delete");
//     $(tr).append([th1, th2, th3, th4, th5, th6]);
//     $(table).append(tr);

//     for (let key in data) {
//         let tr = $("<tr></tr>");
//         let td1 = $("<td></td>").html(data[key].item);
//         let td2 = $("<td></td>").html(data[key].price);
//         let td3 = $("<td></td>").html(data[key].amount);
//         let td4 = $("<td></td>").html(data[key].note);
//         let td5 = $("<td></td>").html(getBoughtIcon(data[key].bought));
//         let td6 = $("<td></td>");
//         let delButton = $(`<button><i class="fas fa-trash"></i></button>`)
//             .addClass("btn btn-outline-danger").click(onClickDelete.bind(key));
//         $(td6).append(delButton);
//         $(tr).append([td1, td2, td3, td4, td5, td6]);
//         $(table).append(tr);
//     }
//     $("table").html(table);
// }
// async function onClickDelete() {
//      console.log(this);
//     let data = await sendRequest('DELETE', requestURL + "/" + this + ".json")
//     console.log(data);  
//     getItems()
//  }

// const getBoughtIcon = (bought) => {
//     if (bought === true) {
//         return $(`<i class="far fa-check-square"></i>`);
//     }
//     if (bought === false) {
//         return $(`<i class="far fa-minus-square"></i>`);
//     }
// };
