 var control = angular.module('myappbuilder',['ionic','starter.controllers','ui.tinymce','ngCordova']);
  
    
 /* -----------------------------------------------------Login Page---------------------------------------------*/
control.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
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

 $stateProvider.state('appWall', {
      url: '/appWall',
      templateUrl: 'templates/appWall.html',
      controller: 'appWallCtrl'
  });
  
 $stateProvider.state('elementAppWall', {
      url: '/elementAppWall',
      templateUrl: 'templates/elementAppWall.html',
      controller: 'elementAppWallCtrl'
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
  $stateProvider.state('sublist', {
      url: '/sublist',
      templateUrl: 'templates/sublist.html',
      controller: 'sublistCtrl'
   });
  $stateProvider.state('home', {
				url: '/home',
				controller: 'homeCtrl', 
				templateUrl: 'templates/home.html'
			})
			$stateProvider.state('entries', {
				url: '/entries', 
				controller: 'entriesCtrl',
				templateUrl: 'templates/entries.html',
			})
			$stateProvider.state('entry', {
				url: '/entry/:index',
				controller: 'entryCtrl',
				templateUrl: 'templates/entry.html',
			})
			$stateProvider.state('offline', {
				url: '/offline',
                controller: 'offlineCtrl',
				templateUrl: 'templates/offline.html'
			});
               $stateProvider.state('showmap', {
                                    url: '/showmap',
                                    templateUrl: 'templates/showmap.html',
                                    controller: 'showmapCtrl'
                                    });
               $stateProvider.state('viewdetails', {
                                    url: '/viewdetails',
                                    templateUrl: 'templates/viewdetails.html',
                                    controller: 'viewdetailsCtrl'
                                    
                                    });
               $stateProvider.state('buttonAppWall1', {
                                    url: '/buttonAppWall1',
                                    templateUrl: 'templates/buttonAppWall1.html',
                                    controller: 'buttonAppWall1Ctrl'
                                    });
               
               $stateProvider.state('appWall1', {
                                    url: '/appWall1',
                                    templateUrl: 'templates/appWall1.html',
                                    controller: 'appWall1Ctrl'
                                    });
               $stateProvider.state('elementAppWall1', {
                                    url: '/elementAppWall1',
                                    templateUrl: 'templates/elementAppWall1.html',
                                    controller: 'elementAppWall1Ctrl'
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
               $stateProvider.state('showmap1', {
									url: '/showmap1',
                                    templateUrl: 'templates/showmap1.html',
                                    controller: 'showmap1Ctrl'
                                    });
               
               $stateProvider.state('sublist1', {
                                    url: '/sublist1',
                                    templateUrl: 'templates/sublist1.html',
                                    controller: 'sublist1Ctrl'
                                    });
               
               $stateProvider.state('home1', {
                                    url: '/home1',
                                    controller: 'home1Ctrl',
                                    templateUrl: 'templates/home1.html'
                                    })
               
               $stateProvider.state('entries1', {
                                    url: '/entries1',
                                    controller: 'entries1Ctrl',
                                    templateUrl: 'templates/entries1.html',
                                    })
               
               $stateProvider.state('entry1', {
                                    url: '/entry1/:index',
                                    controller: 'entry1Ctrl',
                                    templateUrl: 'templates/entry1.html',
                                    })
               $stateProvider.state('app1', {
                                    url: '/app1',
                                    templateUrl: 'templates/app1.html',
                                    controller: 'app1Ctrl'
                                    });
               $stateProvider.state('chapterlist1', {
                                    url: '/chapterlist1',
                                    templateUrl: 'templates/chapterlist1.html',
                                    controller: 'chapterlist1Ctrl'
                                    });
               $stateProvider.state('newapp11', {
                                    url: '/newapp11',
                                    templateUrl: 'templates/newapp11.html',
                                    controller: 'newapp11Ctrl'
                                    });
               $stateProvider.state('app2', {
                                    url: '/app2',
                                    templateUrl: 'templates/app2.html',
                                    controller: 'app2Ctrl'
                                    });
               $stateProvider.state('chapterlist2', {
                                    url: '/chapterlist2',
                                    templateUrl: 'templates/chapterlist2.html',
                                    controller: 'chapterlist2Ctrl'
                                    });
               $stateProvider.state('previewpic2', {
                                    url: '/previewpic2',
                                    templateUrl: 'templates/previewpic2.html',
                                    controller: 'previewpic2Ctrl'
                                    });
               $stateProvider.state('previewaudio2', {
                                    url: '/previewaudio2',
                                    templateUrl: 'templates/previewaudio2.html',
                                    controller: 'previewaudio2Ctrl'
                                    });
               $stateProvider.state('previewvideo2', {
                                    url: '/previewvideo2',
                                    templateUrl: 'templates/previewvideo2.html',
                                    controller: 'previewvideo2Ctrl'
                                    });
               $stateProvider.state('showmap2', {
                                    url: '/showmap2',
                                    templateUrl: 'templates/showmap2.html',
                                    controller: 'showmap2Ctrl'
                                    });
               $stateProvider.state('previewtask2', {
                                    url: '/previewtask2',
                                    templateUrl: 'templates/previewtask2.html',
                                    controller: 'previewtask2Ctrl'
                                    });
               $stateProvider.state('home2', {
                                    url: '/home2',
                                    controller: 'home2Ctrl',
                                    templateUrl: 'templates/home2.html'
                                    })
               
               $stateProvider.state('entries2', {
                                    url: '/entries2',
                                    controller: 'entries2Ctrl',
                                    templateUrl: 'templates/entries2.html',
                                    })
               
               $stateProvider.state('entry2', {
                                    url: '/entry2/:index',
                                    controller: 'entry2Ctrl',
                                    templateUrl: 'templates/entry2.html',
                                    })
               $stateProvider.state('previewform2', {
                                    url: '/previewform2',
                                    templateUrl: 'templates/previewform2.html',
                                    controller: 'previewform2Ctrl'
                                    });
               $stateProvider.state('formdisplay2', {
                                    url: '/formdisplay2',
                                    templateUrl: 'templates/formdisplay2.html',
                                    controller: 'formdisplay2Ctrl'
                                    });
               $stateProvider.state('taskdisplay2', {
                                    url: '/taskdisplay2',
                                    templateUrl: 'templates/taskdisplay2.html',
                                    controller: 'taskdisplay2Ctrl'
                                    });
               $stateProvider.state('webdisplay2', {
                                    url: '/webdisplay2',
                                    templateUrl: 'templates/webdisplay2.html',
                                    controller: 'webdisplay2Ctrl'
                                    });
               $stateProvider.state('rssdisplay2', {
                                    url: '/rssdisplay2',
                                    templateUrl: 'templates/rssdisplay2.html',
                                    controller: 'rssdisplay2Ctrl'
                                    });
               $stateProvider.state('audiodisplay2', {
                                    url: '/audiodisplay2',
                                    templateUrl: 'templates/audiodisplay2.html',
                                    controller: 'audiodisplay2Ctrl'
                                    });
               $stateProvider.state('picdisplay2', {
                                    url: '/picdisplay2',
                                    templateUrl: 'templates/picdisplay2.html',
                                    controller: 'picdisplay2Ctrl'
                                    });  
               $stateProvider.state('mapdisplay2', {
                                    url: '/mapdisplay2',
                                    templateUrl: 'templates/mapdisplay2.html',
                                    controller: 'mapdisplay2Ctrl'
                                    }); 
               $stateProvider.state('videodisplay2', {
                                    url: '/videodisplay2',
                                    templateUrl: 'templates/videodisplay2.html',
                                    controller: 'videodisplay2Ctrl'
                                    });
               $stateProvider.state('buttonAppWall2', {
                                    url: '/buttonAppWall2',
                                    templateUrl: 'templates/buttonAppWall2.html',
                                    controller: 'buttonAppWall2Ctrl'
                                    });
               
               $stateProvider.state('appWall2', {
                                    url: '/appWall2',
                                    templateUrl: 'templates/appWall2.html',
                                    controller: 'appWall2Ctrl'
                                    });
               $stateProvider.state('elementAppWall2', {
                                    url: '/elementAppWall2',
                                    templateUrl: 'templates/elementAppWall2.html',
                                    controller: 'elementAppWall2Ctrl'
                                    });        
               $stateProvider.state('sublist2', {
                                    url: '/sublist2',
                                    templateUrl: 'templates/sublist2.html',
                                    controller: 'sublist2Ctrl'
                                    });
               $stateProvider.state('viewdetails2', {
                                    url: '/viewdetails2',
                                    templateUrl: 'templates/viewdetails2.html',
                                    controller: 'viewdetails2Ctrl'
                                    
                                    });
               $stateProvider.state('editnewapp1', {
                                    url: '/editnewapp1',
                                    templateUrl: 'templates/editnewapp1.html',
                                    controller: 'editnewapp1Ctrl'
                                    });
      $urlRouterProvider.otherwise('/login');

});


window.addEventListener('native.keyboardshow', keyboardShowHandler);

function keyboardShowHandler(e){
     cordova.plugins.Keyboard.disableScroll(false);
    // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    //  cordova.plugins.Keyboard.show();
     console.log('Keyboard height is: ' + e.keyboardHeight);
}

