$(document).ready(function(){
    
    var config = {
        apiKey: "AIzaSyBReukBAY3Hc7Xc8UCe13l0jgi-RUsPtno",
        authDomain: "train-ee2ba.firebaseapp.com",
        databaseURL: "https://train-ee2ba.firebaseio.com",
        projectId: "train-ee2ba",
        storageBucket: "",
        messagingSenderId: "168787422805"
      };
      firebase.initializeApp(config);

     var database = firebase.database();
     
     $("#submit").on("click", function(){
         
        var name = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#first-time").val().trim();
        var frequency = $("#frequency").val().trim();
        
        var add = {
            name : name,
            destination : destination,
            firstTrain : firstTrain,
            frequency : frequency,
            dataAdded: firebase.database.ServerValue.TIMESTAMP
        }
      
        database.ref().push(add);
     });
  
    database.ref().on("child_added", function(snapshot){
        
        var sp = snapshot.val();
        
        var addName = sp.name;
        var addDestination = sp.destination;
        var addFirstTrain = sp.firstTrain;
        var addFrequency = sp.frequency;

        var tFrequency =  sp.frequency;
        var firstTime = sp.firstTrain;

        var x = moment(firstTime, "hh:mm A");
        var firstTimeConverted = x;
        var currentTime = moment();
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % tFrequency;
        var tMinutesTillTrain = tFrequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var nextArrival = nextTrain.format("hh:mm A");
        console.log( moment(nextTrain));
        console.log(nextTrain);



       var addTrain = "<tr>";
           addTrain +="<td>" + addName + "</td>";
           addTrain +="<td>" + addDestination + "</td>";
           addTrain +="<td>" + addFrequency + "</td>";
           addTrain +="<td>" +  nextArrival + "</td>";
           addTrain +="<td>" + tMinutesTillTrain + "</td>";
           addTrain += "</tr>";


       $("#display").append(addTrain); 
       
    }, function(errorObject){
        console.log("error: "+ errorObject.code);
    })

})