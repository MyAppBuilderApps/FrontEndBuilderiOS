//
//  Echo.m
//  iBook-2
//
//  Created by Nua Trans Media on 7/23/14.
//
//

#import "Echo.h"
#import "MediaPlayer/MPMoviePlayerViewController.h"
#import "MediaPlayer/MPMoviePlayerController.h"
#import "MovieViewController.h"
#import <Cordova/CDV.h>

@implementation Echo
- (void)echo:(CDVInvokedUrlCommand*)command
{
    movie = [command.arguments objectAtIndex:0];
    NSLog(@"movie------>>>>>>>:%@ ",movie );
    NSString *orient = [command.arguments objectAtIndex:1];
    NSRange range = [movie rangeOfString:@"http"];
    //NSLog(@"LENGTH: %i",range.length );
    if(range.length > 0)
    {
        if ([@"YES" isEqualToString:orient])
        {
            player = [[MovieViewController alloc] initWithContentURL:[NSURL URLWithString:movie] andOrientation:YES];
        } else {
            player = [[MovieViewController alloc] initWithContentURL:[NSURL URLWithString:movie] andOrientation:NO];
        }
    }
    if (player)
    {
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(MovieDidFinish:) name:MPMoviePlayerPlaybackDidFinishNotification object:nil];
        [self.viewController presentMoviePlayerViewControllerAnimated:player];
    }

}
- (void)MovieDidFinish:(NSNotification *)notification {
    [[NSNotificationCenter defaultCenter] removeObserver:self
                                                    name:MPMoviePlayerPlaybackDidFinishNotification
                                                  object:nil];
    [self writeJavascript:[NSString stringWithFormat:@"CDVVideo.finished(\"%@\");", movie]];
    
}

/*- (void)dealloc {
 [player release];
 [movie release];
 [super dealloc];
 }*/

-(void)videoPlayBackDidFinish:(NSNotification*)notification  {
    
    [[NSNotificationCenter defaultCenter] removeObserver:self name:MPMoviePlayerPlaybackDidFinishNotification object:nil];
    // [[MoviePlayViewController moviePlayer] stop];
    //  MoviePlayViewController = nil;
    //  [MoviePlayViewController release];
    // [self dismissMoviePlayerViewControllerAnimated];
    [self writeJavascript:[NSString stringWithFormat:@"CDVVideo.finished(\"%@\");", movie]];
    
}

@end
