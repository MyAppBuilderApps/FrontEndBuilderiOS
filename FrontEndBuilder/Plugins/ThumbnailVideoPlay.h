//
//  ThumbnailVideoPlay.h
//  FrontEndBuilder
//
//  Created by Nua i7 on 12/25/14.
//
//

#import <UIKit/UIKit.h>
#import <MediaPlayer/MediaPlayer.h>
#import "ThumbnailImages.h"
@interface ThumbnailVideoPlay : UIViewController
{
    MPMoviePlayerController *mp;
    NSMutableArray *matches;
    NSMutableArray *matches2;
   BOOL canRotateToAllOrientations;
}
@property (strong, nonatomic) IBOutlet UIView *play_view;
- (IBAction)btn_videoCapture:(id)sender;
@property (strong, nonatomic) NSString  *namePng;
@property (weak, nonatomic) IBOutlet UIView *viw_playView;
@property (weak, nonatomic) IBOutlet UIImageView *imgView_Frame;
- (IBAction)btn_retrived:(id)sender;
@end
