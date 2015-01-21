 var control = angular.module('myappbuilder',['ionic', 'starter.controllers','ui.tinymce']);
  
    
 /* -----------------------------------------------------Login Page---------------------------------------------*/
control.config(function($stateProvider, $urlRouterProvider) {
	
	$stateProvider.state('side', {
      url: '/side',
      templateUrl: 'templates/side.html',
      controller: 'sideCtrl'
  });

  $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
  });   
  $stateProvider.state('login1', {
      url: '/login1',
      templateUrl: 'templates/login1.html',
      controller: 'login1Ctrl'
  });    
  
  $stateProvider.state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'registerCtrl'
  });  
                                                                                   
  $stateProvider.state('sample', {
      url: '/sample',
      templateUrl: 'templates/sample.html',
      controller: 'sampleCtrl'
  });
  
   $stateProvider.state('newapp', {
      url: '/newapp',
      templateUrl: 'templates/newapp.html',
      controller: 'newappCtrl'
  });
     $stateProvider.state('navicon', {
      url: '/navicon',
      templateUrl: 'templates/navicon.html',
      controller: 'naviconCtrl'
  });
       $stateProvider.state('newbutton', {
      url: '/newbutton',
      templateUrl: 'templates/newbutton.html',
      controller: 'newbuttonCtrl'
  });
   $stateProvider.state('app', {
      url: '/app',
      templateUrl: 'templates/app.html',
      controller: 'appCtrl'
  });
  $stateProvider.state('app1', {
      url: '/app1',
      templateUrl: 'templates/app1.html',
      controller: 'app1Ctrl'
   });
               
     $stateProvider.state('elements', {
      url: '/elements',
      templateUrl: 'templates/elements.html',
      controller: 'elementsCtrl'
  });
       $stateProvider.state('pic', {
      url: '/pic',
      templateUrl: 'templates/pic.html',
      controller: 'picCtrl'
  });
   $stateProvider.state('chapterlist', {
      url: '/chapterlist',
      templateUrl: 'templates/chapterlist.html',
      controller: 'chapterlistCtrl'
  });
   $stateProvider.state('chapterlist1', {
      url: '/chapterlist1',
      templateUrl: 'templates/chapterlist1.html',
       controller: 'chapterlist1Ctrl'
   });
               
   $stateProvider.state('newapp1', {
      url: '/newapp1',
      templateUrl: 'templates/newapp1.html',
      controller: 'newapp1Ctrl'
  });  
   $stateProvider.state('social', {
      url: '/social',
      templateUrl: 'templates/social.html',
      controller: 'socialCtrl'
  });    
   $stateProvider.state('picedit', {
      url: '/picedit',
      templateUrl: 'templates/picedit.html',
      controller: 'piceditCtrl'
  }); 
   $stateProvider.state('form', {
      url: '/form',
      templateUrl: 'templates/form.html',
      controller: 'formCtrl'
  });  
     $stateProvider.state('formedit', {
      url: '/formedit',
      templateUrl: 'templates/formedit.html',
      controller: 'formeditCtrl'
  });  
       $stateProvider.state('video', {
      url: '/video',
      templateUrl: 'templates/video.html',
      controller: 'videoCtrl'
  });  
      $stateProvider.state('audio', {
      url: '/audio',
      templateUrl: 'templates/audio.html',
      controller: 'audioCtrl'
  });  
     $stateProvider.state('audioedit', {
      url: '/audioedit',
      templateUrl: 'templates/audioedit.html',
      controller: 'audioeditCtrl'
  });
     $stateProvider.state('map', {
      url: '/map',
      templateUrl: 'templates/map.html',
      controller: 'mapCtrl'
  });  
      $stateProvider.state('mapedit', {
      url: '/mapedit',
      templateUrl: 'templates/mapedit.html',
      controller: 'mapeditCtrl'
  });   
        $stateProvider.state('web', {
      url: '/web',
      templateUrl: 'templates/web.html',
      controller: 'webCtrl'
  });
         $stateProvider.state('webedit', {
      url: '/webedit',
      templateUrl: 'templates/webedit.html',
      controller: 'webeditCtrl'
  });
        $stateProvider.state('rss', {
      url: '/rss',
      templateUrl: 'templates/rss.html',
      controller: 'rssCtrl'
  });
        $stateProvider.state('rssedit', {
      url: '/rssedit',
      templateUrl: 'templates/rssedit.html',
      controller: 'rsseditCtrl'
  });
       $stateProvider.state('task', {
      url: '/task',
      templateUrl: 'templates/task.html',
      controller: 'taskCtrl'
  });
     $stateProvider.state('taskedit', {
      url: '/taskedit',
      templateUrl: 'templates/taskedit.html',
      controller: 'taskeditCtrl'
  });
    $stateProvider.state('editApp', {
      url: '/editApp',
      templateUrl: 'templates/editApp.html',
      controller: 'editAppCtrl'
  });
  $stateProvider.state('editsocial', {
      url: '/editsocial',
      templateUrl: 'templates/editsocial.html',
      controller: 'editsocialCtrl'
  });
   $stateProvider.state('buttonlist', {
      url: '/buttonlist',
      templateUrl: 'templates/buttonlist.html',
      controller: 'buttonlistCtrl'
  });
   $stateProvider.state('mapdisplay', {
      url: '/mapdisplay',
      templateUrl: 'templates/mapdisplay.html',
      controller: 'mapdisplayCtrl'
  });
   $stateProvider.state('formdisplay', {
      url: '/formdisplay',
      templateUrl: 'templates/formdisplay.html',
      controller: 'formdisplayCtrl'
  });
     $stateProvider.state('taskdisplay', {
      url: '/taskdisplay',
      templateUrl: 'templates/taskdisplay.html',
      controller: 'taskdisplayCtrl'
  });
       $stateProvider.state('webdisplay', {
      url: '/webdisplay',
      templateUrl: 'templates/webdisplay.html',
      controller: 'webdisplayCtrl'
  });
   $stateProvider.state('rssdisplay', {
      url: '/rssdisplay',
      templateUrl: 'templates/rssdisplay.html',
      controller: 'rssdisplayCtrl'
  });
  $stateProvider.state('audiodisplay', {
      url: '/audiodisplay',
      templateUrl: 'templates/audiodisplay.html',
      controller: 'audiodisplayCtrl'
  });
    $stateProvider.state('picdisplay', {
      url: '/picdisplay',
      templateUrl: 'templates/picdisplay.html',
      controller: 'picdisplayCtrl'
  });
   $stateProvider.state('buttonAppWall', {
      url: '/buttonAppWall',
      templateUrl: 'templates/buttonAppWall.html',
      controller: 'buttonAppWallCtrl'
  });
               $stateProvider.state('buttonAppWall1', {
                                    url: '/buttonAppWall1',
                                    templateUrl: 'templates/buttonAppWall1.html',
                                    controller: 'buttonAppWall1Ctrl'
                                    });

 $stateProvider.state('appWall', {
      url: '/appWall',
      templateUrl: 'templates/appWall.html',
      controller: 'appWallCtrl'
  });
  $stateProvider.state('appWall1', {
       url: '/appWall1',
       templateUrl: 'templates/appWall1.html',
        controller: 'appWall1Ctrl'
       });
  
 $stateProvider.state('elementAppWall', {
      url: '/elementAppWall',
      templateUrl: 'templates/elementAppWall.html',
      controller: 'elementAppWallCtrl'
  });
               $stateProvider.state('elementAppWall1', {
                                    url: '/elementAppWall1',
                                    templateUrl: 'templates/elementAppWall1.html',
                                    controller: 'elementAppWall1Ctrl'
                                    });
               
    $stateProvider.state('videoedit', {
      url: '/videoedit',
      templateUrl: 'templates/videoedit.html',
      controller: 'videoeditCtrl'
  });
     $stateProvider.state('videodisplay', {
      url: '/videodisplay',
      templateUrl: 'templates/videodisplay.html',
      controller: 'videodisplayCtrl'
  });
     $stateProvider.state('previewpic', {
      url: '/previewpic',
      templateUrl: 'templates/previewpic.html',
      controller: 'previewpicCtrl'
  });
   $stateProvider.state('previewweb', {
      url: '/previewweb',
      templateUrl: 'templates/previewweb.html',
      controller: 'previewwebCtrl'
  });
   $stateProvider.state('previewtask', {
      url: '/previewtask',
      templateUrl: 'templates/previewtask.html',
      controller: 'previewtaskCtrl'
  });
  $stateProvider.state('previewrss', {
      url: '/previewrss',
      templateUrl: 'templates/previewrss.html',
      controller: 'previewrssCtrl'
  });
  $stateProvider.state('previewmap', {
      url: '/previewmap',
      templateUrl: 'templates/previewmap.html',
      controller: 'previewmapCtrl'
  });
  $stateProvider.state('previewform', {
      url: '/previewform',
      templateUrl: 'templates/previewform.html',
      controller: 'previewformCtrl'
  });
  $stateProvider.state('previewaudio', {
      url: '/previewaudio',
      templateUrl: 'templates/previewaudio.html',
      controller: 'previewaudioCtrl'
  });
  $stateProvider.state('previewvideo', {
      url: '/previewvideo',
      templateUrl: 'templates/previewvideo.html',
      controller: 'previewvideoCtrl'
  });
  $stateProvider.state('editContent', {
      url: '/editContent',
      templateUrl: 'templates/editContent.html',
       controller: 'editContentCtrl'
   });
  $stateProvider.state('sample1', {
      url: '/sample1',
      templateUrl: 'templates/sample1.html',
       controller: 'sample1Ctrl'
   });
               $stateProvider.state('previewpic1', {
                                    url: '/previewpic1',
                                    templateUrl: 'templates/previewpic1.html',
                                    controller: 'previewpic1Ctrl'
                                    });
               $stateProvider.state('previewweb1', {
                                    url: '/previewweb1',
                                    templateUrl: 'templates/previewweb1.html',
                                    controller: 'previewweb1Ctrl'
                                    });
               $stateProvider.state('previewtask1', {
                                    url: '/previewtask1',
                                    templateUrl: 'templates/previewtask1.html',
                                    controller: 'previewtask1Ctrl'
                                    });
               $stateProvider.state('previewrss1', {
                                    url: '/previewrss1',
                                    templateUrl: 'templates/previewrss1.html',
                                    controller: 'previewrss1Ctrl'
                                    });
               $stateProvider.state('previewmap1', {
                                    url: '/previewmap1',
                                    templateUrl: 'templates/previewmap1.html',
                                    controller: 'previewmap1Ctrl'
                                    });
               $stateProvider.state('previewform1', {
                                    url: '/previewform1',
                                    templateUrl: 'templates/previewform1.html',
                                    controller: 'previewform1Ctrl'
                                    });
               $stateProvider.state('previewaudio1', {
                                    url: '/previewaudio1',
                                    templateUrl: 'templates/previewaudio1.html',
                                    controller: 'previewaudio1Ctrl'
                                    });
               $stateProvider.state('previewvideo1', {
                                    url: '/previewvideo1',
                                    templateUrl: 'templates/previewvideo1.html',
                                    controller: 'previewvideo1Ctrl'
                                    });
            
    $urlRouterProvider.otherwise('/editContent');

});


window.addEventListener('native.keyboardshow', keyboardShowHandler);

function keyboardShowHandler(e){
     cordova.plugins.Keyboard.disableScroll(false);
    // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    //  cordova.plugins.Keyboard.show();
     console.log('Keyboard height is: ' + e.keyboardHeight);
}

