//
//  ThumbnailImages.h
//  FrontEndBuilder
//
//  Created by Nua i7 on 12/24/14.
//
//

#import <Cordova/CDV.h>
#import "ThumbnailImageCollection.h"
@class ThumbnailImageCollection;
@interface ThumbnailImages : CDVPlugin
{
    ThumbnailImageCollection *thumbnailImageCol;
    CDVInvokedUrlCommand *cmds;
}
@property (nonatomic) IBOutlet UINavigationController *navigationController;
- (void)thumbnailImages:(CDVInvokedUrlCommand*)command;
- (void) nativeFunction:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
@end
