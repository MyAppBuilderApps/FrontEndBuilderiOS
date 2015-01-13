//
//  ThumbnailImages.m
//  FrontEndBuilder
//
//  Created by Nua i7 on 12/24/14.
//
//

#import "ThumbnailImages.h"
#import "ThumbnailImageCollection.h"
@implementation ThumbnailImages

- (void)thumbnailImages:(CDVInvokedUrlCommand*)command
{
    NSLog(@"Good Life");
//    thumbnailImageCol = [[ThumbnailImageCollection alloc]initWithNibName:@"ThumbnailImageCollection" bundle:nil];
//
//    //[thumbnailImageCol presentedViewController];
//    
//    [self.viewController presentViewController:thumbnailImageCol animated:YES completion:nil];
    
    
     UIStoryboard *storyboard=nil;
    if(UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPhone)
    {
        CGSize result = [[UIScreen mainScreen] bounds].size;
        
        if(result.height==568)
        {
            storyboard = [UIStoryboard storyboardWithName:@"Storyboard iphone5" bundle:nil];
        }
        else
        {
            storyboard = [UIStoryboard storyboardWithName:@"Storyboard" bundle:nil];
        }
    }
    else
    {
        storyboard = [UIStoryboard storyboardWithName:@"Storyipad" bundle:nil];
    }
    cmds = command;
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(passValueTOphoneGap:)
                                                 name:@"SecondViewControllerDismissed"
                                               object:nil];
    
     thumbnailImageCol = [storyboard instantiateViewControllerWithIdentifier:@"galleryView"];
     _navigationController = [[UINavigationController alloc] initWithRootViewController:thumbnailImageCol];
   
    [self.viewController presentViewController:_navigationController animated:YES completion:nil];
    
    
    
}
-(void)passValueTOphoneGap:(NSNotification *) notification
{
    NSLog(@"<------------Value From Notification---------->:%@",[notification object]);
    
     //NSString *resultType = [cmds objectAtIndex:0];
    CDVPluginResult *result;
    
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: [notification object]];
        //writes back the smiley face to phone gap.
        [self writeJavascript:[result toSuccessCallbackString:cmds.callbackId]];
   
}
- (void) nativeFunction:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
    
    NSLog(@"Hello, this is a native function called from PhoneGap/Cordova!");
    
    //get the callback id
    NSString *callbackId = [arguments pop];
    NSString *resultType = [arguments objectAtIndex:0];
    NSMutableArray *GlobalArg=arguments;
    
    CDVPluginResult *result;
    if ( [resultType isEqualToString:@"success"] ) {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: @"Success :)"];
        //writes back the smiley face to phone gap.
        [self writeJavascript:[result toSuccessCallbackString:callbackId]];
    }
}

@end
