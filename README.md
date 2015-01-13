**Apache Cordova FrontEndBuilder iOS Application**

This is used as the default app template when creating new projects for the Users as well as the Subscribers.

**Versions and Tags**

Sample app is built and tested with Cordova 3.5.0 iOS and we only support Cordova version greater than 3.0.

**Required reading**

Please see the Getting Started With iOS for PhoneGap guide [here](http://docs.phonegap.com/en/3.5.0/guide_platforms_ios_index.md.html#iOS%20Platform%20Guide).

**MAB FrontEndBuilder** :

1) MyAppBuilder can easily create iPhone and Android Apps in Minutes or have MyAppBuilder.com create iphone or android apps for you. Save money and time in creating mobile application

1) FrontEndBuilder  is a cloud based Apps,Buttons and Elements sharing platform. 

2) MyAppBuilder.com contains copyrighted material, trademarks and other proprietary information, including, but not limited to, text, software, photos, video, graphics, music and sound, and the entire contents of MyAppBuilder.com are copyrighted as a collective work under the USA copyright laws.

3)Hybrid Mobile for MAB FrontEndBuilder Apps.

MAB FrontEndBuilder shows user Apps in list that functions like a UITableView and also user can Create Apps,Buttons and Elements. User can share a link,Delete buttons & elements,Play Audio & Video,Upload Pictures, View Map etc

###  **_App Controller_**  ##########

 1) www folder

i) index.html

ii) js/index.js

iii) js/controller.js

## **_Sign up_** ##########

Register controller inside the index.js

API For User Sign Up: **http://build.myappbuilder.com/api/users.json**

Code:

 $.ajax({

   type: "POST",

    url: "http://build.myappbuilder.com/api/users.json",

    data:{'name':Name,'username':regUserId,

                'email':regEmail,'password':regPassword,                                                                                       

                'password_confirmation':regConfirmPassword},

    cache:false,

    success:function(response){

    },

    error:function(error,status){

    }

  });

######## **_Sign in_** #############

Login controller inside the index.js

API For User Sign In: **http://build.myappbuilder.com/api/login.json**

Code:

var userId = $('#userId').val();

var password = $('#password').val();

$.ajax({

   type: "POST",

   url: "http://build.myappbuilder.com/api/login.json",

   data:{'login':userId,'password':password},

   success:function(response){ 

   if(JSON.stringify(response)      

         .indexOf("incentive_programs")&gt; -1){

//Checking Subscriber or User loginappList = response;

  else{                       // User login

appkeyResult = response;

  }

  },

  error:function(error,status){

  }

});

### **_Retrieve data from MAB server_** #####

API For User retrive Apps: [**http://build.myappbuilder.com/api/users.json**](http://build.myappbuilder.com/api/users.json)

appkeyResult.id // idof the user

code:

 $.ajax({

    type: "GET",

    url: "http://build.myappbuilder.com/api/users.json",

    data:{'api_key':appkeyResult.api_key,

      'id':appkeyResult.id},

    cache: false,

    success:function(response){

               appList = response;

    },

    error:function(error,status){

    }

});

**** **Create Apps in MAB *******************

API For User to Create Apps: **http://build.myappbuilder.com/api/apps.json**

$scope.appcreate.gridAppTitle     // Title of the app

$scope.appcreate.mypost            // Description of the app

code:

$.ajax({

     type: "POST",

     url: "http://build.myappbuilder.com/api/apps.json",

     data:{'api_key':appkeyResult.api_key,'title':

$scope.appcreate.gridAppTitle,

'description':$scope.appcreate.mypost},

     success:function(response){

},

      error:function(error){

       }

});

For Edit and Delete Apps use PUT and DELETE method

****** **Floating Social Icons and URL Creation** **********

API For User Floating Social Icons Creation: **http://build.myappbuilder.com/api/book_custom_fields.json**

$scope.appcre.customvalue     // Creation Value of floating         social icons(ON or OFF)

code:

$.ajax({

   type: "POST",

   url:"http://build.myappbuilder.com/api/

         book_custom_fields.json",

   data:{'api_key':appKey,'title':'Floating Social Icons','value': 

            $scope.appcre.customvalue},

   success:function(response){ 

   },

   error:function(error){  

   },

}); 

API For User URL Creation: 

[**http://build.myappbuilder.com/api/book_custom_fields.json**](http://build.myappbuilder.com/api/book_custom_fields.json)

$scope.appcre.floaturl    // URL to mention(to share in Social    networks) 

code:

$.ajax({

   type: "POST",

   url:"http://build.myappbuilder.com/api/

         book_custom_fields.json",

  data:{'api_key':appKey,'title':'Url','value':

$scope.appcre.floaturl},         

   success:function(response){ 

   },

   error:function(error){

   },

}); 

****** **Social Settings Creation** *******

API For User Social Settings Creation: **http://build.myappbuilder.com/api/apps/settings/social.json**

code:

var formData = new FormData();

formData.append('api_key',appKey);

formData.append('twitter_link',

$scope.book.twitter_username);

formData.append('twitter_key',$scope.book.twitter_key); formData.append('twitter_secret',                 

$scope.book.twitter_secret);

formData.append('facebook_link',

$scope.book.facebook_link);

formData.append('facebook_key',

$scope.book.facebook_key);

formData.append('facebook_secret',

$scope.book.facebook_secret);

formData.append('gplus_link',$scope.book.gplus_link);

formData.append('gplus_key', $scope.book.gplus_key);

formData.append('gplus_secret', $scope.book.gplus_secret);

formData.append('youtube_link', $scope.book.youtube_link);

formData.append('flickr_link', $scope.book.flickr_link);

formData.append('pinterest_link', 

$scope.book.pinterest_link);

$.ajax({

    type: "PUT",

    url:"http://build.myappbuilder.com/api/apps/settings/ 

            social.json",

    data: formData,

    cache: false,

    contentType: false,

    processData: false,

    success:function(response){

    },

    error:function(error){          

    }

  });

******* **MAB****Button****Creation** ***************

API For User to Create Buttons: **http://build.myappbuilder.com/api/buttons.json**

$scope.buttoncreate.title                 // Title of the Button

code:

cordova.exec(function(response){

           

},

function(response){              

 }, "ImageCompress", "imageCompress", ["57", "57", "image", image, "http://build.myappbuilder.com/api/buttons.json?", "post", {api_key:appKey,title:$scope.buttoncreate.title}])

API For User to Create Buttons(Image is not selected):

 **http://build.myappbuilder.com/api/buttons/via_url.json**

$scope.buttoncreate.title                 // Title of the Button

var letter = ($scope.buttoncreate.title).charAt(0).toUpperCase();

'http://nuatransmedia.com/iBookImages/'+letter+'.png'    

          // Incase image is not selected,will assign this  letter(first letter of the button title) image 

code :

var formData = new FormData();

formData.append('api_key',appKey);

formData.append('title',$scope.buttoncreate.title);

formData.append('image', 'http://nuatransmedia.com/iBookImages/'+letter+'.png');

$.ajax({

  type: "POST",

  url:"http://build.myappbuilder.com/api/buttons/via_url.json”,

  data: formData,

  cache: false,

  contentType: false,

  processData: false,

  success:function(response){

  },

  error:function(error){

  }

});

For Edit and Delete Buttons use PUT and DELETE method

************ **MAB Elements Creation** ***************

1.  1)**Picture and Text Creation**

API For User to Create Picture and Text Elements: [**http://build.myappbuilder.com/api/elements/**](http://build.myappbuilder.com/api/elements/)

**create_default.json**

buttonId                  //  id of the Button

$scope.para.title    //  title of the picture and text

$scope.textCreate.textpic     //Description of the picture and text 

code :

$.ajax({

   type: "POST",

   url:"http://build.myappbuilder.com/api/elements/create_default.json",

   data:{'api_key':appKey,'button_id':buttonId,'title':          $scope.para.title,'text':$scope.textCreate.textpic},

   success:function(response){

   },

   error:function(error){

   }

});

For Edit and Delete Elements use PUT and DELETE method

**Upload Custom Pictures ** 

API For User to Upload Custom Pictures: [**http://build.myappbuilder.com/api/elements/**](http://build.myappbuilder.com/api/elements/)

**images.json**

elementId                      //  id of the Element

code :

cordova.exec(function(response){        

},

 function(e){        

 }, "ImageCompress", "imageCompress", ["300", "280", "image", imagepic, "http://build.myappbuilder.com/api/elements/images.json?", "post", {api_key:appKey,id:elementId}])

       

**Upload Custom Values ** 

API For User to Upload Custom Values:

 [**http://build.myappbuilder.com/api/elements/**](http://build.myappbuilder.com/api/elements/)custom_values.json

elementId                      //  id of the Element

code :

$.ajax({

   type: "POST",

   url:"http://build.myappbuilder.com/api/elements/custom_values.json",

  data:{'api_key':appKey,'element_id':elementId,'title':$scope.editpic.customeditTitle,'value':$scope.editpic.customeditvalue},

   cache: false,

   contentType: false,

   processData: false,

   success:function(response){

   },

   error:function(error){

   }

});

**2)Video Creation**

API For User to Create Video Element: [**http://build.myappbuilder.com/api/elements/**](http://build.myappbuilder.com/api/elements/)

**create_video.json**

Thumbnail is the name of the video plugin

code :

 cordova.exec(function(response){

   }, 

 function(e){}, "Thumbnail", "thumbnail",[appKey,buttonId,$scope.videocreate.title,$scope.videocreate.desc,imagevideo,"post"])

}

For Edit and Delete Video use PUT and DELETE method

If Video thumbnail is not chosen,will upload default thumbnail

Some Videos cannot be played.Mainly it supports mp4.

**3)Audio Creation**

API For User to Create Audio Element: [**http://build.myappbuilder.com/api/elements/**](http://build.myappbuilder.com/api/elements/)

**create_audio.json**

code :

 $http.post('http://build.myappbuilder.com/api/elements/create_audio.json', formData, {

                        transformRequest: angular.identity,

                        headers: {'Content-Type': undefined}

 })

 .success(function(data,status, headers, config){

  })

 .error(function(data,status, headers, config){

 }); 

For Edit and Delete Audio use PUT and DELETE method

If audio thumbnail is not chosen,will upload default thumbnail

**4)Rss Feed Creation**

API For User to Create Rss feed Element: [**http://build.myappbuilder.com/api/elements/**](http://build.myappbuilder.com/api/elements/)

**create_rss.json**

code :

 $.ajax({

   type: "POST",

   url:"http://build.myappbuilder.com/api/elements/   create_rss.json",

   data:{'api_key':appKey,'button_id':buttonId,'title':     $scope.createrss.rssname,'url':     $scope.createrss.rssurl,'description':       $scope.createrss.rssdesc},

   success:function(response){

   },

   error:function(error){

   }

});

For Edit and Delete RSS Feed use PUT and DELETE method

**5)Live Web Page Creation**

API For User to Create Live Web Page Element: [**http://build.myappbuilder.com/api/elements/**](http://build.myappbuilder.com/api/elements/)

**create_web_page.json**

code :

 $.ajax({

   type: "POST",

   url:"http://build.myappbuilder.com/api/elements/   create_web_page.json",

   data:{'api_key':appKey,'button_id':buttonId,'title':       $scope.createweb.livewebname,'url':        $scope.createweb.liveweburl,'description':      $scope.createweb.livewebdesc},

   success:function(response){

   },

   error:function(error){

   }

});

For Edit and Delete Live Web Page use PUT and DELETE method

**6)Contact Form Page Creation**

API For User to Create Contact Form Page Element: [**http://build.myappbuilder.com/api/elements/**](http://build.myappbuilder.com/api/elements/)

**create_contact_form.json**

code :

 $.ajax({

   type: "POST",

   url:"http://build.myappbuilder.com/api/elements/   create_contact_form.json",

   data:{'api_key':appKey,'button_id':buttonId,'email':       $scope.form.email},

   success:function(response){

   },

   error:function(error){

   }

});

For Edit and Delete Contact Form Page use PUT and DELETE method

**7)Map and Location Creation**

API For User to Create Map and Location Element: [**http://build.myappbuilder.com/api/elements/**](http://build.myappbuilder.com/api/elements/)

**create_map.json**

code :

 $.ajax({

   type: "POST",

   url:"http://build.myappbuilder.com/api/elements/   create_map.json",

   data:{'api_key':appKey,'button_id':buttonId,'text':      $scope.createmapaddr.maptitle},

   success:function(response){

   },

   error:function(error){

   }

});

For Edit and Delete Map use PUT and DELETE method

**8)Task List Creation**

API For User to Create Task List Element: [**http://build.myappbuilder.com/api/elements/**](http://build.myappbuilder.com/api/elements/)tasks.json

code :

 $.ajax({

   type: "POST",

   url:"http://build.myappbuilder.com/api/elements/tasks.json",

   data:{'api_key':appKey,'id':taskelement,'title':     $scope.createedittask.taskTitle,'description':     $scope.createedittask.taskDescription},

   success:function(response){

   },

   error:function(error){

   }

});

For Edit and Delete Tasks use PUT and DELETE method

**subscribers:**

API Used: **http://build.myappbuilder.com/api/subscribers.json**

Code:

var formData = new FormData();

formData.append('api_key',appKey);

formData.append('subscriber[firstname]',$scope.data2.firstname);

formData.append('subscriber[lastname]',$scope.data2.lastname);

formData.append('subscriber[username]',$scope.data2.username);

formData.append('subscriber[email]',$scope.data2.email);

formData.append('subscriber[phone]',$scope.data2.phone);

formData.append('subscriber[password]',$scope.data2.password);

formData.append('subscriber[password_confirmation]',      $scope.data2.confirmpassword);

 $.ajax({

   type: "POST",

   url: "http://build.myappbuilder.com/api/subscribers.json",

   data: formData,

   cache: false,

   contentType: false,

   processData: false,

   success:function(response){

cordova.exec(function(response){

  },

   function(e){

}, "ImageCompress", "imageCompress", ["90", "90", "avatar", avatarimg, "http://build.myappbuilder.com/api/subscribers.json?", "put", {api_key:appKey,id:subid,firstname:$scope.data2.firstname,lastname:$scope.data2.lastname,email:$scope.data2.email,phone:$scope.data2.phone,username:$scope.data2.username,password:$scope.data2.password,password_confirm:$scope.data2.confirmpassword}])

                                             

   },

   error:function(error){

   }

});

******* **MAB share file** ***************

i)  FaceBook 

ii) Twitter 

iii) Email Plugin

#### **_FrameWork_** ###########

1) IonicFramework

2) Phonegap

3) Cordova

For Reference visit - “**http://build.myappbuilder.com/api**”