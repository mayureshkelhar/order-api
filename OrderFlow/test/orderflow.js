import { expect } from 'chai';
import { timeStamp } from 'console';
import supertest from 'supertest';
const request = supertest ('http://localhost:51544/v1/');

let orderData = {
    orderid: null,
    drivingDistance:[],
    amount: null,
    currency: null,
    status: null,
    createdDate: null,
    orderDate: null
}

/** Covered E-E test scenarios */

describe (`VALID TEST SCENARIOS`,()=>{

describe ('CREATE AND COMPLETE ORDER',()=>{
    it ('POST/ Order is CREATED',() =>{
 
       const data ={
        stops: [
            {
                "lat": 22.344674, "lng": 114.124651
            },
            {
                "lat": 22.375384, "lng": 114.182446
            },
            {
                "lat": 22.375384, "lng": 114.182446
            },
            
        ]
       }

       return request
       .post('orders')
       .send(data)
       .then((res)=>{

            expect (res.status).is.equal(201);
            expect (res.body.id).is.not.null;
            expect (res.body.drivingDistance).is.not.null;
            expect (res.body.fare.amount).is.not.null;
            expect (res.body.fare.currency).is.not.null;

            orderData.orderid = res.body.id;
            orderData.drivingDistance = res.body.drivingDistancesInMeters;
            orderData.amount = res.body.fare.amount;
            orderData.currency = res.body.fare.currency;
            
       });
    });

    it ('GET/ Order is ASSIGNED',() =>{
 
        return request
        .get(`orders/${orderData.orderid}`)
        .then((res)=>{

             expect (res.status).is.equal(200);
             expect (res.body.id).is.equal(orderData.orderid);
            
            for (var distanceParams = 0;distanceParams<orderData.drivingDistance.length;distanceParams++){
                expect (res.body.drivingDistancesInMeters[distanceParams]).is.equal(orderData.drivingDistance[distanceParams]);
            }
            
             expect (res.body.fare.amount).is.equal(orderData.amount);
             expect (res.body.fare.currency).is.equal(orderData.currency)
             expect (res.body.status).is.equal ("ASSIGNING");
            
             orderData.createdDate = res.body.createdTime;
             orderData.orderDate = res.body.orderDateTime;

             expect (calculateAmount()).to.be.true;
             
        });
     });
    
     it ('PUT/ Order is ONGOING',() =>{
 
        return request
        .put(`orders/${orderData.orderid}/take`)
        .then((res)=>{

            expect (res.status).is.equal(200);
            expect (res.body.id).is.equal(orderData.orderid);
            expect (res.body.status).is.equal("ONGOING");
            expect (res.body.ongoingTime).is.not.null;
             
        });
     });

     it ('PUT/ Order is COMPLETED ',() =>{
 
        return request
        .put(`orders/${orderData.orderid}/complete`)
        .then((res)=>{

            expect (res.status).is.equal(200);
            expect (res.body.id).is.equal(orderData.orderid);
            expect (res.body.status).is.equal("COMPLETED");
            expect (res.body.completedAt).is.not.null;
             
        });
     });
})

describe ('CANCELLED the ASSIGNED order',()=>{
    it ('POST/ Order is CREATED',() =>{
 
        const data ={
         stops: [
             {
                 "lat": 22.344674, "lng": 114.124651
             },
             {
                 "lat": 22.375384, "lng": 114.182446
             },
             
         ]
        }
 
        return request
        .post('orders')
        .send(data)
        .then((res)=>{
 
             expect (res.status).is.equal(201);
             expect (res.body.id).is.not.null;
            
             orderData.orderid = res.body.id;
             
        });
     });

     it ('GET/ Order is ASSIGNED',() =>{
 
        return request
        .get(`orders/${orderData.orderid}`)
        .then((res)=>{

             expect (res.status).is.equal(200);
             expect (res.body.id).is.equal(orderData.orderid);
             expect (res.body.status).is.equal ("ASSIGNING");
             
        });
     });

     it ('PUT/ Order is ASSIGNED-->CANCELLED',() =>{
 
        return request
        .put(`orders/${orderData.orderid}/cancel`)
        .then((res)=>{

             expect (res.status).is.equal(200);
             expect (res.body.id).is.equal(orderData.orderid);
             expect (res.body.status).is.equal ("CANCELLED");
             expect (res.body.cancelledAt).is.not.null;
             
        });
     });

 
});

describe ('CANCELLED the ONGOING order',()=>{
    it ('POST/ Order is CREATED',() =>{
 
        const data ={
         stops: [
            {
                "lat": 22.344674, "lng": 114.124651
            },
            {
                "lat": 22.375384, "lng": 114.182446
            },
             
         ]
        }
 
        return request
        .post('orders')
        .send(data)
        .then((res)=>{
 
             expect (res.status).is.equal(201);
             expect (res.body.id).is.not.null;
            
             orderData.orderid = res.body.id;
             
        });
     });

     it ('GET/ Order is ASSIGNED',() =>{
 
        return request
        .get(`orders/${orderData.orderid}`)
        .then((res)=>{

             expect (res.status).is.equal(200);
             expect (res.body.id).is.equal(orderData.orderid);
             expect (res.body.status).is.equal ("ASSIGNING");
             
        });
     });

     it ('PUT/ Order is ONGOING',() =>{
 
        return request
        .put(`orders/${orderData.orderid}/take`)
        .then((res)=>{

            expect (res.status).is.equal(200);
            expect (res.body.id).is.equal(orderData.orderid);
            expect (res.body.status).is.equal("ONGOING");
            expect (res.body.ongoingTime).is.not.null;
             
        });
     });

     it ('PUT/ Order is ONGOING->CANCELLED',() =>{
 
        return request
        .put(`orders/${orderData.orderid}/cancel`)
        .then((res)=>{

             expect (res.status).is.equal(200);
             expect (res.body.id).is.equal(orderData.orderid);
             expect (res.body.status).is.equal ("CANCELLED");
             expect (res.body.cancelledAt).is.not.null;
             
        });
     });

 
});

});

describe  ('CREATE ADVANCE ORDER',()=>{
    it ('POST/ Order is CREATED',() =>{
        
        const data ={
            orderAt: "2021-04-01T15:00:00.000Z",
            stops: [
               {
                   "lat": 22.344674, "lng": 114.124651
               },
               {
                   "lat": 22.375384, "lng": 114.182446
               },
                
            ]
           }
    
           return request
           .post('orders')
           .send(data)
           .then((res)=>{
    
            expect (res.status).is.equal(201);
            expect (res.body.id).is.not.null;
            expect (res.body.drivingDistance).is.not.null;
            expect (res.body.fare.amount).is.not.null;
            expect (res.body.fare.currency).is.not.null;

            orderData.orderid = res.body.id;
            orderData.drivingDistance = res.body.drivingDistancesInMeters;
            orderData.amount = res.body.fare.amount;
            orderData.currency = res.body.fare.currency;
                
           });
        });
        it ('GET/ Order is ASSIGNED',() =>{
 
            return request
            .get(`orders/${orderData.orderid}`)
            .then((res)=>{
    
                 expect (res.status).is.equal(200);
                 expect (res.body.id).is.equal(orderData.orderid);
                
                for (var distanceParams = 0;distanceParams<orderData.drivingDistance.length;distanceParams++){
                    expect (res.body.drivingDistancesInMeters[distanceParams]).is.equal(orderData.drivingDistance[distanceParams]);
                }
                
                 expect (res.body.fare.amount).is.equal(orderData.amount);
                 expect (res.body.fare.currency).is.equal(orderData.currency)
                 expect (res.body.status).is.equal ("ASSIGNING");
                
                 orderData.createdDate = res.body.createdTime;
                 orderData.orderDate = res.body.orderDateTime;
    
                 expect (calculateAmount()).to.be.true;
                 
            });
         });

});

describe  ('ERROR CASES/ INVALID SCENARIOS',()=>{
    it ('POST/ Back dated order should not created',() =>{
        
        const data ={
            orderAt: "2020-04-01T15:00:00.000Z",
            stops: [
               {
                   "lat": 22.344674, "lng": 114.124651
               },
               {
                   "lat": 22.375384, "lng": 114.182446
               },
                
            ]
           }
    
           return request
           .post('orders')
           .send(data)
           .then((res)=>{
    
            expect (res.status).is.equal(400);
            expect (res.body.message).is.equal ("field orderAt is behind the present time");
                
           });
        });
        it ('POST/ Order should not create without lat and lng coordinates',() =>{
 
            const data ={
                stops: [
                    
                ]
               }
        
               return request
               .post('orders')
               .send(data)
               .then((res)=>{
        
                expect (res.status).is.equal(400);
                    
               });
            });
                 
            it ('POST/ Validate behaviour with same coordinated of lat and lang',() =>{
 
                const data ={
                    stops: [
                        {
                            "lat": 22.385669, "lng": 114.186962
                        },
                        {
                            "lat": 22.385669, "lng": 114.186962
                        },
                        {
                            "lat": 22.385669, "lng": 114.186962
                        }                
                    ]
                   }
            
                   return request
                   .post('orders')
                   .send(data)
                   .then((res)=>{
            
                    expect (res.status).is.equal(201);
                        
                   });
            });

            it ('GET/ 404 for invalid order id while getting Assign order',() =>{
 
                return request
                .get(`orders/-1`)
                .then((res)=>{
        
                     expect (res.status).is.equal(404);
                     
                });
             });
            
             it ('PUT/ 404 for invalid Order id while take order',() =>{
 
                return request
                .put(`orders/-2/take`)
                .then((res)=>{
        
                    expect (res.status).is.equal(404);
                     
                });
             });

             it ('PUT/ 404 for invalid Order id while complete order',() =>{
 
                return request
                .put(`orders/-2/complete`)
                .then((res)=>{
        
                    expect (res.status).is.equal(404);
                     
                });
             });
             it ('PUT/ 404 for invalid Order id while cancel order',() =>{
 
                return request
                .put(`orders/-2/cancel`)
                .then((res)=>{
        
                    expect (res.status).is.equal(404);
                     
                });
             });

            
});


/** Function to calculate fare */


function calculateAmount(){

    let expectedAmount;

    if (orderData.drivingDistance!=null && orderData.orderDate !=null){

        let totalDistance=0;

        for (let i=0 ; i<orderData.drivingDistance.length;i++){
            totalDistance=totalDistance+orderData.drivingDistance[i];
        }

        var date = new Date (orderData.orderDate);

        if (Number(date.getUTCHours()<22) && Number(date.getUTCHours()>5)){

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