//
//  Echo.h
//  iBook-2
//
//  Created by Nua Trans Media on 7/23/14.
//
//
#import <Cordova/CDV.h>
#import "MovieViewController.h"
#import <Foundation/Foundation.h>
#import <MediaPlayer/MediaPlayer.h>
@interface Echo : CDVPlugin{
    MovieViewController *player;
    NSString* movie;
   }
- (void)echo:(CDVInvokedUrlCommand*)command;

@property (nonatomic,strong) MPMoviePlayerController* mc;
@end
