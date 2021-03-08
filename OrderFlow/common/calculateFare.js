import {orderData} from '../common/constant'

export const faresIsEqual =

function calculateAmount(){

    let expectedAmount;

    if (orderData.drivingDistance!=null && orderData.orderDate !=null){

        let totalDistance=0;

        for (let i=0 ; i<orderData.drivingDistance.length;i++){
            totalDistance=totalDistance+orderData.drivingDistance[i];
        }

        var date = new Date (orderData.orderDate);

        if (Number(date.getUTCHours()<=22) && Number(date.getUTCHours()>=5)){

                expectedAmount= (20+((totalDistance-2000)/200)*5);
                
                var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (2 || -1) + '})?');
                expectedAmount =expectedAmount.toString().match(re)[0];

                if (expectedAmount==orderData.amount){
                    return true;
                }
                else{
                    console.log (`calculation expected: ${expectedAmount} && calculation Actual: ${orderData.amount}`);
                    return false;
                }
        }
        else{

            expectedAmount= (30+((totalDistance-2000)/200)*8);
             var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (2 || -1) + '})?');
            expectedAmount =expectedAmount.toString().match(re)[0];

                if (expectedAmount==orderData.amount){
                    return true;
                }
                else{
                    console.log (`calculation expected: ${expectedAmount} && calculation Actual: ${orderData.amount}`);
                    return false;
                }
        }
    }
    else{
        console.log (`distance | time is null`);
    }
}
