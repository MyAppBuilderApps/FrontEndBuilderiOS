//
//  ThumbnailVideoPlay.m
//  FrontEndBuilder
//
//  Created by Nua i7 on 12/25/14.
//
//

#import "ThumbnailVideoPlay.h"
#import <AVFoundation/AVFoundation.h>
#import <Cordova/CDV.h>
@interface ThumbnailVideoPlay ()

@end

@implementation ThumbnailVideoPlay

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    [[UIApplication sharedApplication] setStatusBarOrientation:UIInterfaceOrientationPortrait];
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,
                                                         NSUserDomainMask, YES);
    NSString *documentsDirectory = [paths objectAtIndex:0];
    NSFileManager *fileManager = [NSFileManager defaultManager];
    NSString *extension = @"png";
    NSArray *contents = [fileManager contentsOfDirectoryAtPath:documentsDirectory error:NULL];
    NSEnumerator *e = [contents objectEnumerator];
    NSString *filename;
    while ((filename = [e nextObject]))
    {
        if ([[filename pathExtension] isEqualToString:extension])
        {
            [fileManager removeItemAtPath:[documentsDirectory stringByAppendingPathComponent:filename] error:NULL];
        }
    }
    
    
   matches= [[NSMutableArray alloc]init];
   matches2 = [[NSMutableArray alloc]init];
	// Do any additional setup after loading the view.
    NSLog(@"%@",_namePng);
    NSURL *theURL = [NSURL URLWithString:_namePng];
    NSLog(@"%@",theURL);
    mp =  [[MPMoviePlayerController alloc] initWithContentURL:theURL];
    mp.controlStyle = MPMovieControlStyleDefault;
    
    if(UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPhone)
    {
    [[mp view] setFrame:CGRectMake(0,190, 320,200)];
        
    }
    else
    {
        [[mp view] setFrame:CGRectMake(150,250, 500,500)];
    }
    //mp.view.transform = CGAffineTransformMakeRotation(M_PI/2);
    [_play_view addSubview:mp.view];
    [mp play];
    [mp setFullscreen:YES animated:YES];

   [self.navigationController setNavigationBarHidden:YES animated:nil];

    
    

}
- (void) viewWillAppear:(BOOL)animated
{
	[super viewWillAppear:animated];
    
	//	We're going onto the screen, disable auto rotations
	canRotateToAllOrientations = NO;
}

- (void) viewDidAppear:(BOOL)animated
{
	[super viewDidAppear:animated];
    
	//	We're now on the screen, reenable auto rotations
	canRotateToAllOrientations = YES;
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
- (IBAction)btn_back:(id)sender {
     [mp stop];
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *documentsDirectory = [paths objectAtIndex:0];
    NSFileManager *fManager = [NSFileManager defaultManager];
     NSString *item;
    NSArray *contents = [fManager contentsOfDirectoryAtPath:[NSHomeDirectory() stringByAppendingPathComponent:@"Documents"] error:nil];
    
    // >>> this section here adds all files with the chosen extension to an array
    for (item in contents){
       
        if ([[item pathExtension] isEqualToString:@"png"]) {
            [matches2 addObject:item];
            
        }
    }
    
    NSLog(@"Count----------------+++++------Out>%@",[matches2 lastObject]);

    NSString *savedImagePath = [documentsDirectory stringByAppendingPathComponent:[NSString stringWithFormat:@"%@",[matches2 lastObject]]];
    
    NSLog(@"SaveImagePathValue--------LL:%@",savedImagePath);
    [[NSNotificationCenter defaultCenter] postNotificationName:@"SecondViewControllerDismissed"
                                                        object:savedImagePath
                                                      userInfo:nil];
    [self dismissViewControllerAnimated:YES completion:nil];
    
   [self.navigationController dismissViewControllerAnimated:YES completion:nil];
}

- (IBAction)btn_videoCapture:(id)sender
{
    
    UIImage *thumbnail = [mp thumbnailImageAtTime:mp.currentPlaybackTime
                                       timeOption:MPMovieTimeOptionNearestKeyFrame];
    
    UIImage *image = [UIImage imageWithCGImage:thumbnail.CGImage scale:1.0 orientation:UIImageOrientationUp];
    UIImage *tempImage = nil;
    CGSize targetSize = CGSizeMake(600, 200);
    UIGraphicsBeginImageContext(targetSize);
    
    CGRect thumbnailRect = CGRectMake(0, 0, 0, 0);
    thumbnailRect.origin = CGPointMake(0.0,0.0);
    thumbnailRect.size.width = targetSize.width;
    thumbnailRect.size.height = targetSize.height;
    
    [image drawInRect:thumbnailRect];
    
    tempImage = UIGraphicsGetImageFromCurrentImageContext();
    
    UIGraphicsEndImageContext();
    
    
    
    NSFileManager *fManager = [NSFileManager defaultManager];
    NSString *item;
    NSArray *contents = [fManager contentsOfDirectoryAtPath:[NSHomeDirectory() stringByAppendingPathComponent:@"Documents"] error:nil];
    
    // >>> this section here adds all files with the chosen extension to an array
    for (item in contents){
        NSLog(@"Count----------------+++++-----==->%@",[item pathExtension]);
        if ([[item pathExtension] isEqualToString:@"png"]) {
            [matches addObject:item];
            
            NSLog(@"Count----------------+++++------>%d",[matches count]);
        }
    }
    
    NSLog(@"Count----------------+++++------Out>%d",[matches count]);
    
    
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:@"HH_mm_ss"];
    NSLog(@"%@",[dateFormatter stringFromDate:[NSDate date]]);
    NSString *dataPath = [[contents objectAtIndex:0] stringByAppendingPathComponent:@"newFolder"];
    NSString *filePath = [dataPath stringByAppendingPathComponent:[NSString stringWithFormat:@"%@%d%@.png",@"ScreenShot",[matches count],[dateFormatter stringFromDate:[NSDate date]]]];

    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *documentsDirectory = [paths objectAtIndex:0];
    
    NSString *savedImagePathsother = [documentsDirectory stringByAppendingPathComponent:@"ScreenSho.png"];
    //UIImage *image = _imgView_Frame.image; // imageView is my image from camera
    NSData *imageDatasPaths = UIImagePNGRepresentation(thumbnail);
    [imageDatasPaths writeToFile:savedImagePathsother atomically:YES];
    NSString *savedImagePath = [documentsDirectory stringByAppendingPathComponent:@"ScreenShot.png"];
    //UIImage *image = _imgView_Frame.image; // imageView is my image from camera
   // NSData *imageData = UIImagePNGRepresentation(thumbnail);
    NSData *imageData = UIImagePNGRepresentation(tempImage);
   BOOL _isSaved =  [imageData writeToFile:savedImagePath atomically:YES];
             [imageData writeToFile:filePath atomically:YES];
    
    
    NSString *savedImagePaths = [documentsDirectory stringByAppendingPathComponent:[NSString stringWithFormat:@"%@%d%@.png",@"ScreenShot",[matches count],[dateFormatter stringFromDate:[NSDate date]]]];
    //UIImage *image = _imgView_Frame.image; // imageView is my image from camera
    NSData *imageDatas = UIImagePNGRepresentation(thumbnail);
    [imageDatas writeToFile:savedImagePaths atomically:YES];
    
    
   
    
   //

    if(_isSaved == YES)
    {
        NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
        NSString *documentsDirectory = [paths objectAtIndex:0];
        NSString *appFile = [documentsDirectory stringByAppendingPathComponent:@"ScreenSho.png"];
        NSData *myData = [[NSData alloc] initWithContentsOfFile:appFile];
        UIImage *images = [[UIImage alloc]initWithData:myData];
        CGFloat widths = images.size.width;
        
        NSLog(@"Image PL Width:%@",[matches lastObject]);
        
        NSLog(@"Saved Succesfully p=1080 l=1920 720, 1280");
        
        

        if(widths == 720||widths==1080)
        {
            _imgView_Frame.frame = CGRectMake(109, 65, 106, 118);
            _imgView_Frame.image = [UIImage imageWithData:myData];
            
            NSLog(@"Prota");
        }
        else if(widths==1280||widths==1920)
        {
            _imgView_Frame.frame = CGRectMake(50, 65, 220, 118);
            _imgView_Frame.image = [UIImage imageWithData:myData];
            
            NSLog(@"LandSpace");

        }
        else
        {
            _imgView_Frame.image = [UIImage imageWithData:myData];
            
            NSLog(@"AnyThing Happens");
        }
        
        if(UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad)
        {
            if(widths == 720||widths==1080)
            {
                _imgView_Frame.frame = CGRectMake(109, 65, 106, 118);
                _imgView_Frame.image = [UIImage imageWithData:myData];
                
                NSLog(@"Prota");
            }
            else if(widths==1280||widths==1920)
            {
                _imgView_Frame.frame = CGRectMake(273, 65, 220, 118);
                _imgView_Frame.image = [UIImage imageWithData:myData];
                
                NSLog(@"LandSpace");
                
            }

        }
        
        
        //[self btn_retriveds];
        
        
       
        
        
}
else{
    
    NSLog(@"Error occured");
}
    

}
- (void)btn_retriveds
{
    NSURL *theURLVideo = [NSURL URLWithString:_namePng];
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *documentsDirectory = [paths objectAtIndex:0];
    NSString *VideoPath = [documentsDirectory stringByAppendingPathComponent:@"/one2.mov"];
    NSData *VideoData = [NSData dataWithContentsOfURL:theURLVideo];
   BOOL _isSaved = [VideoData writeToFile:VideoPath atomically:YES];
    
    if(_isSaved == YES)
    {
         NSLog(@"Saved Succesfully Videos");
    }
    else
    {
        NSLog(@"Error occured");
    }
    

}


- (BOOL)shouldAutorotate
{
	//	(iOS 6)
	//	No auto rotating
	return NO;
}


@end
