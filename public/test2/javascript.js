/*LOG IN*/
var app=angular.module('test', ['ngRoute']);

app.config(function($routeProvider){

  $routeProvider.when('/login', {
    templateUrl: 'login.html',
    controller: 'loginctrl'
  })
    .when('/dashboard',{
      resolve:{
        check: function($location,$rootScope){

          if(!$rootScope.loggedIn){
            $location.path('/login.html');
          }

        }
      },
      templateUrl:'dashboard.html'

    })
    .when('/home',{

        resolve:{
          check: function($location,$rootScope){

            if(!$rootScope.loggedIn){
              $location.path('/login');
            }

          }
        },

        templateUrl:'home.html'
      })
    .when('/register',{

      resolve:{
        check: function($location,$rootScope){

          if(!$rootScope.loggedIn){
            $location.path('/login');
          }

        }
      },

      templateUrl:'register.html'
    })
    .otherwise({
      templateUrl:'login.html'
    });

});

app.controller('loginctrl',function($scope,$location,$rootScope,$http,$log)
{

  $scope.loginb = function() {
    if ($scope.maillogin =='popovici.tudor@yahoo.com' && $scope.passwordlogin =='asdasdasd') {
      $rootScope.loggedIn = true;


      $location.path('/dashboard');
      var ap=248;
      var str=$scope.maillogin+':'+$scope.passwordlogin+'@|@'+ap;
      var promise= $http({
        url:"https://api-test.insoftd.com/v1/client/login",
        method:'POST',
        headers:{'Authorization':'Basic '+ btoa(str),'Content-Type':'application/json'},
        data:{"email":"popovici.tudor@yahoo.com","password":"asdasdasd","api_key":"248"}
      })
        .then(function(data)
        {
          console.dir(data);
          if(data && data.data && data.data.records)
            var userSave = {
              id: data.data.records.user_details.id ,
              password: $scope.passwordlogin ,
              email: $scope.maillogin
            };
          console.dir(userSave);
          console.dir(JSON.stringify(userSave));
          $scope.maillogin=data.email;
          $scope.passwordlogin=data.password;
          ap=data.api_key;

          console.log("succes callback");
          console.log(data);
          $log.info(data);

          
          var store={
            email:$scope.maillogin ,
            password:$scope.passwordlogin
          };


          /*
          localStorage.setItem("store",JSON.stringify(store));*/

          /* var saveData=localStorage['ceva'];



           if(saveData!==undefined){
               store=JSON.parse(saveData);

           }

           localStorage['ceva']=JSON.stringify(store);

           console.log(localStorage);
*/


        });
    } else {
      alert('Enter again!');
    }
  };





  $scope.home=function(){
    $location.path('/home');
  };

  $scope.log=function(){
    $location.path('/login');
  };

  $scope.reg=function(){
    $location.path('/register');
  };
});
/*--------------------------------------*/
/*-------------------History--------------*/
app.controller=('history',function($scope,$http){
  $scope.loadFriends=function(){
    $http.get('https://api-test.insoftd.com/v1/client/booking?fields=(Booking.invoiced;Booking.transferred;Client.id_account;Client.observations%20as%20clobs;Client.mobile_number%20as%20cMNumber;Client.color;Client.name%20as%20cName;Booking.id_ref;Booking.id_shuttle;Booking.booster_seats_number;Booking.infant_seats_number;Booking.child_seats_number;Booking.flight_type;Booking.airline_name;Booking.display_name;Booking.pickup_duration_delay;Booking.landing_flight_time;Booking.landing_flight_number;Booking.departure_city;Booking.journey_type;Booking.duration;Booking.id_recurring_booking;Booking.booking_type;BookingCharge.total_journey;BookingCharge.override_driver_earnings;Booking.id_booking;Booking.source;Booking.status;Booking.pickup_time;Booking.pickup_address;Booking.dropoff_address;Booking.pickup_lat;Booking.pickup_lng;Booking.dropoff_lat;Booking.dropoff_lng;Booking.id_service;CarType.type;Booking.payment_method;Booking.passenger_name;Booking.passenger_mobile;Booking.observations;Driver.last_name;Driver.first_name;Driver.tag;Driver.id;Driver.mobile_number%20as%20driver_mobile;Booking.id_client;Booking.id_driver_to_car;WebBooker.name%20as%20wb_name;Payment.payment_status;Task.status%20as%20tStatus;Task.to_execute%20as%20tExecTime;Task.id%20as%20tId;Task.params%20as%20tParams;Booking.cancel_reason;Booking.id_pickup_zone;Booking.id_dropoff_zone;Booking.passengers_number;Booking.order_number;Booking.id_user;User.firstname%20as%20firstname;Booking.journey_waypoints)&q=[{"key":"Booking.id_client","op":"=", "value":"1"}]&limit=10')
      .succes(function(data){

        $scope.friends=data;

      }).error(function(){
      alert('O eroare neasteptata!');
    });
  }

});

/**********************************/
/*app.controller=('register' , function($scope){

  $scope.reg=function(){

    var nm=$scope.nume_r;
    var ml=$scope.mail_r;
    var mob=$scope.mobile_r;
    var pss=$scope.password_r;
    var cpss=$scope.c_password_r;
    var tp=$scope.type_r;

      var promise= $http({
          url:"https://api-test.insoftd.com/v1/client/client",
          method:'POST',
          headers:{'Authorization':'Basic '+ btoa(str),'Content-Type':'application/json'},
          data:{"Client":{
              "password":"asdasdasd",
              "payment_method":"cash",
              "title":"Personal",
              "blacklisted":"0",
              "auto_email":"1",
              "vat_charged":1,
              "name":"asdasdasdasd",
              "email":"asdasd@asdasd.com",
              "mobile_number":"0040122332123312",
              "account_source":"web-client"
          }}
      })
          .then(function(data)
          {
              console.dir(data);
             if($scope.password_r === $scope.c_password_r )
             {
                 $scope.password_r=data.Client.password;

             }



              console.log("succes callback");
              console.log(data);
              $log.info(data);

          });

  };

});
*/
