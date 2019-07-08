const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.register_room= functions.https.onRequest((req, res) => {
    /* Instead use the admin */
    cors(req,res,()=>{});

    let fechaini = setDateLocaleStart(req.query.fechaini);
    let fechafin = setDateLocaleEnd(req.query.fechafin);
    const array = [];
    const ref = admin.database().ref('roomRegister');

    ref.on("value", function(snapshot) {
        snapshot.forEach(function(child) {
            if (child.val().date) {
                
                if (setDateLocaleStart(child.val().date)  >= fechaini && 
                    setDateLocaleEnd(child.val().date) <= fechafin) {
                    array.push(child.val())
                }
                
            }
            else{
                console.log('the obj contains date null')
            }

        });
        res.send(array);
    });
    
  });

  exports.registers_cash = functions.https.onRequest((req, res) => {
    /* Instead use the admin */
    cors(req,res,()=>{});

    let fechaini = setDateLocaleStart(req.query.fechaini);
    let fechafin = setDateLocaleEnd(req.query.fechafin);
    const array = [];
    const ref = admin.database().ref('CashRegister');

    ref.on("value", function(snapshot) {
        snapshot.forEach(function(child) {
            if (child.val().date) {
                
                if (setDateLocaleStart(child.val().date)  >= fechaini && 
                    setDateLocaleEnd(child.val().date) <= fechafin) {
                    array.push(child.val())
                }
                
            }
            else{
                console.log('the obj contains date null')
            }

        });
        res.send(array);
    });
    
  });

  function setDateLocaleStart(p_starDate) {
    let c_date = p_starDate;
    let arr = c_date.split("/")
    return new Date(arr[2], arr[1] - 1, arr[0], 23, 59, 59, 59);
  }

  function setDateLocaleEnd(p_endDate) {
    let c_date = p_endDate;
    let arr = c_date.split("/")
    return new Date(arr[2], arr[1] - 1, arr[0]);
  }
