//
//  Echo.h
//  videoApp
//
//  Created by Nua Trans Media on 7/23/14.
//
//

#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import <MediaPlayer/MediaPlayer.h>

@interface Thumbnail : CDVPlugin
{
    MPMoviePlayerController *controller; //Movie Player
    NSData *imgData;
    UIImage *ima;
    //Data  Image Objects
    NSString *imagesValues;
    BOOL keyValues;
    BOOL keyStatusVal;
    CDVInvokedUrlCommand *cmds;
    
    UIImage *thumbnail;
    
    NSString*title;
    NSString*api_Key;
    NSString*button_Id;
    NSString* echo1;
    NSString*thumbnailUrl;
    NSString*methodName;
    NSURL *moveUrl;
    NSString* echo;
    NSMutableArray *CollectFileValue;
    NSMutableArray *CollectFileValueFiles;
    NSString *FInal_Api_Values;

    
}
- (void)thumbnail:(CDVInvokedUrlCommand*)command;
@property (nonatomic,strong) MPMoviePlayerController* mc; //Movie Player
@end
