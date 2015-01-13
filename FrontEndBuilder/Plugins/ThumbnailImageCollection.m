//
//  ThumbnailImageCollection.m
//  FrontEndBuilder
//
//  Created by Nua i7 on 12/24/14.
//
//

#import "ThumbnailImageCollection.h"
#import "AssetsLibrary/ALAssetsLibrary.h"
#import "AssetsLibrary/ALAssetsFilter.h"
#import "AssetsLibrary/ALAssetsGroup.h"
#import "AssetsLibrary/ALAsset.h"
#import "AssetsLibrary/ALAssetRepresentation.h"
#import "PhotoCell.h"
#import <AVFoundation/AVFoundation.h>
@interface ThumbnailImageCollection ()

@end

@implementation ThumbnailImageCollection

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
    // Do any additional setup after loading the view from its nib.
    
    _assets = [@[] mutableCopy];
    __block NSMutableArray *tmpAssets = [@[] mutableCopy];
    // 1
    ALAssetsLibrary *assetsLibrary = [ThumbnailImageCollection defaultAssetsLibrary];
    // 2
    [assetsLibrary enumerateGroupsWithTypes:ALAssetsGroupAll usingBlock:^(ALAssetsGroup *group, BOOL *stop) {
        [group enumerateAssetsUsingBlock:^(ALAsset *result, NSUInteger index, BOOL *stop) {
            if(result)
            {
                // 3
                
                if ([[result valueForProperty:ALAssetPropertyType] isEqualToString:ALAssetTypeVideo])
                {
                     [tmpAssets addObject:result];
                }
                
                
               
            }
        }];
        
        // 4
        //NSSortDescriptor *sort = [NSSortDescriptor sortDescriptorWithKey:@"date" ascending:NO];
        //self.assets = [tmpAssets sortedArrayUsingDescriptors:@[sort]];
        self.assets = tmpAssets;
        
        // 5
        [self.collectionView reloadData];
    } failureBlock:^(NSError *error) {
        NSLog(@"Error loading images %@", error);
    }];
    //delay initial load so statusBarOrientation returns correct value
   
   // [self pathMediaurlValues];
   [self.navigationController setNavigationBarHidden:YES animated:nil];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
- (IBAction)btn_Back:(id)sender
{
    [self dismissViewControllerAnimated:YES completion:nil];
}
#pragma mark - assets
#pragma mark - collection view data source

- (NSInteger) collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section
{
    return self.assets.count;
}

- (UICollectionViewCell *) collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath
{
    PhotoCell *cell = (PhotoCell *)[collectionView dequeueReusableCellWithReuseIdentifier:@"PhotoCell" forIndexPath:indexPath];
    
    ALAsset *asset = self.assets[indexPath.row];
    cell.asset = asset;
    cell.backgroundView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"photo-frame-2.png"]];
    return cell;
}

- (CGFloat) collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout minimumLineSpacingForSectionAtIndex:(NSInteger)section
{
    return 4;
}

- (CGFloat) collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout minimumInteritemSpacingForSectionAtIndex:(NSInteger)section
{
    return 1;
}

#pragma mark - collection view delegate

- (void) collectionView:(UICollectionView *)collectionView didSelectItemAtIndexPath:(NSIndexPath *)indexPath
{
    ALAsset *asset = self.assets[indexPath.row];
    ALAssetRepresentation *defaultRep = [asset defaultRepresentation];
    NSLog(@"Videos:%@",defaultRep);
    
    
//UIImage *image = [UIImage imageWithCGImage:[defaultRep fullScreenImage] scale:[defaultRep scale] orientation:0];
    
    
//Do something with the image
}
- (UIEdgeInsets)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout*)collectionViewLayout insetForSectionAtIndex:(NSInteger)section {
    return UIEdgeInsetsMake(0,0,0,0);
}

+ (ALAssetsLibrary *)defaultAssetsLibrary
{
    static dispatch_once_t pred = 0;
    static ALAssetsLibrary *library = nil;
    dispatch_once(&pred, ^{
        library = [[ALAssetsLibrary alloc] init];
    });
    return library;
}

-(void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    [self pathMediaurlValues];
    if ([[segue identifier]isEqualToString:@"Thumbnail"])
    {
        
        
        self.WallpaperViewController = [segue destinationViewController];
        NSArray *indexPaths = [self.collectionView indexPathsForSelectedItems];
        NSIndexPath *indexPath = [indexPaths objectAtIndex:0];
        ALAsset *asset = self.assets[indexPath.row];
        ALAssetRepresentation *defaultRep = [[asset defaultRepresentation] url];
        //self.WallpaperViewController.namePng = [recipePhotos objectAtIndex:indexpath.row];]
       // NSLog(@"String:%@",[recipePhotos objectAtIndex:indexPath.row]);
        self.wallpaperViewController.namePng = [NSString stringWithFormat:@"%@",defaultRep];
        
        
       NSURL *theURLVideo = [NSURL URLWithString:[NSString stringWithFormat:@"%@",defaultRep]];
        
        // NSURL *theURLVideos =[NSURL fileURLWithPath:[NSString stringWithFormat:@"%@",defaultRep]];
        
        NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,
                                                             NSUserDomainMask, YES);
        NSString *documentsDirectory = [paths objectAtIndex:0];
        NSString* path = [documentsDirectory stringByAppendingPathComponent:@"one3.mp4"];
        NSLog(@"MoveName:%@",path);
        NSURL *uploadURL = [NSURL fileURLWithPath:path];
        AVURLAsset *assets = [AVURLAsset URLAssetWithURL:theURLVideo options:nil];
        AVAssetExportSession *exportSession = [[AVAssetExportSession alloc] initWithAsset:assets presetName:AVAssetExportPresetLowQuality];
        exportSession.outputURL = uploadURL;
        exportSession.outputFileType = AVFileTypeMPEG4;
        [exportSession exportAsynchronouslyWithCompletionHandler: ^(void) {
            if (exportSession.status == AVAssetExportSessionStatusCompleted)
            {
                
                NSLog(@"SuccessHandler");
                
             
                
            }
            else
            {
                NSLog(@"SuccessHandler err");
            }
        }];
    }
}
-(void)pathMediaurlValues
{
    NSLog(@"Video Paths Delete Here");
    
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,
                                                         NSUserDomainMask, YES);
    NSString *documentsDirectory = [paths objectAtIndex:0];
    NSString* path = [documentsDirectory stringByAppendingPathComponent:@"one3.mp4"];
    //NSString* ImagePaths = [documentsDirectory stringByAppendingPathComponent:@"ScreenShot1.png"];
    NSLog(@"DeletePathName:%@",path);
    // Delete the file using NSFileManager MediaCache
    NSFileManager *fileManager = [NSFileManager defaultManager];
    //[fileManager removeItemAtPath:ImagePaths error:nil];
    [fileManager removeItemAtPath:path error:nil];
}
-(BOOL)shouldAutorotate
{
    return NO;
}
#pragma mark ------Back Button-------
- (IBAction)returnToOneStepBack:(UIStoryboardSegue *)segue
{
    
}

@end
