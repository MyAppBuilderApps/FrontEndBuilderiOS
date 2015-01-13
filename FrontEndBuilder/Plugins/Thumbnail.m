//
//  Echo.m
//  videoApp
//
//  Created by Nua Trans Media on 7/23/14.
//
//

#import "Thumbnail.h"
#import <Cordova/CDV.h>
#import "AssetsLibrary/ALAssetsLibrary.h"
#import "AssetsLibrary/ALAssetsFilter.h"
#import "AssetsLibrary/ALAssetsGroup.h"
#import "AssetsLibrary/ALAsset.h"
#import "AssetsLibrary/ALAssetRepresentation.h"
#import <Cordova/NSArray+Comparisons.h>
#import <Cordova/NSData+Base64.h>
#import <Cordova/NSDictionary+Extensions.h>
#import <Cordova/CDV.h>
#import <AVFoundation/AVFoundation.h>

#define desired_bitrate 5
#define desired_keyframe_interval 5
#define video_width 300
#define video_height 200
@interface Thumbnail ()

@property (nonatomic, strong) ALAssetsLibrary *assetsLibrary;
@property (nonatomic, strong) NSMutableArray *groups;
@property (nonatomic, strong) NSMutableArray *assets;
@property int assetsCount;

@end
@implementation Thumbnail
- (void)thumbnail:(CDVInvokedUrlCommand*)command
{
    
    CollectFileValue = [[NSMutableArray alloc]init];
    CollectFileValueFiles = [[NSMutableArray alloc]init];
    api_Key=[command.arguments objectAtIndex:0];
    echo=[command.arguments objectAtIndex:3];
    echo1 =[command.arguments objectAtIndex:1];
    title=[command.arguments objectAtIndex:2];
    button_Id=[command.arguments objectAtIndex:1];
    thumbnailUrl=[command.arguments objectAtIndex:4];
    methodName = [command.arguments objectAtIndex:5];
    
    //thumbnailUrl = @"Nothumbnail";
    
    
    NSLog(@"Echo Values Des:%@",echo);
    NSLog(@"Echo Values Viedo:%@",echo1);
    NSLog(@"Echo Values Titles:%@",title);
    NSLog(@"Echo Values apikey:%@",api_Key);
    NSLog(@"Echo Values buttonId:%@",button_Id);
    NSLog(@"Echo Values thumb:%@",thumbnailUrl);
    NSLog(@"Echo Values Method:%@",methodName);

    
    
    NSMutableCharacterSet *characterSetDescription =
    [NSMutableCharacterSet characterSetWithCharactersInString:@"()\"\n" "<p></p>"];
    
   
    NSArray *arrayOfComponents_echo = [echo componentsSeparatedByCharactersInSet:characterSetDescription];
    // Create string from the array components
    FInal_Api_Values  =[arrayOfComponents_echo componentsJoinedByString:@""];
    
    
    cmds = command;
 /*   if (api_Key.length!=0)
    {
        NSString *filePath = [NSTemporaryDirectory() stringByAppendingPathComponent:@".MOV"];
        
        NSLog(@"filePathValues:%@",filePath);

     
       
        
        [self removeImage:@"one2.mp4"];
        keyValues = YES;
        NSString *folderNameUiweb;
        NSFileManager *filemanager=[NSFileManager defaultManager];
        NSError *errors;
        NSString *documentsDir= [NSHomeDirectory() stringByAppendingPathComponent:@"tmp"];
        if (![[NSFileManager defaultManager ]fileExistsAtPath:documentsDir])
        {
            [[NSFileManager defaultManager]createDirectoryAtPath:documentsDir withIntermediateDirectories:NO attributes:nil error:&errors];
        }
        NSString *fullPaths = [NSString stringWithFormat:@"%@",documentsDir];
        NSArray *contentFile = [filemanager contentsOfDirectoryAtPath:fullPaths error:&errors];
        for (int i=0 ;i<[contentFile count]; i++)
        {
            NSLog(@"Answer:%@",contentFile[i]);
            NSString *string = [NSString stringWithFormat:@"%@",contentFile[i]];
            if ([string rangeOfString:@"UIWebFileUpload"].location == NSNotFound)
            {
                NSLog(@"string does not contain bla");
            }
            else
            {
                [CollectFileValue addObject:contentFile[i]];
                folderNameUiweb = [NSString stringWithFormat:@"%@",contentFile[i]];
            }
        }
        for (int i=0; i<[CollectFileValue count]; i++)
        {
            
            NSLog(@"Image-----------------))))---->>>>:%@",[CollectFileValue objectAtIndex:i]);
            
        }
        //NSLog(@"Answert lastPath :%@",[contentFile lastObject]);
        //NSLog(@"Image Echo:%@",echo);
        
        
        
        
        
        NSArray *strs = [echo1 componentsSeparatedByString:@"fakepath"];
        //NSLog(@"ValueStrs :%@",strs[1]);
        NSString *stt = [NSString stringWithFormat:@"%@",strs[1]];
        NSArray *valueTrim;
        NSString* newString;
        NSString *moveNameAppends;
        NSString *moveName;
        NSString *StrSplitvalues;
        NSArray *strsSlash;
        NSString *documentsDirectoryr;
        NSString *strpathsValues;
        NSString *foldersName ;
        NSLog(@"Values Mov:%@",stt);
        
        
//        NSArray *data = [stt componentsSeparatedByString:@"\""];
//        NSLog(@"Data:%@",data[1]);
        
        
      
        
        NSString *checkingValue = @"\\capturedvideo.MOV";
          NSLog(@"Stt:%@",checkingValue);
        
       // [self pathMediaurlValues];
       if([stt isEqualToString:checkingValue])
        {
            
            
           moveNameAppends    = @"/capture/capturedvideo.MOV";
           documentsDirectoryr  = [NSHomeDirectory() stringByAppendingPathComponent:@"tmp"];
            strpathsValues  = [NSString stringWithFormat:@"%@%@",documentsDirectoryr,moveNameAppends];
            
            
           
           
        }
        else
       {
        
       
            valueTrim = [stt componentsSeparatedByString:@"trim"];
            newString  = [stt stringByReplacingOccurrencesOfString:@"\'" withString:@" "];
           
            moveNameAppends    = @"/trim";
            moveName  = [NSString stringWithFormat:@"%@%@",moveNameAppends,valueTrim[1]];
           
            StrSplitvalues  = [NSString stringWithFormat:@"%@",strs[1]];
            strsSlash  = [StrSplitvalues componentsSeparatedByString:@"\""];
           
            documentsDirectoryr  = [NSHomeDirectory() stringByAppendingPathComponent:@"tmp"];
            strpathsValues  = [NSString stringWithFormat:@"%@%@",documentsDirectoryr,moveName];
            foldersName   = [NSString stringWithFormat:@"/%@",[contentFile lastObject]];
        
        
        

       }
        NSLog(@"StrpAth:%@",moveUrl);
        
        // Handle movie capture
        
        
        moveUrl= [NSURL fileURLWithPath:strpathsValues];
    

            [self playMovie:moveUrl];
            [self performSelector:@selector(imageScreenShotVideos) withObject:nil afterDelay:2];
    }
    else
    {
        NSLog(@"THingLoad");
        
        NSString *folderNameUiweb;
        NSFileManager *filemanager=[NSFileManager defaultManager];
        NSError *errors;
        NSString *documentsDir= [NSHomeDirectory() stringByAppendingPathComponent:@"tmp"];
        if (![[NSFileManager defaultManager ]fileExistsAtPath:documentsDir])
        {
            [[NSFileManager defaultManager]createDirectoryAtPath:documentsDir withIntermediateDirectories:NO attributes:nil error:&errors];
        }
        //NSString *fullPaths = [NSString stringWithFormat:@"%@",documentsDir];
        NSString *fullPaths = [NSString stringWithFormat:@"%@",documentsDir];
        NSLog(@"Name Images:%@",fullPaths);
        NSArray *contentFile = [filemanager contentsOfDirectoryAtPath:fullPaths error:&errors];
        for (int i=0 ;i<[contentFile count]; i++)
        {
            NSLog(@"Answer:%@",contentFile[i]);
            //            NSLog(@"ValueStrs second values:%@",echo);
            NSString *string = [NSString stringWithFormat:@"%@",contentFile[i]];
           
                [CollectFileValue addObject:contentFile[i]];
                folderNameUiweb = [NSString stringWithFormat:@"%@",contentFile[i]];
    
        }
        for (int i=0; i<[CollectFileValue count]; i++)
        {
            NSLog(@"Image:%@",[CollectFileValue objectAtIndex:i]);
            [self removeTempFolder:[CollectFileValue objectAtIndex:i]];
        }

    }
    //[self myappbuilder:data];*/
     [self performSelector:@selector(imageScreenShotVideos) withObject:nil afterDelay:2];
}

-(void)fileUploadDataFromlocal:(NSURL *)fileUrls UrlStrings:(NSString *)strUrls videoFrame:(NSString *)frame_urls
{
  
   /* NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,
                                                         NSUserDomainMask, YES);
    NSString *documentsDirectory = [paths objectAtIndex:0];
    NSString* path = [documentsDirectory stringByAppendingPathComponent:@"one2.mp4"];
    NSLog(@"MoveName:%@",path);
    NSURL *uploadURL = [NSURL fileURLWithPath:path];
    AVURLAsset *asset = [AVURLAsset URLAssetWithURL:fileUrls options:nil];
    AVAssetExportSession *exportSession = [[AVAssetExportSession alloc] initWithAsset:asset presetName:AVAssetExportPresetLowQuality];
    exportSession.outputURL = uploadURL;
    exportSession.outputFileType = AVFileTypeMPEG4;
    [exportSession exportAsynchronouslyWithCompletionHandler: ^(void) {
        if (exportSession.status == AVAssetExportSessionStatusCompleted)
        {
            
            //NSLog(@"SuccessHandler");
            
            keyStatusVal = YES;
            
            [self successFullyUploadVla:YES UrlStrings:strUrls videoFrame:frame_urls];
            
        }
        else
        {
            //NSError *error = [NSError errorWithDomain:domain code:code userInfo:userInfo];
            //failureHandler(error);
        }
    }];*/
   
     [self successFullyUploadVla:YES UrlStrings:strUrls videoFrame:frame_urls];
}
-(void)successFullyUploadVla:(BOOL)val UrlStrings:(NSString *)strUrls  videoFrame:(NSString *)frame_urls
{
    if(val==YES)
    {
        NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,
                                                             NSUserDomainMask, YES);
        NSString *documentsDirectory = [paths objectAtIndex:0];
        //NSString *documentsDirectoryrFul = [NSHomeDirectory() stringByAppendingPathComponent:@"documents"];
        NSString *fullPathValues = [NSString stringWithFormat:@"%@%@",documentsDirectory,@"/one3.mp4"];
        NSLog(@"Fullpaths:%@",fullPathValues);
        NSData *ndataUrl = [NSData dataWithContentsOfFile:fullPathValues];
        //[self performSelector:@selector(videoUploadToMyappbuiilder:) withObject:ndataUrl afterDelay:5];
        [self videoUploadToMyappbuiilder:ndataUrl UrlStrings:strUrls videoFrame:frame_urls];
        val=NO;
    }
    else
    {
        //NSLog(@"KeyStatusValueNil");
    }
    
}
- (void) playMovie:(NSURL *)vUrl
{
    /*NSString *urlStrs = @"file:///Users/supportnua/Library/Application Support/iPhone Simulator/7.0/Applications/6E1DD582-8933-435B-8E53-147414C47DF3/tmp/Corona.mp4";
     NSURL *ui = [NSURL fileURLWithPath:urlStrs];*/
    // Or any other appropriate encoding
    /*[[MPMusicPlayerController applicationMusicPlayer] setVolume:0];
     controller  = [[MPMoviePlayerController alloc] initWithContentURL:vUrl];
     controller.movieSourceType = MPMovieSourceTypeFile;
     [controller setShouldAutoplay:YES];
     self.mc = controller; //Super important
     controller.view.frame = CGRectMake (0, 0,320,400); //Set the size
     //[self.view addSubview:controller.view]; //Present Video Player in Views
     [controller play]; //Start playi*/
    
    
    
    AVAsset *asset = [AVAsset assetWithURL:vUrl];
    AVAssetImageGenerator *imageGenerator = [[AVAssetImageGenerator alloc]initWithAsset:asset];
    imageGenerator.appliesPreferredTrackTransform = YES;
    CMTime time = (0,[asset duration]);
    time.value = 1000;
    CGImageRef imageRef = [imageGenerator copyCGImageAtTime:time actualTime:NULL error:NULL];
    thumbnail = [UIImage imageWithCGImage:imageRef scale:1.0 orientation:UIImageOrientationUp];
}
-(void)imageScreenShotVideos
{
     keyValues = YES;
    if ([thumbnailUrl isEqualToString:@"Nothumbnail"])
    {
       /* UIImage *image = [UIImage imageWithCGImage:thumbnail.CGImage scale:1.0 orientation:UIImageOrientationUp];
        UIImage *tempImage = nil;
        CGSize targetSize = CGSizeMake(80, 80);
        UIGraphicsBeginImageContext(targetSize);
        
        CGRect thumbnailRect = CGRectMake(0, 0, 0, 0);
        thumbnailRect.origin = CGPointMake(0.0,0.0);
        thumbnailRect.size.width = targetSize.width;
        thumbnailRect.size.height = targetSize.height;
        
        [image drawInRect:thumbnailRect];
        
        tempImage = UIGraphicsGetImageFromCurrentImageContext();
        
        UIGraphicsEndImageContext();
    
        NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,
                                                             NSUserDomainMask, YES);
        NSString *documentsDirectory = [paths objectAtIndex:0];
        NSString* path = [documentsDirectory stringByAppendingPathComponent:@"test.png"];
        NSString *documentDirectory = [NSHomeDirectory() stringByAppendingPathComponent:@"tmp"];
        NSString *logoImagePath = [NSString stringWithFormat:@"%@/%@", documentDirectory,@"image.png"];
        //NSLog(@"Image Path Herre:%@",logoImagePath);
        UIImage *logoImage = [UIImage imageWithContentsOfFile:logoImagePath];
        NSData* data = UIImagePNGRepresentation(tempImage);
*/
        
        
        NSArray *directoryPath = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,NSUserDomainMask,YES);
        NSString *imagePath =  [directoryPath objectAtIndex:0];
        imagePath= [imagePath stringByAppendingPathComponent:@"ScreenShot.png"];
        NSData *data = [NSData dataWithContentsOfFile:imagePath];
        
        
        [self myappbuilder:data];
        [controller stop];
       // [ndataUrl writeToFile:path atomically:YES];
        
        
    }
    else
    {
        
        NSArray *photoName = [thumbnailUrl componentsSeparatedByString:@"tmp/"];
        NSLog(@"PhotoName1111:%@",photoName[1]);
        NSString *moveName = [NSString stringWithFormat:@"/%@",photoName[1]];
        NSString *documentsDirectoryr = [NSHomeDirectory() stringByAppendingPathComponent:@"tmp"];
        NSString *strpathsValues = [NSString stringWithFormat:@"%@%@",documentsDirectoryr,moveName];
        
        NSLog(@"Linked:%@",strpathsValues);
        
        NSData *dataf = [NSData dataWithContentsOfFile:strpathsValues];
        UIImage  *imas = [UIImage imageWithData:dataf];
        thumbnail = imas;
        UIImage *image = [UIImage imageWithCGImage:thumbnail.CGImage scale:1.0 orientation:UIImageOrientationUp];
        UIImage *tempImage = nil;
        CGSize targetSize = CGSizeMake(80, 80);
        UIGraphicsBeginImageContext(targetSize);
        CGRect thumbnailRect = CGRectMake(0, 0, 0, 0);
        thumbnailRect.origin = CGPointMake(0.0,0.0);
        thumbnailRect.size.width = targetSize.width;
        thumbnailRect.size.height = targetSize.height;
        [image drawInRect:thumbnailRect];
        tempImage = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();
        NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,
                                                             NSUserDomainMask, YES);
        NSString *documentsDirectory = [paths objectAtIndex:0];
        NSString* path = [documentsDirectory stringByAppendingPathComponent:@"test.png"];
        NSString *documentDirectory = [NSHomeDirectory() stringByAppendingPathComponent:@"tmp"];
        NSString *logoImagePath = [NSString stringWithFormat:@"%@/%@", documentDirectory, @"image.png"];
        //NSLog(@"Image Path Herre:%@",logoImagePath);
        UIImage *logoImage = [UIImage imageWithContentsOfFile:strpathsValues];
        NSData* data = UIImagePNGRepresentation(tempImage);
        [self myappbuilder:data];
        [controller stop];
        [data writeToFile:path atomically:YES];
        
        
        
        
    }
    
    
    
 
   
    
  }
-(void)myappbuilder :(NSData *)img
{
    //Get Image Url Methods
    //Here From Image Data get From local dir
    NSArray *directoryPath = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,NSUserDomainMask,YES);
    NSString *imagePath =  [directoryPath objectAtIndex:0];
    imagePath= [imagePath stringByAppendingPathComponent:@"ScreenShot.png"];
    NSData *data = [NSData dataWithContentsOfFile:imagePath];
    NSMutableURLRequest *request;
    request= [[NSMutableURLRequest alloc] init];
    [request setCachePolicy:NSURLRequestReloadIgnoringLocalCacheData];
    [request setHTTPShouldHandleCookies:NO];
    [request setTimeoutInterval:30];
    [request setURL:[NSURL URLWithString:[NSString stringWithFormat:@"http://build.myappbuilder.com/api/elements/images.json?api_key=%@&id=%@",@"d4b2e8f5473bd5023797436ce9556620",@"2225"]]];
    [request setHTTPMethod:@"POST"];
    NSString *stringBoundary = @"0xKhTmLbOuNdArY---This_Is_ThE_BoUnDaRyy---pqo";
    // add header
    NSString *contentType = [NSString stringWithFormat:@"multipart/form-data; boundary=%@;",stringBoundary];
    [request addValue:contentType forHTTPHeaderField: @"Content-Type"];
    // add image data
    NSMutableData *postbody = [NSMutableData data];
    [postbody appendData:[[NSString stringWithFormat:@"--%@\r\n",stringBoundary] dataUsingEncoding:NSUTF8StringEncoding]];
    [postbody appendData:[[NSString stringWithFormat:@"Content-Disposition: form-data; name=\"image\"; filename=\"%@\"\r\n",@"fill.png"] dataUsingEncoding:NSUTF8StringEncoding]];
    [postbody appendData:[@"Content-Type:image/png\r\n\r\n" dataUsingEncoding:NSUTF8StringEncoding]];
    [postbody appendData:img];
    [postbody appendData:[[NSString stringWithFormat:@"--%@--\r\n",stringBoundary] dataUsingEncoding:NSUTF8StringEncoding]];
    [request setHTTPBody:postbody];
    dispatch_queue_t concurrentQueue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
    //this will start the image loading in bg
    dispatch_async(concurrentQueue, ^{
        NSData *responseData = [NSURLConnection sendSynchronousRequest:request returningResponse:nil error:nil];
        dispatch_async(dispatch_get_main_queue(), ^{
            //NSLog(@"just sent request");
    NSString *responseString = [[NSString alloc] initWithBytes:[responseData bytes]
                                                                length:[responseData length]
                                                              encoding:NSUTF8StringEncoding];
          NSLog(@"Data Receied%@",responseString);
            NSError* error;
            NSDictionary* json = [NSJSONSerialization
                                  JSONObjectWithData:responseData
                                  
                                  options:kNilOptions
                                  error:&error];
            
            NSArray* latesturl = [json objectForKey:@"url"];
            
          NSLog(@"loans: %@", latesturl);
            
            
            NSString *urlString = [NSString stringWithFormat:@"%@",latesturl];
            
            if(urlString.length!=0)
            {
                [self myappbuildersecondImages:urlString];
            }
            
        });
    });
    
}
-(void)myappbuildersecondImages :(NSString *)urlStringNames
{
    //Get Image Url Methods
    //Here From Image Data get From local dir
    NSArray *directoryPath = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,NSUserDomainMask,YES);
    NSString *imagePath =  [directoryPath objectAtIndex:0];
    imagePath= [imagePath stringByAppendingPathComponent:@"ScreenShot.png"];
    NSData *data = [NSData dataWithContentsOfFile:imagePath];
    NSMutableURLRequest *requests;
    requests= [[NSMutableURLRequest alloc] init];
    [requests setCachePolicy:NSURLRequestReloadIgnoringLocalCacheData];
    [requests setHTTPShouldHandleCookies:NO];
    [requests setTimeoutInterval:30];
    [requests setURL:[NSURL URLWithString:[NSString stringWithFormat:@"http://build.myappbuilder.com/api/elements/images.json?api_key=%@&id=%@",@"d4b2e8f5473bd5023797436ce9556620",@"2225"]]];
    [requests setHTTPMethod:@"POST"];
    NSString *stringBoundary = @"0xKhTmLbOuNdArY---This_Is_ThE_BoUnDaRyy---pqo";
    // add header
    NSString *contentType = [NSString stringWithFormat:@"multipart/form-data; boundary=%@;",stringBoundary];
    [requests addValue:contentType forHTTPHeaderField: @"Content-Type"];
    // add image data
    NSMutableData *postbody = [NSMutableData data];
    [postbody appendData:[[NSString stringWithFormat:@"--%@\r\n",stringBoundary] dataUsingEncoding:NSUTF8StringEncoding]];
    [postbody appendData:[[NSString stringWithFormat:@"Content-Disposition: form-data; name=\"image\"; filename=\"%@\"\r\n",@"fill.png"] dataUsingEncoding:NSUTF8StringEncoding]];
    [postbody appendData:[@"Content-Type:image/png\r\n\r\n" dataUsingEncoding:NSUTF8StringEncoding]];
    [postbody appendData:data];
    [postbody appendData:[[NSString stringWithFormat:@"--%@--\r\n",stringBoundary] dataUsingEncoding:NSUTF8StringEncoding]];
    [requests setHTTPBody:postbody];
    dispatch_queue_t concurrentQueue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
    //this will start the image loading in bg
    dispatch_async(concurrentQueue, ^{
        NSData *responseData = [NSURLConnection sendSynchronousRequest:requests returningResponse:nil error:nil];
        dispatch_async(dispatch_get_main_queue(), ^{
            //NSLog(@"just sent request");
            NSString *responseString = [[NSString alloc] initWithBytes:[responseData bytes]
                                                                length:[responseData length]
                                                              encoding:NSUTF8StringEncoding];
            NSLog(@"Data Receied%@",responseString);
            NSError* error;
            NSDictionary* json = [NSJSONSerialization
                                  JSONObjectWithData:responseData
                                  
                                  options:kNilOptions
                                  error:&error];
            
            NSArray* latesturl = [json objectForKey:@"url"];
            
            NSLog(@"loans: %@", latesturl);
            
            
            NSString *frame_urls = [NSString stringWithFormat:@"%@",latesturl];
            
            if(frame_urls.length!=0)
            {
                [self fileUploadDataFromlocal:moveUrl UrlStrings:urlStringNames videoFrame:frame_urls];
               
            }
            
        });
    });
    
}
-(void)videoUploadToMyappbuiilder:(NSData *)movieData UrlStrings:(NSString *)strUrls
                       videoFrame:(NSString *)frame_urls
{
    //NSLog(@"GG:%@",button_Id);
    //NSLog(@"GG:%@",title);
    //NSLog(@"GG:%@",button_Id);
    
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,
                                                         NSUserDomainMask, YES);
    NSString *documentsDirectory = [paths objectAtIndex:0];
    //NSString *documentsDirectoryrFul = [NSHomeDirectory() stringByAppendingPathComponent:@"documents"];
    NSString *fullPathValues = [NSString stringWithFormat:@"%@%@",documentsDirectory,@"ScreenShot.png"];
    //NSLog(@"Fullpaths:%@",fullPathValues);
    NSData *ndataUrl = [NSData dataWithContentsOfFile:fullPathValues];

    
    
    if ([methodName isEqualToString:@"put"])
    {
        NSMutableURLRequest *request = [[NSMutableURLRequest alloc] init];
        [request setURL:[NSURL URLWithString:[NSString stringWithFormat:@"http://build.myappbuilder.com/api/elements/update_video.json"]]]; //URL Values
        [request setHTTPMethod:@"PUT"];
        NSString *boundary = @"0xKhTmLbOuNdArY"; // This is important! //NSURLConnection is very sensitive to format.
        NSString *contentType = [NSString stringWithFormat:@"multipart/form-data; boundary=%@",boundary];
        [request addValue:contentType forHTTPHeaderField: @"Content-Type"];
        NSMutableData *postbody = [NSMutableData data];
        [postbody appendData:[[NSString stringWithFormat:@"\r\n--%@\r\n",boundary] dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[[NSString stringWithFormat:@"Content-Disposition: form-data; name=\"api_key\"\r\n\r\n%@", api_Key] dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[[NSString stringWithFormat:@"\r\n--%@\r\n",boundary] dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[[NSString stringWithFormat:@"Content-Disposition: form-data; name=\"id\"\r\n\r\n%@",button_Id] dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[[NSString stringWithFormat:@"\r\n--%@\r\n",boundary] dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[[NSString stringWithFormat:@"Content-Disposition: form-data; name=\"title\"\r\n\r\n%@",title] dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[[NSString stringWithFormat:@"\r\n--%@\r\n",boundary] dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[[NSString stringWithFormat:@"Content-Disposition: form-data; name=\"text\"\r\n\r\n%@",FInal_Api_Values] dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[[NSString stringWithFormat:@"\r\n--%@\r\n",boundary] dataUsingEncoding:NSUTF8StringEncoding]];
        // setting the body of the post to the reqeust
        [postbody appendData:[@"Content-Disposition: form-data; name=\"video\"; filename=\"one2ffs.mp4\"\r\n" dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[@"Content-Type:video/mp4\r\n\r\n" dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:movieData];
        [postbody appendData:[[NSString stringWithFormat:@"\r\n--%@\r\n",boundary] dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[[NSString stringWithFormat:@"Content-Disposition:form-data; name=\"video_thumbnail_url\"\r\n\r\n"]dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[[NSString stringWithFormat:@"%@",strUrls]dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[[NSString stringWithFormat:@"\r\n--%@\r\n",boundary] dataUsingEncoding:NSUTF8StringEncoding]];
        //video_thumbnail
        [postbody appendData:[[NSString stringWithFormat:@"Content-Disposition:form-data; name=\"video_frame_url\"\r\n\r\n"]dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[[NSString stringWithFormat:@"%@",frame_urls]dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[[NSString stringWithFormat:@"--%@--\r\n",boundary] dataUsingEncoding:NSUTF8StringEncoding]];
        
        NSString *someString = [[NSString alloc] initWithData:postbody encoding:NSASCIIStringEncoding];
        [request setHTTPBody:postbody];
        dispatch_queue_t concurrentQueue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
        //this will start the image loading in bg
        dispatch_async(concurrentQueue, ^{
            
            dispatch_async(dispatch_get_main_queue(), ^{
                NSURLResponse *response;
                NSError *error;
                NSData *responseData = [NSURLConnection sendSynchronousRequest:request returningResponse:&response error:&error];
                
                NSString *responseString = [[NSString alloc] initWithBytes:[responseData bytes]
                                                                    length:[responseData length]
                                                                  encoding:NSUTF8StringEncoding];
                NSLog(@"Data Receied%@",responseString);
                
                
                NSLog(@"Data Receied responseString%@",responseString);
                NSDictionary* json = [NSJSONSerialization
                                      JSONObjectWithData:responseData
                                      options:kNilOptions
                                      error:&error];
                NSString *jsonValue = [NSString stringWithFormat:@"%@",[json objectForKey:@"error"]];
                if (responseString.length!=0)
                {
                    CDVPluginResult *result;
                    if (keyValues==YES)
                    {
                        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:json];
                    }
                    else
                    {
                        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:json];
                    }
                    [self.commandDelegate sendPluginResult:result callbackId:cmds.callbackId];
                    [self pathMediaurlValues];
                }
                
                keyValues = NO;
            });
        });
    }
    else
        
    {
    
    NSLog(@"FrameUrl:%@",frame_urls);
        NSMutableURLRequest *request = [[NSMutableURLRequest alloc] init];
        [request setURL:[NSURL URLWithString:[NSString stringWithFormat:@"http://build.myappbuilder.com/api/elements/create_video.json"]]]; //URL Values
        [request setHTTPMethod:@"POST"];
        NSString *boundary = @"0xKhTmLbOuNdArY"; // This is important! //NSURLConnection is very sensitive to format.
        NSString *contentType = [NSString stringWithFormat:@"multipart/form-data; boundary=%@",boundary];
        [request addValue:contentType forHTTPHeaderField: @"Content-Type"];
        NSMutableData *postbody = [NSMutableData data];
        [postbody appendData:[[NSString stringWithFormat:@"\r\n--%@\r\n",boundary] dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[[NSString stringWithFormat:@"Content-Disposition: form-data; name=\"api_key\"\r\n\r\n%@", api_Key] dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[[NSString stringWithFormat:@"\r\n--%@\r\n",boundary] dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[[NSString stringWithFormat:@"Content-Disposition: form-data; name=\"button_id\"\r\n\r\n%@",button_Id] dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[[NSString stringWithFormat:@"\r\n--%@\r\n",boundary] dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[[NSString stringWithFormat:@"Content-Disposition: form-data; name=\"title\"\r\n\r\n%@",title] dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[[NSString stringWithFormat:@"\r\n--%@\r\n",boundary] dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[[NSString stringWithFormat:@"Content-Disposition: form-data; name=\"description\"\r\n\r\n%@",FInal_Api_Values] dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[[NSString stringWithFormat:@"\r\n--%@\r\n",boundary] dataUsingEncoding:NSUTF8StringEncoding]];
        // setting the body of the post to the reqeust
        [postbody appendData:[@"Content-Disposition: form-data; name=\"video\"; filename=\"one2ffs.mp4\"\r\n" dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[@"Content-Type:video/mp4\r\n\r\n" dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:movieData];
        [postbody appendData:[[NSString stringWithFormat:@"\r\n--%@\r\n",boundary] dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[[NSString stringWithFormat:@"Content-Disposition:form-data; name=\"video_thumbnail_url\"\r\n\r\n"]dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[[NSString stringWithFormat:@"%@",strUrls]dataUsingEncoding:NSUTF8StringEncoding]];
     [postbody appendData:[[NSString stringWithFormat:@"\r\n--%@\r\n",boundary] dataUsingEncoding:NSUTF8StringEncoding]];
        //video_thumbnail
       [postbody appendData:[[NSString stringWithFormat:@"Content-Disposition:form-data; name=\"video_frame_url\"\r\n\r\n"]dataUsingEncoding:NSUTF8StringEncoding]];
       [postbody appendData:[[NSString stringWithFormat:@"%@",frame_urls]dataUsingEncoding:NSUTF8StringEncoding]];
        [postbody appendData:[[NSString stringWithFormat:@"--%@--\r\n",boundary] dataUsingEncoding:NSUTF8StringEncoding]];
        //NSLog(@"PostBody:%@",postbody);
        NSString *someString = [[NSString alloc] initWithData:postbody encoding:NSASCIIStringEncoding];
        NSLog(@"PostBody:%@",someString);
        [request setHTTPBody:postbody];
        dispatch_queue_t concurrentQueue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
        //this will start the image loading in bg
        dispatch_async(concurrentQueue, ^{
            
            dispatch_async(dispatch_get_main_queue(), ^{
                NSURLResponse *response;
                NSError *error;
                NSData *responseData = [NSURLConnection sendSynchronousRequest:request returningResponse:&response error:&error];
                
                NSString *responseString = [[NSString alloc] initWithBytes:[responseData bytes]
                                                                    length:[responseData length]
                                                                  encoding:NSUTF8StringEncoding];
                NSLog(@"Data Receied%@",responseString);
                
                
                NSLog(@"Data Receied responseString%@",responseString);
                NSDictionary* json = [NSJSONSerialization
                                      JSONObjectWithData:responseData
                                      options:kNilOptions
                                      error:&error];
                //NSArray* latesturl = [json objectForKey:@"url"];
                // NSLog(@"loans: %@", latesturl);
                //NSString *urlString = [NSString stringWithFormat:@"%@",latesturl];
                
                NSString *jsonValue = [NSString stringWithFormat:@"%@",[json objectForKey:@"error"]];
                
                if (responseString.length!=0)
                {
                    CDVPluginResult *result;
                    if (keyValues==YES)
                    {
                        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:json];
                    }
                    else
                    {
                        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:json];
                    }
                    [self.commandDelegate sendPluginResult:result callbackId:cmds.callbackId];
                    [self pathMediaurlValues];
                }
                
                keyValues = NO;
            });
        });
    }
}
- (void)removeImage:(NSString *)fileName
{
    NSFileManager *fileManager = [NSFileManager defaultManager];
    NSString *documentsPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0];
    NSString *filePath = [documentsPath stringByAppendingPathComponent:fileName];
    NSError *error;
    BOOL success = [fileManager removeItemAtPath:filePath error:&error];
    if (success)
    {
        /*UIAlertView *removeSuccessFulAlert=[[UIAlertView alloc]initWithTitle:@"Congratulation:" message:@"Successfully removed" delegate:self cancelButtonTitle:@"Close" otherButtonTitles:nil];
         [removeSuccessFulAlert show];*/
    }
    else
    {
        //NSLog(@"Could not delete file -:%@ ",[error localizedDescription]);
    }
}


-(void)clearAllDataInTempFolders
{
    
    NSFileManager *filemanager=[NSFileManager defaultManager];
    NSError *errors;
    NSString *documentsDir= [NSHomeDirectory() stringByAppendingPathComponent:@"tmp"];
    if (![[NSFileManager defaultManager ]fileExistsAtPath:documentsDir])
    {
        [[NSFileManager defaultManager]createDirectoryAtPath:documentsDir withIntermediateDirectories:NO attributes:nil error:&errors];
    }
    NSString *fullPaths = [NSString stringWithFormat:@"%@",documentsDir];
    NSArray *contentFile = [filemanager contentsOfDirectoryAtPath:fullPaths error:&errors];
    for (int i=0 ;i<[contentFile count]; i++)
    {
        //NSLog(@"Answer:%@",contentFile[i]);
        if([echo isEqualToString:contentFile[i]])
        {
            //NSLog(@"ValueStrs second values:%@",echo);
            [self removeImage:contentFile[i]];
        }
    }

}
-(void)removeTempFolder:(NSString *)subFolderNames
{
    NSLog(@"Saravanakumar");
    NSString *documentsDirectoryPath = [NSHomeDirectory()  stringByAppendingPathComponent:@"tmp"];
    NSString *folderName = [NSString stringWithFormat:@"%@/%@",documentsDirectoryPath,subFolderNames];
    NSLog(@"DeletePathName:%@",folderName);
    // Delete the file using NSFileManager MediaCache
    NSFileManager *fileManager = [NSFileManager defaultManager];
    [fileManager removeItemAtPath:folderName error:nil];
}

-(void)pathMediaurlValues
{
    NSString *valu = @"/capture";
    NSString *documentsDirectoryPath = [NSHomeDirectory()  stringByAppendingPathComponent:@"tmp"];
    NSString *folderName = [NSString stringWithFormat:@"%@%@",documentsDirectoryPath,valu];
    NSLog(@"DeletePathName:%@",folderName);
    // Delete the file using NSFileManager MediaCache
    NSFileManager *fileManager = [NSFileManager defaultManager];
    [fileManager removeItemAtPath:folderName error:nil];

}
@end
