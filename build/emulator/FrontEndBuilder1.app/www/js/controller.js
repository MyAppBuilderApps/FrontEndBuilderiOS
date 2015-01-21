var control = angular.module('starter.controllers', []);


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
   openFB.init('641205989329167');
}

 var options = {
  customSpinner : false,
  position : "middle",
  label : "Please Wait..",
  bgColor: "#000",
  opacity:0.5,
  color: "#fff"
 };
 
var googleapi = {
      setToken: function(data) {
          localStorage.access_token = data.access_token;
          localStorage.refresh_token = data.refresh_token || localStorage.refresh_token;
          var expiresAt = new Date().getTime() + parseInt(data.expires_in, 10) * 1000 - 60000;
          localStorage.expires_at = expiresAt;
      },
      authorize: function(options) {
          var deferred = $.Deferred();
          var authUrl = 'https://accounts.google.com/o/oauth2/auth?' + $.param({
                                                                               client_id: options.client_id,
                                                                               redirect_uri: options.redirect_uri,
                                                                               response_type: 'code',
                                                                               scope: options.scope
                                                                               });
          var authWindow = window.open(authUrl, '_blank', 'location=no,toolbar=yes');
          $(authWindow).on('loadstart', function(e) {
                          
                           var url = e.originalEvent.url;
                           var code = /\?code=(.+)$/.exec(url);
                           var error = /\?error=(.+)$/.exec(url);
                           
                           if (code || error) {
                            authWindow.close();
                           }
                           
                           if (code) {
                            $.post('https://accounts.google.com/o/oauth2/token', {
                                  code: code[1],
                                  client_id: options.client_id,
                                  client_secret: options.client_secret,
                                  redirect_uri: options.redirect_uri,
                                  grant_type: 'authorization_code'
                                  }).done(function(data) {
                                          googleapi.setToken(data);
                                          deferred.resolve(data);
                                          }).fail(function(response) {
                                                  deferred.reject(response.responseJSON);
                                                  });
                           } else if (error) {
                           deferred.reject({
                                           error: error[1]
                                           });
                           }
                           });
            return deferred.promise();
      },
      getToken: function(options) {
          var deferred = $.Deferred();
          if (new Date().getTime() < localStorage.expires_at) {
              deferred.resolve({
                               access_token: localStorage.access_token
                               });
          } else if (localStorage.refresh_token) {
              $.post('https://accounts.google.com/o/oauth2/token', {
                     refresh_token: localStorage.refresh_token,
                     client_id: options.client_id,
                     client_secret: options.client_secret,
                     grant_type: 'refresh_token'
                     }).done(function(data) {
                             googleapi.setToken(data);
                             deferred.resolve(data);
                             }).fail(function(response) {
                                     deferred.reject(response.responseJSON);
                                     });
          } else {
              deferred.reject();
          }
          
          return deferred.promise();
      },
      userInfo: function(options) {
          return $.getJSON('https://www.googleapis.com/oauth2/v1/userinfo', options);
      }
    };


var appkeyResult = '';
var appList = '';
var twitterKey = '';
var buttonArray = '';
var buttonarray1 = '';
var elementArray = '';
var buttonId = '';
var elementId = '';
var contentData = '';
var appKey = '';
var appTitle = '';
var Titles = '';
var listGrid = '';
var elementTitle= '';
var buttonTitle='';
var elementDesc = '';
var element='';
var formEmail='';

function exitout(button) {
                    if (button == 1) {
                        navigator.app.exitApp();
                    }else{
					
                    }
                    
                }
                
control.controller('loginCtrl',function($scope,$state,$ionicLoading,$ionicPlatform){

 $ionicPlatform.registerBackButtonAction(function () {
  navigator.notification.confirm(
                    'Are you sure you want to Exit?',
                    exitout,
                    'Please Confirm',
                    ["OK","CANCEL"]
            ); 
  
}, 100);
            
 if(localStorage["login"]){
    appkeyResult = JSON.parse(localStorage["login"]);
          //  alert(appkeyResult.api_key+" : "+appkeyResult.id);
    $ionicLoading.show({
       content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
       animation: 'fade-in',
       showBackdrop: true,
       maxWidth: 200,
       showDelay: 0
     });
        $.ajax({
                  type: "GET",
                  url: "http://build.myappbuilder.com/api/users.json",
                  data:{'api_key':appkeyResult.api_key,'id':appkeyResult.id},
                  cache: false,
                  success:function(response){
                    $ionicLoading.hide();
                    localStorage.sender_id = appkeyResult.id;
                    if(appkeyResult.username){
                      localStorage.appwallLoginData = appkeyResult.username;
                    }else{
                      localStorage.appwallLoginData = appkeyResult.name;
                    }
                    appList = response;
                    if(listGrid == ''){
          						$state.go('sample');
          					}else if(listGrid == 'list'){
          						$state.go('sample');
          					}else{
          						$state.go('sample');
          					}
                  },
                  error:function(error,status){
                    $ionicLoading.hide();
                    var error = JSON.parse(error.responseText);
                    if(error.error == "Unauthorized"){
                      navigator.notification.alert("Please Login")
                    }else {
                      navigator.notification.alert("Login Error!");
                    }
                  }
            });
  }
    

  

  $scope.loginFtn = function(){

    $ionicLoading.show({
			    content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
			    animation: 'fade-in',
			    showBackdrop: true,
			    maxWidth: 200,
			    showDelay: 0
			  });
    var userId = $('#userId').val();
    var password = $('#password').val();
    
    $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/login.json",
          data:{'login':userId,'password':password},
          success:function(response){
            
            appkeyResult = response;
            localStorage.sender_id = appkeyResult.id;
            if(appkeyResult.username){
                localStorage.appwallLoginData = appkeyResult.username;
            }else{
                localStorage.appwallLoginData = appkeyResult.name;
            }

            $.ajax({
                  type: "GET",
                  url: "http://build.myappbuilder.com/api/users.json",
                  data:{'api_key':appkeyResult.api_key,'id':appkeyResult.id},
                  cache: false,
                  success:function(response){
					//  alert(JSON.stringify(response));
                    $ionicLoading.hide();
                    appList = response;
                    localStorage["login"] = JSON.stringify(appkeyResult);
                    $state.go('sample');
          				},
                  error:function(error,status){
                    $ionicLoading.hide();
                    navigator.notification.alert(error.responseText)
                  }
            });
            
          },
          error:function(error,status){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);
            if(error.error == "Unauthorized"){
              navigator.notification.alert("Please Check Your UserId or Password!")
            }else {
              navigator.notification.alert("Login Error!");
            }
          }
    });
  };


  $scope.registerPageCallFtn =function(){
    $state.go('register');
  };
 
  $scope.fbLogin = function(){
    openFB.login('email',
        function() {
            openFB.api({
              path: '/me',
              success: function(responcedata) {
                //  alert(JSON.stringify(responcedata));
                  $ionicLoading.show({
                                    content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
                                    animation: 'fade-in',
                                    showBackdrop: true,
                                    maxWidth: 200,
                                    showDelay: 0
                                  });
                  $.ajax({
                        type: "POST",
                        url: "http://build.myappbuilder.com/api/login.json",
                        data:{'uid':responcedata.id,'provider':"facebook"},
                        success:function(response){
							// alert(JSON.stringify(response));
                          appkeyResult = response;
                          localStorage.sender_id = appkeyResult.id;
							//alert(JSON.stringify( localStorage.sender_i));
                          if(appkeyResult.username){
                            localStorage.appwallLoginData = appkeyResult.username;
                          }else{
                            localStorage.appwallLoginData = appkeyResult.name;
                          }

                          $.ajax({
                                type: "GET",
                                url: "http://build.myappbuilder.com/api/users.json",
                                data:{'api_key':appkeyResult.api_key,'id':appkeyResult.id},
                                cache: false,
                                success:function(response){
									//alert(JSON.stringify(response));
                                  $ionicLoading.hide();
                                  appList = response;
                                  localStorage["login"] = JSON.stringify(appkeyResult);
                                  if(listGrid == ''){
                                    $state.go('sample');
                                  }else if(listGrid == 'list'){
                                    $state.go('sample');
                                  }else{
                                    $state.go('sample');
                                  }
                                },
                                error:function(error,status){
                                  $ionicLoading.hide();
                                  navigator.notification.alert(error.responseText)
                                }
                          });
                          
                        },
                        error:function(error,status){
                          $ionicLoading.show({
                                    content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
                                    animation: 'fade-in',
                                    showBackdrop: true,
                                    maxWidth: 200,
                                    showDelay: 0
                                  });
                          var error = JSON.parse(error.responseText);
                         // alert(JSON.stringify(error));
                          $.ajax({
                              type: "POST",
                              url: "http://build.myappbuilder.com/api/users.json",
                                 data:{'name':responcedata.name,'username':responcedata.name,'identity[uid]':responcedata.id,'identity[provider]':'facebook'},

                              cache:false,
                              success:function(response){
                                appkeyResult = response;
                                localStorage.sender_id = appkeyResult.id;
                                if(appkeyResult.username){
                                  localStorage.appwallLoginData = appkeyResult.username;
                                }else{
                                  localStorage.appwallLoginData = appkeyResult.name;
                                }

                                $.ajax({
                                      type: "GET",
                                      url: "http://build.myappbuilder.com/api/users.json",
                                      data:{'api_key':appkeyResult.api_key,'id':appkeyResult.id},
                                      cache: false,
                                      success:function(response){
                                        $ionicLoading.hide();
                                        appList = response;
                                        localStorage["login"] = JSON.stringify(appkeyResult);
                                        if(listGrid == ''){
                    											$state.go('sample');
                    										}else if(listGrid == 'list'){
                    											$state.go('sample');
                    										}else{
                    											$state.go('sample');
                    										}
                                      },
                                      error:function(error,status){
                                        $ionicLoading.hide();
                                        navigator.notification.alert(error.responseText)
                                      }
                                });
                              },
                              error:function(error){
                                $ionicLoading.hide();
                                navigator.notification.alert(error.responseText)
                              }
                            });
                         
                        }
                  });
                  
              },
              error: function(error) {
                  console.log(error.message);
                   $ionicLoading.hide();
              }
            });
        },
        function(error) {
          console.log('Facebook login failed: ' + error.error_description);
        });
  }

  $scope.twitterLogin = function(){
            var oauth; // It Holds the oAuth data request
            var requestParams; // Specific param related to request
            var options = {
               consumerKey: 'cwDbygLqumFkxZ9pfUXSm6pqc', // YOUR Twitter CONSUMER_KEY
                consumerSecret: '9VVKkraN3oA6ipDJtwJ5KbLwySd1lm4AIPm48JIrwAp2OAkluf', // YOUR Twitter CONSUMER_SECRET
                callbackUrl: "http://nuatransmedia.com/" }; // YOU have to replace it on one more Place                   
            twitterKey = "tTWnGny5Oydp0Zo3BVYg03BDl"; // This key is used for storing Information related
            var ref;              
                     
            var Twitter = {
                init:function(){
                      var storedAccessData, rawData = localStorage.getItem(twitterKey);
                      if(localStorage.getItem(twitterKey) !== null){
                      storedAccessData = JSON.parse(rawData); //JSON parsing
                      options.accessTokenKey = storedAccessData.accessTokenKey; // data will be saved when user first time signin
                      options.accessTokenSecret = storedAccessData.accessTokenSecret; // data will be saved when user first first signin
                          oauth = OAuth(options);
                          oauth.get('https://api.twitter.com/1.1/account/verify_credentials.json?skip_status=true',
                              function(data) {
                                  var entry = JSON.parse(data.text);
                                  //console.log("USERNAME: " + JSON.stringify(entry));
                                  
                                  $ionicLoading.show({
                                    content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
                                    animation: 'fade-in',
                                    showBackdrop: true,
                                    maxWidth: 200,
                                    showDelay: 0
                                  });
                                  $.ajax({
                                    type: "POST",
                                    url: "http://build.myappbuilder.com/api/login.json",
                                    data:{'uid':entry.id,'provider':"twitter"},
                                    success:function(response){
                                      appkeyResult = response;
                                      localStorage.sender_id = appkeyResult.id;

                                      if(appkeyResult.username){
                                        localStorage.appwallLoginData = appkeyResult.username;
                                      }else{
                                        localStorage.appwallLoginData = appkeyResult.name;
                                      }

                                      $.ajax({
                                            type: "GET",
                                            url: "http://build.myappbuilder.com/api/users.json",
                                            data:{'api_key':appkeyResult.api_key,'id':appkeyResult.id},
                                            cache: false,
                                            success:function(response){
                                              $ionicLoading.hide();
                                              appList = response;
                                              localStorage["login"] = JSON.stringify(appkeyResult);
                                              	if(listGrid == ''){
                        													$state.go('sample');
                        												}else if(listGrid == 'list'){
                        													$state.go('sample');
                        												}else{
                        													$state.go('sample');
                        												}
                                            },
                                            error:function(error,status){
                                              $ionicLoading.hide();
                                              navigator.notification.alert(error.responseText)
                                            }
                                      });
                                    },
                                    error:function(error){
                                        var error = JSON.parse(error.responseText);
                                        if(error.error == "Unauthorized"){
                                          //navigator.notification.alert("Please Check Your UserId or Password!")
                                          $.ajax({
                                            type: "POST",
                                            url: "http://build.myappbuilder.com/api/users.json",
                                            data:{'name':entry.name,'username':entry.screen_name,'identity[uid]':entry.id,'identity[provider]':'twitter'},
                                            cache:false,
                                            success:function(response){
                                              appkeyResult = response;
                                              localStorage.sender_id = appkeyResult.id;
                                              if(appkeyResult.username){
                                                localStorage.appwallLoginData = appkeyResult.username;
                                              }else{
                                                localStorage.appwallLoginData = appkeyResult.name;
                                              }

                                              $.ajax({
                                                    type: "GET",
                                                    url: "http://build.myappbuilder.com/api/users.json",
                                                    data:{'api_key':appkeyResult.api_key,'id':appkeyResult.id},
                                                    cache: false,
                                                    success:function(response){
                                                      $ionicLoading.hide();
                                                      appList = response;
                                                      localStorage["login"] = JSON.stringify(appkeyResult);
                                                      	if(listGrid == ''){
                            														    $state.go('sample');
                            														}else if(listGrid == 'list'){
                            														    $state.go('sample');
                            														}else{
                            														    $state.go('sample');
                            														}
                                                    },
                                                    error:function(error,status){
                                                      $ionicLoading.hide();
                                                      navigator.notification.alert(error.responseText)
                                                    }
                                              });
                                            },
                                            error:function(error){
                                              $ionicLoading.hide();
                                              navigator.notification.alert(error.responseText)
                                            }
                                          });
                                        }else {
                                          $ionicLoading.hide();
                                          navigator.notification.alert("Login Error!");
                                        }
                                    }
                                  });
                                 
                              },function(data){
                                  $ionicLoading.hide();
                                  console.log("ERROR: "+JSON.stringify(data));
                              }

                          );
                      }
                      else {
                          oauth = OAuth(options);
                          oauth.get('https://api.twitter.com/oauth/request_token',
                              function(data) {
                                  requestParams = data.text;
                                  ref = window.open('https://api.twitter.com/oauth/authorize?'+data.text, '_blank', 'location=no,toolbar=no');
                                  ref.addEventListener('loadstop', function(event) { Twitter.success(event.url);});
                              },
                              function(data) {
                                  console.log("ERROR: "+data);
                              }
                         
                          );
                      }
                },
                success:function(loc){
                            if (loc.indexOf("http://nuatransmedia.com/?") >= 0) {
                                var index, verifier = '';
                                var params = loc.substr(loc.indexOf('?') + 1);
                                 
                                params = params.split('&');
                                for (var i = 0; i < params.length; i++) {
                                    var y = params[i].split('=');
                                    if(y[0] === 'oauth_verifier') {
                                        verifier = y[1];
                                    }
                                }
                                oauth.get('https://api.twitter.com/oauth/access_token?oauth_verifier='+verifier+'&'+requestParams,
                                          function(data) {
                                          var accessParams = {};
                                          var qvars_tmp = data.text.split('&');
                                          for (var i = 0; i < qvars_tmp.length; i++) {
                                          var y = qvars_tmp[i].split('=');
                                          accessParams[y[0]] = decodeURIComponent(y[1]);
                                          }
                                           
                                          
                                          oauth.setAccessToken([accessParams.oauth_token, accessParams.oauth_token_secret]);
                                          var accessData = {};
                                          accessData.accessTokenKey = accessParams.oauth_token;
                                          accessData.accessTokenSecret = accessParams.oauth_token_secret;
                                        //  console.log("TWITTER: Storing token key/secret in localStorage");
                                          localStorage.setItem(twitterKey, JSON.stringify(accessData));
                                           
                                          oauth.get('https://api.twitter.com/1.1/account/verify_credentials.json?skip_status=true',
                                                  function(data) {
                                                    var entry = JSON.parse(data.text);
                                                    //console.log("TWITTER USER: "+JSON.stringify(entry));
                                                    $ionicLoading.show({
                                                      content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
                                                      animation: 'fade-in',
                                                      showBackdrop: true,
                                                      maxWidth: 200,
                                                      showDelay: 0
                                                    });
                                                    $.ajax({
                                                        type: "POST",
                                                        url: "http://build.myappbuilder.com/api/login.json",
                                                        data:{'uid':entry.id,'provider':"twitter"},
                                                        success:function(response){
                                                          appkeyResult = response;
                                                          localStorage.sender_id = appkeyResult.id;

                                                          if(appkeyResult.username){
                                                            localStorage.appwallLoginData = appkeyResult.username;
                                                          }else{
                                                            localStorage.appwallLoginData = appkeyResult.name;
                                                          }  

                                                          $.ajax({
                                                                type: "GET",
                                                                url: "http://build.myappbuilder.com/api/users.json",
                                                                data:{'api_key':appkeyResult.api_key,'id':appkeyResult.id},
                                                                cache: false,
                                                                success:function(response){
                                                                  $ionicLoading.hide();
                                                                  appList = response;
                                                                  localStorage["login"] = JSON.stringify(appkeyResult);
                                                                  	if(listGrid == ''){
                            														                      $state.go('sample');
                            														            }else if(listGrid == 'list'){
                            														                      $state.go('sample');
                            														            }else{
                            														                      $state.go('sample');
                            														            }
                                                                },
                                                                error:function(error,status){
                                                                  $ionicLoading.hide();
                                                                  navigator.notification.alert(error.responseText)
                                                                }
                                                          });
                                                        },
                                                        error:function(error){
                                                            var error = JSON.parse(error.responseText);
                                                            if(error.error == "Unauthorized"){
                                                              //navigator.notification.alert("Please Check Your UserId or Password!")
                                                              $.ajax({
                                                                type: "POST",
                                                                url: "http://build.myappbuilder.com/api/users.json",
                                                                data:{'name':entry.name,'username':entry.screen_name,'identity[uid]':entry.id,'identity[provider]':'twitter'},
                                                                cache:false,
                                                                success:function(response){
                                                                  appkeyResult = response;
                                                                  localStorage.sender_id = appkeyResult.id;

                                                                  if(appkeyResult.username){
                                                                    localStorage.appwallLoginData = appkeyResult.username;
                                                                  }else{
                                                                    localStorage.appwallLoginData = appkeyResult.name;
                                                                  }

                                                                  $.ajax({
                                                                        type: "GET",
                                                                        url: "http://build.myappbuilder.com/api/users.json",
                                                                        data:{'api_key':appkeyResult.api_key,'id':appkeyResult.id},
                                                                        cache: false,
                                                                        success:function(response){
                                                                          $ionicLoading.hide();
                                                                          appList = response;
                                                                          localStorage["login"] = JSON.stringify(appkeyResult);
                                                                          	if(listGrid == ''){
                            														                      $state.go('sample');
                            														                    }else if(listGrid == 'list'){
                            														                      $state.go('sample');
                            														                    }else{
                            														                      $state.go('sample');
                            														                    }
                                                                        },
                                                                        error:function(error,status){
                                                                          $ionicLoading.hide();
                                                                          navigator.notification.alert(error.responseText)
                                                                        }
                                                                  });
                                                                },
                                                                error:function(error){
                                                                  $ionicLoading.hide();
                                                                  navigator.notification.alert(error.responseText)
                                                                }
                                                              });
                                                            }else {
                                                              $ionicLoading.hide();
                                                              navigator.notification.alert("Login Error!");
                                                            }
                                                        }
                                                      });
                                                  
                                                  },
                                                  function(data) {
                                                    $ionicLoading.hide();
                                                    console.log("ERROR: " + data);
                                                  }
                                          );
                                          ref.close();
                                          },
                                          function(data) {
                                            //console.log("Hello: :-"+data);
                                            ref.close();
                                          }
                                );
                            }
                            else {
                                //ref.close();
                            }
                        }
 
                    }

                    Twitter.init();
  }
  
 $scope.googleLogin = function(){
    var googleapp = {
      client_id: "329505025990-ufqrgtn9p5l9jdj3emuspdce04knvlcs.apps.googleusercontent.com",
      client_secret: "dljPcfIJVxpU1Tnb4GhaWBYp",
      redirect_uri: "http://localhost",
      scope: 'https://www.googleapis.com/auth/userinfo.profile',
      init: function() {
         
          googleapi.getToken({
                             client_id: this.client_id,
                             client_secret: this.client_secret
                             }).done(function() {
                                     googleapp.showGreetView();
                  
                                     }).fail(function() {
                                             googleapp.showLoginView();
                                             });
      },
      showLoginView: function() {
    
      },
      showGreetView: function() {
            googleapi.getToken({
                             client_id: this.client_id,
                             client_secret: this.client_secret
                             }).then(function(data) {
                                     return googleapi.userInfo({ access_token: data.access_token });
                                     }).done(function(user) {
                                            var res = JSON.stringify(user);
                                           console.log(res);
                                             alert(res);
                                              $ionicLoading.show({
                                                content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
                                                animation: 'fade-in',
                                                showBackdrop: true,
                                                maxWidth: 200,
                                                showDelay: 0
                                              });
                                             // alert(user.id);
                                                    $.ajax({
                                                        type: "POST",
                                                        url: "http://build.myappbuilder.com/api/login.json",
                                                        data:{'uid':user.id,'provider':"google_oauth2"},
                                                        success:function(response){
                                                          appkeyResult = response;
                                                          localStorage.sender_id = appkeyResult.id;

                                                          if(appkeyResult.username){
                                                            localStorage.appwallLoginData = appkeyResult.username;
                                                          }else{
                                                            localStorage.appwallLoginData = appkeyResult.name;
                                                          }

                                                          $.ajax({
                                                                type: "GET",
                                                                url: "http://build.myappbuilder.com/api/users.json",
                                                                data:{'api_key':appkeyResult.api_key,'id':appkeyResult.id},
                                                                cache: false,
                                                                success:function(response){
                                                                  $ionicLoading.hide();
                                                                  appList = response;
                                                                  localStorage["login"] = JSON.stringify(appkeyResult);
                                                                  	if(listGrid == ''){
                            														                      $state.go('sample');
                            														                    }else if(listGrid == 'list'){
                            														                      $state.go('sample');
                            														                    }else{
                            														                      $state.go('sample');
                            														                    }
                            														          
                                                                },
                                                                error:function(error,status){
                                                                  $ionicLoading.hide();
                                                                  navigator.notification.alert(error.responseText)
                                                                }
                                                          });
                                                        },
                                                        error:function(error){
                                                            var error = JSON.parse(error.responseText);
                                                         
                                                           
                                                              $.ajax({
                                                                type: "POST",
                                                                url: "http://build.myappbuilder.com/api/users.json",
                                                                     data:{'name':user.name,'username':user.name,'identity[uid]':user.id,'identity[provider]':'google_oauth2'},

                                                                cache:false,
                                                                success:function(response){
                                                                  appkeyResult = response;
                                                                  localStorage.sender_id = appkeyResult.id;

                                                                  if(appkeyResult.username){
                                                                    localStorage.appwallLoginData = appkeyResult.username;
                                                                  }else{
                                                                    localStorage.appwallLoginData = appkeyResult.name;
                                                                  }  

                                                                  $.ajax({
                                                                        type: "GET",
                                                                        url: "http://build.myappbuilder.com/api/users.json",
                                                                        data:{'api_key':appkeyResult.api_key,'id':appkeyResult.id},
                                                                        cache: false,
                                                                        success:function(response){
                                                                          $ionicLoading.hide();
                                                                          appList = response;
                                                                          localStorage["login"] = JSON.stringify(appkeyResult);
                                                                          	if(listGrid == ''){
                            														                      $state.go('sample');
                            														                    }else if(listGrid == 'list'){
                            														                      $state.go('sample');
                            														                    }else{
                            														                      $state.go('sample');
                            														                    }
                                                                        },
                                                                        error:function(error,status){
                                                                          $ionicLoading.hide();
                                                                          navigator.notification.alert(error.responseText)
                                                                        }
                                                                  });
                                                                },
                                                                error:function(error){
                                                                  $ionicLoading.hide();
                                                                  navigator.notification.alert(error.responseText)
                                                                }
                                                              });
                                                           
                                                        }
                                                      });
                                             
                                             }).fail(function() {
                                                     googleapp.showLoginView();
                                                     });
      },

    };
  googleapp.init();
    googleapi.authorize({
                  client_id: "912532492266-10ivhj0e821bs1g3vm7egqv4unubt364.apps.googleusercontent.com",
				  client_secret: "dljPcfIJVxpU1Tnb4GhaWBYp",
				  redirect_uri: "http://localhost",
                        scope: 'https://www.googleapis.com/auth/userinfo.profile'
                        }).done(function() {
                                //Show the greet view if access is granted
                                googleapp.showGreetView();
                               
                                }).fail(function(data) {
                                        //Show an error message if access was denied
                                       alert(data.error);
                                        });
  }
 });
 
 

control.controller('registerCtrl',function($scope,$state,$ionicLoading,$ionicPopup,$ionicModal,$ionicScrollDelegate){
  $scope.registerPageSubmitFtn = function(){
    $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
            });
    var Name = $('#regName').val();
    var regUserId = $('#regUserId').val();
    var regEmail = $('#regEmail').val();
    var regPassword = $('#regPassword').val();
    var regConfirmPassword = $('#regConfirmPassword').val();

    $.ajax({
      type: "POST",
      url: "http://build.myappbuilder.com/api/users.json",
      data:{'name':Name,'username':regUserId,'email':regEmail,'password':regPassword,'password_confirmation':regConfirmPassword},
      cache:false,
      success:function(response){
       // alert("sucee: "+JSON.stringify(response));
          appkeyResult = response;
          localStorage.sender_id = appkeyResult.id;

         if(appkeyResult.username){
                      localStorage.appwallLoginData = appkeyResult.username;
          }else{
                      localStorage.appwallLoginData = appkeyResult.name;
          }

          $.ajax({
                  type: "GET",
                  url: "http://build.myappbuilder.com/api/users.json",
                  data:{'api_key':appkeyResult.api_key,'id':appkeyResult.id},
                  cache: false,
                  success:function(response){
                    $ionicLoading.hide();
                   appList = response;
                   localStorage["login"] = JSON.stringify(appkeyResult);
                     if(listGrid == ''){
						$state.go('sample');
                     }else if(listGrid == 'list'){
						$state.go('sample');
                     }else{
						$state.go('sample');
                     }
                     
                  },
                  error:function(error,status){
                    $ionicLoading.hide();
                    navigator.notification.alert(error.responseText)
                  }
          });
      },
      error:function(error,status){
          $ionicLoading.hide();
          navigator.notification.alert(error.responseText);
      }
    });
  }

  $scope.registerBack = function(){
    $state.go('login');
  }
 
 });


var AppTitle = '';
var AppDesc = '';
var Appwall = '';
var appDesc='';
var appimg='';
var appdom='';
var appsubdomain='';
var splash='';
var store='';
var appbar='';
var appbutton='';
var appbuttonbar='';

control.controller('sampleCtrl',function($scope,$state,$ionicLoading,$ionicPopup,$ionicScrollDelegate){
                                                          
     $scope.appKey = appList.apps;
     
  $ionicScrollDelegate.scrollTop();

 $scope.AppEditor =false;

  for(var i =0;i<(appList.apps).length;i++){
    if((appList.apps[i]).app_image == null){
         (appList.apps[i]).app_image = "img/no_image.png";

    }
  }
  
 $scope.listViewClickFtn = function(appId,appTit){
	 
  $scope.appKey = appList.apps;

    appKey = appId;
    appTitle = appTit;
    $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
            });
              $.ajax({
                  type: "GET",
                  url: "http://build.myappbuilder.com/api/buttons.json",
                  data:{'api_key':appId},
                  cache: false,
                  success:function(response){
                    
                // alert(JSON.stringify(response))
                    buttonArray = response;

                    $.ajax({url:'http://build.myappbuilder.com/api/app_wall_settings.json', type:"GET",data:{'api_key':appKey},
                      success:function(response){
                          Appwall = response;
                          $ionicLoading.hide();
                     $state.go('app');
                    // $state.reload();
                      },
                      error:function(){
                          $ionicLoading.hide();
                          alert("Failure");
                      }
                    });
                    
                  },
                  error:function(error,status){
                    $ionicLoading.hide();
                    navigator.notification.alert(error.responseText);
                  }
    });
    
      $.ajax({
                  type: "GET",
                  url: "http://build.myappbuilder.com/api/apps/general.json",      
                  data:{'api_key':appId},
                  cache: false,
                  success:function(response){
                // alert(JSON.stringify(response));
                            $ionicLoading.hide();
                            appKey = appId;						
							colour=response.bar_color;
							buttoncolour=response.bar_button_color;
							button=response.button_color;						
				
                          },
                          error:function(error,status){
                            $ionicLoading.hide();
                            navigator.notification.alert(error.responseText);
                          }
                    });
                    
  }	
 
 
 $scope.newapps = function(){
  $state.go('newapp');     
  }; 
  
   $scope.logout = function(){
	  localStorage["login"] = [];
	  openFB.revokePermissions(function() {console.log('Permissions revoked');},function(error){console.log(error.message);});
    window.localStorage.removeItem(twitterKey);
  $state.go('login');     
  }; 
  
   $scope.editapps = function(){
    if($scope.AppEditor == false){
      $scope.AppEditor = true;
    }else{
      $scope.AppEditor =false;
    }
  }
  
   $scope.editApp = function(appId){
	$ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
            });
   
        $.ajax({
                  type: "GET",
                  url: "http://build.myappbuilder.com/api/apps/general.json",      
                  data:{'api_key':appId},
                  cache: false,
                  success:function(response){
                // alert(JSON.stringify(response));
                            $ionicLoading.hide();
                            appKey = appId;
							appTitle = response.title;
							appDesc = response.description;
							appimg = response.app_image;
							appdom=response.domain;
							appsubdomain=response.subdomain;					
							splash=response.splash_image;
							store=response.app_store_image;
							
							colour=response.bar_color;
							buttoncolour=response.bar_button_color; 			
							button= response.button_color; 
							 twitter=response.twitter_username;
							  fb=response.facebook_link;
							  gplus=response.gplus_link;
							  youtube=response.youtube_link;
							  flickr=response.flickr_link;
							  pin=response.pinterest_link;
							  fbkey=response.facebook_key;
							  fbsecret=response.facebook_secret;
							  twitterkey=response.twitter_key;
							  twittersecret=response.twitter_secret;
							  gpluskey=response.gplus_key;
							  gplussecret=response.gplus_secret;
								 
							$state.go('editApp');
				
                          },
                          error:function(error,status){
                            $ionicLoading.hide();
                            navigator.notification.alert(error.responseText);
                          }
                    });
  }
  
    $scope.deleteApp = function(appId,item){
    var confirmPopup = $ionicPopup.confirm({
     title: 'App Delete!',
     template: 'Are you sure you want to delete this App?'
    });
    confirmPopup.then(function(res) {
     if(res) {
        $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
            });
   
        $.ajax({
                  type: "DELETE",
                  url: "http://build.myappbuilder.com/api/apps.json",
                  data:{'api_key':appkeyResult.api_key,'book_api_key':appId},
                  cache: false,
                  success:function(response){
                     
                    // alert(JSON.stringify(response));
                     $.ajax({
                          type: "GET",
                          url: "http://build.myappbuilder.com/api/users.json",
                          data:{'api_key':appkeyResult.api_key,'id':appkeyResult.id},
                          cache: false,
                          success:function(response){
							  
                           // alert(JSON.stringify(response));
                            $ionicLoading.hide();
                            appList = response;
                            $scope.appKey.splice($scope.appKey.indexOf(item), 1);
                            $state.reload();
                          },
                          error:function(error,status){
                            $ionicLoading.hide();
                            navigator.notification.alert(error.responseText);
                          }
                    });
                  },
                  error:function(error,status){
                    $ionicLoading.hide();
                    navigator.notification.alert("status")
                  }
        });

      } else {
         console.log('You are not sure');
       }
     });
  }
});
  
var colour = '';
var buttoncolour = '';
var button='';
var testimg='';
var Data='';
var appdomain='';
var chapterEdit='';
var imageapp='';
var imagesplash='';
var imageappstore='';

control.controller('newappCtrl',function($scope,$state,$ionicActionSheet,$ionicModal,$ionicPopup,$ionicLoading,$sce,$http,$ionicScrollDelegate){

imagesplash = '';
imageapp = '';
imageappstore = '';

    $ionicScrollDelegate.scrollTop();

  var imageField_name;
  
 $scope.home = function(){
   $state.go('sample');
  }
  
$scope.bar_color = 'bar-positive';
$scope.button_color = 'button-positive';
$scope.bar_button_color ='button-positive'; 

 $scope.tinymceOptions = {
        

        menubar: false,
        theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor searchreplace",
            "wordcount visualblocks visualchars code fullscreen insertdatetime",
            "table contextmenu emoticons textcolor",

        ],
        toolbar1: "insertfile undo redo | styleselect | bold | italic  | bullist | numlist | outdent  indent | link image | forecolor  backcolor | alignleft aligncenter alignright alignjustify",
        
          file_browser_callback: function(field_name, url, type, win) {
            
            $('#width').attr("type","number");
            $('#height').attr("type","number");
            $('#imageSelect').click();
            imageField_name = field_name;
//alert($('input[name="width"]').val());
            $('#width').blur(function(){
              
              if($('#width').val() == ''){
                $('#width').val("300");
                $('#height').val('');
              }else if($('#width').val() <= 320){
              }else{

                /*navigator.notification.alert(
                    "Image width should be less than 640MB",  // message
                    alertDismissed,         // callback
                    'iBooks',            // title
                    'Done'                  // buttonName
                );*/

                $('#width').val("300");
                $('#height').val('');
              }
            });
            $('#height').blur(function(){
              if($('#height').val() <= 320){
                $('#height').val('300');
              }
            });
        },
        image_advtab: true,
        height: "200px",
        width: "100%",
        resize: true,
  };

            $("#imageSelect").change(function(event){

              $('#imageSelect').off('click');
              event.preventDefault();
            
            $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
            });
            
              var formData = new FormData();
              if(elementId){
                formData.append('api_key', appKey);
                formData.append('id', elementId);
              }else{
                formData.append('api_key', 'd4b2e8f5473bd5023797436ce9556620');
                formData.append('id', '2188');
              }
              
              formData.append('image', this.files[0]);
              var _URL = window.URL || window.webkitURL;
              if ((this.files[0])) {
                  var img = new Image();
                  img.onload = function() {
                      console.log(this.width + " " + this.height);
                      
                      if(this.width <= 640){
                        $('#width').val(this.width);
                        $('#height').val(this.height);
                      }else{
                        $('#width').val("640");
                        $('#height').val('');
                      }

                      $http.post('http://build.myappbuilder.com/api/elements/images.json', formData, {
                          transformRequest: angular.identity,
                          headers: {'Content-Type': undefined}
                      })
                      .success(function(data,status, headers, config){
                          $ionicLoading.hide(); 
                          $('#'+imageField_name).val(data.url);
                      })
                      .error(function(data,status, headers, config){
                           $ionicLoading.hide(); 
                          navigator.notification.alert(JSON.stringify(data));
                      })
                  };
                  img.onerror = function() {
                      $ionicLoading.hide(); 
                      //alert( "Not a valid image file: " + this.files[0].type);
                      navigator.notification.alert(
                          'Not a valid image file: ' + this.files[0].type,  // message
                          alertDismissed,         // callback
                          'iBooks',            // title
                          'Done'                  // buttonName
                      );

                      
                  };
                  img.src = _URL.createObjectURL(this.files[0]);
              }

              

            });
	
$scope.appcreate = {}
$scope.book = {}

    $scope.bar = function() {

                   $ionicActionSheet.show({

                                          titleText: 'Choose Bar Color',

                                          buttons: [

                                                    { text: '<p><img src="img/light.png" style="align:left;"/>&nbsp;Light&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/stable.png" style=""/>&nbsp;Stable&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/positive.png" style=""/>&nbsp;Positive&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/calm.png" style=""/>&nbsp;Calm&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/balanced.png" style=""/>&nbsp;Balanced&nbsp;</p>' },

                                                    { text: '<p><img src="img/energized.png" style=""/>&nbsp;Energized</p>' },

                                                    { text: '<p><img src="img/assertive.png" style=""/>&nbsp;Assertive&nbsp;</p>' },

                                                    { text: '<p><img src="img/royal.png" style=""/>&nbsp;Royal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/dark.png" style=""/>&nbsp;Dark&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    ],

                                          

                                          cancelText: 'Cancel',

                                          cancel: function() {

                                         // alert('CANCELLED');

                                          },

                                          buttonClicked: function(index) {

                                        //  alert('BUTTON CLICKED', index);

                                          if(index==0){

                                          barcolor = 'bar-light';

                                          $scope.book.bar_color = 'light';

                                          $scope.bar_color=barcolor;
                                          
										  $('#barimg').attr({'src':"img/light.png"});										 
											 
                                          $state.reload();
											
                                          }

                                          else if(index==1){

                                          barcolor = 'bar-stable';

                                          $scope.book.bar_color = 'stable';

                                          $scope.bar_color=barcolor;

										  $('#barimg').attr({'src':"img/stable.png"});
 
                                          $state.reload();

                                          }

                                          else if(index==2){

                                          barcolor = 'bar-positive';

                                          $scope.book.bar_color = 'positive';

                                          $scope.bar_color=barcolor;

										  $('#barimg').attr({'src':"img/positive.png"});
 
                                          $state.reload();

                                          }

                                          else if(index==3){

                                          barcolor = 'bar-calm';

                                          $scope.book.bar_color = 'calm';

                                          $scope.bar_color=barcolor;
                                          
										  $('#barimg').attr({'src':"img/calm.png"});
 
                                          $state.reload();

                                          }

                                          else if(index==4){

                                          barcolor = 'bar-balanced';

                                          $scope.book.bar_color = 'balanced';

                                          $scope.bar_color=barcolor;
                                          
                                          $('#barimg').attr({'src':"img/balanced.png"});                                          

                                          $state.reload();

                                          }

                                          else if(index==5){

                                          barcolor = 'bar-energized';

                                          $scope.book.bar_color = 'energized';

                                          $scope.bar_color=barcolor;
                                          
                                          $('#barimg').attr({'src':"img/energized.png"});                                          

                                          $state.reload();

                                          }

                                          else if(index==6){

                                          barcolor = 'bar-assertive';

                                          $scope.book.bar_color = 'assertive';

                                          $scope.bar_color=barcolor;
                                          
                                          $('#barimg').attr({'src':"img/assertive.png"});

                                          $state.reload();

                                          }

                                          else if(index==7){

                                          barcolor = 'bar-royal';

                                          $scope.book.bar_color = 'royal';

                                          $scope.bar_color=barcolor;
                                          
                                          $('#barimg').attr({'src':"img/royal.png"});

                                          $state.reload();

                                          }

                                          else if(index==8){

                                          barcolor = 'bar-dark';

                                          $scope.book.bar_color = 'dark';

                                          $scope.bar_color=barcolor;
                                          
                                          $('#barimg').attr({'src':"img/dark.png"});

                                          $state.reload();

                                          }

                                          else{											  
										  
                                          $state.reload();

                                          }

                                          

                                          return true;

                                          },

                                          destructiveButtonClicked: function() {

                                          alert('DESTRUCT');

                                          return true;

                                          }

                                          });

                   };     
             
    
    $scope.barbutton = function() {    

                   $ionicActionSheet.show({

                                          titleText: 'Choose Button Color',

                                          buttons: [

                                                    { text: '<p><img src="img/light.png" style="align:left;"/>&nbsp;Light&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/stable.png" style=""/>&nbsp;Stable&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/positive.png" style=""/>&nbsp;Positive&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/calm.png" style=""/>&nbsp;Calm&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/balanced.png" style=""/>&nbsp;Balanced&nbsp;</p>' },

                                                    { text: '<p><img src="img/energized.png" style=""/>&nbsp;Energized</p>' },

                                                    { text: '<p><img src="img/assertive.png" style=""/>&nbsp;Assertive&nbsp;</p>' },

                                                    { text: '<p><img src="img/royal.png" style=""/>&nbsp;Royal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/dark.png" style=""/>&nbsp;Dark&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    ],

                                          

                                          cancelText: 'Cancel',

                                          cancel: function() {

                                         // alert('CANCELLED');

                                          },

                                          buttonClicked: function(index2) {               

                                          if(index2==0){

                                          bar_button_color = 'button-light';

                                          $scope.book.bar_button_color = 'light';
                                
                                          $scope.bar_button_color = bar_button_color;
                                          
                                          $('#barbuttonimg').attr({'src':"img/light.png"});

                                          $state.reload();

                                          }

                                          else if(index2==1){

                                          bar_button_color = 'button-stable';

                                          $scope.book.bar_button_color = 'stable';

                                          $scope.bar_button_color=bar_button_color;
                                          
                                          $('#barbuttonimg').attr({'src':"img/stable.png"});

                                          $state.reload();

                                          }

                                          else if(index2==2){

                                          bar_button_color = 'button-positive';

                                          $scope.book.bar_button_color = 'positive';

                                          $scope.bar_button_color=bar_button_color;
                                          
                                          $('#barbuttonimg').attr({'src':"img/positive.png"});

                                          $state.reload();

                                          }

                                          else if(index2==3){

                                          bar_button_color = 'button-calm';

                                          $scope.book.bar_button_color = 'calm';

                                          $scope.bar_button_color=bar_button_color;
                                          
                                          $('#barbuttonimg').attr({'src':"img/calm.png"});

                                          $state.reload();

                                          }

                                          else if(index2==4){

                                          bar_button_color = 'button-balanced';

                                          $scope.book.bar_button_color = 'balanced';

                                          $scope.bar_button_color=bar_button_color;
                                          
                                          $('#barbuttonimg').attr({'src':"img/balanced.png"});

                                          $state.reload();

                                          }

                                          else if(index2==5){

                                          bar_button_color = 'button-energized';

                                          $scope.book.bar_button_color = 'energized';

                                          $scope.bar_button_color = bar_button_color;
                                          
                                          $('#barbuttonimg').attr({'src':"img/energized.png"});

                                          $state.reload();

                                          }

                                          else if(index2==6){

                                          bar_button_color = 'button-assertive';

                                          $scope.book.bar_button_color = 'assertive';

                                          $scope.bar_button_color=bar_button_color;
                                          
                                          $('#barbuttonimg').attr({'src':"img/assertive.png"});

                                          $state.reload();

                                          }

                                          else if(index2==7){

                                          bar_button_color = 'button-royal';

                                          $scope.book.bar_button_color = 'royal';

                                          $scope.bar_button_color=bar_button_color;
                                          
                                          $('#barbuttonimg').attr({'src':"img/royal.png"});
		
                                          $state.reload();

                                          }

                                          else if(index2==8){

                                          bar_button_color = 'button-dark';

                                          $scope.book.bar_button_color = 'dark';

                                          $scope.bar_button_color=bar_button_color;
                                          
                                          $('#barbuttonimg').attr({'src':"img/dark.png"});

                                          $state.reload();

                                          }

                                          else{

                                          $state.reload();

                                          }                                         

                                          return true;

                                          },

                                          destructiveButtonClicked: function() {

                                          alert('DESTRUCT');

                                          return true;

                                          }

                                          });

                   };  
 
   
   $scope.button = function() {    

                   $ionicActionSheet.show({

                                          titleText: 'Choose Button Color',

                                          buttons: [

                                                    { text: '<p><img src="img/light.png" style="align:left;"/>&nbsp;Light&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/stable.png" style=""/>&nbsp;Stable&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/positive.png" style=""/>&nbsp;Positive&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/calm.png" style=""/>&nbsp;Calm&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/balanced.png" style=""/>&nbsp;Balanced&nbsp;</p>' },

                                                    { text: '<p><img src="img/energized.png" style=""/>&nbsp;Energized</p>' },

                                                    { text: '<p><img src="img/assertive.png" style=""/>&nbsp;Assertive&nbsp;</p>' },

                                                    { text: '<p><img src="img/royal.png" style=""/>&nbsp;Royal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/dark.png" style=""/>&nbsp;Dark&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    ],

                                          

                                          cancelText: 'Cancel',

                                          cancel: function() {

                                        //  alert('CANCELLED');

                                          },

                                          buttonClicked: function(index1) {

                                        //  alert('BUTTON CLICKED', index1);

                                          if(index1==0){
												
                                          button_color = 'button-light';

                                          $scope.book.button_color = 'light';

                                          $scope.button_color=button_color;
                                          
                                          $('#buttonimg').attr({'src':"img/light.png"});                                        

                                          $state.reload();

                                          }

                                          else if(index1==1){

                                          button_color = 'button-stable';

                                          $scope.book.button_color = 'stable';

                                          $scope.button_color=button_color;
                                          
                                          $('#buttonimg').attr({'src':"img/stable.png"});

                                          $state.reload();

                                          }

                                          else if(index1==2){

                                          button_color = 'button-positive';

                                          $scope.book.button_color = 'positive';

                                          $scope.button_color=button_color;
                                          
                                          $('#buttonimg').attr({'src':"img/positive.png"});

                                          $state.reload();

                                          }

                                          else if(index1==3){

                                          button_color = 'button-calm';

                                          $scope.book.button_color = 'calm';

                                          $scope.button_color=button_color;
                                          
                                          $('#buttonimg').attr({'src':"img/calm.png"});

                                          $state.reload();

                                          }

                                          else if(index1==4){

                                          button_color = 'button-balanced';

                                          $scope.book.button_color = 'balanced';

                                          $scope.button_color=button_color;
                                          
                                          $('#buttonimg').attr({'src':"img/balanced.png"});

                                          $state.reload();

                                          }

                                          else if(index1==5){

                                          button_color = 'button-energized';

                                          $scope.book.button_color = 'energized';

                                          $scope.button_color=button_color;
                                          
                                          $('#buttonimg').attr({'src':"img/energized.png"});

                                          $state.reload();

                                          }

                                          else if(index1==6){

                                          button_color = 'button-assertive';

                                          $scope.book.button_color = 'assertive';

                                          $scope.button_color=button_color;
                                          
                                          $('#buttonimg').attr({'src':"img/assertive.png"});

                                          $state.reload();

                                          }

                                          else if(index1==7){

                                          button_color = 'button-royal';

                                          $scope.book.button_color = 'royal';

                                          $scope.button_color=button_color;
                                          
                                          $('#buttonimg').attr({'src':"img/royal.png"});

                                          $state.reload();

                                          }

                                          else if(index1==8){

                                          button_color = 'button-dark';

                                          $scope.book.button_color = 'dark';

                                          $scope.button_color = button_color;
                                          
                                          $('#buttonimg').attr({'src':"img/dark.png"});

                                          $state.reload();

                                          }

                                          else{											 

                                          $state.reload();

                                          }

                                          return true;

                                          },

                                          destructiveButtonClicked: function() {

                                          alert('DESTRUCT');

                                          return true;

                                          }

                                          });

                   };  
                   
 $scope.splashselect = function(){

     $ionicActionSheet.show({

          titleText: '<b><font size="4">Choose</font></b>',
            buttons: [
             { text: 'Camera' },
             { text: 'PhotoAlbum' },
              ],

            cancelText: 'Cancel',
             cancel: function() {
           // alert('CANCELLED');
             },
             
     buttonClicked: function(index) {
    // alert('BUTTON CLICKED', index);

       if(index==0){

         navigator.camera.getPicture(onSuccess1, onFail1, { quality: 50,

        destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.CAMERA,saveToPhotoAlbum: false,correctOrientation:true});

       return true;

       }

       else{

          navigator.camera.getPicture(onSuccess1, onFail1, { quality: 50,

          destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.PHOTOLIBRARY,saveToPhotoAlbum: false,correctOrientation:true});

          return true;

         }                                

          }

		});

       };
                 
    function onSuccess1(imageURI) {

         imagesplash = imageURI;
				$('#splash').attr('src', imagesplash); 
	    		 $('#splash').css({'width':'50px','height':'50px'});
      //   $('.file-input-wrapper5 > .btn-file-input5').css('background-image', 'url('+imageURI+')');

     }

    function onFail1(message) {

         navigator.notification.alert('Failed because: ' + message);

      } 
    
     $scope.appselect = function(){

     $ionicActionSheet.show({

          titleText: '<b><font size="4">Choose</font></b>',
            buttons: [
             { text: 'Camera' },
             { text: 'PhotoAlbum' },
              ],

            cancelText: 'Cancel',
             cancel: function() {
           // alert('CANCELLED');
             },
             
     buttonClicked: function(index) {
    // alert('BUTTON CLICKED', index);

       if(index==0){

         navigator.camera.getPicture(onSuccess2, onFail2, { quality: 50,

        destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.CAMERA,saveToPhotoAlbum: false,correctOrientation:true});

       return true;

       }

       else{

          navigator.camera.getPicture(onSuccess2, onFail2, { quality: 50,

          destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.PHOTOLIBRARY,saveToPhotoAlbum: false,correctOrientation:true});

          return true;

         }                                

          }

		});

       };
                 
    function onSuccess2(imageURI) {

         imageapp = imageURI;
				$('#app').attr('src', imageapp); 
	    		 $('#app').css({'width':'50px','height':'50px'});
      //   $('.file-input-wrapper5 > .btn-file-input5').css('background-image', 'url('+imageURI+')');

     }

    function onFail2(message) {

         navigator.notification.alert('Failed because: ' + message);

      } 
      
       $scope.appstoreselect = function(){

     $ionicActionSheet.show({

          titleText: '<b><font size="4">Choose</font></b>',
            buttons: [
             { text: 'Camera' },
             { text: 'PhotoAlbum' },
              ],

            cancelText: 'Cancel',
             cancel: function() {
           // alert('CANCELLED');
             },
             
     buttonClicked: function(index) {
    // alert('BUTTON CLICKED', index);

       if(index==0){

         navigator.camera.getPicture(onSuccess3, onFail3, { quality: 50,

        destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.CAMERA,saveToPhotoAlbum: false,correctOrientation:true});

       return true;

       }

       else{

          navigator.camera.getPicture(onSuccess3, onFail3, { quality: 50,

          destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.PHOTOLIBRARY,saveToPhotoAlbum: false,correctOrientation:true});

          return true;

         }                                

          }

		});

       };
                 
    function onSuccess3(imageURI) {

         imageappstore = imageURI;
				$('#store').attr('src', imageappstore); 
	    		 $('#store').css({'width':'50px','height':'50px'});
       //  $('.file-input-wrapper5 > .btn-file-input5').css('background-image', 'url('+imageURI+')');

     }

    function onFail3(message) {

         navigator.notification.alert('Failed because: ' + message);

      }    
      
$scope.updatesettings = function(){                  
            
    if(($scope.appcreate.gridAppTitle)){
	 
      $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });

      $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/apps.json",
          data:{'api_key':appkeyResult.api_key,'title':$scope.appcreate.gridAppTitle,'description':$scope.appcreate.mypost},
          success:function(response){
	  //   alert(JSON.stringify(response));
            appKey = response.api_key;
            appTitle = response.title;
            $ionicLoading.hide(); 
            
          //   alert(document.getElementById("appimage").value);
  if(imagesplash == '' && imageapp == '' && imageappstore == ''){
	 // alert('s');
	 var formData = new FormData();  
	   
		 if($scope.book.domain != undefined){
			  formData.append('domain',$scope.book.domain);	
		   }
		    if($scope.book.subdomain != undefined){
			     formData.append('subdomain',$scope.book.subdomain);
			 }

            formData.append('api_key',appKey);
            formData.append('title',$scope.appcreate.gridAppTitle);
            formData.append('description',$scope.appcreate.mypost);		
            formData.append('bar_color', $scope.book.bar_color);
            formData.append('bar_button_color', $scope.book.bar_button_color);
            formData.append('button_color', $scope.book.button_color);         
    
          appdomain=$scope.book.domain;
          
         $.ajax({
                  type: "PUT",
                  url: "http://build.myappbuilder.com/api/apps/settings/general.json",
                  data: formData,
                  cache: false,
                  contentType: false,
                  processData: false,
                  success:function(response){
					//  alert(JSON.stringify(response));
                //  $ionicLoading.hide();		
                	colour=response.bar_color;
							buttoncolour=response.bar_button_color; 			
							button= response.button_color; 
	
           appList='';       
                   $.ajax({
                  type: "GET",
                  url: "http://build.myappbuilder.com/api/users.json",
                  data:{'api_key':appkeyResult.api_key,'id':appkeyResult.id},
                  cache: false,
                  success:function(response){
					//alert(JSON.stringify(response));
                    $ionicLoading.hide();
                    appList = response;
                    localStorage["login"] = JSON.stringify(appkeyResult);
                   
          				},
                  error:function(error,status){
                    $ionicLoading.hide();
                    navigator.notification.alert(error.responseText)
                  }
            });
            
                  $state.go('newapp1');
                 
                },error:function(error){
                  $ionicLoading.hide();
                  navigator.notification.alert(error.responseText);
                }
            });
		}
		else
		{	// alert('s1');
         $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
		
		    if($scope.book.subdomain != undefined){
				if($scope.book.domain != undefined){
					Data = {api_key:appKey,title:$scope.appcreate.gridAppTitle,description:$scope.appcreate.mypost,bar_color:$scope.book.bar_color,bar_button_color:$scope.book.bar_button_color,button_color:$scope.book.button_color,subdomain:$scope.book.subdomain,domain:$scope.book.domain};
			   //formData.append('domain',$scope.book.domain);	
		   }
		   else{
				Data = {api_key:appKey,title:$scope.appcreate.gridAppTitle,description:$scope.appcreate.mypost,bar_color:$scope.book.bar_color,bar_button_color:$scope.book.bar_button_color,button_color:$scope.book.button_color,subdomain:$scope.book.subdomain};
			     //formData.append('subdomain',$scope.book.subdomain);
			 }
		   }
		   else{
			   Data = {api_key:appKey,title:$scope.appcreate.gridAppTitle,description:$scope.appcreate.mypost,bar_color:$scope.book.bar_color,bar_button_color:$scope.book.bar_button_color,button_color:$scope.book.button_color};
		   }
		   
		if(imagesplash != ''){
		//	 alert("splashimage");
			 cordova.exec(function(response){
				
            	  if(imageapp != ''){
			    //	alert("appimage");
        cordova.exec(function(response){
			
            	 if(imageappstore != ''){
				//	 alert("storeimage");
			 cordova.exec(function(response){
         //	alert(JSON.stringify(response));     
                          colour=response.bar_color;
                          buttoncolour=response.bar_button_color;
                          button= response.button_color;

                  appList='';       
                   $.ajax({
                  type: "GET",
                  url: "http://build.myappbuilder.com/api/users.json",
                  data:{'api_key':appkeyResult.api_key,'id':appkeyResult.id},
                  cache: false,
                  success:function(response){
                    $ionicLoading.hide();
                    appList = response;
                    localStorage["login"] = JSON.stringify(appkeyResult);
                   
          				},
                  error:function(error,status){
                    $ionicLoading.hide();
                    navigator.notification.alert(error.responseText)
                  }
            });
          
                $state.go('newapp1');
             }, function(e){alert(e); $ionicLoading.hide(); }, "ImageCompress", "imageCompress", ["512", "512", "app_store_image", imageappstore, "http://build.myappbuilder.com/api/apps/settings/general.json?", "put",Data])
          
		 }
            	 },function(e){alert(e); $ionicLoading.hide(); }, "ImageCompress", "imageCompress", ["114", "114", "app_image", imageapp, "http://build.myappbuilder.com/api/apps/settings/general.json?", "put",Data])
           	
		 } 
		 else{
			 if(imageappstore != ''){
			 cordova.exec(function(response){
            	//alert(JSON.stringify(response));
                          colour=response.bar_color;
                          buttoncolour=response.bar_button_color;
                          button= response.button_color;

	
			appList='';       
                   $.ajax({
                  type: "GET",
                  url: "http://build.myappbuilder.com/api/users.json",
                  data:{'api_key':appkeyResult.api_key,'id':appkeyResult.id},
                  cache: false,
                  success:function(response){
                    $ionicLoading.hide();
                    appList = response;
                    localStorage["login"] = JSON.stringify(appkeyResult);
                   
          				},
                  error:function(error,status){
                    $ionicLoading.hide();
                    navigator.notification.alert(error.responseText)
                  }
            });
            
                 $state.go('newapp1');
             }, function(e){alert(e); $ionicLoading.hide(); }, "ImageCompress", "imageCompress", ["512", "512", "app_store_image", imageappstore, "http://build.myappbuilder.com/api/apps/settings/general.json?", "put",Data])
          
		 }
			 
		 }appList='';       
                   $.ajax({
                  type: "GET",
                  url: "http://build.myappbuilder.com/api/users.json",
                  data:{'api_key':appkeyResult.api_key,'id':appkeyResult.id},
                  cache: false,
                  success:function(response){
                    $ionicLoading.hide();
                    appList = response;
                    localStorage["login"] = JSON.stringify(appkeyResult);
                   
          				},
                  error:function(error,status){
                    $ionicLoading.hide();
                    navigator.notification.alert(error.responseText)
                  }
            });
            
                  $state.go('newapp1');
            	 },function(e){alert(e); $ionicLoading.hide(); }, "ImageCompress", "imageCompress", ["320", "460", "splash_image", imagesplash, "http://build.myappbuilder.com/api/apps/settings/general.json?", "put",Data])
           
		}
		else{
			if(imageapp != ''){
			    	
        cordova.exec(function(response){
            	 if(imageappstore != ''){
			 cordova.exec(function(response){
           //	alert(JSON.stringify(response));
                          colour=response.bar_color;
                          buttoncolour=response.bar_button_color;
                          button= response.button_color;

                 appList='';       
                   $.ajax({
                  type: "GET",
                  url: "http://build.myappbuilder.com/api/users.json",
                  data:{'api_key':appkeyResult.api_key,'id':appkeyResult.id},
                  cache: false,
                  success:function(response){
                    $ionicLoading.hide();
                    appList = response;
                    localStorage["login"] = JSON.stringify(appkeyResult);
                   
          				},
                  error:function(error,status){
                    $ionicLoading.hide();
                    navigator.notification.alert(error.responseText)
                  }
            });
            
                  $state.go('newapp1');
             }, function(e){alert(e); $ionicLoading.hide(); }, "ImageCompress", "imageCompress", ["512", "512", "app_store_image", imageappstore, "http://build.myappbuilder.com/api/apps/settings/general.json?", "put",Data])
          
		 }appList='';       
                   $.ajax({
                  type: "GET",
                  url: "http://build.myappbuilder.com/api/users.json",
                  data:{'api_key':appkeyResult.api_key,'id':appkeyResult.id},
                  cache: false,
                  success:function(response){
                    $ionicLoading.hide();
                    appList = response;
                    localStorage["login"] = JSON.stringify(appkeyResult);
                   
          				},
                  error:function(error,status){
                    $ionicLoading.hide();
                    navigator.notification.alert(error.responseText)
                  }
            });
            
                  $state.go('newapp1');
            	 },function(e){alert(e); $ionicLoading.hide(); }, "ImageCompress", "imageCompress", ["114", "114", "app_image", imageapp, "http://build.myappbuilder.com/api/apps/settings/general.json?", "put",Data])
           	
		 } 
		 else{
			 if(imageappstore != ''){
			 cordova.exec(function(response){
         	//alert(JSON.stringify(response));
         		         
                  colour=response.bar_color;
							buttoncolour=response.bar_button_color;
							button= response.button_color;
                 appList='';       
                   $.ajax({
                  type: "GET",
                  url: "http://build.myappbuilder.com/api/users.json",
                  data:{'api_key':appkeyResult.api_key,'id':appkeyResult.id},
                  cache: false,
                  success:function(response){
                    $ionicLoading.hide();
                    appList = response;
                    localStorage["login"] = JSON.stringify(appkeyResult);
                   
          				},
                  error:function(error,status){
                    $ionicLoading.hide();
                    navigator.notification.alert(error.responseText)
                  }
            });
            
                  $state.go('newapp1');
             }, function(e){alert(e); $ionicLoading.hide(); }, "ImageCompress", "imageCompress", ["512", "512", "app_store_image", imageappstore, "http://build.myappbuilder.com/api/apps/settings/general.json?", "put",Data])
          
		 }
		}
         
}			
     
		}
        
	  },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);

            navigator.notification.alert(error.responseText);
          }
      });
    
      }else{
      navigator.notification.alert("Enter App Title");
    }
  }
  

});

control.controller('naviconCtrl',function($scope,$state, $ionicLoading,$ionicScrollDelegate){ 

  $ionicScrollDelegate.scrollTop();

$scope.appTitle = appTitle;
if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}
      
   $scope.homenavbutton = function(){
	$state.go('newapp');
  } 
   $scope.addbutton = function(){
   $state.go('newbutton');
  } 
    $scope.backnavbutton= function(){
     $state.go('social');
   }
   
     $scope.levels = function(){
		
		  $.ajax({
                  type: "GET",
                  url: "http://build.myappbuilder.com/api/buttons.json",
                  data:{'api_key':appKey},
                  cache: false,
                  success:function(response){
                    
                 //   alert(JSON.stringify(response))
                    buttonArray = response;

                    $.ajax({url:'http://build.myappbuilder.com/api/app_wall_settings.json', type:"GET",data:{'api_key':appKey},
                      success:function(response){
                          Appwall = response;
                          $ionicLoading.hide();
                     $state.go('app');
                      },
                      error:function(){
                          $ionicLoading.hide();
                          alert("Failure");
                      }
                    });
                    
                  },
                  error:function(error,status){
                    $ionicLoading.hide();
                    navigator.notification.alert(error.responseText);
                  }
    });
   $state.go('app');
  } 
});

var image='';  

control.controller('newbuttonCtrl',function($scope,$state,$ionicActionSheet,$ionicLoading,$ionicPopup,$ionicScrollDelegate){ 

  $ionicScrollDelegate.scrollTop();

 $scope.appTitle = appTitle;
 
if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

$scope.buttoncreate = {}

  $scope.select = function(){

     $ionicActionSheet.show({

          titleText: '<b><font size="4">Choose</font></b>',
            buttons: [
             { text: 'Camera' },
             { text: 'PhotoAlbum' },
              ],

            cancelText: 'Cancel',
             cancel: function() {
           // alert('CANCELLED');
             },
             
     buttonClicked: function(index) {
   //  alert('BUTTON CLICKED', index);

       if(index==0){

         navigator.camera.getPicture(onSuccess, onFail, { quality: 50,

        destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.CAMERA,saveToPhotoAlbum: false,correctOrientation:true});

       return true;

       }

       else{

          navigator.camera.getPicture(onSuccess, onFail, { quality: 50,

          destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.PHOTOLIBRARY,saveToPhotoAlbum: false,correctOrientation:true});

          return true;

         }                                

          }

		});

       };
                 
    function onSuccess(imageURI) {

         image = imageURI;
         localStorage.xxx=image;
//alert(localStorage.xxx);
				$('#buttonimg').attr('src', image); 
	    		 $('#buttonimg').css({'width':'50px','height':'50px'});
         $('.file-input-wrapper5 > .btn-file-input5').css('background-image', 'url('+imageURI+')');

     }

    function onFail(message) {

         navigator.notification.alert('Failed because: ' + message);

      }
             

$scope.create = function(){
	
    if(($scope.buttoncreate.title) && (image))
	{	
	 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      	
		cordova.exec(function(response){
          // 	 alert(response);
            	 $ionicLoading.hide(); 
            var result = response;
               
            buttonId = result.id;
            buttonTitle = result.title;
            
            buttonArray = response;                     	
            $state.go('elements');
            	 },
            	 function(response){alert(response);          	 
            	 
            	  }, "ImageCompress", "imageCompress", ["57", "57", "image", image, "http://build.myappbuilder.com/api/buttons.json?", "post", {api_key:appKey,title:$scope.buttoncreate.title}])
            	  
	}
   else{
			var formData = new FormData();
        var methodData = '';
        
          methodData = 'POST';
          urlData = "http://build.myappbuilder.com/api/buttons/via_url.json";
          formData.append('api_key',appKey);
          formData.append('title',$scope.buttoncreate.title);
          var letter = ($scope.buttoncreate.title).charAt(0).toUpperCase();
          
          formData.append('image', 'http://nuatransmedia.com/iBookImages/'+letter+'.png');
        
        
          $ionicLoading.show({
                content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
              });
        
            $.ajax({
                type: methodData,
                url: urlData,
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success:function(response){
                    $ionicLoading.hide();
                //  alert(JSON.stringify(response));
                    buttonId = response.id;
                    buttonTitle = response.title;
                    $state.go('elements');
                },
                error:function(error,status){
                    $ionicLoading.hide();
                    //alert("Successfully")
                    navigator.notification.alert("error: "+error.responseText);
                }
            });          
		}
    
  }	
   $scope.navbutton = function(){
	$state.go('navicon');
  } 
   $scope.homebutton = function(){
   $state.go('newapp');
  } 
   $scope.backbutton= function(){
    $state.go('navicon');
   }
   
});

var chapterImage='';
var buttontype='';

control.controller('appCtrl',function($scope,$state,$ionicModal,$ionicLoading,$ionicPopup,$http){
    
 if(Appwall.element_wall == '0'){
    $scope.elementAppWall = false;
  }else if(Appwall.element_wall == '1'){
    $scope.elementAppWall = true;
  }
  
  $scope.appwallgoFun = function(){
    $state.go('appWall');
  }
  
 var chapterArray = [];
  for (var i = 0; i < buttonArray.length; i++) {
     // if((buttonArray[i].first_paragraph_type == "default")||(buttonArray[i].first_paragraph_type == null)){
        chapterArray.push(buttonArray[i]);
     // }else{
      //  alert("Hello : "+buttonArray[i].title)
    //  }
    
  }
  
	$scope.items = chapterArray;

 $scope.appTitle = appTitle;
if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

  $scope.AppEditor = false;
  
    $scope.logbuttonlist = function(){
    if($scope.AppEditor == false){
      $scope.AppEditor = true;
    }else{
      $scope.AppEditor =false;
    }
  }
 //$scope.appKey = appList.apps;
 $scope.chapterClick = function(id,title){

    buttonId = id;
    buttonTitle = title;
   
    $state.go('chapterlist');
  }
 $scope.editButton = function(id,title,image){
	    
    buttonId = id;
    buttonTitle = title;
    chapterImage = image;

   $state.go('buttonlist');
  }
 $scope.newchapterGo = function(){
    chapterEdit = '';
    $state.go('newbutton');
  }
  
 $scope.backbuttonlist = function(){

    $state.go('sample');
  }

$scope.moveItem = function(item, fromIndex, toIndex) {
    //Move the item in the array
     $ionicLoading.show({
                content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
              });
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
    var ids = $scope.items.map(function(btn){return btn.id});

    $http.post('http://build.myappbuilder.com/api/buttons/reorder.json', {api_key: appKey, ids: ids})
    .success(function(data,status,headers,config){
        $ionicLoading.hide();
    })
    .error(function(data,status,headers,config){
        alert(data)
         $ionicLoading.hide();
    })
          //console.log(item, fromIndex, toIndex)
  };
  
   $scope.deleteButton = function(id){
    
    var confirmPopup = $ionicPopup.confirm({
       title: 'Button Delete!',
       template: 'Are you sure you want to delete this Button?'
    });
    
    confirmPopup.then(function(res,event) {
      
      if(res) {
        
         $ionicLoading.show({
                content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
              });
          $.ajax({
                      type: "DELETE",
                      url: "http://build.myappbuilder.com/api/buttons.json",
                      data: {"api_key":appKey,"id":id},
                      cache: false,
                      success:function(response){
                        $.ajax({
                            type: "GET",
                            url: "http://build.myappbuilder.com/api/buttons.json",
                            data:{'api_key':appKey},
                            cache: false,
                            success:function(response){
								 
                              buttonArray= response;
                              chapterArray = [];
                              for (var i = 0; i < buttonArray.length; i++) {
                                //  if((buttonArray[i].first_paragraph_type == "default")||(buttonArray[i].first_paragraph_type == null)){
                                    chapterArray.push(buttonArray[i]);
                                  //  alert("Hi : "+buttonArray[i].title)
                                //  }else{
                                   // alert("Hello : "+buttonArray[i].title)
                               //   }
                                
                              }
                              $scope.items = chapterArray;
                              $state.reload();
                              setTimeout(function(){  $ionicLoading.hide();}, 1000);

                            },
                            error:function(error,status){
                              $ionicLoading.hide();
                              navigator.notification.alert(error.responseText);
                            }
                        });
                      },
                      error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText)
                      }
          });
       } else {
         
       }
     });

}


 /* $scope.chapterClickFtn = function(id,title){
    
    buttonId = id;
    buttonTitle = title;
  // $state.go('sample');
  }*/
 });

control.controller('elementsCtrl',function($scope,$state,$ionicLoading){ 

$scope.appTitle = appTitle;
if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

 $scope.createText = function(){
	$state.go('pic');
  } 
 $scope.createContact = function(){
	$state.go('form');
  }   
 $scope.createVideo = function(){
	$state.go('video');
  }  
   $scope.createAudio = function(){
	$state.go('audio');
  }  
 $scope.createMap = function(){
	$state.go('map');
  }  
   $scope.createWeb = function(){
	$state.go('web');
  }  
    $scope.createRss = function(){
	$state.go('rss');
  }  
    $scope.createtask = function(){
	$state.go('task');
  } 
 $scope.navelement = function(){
	$state.go('navicon');
  }      
 $scope.homeelement = function(){
	$state.go('newapp');
  }
  $scope.backelement= function(){
     $state.go('newbutton');
    }
  
});

var elementimg='';

control.controller('picCtrl',function($scope,$state,$ionicModal, $ionicScrollDelegate,$ionicPopup,$ionicLoading,$sce,$http,$ionicScrollDelegate){

  $ionicScrollDelegate.scrollTop();

$scope.appTitle = appTitle;
if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

 $scope.AppEditor = false;

  
$scope.para = {}
$scope.textCreate = {}

$scope.createtext = function(){	
    
  if($scope.para.title){

      $ionicLoading.show({
              template: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              
      });

      var formData1 = new FormData();
           formData1.append('api_key',appKey);
           formData1.append('id',elementId);       
        //   formData1.append('image',$("#newtext1").get(0).files[0]);

         $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/elements/create_default.json",
          data:{'api_key':appKey,'button_id':buttonId,'title':$scope.para.title,'additional_field':$scope.para.additional_field,'text':$scope.textCreate.textpic},
          success:function(response){

			 elementId = response.id;   
			 elementTitle = response.title;
			 elementDesc = response.text;
			  $ionicLoading.hide();  
               $state.go('picedit');  
               
			// elementAdditional = response.additional_field;			  
			 
		/*	 cordova.exec(function(response){
            	   var resultpic = response;
                   var jsonObj = JSON.parse(resultpic);	        
                   elementimg=jsonObj.url;
                	 $ionicLoading.hide();  
                   $state.go('picedit');
            	 },
            	 function(e){alert(e);}, "Echo", "echo", ["57", "57", "image", document.getElementById("newtext1").value, "http://build.myappbuilder.com/api/elements/images.json?", "post", {"api_key":appKey,"id":elementId}])          
            
        */
          },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);

            navigator.notification.alert(error.responseText);
          }
      });
    }else{
      navigator.notification.alert("Enter The Title");
    }
  }
 
 $scope.navtext = function(){
	$state.go('newbutton');
  } 
 
 $scope.hometext = function(){
	$state.go('newapp');
  } 
  $scope.backtext= function(){
     $state.go('elements');
   }
    $scope.nexttext= function(){
     $state.go('picedit');
   }
 
  $scope.tinymceOptions = {
        

        menubar: false,
        theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime table contextmenu ",
            "emoticons textcolor"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold | italic  | bullist | numlist | outdent  indent | link image | forecolor backcolor | alignleft aligncenter alignright alignjustify",
         file_browser_callback: function(field_name, url, type, win) {
            
            $('#width').attr("type","number");
            $('#height').attr("type","number");
            $('#imageSelect1').click();
            imageField_name = field_name;
          // alert($('input[name="width"]').val());
            $('#width').blur(function(){
              
              if($('#width').val() == ''){
                $('#width').val("300");
                $('#height').val('');
              }else if($('#width').val() <= 320){
              }else{

                /*navigator.notification.alert(
                    "Image width should be less than 640MB",  // message
                    alertDismissed,         // callback
                    'iBooks',            // title
                    'Done'                  // buttonName
                );*/

                $('#width').val("300");
                $('#height').val('');
              }
            });
            $('#height').blur(function(){
              if($('#height').val() <= 320){
                $('#height').val('300');
              }
            });
        },
        image_advtab: true,
        height: "200px",
        width: "100%",
        resize: true,
  };

            $("#imageSelect1").change(function(event){

              $('#imageSelect1').off('click');
              event.preventDefault();
            
            $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
            });
            
              var formData = new FormData();
              if(elementId){
                formData.append('api_key', appKey);
                formData.append('id', elementId);
              }else{
                formData.append('api_key', 'd4b2e8f5473bd5023797436ce9556620');
                formData.append('id', '2188');
              }
              
              formData.append('image', this.files[0]);
              var _URL = window.URL || window.webkitURL;
              if ((this.files[0])) {
                  var img = new Image();
                  img.onload = function() {
                      console.log(this.width + " " + this.height);
                      
                      if(this.width <= 640){
                        $('#width').val(this.width);
                        $('#height').val(this.height);
                      }else{
                        $('#width').val("640");
                        $('#height').val('');
                      }

                      $http.post('http://build.myappbuilder.com/api/elements/images.json', formData, {
                          transformRequest: angular.identity,
                          headers: {'Content-Type': undefined}
                      })
                      .success(function(data,status, headers, config){
                          $ionicLoading.hide(); 
                          $('#'+imageField_name).val(data.url);
                      })
                      .error(function(data,status, headers, config){
                           $ionicLoading.hide(); 
                          navigator.notification.alert(JSON.stringify(data));
                      })
                  };
                  img.onerror = function() {
                      $ionicLoading.hide(); 
                      //alert( "Not a valid image file: " + this.files[0].type);
                      navigator.notification.alert(
                          'Not a valid image file: ' + this.files[0].type,  // message
                          alertDismissed,         // callback
                          'iBooks',            // title
                          'Done'                  // buttonName
                      );

                      
                  };
                  img.src = _URL.createObjectURL(this.files[0]);
              }

              

            });
	
});

var contentTitle = '';
var contentText = '';
var contentadditional = '';
var contentimage = '';

control.controller('chapterlistCtrl',function($scope,$state,$ionicLoading,$ionicPopup,$ionicScrollDelegate){ 
  
 $scope.newContentGo = function(){
	$state.go('elements');
  }  
 $scope.homechapterlist = function(){
	$state.go('sample');
  }   
 $scope.backchapterlist = function(){
     $state.go('app');
  }  
  	
	
 for (var i = 0; i < buttonArray.length; i++) {
      if(buttonId == buttonArray[i].id){
        elementArray = buttonArray[i].elements;
     // alert(JSON.stringify(buttonArray[i].elements));
      }
  }
  
   $scope.deleteContent = function(id){

    elementId = id;
    var confirmPopup = $ionicPopup.confirm({
     title: 'Element Delete!',
     template: 'Are you sure you want to delete this Element?'
    });
    confirmPopup.then(function(res) {
     if(res) {
          $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
          $.ajax({
            type: "DELETE",
            url: "http://build.myappbuilder.com/api/elements.json",
            data: {"api_key":appKey,"id":elementId},
            cache: false,
            success:function(response){
              $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/buttons.json",
                        data:{'api_key':appKey},
                        cache: false,
                        success:function(response){
                          buttonArray = response;
                          $ionicLoading.hide();
                         // $state.go('previewChapter');
                          for (var i = 0; i < buttonArray.length; i++) {
							  if(buttonId == buttonArray[i].id){
								elementArray = buttonArray[i].elements;
							 //  alert(JSON.stringify(buttonArray[i].elements));
							  }
						  }
						  $scope.elementArray = elementArray;
                          $state.reload();  
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
            error:function(error,status){
               $ionicLoading.hide();
              navigator.notification.alert(error.responseText)
            }
          });
     } else {
       console.log('You are not sure');
     }
   });
}

 
 $scope.elementArray = elementArray;
 
 $scope.appTitle = appTitle;
if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

  $scope.buttonTitle = buttonTitle;
  $scope.AppEditor = false;

  $scope.logtextlist = function(){
    if($scope.AppEditor == false){
      $scope.AppEditor = true;
    }else{
      $scope.AppEditor =false;
    }
  }

 $scope.subTitClickFtn = function(id,title,type,email,text,url,rssurl,audioimg,audiourl,videoimg,videourl){

    elementId = id;
    elementtype=type;
    elementemail = email;
	elementurl = url;
	elementtext= text;
	elementtitle= title;
	elementrssurl = rssurl;
	contentimg = audioimg;
	contentaudio = audiourl;
	contentvideo = videourl;
	contentvideothumb = videoimg;
	
    for (var i = 0; i < elementArray.length; i++) {
      if(elementtype == "audio"){
		$state.go('previewaudio');
      }
      
    if(elementtype == "rss_feed"){
		$state.go('previewrss');
      }

    if(elementtype == "default"){
		$state.go('previewpic');
      }
      
     if(elementtype == "tasks_list"){
		$state.go('previewtask');
      }
      
       if(elementtype == "web_page"){
		$state.go('previewweb');
      }
      
      if(elementtype == "contact_form"){
		$state.go('previewform');
      }
      
       if(elementtype == "map"){
		$state.go('previewmap');
      }
      
       if(elementtype == "video"){
		$state.go('previewvideo');
      }
   }
    }

 $scope.buttonAppwallgoFun = function(){
    $state.go('buttonAppWall');
  }
  
  if(Appwall.button_wall == '0'){
    $scope.buttonAppWall = false;
  }else if(Appwall.button_wall == '1'){
    $scope.buttonAppWall = true;
  }
  
});

var newarray = [];
var customid = '';
var customtitle = '';

control.controller('newapp1Ctrl',function($scope,$state,$ionicLoading,$ionicScrollDelegate){ 

 $ionicScrollDelegate.scrollTop();
 
 $scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

$scope.appcre = {}
  
  $scope.AppEditor = false;
  
$scope.createnewapp1 = function(){
	
	$('#title').val('');
	$('#value').val('');
	
    if($scope.appcre.customTitle){
      if($scope.appcre.customvalue){
	 
      $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });

       $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/book_custom_fields.json",
          data:{'api_key':appKey,'title':$scope.appcre.customTitle,'value':$scope.appcre.customvalue},
          success:function(response){
			 customid = response.id;
			 customtitle= response.key;
			
	       /* $ionicLoading.hide();
            customid = response.id;
            newarray=response;  
              alert(JSON.stringify(newarray));*/
              
            $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/book_custom_fields.json",
                        data:{'api_key':appKey},
                        cache: false,
                        success:function(response){
                         newarray=response;  
                          $ionicLoading.hide();

						    $scope.custompage = newarray;
						   $state.reload();   
						 //   alert(JSON.stringify($scope.custompage));
                          
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);
            navigator.notification.alert(error.responseText);
          }
      });
    }
      }else{
      navigator.notification.alert("Enter Title And Value");
    }
   
  }


$scope.removeBookCustomValue = function(id){

    customid = id;
    
   $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
          $.ajax({
            type: "DELETE",
            url: "http://build.myappbuilder.com/api/book_custom_fields.json",
            data: {"api_key":appKey,"id":customid},
            cache: false,
            success:function(response){
              $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/book_custom_fields.json",
                        data:{'api_key':appKey},
                        cache: false,
                        success:function(response){
                          newarray = response;
                          $ionicLoading.hide();
						    $scope.custompage = newarray;
						  //  alert(JSON.stringify($scope.custompage));
                          $state.reload();  
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
            error:function(error,status){
               $ionicLoading.hide();
              navigator.notification.alert(error.responseText)
            }
          });
}

$scope.nextpage = function(){	
	$state.go('social');	
}
$scope.homeapp1 = function(){	
	$state.go('sample');	
}

$scope.backnewapp1 = function(){
	$state.go('newapp');
}

});

var twitter='';
var fb='';
var gplus='';
var youtube='';
var flickr='';
var pin='';
var fbkey='';
var fbsecret='';
var twitterkey='';
var twittersecret='';
var gpluskey='';
var gplussecret='';
                  
control.controller('socialCtrl',function($scope,$state,$ionicLoading,$ionicScrollDelegate){ 

 $ionicScrollDelegate.scrollTop();
 
 $scope.appTitle = appTitle;	
if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

 $scope.navsocial = function(){
   $state.go('navicon');
 } 
     
 $scope.homesocial = function(){
   $state.go('newapp');
 }
  $scope.backsocial= function(){
     $state.go('newapp1');
 }

      
$scope.book = {}

$scope.updateSocialSettings = function(){              
  
   $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
           var formData = new FormData();
            formData.append('api_key',appKey);
            formData.append('twitter_link',$scope.book.twitter_username);
            formData.append('twitter_key',$scope.book.twitter_key);
            formData.append('twitter_secret',$scope.book.twitter_secret);
            formData.append('facebook_link',$scope.book.facebook_link);
            formData.append('facebook_key',$scope.book.facebook_key);
            formData.append('facebook_secret',$scope.book.facebook_secret);
            formData.append('gplus_link',$scope.book.gplus_link);	
            formData.append('gplus_key', $scope.book.gplus_key);
            formData.append('gplus_secret', $scope.book.gplus_secret);
            formData.append('youtube_link', $scope.book.youtube_link);
            formData.append('flickr_link', $scope.book.flickr_link);
            formData.append('pinterest_link', $scope.book.pinterest_link);

           $.ajax({
                  type: "PUT",
                  url: "http://build.myappbuilder.com/api/apps/settings/social.json",
                  data: formData,
                  cache: false,
                  contentType: false,
                  processData: false,
                  success:function(response){
			  //   alert(JSON.stringify(response));
			      alert('successfully created');
                  $ionicLoading.hide();         
                 $state.go('navicon');
                 
                },error:function(error){
                  $ionicLoading.hide();
                  navigator.notification.alert(error.responseText);
                }
            });

  }
  
});

var customeditid = '';
var piccustom = '';
var imagepic='';
    
    
control.controller('piceditCtrl',function($scope,$state,$ionicScrollDelegate,$ionicLoading,$ionicActionSheet,$ionicPopup,$ionicModal){ 

 $ionicScrollDelegate.scrollTop();
  
$scope.textCreateedit = {}
$scope.editpic={}

$scope.textCreateedit.edittitle=elementTitle;
$scope.textCreateedit.edittext=elementDesc;

$scope.appTitle = appTitle;	
if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

 $scope.AppEditor = false;

  $scope.logedittext = function(){
    if($scope.AppEditor == false){
      $scope.AppEditor = true;
    }else{
      $scope.AppEditor =false;
    }
  }
   $scope.tinymceOptions = {
        

        menubar: false,
        theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime table contextmenu ",
            "emoticons textcolor"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | bullist numlist outdent indent | link image | alignleft aligncenter alignright alignjustify forecolor backcolor"
        
	};
	


$scope.updatetext = function(){            
	
	 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
	  var formData = new FormData();
           formData.append('api_key',appKey);
           formData.append('id',elementId);       
           formData.append('title',$scope.textCreateedit.edittitle);
            formData.append('text',$scope.textCreateedit.edittext);

  if((($scope.textCreateedit.edittitle)!=elementTitle) || (($scope.textCreateedit.edittext)!=elementDesc)){  

          $.ajax({
                  type: "PUT",
                  url: "http://build.myappbuilder.com/api/elements/update_default.json",
                  data: formData,
                  cache: false,
                  contentType: false,
                  processData: false,
                  success:function(response){
			    // alert(JSON.stringify(response));
			      alert('successfully Updated');
                  $ionicLoading.hide();
                
                 
                },error:function(error){
                  $ionicLoading.hide();
                  navigator.notification.alert(error.responseText);
                }
            });
		}
		else
		{
		   $ionicLoading.hide();
		}	
    
 }
 
 $scope.piceditselect = function(){

     $ionicActionSheet.show({

          titleText: '<b><font size="4">Choose</font></b>',
            buttons: [
             { text: 'Camera' },
             { text: 'PhotoAlbum' },
              ],

            cancelText: 'Cancel',
             cancel: function() {
          //  alert('CANCELLED');
             },
             
     buttonClicked: function(index) {
   //  alert('BUTTON CLICKED', index);

       if(index==0){

         navigator.camera.getPicture(onSuccess, onFail, { quality: 50,

        destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.CAMERA,saveToPhotoAlbum: false,correctOrientation:true});

       return true;

       }

       else{

          navigator.camera.getPicture(onSuccess, onFail, { quality: 50,

          destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.PHOTOLIBRARY,saveToPhotoAlbum: false,correctOrientation:true});

          return true;

         }                                

          }

		});

       };
                 
    function onSuccess(imageURI) {

         imagepic = imageURI;
//alert(imagepic);
				$('#editpictext').attr('src', imagepic); 
	    		 $('#editpictext').css({'width':'50px','height':'50px'});
        // $('.file-input-wrapper5 > .btn-file-input5').css('background-image', 'url('+imageURI+')');

     }

    function onFail(message) {

         navigator.notification.alert('Failed because: ' + message);

      }
             
$scope.upload = function(){     
	         
  $('#editpictext').attr({'src':"img/no_image.png"});	        

 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
  
   
     cordova.exec(function(response){
            	 var result1 = response;
              
            	 piccustom =result1.id;
            	imagepic='';
            	   $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/elements/images.json",
                        data:{'api_key':appKey,'id':elementId},
                        cache: false,
                        success:function(response){    
							// alert(JSON.stringify(response));            
                          $ionicLoading.hide();
						    $scope.editpicpage = response;
						   $state.reload();   
                          
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
  	 },
            	 function(e){alert(e); $ionicLoading.hide();}, "ImageCompress", "imageCompress", ["300", "280", "image", imagepic, "http://build.myappbuilder.com/api/elements/images.json?", "post", {api_key:appKey,id:elementId}])
       
 }
 
   
$scope.removepicCustom = function(id){
 
  piccustom = id;

   $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
          $.ajax({
            type: "DELETE",
            url: "http://build.myappbuilder.com/api/elements/images.json",
            data: {"api_key":appKey,"id":piccustom,'element_id':elementId},
            cache: false,
            success:function(response){
             $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/elements/images.json",
                        data:{'api_key':appKey,'id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();

						     $scope.editpicpage = response;
						  //   alert(JSON.stringify($scope.editpicpage));
						   $state.reload();   
						  
                          
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });             
            },
            error:function(error,status){
               $ionicLoading.hide();
              navigator.notification.alert(error.responseText)
            }
          });
 
}
  $scope.AppEditor = false;
  
$scope.createpicedit = function(){

	$('#edittitle').val('');
	$('#edivalue').val('');
	
    if($scope.editpic.customeditTitle){
      if($scope.editpic.customeditvalue){
	 
      $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });

       $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/custom_values.json",
          data:{'api_key':appKey,'element_id':elementId,'title':$scope.editpic.customeditTitle,'value':$scope.editpic.customeditvalue},
          success:function(response){
			 customeditid = response.id;
			
              
            $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();

						    $scope.edittxtpage = response;
						   //  alert(JSON.stringify($scope.edittxtpage));
						   $state.reload();   
						  
                          
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);
            navigator.notification.alert(error.responseText);
          }
      });
    }
      }else{
      navigator.notification.alert("Enter Title And Value");
    }
   
  }


$scope.removetxtCustomValue = function(id){

    customeditid = id;
    
   $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
          $.ajax({
            type: "DELETE",
            url: "http://build.myappbuilder.com/api/custom_values.json",
            data: {"api_key":appKey,"id":customeditid},
            cache: false,
            success:function(response){
              $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();

						    $scope.edittxtpage = response;
						 //    alert(JSON.stringify($scope.edittxtpage));
						   $state.reload();   
						  
                          
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
            error:function(error,status){
               $ionicLoading.hide();
              navigator.notification.alert(error.responseText)
            }
          });
}

$scope.navedittext = function(){
   $state.go('navicon');
 } 
 $scope.homeedittext = function(){
   $state.go('newapp');
 } 
  $scope.backedittext = function(){
   $state.go('pic');
 } 
 
/* $ionicModal.fromTemplateUrl('meta.html', {
        scope: $scope,
        animation: 'slide-fade-in'
      }).then(function(modal) {
        $scope.modal = modal;
      });
        
 $scope.openModal = function() {
	 
	$scope.modal.show();
	
	 $scope.updateSEO = function() {
alert('s');
	  var formData = new FormData();
          formData.append('api_key',appKey);
          formData.append('id',elementId);       
          formData.append('permalink',$scope.meta.permalink);   
          formData.append('meta_keywords',$scope.meta.metakeywords);   
          formData.append('meta_description',$scope.meta.metadescription);   
          formData.append('seo_title',$scope.meta.seotitle); 
         
          
           $.ajax({
          type: "PUT",
          url: "http://build.myappbuilder.com/api/elements/meta-tags.json",
          data:formData,
          success:function(response){
			    alert(JSON.stringify(response)); 	             	
          },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);

            navigator.notification.alert(error.responseText);
          }
      }); 
   }                 
	
 };*/
 
});

var formelementid='';

control.controller('formCtrl',function($scope,$state,$ionicLoading,$ionicScrollDelegate){ 

$ionicScrollDelegate.scrollTop();

$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

$scope.navform = function(){
   $state.go('navicon');
 } 
$scope.homeform = function(){
   $state.go('newapp');
 } 
$scope.backform= function(){
     $state.go('elements');
   }
 
$scope.form={}

$scope.createform = function(){

if($scope.form.email){
	
	 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
	  $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/elements/create_contact_form.json",
          data:{'api_key':appKey,'button_id':buttonId,'email':$scope.form.email},
          success:function(response){
			 //   alert(JSON.stringify(response)); 	  
			formEmail = response.email;
			formelementid = response.id;
			 $ionicLoading.hide();	
          $state.go('formedit');
            	
          },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);

            navigator.notification.alert(error.responseText);
          }
      });
    }else{
      navigator.notification.alert("Enter The Email");
    }

}
	
});

var customeditformid = '';
var newaddressid='';

control.controller('formeditCtrl',function($scope,$state,$ionicLoading,$ionicScrollDelegate){ 

$ionicScrollDelegate.scrollTop();

$scope.formedit={}
$scope.editform={}

$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

$scope.formedit.editemail = formEmail;

$scope.updateform = function(){

	 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
	  var formData = new FormData();
           formData.append('api_key',appKey);
           formData.append('id',formelementid);       
            formData.append('email_to_send_to',$scope.formedit.editemail);       

  if(($scope.formedit.editemail)!=formEmail){  

          $.ajax({
                  type: "PUT",
                  url: "http://build.myappbuilder.com/api/elements/update_contact_form.json",
                  data: formData,
                  cache: false,
                  contentType: false,
                  processData: false,
                  success:function(response){
			  //   alert(JSON.stringify(response));
			      alert('successfully Updated');
                  $ionicLoading.hide();
                
                 
                },error:function(error){
                  $ionicLoading.hide();
                  navigator.notification.alert(error.responseText);
                }
            });
		}
		else
		{
			$ionicLoading.hide();
		}
}

$scope.createformcustom = function(){

	$('#formcustitle').val('');
	$('#formcusvalue').val('');
	

    if($scope.editform.customformTitle){
      if($scope.editform.customformvalue){
	 
      $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });

       $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/custom_values.json",
          data:{'api_key':appKey,'element_id':formelementid,'title':$scope.editform.customformTitle,'value':$scope.editform.customformvalue},
          success:function(response){
			 customeditformid = response.id;
        //  alert(JSON.stringify(customeditformid));

            $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':formelementid},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
                        
						    $scope.editformpage = response;

						   $state.reload();   
						  
                          
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);
            navigator.notification.alert(error.responseText);
          }
      });
    }
      }else{
      navigator.notification.alert("Enter Title And Value");
    }
   
  }

$scope.removeformCustomValue = function(id){

    customeditformid = id;
    
   $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
          $.ajax({
            type: "DELETE",
            url: "http://build.myappbuilder.com/api/custom_values.json",
            data: {"api_key":appKey,"id":customeditformid},
            cache: false,
            success:function(response){
              $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':formelementid},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();

						    $scope.editformpage = response;
						   //  alert(JSON.stringify($scope.editformpage));
						   $state.reload();   
						  
                          
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
            error:function(error,status){
               $ionicLoading.hide();
              navigator.notification.alert(error.responseText)
            }
          });
}


$scope.naveditform = function(){
   $state.go('navicon');
 } 
$scope.homeeditform = function(){
   $state.go('newapp');
 } 
 $scope.backeditform = function(){
     $state.go('form');
 } 

 
});
var videoimg='';
var videotitle='';
var videodesc='';
var videoelement='';
var imagevideo='';

control.controller('videoCtrl',function($scope,$state,$ionicLoading,$ionicPopup,$ionicScrollDelegate,$ionicActionSheet){

$ionicScrollDelegate.scrollTop();

function readURL5(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#videoimg').attr({'src':"img/btn_video.png"});
             $('#videoimg').css({'width':'50px','height':'50px'}); 			 
           $('.file-input-wrapper > .btn-file-input').css('background-image', 'url('+e.target.result+')');
            //  $('.file-input-wrapper > .btn-file-input').css('background-image', 'url('+e.target.result+')');
            }

            reader.readAsDataURL(input.files[0]);
        }
  } 
      
  $("#video").change(function(){
      readURL5(this);
  });
     
$scope.videocreate={}

$scope.appTitle = appTitle;   
 
if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}
      
   $scope.videoselect = function(){

     $ionicActionSheet.show({

          titleText: '<b><font size="4">Choose</font></b>',
            buttons: [
             { text: 'Camera' },
             { text: 'PhotoAlbum' },
              ],

            cancelText: 'Cancel',
             cancel: function() {
           // alert('CANCELLED');
             },
             
     buttonClicked: function(index) {
    // alert('BUTTON CLICKED', index);

       if(index==0){

         navigator.camera.getPicture(onSuccess, onFail, { quality: 50,

        destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.CAMERA,saveToPhotoAlbum: false,correctOrientation:true});

       return true;

       }

       else{

          navigator.camera.getPicture(onSuccess, onFail, { quality: 50,

          destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.PHOTOLIBRARY,saveToPhotoAlbum: false,correctOrientation:true});

          return true;

         }                                

          }

		});

       };
                 
    function onSuccess(imageURI) {

         imagevideo = imageURI;
				$('#videothumbimg').attr('src', imagevideo); 
	    		 $('#videothumbimg').css({'width':'50px','height':'50px'});
      //   $('.file-input-wrapper5 > .btn-file-input5').css('background-image', 'url('+imageURI+')');

     }

    function onFail(message) {

         navigator.notification.alert('Failed because: ' + message);

      } 
      
$scope.createvideo = function(){
	
if((($("#video").get(0).files[0].size) / 1024 / 1024) <= 10){
    
       $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
    /*  var formData = new FormData();
      formData.append('api_key', appKey);
      formData.append('button_id', buttonId);
      formData.append('title', $scope.videocreate.title);
      formData.append('description',$scope.videocreate.desc);
      formData.append('video',$("#video").get(0).files[0]);*/
    //  console.log("api_key: "+appKey+ "button_id :" +buttonId+ "title: " +$scope.videocreate.title+ "description: " +$scope.videocreate.desc+ "video :" +$("#video").get(0).files[0]+ "video_thumbnail :" +$("#videothumb").get(0).files[0]+);
       
 if(imagevideo){
                           
     cordova.exec(function(response){
		//alert(response);
		 var resultvideo = response;
                 
            videoimg=resultvideo.video.url;
		   videotitle=resultvideo.title;
		   videodesc=resultvideo.text;
		   videoelement = resultvideo.id;
		   videothumb = resultvideo.video.thumbnail;
           $ionicLoading.hide();  
	       $state.go('videoedit');
  
  	 }, 
  	 function(e){alert(e);$ionicLoading.hide();}, "Thumbnail", "thumbnail",[appKey,buttonId,$scope.videocreate.title,$scope.videocreate.desc,$('input[name="video"]').val(),imagevideo])
}
else
{
	 cordova.exec(function(response){
		alert(JSON.stringify(response));
  var resultvideo = response;
          
          videoimg=resultvideo.video.url;
		   videotitle=resultvideo.title;
		  videodesc=resultvideo.text;
		   videoelement = resultvideo.id;
		  videothumb = resultvideo.video.thumbnail;
           $ionicLoading.hide();  
	       $state.go('videoedit');
  	 }, 
                  function(e){alert(e);$ionicLoading.hide();}, "Thumbnail", "thumbnail",[appKey,buttonId,$scope.videocreate.title,$scope.videocreate.desc,$('input[name="video"]').val(),"Nothumbnail"])

}

}else{
          var alertPopup = $ionicPopup.alert({
             title: 'MAB',
             template: 'Please choose Video File below 10MB!'
           });
           alertPopup.then(function(res) {
             //console.log('Thank you for not eating my delicious ice cream cone');
           });
    }
   
}

$scope.navvideo = function(){
   $state.go('navicon');
 } 
$scope.homevideo = function(){
   $state.go('newapp');
 } 
 $scope.backvideo= function(){
     $state.go('elements');
  }
    
});

var mapid='';
var custommapid='';
var addressid='';
var addressname='';

control.controller('mapCtrl',function($scope,$state,$ionicLoading,$ionicScrollDelegate){ 

$ionicScrollDelegate.scrollTop();

$scope.createmapaddr={}

$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

$scope.createmap = function(){
	
if($scope.createmapaddr.maptitle){

 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });

	  $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/elements/create_map.json",
          data:{'api_key':appKey,'button_id':buttonId,'text':$scope.createmapaddr.maptitle},
          success:function(response){
			  //  alert(JSON.stringify(response)); 	
			    mapid=response.id;  
			    
             $.ajax({
                        type: "POST",
                        url: "http://build.myappbuilder.com/api/elements/addresses.json",
                        data:{'api_key':appKey,'id':mapid,'address':$scope.createmapaddr.maptitle},
                        cache: false,
                        success:function(response){
							//alert(JSON.stringify(response)); 	
                          $ionicLoading.hide();
						addressid=response.id;
						addressname=response.address;
                         $state.go('mapedit');	 
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });            
            
          },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);

            navigator.notification.alert(error.responseText);
          }
      });
    }else{
      navigator.notification.alert("Enter The Address");
    }

}

$scope.navmap = function(){
   $state.go('navicon');
 } 
$scope.homemap = function(){
   $state.go('newapp');
 } 
 
 $scope.backmap= function(){
    $state.go('elements');
 } 
 
});

control.controller('mapeditCtrl',function($scope,$state,$ionicLoading,$ionicScrollDelegate){ 

$ionicScrollDelegate.scrollTop();

$scope.editmap={}
$scope.createeditmap={}

$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}
$scope.createeditmap.title= addressname;


$scope.mapeditcustom = function(){

	$('#mapcustitle').val('');
	$('#mapcusvalue').val('');
	

    if($scope.editmap.custommaptitle){
      if($scope.editmap.custommapvalue){
	 
      $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });

       $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/custom_values.json",
          data:{'api_key':appKey,'element_id':mapid,'title':$scope.editmap.custommaptitle,'value':$scope.editmap.custommapvalue},
          success:function(response){
			 custommapid = response.id;

            $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':mapid},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
                        
						    $scope.editmappage = response;
                  //   alert(JSON.stringify( $scope.editmappage));
						   $state.reload();   					  
                          
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);
            navigator.notification.alert(error.responseText);
          }
      });
    }
      }else{
      navigator.notification.alert("Enter Title And Value");
    }
   
  }

$scope.removemapCustomValue = function(id){

    custommapid = id;
    
   $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
          $.ajax({
            type: "DELETE",
            url: "http://build.myappbuilder.com/api/custom_values.json",
            data: {"api_key":appKey,"id":custommapid},
            cache: false,
            success:function(response){
              $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':mapid},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();

						    $scope.editmappage = response;
						 //    alert(JSON.stringify($scope.editmappage));
						   $state.reload();   
						  
                          
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
            error:function(error,status){
               $ionicLoading.hide();
              navigator.notification.alert(error.responseText)
            }
          });
}

$scope.naveditmap = function(){
   $state.go('navicon');
 } 
$scope.homeeditmap = function(){
   $state.go('newapp');
 }
 $scope.backeditmap = function(){
     $state.go('map');
}
  

$scope.addAddress = function(){

    if($scope.createeditmap.title){
	 
      $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });

       $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/elements/addresses.json",
          data:{'api_key':appKey,'id':mapid,'address':$scope.createeditmap.title},
          success:function(response){
			newaddressid=response.id;
            $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/elements/addresses.json",
                        data:{'api_key':appKey,'id':mapid},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
                        
						    $scope.addresses = response;
                  //   alert(JSON.stringify( $scope.addresses));  
                   $scope.createeditmap.title='';   
						   $state.reload();                            
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);
            navigator.notification.alert(error.responseText);
          }
      });
    }
      else{
      navigator.notification.alert("Enter Title");
    }
   
  }

$scope.updateAddress = function(id,updateaddress){
	
	//  alert(JSON.stringify(id));
	  
      $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });

          var formData = new FormData();
            formData.append('api_key',appKey);
            formData.append('element_id',mapid);       
            formData.append('id',id);  
             formData.append('address',updateaddress); 
            
       $.ajax({
          type: "PUT",
          url: "http://build.myappbuilder.com/api/elements/addresses.json",
          data:formData,
           cache: false,
                  contentType: false,
                  processData: false,
                  success:function(response){
			 //    alert(JSON.stringify(response));
			      alert('successfully Updated');
                  $ionicLoading.hide();
                
                 
                },error:function(error){
                  $ionicLoading.hide();
                  navigator.notification.alert(error.responseText);
                }
            });
    }
 $scope.deleteAddress = function(id){
	 
 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
          $.ajax({
            type: "DELETE",
            url: "http://build.myappbuilder.com/api/elements/addresses/"+id+".json",
            data: {'api_key':appKey,'id':mapid},
            cache: false,
            success:function(response){
			//	alert(JSON.stringify(response));
              $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/elements/addresses.json",
                        data:{'api_key':appKey,'id':mapid},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
						$scope.addresses = response;
                 //    alert(JSON.stringify( $scope.addresses));   
						   $state.reload();   
						  
                          
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
            error:function(error,status){
               $ionicLoading.hide();
              navigator.notification.alert(error.responseText)
            }
          });
	 
}   
	
});

var audioelement='';
var audiotitle='';
var audiotext='';
var audioimg='';
var check=false;

control.controller('audioCtrl',function($scope,$state,$ionicLoading,$ionicScrollDelegate,$stateParams,$http,$location,$ionicPopup,$rootScope){ 

$ionicScrollDelegate.scrollTop();

$scope.navaudio = function(){
   $state.go('navicon');
 } 
$scope.homeaudio = function(){
   $state.go('newapp');
 }
 $scope.backaudio= function(){
    $state.go('elements');
   }
 
 function readURL10(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
			 $('#audiourlimg').attr({'src':"img/btn_audio.png"});
             $('#audiourlimg').css({'width':'50px','height':'50px'}); 			 
           $('.file-input-wrapper > .btn-file-input').css('background-image', 'url('+e.target.result+')');
            }

            reader.readAsDataURL(input.files[0]);
        }
  }

  $("#audio").change(function(){
	/* audio = document.getElementById("audio").value;
	  var res = audio.split(".");
	  var srt2=res[1];
	 alert(srt2);
	  if((srt2 == 'mp3') || (srt2 == 'wav') || (srt2 == 'aiff') || (srt2 == 'm4a') || (srt2 == 'ogg') || (srt2 == '3gp') || (srt2 == 'ape') || (srt2 == 'wv') || (srt2 == 'raw')){
		  checking=false;
		readURL10(this);
  }
  else
  {
	  alert('Please select an audio');	
   $('#audiourlimg').attr({'src':"img/no_audio.png"});
	  checking=true;
   }*/
    readURL10(this);  
  });
  
   function readURL11(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
			 $('#audioimg').attr('src', e.target.result);	
			 	$('#audioimg').css({'width':'50px','height':'50px'}); 	
          //  $('.file-input-wrapper > .btn-file-input').css('background-image', 'url('+e.target.result+')');
            }

            reader.readAsDataURL(input.files[0]);
        }
  }

  $("#audiothumb").change(function(){
	 /*  localStorage.audiothumb = document.getElementById("audiothumb").value;
	  var res = localStorage.audiothumb.split(".");
	  var srt2=res[1];
	  if((srt2 == 'jpg') || (srt2 == 'png') || (srt2 == 'jpeg')){
		  checking=false;
		
  }
  else
  {
	  alert('Please select an thumbnail image');
	  checking=true;
	 $('#audioimg').attr({'src':"img/no_image.png"});
   }*/
     readURL11(this); 
  });

$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}
 
 	
$scope.audiocreate={}

$scope.createaudio = function(){	

if((($("#audio").get(0).files[0].size) / 1024 / 1024) <= 10){
	
	 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
    
      
	 var formData = new FormData();
	  formData.append('api_key', appKey);
      formData.append('button_id', buttonId);
      formData.append('title', $scope.audiocreate.title);
      formData.append('description',$scope.audiocreate.desc);
      formData.append('audio', $("#audio").get(0).files[0]);    
      
      if($('#audiothumb').get(0).files[0]){
            formData.append('audio_thumbnail',$('#audiothumb').get(0).files[0]);   
       }else{
            formData.append('audio_thumbnail_url', 'http://www.nuatransmedia.com/iBookImages/btn_audio.png');
       }
                            
	  $http.post('http://build.myappbuilder.com/api/elements/create_audio.json', formData, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                      })
                      
                      .success(function(data,status, headers, config){

						  $ionicLoading.hide();
						  $state.go('audioedit');
						  audioelement=data.id;
						  audiotitle=data.title;
						  audiotext=data.text;
						  audioimg=data.audio.thumbnail;
						  audio=data.audio.url;
					  })
					  .error(function(data,status, headers, config){
                        $ionicLoading.hide();
                        alert(JSON.stringify(data));
                      });
}else{
          var alertPopup = $ionicPopup.alert({
             title: 'MAB',
             template: 'Please choose Audio File below 10MB!'
           });
           alertPopup.then(function(res) {
             //console.log('Thank you for not eating my delicious ice cream cone');
           });
    }

}
 
});

var customeditaudioid='';

control.controller('audioeditCtrl',function($scope,$state,$ionicScrollDelegate,$ionicLoading,$stateParams,$http,$location,$ionicPopup,$rootScope){ 
 
 $ionicScrollDelegate.scrollTop();
  
function readURL12(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
			$('#audioediturlimg').attr({'src':"img/btn_audio.png"});
             $('#audioediturlimg').css({'width':'50px','height':'50px'}); 					
          $('.file-input-wrapper > .btn-file-input').css('background-image', 'url('+e.target.result+')');
            }

            reader.readAsDataURL(input.files[0]);
        }
  }

  $("#editaudio").change(function(){
	 /*  editaudio = document.getElementById("editaudio").value;
	  var res = editaudio.split(".");
	  var srt2=res[1];
	  alert(srt2);
	  if((srt2 == 'mp3') || (srt2 == 'wav') || (srt2 == 'aiff') || (srt2 == 'm4a') || (srt2 == 'ogg') || (srt2 == '3gp')){
		  checking=false;
		check=true;
      readURL12(this);
  }
  else
  {
	  alert('Please select an audio');	
   $('#audioediturlimg').attr({'src':"img/no_audio.png"});
	  checking=true;
   }*/
   check=true;
    readURL12(this);   
  });
	  
  
   function readURL13(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
			 $('#audioeditimg').attr('src', e.target.result);	
			 
           // $('.file-input-wrapper > .btn-file-input').css('background-image', 'url('+e.target.result+')');
            }

            reader.readAsDataURL(input.files[0]);
        }
  }

  $("#editaudiothumb").change(function(){
	  	  
/*editaudiothumb = document.getElementById("editaudiothumb").value;
	  var res = editaudiothumb.split(".");
	  var srt2=res[1];
	  if((srt2 == 'jpg') || (srt2 == 'png') || (srt2 == 'jpeg')){
		  checking=false;
		  check=true;
		 readURL13(this);
  }
  else
  {
	  alert('Please select an image');
	  checking=true;
	 $('#audioeditimg').attr({'src':"img/no_image.png"});
   }*/
     check=true;
    readURL13(this);   
  });
  
$scope.naveditaudio = function(){
   $state.go('navicon');
 } 
$scope.homeeditaudio = function(){
   $state.go('newapp');
 }
 $scope.backeditaudio = function(){
    $state.go('audio');
  }

$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}
 
 	
$scope.createeditaudio={}

 $scope.tinymceOptions = {
        

        menubar: false,
        theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime table contextmenu ",
            "emoticons textcolor"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | bullist numlist outdent indent | link image | alignleft aligncenter alignright alignjustify forecolor backcolor"
        
	};
	
 
$scope.createeditaudio.editaudiotitle=audiotitle;
$scope.createeditaudio.editaudiotext=audiotext;
if(audioimg){
    $('#audioeditimg').attr({'src':audioimg});
    	$('#audioeditimg').css({'width':'50px','height':'50px'}); 		
  }
 if(audio){
    $('#editaudio').attr({'url':audio});   
    $('#audioediturlimg').attr({'src':audioimg});
    $('#audioediturlimg').css({'width':'50px','height':'50px'}); 		
	
  }

$scope.updateaudio = function(){            
	
	 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
  
	  var formData = new FormData();
           formData.append('api_key',appKey);
           formData.append('id',audioelement);       
           formData.append('title',$scope.createeditaudio.editaudiotitle);
           formData.append('text',$scope.createeditaudio.editaudiotext);
            if(check==true){  
          formData.append('audio', $("#editaudio").get(0).files[0]);
            if($('#editaudiothumb').get(0).files[0]){
           formData.append('audio_thumbnail', $('#editaudiothumb').get(0).files[0]);
       }else{
            formData.append('audio_thumbnail_url', 'http://www.nuatransmedia.com/iBookImages/btn_audio.png');
       }
          
	  }else{
		   $('#editaudio').attr({'url':audio}); 
		       $('#audioediturlimg').attr({'src':audioimg});
    $('#audioediturlimg').css({'width':'50px','height':'50px'}); 		
		    $('#audioeditimg').attr({'src':audioimg});
    	$('#audioeditimg').css({'width':'50px','height':'50px'}); 	
	   }        
         $http.put('http://build.myappbuilder.com/api/elements/update_audio.json', formData, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                      })
                      
                      .success(function(data,status, headers, config){
					// alert(JSON.stringify(data));
					  alert('Successfully updated');
						  $ionicLoading.hide();

					  })
					  .error(function(data,status, headers, config){
                        $ionicLoading.hide();
                        alert(JSON.stringify(data));
                      });
}



 $scope.cuseditaudio={}
 
$scope.createaudioedit = function(){

	$('#editcusaudiotitle').val('');
	$('#editcusaudiovalue').val('');
	
    if($scope.cuseditaudio.customeditaudioTitle){
      if($scope.cuseditaudio.customeditaudiovalue){
	 
      $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });

       $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/custom_values.json",
          data:{'api_key':appKey,'element_id':audioelement,'title':$scope.cuseditaudio.customeditaudioTitle,'value':$scope.cuseditaudio.customeditaudiovalue},
          success:function(response){
			 customeditaudioid = response.id;
     
            $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':audioelement},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
						    $scope.editaudiopage = response;
						//    alert(JSON.stringify($scope.editaudiopage));
						   $state.reload();   
                      
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);
            navigator.notification.alert(error.responseText);
          }
      });
    }
      }else{
      navigator.notification.alert("Enter Title And Value");
    }
   
  }


$scope.removeaudioCustomValue = function(id){

    customeditaudioid = id;
    
   $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
          $.ajax({
            type: "DELETE",
            url: "http://build.myappbuilder.com/api/custom_values.json",
            data: {"api_key":appKey,"id":customeditaudioid},
            cache: false,
            success:function(response){
              $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':audioelement},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
						  
						    $scope.editaudiopage = response;
						//    alert(JSON.stringify($scope.editaudiopage));
						   $state.reload();    						  
                          
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
            error:function(error,status){
               $ionicLoading.hide();
              navigator.notification.alert(error.responseText)
            }
          });
}

});

 
var webelement='';
var webname='';
var weburl='';
var webdesc='';

control.controller('webCtrl',function($scope,$state,$ionicLoading,$ionicScrollDelegate){ 

$ionicScrollDelegate.scrollTop();

$scope.navlive = function(){
   $state.go('navicon');
 } 
$scope.homelive = function(){
   $state.go('newapp');
 }
$scope.backlive= function(){
      $state.go('elements');
 }
 
$scope.createweb={}

$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

$scope.createwebpage = function(){

if($scope.createweb.livewebname){
	
	 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
	  $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/elements/create_web_page.json",
          data:{'api_key':appKey,'button_id':buttonId,'title':$scope.createweb.livewebname,'url':$scope.createweb.liveweburl,'description':$scope.createweb.livewebdesc},
          success:function(response){
			//    alert(JSON.stringify(response)); 	
			 $ionicLoading.hide();
			    webelement=response.id;
			    webname=response.title;
			    webdesc=response.text;
			    weburl= response.live_url;
            $state.go('webedit');	
          },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);

            navigator.notification.alert(error.responseText);
          }
      });
    }else{
      navigator.notification.alert("Enter The Name and Valid Url");
    }

}
 
});

var customwebid='';

control.controller('webeditCtrl',function($scope,$state,$ionicLoading,$ionicScrollDelegate){ 
	
	$ionicScrollDelegate.scrollTop();
	
	$scope.naveditweb = function(){
   $state.go('navicon');
 } 
$scope.homeeditweb = function(){
   $state.go('newapp');
 }
$scope.backeditweb = function(){
  $state.go('web');
}
  
	$scope.editcusweb={}
	$scope.createwebedit={}

$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

$scope.createwebedit.editwebname = webname;
$scope.createwebedit.editweburl= weburl;
$scope.createwebedit.editwebdesc=webdesc

$scope.updateweb = function(){

	 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
			var formData = new FormData();
           formData.append('api_key',appKey);
           formData.append('id',webelement);  
            formData.append('title',$scope.createwebedit.editwebname);  
          //  alert(JSON.stringify($scope.createwebedit.editwebname));
             formData.append('text',$scope.createwebedit.editwebdesc);    
            formData.append('live_url',$scope.createwebedit.editweburl); 
                  
     if((($scope.createwebedit.editwebname)!=webname) || (($scope.createwebedit.editwebdesc)!=webdesc) || (($scope.createwebedit.editweburl)!=weburl)){  

          $.ajax({
                  type: "PUT",
                  url: "http://build.myappbuilder.com/api/elements/update_web_page.json",
                  data: formData,
                  cache: false,
                  contentType: false,
                  processData: false,
                  success:function(response){
			//  alert(JSON.stringify(response));
			      alert('successfully Updated');
                  $ionicLoading.hide();
                
                 
                },error:function(error){
                  $ionicLoading.hide();
                  navigator.notification.alert(error.responseText);
                }
            });
		}
		
		else
		{	$ionicLoading.hide();
		}
}

$scope.createcusweb = function(){

$('#editwebtitle').val('');
	$('#editwebvalue').val('');
	

    if($scope.editcusweb.cuseditwebtitle){
      if($scope.editcusweb.cuseditwebvalue){
	 
      $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });

       $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/custom_values.json",
          data:{'api_key':appKey,'element_id':webelement,'title':$scope.editcusweb.cuseditwebtitle,'value':$scope.editcusweb.cuseditwebvalue},
          success:function(response){
			 customwebid = response.id;

            $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':webelement},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
                        
						    $scope.editwebpage = response;
                 //    alert(JSON.stringify( $scope.editwebpage));
						   $state.reload();   
						  
                          
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);
            navigator.notification.alert(error.responseText);
          }
      });
    }
      }else{
      navigator.notification.alert("Enter Title And Value");
    }
   
  }

	 $scope.tinymceOptions = {
        

        menubar: false,
        theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime table contextmenu ",
            "emoticons textcolor"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | bullist numlist outdent indent | link image | alignleft aligncenter alignright alignjustify forecolor backcolor"
        
	};

$scope.removewebCustomValue = function(id){

    customwebid = id;
    
   $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
          $.ajax({
            type: "DELETE",
            url: "http://build.myappbuilder.com/api/custom_values.json",
            data: {"api_key":appKey,"id":customwebid},
            cache: false,
            success:function(response){
              $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':webelement},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();

						    $scope.editwebpage = response;
                   //  alert(JSON.stringify( $scope.editwebpage));
						   $state.reload();   			  
                          
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
            error:function(error,status){
               $ionicLoading.hide();
              navigator.notification.alert(error.responseText)
            }
          });
}	

});

var rsselement='';
var rssname='';
var rssdesc='';
var rssurl='';
var customrssid='';


control.controller('rssCtrl',function($scope,$state,$ionicLoading,$ionicScrollDelegate){ 

$ionicScrollDelegate.scrollTop();

	$scope.navrss = function(){
   $state.go('navicon');
 } 
$scope.homerss = function(){
   $state.go('newapp');
 } 
  $scope.backrss= function(){
         $state.go('elements');
   }
  
	$scope.createrss={}

$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

$scope.createrssform = function(){

if($scope.createrss.rssname){
	
	 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
	  $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/elements/create_rss.json",
          data:{'api_key':appKey,'button_id':buttonId,'title':$scope.createrss.rssname,'url':$scope.createrss.rssurl,'description':$scope.createrss.rssdesc},
          success:function(response){
			 //   alert(JSON.stringify(response)); 	
			    rsselement=response.id;
			    rssname=response.title;
			    rssdesc=response.text;
			    rssurl= response.rss_url;
			      $ionicLoading.hide();
            $state.go('rssedit');	
          },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);

            navigator.notification.alert(error.responseText);
          }
      });
    }else{
      navigator.notification.alert("Enter The Name and Valid Url");
    }

}

});

control.controller('rsseditCtrl',function($scope,$state,$ionicLoading,$ionicScrollDelegate){ 
	
	$ionicScrollDelegate.scrollTop();
	
	$scope.naveditrss = function(){
   $state.go('navicon');
 } 
$scope.homeeditrss = function(){
   $state.go('newapp');
 }
$scope.backeditrss = function(){
    $state.go('rss');
}
  
  
	$scope.editcusrss={}
	$scope.createrssedit={}

$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

$scope.createrssedit.editrssname = rssname;
$scope.createrssedit.editrssurl= rssurl;
$scope.createrssedit.editrssdesc=rssdesc

$scope.updaterss = function(){

	 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      if((($scope.createrssedit.editrssname)==rssname) && (($scope.createrssedit.editrssdesc)==rssdesc) && (($scope.createrssedit.editrssurl)==rssurl)){  
  
			$ionicLoading.hide();
		}
		else
		{
	  var formData = new FormData();
           formData.append('api_key',appKey);
           formData.append('id',rsselement);    
            formData.append('rss_url',$scope.createrssedit.editrssurl);
           formData.append('text',$scope.createrssedit.editrssdesc);   
           formData.append('title',$scope.createrssedit.editrssname);      

          $.ajax({
                  type: "PUT",
                  url: "http://build.myappbuilder.com/api/elements/update_rss.json",
                  data: formData,
                  cache: false,
                  contentType: false,
                  processData: false,
                  success:function(response){
			 //  alert(JSON.stringify(response));
			      alert('successfully Updated');
                  $ionicLoading.hide();
                
                 
                },error:function(error){
                  $ionicLoading.hide();
                  navigator.notification.alert(error.responseText);
                }
            });
		}
			
}

$scope.createcusrss = function(){

$('#editrsstitle').val('');
	$('#editrssvalue').val('');
	

    if($scope.editcusrss.cuseditrsstitle){
      if($scope.editcusrss.cuseditrssvalue){
	 
      $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });

       $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/custom_values.json",
          data:{'api_key':appKey,'element_id':rsselement,'title':$scope.editcusrss.cuseditrsstitle,'value':$scope.editcusrss.cuseditrssvalue},
          success:function(response){
			 customrssid = response.id;

            $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':rsselement},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
                        
						    $scope.editrsspage = response;
                 //    alert(JSON.stringify( $scope.editrsspage));
						   $state.reload();   
						  
                          
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);
            navigator.notification.alert(error.responseText);
          }
      });
    }
      }else{
      navigator.notification.alert("Enter Title And Value");
    }
   
  }

	 $scope.tinymceOptions = {
        

        menubar: false,
        theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime table contextmenu ",
            "emoticons textcolor"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | bullist numlist outdent indent | link image | alignleft aligncenter alignright alignjustify forecolor backcolor"
        
	};

$scope.removerssCustomValue = function(id){

    customrssid = id;
    
   $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
          $.ajax({
            type: "DELETE",
            url: "http://build.myappbuilder.com/api/custom_values.json",
            data: {"api_key":appKey,"id":customrssid},
            cache: false,
            success:function(response){
              $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':rsselement},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
	   
						    $scope.editrsspage = response;
                   //  alert(JSON.stringify( $scope.editrsspage));
						   $state.reload();   		  
                          
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
            error:function(error,status){
               $ionicLoading.hide();
              navigator.notification.alert(error.responseText)
            }
          });
}	

});

var customtaskid='';
var taskelement='';
var tasklistid='';

control.controller('taskCtrl',function($scope,$state,$ionicLoading,$ionicScrollDelegate){ 

$ionicScrollDelegate.scrollTop();

$scope.navtask = function(){
   $state.go('navicon');
 } 
$scope.hometask = function(){
   $state.go('newapp');
 }
$scope.backtask= function(){
    $state.go('elements');
}

	$scope.createtask={}

$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

$scope.addTask = function(){
	
	$ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
	 $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/elements/create_task_list.json",
          data:{'api_key':appKey,'button_id':buttonId},
          success:function(response){
			// alert(JSON.stringify(response));
			  $ionicLoading.hide();
			taskelement=response.id;
			 //alert(JSON.stringify(taskelement));
           $state.go('taskedit');
            },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);
            navigator.notification.alert(error.responseText);
          }
      });
     } 

});

control.controller('taskeditCtrl',function($scope,$state,$ionicLoading,$ionicScrollDelegate){ 

$ionicScrollDelegate.scrollTop();

$scope.navedittask = function(){
   $state.go('navicon');
 } 
$scope.homeedittask = function(){
   $state.go('newapp');
 }
 $scope.backedittask = function(){
     $state.go('task');
 }
  
  
	$scope.editcustask={}
	$scope.createedittask={}

$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

$scope.addeditTask = function(task,desc){

	if($scope.createedittask.taskTitle)
	{
		if($scope.createedittask.taskDescription)
		{
	$ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
       $.ajax({
                        type: "POST",
                        url: "http://build.myappbuilder.com/api/elements/tasks.json",
                        data:{'api_key':appKey,'id':taskelement,'title':$scope.createedittask.taskTitle,'description':$scope.createedittask.taskDescription},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
                       //   alert(JSON.stringify(response));		
                          tasklistid=response.id;			  
              $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/elements/tasks.json",
                        data:{'api_key':appKey,'id':taskelement},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
                        
						    $scope.tasks = response;
               //      alert(JSON.stringify( $scope.tasks));
                           $scope.createedittask.taskTitle='';  
                           $scope.createedittask.taskDescription='';    
						   $state.reload();   

                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });   
		  }
		  }else
		  {
			  alert("Enter Title and Description");
		  }           
	
}

$scope.deleteTask = function(id){

 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
          $.ajax({
            type: "DELETE",
            url: "http://build.myappbuilder.com/api/elements/tasks/"+id+".json",
            data: {"api_key":appKey,'id':taskelement},
            cache: false,
            success:function(response){
			//	alert(JSON.stringify(response));
               $ionicLoading.hide();
               $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/elements/tasks.json",
                        data:{'api_key':appKey,'id':taskelement},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
                        
						    $scope.tasks = response;
                   //  alert(JSON.stringify( $scope.tasks));
						   $state.reload();   
						  
                          
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              }); 
            },
            error:function(error,status){
               $ionicLoading.hide();
              navigator.notification.alert(error.responseText)
            }
          });
}	

$scope.updateTask = function(updateid,title,desc){

 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
            
        var formData = new FormData();
            formData.append('api_key',appKey);
            formData.append('element_id',taskelement);    
            formData.append('id',updateid);
            formData.append('title',title);   
            formData.append('description',desc);     
           
           
          $.ajax({
            type: "PUT",
            url: "http://build.myappbuilder.com/api/elements/tasks.json",
            data: formData,
             cache: false,
                  contentType: false,
                  processData: false,
                  success:function(response){
			// alert(JSON.stringify(response));
			      alert('successfully Updated');
                  $ionicLoading.hide();
                
            },
            error:function(error,status){
               $ionicLoading.hide();
             navigator.notification.alert(error.responseText)
            }
          });
}	


$scope.createtaskcustom = function(){

$('#taskcustitle').val('');
	$('#taskcusvalue').val('');
	

    if($scope.editcustask.customtasktitle){
      if($scope.editcustask.customtaskvalue){
	 
      $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });

       $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/custom_values.json",
          data:{'api_key':appKey,'element_id':taskelement,'title':$scope.editcustask.customtasktitle,'value':$scope.editcustask.customtaskvalue},
          success:function(response){
			 customtaskid = response.id;

            $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':taskelement},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
                        
						    $scope.taskpage = response;
                //     alert(JSON.stringify( $scope.taskpage));
						   $state.reload();   
						  
                          
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);
            navigator.notification.alert(error.responseText);
          }
      });
    }
      }else{
      navigator.notification.alert("Enter Title And Value");
    }
   
  }

$scope.removetaskCustomValue = function(id){

    customtaskid = id;
    
   $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
          $.ajax({
            type: "DELETE",
            url: "http://build.myappbuilder.com/api/custom_values.json",
            data: {"api_key":appKey,"id":customtaskid},
            cache: false,
            success:function(response){
              $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':taskelement},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
	   
						     $scope.taskpage = response;
                  //   alert(JSON.stringify( $scope.taskpage));
						   $state.reload();   	  
                          
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
            error:function(error,status){
               $ionicLoading.hide();
              navigator.notification.alert(error.responseText)
            }
          });
}	


});

var imageeditsplash='';
var imageeditstore='';
var imageeditapp='';

control.controller('editAppCtrl',function($scope,$state,$ionicScrollDelegate,$ionicActionSheet,$ionicModal,$ionicPopup,$ionicLoading,$sce,$http,$ionicScrollDelegate){ 

$ionicScrollDelegate.scrollTop();

$scope.homeappedit = function(){
	$state.go('sample');
} 
 
  if(appimg){
    $('#editapp').attr({'src':appimg});
    $('#editapp').css({'width':'50px','height':'50px'});
  }
  if(splash){
    $('#editsplash').attr({'src':splash});
    $('#editsplash').css({'width':'50px','height':'50px'});
  }
  if(store){
    $('#editstore').attr({'src':store});
    $('#editstore').css({'width':'50px','height':'50px'});
  }
  
  $scope.tinymceOptions = {
        

        menubar: false,
        theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime table contextmenu ",
            "emoticons textcolor"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | bullist numlist outdent indent | link image | alignleft aligncenter alignright alignjustify forecolor backcolor"
        
	};

	$scope.editbook={}
	$scope.editappcreate={}
      
$scope.editappcreate.editgridAppTitle=appTitle;
$scope.editappcreate.editmypost=appDesc;
$scope.editbook.editdomain=appdom;
$scope.editbook.subdomain=appsubdomain;

$scope.editbook.bar_color=colour;
$scope.editbook.bar_button_color=buttoncolour;
$scope.editbook.button_color=button;

if(colour == 'undefined'){	
$('#editbarimg').attr({'src':"img/positive.png"});
$scope.bar_color = 'bar-positive';
}
else
{
$('#editbarimg').attr({'src':"img/"+colour+".png"});
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$('#editbarbuttonimg').attr({'src':"img/positive.png"});
$scope.bar_button_color ='button-positive'; 
}
else
{
$('#editbarbuttonimg').attr({'src':"img/"+buttoncolour+".png"});
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$('#editbuttonimg').attr({'src':"img/positive.png"});
$scope.button_color = 'button-positive';
}
else
{
$('#editbuttonimg').attr({'src':"img/"+button+".png"});
$scope.button_color='button-'+button;
}

$scope.editsplashselect = function(){

     $ionicActionSheet.show({

          titleText: '<b><font size="4">Choose</font></b>',
            buttons: [
             { text: 'Camera' },
             { text: 'PhotoAlbum' },
              ],

            cancelText: 'Cancel',
             cancel: function() {
           // alert('CANCELLED');
             },
             
     buttonClicked: function(index) {
    // alert('BUTTON CLICKED', index);

       if(index==0){

         navigator.camera.getPicture(onSuccess4, onFail4, { quality: 50,

        destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.CAMERA,saveToPhotoAlbum: false,correctOrientation:true});

       return true;

       }

       else{

          navigator.camera.getPicture(onSuccess4, onFail4, { quality: 50,

          destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.PHOTOLIBRARY,saveToPhotoAlbum: false,correctOrientation:true});

          return true;

         }                                

          }

		});

       };
                 
    function onSuccess4(imageURI) {

         imageeditsplash = imageURI;
				$('#editsplash').attr('src', imageeditsplash); 
	    		 $('#editsplash').css({'width':'50px','height':'50px'});
      //   $('.file-input-wrapper5 > .btn-file-input5').css('background-image', 'url('+imageURI+')');

     }

    function onFail4(message) {

         navigator.notification.alert('Failed because: ' + message);

      } 
      
      $scope.editappselect = function(){

     $ionicActionSheet.show({

          titleText: '<b><font size="4">Choose</font></b>',
            buttons: [
             { text: 'Camera' },
             { text: 'PhotoAlbum' },
              ],

            cancelText: 'Cancel',
             cancel: function() {
           // alert('CANCELLED');
             },
             
     buttonClicked: function(index) {
    // alert('BUTTON CLICKED', index);

       if(index==0){

         navigator.camera.getPicture(onSuccess5, onFail5, { quality: 50,

        destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.CAMERA,saveToPhotoAlbum: false,correctOrientation:true});

       return true;

       }

       else{

          navigator.camera.getPicture(onSuccess5, onFail5, { quality: 50,

          destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.PHOTOLIBRARY,saveToPhotoAlbum: false,correctOrientation:true});

          return true;

         }                                

          }

		});

       };
                 
    function onSuccess5(imageURI) {

         imageeditapp = imageURI;
				$('#editapp').attr('src', imageeditapp); 
	    		 $('#editapp').css({'width':'50px','height':'50px'});
      //   $('.file-input-wrapper5 > .btn-file-input5').css('background-image', 'url('+imageURI+')');

     }

    function onFail5(message) {

         navigator.notification.alert('Failed because: ' + message);

      } 
      
      $scope.editstoreselect = function(){

     $ionicActionSheet.show({

          titleText: '<b><font size="4">Choose</font></b>',
            buttons: [
             { text: 'Camera' },
             { text: 'PhotoAlbum' },
              ],

            cancelText: 'Cancel',
             cancel: function() {
           // alert('CANCELLED');
             },
             
     buttonClicked: function(index) {
    // alert('BUTTON CLICKED', index);

       if(index==0){

         navigator.camera.getPicture(onSuccess6, onFail6, { quality: 50,

        destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.CAMERA,saveToPhotoAlbum: false,correctOrientation:true});

       return true;

       }

       else{

          navigator.camera.getPicture(onSuccess6, onFail6, { quality: 50,

          destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.PHOTOLIBRARY,saveToPhotoAlbum: false,correctOrientation:true});

          return true;

         }                                

          }

		});

       };
                 
    function onSuccess6(imageURI) {

         imageeditstore= imageURI;
				$('#editstore').attr('src', imageeditstore); 
	    		 $('#editstore').css({'width':'50px','height':'50px'});
      //   $('.file-input-wrapper5 > .btn-file-input5').css('background-image', 'url('+imageURI+')');

     }

    function onFail6(message) {

         navigator.notification.alert('Failed because: ' + message);

      } 
      
     $scope.editbar = function() {

                   $ionicActionSheet.show({

                                          titleText: 'Choose Bar Color',

                                          buttons: [

                                                    { text: '<p><img src="img/light.png" style="align:left;"/>&nbsp;Light&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/stable.png" style=""/>&nbsp;Stable&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/positive.png" style=""/>&nbsp;Positive&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/calm.png" style=""/>&nbsp;Calm&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/balanced.png" style=""/>&nbsp;Balanced&nbsp;</p>' },

                                                    { text: '<p><img src="img/energized.png" style=""/>&nbsp;Energized</p>' },

                                                    { text: '<p><img src="img/assertive.png" style=""/>&nbsp;Assertive&nbsp;</p>' },

                                                    { text: '<p><img src="img/royal.png" style=""/>&nbsp;Royal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/dark.png" style=""/>&nbsp;Dark&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    ],

                                          

                                          cancelText: 'Cancel',

                                          cancel: function() {

                                         // alert('CANCELLED');

                                          },

                                          buttonClicked: function(index) {

                                        //  alert('BUTTON CLICKED', index);

                                          if(index==0){

                                          barcolor = 'bar-light';

                                          $scope.editbook.bar_color = 'light';

                                          $scope.bar_color=barcolor;
                                          
                                          $('#editbarimg').attr({'src':"img/light.png"});

                                          $state.reload();

                                          }

                                          else if(index==1){

                                          barcolor = 'bar-stable';

                                          $scope.editbook.bar_color = 'stable';

                                          $scope.bar_color=barcolor;
                                          
                                          $('#editbarimg').attr({'src':"img/stable.png"});

                                          $state.reload();

                                          }

                                          else if(index==2){

                                          barcolor = 'bar-positive';

                                          $scope.editbook.bar_color = 'positive';

                                          $scope.bar_color=barcolor;
                                          
                                          $('#editbarimg').attr({'src':"img/positive.png"});

                                          $state.reload();

                                          }

                                          else if(index==3){

                                          barcolor = 'bar-calm';

                                          $scope.editbook.bar_color = 'calm';

                                          $scope.bar_color=barcolor;
                                          
                                          $('#editbarimg').attr({'src':"img/calm.png"});

                                          $state.reload();

                                          }

                                          else if(index==4){

                                          barcolor = 'bar-balanced';

                                          $scope.editbook.bar_color = 'balanced';

                                          $scope.bar_color=barcolor;
                                          
                                          $('#editbarimg').attr({'src':"img/balanced.png"});

                                          $state.reload();

                                          }

                                          else if(index==5){

                                          barcolor = 'bar-energized';

                                          $scope.editbook.bar_color = 'energized';

                                          $scope.bar_color=barcolor;
                                          
                                          $('#editbarimg').attr({'src':"img/energized.png"});

                                          $state.reload();

                                          }

                                          else if(index==6){

                                          barcolor = 'bar-assertive';

                                          $scope.editbook.bar_color = 'assertive';

                                          $scope.bar_color=barcolor;
                                          
                                          $('#editbarimg').attr({'src':"img/assertive.png"});

                                          $state.reload();

                                          }

                                          else if(index==7){

                                          barcolor = 'bar-royal';

                                          $scope.editbook.bar_color = 'royal';

                                          $scope.bar_color=barcolor;
                                          
                                          $('#editbarimg').attr({'src':"img/royal.png"});

                                          $state.reload();

                                          }

                                          else if(index==8){

                                          barcolor = 'bar-dark';

                                          $scope.editbook.bar_color = 'dark';

                                          $scope.bar_color=barcolor;
                                          
                                          $('#editbarimg').attr({'src':"img/dark.png"});

                                          $state.reload();

                                          }

                                          else{

                                          $state.reload();

                                          }

                                          

                                          return true;

                                          },

                                          destructiveButtonClicked: function() {

                                          alert('DESTRUCT');

                                          return true;

                                          }

                                          });

                   };     
             
    
    $scope.editbarbutton = function() {    

                   $ionicActionSheet.show({

                                          titleText: 'Choose Button Color',

                                          buttons: [

                                                    { text: '<p><img src="img/light.png" style="align:left;"/>&nbsp;Light&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/stable.png" style=""/>&nbsp;Stable&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/positive.png" style=""/>&nbsp;Positive&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/calm.png" style=""/>&nbsp;Calm&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/balanced.png" style=""/>&nbsp;Balanced&nbsp;</p>' },

                                                    { text: '<p><img src="img/energized.png" style=""/>&nbsp;Energized</p>' },

                                                    { text: '<p><img src="img/assertive.png" style=""/>&nbsp;Assertive&nbsp;</p>' },

                                                    { text: '<p><img src="img/royal.png" style=""/>&nbsp;Royal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/dark.png" style=""/>&nbsp;Dark&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    ],

                                          

                                          cancelText: 'Cancel',

                                          cancel: function() {

                                         // alert('CANCELLED');

                                          },

                                          buttonClicked: function(index2) {               

                                          if(index2==0){

                                          bar_button_color = 'button-light';

                                          $scope.editbook.bar_button_color = 'light';
                                
                                          $scope.bar_button_color = bar_button_color;
                                          
                                          $('#editbarbuttonimg').attr({'src':"img/light.png"});

                                          $state.reload();

                                          }

                                          else if(index2==1){

                                          bar_button_color = 'button-stable';

                                          $scope.editbook.bar_button_color = 'stable';

                                          $scope.bar_button_color=bar_button_color;
                                          
                                          $('#editbarbuttonimg').attr({'src':"img/stable.png"});

                                          $state.reload();

                                          }

                                          else if(index2==2){

                                          bar_button_color = 'button-positive';

                                          $scope.editbook.bar_button_color = 'positive';

                                          $scope.bar_button_color=bar_button_color;
                                          
                                          $('#editbarbuttonimg').attr({'src':"img/positive.png"});

                                          $state.reload();

                                          }

                                          else if(index2==3){

                                          bar_button_color = 'button-calm';

                                          $scope.editbook.bar_button_color = 'calm';

                                          $scope.bar_button_color=bar_button_color;
                                          
                                          $('#editbarbuttonimg').attr({'src':"img/calm.png"});

                                          $state.reload();

                                          }

                                          else if(index2==4){

                                          bar_button_color = 'button-balanced';

                                          $scope.editbook.bar_button_color = 'balanced';

                                          $scope.bar_button_color=bar_button_color;
                                          
                                          $('#editbarbuttonimg').attr({'src':"img/balanced.png"});

                                          $state.reload();

                                          }

                                          else if(index2==5){

                                          bar_button_color = 'button-energized';

                                          $scope.editbook.bar_button_color = 'energized';

                                          $scope.bar_button_color = bar_button_color;
                                          
                                          $('#editbarbuttonimg').attr({'src':"img/energized.png"});

                                          $state.reload();

                                          }

                                          else if(index2==6){

                                          bar_button_color = 'button-assertive';

                                          $scope.editbook.bar_button_color = 'assertive';

                                          $scope.bar_button_color=bar_button_color;
                                          
                                          $('#editbarbuttonimg').attr({'src':"img/assertive.png"});

                                          $state.reload();

                                          }

                                          else if(index2==7){

                                          bar_button_color = 'button-royal';

                                          $scope.editbook.bar_button_color = 'royal';

                                          $scope.bar_button_color=bar_button_color;
                                          
                                          $('#editbarbuttonimg').attr({'src':"img/royal.png"});
		
                                          $state.reload();

                                          }

                                          else if(index2==8){

                                          bar_button_color = 'button-dark';

                                          $scope.editbook.bar_button_color = 'dark';

                                          $scope.bar_button_color=bar_button_color;
                                          
                                          $('#editbarbuttonimg').attr({'src':"img/dark.png"});

                                          $state.reload();

                                          }

                                          else{

                                          $state.reload();

                                          }                                         

                                          return true;

                                          },

                                          destructiveButtonClicked: function() {

                                          alert('DESTRUCT');

                                          return true;

                                          }

                                          });

                   };  
 
   
   $scope.editbutton = function() {    

                   $ionicActionSheet.show({

                                          titleText: 'Choose Button Color',

                                          buttons: [

                                                    { text: '<p><img src="img/light.png" style="align:left;"/>&nbsp;Light&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/stable.png" style=""/>&nbsp;Stable&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/positive.png" style=""/>&nbsp;Positive&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/calm.png" style=""/>&nbsp;Calm&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/balanced.png" style=""/>&nbsp;Balanced&nbsp;</p>' },

                                                    { text: '<p><img src="img/energized.png" style=""/>&nbsp;Energized</p>' },

                                                    { text: '<p><img src="img/assertive.png" style=""/>&nbsp;Assertive&nbsp;</p>' },

                                                    { text: '<p><img src="img/royal.png" style=""/>&nbsp;Royal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    { text: '<p><img src="img/dark.png" style=""/>&nbsp;Dark&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' },

                                                    ],

                                          

                                          cancelText: 'Cancel',

                                          cancel: function() {

                                        //  alert('CANCELLED');

                                          },

                                          buttonClicked: function(index1) {

                                        //  alert('BUTTON CLICKED', index1);

                                          if(index1==0){
												
                                          button_color = 'button-light';

                                          $scope.editbook.button_color = 'light';

                                          $scope.button_color=button_color;
                                          
                                          $('#editbuttonimg').attr({'src':"img/light.png"});

                                          $state.reload();

                                          }

                                          else if(index1==1){

                                          button_color = 'button-stable';

                                          $scope.editbook.button_color = 'stable';

                                          $scope.button_color=button_color;
                                          
                                          $('#editbuttonimg').attr({'src':"img/stable.png"});

                                          $state.reload();

                                          }

                                          else if(index1==2){

                                          button_color = 'button-positive';

                                          $scope.editbook.button_color = 'positive';

                                          $scope.button_color=button_color;
                                          
                                          $('#editbuttonimg').attr({'src':"img/positive.png"});

                                          $state.reload();

                                          }

                                          else if(index1==3){

                                          button_color = 'button-calm';

                                          $scope.editbook.button_color = 'calm';

                                          $scope.button_color=button_color;
                                          
                                          $('#editbuttonimg').attr({'src':"img/calm.png"});

                                          $state.reload();

                                          }

                                          else if(index1==4){

                                          button_color = 'button-balanced';

                                          $scope.editbook.button_color = 'balanced';

                                          $scope.button_color=button_color;
                                          
                                          $('#editbuttonimg').attr({'src':"img/balanced.png"});

                                          $state.reload();

                                          }

                                          else if(index1==5){

                                          button_color = 'button-energized';

                                          $scope.editbook.button_color = 'energized';

                                          $scope.button_color=button_color;
                                          
                                          $('#editbuttonimg').attr({'src':"img/energized.png"});

                                          $state.reload();

                                          }

                                          else if(index1==6){

                                          button_color = 'button-assertive';

                                          $scope.editbook.button_color = 'assertive';

                                          $scope.button_color=button_color;
                                          
                                          $('#editbuttonimg').attr({'src':"img/assertive.png"});

                                          $state.reload();

                                          }

                                          else if(index1==7){

                                          button_color = 'button-royal';

                                          $scope.editbook.button_color = 'royal';

                                          $scope.button_color=button_color;
                                          
                                          $('#editbuttonimg').attr({'src':"img/royal.png"});

                                          $state.reload();

                                          }

                                          else if(index1==8){

                                          button_color = 'button-dark';

                                          $scope.editbook.button_color = 'dark';

                                          $scope.button_color = button_color;
                                          
                                          $('#editbuttonimg').attr({'src':"img/dark.png"});

                                          $state.reload();

                                          }

                                          else{

                                          $state.reload();

                                          }

                                          return true;

                                          },

                                          destructiveButtonClicked: function() {

                                          alert('DESTRUCT');

                                          return true;

                                          }

                                          });

                   };   
  
$scope.editupdatesettings = function(){                  
	 
      $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
 if(imageeditsplash == '' && imageeditapp == '' && imageeditstore == ''){
	  //alert('s');
	  
	 var formData = new FormData(); 
	  
        	
		 if($scope.editbook.editdomain != undefined){
			  formData.append('domain',$scope.editbook.editdomain);	
		   }
		    if($scope.editbook.subdomain != undefined){
			     formData.append('subdomain',$scope.editbook.subdomain);
			 }

            formData.append('api_key',appKey);
            formData.append('title',$scope.editappcreate.editgridAppTitle);
            formData.append('description',$scope.editappcreate.editmypost);		
            formData.append('bar_color', $scope.editbook.bar_color);
            formData.append('bar_button_color',$scope.editbook.bar_button_color);
            formData.append('button_color',$scope.editbook.button_color);

         $.ajax({
                  type: "PUT",
                  url: "http://build.myappbuilder.com/api/apps/settings/general.json",
                  data: formData,
                  cache: false,
                  contentType: false,
                  processData: false,
                  success:function(response){
					//  alert(JSON.stringify(response));
					  appTitle =response.title;
					  	colour=response.bar_color;
			buttoncolour=response.bar_button_color; 			
			button= response.button_color; 
                  $ionicLoading.hide();  
                   $state.reload();               
                  $state.go('editsocial');
                
                },error:function(error){
                  $ionicLoading.hide();
                  navigator.notification.alert(error.responseText);
                }
            });
		}
		else
		{	// alert('s1');
         $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
		
		    if($scope.editbook.subdomain != undefined){
				if($scope.editbook.editdomain  != undefined){
					Data = {api_key:appKey,title:$scope.editappcreate.editgridAppTitle,description:$scope.editappcreate.editmypost,bar_color:$scope.editbook.bar_color,bar_button_color:$scope.editbook.button_color,button_color:$scope.editbook.button_color,subdomain:$scope.editbook.subdomain,domain:$scope.editbook.editdomain };
			 
		   }
		   else{
				Data = {api_key:appKey,title:$scope.editappcreate.editgridAppTitle,description:$scope.editappcreate.editmypost,bar_color:$scope.editbook.bar_color,bar_button_color:$scope.editbook.button_color,button_color:$scope.editbook.button_color,subdomain:$scope.editbook.subdomain};
			   
			 }
		   }
		   else{
			   Data = {api_key:appKey,title:$scope.editappcreate.editgridAppTitle,description:$scope.editappcreate.editmypost,bar_color:$scope.editbook.bar_color,bar_button_color:$scope.editbook.button_color,button_color:$scope.editbook.button_color};
		   }
		   
		if(imageeditsplash != ''){
			// alert("splashimage");
			 cordova.exec(function(response){
				
            	  if(imageeditapp != ''){
			  // 	alert("appimage");
        cordova.exec(function(response){
			
            	 if(imageeditstore != ''){
					// alert("storeimage");
			 cordova.exec(function(response){
                        
                  $ionicLoading.hide();
                  appTitle=response.title;
                  	colour=response.bar_color;
              
			buttoncolour=response.bar_button_color; 			
			button= response.button_color; 
                $state.go('editsocial');
             }, function(e){alert(e); $ionicLoading.hide(); }, "ImageCompress", "imageCompress", ["512", "512", "app_store_image", imageeditstore, "http://build.myappbuilder.com/api/apps/settings/general.json?", "put",Data])
          
		 }	
            	 },function(e){alert(e); $ionicLoading.hide(); }, "ImageCompress", "imageCompress", ["114", "114", "app_image", imageeditapp, "http://build.myappbuilder.com/api/apps/settings/general.json?", "put",Data])
           	
		 } 
		 else{
			 if(imageeditstore != ''){
			// alert("storeimage"); 
			 cordova.exec(function(response){
            //	alert(JSON.stringify(response));
                  $ionicLoading.hide();
                  	colour=response.bar_color;
			buttoncolour=response.bar_button_color; 			
			button= response.button_color; 
                  $state.go('editsocial');
             }, function(e){alert(e); $ionicLoading.hide(); }, "ImageCompress", "imageCompress", ["512", "512", "app_store_image", imageeditstore, "http://build.myappbuilder.com/api/apps/settings/general.json?", "put",Data])
          
		 }
			 
		 }
                  $ionicLoading.hide();
                 
                  $state.go('editsocial');
            	 },function(e){alert(e); $ionicLoading.hide(); }, "ImageCompress", "imageCompress", ["320", "460", "splash_image", imageeditsplash, "http://build.myappbuilder.com/api/apps/settings/general.json?", "put",Data])
           
		}
		else{
			if(imageeditapp != ''){
			  // alert("appimage");	
        cordova.exec(function(response){
            	 if(imageeditstore != ''){
					 // alert("storeimage");
			 cordova.exec(function(response){
           //	alert(JSON.stringify(response));
                  $ionicLoading.hide();
                  	colour=response.bar_color;
			buttoncolour=response.bar_button_color; 			
			button= response.button_color; 
                  $state.go('editsocial');
             }, function(e){alert(e); $ionicLoading.hide(); }, "ImageCompress", "imageCompress", ["512", "512", "app_store_image", imageeditstore, "http://build.myappbuilder.com/api/apps/settings/general.json?", "put",Data])
          
		 }	
                  $ionicLoading.hide();
                  	
                  $state.go('editsocial');
            	 },function(e){alert(e); $ionicLoading.hide(); }, "ImageCompress", "imageCompress", ["114", "114", "app_image", imageeditapp, "http://build.myappbuilder.com/api/apps/settings/general.json?", "put",Data])
           	
		 } 
		 else{
			 if(imageeditstore != ''){
				//  alert("storeimage");
			 cordova.exec(function(response){
        	//alert(JSON.stringify(response));
                  $ionicLoading.hide();
                  	colour=response.bar_color;
			buttoncolour=response.bar_button_color; 			
			button= response.button_color; 
                  $state.go('editsocial');
             }, function(e){alert(e); $ionicLoading.hide(); }, "ImageCompress", "imageCompress", ["512", "512", "app_store_image", imageeditstore, "http://build.myappbuilder.com/api/apps/settings/general.json?", "put",Data])
          
		 }
		}
         
}
     
		}
       
    
  }
				 
});

var appTitle1='';

control.controller('editsocialCtrl',function($scope,$state,$ionicScrollDelegate,$ionicModal,$ionicPopup,$ionicLoading,$sce,$http,$ionicScrollDelegate){ 

$ionicScrollDelegate.scrollTop();

$scope.homeeditsocial = function(){
	$state.go('sample');
}

$scope.backeditsocial = function(){
	$state.go('editApp');
}

$scope.editbook1={}
			

$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}
          
$scope.editbook1.twitter_editusername=twitter;
$scope.editbook1.edittwitter_key=twitterkey;                
$scope.editbook1.edittwitter_secret=twittersecret;                 
$scope.editbook1.editfacebook_link= fb;                 
$scope.editbook1.editfacebook_key=fbkey                  
$scope.editbook1.editfacebook_secret=fbsecret;              
$scope.editbook1.editgplus_link=gplus;                  
$scope.editbook1.editgplus_key=gpluskey;                  
$scope.editbook1.editgplus_secret=gplussecret;                   
$scope.editbook1.edityoutube_link=youtube;                 
$scope.editbook1.editflickr_link=flickr;                  
$scope.editbook1.editpinterest_link=pin;  
             
$scope.updateeditSocialSettings = function(){              
  
   $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
           var formData = new FormData();
            formData.append('api_key',appKey);
            formData.append('twitter_link',$scope.editbook1.twitter_editusername);
            formData.append('twitter_key',$scope.editbook1.edittwitter_key);
            formData.append('twitter_secret',$scope.editbook1.edittwitter_secret);
            formData.append('facebook_link',$scope.editbook1.editfacebook_link);
            formData.append('facebook_key',$scope.editbook1.editfacebook_key);
            formData.append('facebook_secret',$scope.editbook1.editfacebook_secret);
            formData.append('gplus_link',$scope.editbook1.editgplus_link);	
            formData.append('gplus_key', $scope.editbook1.editgplus_key);
            formData.append('gplus_secret',$scope.editbook1.editgplus_secret);
            formData.append('youtube_link',$scope.editbook1.edityoutube_link);
            formData.append('flickr_link',$scope.editbook1.editflickr_link);
            formData.append('pinterest_link',$scope.editbook1.editpinterest_link);
            
           $.ajax({
                  type: "PUT",
                  url: "http://build.myappbuilder.com/api/apps/settings/social.json",
                  data: formData,
                  cache: false,
                  contentType: false,
                  processData: false,
                  success:function(response){
			  //   alert(JSON.stringify(response));
			      alert('successfully Updated');
			      $state.go('sample');
                  $ionicLoading.hide();
                 
                },error:function(error){
                  $ionicLoading.hide();
                  navigator.notification.alert(error.responseText);
                }
            });

  }

});

var imageeditbutton='';

control.controller('buttonlistCtrl',function($scope,$state,$ionicScrollDelegate,$ionicLoading,$ionicActionSheet){ 

$ionicScrollDelegate.scrollTop();

$scope.backbuttonlist = function(){
	$state.go('app');
}
$scope.homebuttonlist = function(){
	$state.go('sample');
}

$scope.editbuttoncreate={}
$('#editbuttonsrc').attr('src', localStorage.xxx); 

  // alert(localStorage.xxx);
$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

 $scope.editbuttonselect = function(){

     $ionicActionSheet.show({

          titleText: '<b><font size="4">Choose</font></b>',
            buttons: [
             { text: 'Camera' },
             { text: 'PhotoAlbum' },
              ],

            cancelText: 'Cancel',
             cancel: function() {
           // alert('CANCELLED');
             },
             
     buttonClicked: function(index) {
    // alert('BUTTON CLICKED', index);

       if(index==0){

         navigator.camera.getPicture(onSuccess, onFail, { quality: 50,

        destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.CAMERA,saveToPhotoAlbum: false,correctOrientation:true});

       return true;

       }

       else{

          navigator.camera.getPicture(onSuccess, onFail, { quality: 50,

          destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.PHOTOLIBRARY,saveToPhotoAlbum: false,correctOrientation:true});

          return true;

         }                                

          }

		});

       };
                 
    function onSuccess(imageURI) {

         imageeditbutton = imageURI;
       //  imageeditbutton = localStorage.xxx;
//alert(imageeditbutton);
				$('#editbuttonsrc').attr('src', imageeditbutton); 
	    		 $('#editbuttonsrc').css({'width':'50px','height':'50px'});
         $('.file-input-wrapper5 > .btn-file-input5').css('background-image', 'url('+imageURI+')');

     }

    function onFail(message) {

         navigator.notification.alert('Failed because: ' + message);

      } 

$scope.editbuttoncreate.editbuttontitle = buttonTitle;

 if(chapterImage){
    $('#editbuttonsrc').attr({'src':chapterImage});
     $('#editbuttonsrc').css({'width':'50px','height':'50px'});
    
  }
 
  $scope.updatebutton =function(){
	  
 	 if(chapterImage){
    $('#editbuttonimage').attr({'src':chapterImage});    
  }
  
	 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });

      	 Data1 = {api_key:appKey,id:buttonId,title:$scope.editbuttoncreate.editbuttontitle};
      	
		cordova.exec(function(response){
            	// alert(response);
            	 buttonId = response.id;
                    buttonTitle = response.title;  
                     alert("Successfully Updated");
                      $ionicLoading.hide();  
         }, function(e){alert(e);
          $ionicLoading.hide(); 
         var formData = new FormData();
        var methodData = '';
        
          methodData = 'PUT';
          urlData = "http://build.myappbuilder.com/api/buttons/via_url.json";
          formData.append('api_key',appKey);
          formData.append('id',buttonId);
          formData.append('title',$scope.editbuttoncreate.editbuttontitle);
          var letter = ($scope.editbuttoncreate.editbuttontitle).charAt(0).toUpperCase();
          
          formData.append('image', 'http://nuatransmedia.com/iBookImages/'+letter+'.png');
        
        
          $ionicLoading.show({
                content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
              });
        
            $.ajax({
                type: methodData,
                url: urlData,
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success:function(response){
                    $ionicLoading.hide();
               //  alert(JSON.stringify(response));
                    buttonId = response.id;
                    buttonTitle = response.title;
                   // $state.go('elements');
                },
                error:function(error,status){
                    $ionicLoading.hide();
                  
                    navigator.notification.alert("error: "+error.responseText);
                }
            });
         
         }, "ImageCompress", "imageCompress", ["57", "57", "image", imageeditbutton, "http://build.myappbuilder.com/api/buttons.json?", "put",Data1])

  }
});

var customdismapid='';

control.controller('mapdisplayCtrl',function($scope,$state,$ionicLoading,$ionicScrollDelegate){ 

$ionicScrollDelegate.scrollTop();

 if(Appwall.element_wall == '0'){
    $scope.elementAppWall = false;
  }else if(Appwall.element_wall == '1'){
    $scope.elementAppWall = true;
  }
  
  $scope.elementAppwallgoFun=function(){
	  $state.go('elementAppWall');
  }
  $scope.backdismap=function(){
       $state.go('previewmap');
  }
  $scope.homedismap=function(){
        $state.go('sample');
   }
	$scope.dismap={}
$scope.createdisplaymap={}

$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

 $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/elements/addresses.json",
                        data:{'api_key':appKey,'id':elementId},
                        cache: false,
                        success:function(response){                       
                          $ionicLoading.hide();
                           $scope.addressess = response; 
						   $state.reload();               

                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });    
              
   $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
						    $scope.dismappage = response;
						   $state.reload();   	  
                          
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              

$scope.adddisAddress = function(){
	
    if($scope.createdisplaymap.title){
	 
      $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });

       $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/elements/addresses.json",
          data:{'api_key':appKey,'id':elementId,'address':$scope.createdisplaymap.title},
          success:function(response){
			// alert(JSON.stringify(response));
            $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/elements/addresses.json",
                        data:{'api_key':appKey,'id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();                       
						    $scope.addressess = response;                 
						    $scope.createdisplaymap.title='';
						   $state.reload();   
						                            
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);
            navigator.notification.alert(error.responseText);
          }
      });
    }
      else{
      navigator.notification.alert("Enter Title");
    }
   
  }

$scope.updatedisplayAddress = function(id,updateaddresss){
	  
      $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });

          var formData = new FormData();
            formData.append('api_key',appKey);
            formData.append('element_id',elementId);       
            formData.append('id',id);  
             formData.append('address',updateaddresss); 
            
       $.ajax({
          type: "PUT",
          url: "http://build.myappbuilder.com/api/elements/addresses.json",
          data:formData,
           cache: false,
                  contentType: false,
                  processData: false,
                  success:function(response){
			      alert('successfully Updated');
                  $ionicLoading.hide();
                
                 
                },error:function(error){
                  $ionicLoading.hide();
                  navigator.notification.alert(error.responseText);
                }
            });
    }
 $scope.deletedisplayAddress = function(id){
	 
 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
          $.ajax({
            type: "DELETE",
            url: "http://build.myappbuilder.com/api/elements/addresses/"+id+".json",
            data: {'api_key':appKey,'id':elementId},
            cache: false,
            success:function(response){
				//alert(JSON.stringify(response));
              $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/elements/addresses.json",
                        data:{'api_key':appKey,'id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
						$scope.addressess = response;  
						   $state.reload();   
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
            error:function(error,status){
               $ionicLoading.hide();
              navigator.notification.alert(error.responseText)
            }
          });	 
}   

$scope.mapdiscustom = function(){

	$('#dismapcustitle').val('');
	$('#dismapcusvalue').val('');
	

    if($scope.dismap.discustommaptitle){
      if($scope.dismap.discustommapvalue){
	 
      $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });

       $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/custom_values.json",
          data:{'api_key':appKey,'element_id':elementId,'title':$scope.dismap.discustommaptitle,'value':$scope.dismap.discustommapvalue},
          success:function(response){
			 customdismapid = response.id;

            $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();                        
					    $scope.dismappage = response;
						   $state.reload();   
						  
                          
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);
            navigator.notification.alert(error.responseText);
          }
      });
    }
      }else{
      navigator.notification.alert("Enter Title And Value");
    }
   
  }

$scope.removedismapCustomValue = function(id){

    customdismapid = id;
    
   $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
          $.ajax({
            type: "DELETE",
            url: "http://build.myappbuilder.com/api/custom_values.json",
            data: {"api_key":appKey,"id":customdismapid},
            cache: false,
            success:function(response){
              $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
						    $scope.dismappage = response;
						   $state.reload();   	  
                          
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
            error:function(error,status){
               $ionicLoading.hide();
              navigator.notification.alert(error.responseText)
            }
          });
}

});

var customedisformid='';

control.controller('formdisplayCtrl',function($scope,$state,$ionicLoading,$ionicScrollDelegate){ 

$ionicScrollDelegate.scrollTop();

 if(Appwall.element_wall == '0'){
    $scope.elementAppWall = false;
  }else if(Appwall.element_wall == '1'){
    $scope.elementAppWall = true;
  }
  
  $scope.elementAppwallgoFun=function(){
	  $state.go('elementAppWall');
  }
  $scope.backdisform=function(){
      $state.go('previewform');
   }
  $scope.homedisform=function(){
      $state.go('sample');
  }
  
$scope.formdis={}
$scope.displayform={}

$scope.formdis.disemail = elementemail;
$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}
   
              
 $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
						    $scope.disformtype = response;
						   $state.reload();   	  
                          
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });     
                
$scope.updatedisform = function(){

	 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
	  var formData = new FormData();
           formData.append('api_key',appKey);
           formData.append('id',elementId);       
            formData.append('email_to_send_to',$scope.formdis.disemail);       

  if(($scope.formdis.disemail)!=elementemail){  

          $.ajax({
                  type: "PUT",
                  url: "http://build.myappbuilder.com/api/elements/update_contact_form.json",
                  data: formData,
                  cache: false,
                  contentType: false,
                  processData: false,
                  success:function(response){
			      alert('successfully Updated');
                  $ionicLoading.hide();
                
                 
                },error:function(error){
                  $ionicLoading.hide();
                  navigator.notification.alert(error.responseText);
                }
            });
		}
		else
		{
			 $ionicLoading.hide();
		 }
			
}

$scope.createdisformcustom = function(){

	$('#disformcustitle').val('');
	$('#disformcusvalue').val('');

    if($scope.displayform.customdisTitle){
      if($scope.displayform.customdisvalue){
	 
      $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });

       $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/custom_values.json",
          data:{'api_key':appKey,'element_id':elementId,'title':$scope.displayform.customdisTitle,'value':$scope.displayform.customdisvalue},
          success:function(response){
			 customedisformid = response.id;

            $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();                      
						    $scope.disformtype = response;
						   $state.reload();   

                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);
            navigator.notification.alert(error.responseText);
          }
      });
    }
      }else{
      navigator.notification.alert("Enter Title And Value");
    }
   
  }

$scope.removeformdisCustomValue = function(id){

    customedisformid = id;
    
   $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
          $.ajax({
            type: "DELETE",
            url: "http://build.myappbuilder.com/api/custom_values.json",
            data: {"api_key":appKey,"id":customedisformid},
            cache: false,
            success:function(response){
              $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
						    $scope.disformtype = response;						 
						   $state.reload();     
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
            error:function(error,status){
               $ionicLoading.hide();
              navigator.notification.alert(error.responseText)
            }
          });
}

});

var customdistaskid='';

control.controller('taskdisplayCtrl',function($scope,$state,$ionicLoading,$ionicScrollDelegate){ 
 
 $ionicScrollDelegate.scrollTop();
 
  if(Appwall.element_wall == '0'){
    $scope.elementAppWall = false;
  }else if(Appwall.element_wall == '1'){
    $scope.elementAppWall = true;
  }
  
  $scope.elementAppwallgoFun=function(){
	  $state.go('elementAppWall');
  }
  $scope.backdistask=function(){
      $state.go('previewtask');
   }
  $scope.homedistask=function(){
       $state.go('sample');
  }
  
	$scope.discustask={}
	$scope.createdisplaytask={}

$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

 $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();   
						     $scope.taskdisplaypage = response;
						   $state.reload();   	  
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });             
              
 $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/elements/tasks.json",
                        data:{'api_key':appKey,'id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
						    $scope.taskdisplay = response;
						   $state.reload();    
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });   
              
$scope.adddisplayTask = function(task,desc){
	
	if($scope.createdisplaytask.taskTitle)
	{
		if($scope.createdisplaytask.taskDescription)
		{
	$ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
       $.ajax({
                        type: "POST",
                        url: "http://build.myappbuilder.com/api/elements/tasks.json",
                        data:{'api_key':appKey,'id':elementId,'title':$scope.createdisplaytask.taskTitle,'description':$scope.createdisplaytask.taskDescription},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();		
                          tasklistid=response.id;			  
              $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/elements/tasks.json",
                        data:{'api_key':appKey,'id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
						    $scope.taskdisplay = response;
						$scope.createdisplaytask.taskTitle='';
						$scope.createdisplaytask.taskDescription='';    
						   $state.reload();    
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });   
		  }}else
		  {
			  alert("Enter Title and Description");
		  }           
	
}

$scope.deletedisplayTask = function(id){

 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
          $.ajax({
            type: "DELETE",
            url: "http://build.myappbuilder.com/api/elements/tasks/"+id+".json",
            data: {"api_key":appKey,'id':elementId},
            cache: false,
            success:function(response){
//				alert(JSON.stringify(response));
               $ionicLoading.hide();
              $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/elements/tasks.json",
                        data:{'api_key':appKey,'id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
						    $scope.taskdisplay = response;
						   $state.reload();    
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              }); 
            },
            error:function(error,status){
               $ionicLoading.hide();
              navigator.notification.alert(error.responseText)
            }
          });
}	

$scope.updatedisplayTask = function(updatesid,titles,descp){

 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
            
        var formData = new FormData();
            formData.append('api_key',appKey);
            formData.append('element_id',elementId);    
            formData.append('id',updatesid);
            formData.append('title',titles);   
            formData.append('description',descp);     
          
          $.ajax({
            type: "PUT",
            url: "http://build.myappbuilder.com/api/elements/tasks.json",
            data: formData,
             cache: false,
                  contentType: false,
                  processData: false,
                  success:function(response){
			      alert('successfully Updated');
                  $ionicLoading.hide();
                
            },
            error:function(error,status){
               $ionicLoading.hide();
             navigator.notification.alert(error.responseText)
            }
          });
}	


$scope.createtaskdiscustom = function(){

$('#taskdisplaycustitle').val('');
$('#taskdisplaycusvalue').val('');

    if($scope.discustask.customtaskdistitle){
    if($scope.discustask.customtaskdisvalue){
	 
      $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });

       $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/custom_values.json",
          data:{'api_key':appKey,'element_id':elementId,'title':$scope.discustask.customtaskdistitle,'value':$scope.discustask.customtaskdisvalue},
          success:function(response){
			 customdistaskid = response.id;

            $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
						    $scope.taskdisplaypage = response;
						   $state.reload();     
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);
            navigator.notification.alert(error.responseText);
          }
      });
    }
      }else{
      navigator.notification.alert("Enter Title And Value");
    }
   
  }

$scope.removetaskdisCustomValue = function(id){

    customdistaskid = id;
    
   $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
          $.ajax({
            type: "DELETE",
            url: "http://build.myappbuilder.com/api/custom_values.json",
            data: {"api_key":appKey,"id":customdistaskid},
            cache: false,
            success:function(response){
              $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();   
						     $scope.taskdisplaypage = response;
						   $state.reload();   	  
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
            error:function(error,status){
               $ionicLoading.hide();
              navigator.notification.alert(error.responseText)
            }
          });
}

});

var customdiswebid='';

control.controller('webdisplayCtrl',function($scope,$state,$ionicLoading,$ionicScrollDelegate){ 

$ionicScrollDelegate.scrollTop();

 if(Appwall.element_wall == '0'){
    $scope.elementAppWall = false;
  }else if(Appwall.element_wall == '1'){
    $scope.elementAppWall = true;
  }
  
   $scope.elementAppwallgoFun=function(){
	  $state.go('elementAppWall');
  }
  $scope.backdisweb=function(){
      $state.go('previewweb');
  }
  $scope.homedisweb=function(){
      $state.go('sample');
  }
  	
	$scope.discusweb={}
	$scope.creatediswebedit={}

$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

$scope.creatediswebedit.diswebname = elementtitle;
$scope.creatediswebedit.disweburl= elementurl;
$scope.creatediswebedit.diswebdesc=elementtext;

 $scope.tinymceOptions = {
        

        menubar: false,
        theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime table contextmenu ",
            "emoticons textcolor"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | bullist numlist outdent indent | link image | alignleft aligncenter alignright alignjustify forecolor backcolor"
        
	};
	$.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
						   $scope.diswebpage = response;
						   $state.reload();   			                           
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });             

$scope.updatedisweb = function(){

	 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
	

	  var formData = new FormData();
           formData.append('api_key',appKey);
           formData.append('id',elementId);   
            formData.append('title',$scope.creatediswebedit.diswebname);   
             formData.append('text',$scope.creatediswebedit.diswebdesc);      
            formData.append('live_url',$scope.creatediswebedit.disweburl);   
                
          $.ajax({
                  type: "PUT",
                  url: "http://build.myappbuilder.com/api/elements/update_web_page.json",
                  data: formData,
                  cache: false,
                  contentType: false,
                  processData: false,
                  success:function(response){
			      alert('successfully Updated');
                  $ionicLoading.hide();  
                },error:function(error){
                  $ionicLoading.hide();
                  navigator.notification.alert(error.responseText);
                }
            });
		
}

$scope.creatediscusweb = function(){

$('#diswebtitle').val('');
$('#diswebvalue').val('');

    if($scope.discusweb.cusdiswebtitle){
      if($scope.discusweb.cusdiswebvalue){
	 
      $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });

       $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/custom_values.json",
          data:{'api_key':appKey,'element_id':elementId,'title':$scope.discusweb.cusdiswebtitle,'value':$scope.discusweb.cusdiswebvalue},
          success:function(response){
			 customdiswebid = response.id;

            $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide(); 
						    $scope.diswebpage = response;
						   $state.reload();                              
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);
            navigator.notification.alert(error.responseText);
          }
      });
    }
      }else{
      navigator.notification.alert("Enter Title And Value");
    }  
  }

$scope.removediswebCustomValue = function(id){

    customdiswebid = id;
    
   $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
          $.ajax({
            type: "DELETE",
            url: "http://build.myappbuilder.com/api/custom_values.json",
            data: {"api_key":appKey,"id":customdiswebid},
            cache: false,
            success:function(response){
              $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
						   $scope.diswebpage = response;
						   $state.reload();   			                           
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
            error:function(error,status){
               $ionicLoading.hide();
              navigator.notification.alert(error.responseText)
            }
          });
}	

});

control.controller('rssdisplayCtrl',function($scope,$state,$ionicLoading,$ionicScrollDelegate){ 

$ionicScrollDelegate.scrollTop();

 if(Appwall.element_wall == '0'){
    $scope.elementAppWall = false;
  }else if(Appwall.element_wall == '1'){
    $scope.elementAppWall = true;
  }
  
  $scope.elementAppwallgoFun=function(){
	  $state.go('elementAppWall');
  }
  $scope.backdisrss=function(){
       $state.go('previewrss');
   }
   $scope.homedisrss=function(){
        $state.go('sample');
}
  	
	$scope.discusrss={}
	$scope.createrssdis={}

$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

$scope.createrssdis.disrssname = elementtitle;
$scope.createrssdis.disrssurl= elementrssurl;
$scope.createrssdis.disrssdesc=elementtext;

$scope.updaterssdis = function(){

	 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
    
 if((($scope.createrssdis.disrssname)==elementtitle) && (($scope.createrssdis.disrssdesc)==elementtext) && (($scope.createrssdis.disrssurl)==elementrssurl)){  
   $ionicLoading.hide();
}
else{
	  var formData = new FormData();
           formData.append('api_key',appKey);
           formData.append('id',elementId);    
            formData.append('rss_url',$scope.createrssdis.disrssurl);
           formData.append('text',$scope.createrssdis.disrssdesc);   
           formData.append('title',$scope.createrssdis.disrssname);            

          $.ajax({
                  type: "PUT",
                  url: "http://build.myappbuilder.com/api/elements/update_rss.json",
                  data: formData,
                  cache: false,
                  contentType: false,
                  processData: false,
                  success:function(response){
			      alert('successfully Updated');
                  $ionicLoading.hide();
                
                 
                },error:function(error){
                  $ionicLoading.hide();
                  navigator.notification.alert(error.responseText);
                }
            });
		}
}

$scope.tinymceOptions = {
        

        menubar: false,
        theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime table contextmenu ",
            "emoticons textcolor"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | bullist numlist outdent indent | link image | alignleft aligncenter alignright alignjustify forecolor backcolor"
        
	};

 $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();                        
						    $scope.disrsspage = response;
						   $state.reload();   
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
              
$scope.createcusdisrss = function(){

$('#disrsstitle').val('');
$('#disrssvalue').val('');
	
    if($scope.discusrss.cusdisrsstitle){
      if($scope.discusrss.cusdisrssvalue){
	 
      $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });

       $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/custom_values.json",
          data:{'api_key':appKey,'element_id':elementId,'title':$scope.discusrss.cusdisrsstitle,'value':$scope.discusrss.cusdisrssvalue},
          success:function(response){
			 customdisrssid = response.id;

            $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();                      
						    $scope.disrsspage = response;                 
						   $state.reload();     
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);
            navigator.notification.alert(error.responseText);
          }
      });
    }
      }else{
      navigator.notification.alert("Enter Title And Value");
    }
   
  }
  
$scope.removerssdisCustomValue = function(id){

    customdisrssid = id;
    
   $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
          $.ajax({
            type: "DELETE",
            url: "http://build.myappbuilder.com/api/custom_values.json",
            data: {"api_key":appKey,"id":customdisrssid},
            cache: false,
            success:function(response){
              $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
							$scope.disrsspage = response;
						   $state.reload();       
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
            error:function(error,status){
               $ionicLoading.hide();
              navigator.notification.alert(error.responseText)
            }
          });
}

});

var customdisaudioid='';

control.controller('audiodisplayCtrl',function($scope,$state,$ionicLoading,$http,$ionicScrollDelegate){ 

$ionicScrollDelegate.scrollTop();

 if(Appwall.element_wall == '0'){
    $scope.elementAppWall = false;
  }else if(Appwall.element_wall == '1'){
    $scope.elementAppWall = true;
  }
  
  $scope.elementAppwallgoFun=function(){
	  $state.go('elementAppWall');
  }
function readURL14(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
			$('#audiodisurlimg').attr({'src':"img/btn_audio.png"});
             $('#audiodisurlimg').css({'width':'50px','height':'50px'}); 					
          $('.file-input-wrapper > .btn-file-input').css('background-image', 'url('+e.target.result+')');
            }

            reader.readAsDataURL(input.files[0]);
        }
  }

  $("#audiodisplay").change(function(){
	    check=true;
	 
      readURL14(this);
  });
  
   function readURL15(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
			 $('#audiodisplayimg').attr('src', e.target.result);	
			 
           // $('.file-input-wrapper > .btn-file-input').css('background-image', 'url('+e.target.result+')');
            }

            reader.readAsDataURL(input.files[0]);
        }
  }

  $("#audio_thumbdisplay").change(function(){
	  check=true;
	 
      readURL15(this);
  });
  
  
$scope.backdisplayaudio = function(){
   $state.go('previewaudio');
 } 
$scope.homedisplayaudio = function(){
   $state.go('sample');
 }
 
$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}
 	
 	  $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
							$scope.disaudiopage = response;
						   $state.reload();       
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });       
                           
$scope.createdisplayaudio={}
$scope.cusdisplayaudio={}

 $scope.tinymceOptions = {
        

        menubar: false,
        theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime table contextmenu ",
            "emoticons textcolor"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | bullist numlist outdent indent | link image | alignleft aligncenter alignright alignjustify forecolor backcolor"
        
	};
	
 
$scope.createdisplayaudio.displayaudiotitle = elementtitle;
$scope.createdisplayaudio.displayaudiotext = elementtext;

if(contentimg){
    $('#audiodisplayimg').attr({'src':contentimg});
    $('#audiodisplayimg').css({'width':'50px','height':'50px'}); 		
  }
 if(contentaudio){
    $('#audiodisplay').attr({'url':contentaudio}); 
     $('#audiodisurlimg').attr({'src':contentimg});
    $('#audiodisurlimg').css({'width':'50px','height':'50px'});   	
  }
$scope.updateaudiodisplay = function(){            
	
	 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
     
	  var formData = new FormData();
           formData.append('api_key',appKey);
           formData.append('id',elementId);                
           formData.append('title',$scope.createdisplayaudio.displayaudiotitle);
           formData.append('text',$scope.createdisplayaudio.displayaudiotext);
           if(check==true){ 
           formData.append('audio',$('#audiodisplay').get(0).files[0]);  
             if($('#audio_thumbdisplay').get(0).files[0]){
           formData.append('audio_thumbnail', $('#audio_thumbdisplay').get(0).files[0]);
       }else{
            formData.append('audio_thumbnail_url', 'http://www.nuatransmedia.com/iBookImages/btn_audio.png');
       }               
			}
			else
			{
				 $('#audiodisplay').attr({'url':contentaudio}); 
				 $('#audiodisurlimg').attr({'src':contentimg});
				$('#audiodisurlimg').css({'width':'50px','height':'50px'});   		 
				 $('#audiodisplayimg').attr({'src':contentimg});
				 $('#audiodisplayimg').css({'width':'50px','height':'50px'}); 
			 }
if((($scope.createdisplayaudio.displayaudiotitle)==elementtitle) && (($scope.createdisplayaudio.displayaudiotext)==elementtext) && (check!=true)){
	  $ionicLoading.hide();
  }
  else
  {
          $http.put('http://build.myappbuilder.com/api/elements/update_audio.json', formData,{
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                      })
                      
                      .success(function(data,status, headers, config){
					// alert(JSON.stringify(data));
					  alert('Successfully updated');
						  $ionicLoading.hide();

					  })
					  .error(function(data,status, headers, config){
                        $ionicLoading.hide();
                        alert(JSON.stringify(data));
                      });
}
}
 
 $scope.createaudiodis = function(){

$('#discusaudiotitle').val('');
$('#discusaudiovalue').val('');
	
    if($scope.cusdisplayaudio.customdisaudioTitle){
      if($scope.cusdisplayaudio.customdisaudiovalue){
	 
      $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });

       $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/custom_values.json",
          data:{'api_key':appKey,'element_id':elementId,'title':$scope.cusdisplayaudio.customdisaudioTitle,'value':$scope.cusdisplayaudio.customdisaudiovalue},
          success:function(response){
			 customdisaudioid = response.id;

            $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();                      
						    $scope.disaudiopage = response;                 
						   $state.reload();     
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);
            navigator.notification.alert(error.responseText);
          }
      });
    }
      }else{
      navigator.notification.alert("Enter Title And Value");
    }
   
  }
  
$scope.removeaudiodisCustomValue = function(id){

    customdisaudioid = id;
    
   $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
          $.ajax({
            type: "DELETE",
            url: "http://build.myappbuilder.com/api/custom_values.json",
            data: {"api_key":appKey,"id":customdisaudioid},
            cache: false,
            success:function(response){
              $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
							$scope.disaudiopage = response;
						   $state.reload();       
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
            error:function(error,status){
               $ionicLoading.hide();
              navigator.notification.alert(error.responseText)
            }
          });
}

});

var customdisid = '';
var picdiscustom = '';
var imagepicdis='';
  
control.controller('picdisplayCtrl',function($scope,$state,$ionicScrollDelegate,$ionicActionSheet,$ionicLoading,$ionicPopup,$ionicModal){ 

 $ionicScrollDelegate.scrollTop();
 
 if(Appwall.element_wall == '0'){
    $scope.elementAppWall = false;
  }else if(Appwall.element_wall == '1'){
    $scope.elementAppWall = true;
  }
  
  $scope.elementAppwallgoFun=function(){
	  $state.go('elementAppWall');
  }
  $scope.backdispic=function(){
       $state.go('previewpic');
  }
 $scope.homedispic=function(){
       $state.go('sample');
   }
 
 
$scope.textCreatedis = {}
$scope.dispic={}

$scope.textCreatedis.distitle=elementtitle;
$scope.textCreatedis.distext=elementtext;

$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

 $scope.AppEditor = false;

  $scope.logedittext = function(){
    if($scope.AppEditor == false){
      $scope.AppEditor = true;
    }else{
      $scope.AppEditor =false;
    }
  }
   $scope.tinymceOptions = {
        

        menubar: false,
        theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime table contextmenu ",
            "emoticons textcolor"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | bullist numlist outdent indent | link image | alignleft aligncenter alignright alignjustify forecolor backcolor"
        
	};

 $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/elements/images.json",
                        data:{'api_key':appKey,'id':elementId},
                        cache: false,
                        success:function(response){
							
                          $ionicLoading.hide();
							$scope.dispicpage = response;
						   $state.reload();       
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });         

 $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
						    $scope.distxtpage = response;
						   //  alert(JSON.stringify($scope.distxtpage));
						   $state.reload();   						                            
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
              
$scope.updatedistext = function(){            
	
	 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
	  var formData = new FormData();
           formData.append('api_key',appKey);
           formData.append('id',elementId);       
           formData.append('title',$scope.textCreatedis.distitle);
            formData.append('text',$scope.textCreatedis.distext);
            
  if((($scope.textCreatedis.distitle)!=elementtitle) || (($scope.textCreatedis.distext)!=elementtext)){  

          $.ajax({
                  type: "PUT",
                  url: "http://build.myappbuilder.com/api/elements/update_default.json",
                  data: formData,
                  cache: false,
                  contentType: false,
                  processData: false,
                  success:function(response){
			      alert('successfully Updated');
                  $ionicLoading.hide();                
                },error:function(error){
                  $ionicLoading.hide();
                  navigator.notification.alert(error.responseText);
                }
            });   
		}
		else
		{
			 $ionicLoading.hide();  
		}
 }

 $scope.picdisplayselect = function(){

     $ionicActionSheet.show({

          titleText: '<b><font size="4">Choose</font></b>',
            buttons: [
             { text: 'Camera' },
             { text: 'PhotoAlbum' },
              ],

            cancelText: 'Cancel',
             cancel: function() {
           // alert('CANCELLED');
             },
             
     buttonClicked: function(index) {
    // alert('BUTTON CLICKED', index);

       if(index==0){

         navigator.camera.getPicture(onSuccess, onFail, { quality: 50,

        destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.CAMERA,saveToPhotoAlbum: false,correctOrientation:true});

       return true;

       }

       else{

          navigator.camera.getPicture(onSuccess, onFail, { quality: 50,

          destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.PHOTOLIBRARY,saveToPhotoAlbum: false,correctOrientation:true});

          return true;

         }                                

          }

		});

       };
                 
    function onSuccess(imageURI) {

         imagepicdis = imageURI;
//alert(imagepicdis);
				$('#dispictext').attr('src', imagepicdis); 
	    		 $('#dispictext').css({'width':'50px','height':'50px'});
         $('.file-input-wrapper5 > .btn-file-input5').css('background-image', 'url('+imageURI+')');

     }

    function onFail(message) {

         navigator.notification.alert('Failed because: ' + message);

      } 
$scope.uploaddisplay = function(){                 

 $('#dispictext').attr({'src':"img/no_image.png"});
 
 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
		      
     cordova.exec(function(response){
            	 var result3 = response;
 
            	 picdiscustom =result3.id;
            	 imagepicdis='';
            	   $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/elements/images.json",
                        data:{'api_key':appKey,'id':elementId},
                        cache: false,
                        success:function(response){               
                          $ionicLoading.hide();
						    $scope.dispicpage = response;						     
						   $state.reload();                            
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
  	 },
            	 function(e){alert(e); $ionicLoading.hide();}, "ImageCompress", "imageCompress", ["300", "280", "image", imagepicdis, "http://build.myappbuilder.com/api/elements/images.json?", "post", {api_key:appKey,id:elementId}])
 }

$scope.removepicdisCustom = function(id){
 
  picdiscustom = id;

   $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
          $.ajax({
            type: "DELETE",
            url: "http://build.myappbuilder.com/api/elements/images.json",
            data: {"api_key":appKey,"id":picdiscustom,'element_id':elementId},
            cache: false,
            success:function(response){
             $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/elements/images.json",
                        data:{'api_key':appKey,'id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
						    $scope.dispicpage = response;						     
						   $state.reload();  						                            
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });             
            },
            error:function(error,status){
               $ionicLoading.hide();
              navigator.notification.alert(error.responseText)
            }
          });
 
}
  $scope.AppEditor = false;
  
$scope.createpicdis = function(){

	$('#distitle').val('');
	$('#disvalue').val('');
	
    if($scope.dispic.customdisTitle){
      if($scope.dispic.customedisvalue){
	 
      $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });

       $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/custom_values.json",
          data:{'api_key':appKey,'element_id':elementId,'title':$scope.dispic.customdisTitle,'value':$scope.dispic.customedisvalue},
          success:function(response){
			 customdisid = response.id;
          
            $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
						    $scope.distxtpage = response;
						   //  alert(JSON.stringify($scope.distxtpage));
						   $state.reload();                            
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);
            navigator.notification.alert(error.responseText);
          }
      });
    }
      }else{
      navigator.notification.alert("Enter Title And Value");
    }  
  }

$scope.removedistxtCustomValue = function(id){

    customdisid = id;
    
   $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
          $.ajax({
            type: "DELETE",
            url: "http://build.myappbuilder.com/api/custom_values.json",
            data: {"api_key":appKey,"id":customdisid},
            cache: false,
            success:function(response){
              $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
						    $scope.distxtpage = response;
						//   alert(JSON.stringify($scope.distxtpage));
						   $state.reload();                            
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
            error:function(error,status){
               $ionicLoading.hide();
              navigator.notification.alert(error.responseText)
            }
          });
}
 
});

var messages = "";


control.controller("appWallCtrl",function($scope,$state, $ionicLoading,$http,$ionicPopup){
	
$scope.appTitle = appTitle;

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}
  
  
  var button_wall = '';
  var element_wall = '';

  $scope.homeappwall = function(){
    $state.go('sample');
  }

  $scope.backappwall = function(){
    $state.go('app');
  }


  $scope.checkBox = [];
  if((Appwall.button_wall == "0")&&(Appwall.element_wall == "0")){
    $scope.checkBox.button = false;
    $scope.checkBox.element = false;
  }else if(Appwall.button_wall == "0"){
    $scope.checkBox.button = false;
    $scope.checkBox.element = true;
  }else if(Appwall.element_wall == "0"){
    $scope.checkBox.button = true;
    $scope.checkBox.element = false;
  }else{
    $scope.checkBox.button = true;
    $scope.checkBox.element = true;
  }

      $scope.appwallSettings = function(){
        var myPopup = $ionicPopup.show({
          template: '<div class="card"><div class="item item-checkbox"><label class="checkbox" ><input type="checkbox" ng-model="checkBox.button" value=""></label>Each Chapter Can Have a Unique Wall </div><div class="item item-checkbox"><label class="checkbox" ><input type="checkbox" ng-model="checkBox.element" value=""></label>Each Content Can Have a Unique Wall  </div></div><div style="width:100%;"><div style="width:50%;float:left;"><div style="width:50%;" class="button button-clear" ng-click="popupClose();"><img src="img/btn_cancel.png" style="width:100%;height:auto;"/></div></div><div style="width:50%;float:left;" ><div style="width:50%;float:right;" class="button button-clear " ng-click="popoupSave();"><img src="img/save.png" style="width:100%;height:auto;"/></div></div></div>',
          title: 'AppWall Setting',
          subTitle: $scope.appTitle,
          scope: $scope,
                         
      });

      $scope.popupClose=function() {
      // alert('Tapped!', $scope.checkBox.element+" : "+$scope.checkBox.button);
      // alert('Tapped!', $scope.checkBox.element+" : "+$scope.checkBox.button);
        myPopup.close();
      }

      $scope.popoupSave = function(){
        if(($scope.checkBox.button != false) && ($scope.checkBox.element != false)){
          button_wall = "1";
          element_wall = "1";
        }else if($scope.checkBox.button != false){
          button_wall = "1";
          element_wall = "0";
        }else if($scope.checkBox.element != false){
          button_wall = "0";
          element_wall = "1";
        }else{
          button_wall = "0";
          element_wall = "0";
        }

        $ionicLoading.show({template: '<i class="icon ion-loading-a"></i>&nbsp;Please wait...'});
        $http.post('http://build.myappbuilder.com/api/app_wall_settings.json',{api_key: appKey,button_wall:button_wall,element_wall:element_wall})
              .success(function(data,status,headers,config){
                  //$ionicLoading.hide();
//alert(JSON.stringify(data));
                  //Appwall = data;
                  $.ajax({url:'http://build.myappbuilder.com/api/app_wall_settings.json', type:"GET",data:{'api_key':appKey},
                      success:function(response){
                      //  alert(JSON.stringify(response))
                          Appwall = response;
                          $ionicLoading.hide();
                           myPopup.close();
                      },
                      error:function(){
                          $ionicLoading.hide();
                           myPopup.close();
                      }
                    });
                 
              })
              .error(function(data,status,headers,config){
                  $ionicLoading.hide();
                  alert(JSON.stringify(data));
                  myPopup.close();
              })

      }
    
  }

  $scope.messages = "";
  $scope.messages.data="";
 window.wizSpinner.show(options);
 
    $.ajax({
                  type: "GET",
                  url: "http://build.myappbuilder.com/api/messages.json",
                  data:{'api_key':appKey},
                  cache: false,
                  success:function(response){
					//  alert(JSON.stringify(response));
                  window.wizSpinner.hide();
                   messages = response;
                   appWallPostFun();
                  },
                  error:function(error,status){
                    window.wizSpinner.hide();
                    $ionicLoading.hide();
                    var error = JSON.parse(error.responseText);
                    if(error.error == "Unauthorized"){
                      navigator.notification.alert("Please Login")
                    }else {
                      navigator.notification.alert("Login Error!");
                    }
                  }
            });
            
 }); 
 

function appWallPostFun(){

    var bodyMgs = '';
    var mgs_id = []; 
    var body = [];
    var created_at = [];
    var parent_id = []; 
    var element_name = [];
    var button_name = [];
    var sender_name = [];
    var sender_id = [];
    var sender_avatar_url = [];
    var replyappend = '';
    var z = 0;
    var p = 0;
   // alert("msgLen:"+messages.length);
  
    if(messages.length > 0){
      $.each( messages, function( key, value ) {	
        $.each( value, function( k, v ) {			  
            if(k == "id"){
              mgs_id.push(v);
            }else if(k == "created_at"){
              created_at.push(v);
            }else if(k == "parent_id"){
              parent_id.push(v);
            }else if(k == "body"){
              body.push(v);
            }else if(k == "element_name"){
              element_name.push(v);
            }else if(k == "button_name"){
              button_name.push(v);
            }else if(k == "sender_name"){
              sender_name.push(v);
            }else if(k == "sender_id"){
              sender_id.push(v);
            }else if(k == 'sender_avatar_url'){
              if(v == null){
                v = 'img/face.png';
              }
              sender_avatar_url.push(v);
            }
        });
      });
    }else{
      bodyMgs = '<a><p align="justify" class="divback2"><font color="black" size="2">No Result Found</font></p></a>';
    }

    for(var i=0;i<body.length;i++){
      if(parent_id[i] == null){
        p=0;
        for(var j=0;j<body.length;j++){
           p = p+1;
          if(mgs_id[i] == parent_id[j]){
             z= -1;
             var k = parseInt(p)+z;
            
             if(localStorage.sender_id == sender_id[k]){
               if(element_name[k] != null && button_name[k] != null){
                replyappend +='<div class="row"><div class="col col-80 divback1"><div class="row"><div class="col col-50" align="left">'+sender_name[k]+'</div><div class="col col-50" align="right"><i class="icon ion-clock"></i>  '+relative_time(created_at[k])+'</div></div><div align="center"><font color="white" size="2" style="background-color:#33CCFF">&nbsp;'+button_name[k]+'&nbsp;</font>&nbsp;>&nbsp;<font color="white" size="2" style="background-color:#33CCFF">&nbsp;'+element_name[k]+'&nbsp;</font></div><hr><div><p align="justify">'+body[k]+'</p><hr></div><div style="width:100%;"><div style="width:50%;"><div style="width:100%;"><div style="width:50%;float:left;"><img src="img/delete.png" id="delete-'+k+'" class="deleteMgs" style="width:100%;height:auto;"/></div></div></div></div></div><div class="col col-20"><img src="'+sender_avatar_url[k]+'" style="width:100%;height:auto;"/></div></div><br/>';
               }else if(button_name[k] != null){
                replyappend +='<div class="row"><div class="col col-80 divback1"><div class="row"><div class="col col-50" align="left">'+sender_name[k]+'</div><div class="col col-50" align="right"><i class="icon ion-clock"></i>  '+relative_time(created_at[k])+'</div></div><div align="center"><font color="white" size="2" style="background-color:#33CCFF">&nbsp;'+button_name[k]+'&nbsp;</font></div><hr><div><p align="justify">'+body[k]+'</p><hr></div><div style="width:100%;"><div style="width:50%;"><div style="width:100%;"><div style="width:50%;float:left;"><img src="img/delete.png" id="delete-'+k+'" class="deleteMgs" style="width:100%;height:auto;"/></div></div></div></div></div><div class="col col-20"><img src="'+sender_avatar_url[k]+'" style="width:100%;height:auto;"/></div></div><br/>';
               }else{
                replyappend +='<div class="row"><div class="col col-80 divback1"><div class="row"><div class="col col-50" align="left">'+sender_name[k]+'</div><div class="col col-50" align="right"><i class="icon ion-clock"></i>  '+relative_time(created_at[k])+'</div></div><hr><div><p align="justify">'+body[k]+'</p><hr></div><div style="width:100%;"><div style="width:50%;"><div style="width:100%;"><div style="width:50%;float:left;"><img src="img/delete.png" id="delete-'+k+'" class="deleteMgs" style="width:100%;height:auto;"/></div></div></div></div></div><div class="col col-20"><img src="'+sender_avatar_url[k]+'" style="width:100%;height:auto;"/></div></div><br/>';
               }
              }else{
                 if(element_name[k] != null && button_name[k] != null){
                  replyappend +='<div class="row"><div class="col col-80 divback1"><div class="row"><div class="col col-50" align="left">'+sender_name[k]+'</div><div class="col col-50" align="right"><i class="icon ion-clock"></i>  '+relative_time(created_at[k])+'</div></div><div align="center"><font color="white" size="2" style="background-color:#33CCFF">&nbsp;'+button_name[k]+'&nbsp;</font>&nbsp;>&nbsp;<font color="white" size="2" style="background-color:#33CCFF">&nbsp;'+element_name[k]+'&nbsp;</font></div><hr><div><p align="justify">'+body[k]+'</p></div><div class="row"></div></div><div class="col col-20"><img src="'+sender_avatar_url[k]+'" style="width:100%;height:auto;"/></div></div><br/>';
                 }else if(button_name[k] != null){
                  replyappend +='<div class="row"><div class="col col-80 divback1"><div class="row"><div class="col col-50" align="left">'+sender_name[k]+'</div><div class="col col-50" align="right"><i class="icon ion-clock"></i>  '+relative_time(created_at[k])+'</div></div><div align="center"><font color="white" size="2" style="background-color:#33CCFF">&nbsp;'+button_name[k]+'&nbsp;</font></div><hr><div><p align="justify">'+body[k]+'</p></div><div class="row"></div></div><div class="col col-20"><img src="'+sender_avatar_url[k]+'" style="width:100%;height:auto;"/></div></div><br/>';
                 }else{
                  replyappend +='<div class="row"><div class="col col-80 divback1"><div class="row"><div class="col col-50" align="left">'+sender_name[k]+'</div><div class="col col-50" align="right"><i class="icon ion-clock"></i>  '+relative_time(created_at[k])+'</div></div><hr><div><p align="justify">'+body[k]+'</p></div><div class="row"></div></div><div class="col col-20"><img src="'+sender_avatar_url[k]+'" style="width:100%;height:auto;"/></div></div><br/>';
                 }
              }
          }else{
           
          }
          
       }

      if(localStorage.sender_id == sender_id[i]){
          if(element_name[i] != null && button_name[i] != null){
            bodyMgs +='<div class="row"><div class="col col-20"><img src="'+sender_avatar_url[i]+'" style="width:100%;height:auto;"/></div><div class="col col-80 divback"><div class="row"><div class="col col-50" align="left">'+sender_name[i]+'</div><div class="col col-50" align="right"><i class="icon ion-clock"></i>  '+relative_time(created_at[i])+'</div></div><div align="center"><font color="white" size="2" style="background-color:#33CCFF">&nbsp;'+button_name[i]+'&nbsp;</font>&nbsp;>&nbsp;<font color="white" size="2" style="background-color:#33CCFF">&nbsp;'+element_name[i]+'&nbsp;</font></div><hr><div><p align="justify">'+body[i]+'</p><hr></div><div style="width:100%;"><div style="width:50%;"><div style="width:100%;"><div style="width:50%;float:left;" ><img src="img/reply.png" id="reply-'+i+'" class="replyMgs" style="width:100%;height:auto;"/></div><div style="width:50%;float:left;" ><img src="img/delete.png" id="delete-'+i+'" class="deleteMgs" style="width:100%;height:auto;"/></div></div></div></div></div></div><div style="width:100%;"><div style="width:20%;float:left;opacity:0">Hello</div><div style="width:80%;float:left;"><div class="replyHide bar bar-header item-input-inset" id="replyHide'+i+'" ><label class="item-input-wrapper"><input id="replymessage'+i+'" type="text" id="postmessage" placeholder="Enter Your Reply...."></label><button id="textReplyMgs" onclick="javascript:replymessageFun();" class="button button-clear button-positive"><img src="img/btn_reply.png" style="width:70px;height:auto;"/></button></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div>';
          
          }else if(button_name[i] != null){
            bodyMgs +='<div class="row"><div class="col col-20"><img src="'+sender_avatar_url[i]+'" style="width:100%;height:auto;"/></div><div class="col col-80 divback"><div class="row"><div class="col col-50" align="left">'+sender_name[i]+'</div><div class="col col-50" align="right"><i class="icon ion-clock"></i>  '+relative_time(created_at[i])+'</div></div><div align="center"><font color="white" size="2" style="background-color:#33CCFF">&nbsp;'+button_name[i]+'&nbsp;</font></div><hr><div><p align="justify">'+body[i]+'</p><hr></div><div style="width:100%;"><div style="width:50%;"><div style="width:100%;"><div style="width:50%;float:left;" ><img src="img/reply.png" id="reply-'+i+'" class="replyMgs" style="width:100%;height:auto;"/></div><div style="width:50%;float:left;" ><img src="img/delete.png" id="delete-'+i+'" class="deleteMgs" style="width:100%;height:auto;"/></div></div></div></div></div></div><div style="width:100%;"><div style="width:20%;float:left;opacity:0">Hello</div><div style="width:80%;float:left;"><div class="replyHide bar bar-header item-input-inset" id="replyHide'+i+'" ><label class="item-input-wrapper"><input id="replymessage'+i+'" type="text" id="postmessage" placeholder="Enter Your Reply...."></label><button id="textReplyMgs" onclick="javascript:replymessageFun();" class="button button-clear button-positive"><img src="img/btn_reply.png" style="width:70px;height:auto;"/></button></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div>';
          
          }else{

            bodyMgs +='<div class="row"><div class="col col-20"><img src="'+sender_avatar_url[i]+'" style="width:100%;height:auto;"/></div><div class="col col-80 divback"><div class="row"><div class="col col-50" align="left">'+sender_name[i]+'</div><div class="col col-50" align="right"><i class="icon ion-clock"></i>  '+relative_time(created_at[i])+'</div></div><hr><div><p align="justify">'+body[i]+'</p><hr></div><div style="width:100%;"><div style="width:50%;"><div style="width:100%;"><div style="width:50%;float:left;" ><img src="img/reply.png" id="reply-'+i+'" class="replyMgs" style="width:100%;height:auto;"/></div><div style="width:50%;float:left;" ><img src="img/delete.png" id="delete-'+i+'" class="deleteMgs" style="width:100%;height:auto;"/></div></div></div></div></div></div><div style="width:100%;"><div style="width:20%;float:left;opacity:0">Hello</div><div style="width:80%;float:left;"><div class="replyHide bar bar-header item-input-inset" id="replyHide'+i+'" ><label class="item-input-wrapper"><input id="replymessage'+i+'" type="text" id="postmessage" placeholder="Enter Your Reply...."></label><button id="textReplyMgs" onclick="javascript:replymessageFun();" class="button button-clear button-positive"><img src="img/btn_reply.png" style="width:70px;height:auto;"/></button></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div>';

          }
        }else{
          if(element_name[i] != null && button_name[i] != null){
            bodyMgs +='<div class="row"><div class="col col-20"><img src="'+sender_avatar_url[i]+'" style="width:100%;height:auto;"/></div><div class="col col-80 divback"><div class="row"><div class="col col-50" align="left">'+sender_name[i]+'</div><div class="col col-50" align="right"><i class="icon ion-clock"></i>  '+relative_time(created_at[i])+'</div></div><div align="center"><font color="white" size="2" style="background-color:#33CCFF">&nbsp;'+button_name[i]+'&nbsp;</font>&nbsp;>&nbsp;<font color="white" size="2" style="background-color:#33CCFF">&nbsp;'+element_name[i]+'&nbsp;</font></div><hr><div><p align="justify">'+body[i]+'</p><hr></div><div style="width:100%"><div style="width:50%;float:left;"><div style="width:100%"><div style="width:50%;float:left;"><img src="img/reply.png" id="reply-'+i+'" class="replyMgs" style="width:100%;height:auto;"/></div></div></div></div></div></div><div style="width:100%;"><div style="width:20%;float:left;opacity:0">Hello</div><div style="width:80%;float:left;"><div class="replyHide bar bar-header item-input-inset" id="replyHide'+i+'" ><label class="item-input-wrapper"><input id="replymessage'+i+'" type="text" id="postmessage" placeholder="Enter Your Reply...."></label><button id="textReplyMgs" onclick="javascript:replymessageFun();" class="button button-clear button-positive"><img src="img/btn_reply.png" style="width:70px;height:auto;"/></button></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div>';
          
          }else if(button_name[i] != null){
            bodyMgs +='<div class="row"><div class="col col-20"><img src="'+sender_avatar_url[i]+'" style="width:100%;height:auto;"/></div><div class="col col-80 divback"><div class="row"><div class="col col-50" align="left">'+sender_name[i]+'</div><div class="col col-50" align="right"><i class="icon ion-clock"></i>  '+relative_time(created_at[i])+'</div></div><div align="center"><font color="white" size="2" style="background-color:#33CCFF">&nbsp;'+button_name[i]+'&nbsp;</font></div><hr><div><p align="justify">'+body[i]+'</p><hr></div><div style="width:100%"><div style="width:50%;float:left;"><div style="width:100%"><div style="width:50%;float:left;" ><img src="img/reply.png" id="reply-'+i+'" class="replyMgs" style="width:100%;height:auto;"/></div></div></div></div></div></div><div style="width:100%;"><div style="width:20%;float:left;opacity:0">Hello</div><div style="width:80%;float:left;"><div class="replyHide bar bar-header item-input-inset" id="replyHide'+i+'" ><label class="item-input-wrapper"><input id="replymessage'+i+'" type="text" id="postmessage" placeholder="Enter Your Reply...."></label><button id="textReplyMgs" onclick="javascript:replymessageFun();" class="button button-clear button-positive"><img src="img/btn_reply.png" style="width:70px;height:auto;"/></button></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div>';
          
          }else{
            bodyMgs +='<div class="row"><div class="col col-20"><img src="'+sender_avatar_url[i]+'" style="width:100%;height:auto;"/></div><div class="col col-80 divback"><div class="row"><div class="col col-50" align="left">'+sender_name[i]+'</div><div class="col col-50" align="right"><i class="icon ion-clock"></i>  '+relative_time(created_at[i])+'</div></div><hr><div><p align="justify">'+body[i]+'</p><hr></div><div style="width:100%"><div style="width:50%;float:left;"><div style="width:100%"><div style="width:50%;float:left;" ><img src="img/reply.png" id="reply-'+i+'" class="replyMgs" style="width:100%;height:auto;"/></div></div></div></div></div></div><div style="width:100%;"><div style="width:20%;float:left;opacity:0">Hello</div><div style="width:80%;float:left;"><div class="replyHide bar bar-header item-input-inset" id="replyHide'+i+'" ><label class="item-input-wrapper"><input id="replymessage'+i+'" type="text" id="postmessage" placeholder="Enter Your Reply...."></label><button id="textReplyMgs" onclick="javascript:replymessageFun();" class="button button-clear button-positive"><img src="img/btn_reply.png" style="width:70px;height:auto;"/></button></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div>';
            
          }
        }  

        replyappend ='';

      }else{
	
      }
    }
    
    $('#appwallListview').append(bodyMgs).trigger('create');

    if($('.replyHide').is(':visible')){
      $('.replyHide').toggle();
    }else{
      
    }

    $(".replyMgs").click(function(){
          replyMgsNo1 = (this.id).split('-');
          replyMgsNo = mgs_id[replyMgsNo1[1]];
          var replyHide = "replyHide"+replyMgsNo1[1];
          $('#'+replyHide).toggle();
    });

    $(".deleteMgs").click(function(){
       window.wizSpinner.show(options);
          var deleteMgsNo = (this.id).split('-');

          if(localStorage.appwallLoginData){
            $.ajax({url:'http://build.myappbuilder.com/api/messages.json?api_key='+appKey+'&message_id='+mgs_id[deleteMgsNo[1]], 
              type:"DELETE",
              success:function(response){
                
                $.ajax({
                  type: "GET",
                  url: "http://build.myappbuilder.com/api/messages.json",
                  data:{'api_key':appKey},
                  cache: false,
                  success:function(response){
				//	 alert(JSON.stringify(response));
                    window.wizSpinner.hide();
                   messages = response;
                   $('#appwallListview').empty();
                   appWallPostFun();
                  },
                  error:function(error,status){
					window.wizSpinner.hide();
                    $ionicLoading.hide();
                    var error = JSON.parse(error.responseText);
                    if(error.error == "Unauthorized"){
                      navigator.notification.alert("Please Login")
                    }else {
                      navigator.notification.alert("Login Error!");
                    }
                  }
            });
              },
              error:function(msg){   window.wizSpinner.hide(); alert(JSON.stringify(msg));}
            });
          }else{
            // login();
          }
    });
    
 /*   $("#textReplyMgs").click(function(event){
        event.preventDefault();
        replymessageFun();
    });*/
}

function replymessageFun(){

  if(localStorage.appwallLoginData){
    var replyarray = "replymessage"+replyMgsNo1[1];
    var replymessage = $('#'+replyarray).val();
      if(replymessage == ''){
       alert("Please Enter Your Reply...");
      }else{
      window.wizSpinner.show(options);
         $.ajax({url:'http://build.myappbuilder.com/api/messages.json', type:"POST",data:{'message[body]':replymessage,'message[parent_id]':replyMgsNo,'message[sender_id]':localStorage.sender_id,'api_key':appKey},
          success:function(response){
            
            $.ajax({
                  type: "GET",
                  url: "http://build.myappbuilder.com/api/messages.json",
                  data:{'api_key':appKey},
                  cache: false,
                  success:function(response){

                    window.wizSpinner.hide();
                    $('#'+replyarray).val('');
                   messages = response;
                   $('#appwallListview').empty();
                   appWallPostFun();
                  },
                  error:function(error,status){
                  window.wizSpinner.hide();
                    $ionicLoading.hide();
                    var error = JSON.parse(error.responseText);
                    if(error.error == "Unauthorized"){
                      navigator.notification.alert("Please Login")
                    }else {
                      navigator.notification.alert("Login Error!");
                    }
                  }
            });
          },
          error:function(){  window.wizSpinner.hide(); alert("Failure");}
        });
      }
  }else{
   // login();
  }

}

function postmessageFun(){

  if(localStorage.appwallLoginData){

    var postmessage = $('#postmessage').val();
    if(postmessage == ''){
     alert("Please Enter Your Comments...");
    }else{

      window.wizSpinner.show(options);
		  
      $.ajax({url:'http://build.myappbuilder.com/api/messages.json', type:"POST",data:{'message[body]':postmessage,'message[sender_id]':localStorage.sender_id,'api_key':appKey},
        success:function(response){
          $('#appwallListview').empty();
          $.ajax({
                  type: "GET",
                  url: "http://build.myappbuilder.com/api/messages.json",
                  data:{'api_key':appKey},
                  cache: false,
                  success:function(response){	
                 window.wizSpinner.hide();
                 $('#postmessage').val('');
                 //$ionicLoading.hide();
                    messages = response;
                    appWallPostFun();
                  },
                  error:function(error,status){
                     window.wizSpinner.hide();
                    $ionicLoading.hide();
                    var error = JSON.parse(error.responseText);
                    if(error.error == "Unauthorized"){
                      navigator.notification.alert("Please Login")
                    }else {
                      navigator.notification.alert("Login Error!");
                    }
                  }
            });
        },
        error:function(){  window.wizSpinner.hide(); alert("Failure");}
      });
    }
  }else{
    //login();
  }

}


function relative_time(date_str) {
    if (!date_str) {return;}
    date_str = $.trim(date_str);
    date_str = date_str.replace(/\.\d\d\d+/,""); // remove the milliseconds
    date_str = date_str.replace(/-/,"/").replace(/-/,"/"); //substitute - with /
    date_str = date_str.replace(/T/," ").replace(/Z/," UTC"); //remove T and substitute Z with UTC
    date_str = date_str.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // +08:00 -> +0800
    var parsed_date = new Date(date_str);
    var relative_to = (arguments.length > 1) ? arguments[1] : new Date(); //defines relative to what ..default is now
    var delta = parseInt((relative_to.getTime()-parsed_date)/1000);
    delta=(delta<2)?2:delta;
    var r = '';
    if (delta < 60) {
    r = delta + ' secs ago';
    } else if(delta < 120) {
    r = 'a min ago';
    } else if(delta < (45*60)) {
    r = (parseInt(delta / 60, 10)).toString() + ' mins ago';
    } else if(delta < (2*60*60)) {
    r = 'an hr ago';
    } else if(delta < (24*60*60)) {
    r = '' + (parseInt(delta / 3600, 10)).toString() + ' hrs ago';
    } else if(delta < (48*60*60)) {
    r = 'a day ago';
    } else {
    r = (parseInt(delta / 86400, 10)).toString() + ' days ago';
    }
    return '' + r;
}


control.controller('buttonAppWallCtrl',function($scope,$state,$ionicLoading){

$scope.backbuttonAppwall = function(){
	$state.go('chapterlist');
}

$scope.homebuttonAppwall = function(){
	$state.go('sample');
}

 $scope.appTitle = appTitle;
 
if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

  messages = '';
     window.wizSpinner.show(options);
     
    
    $.ajax({
                  type: "GET",
                  url: "http://build.myappbuilder.com/api/messages.json",
                  data:{'api_key':appKey,'button_id':buttonId},
                  cache: false,
                  success:function(response){
                      window.wizSpinner.hide();
                    messages = response;
                    ButtonAppWallPostFun();
                  },
                  error:function(error,status){
                     window.wizSpinner.hide();
                    var error = JSON.parse(error.responseText);
                     // alert(JSON.stringify(error));
                    if(error.error == "Unauthorized"){
                      navigator.notification.alert("Please Login")
                    }else {
                      navigator.notification.alert("Login Error!");
                    }
                  }
    });
  
  });


function ButtonAppWallPostFun(){
   
              var bodyMgs = '';
              var mgs_id = []; 
              var body = [];
              var created_at = [];
              var parent_id = []; 
              var element_name = [];
              var button_name =[];
              var sender_name = [];
              var sender_id = [];
              var sender_avatar_url = [];
              var replyappend ='';
              var z = 0;
              var p = 0;
              //alert("msgLen:"+messages.length);
              if(messages.length > 0){
                $.each( messages, function( key, value ) {
                  $.each( value, function( k, v ) {
                      if(k == "id"){
                        mgs_id.push(v);
                      }else if(k == "created_at"){
                        created_at.push(v);
                      }else if(k == "parent_id"){
                        parent_id.push(v);
                      }else if(k == "body"){
                        body.push(v);
                      }else if(k == "element_name"){
                        element_name.push(v);
                      }else if(k == "button_name"){
                        button_name.push(v);
                      }else if(k == "sender_name"){
                        sender_name.push(v);
                      }else if(k == "sender_id"){
                        sender_id.push(v);
                      }else if(k == 'sender_avatar_url'){
                        if(v == null){
                          v = 'img/face.png';
                        }
                        sender_avatar_url.push(v);
                      }
                  });
                });
              }else{
                bodyMgs = '<a><p align="justify" class="divback2" ><font color="black" size="2">No Result Found</font></p></a>';
              }
              
              for(var i=0;i<body.length;i++){

                if(parent_id[i] == null){
                  p=0;
                  for(var j=0;j<body.length;j++){
                     p = p+1;
                    if(mgs_id[i] == parent_id[j]){
                       z = -1;
                       var k = parseInt(p)+z;
                        if(localStorage.sender_id == sender_id[k]){
                          replyappend +='<div class="row"><div class="col col-80 divback1"><div class="row"><div class="col col-50" align="left">'+sender_name[k]+'</div><div class="col col-50" align="right"><i class="icon ion-clock"></i>  '+relative_time(created_at[k])+'</div></div><div align="center"><font color="white" size="2" style="background-color:#33CCFF">&nbsp;'+button_name[k]+'&nbsp;</font></div><hr><div><p align="justify">'+body[k]+'</p><hr></div><div style="width:100%;"><div style="width:50%;"><div style="width:100%;"><div style="width:50%;float:left;"><img src="img/delete.png" id="delete-'+k+'" class="ButtondeleteMgs" style="width:100%;height:auto;"/></div></div></div></div></div><div class="col col-20"><img src="'+sender_avatar_url[k]+'" style="width:100%;height:auto;"/></div></div><br/>';
                        }else{
                          replyappend +='<div class="row"><div class="col col-80 divback1"><div class="row"><div class="col col-50" align="left">'+sender_name[k]+'</div><div class="col col-50" align="right"><i class="icon ion-clock"></i>  '+relative_time(created_at[k])+'</div></div><div align="center"><font color="white" size="2" style="background-color:#33CCFF">&nbsp;'+button_name[k]+'&nbsp;</font></div><hr><div><p align="justify">'+body[k]+'</p></div><div class="row"></div></div><div class="col col-20"><img src="'+sender_avatar_url[k]+'" style="width:100%;height:auto;"/></div></div><br/>';
                        }
                    }else{
                     
                    }
                  }

                  if(localStorage.sender_id == sender_id[i]){
                    bodyMgs +='<div class="row"><div class="col col-20"><img src="'+sender_avatar_url[i]+'" style="width:100%;height:auto;"/></div><div class="col col-80 divback"><div class="row"><div class="col col-50" align="left">'+sender_name[i]+'</div><div class="col col-50" align="right"><i class="icon ion-clock"></i>  '+relative_time(created_at[i])+'</div></div><div align="center"><font color="white" size="2" style="background-color:#33CCFF">&nbsp;'+button_name[i]+'&nbsp;</font></div><hr><div><p align="justify">'+body[i]+'</p><hr></div><div style="width:100%;"><div style="width:50%;"><div style="width:100%;"><div style="width:50%;float:left;" ><img src="img/reply.png" id="reply-'+i+'" class="ButtonreplyMgs" style="width:100%;height:auto;"/></div><div style="width:50%;float:left;" ><img src="img/delete.png" id="delete-'+i+'" class="ButtondeleteMgs" style="width:100%;height:auto;"/></div></div></div></div></div></div><div style="width:100%;"><div style="width:20%;float:left;opacity:0">Hello</div><div style="width:80%;float:left;"><div class="ButtonreplyHide bar bar-header item-input-inset" id="ButtonreplyHide'+i+'" ><label class="item-input-wrapper"><input id="Buttonreplymessage'+i+'" type="text" id="postmessage" placeholder="Enter Your Reply...."></label><button id="textReplyMgs" onclick="javascript:ButtonreplymessageFun();" class="button button-clear button-positive"><img src="img/btn_reply.png" style="width:70px;height:auto;"/></button></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div>';
                  }else{
                    bodyMgs +='<div class="row"><div class="col col-20"><img src="'+sender_avatar_url[i]+'" style="width:100%;height:auto;"/></div><div class="col col-80 divback"><div class="row"><div class="col col-50" align="left">'+sender_name[i]+'</div><div class="col col-50" align="right"><i class="icon ion-clock"></i>  '+relative_time(created_at[i])+'</div></div><div align="center"><font color="white" size="2" style="background-color:#33CCFF">&nbsp;'+button_name[i]+'&nbsp;</font></div><hr><div><p align="justify">'+body[i]+'</p><hr></div><div style="width:100%"><div style="width:50%;float:left;"><div style="width:100%"><div style="width:50%;float:left;" ><img src="img/reply.png" id="reply-'+i+'" class="ButtonreplyMgs" style="width:100%;height:auto;"/></div></div></div></div></div></div><div style="width:100%;"><div style="width:20%;float:left;opacity:0">Hello</div><div style="width:80%;float:left;"><div class="ButtonreplyHide bar bar-header item-input-inset" id="ButtonreplyHide'+i+'" ><label class="item-input-wrapper"><input id="Buttonreplymessage'+i+'" type="text" id="postmessage" placeholder="Enter Your Reply...."></label><button id="textReplyMgs" onclick="javascript:ButtonreplymessageFun();" class="button button-clear button-positive"><img src="img/btn_reply.png" style="width:70px;height:auto;"/></button></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div>';
                  }
                  replyappend ='';

                }else{
                  
                }
              }
              
              $('#ButtonappwallListview').append(bodyMgs).trigger("create");

              if($('.ButtonreplyHide').is(':visible')){
                $('.ButtonreplyHide').toggle();
              }else{
                
              }

              $(".ButtonreplyMgs").click(function(){
                    replyMgsNo1 = (this.id).split('-');
                    replyMgsNo = mgs_id[replyMgsNo1[1]];
                    var replyHide = "ButtonreplyHide"+replyMgsNo1[1];
                    $('#'+replyHide).toggle();
              });

              $(".ButtondeleteMgs").click(function(){
                    var deleteMgsNo = (this.id).split('-');
                    window.wizSpinner.show(options);
                    if(localStorage.appwallLoginData){
                      $.ajax({url:'http://build.myappbuilder.com/api/messages.json?api_key='+appKey+'&message_id='+mgs_id[deleteMgsNo[1]], type:"DELETE",data:{},
                        success:function(response){
                          $('#ButtonappwallListview').empty();
                          $.ajax({
                            type: "GET",
                            url: "http://build.myappbuilder.com/api/messages.json",
                            data:{'api_key':appKey,'button_id':buttonId},
                            cache: false,
                            success:function(response){
							//	alert(JSON.stringify(response));
                              window.wizSpinner.hide();
                              messages = response;
                              ButtonAppWallPostFun();
                            },
                            error:function(error,status){
                             window.wizSpinner.hide();
                              
                              var error = JSON.parse(error.responseText);
                              if(error.error == "Unauthorized"){
                                navigator.notification.alert("Please Login")
                              }else {
                                navigator.notification.alert("Login Error!");
                              }
                            }
                      });
                        },
                        error:function(){  window.wizSpinner.hide(); alert("Failure");}
                      });
                    }else{
                      
                    }
 });
}

function ButtonreplymessageFun(){
	
  if(localStorage.appwallLoginData){
    var replyarray = "Buttonreplymessage"+replyMgsNo1[1];
    var replymessage = $('#'+replyarray).val();
      if(replymessage == ''){
        alert("Please Enter Your Reply...");
      }else{
       window.wizSpinner.show(options);
        $.ajax({url:'http://build.myappbuilder.com/api/messages.json', type:"POST",data:{"message[body]":replymessage,"message[parent_id]":replyMgsNo,"message[sender_id]":localStorage.sender_id,"api_key":appKey,"button_id":buttonId},
          success:function(response){

            $('#ButtonappwallListview').empty();
            $.ajax({
                  type: "GET",
                  url: "http://build.myappbuilder.com/api/messages.json",
                  data:{'api_key':appKey,'button_id':buttonId},
                  cache: false,
                  success:function(response){

                    window.wizSpinner.hide();
                    $('#'+replyarray).val('');
                    messages = response;
                    ButtonAppWallPostFun();
                  },
                  error:function(error,status){
                     window.wizSpinner.hide();
                    var error = JSON.parse(error.responseText);
                    if(error.error == "Unauthorized"){
                      navigator.notification.alert("Please Login")
                    }else {
                      navigator.notification.alert("Login Error!");
                    }
                  }
            });
          },
          error:function(){ window.wizSpinner.hide(); alert("Failure");}
        });
      }
  }else{
    
  }

}



function ButtonpostmessageFun(){
  if(localStorage.appwallLoginData){
    var postmessage = $('#Buttonpostmessage').val();
    if(postmessage == ''){
      alert("Please Enter Your Comments...");
    }else{
     window.wizSpinner.show(options);
      $.ajax({url:'http://build.myappbuilder.com/api/messages.json', type:"POST",data:{"message[body]":postmessage,"message[sender_id]":localStorage.sender_id,"api_key":appKey,"button_id":buttonId},
        success:function(response){
		//	alert(JSON.stringify(response));
          $('#ButtonappwallListview').empty();
          $.ajax({
                  type: "GET",
                  url: "http://build.myappbuilder.com/api/messages.json",
                  data:{'api_key':appKey,'button_id':buttonId},
                  cache: false,
                  success:function(response){
					//alert(JSON.stringify(response));
                    window.wizSpinner.hide();
                    $('#Buttonpostmessage').val('');
                    messages = response;
                    ButtonAppWallPostFun();
                  },
                  error:function(error,status){
                    window.wizSpinner.hide();
                    
                    var error = JSON.parse(error.responseText);
                    if(error.error == "Unauthorized"){
                      navigator.notification.alert("Please Login")
                    }else {
                      navigator.notification.alert("Login Error!");
                    }
                  }
            });
        },
        error:function(){  window.wizSpinner.hide(); alert(" Network Failure ");}
      });
    }
  }else{
    
  }
}



control.controller('elementAppWallCtrl',function($scope,$state,$ionicLoading,$ionicPopup,$ionicModal,$ionicScrollDelegate){

$scope.backelementAppwall = function(){
	$state.go('chapterlist');
}

$scope.homeelementAppwall = function(){
	$state.go('sample');
}

 $scope.appTitle = appTitle;
 
if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

  messages = '';
   window.wizSpinner.show(options);
  $.ajax({url:'http://build.myappbuilder.com/api/messages.json',type:"GET",data:{"api_key":appKey,"element_id":elementId},
    success:function(response){
//alert(JSON.stringify(response));
       window.wizSpinner.hide();
      messages = response;
      ElementAppWallPostFun();
    },
    error:function(error,status){
      window.wizSpinner.hide();
      var error = JSON.parse(error.responseText);
      if(error.error == "Unauthorized"){
          navigator.notification.alert("Please Login")
      }else {
           navigator.notification.alert("Login Error!");
      }
    }
  });
  
});

function ElementAppWallPostFun(){
   
              var bodyMgs = '';
              var mgs_id = []; 
              var body = [];
              var created_at = [];
              var parent_id = []; 
              var element_name = [];
              var button_name =[];
              var sender_name = [];
              var sender_id = [];
              var sender_avatar_url = [];
              var replyappend ='';
              var z = 0;
              var p = 0;
              //alert("msgLen:"+messages.length);
              if(messages.length > 0){
                $.each( messages, function( key, value ) {
                  $.each( value, function( k, v ) {
                      if(k == "id"){
                        mgs_id.push(v);
                      }else if(k == "created_at"){
                        created_at.push(v);
                      }else if(k == "parent_id"){
                        parent_id.push(v);
                      }else if(k == "body"){
                        body.push(v);
                      }else if(k == "element_name"){
                        element_name.push(v);
                      }else if(k == "button_name"){
                        button_name.push(v);
                      }else if(k == "sender_name"){
                        sender_name.push(v);
                      }else if(k == "sender_id"){
                        sender_id.push(v);
                      }else if(k == 'sender_avatar_url'){
                        if(v == null){
                          v = 'img/face.png';
                        }
                        sender_avatar_url.push(v);
                      }
                  });
                });
              }else{
                bodyMgs = '<a><p align="justify" class="divback2" ><font color="black" size="2">No Result Found</font></p></a>';
              }
              
              for(var i=0;i<body.length;i++){

                if(parent_id[i] == null){
                  p=0;
                  for(var j=0;j<body.length;j++){
                     p = p+1;
                    if(mgs_id[i] == parent_id[j]){
                       z = -1;
                       var k = parseInt(p)+z;
                        if(localStorage.sender_id == sender_id[k]){
                          replyappend +='<div class="row"><div class="col col-80 divback1"><div class="row"><div class="col col-50" align="left">'+sender_name[k]+'</div><div class="col col-50" align="right"><i class="icon ion-clock"></i>  '+relative_time(created_at[k])+'</div></div><div align="center"><font color="white" size="2" style="background-color:#33CCFF">&nbsp;'+button_name[k]+'&nbsp;</font>&nbsp;>&nbsp;<font color="white" size="2" style="background-color:#33CCFF">&nbsp;'+element_name[k]+'&nbsp;</font></div><hr><div><p align="justify">'+body[k]+'</p><hr></div><div style="width:100%;"><div style="width:50%;"><div style="width:100%;"><div style="width:50%;float:left;"><img src="img/delete.png" id="delete-'+k+'" class="ElementdeleteMgs" style="width:100%;height:auto;"/></div></div></div></div></div><div class="col col-20"><img src="'+sender_avatar_url[k]+'" style="width:100%;height:auto;"/></div></div><br/>';
                        }else{
                          replyappend +='<div class="row"><div class="col col-80 divback1"><div class="row"><div class="col col-50" align="left">'+sender_name[k]+'</div><div class="col col-50" align="right"><i class="icon ion-clock"></i>  '+relative_time(created_at[k])+'</div></div><div align="center"><font color="white" size="2" style="background-color:#33CCFF">&nbsp;'+button_name[k]+'&nbsp;</font>&nbsp;>&nbsp;<font color="white" size="2" style="background-color:#33CCFF">&nbsp;'+element_name[k]+'&nbsp;</font></div><hr><div><p align="justify">'+body[k]+'</p></div><div class="row"></div></div><div class="col col-20"><img src="'+sender_avatar_url[k]+'" style="width:100%;height:auto;"/></div></div><br/>';
                        }
                    }else{
                     
                    }
                    
                 }
                  if(localStorage.sender_id == sender_id[i]){
                    bodyMgs +='<div class="row"><div class="col col-20"><img src="'+sender_avatar_url[i]+'" style="width:100%;height:auto;"/></div><div class="col col-80 divback"><div class="row"><div class="col col-50" align="left">'+sender_name[i]+'</div><div class="col col-50" align="right"><i class="icon ion-clock"></i>  '+relative_time(created_at[i])+'</div></div><div align="center"><font color="white" size="2" style="background-color:#33CCFF">&nbsp;'+button_name[i]+'&nbsp;</font>&nbsp;>&nbsp;<font color="white" size="2" style="background-color:#33CCFF">&nbsp;'+element_name[i]+'&nbsp;</font></div><hr><div><p align="justify">'+body[i]+'</p><hr></div><div style="width:100%;"><div style="width:50%;"><div style="width:100%;"><div style="width:50%;float:left;" ><img src="img/reply.png" id="reply-'+i+'" class="ElementreplyMgs" style="width:100%;height:auto;"/></div><div style="width:50%;float:left;" ><img src="img/delete.png" id="delete-'+i+'" class="ElementdeleteMgs" style="width:100%;height:auto;"/></div></div></div></div></div></div><div style="width:100%;"><div style="width:20%;float:left;opacity:0">Hello</div><div style="width:80%;float:left;"><div class="ElementreplyHide bar bar-header item-input-inset" id="ElementreplyHide'+i+'" ><label class="item-input-wrapper"><input id="Elementreplymessage'+i+'" type="text" id="postmessage" placeholder="Enter Your Reply...."></label><button id="textReplyMgs" onclick="javascript:ElementreplymessageFun();" class="button button-clear button-positive"><img src="img/btn_reply.png" style="width:70px;height:auto;"/></button></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div>';
                  }else{
                    bodyMgs +='<div class="row"><div class="col col-20"><img src="'+sender_avatar_url[i]+'" style="width:100%;height:auto;"/></div><div class="col col-80 divback"><div class="row"><div class="col col-50" align="left">'+sender_name[i]+'</div><div class="col col-50" align="right"><i class="icon ion-clock"></i>  '+relative_time(created_at[i])+'</div></div><div align="center"><font color="white" size="2" style="background-color:#33CCFF">&nbsp;'+button_name[i]+'&nbsp;</font>&nbsp;>&nbsp;<font color="white" size="2" style="background-color:#33CCFF">&nbsp;'+element_name[i]+'&nbsp;</font></div><hr><div><p align="justify">'+body[i]+'</p><hr></div><div style="width:100%"><div style="width:50%;float:left;"><div style="width:100%"><div style="width:50%;float:left;" ><img src="img/reply.png" id="reply-'+i+'" class="ElementreplyMgs" style="width:100%;height:auto;"/></div></div></div></div></div></div><div style="width:100%;"><div style="width:20%;float:left;opacity:0">Hello</div><div style="width:80%;float:left;"><div class="ElementreplyHide bar bar-header item-input-inset" id="ElementreplyHide'+i+'" ><label class="item-input-wrapper"><input id="Elementreplymessage'+i+'" type="text" id="postmessage" placeholder="Enter Your Reply...."></label><button id="textReplyMgs" onclick="javascript:ElementreplymessageFun();" class="button button-clear button-positive"><img src="img/btn_reply.png" style="width:70px;height:auto;"/></button></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div>';
                  }
                  replyappend ='';

                }else{
                  
                }
              }
              
              $('#ElementappwallListview').append(bodyMgs).trigger("create");

              if($('.ElementreplyHide').is(':visible')){
                $('.ElementreplyHide').toggle();
              }else{
                
              }

              $(".ElementreplyMgs").click(function(){
                    replyMgsNo1 = (this.id).split('-');
                    replyMgsNo = mgs_id[replyMgsNo1[1]];
                    var replyHide = "ElementreplyHide"+replyMgsNo1[1];
                    $('#'+replyHide).toggle();
              });

              $(".ElementdeleteMgs").click(function(){
                    var deleteMgsNo = (this.id).split('-');
                    //alert(mgs_id[deleteMgsNo[1]])
                    window.wizSpinner.show(options);
                    if(localStorage.appwallLoginData){
                      $.ajax({url:'http://build.myappbuilder.com/api/messages.json?api_key='+appKey+'&message_id='+mgs_id[deleteMgsNo[1]], type:"DELETE",data:{},
                        success:function(response){
                          $('#ElementappwallListview').empty();
                          $.ajax({
                            type: "GET",
                            url: "http://build.myappbuilder.com/api/messages.json",
                            data:{'api_key':appKey,'element_id':elementId},
                            cache: false,
                            success:function(response){
								window.wizSpinner.hide();
                              messages = response;
                              ElementAppWallPostFun();
                            },
                            error:function(error,status){
                              window.wizSpinner.hide();
                              
                              var error = JSON.parse(error.responseText);
                              if(error.error == "Unauthorized"){
                                navigator.notification.alert("Please Login")
                              }else {
                                navigator.notification.alert("Login Error!");
                              }
                            }
                      });
                        },
                        error:function(){  window.wizSpinner.hide(); alert("Failure");}
                      });
                    }else{
                      
                    }
              });
}

function ElementreplymessageFun(){

  if(localStorage.appwallLoginData){
    var replyarray = "Elementreplymessage"+replyMgsNo1[1];
    var replymessage = $('#'+replyarray).val();
      if(replymessage == ''){
       alert("Please Enter Your Reply...");
      }else{
         window.wizSpinner.show(options);
        $.ajax({url:'http://build.myappbuilder.com/api/messages.json', type:"POST",data:{"message[body]":replymessage,"message[parent_id]":replyMgsNo,"message[sender_id]":localStorage.sender_id,"api_key":appKey,"element_id":elementId},
          success:function(response){
            $('#ElementappwallListview').empty();
            $.ajax({
                  type: "GET",
                  url: "http://build.myappbuilder.com/api/messages.json",
                  data:{'api_key':appKey,'element_id':elementId},
                  cache: false,
                  success:function(response){
                     window.wizSpinner.hide();
                    $('#'+replyarray).val('');
                    messages = response;
                    ElementAppWallPostFun();
                  },
                  error:function(error,status){
                   window.wizSpinner.hide();
                    
                    var error = JSON.parse(error.responseText);
                    if(error.error == "Unauthorized"){
                      navigator.notification.alert("Please Login")
                    }else {
                      navigator.notification.alert("Login Error!");
                    }
                  }
            });
          },
          error:function(){  window.wizSpinner.hide(); alert("Failure");}
        });
      }
  }else{
    
  }

}



function ElementpostmessageFun(){
	
  if(localStorage.appwallLoginData){
    var postmessage = $('#Elementpostmessage').val();
    if(postmessage == ''){
      alert("Please Enter Your Comments...");
    }else{
       window.wizSpinner.show(options);
      $.ajax({url:'http://build.myappbuilder.com/api/messages.json', type:"POST",data:{"message[body]":postmessage,"message[sender_id]":localStorage.sender_id,"api_key":appKey,"element_id":elementId},
        success:function(response){
          $('#ElementappwallListview').empty();
          $.ajax({
                  type: "GET",
                  url: "http://build.myappbuilder.com/api/messages.json",
                  data:{'api_key':appKey,'element_id':elementId},
                  cache: false,
                  success:function(response){
                     window.wizSpinner.hide();
                    $('#Elementpostmessage').val('');
                    messages = response;
                    ElementAppWallPostFun();
                  },
                  error:function(error,status){
                    window.wizSpinner.hide();
                    
                    var error = JSON.parse(error.responseText);
                    if(error.error == "Unauthorized"){
                      navigator.notification.alert("Please Login");
                    }else {
                      navigator.notification.alert("Login Error!");
                    }
                  }
            });
        },
        error:function(){  window.wizSpinner.hide(); alert(" Network Failure ");}
      });
    }
  }else{
    
  }
}


var customeditvideoid='';
var imageeditvideo='';

control.controller('videoeditCtrl',function($scope,$state,$ionicScrollDelegate,$ionicActionSheet,$ionicLoading,$stateParams,$http,$location,$ionicPopup,$rootScope){ 
  
    $ionicScrollDelegate.scrollTop();
 
function readURL22(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
				 $('#videoediturlimg').attr({'src':"img/btn_video.png"});
             $('#videoediturlimg').css({'width':'50px','height':'50px'}); 	
             $('.file-input-wrapper > .btn-file-input').css('background-image', 'url('+e.target.result+')');		
        //  $('.file-input-wrapper > .btn-file-input').css('background-image', 'url('+e.target.result+')');
            }

            reader.readAsDataURL(input.files[0]);
        }
  }

  $("#editvideo").change(function(){
	  check=true;
      readURL22(this);
  });
  
$scope.naveditvideo = function(){
   $state.go('navicon');
 } 
$scope.homeeditvideo = function(){
   $state.go('newapp');
 }
 $scope.backeditvideo = function(){
    $state.go('video');
  }
  
$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}
 
 	
$scope.createeditvideo={}

 $scope.tinymceOptions = {
        

        menubar: false,
        theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime table contextmenu ",
            "emoticons textcolor"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | bullist numlist outdent indent | link image | alignleft aligncenter alignright alignjustify forecolor backcolor"
        
	};
	
 
$scope.createeditvideo.editvideotitle=videotitle;
$scope.createeditvideo.editvideotext= videodesc;
if(videothumb){
    $('#videoeditimg').attr({'src':videothumb});
    	$('#videoeditimg').css({'width':'50px','height':'50px'}); 		
  }
 if(videoimg){
    $('#editvideo').attr({'url':videoimg});   
    $('#videoediturlimg').attr({'src':videothumb});
   $('#videoediturlimg').css({'width':'50px','height':'50px'}); 			
  }

$scope.editvideoselect = function(){

     $ionicActionSheet.show({

          titleText: '<b><font size="4">Choose</font></b>',
            buttons: [
             { text: 'Camera' },
             { text: 'PhotoAlbum' },
              ],

            cancelText: 'Cancel',
             cancel: function() {
           // alert('CANCELLED');
             },
             
     buttonClicked: function(index) {
    // alert('BUTTON CLICKED', index);

       if(index==0){

         navigator.camera.getPicture(onSuccess, onFail, { quality: 50,

        destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.CAMERA,saveToPhotoAlbum: false,correctOrientation:true});

       return true;

       }

       else{

          navigator.camera.getPicture(onSuccess, onFail, { quality: 50,

          destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.PHOTOLIBRARY,saveToPhotoAlbum: false,correctOrientation:true});

          return true;

         }                                

          }

		});

       };
                 
    function onSuccess(imageURI) {
check=true;
         imageeditvideo = imageURI;
				$('#videoeditimg').attr('src', imageeditvideo); 
	    		 $('#videoeditimg').css({'width':'50px','height':'50px'});
      //   $('.file-input-wrapper5 > .btn-file-input5').css('background-image', 'url('+imageURI+')');

     }

    function onFail(message) {

         navigator.notification.alert('Failed because: ' + message);

      } 
      
$scope.updatevideo = function(){            

	 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
if(check ==true){
	
  if((($scope.createeditvideo.editvideotitle)!=videotitle) && (($scope.createeditvideo.editvideotext)!=videodesc)){  

		cordova.exec(function(response){
		
	   alert("Successfully Updated");
       $ionicLoading.hide();
  	 }, 
  	 function(e){alert(e);$ionicLoading.hide();}, "BaseWizard", "videocompress",["http://build.myappbuilder.com/api/elements/update_video.json?", "put",{"api_key":appKey,"id":videoelement,"title":$scope.createeditvideo.editvideotitle,"text":$scope.createeditvideo.editvideotext,"video": $("#editvideo").get(0).files[0],"video_thumbnail":imageeditvideo}])          


	  }
 
else{
		cordova.exec(function(response){
			
			   alert("Successfully Updated");
			   $ionicLoading.hide();
			 }, 
			 function(e){alert(e);$ionicLoading.hide();}, "BaseWizard", "videocompress",["http://build.myappbuilder.com/api/elements/update_video.json?", "put",{"api_key":appKey,"id":videoelement,"title":$scope.createeditvideo.editvideotitle,"text":$scope.createeditvideo.editvideotext,"video": $("#editvideo").get(0).files[0],"video_thumbnail":imageeditvideo}])          
}
}
else{

		   var formData = new FormData();
           formData.append('api_key',appKey);
           formData.append('id',videoelement);       
           formData.append('title',$scope.createeditvideo.editvideotitle);
           formData.append('text',$scope.createeditvideo.editvideotext);
           
		        $('#editvideo').attr({'url':videoimg});
				$('#videoediturlimg').attr({'src':videothumb});
				$('#videoediturlimg').css({'width':'50px','height':'50px'}); 	
				$('#videoeditimg').attr({'src':videothumb});
				$('#videoeditimg').css({'width':'50px','height':'50px'}); 	

	  
				$http.put('http://build.myappbuilder.com/api/elements/update_video.json', formData, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                      })
                      
                      .success(function(data,status, headers, config){
						//alert(JSON.stringify(data));
						  alert("Successfully Updated");
						  $ionicLoading.hide();					 

					  })
					  .error(function(data,status, headers, config){
                        $ionicLoading.hide();
                        alert(JSON.stringify(data));
                      });	
	   }     

}
 $scope.cuseditvideo={}
 
$scope.createvideoedit = function(){

	$('#editcusvideotitle').val('');
	$('#editcusvideovalue').val('');
	
    if($scope.cuseditvideo.customeditvideoTitle){
      if($scope.cuseditvideo.customeditvideovalue){
	 
      $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });

       $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/custom_values.json",
          data:{'api_key':appKey,'element_id':videoelement,'title':$scope.cuseditvideo.customeditvideoTitle,'value':$scope.cuseditvideo.customeditvideovalue},
          success:function(response){
			 customeditvideoid = response.id;
     
            $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':videoelement},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
						    $scope.editvideopage = response;
						  // alert(JSON.stringify($scope.editvideopage));
						   $state.reload();   
                      
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);
            navigator.notification.alert(error.responseText);
          }
      });
    }
      }else{
      navigator.notification.alert("Enter Title And Value");
    }
   
  }


$scope.removevideoCustomValue = function(id){

    customeditvideoid = id;
    
   $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
          $.ajax({
            type: "DELETE",
            url: "http://build.myappbuilder.com/api/custom_values.json",
            data: {"api_key":appKey,"id":customeditvideoid},
            cache: false,
            success:function(response){
              $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':videoelement},
                        cache: false,
                        success:function(response){
                           $ionicLoading.hide();
						    $scope.editvideopage = response;
						   //alert(JSON.stringify($scope.editvideopage));
						   $state.reload()						  
                          
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
            error:function(error,status){
               $ionicLoading.hide();
              navigator.notification.alert(error.responseText)
            }
          });
}

});


var customdisvideoid='';
var imagedisvideo='';

control.controller('videodisplayCtrl',function($scope,$state,$ionicScrollDelegate,$ionicLoading,$http,$ionicActionSheet){ 

  $ionicScrollDelegate.scrollTop();

 if(Appwall.element_wall == '0'){
    $scope.elementAppWall = false;
  }else if(Appwall.element_wall == '1'){
    $scope.elementAppWall = true;
  }
  
  $scope.elementAppwallgoFun=function(){
	  $state.go('elementAppWall');
  }
function readURL26(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
				 $('#videodisurlimg').attr({'src':"img/btn_video.png"});
				$('#videodisurlimg').css({'width':'50px','height':'50px'});
				$('.file-input-wrapper > .btn-file-input').css('background-image', 'url('+e.target.result+')'); 		
         // $('.file-input-wrapper > .btn-file-input').css('background-image', 'url('+e.target.result+')');
            }

            reader.readAsDataURL(input.files[0]);
        }
  }

  $("#videodisplay").change(function(){
	    check=true;
	 
      readURL26(this);
  });
	 
  if(contentvideothumb){
    $('#videodisplayimg').attr({'src':contentvideothumb});
    	$('#videodisplayimg').css({'width':'50px','height':'50px'}); 		
  }
 if(contentvideo){
    $('#videodisplay').attr({'url':contentvideo});   
    $('#videodisurlimg').attr({'src':contentvideothumb});
   $('#videodisurlimg').css({'width':'50px','height':'50px'}); 			
  }
  
  $scope.disvideoselect = function(){

     $ionicActionSheet.show({

          titleText: '<b><font size="4">Choose</font></b>',
            buttons: [
             { text: 'Camera' },
             { text: 'PhotoAlbum' },
              ],

            cancelText: 'Cancel',
             cancel: function() {
           // alert('CANCELLED');
             },
             
     buttonClicked: function(index) {
    // alert('BUTTON CLICKED', index);

       if(index==0){

         navigator.camera.getPicture(onSuccess, onFail, { quality: 50,

        destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.CAMERA,saveToPhotoAlbum: false,correctOrientation:true});

       return true;

       }

       else{

          navigator.camera.getPicture(onSuccess, onFail, { quality: 50,

          destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.PHOTOLIBRARY,saveToPhotoAlbum: false,correctOrientation:true});

          return true;

         }                                

          }

		});

       };
                 
    function onSuccess(imageURI) {
check=true;
         imagedisvideo = imageURI;
				$('#videodisplayimg').attr('src', imagedisvideo); 
	    		 $('#videodisplayimg').css({'width':'50px','height':'50px'});
      //   $('.file-input-wrapper5 > .btn-file-input5').css('background-image', 'url('+imageURI+')');

     }

    function onFail(message) {

         navigator.notification.alert('Failed because: ' + message);

      } 
  
$scope.backdisplayvideo = function(){
   $state.go('previewvideo');
 } 
$scope.homedisplayvideo = function(){
   $state.go('sample');
 }
 
$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}
 
 	
 	  $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
							$scope.disvideopage = response;
						   $state.reload();       
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });       
                           
$scope.createdisplayvideo={}
$scope.cusdisplayvideo={}

 $scope.tinymceOptions = {
        

        menubar: false,
        theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime table contextmenu ",
            "emoticons textcolor"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | bullist numlist outdent indent | link image | alignleft aligncenter alignright alignjustify forecolor backcolor"
        
	};
	
 
$scope.createdisplayvideo.displayvideotitle = elementtitle;
$scope.createdisplayvideo.displayvideotext = elementtext;

if(contentvideothumb){
    $('#videodisplayimg').attr({'src':contentvideothumb});
    $('#videodisplayimg').css({'width':'50px','height':'50px'}); 		
  }
 if(contentvideo){
    $('#videodisplay').attr({'url':contentvideo});
      $('#videodisurlimg').attr({'src':contentvideothumb});
    $('#videodisurlimg').css({'width':'50px','height':'50px'});  
  }
$scope.updatevideodisplay = function(){            
	
	 $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });

       if((check ==true) && (($scope.createdisplayvideo.displayvideotitle)!=elementtitle) && (($scope.createdisplayvideo.displayvideotext)!=elementtext)){  

		cordova.exec(function(response){
		//alert('1');
	   alert("Successfully Updated");
       $ionicLoading.hide();
  	 }, 
  	 function(e){alert(e);$ionicLoading.hide();}, "BaseWizard", "videocompress",["http://build.myappbuilder.com/api/elements/update_video.json?", "put",{"api_key":appKey,"id":elementId,"title":$scope.createdisplayvideo.displayvideotitle,"text":$scope.createdisplayvideo.displayvideotext,"video": $("#videodisplay").get(0).files[0],"video_thumbnail":imagedisvideo}])          


	  }
	   if((check ==true) && (($scope.createdisplayvideo.displayvideotitle)==elementtitle) && (($scope.createdisplayvideo.displayvideotext)==elementtext)){  

		cordova.exec(function(response){
		//alert('2');
	   alert("Successfully Updated");
       $ionicLoading.hide();
  	 }, 
  	 function(e){alert(e);$ionicLoading.hide();}, "BaseWizard", "videocompress",["http://build.myappbuilder.com/api/elements/update_video.json?", "put",{"api_key":appKey,"id":elementId,"title":$scope.createdisplayvideo.displayvideotitle,"text":$scope.createdisplayvideo.displayvideotext,"video": $("#videodisplay").get(0).files[0],"video_thumbnail":imagedisvideo}])          


	  }  

	  else{

		   var formData = new FormData();
           formData.append('api_key',appKey);
           formData.append('id',elementId);       
           formData.append('title',$scope.createdisplayvideo.displayvideotitle);
           formData.append('text',$scope.createdisplayvideo.displayvideotext);
           
		        $('#videodisplay').attr({'url':contentvideo}); 
		        $('#videodisurlimg').attr({'src':contentvideothumb});
				$('#videodisurlimg').css({'width':'50px','height':'50px'});  			
				$('#videodisplayimg').attr({'src':contentvideothumb});
				$('#videodisplayimg').css({'width':'50px','height':'50px'}); 

	  
				$http.put('http://build.myappbuilder.com/api/elements/update_video.json', formData, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                      })
                      
                      .success(function(data,status, headers, config){
						//alert(JSON.stringify(data));
						  alert("Successfully Updated");
						  $ionicLoading.hide();					 

					  })
					  .error(function(data,status, headers, config){
                        $ionicLoading.hide();
                        alert(JSON.stringify(data));
                      });	
	   }  
	   
	
 
}
 $scope.createvideodis = function(){

$('#discusvideotitle').val('');
$('#discusvideovalue').val('');
	
    if($scope.cusdisplayvideo.customdisvideoTitle){
      if($scope.cusdisplayvideo.customdisvideovalue){
	 
      $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });

       $.ajax({
          type: "POST",
          url: "http://build.myappbuilder.com/api/custom_values.json",
          data:{'api_key':appKey,'element_id':elementId,'title':$scope.cusdisplayvideo.customdisvideoTitle,'value':$scope.cusdisplayvideo.customdisvideovalue},
          success:function(response){
			 customdisvideoid = response.id;

            $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();                      
						    $scope.disvideopage = response;                 
						   $state.reload();     
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
          error:function(error){
            $ionicLoading.hide();
            var error = JSON.parse(error.responseText);
            navigator.notification.alert(error.responseText);
          }
      });
    }
      }else{
      navigator.notification.alert("Enter Title And Value");
    }
   
  }
  
$scope.removevideodisCustomValue = function(id){

    customdisvideoid = id;
    
   $ionicLoading.show({
              content: '<i class="icon ion-loading-a"></i>&nbsp;Please Wait..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
      });
      
          $.ajax({
            type: "DELETE",
            url: "http://build.myappbuilder.com/api/custom_values.json",
            data: {"api_key":appKey,"id":customdisvideoid},
            cache: false,
            success:function(response){
              $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
							$scope.disvideopage = response;
						   $state.reload();       
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
            },
            error:function(error,status){
               $ionicLoading.hide();
              navigator.notification.alert(error.responseText)
            }
          });
}

});

control.controller('previewpicCtrl',function($scope,$state,$ionicLoading,$http){
	 

$scope.elementTitle = elementtitle;
$scope.description = elementtext;

$scope.logprevtext = function(){
	$state.go('picdisplay');
}
$scope.homeprevtext = function(){
	$state.go('sample');
}
$scope.backprevtext = function(){
	$state.go('chapterlist');
}

 $scope.appTitle = appTitle;	
 
if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

 $scope.AppEditor = false;

  $scope.logedittext = function(){
    if($scope.AppEditor == false){
      $scope.AppEditor = true;
    }else{
      $scope.AppEditor =false;
    }
  }

$.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/elements/images.json",
                        data:{'api_key':appKey,'id':elementId},
                        cache: false,
                        success:function(response){
							
                          $ionicLoading.hide();
							$scope.editpicpage = response;
						   $state.reload();       
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });         

 $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
						    $scope.edittxtpage = response;
						   //  alert(JSON.stringify($scope.distxtpage));
						   $state.reload();   						                            
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              

 $scope.tinymceOptions = {
        

        menubar: false,
        theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime table contextmenu ",
            "emoticons textcolor"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | bullist numlist outdent indent | link image | alignleft aligncenter alignright alignjustify forecolor backcolor"
        
	};

});

control.controller('previewwebCtrl',function($scope,$state,$ionicLoading,$http){

 $scope.backprevweb=function(){
      $state.go('chapterlist');
  }
  $scope.homeprevweb=function(){
      $state.go('sample');
  }
  $scope.logprevweb=function(){
      $state.go('webdisplay');
  }

$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

$scope.elementtitle = elementtitle;
$scope.elementurl= elementurl;
$scope.elementtext=elementtext;

 $scope.tinymceOptions = {
        

        menubar: false,
        theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime table contextmenu ",
            "emoticons textcolor"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | bullist numlist outdent indent | link image | alignleft aligncenter alignright alignjustify forecolor backcolor"
        
	};
	$.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
						   $scope.diswebpage = response;
						   $state.reload();   			                           
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });      
                     

});

control.controller('previewtaskCtrl',function($scope,$state,$ionicLoading){ 
  
  $scope.logprevtask=function(){
	  $state.go('taskdisplay');
  }
  $scope.backprevtask=function(){
      $state.go('chapterlist');
   }
  $scope.homeprevtask=function(){
       $state.go('sample');
  }

$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}


 $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();   
						     $scope.taskdisplaypage = response;
						   $state.reload();   	  
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });             
              
 $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/elements/tasks.json",
                        data:{'api_key':appKey,'id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
						    $scope.taskdisplay = response;
						   $state.reload();    
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });               


});

control.controller('previewrssCtrl',function($scope,$state,$ionicLoading){ 
  
  $scope.logprevrss=function(){
	  $state.go('rssdisplay');
  }
  $scope.backprevrss=function(){
       $state.go('chapterlist');
   }
   $scope.homeprevrss=function(){
        $state.go('sample');
}

$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

$scope.elementtitle = elementtitle;
$scope.elementrssurl = elementrssurl;
$scope.elementtext = elementtext;

$scope.tinymceOptions = {
        

        menubar: false,
        theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime table contextmenu ",
            "emoticons textcolor"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | bullist numlist outdent indent | link image | alignleft aligncenter alignright alignjustify forecolor backcolor"
        
	};

 $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();                        
						    $scope.disrsspage = response;
						   $state.reload();   
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });                          
  
});

control.controller('previewmapCtrl',function($scope,$state,$ionicLoading){ 
  
  $scope.logprevmap = function(){
	  $state.go('mapdisplay');
  }
  $scope.backprevmap = function(){
       $state.go('chapterlist');
  }
  $scope.homeprevmap=function(){
        $state.go('sample');
   }

$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

 $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/elements/addresses.json",
                        data:{'api_key':appKey,'id':elementId},
                        cache: false,
                        success:function(response){                       
                          $ionicLoading.hide();
                           $scope.addressess = response; 
						   $state.reload();               

                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });    
              
   $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
						    $scope.dismappage = response;
						   $state.reload();   	  
                          
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });              
});

control.controller('previewformCtrl',function($scope,$state,$ionicLoading){ 
  
  $scope.logprevform=function(){
	  $state.go('formdisplay');
  }
  $scope.backprevform=function(){
      $state.go('chapterlist');
   }
  $scope.homeprevform=function(){
      $state.go('sample');
  }

$scope.elementemail = elementemail;

$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}
   
              
 $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
						    $scope.disformtype = response;
						   $state.reload();   	  
                          
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });     
                
});

control.controller('previewaudioCtrl',function($scope,$state,$ionicLoading){ 
  
  $scope.logprevaudio=function(){
	  $state.go('audiodisplay');
  }

$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}

 
 	
 	  $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
							$scope.disaudiopage = response;
						   $state.reload();       
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });                                  

 $scope.tinymceOptions = {
        

        menubar: false,
        theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime table contextmenu ",
            "emoticons textcolor"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | bullist numlist outdent indent | link image | alignleft aligncenter alignright alignjustify forecolor backcolor"
        
	};
	
 
$scope.elementtitle = elementtitle;
$scope.elementtext = elementtext;

    $('#audioprevimg').attr({'src':contentimg});
    $('#audioprevimg').css({'width':'50px','height':'50px'}); 		

     $('#audioprevurlimg').attr({'src':contentimg});
    $('#audioprevurlimg').css({'width':'50px','height':'50px'});   	
  

$scope.backprevaudio=function(){
    $state.go('chapterlist');
 }
$scope.homeprevaudio=function(){
    $state.go('sample');
}

});

control.controller('previewvideoCtrl',function($scope,$state,$ionicLoading,$http){
  
$scope.logprevvideo=function(){
	  $state.go('videodisplay');
  }  
$scope.backprevvideo = function(){
   $state.go('chapterlist');
 } 
$scope.homeprevvideo = function(){
   $state.go('sample');
 }
 
$scope.appTitle = appTitle;	

if(colour == 'undefined'){	
$scope.bar_color = 'bar-positive';
}
else
{
$scope.bar_color = 'bar-'+colour;
}

if(buttoncolour == 'undefined'){
$scope.bar_button_color ='button-positive'; 
}
else
{
$scope.bar_button_color ='button-'+buttoncolour;
}

if(button == 'undefined'){
$scope.button_color = 'button-positive';
}
else
{
$scope.button_color='button-'+button;
}
 	
 	  $.ajax({
                        type: "GET",
                        url: "http://build.myappbuilder.com/api/custom_values.json",
                        data:{'api_key':appKey,'element_id':elementId},
                        cache: false,
                        success:function(response){
                          $ionicLoading.hide();
							$scope.disvideopage = response;
						   $state.reload();       
                        },
                        error:function(error,status){
                           $ionicLoading.hide();
                          navigator.notification.alert(error.responseText);
                        }
              });  
              

 $scope.tinymceOptions = {
        

        menubar: false,
        theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime table contextmenu ",
            "emoticons textcolor"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | bullist numlist outdent indent | link image | alignleft aligncenter alignright alignjustify forecolor backcolor"
        
	};
	
 
$scope.elementtitle = elementtitle;
$scope.elementtext = elementtext;

    $('#videoprevimg').attr({'src':contentvideothumb});
    $('#videoprevimg').css({'width':'50px','height':'50px'}); 		

      $('#videoprevurlimg').attr({'src':contentvideothumb});
    $('#videoprevurlimg').css({'width':'50px','height':'50px'});  


});
