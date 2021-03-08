export let orderData = {
    orderid: null,
    drivingDistance:[],
    amount: null,
    currency: null,
    status: null,
    createdDate: null,
    orderDate: null
}

export let advanceDate = getFutureDate();

function getFutureDate(){
let targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 10);
return targetDate.toISOString();
}

