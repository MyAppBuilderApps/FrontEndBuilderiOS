//
//  ThumbnailImageCollection.h
//  FrontEndBuilder
//
//  Created by Nua i7 on 12/24/14.
//
//

#import <UIKit/UIKit.h>
#import "ThumbnailVideoPlay.h"
@class ThumbnailVideoPlay;
@interface ThumbnailImageCollection : UIViewController
{
    ThumbnailVideoPlay *wallpaperViewController;
}
@property (strong, nonatomic) IBOutlet UIView *viw_thumFirst;
@property(nonatomic, weak) IBOutlet UICollectionView *collectionView;
@property(nonatomic, strong) NSArray *assets;
@property(nonatomic,strong)ThumbnailVideoPlay *wallpaperViewController;
@end
