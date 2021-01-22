<script>
    import { currentImageIndex, images } from "./store/store";

    let src;
    let chapterImages;

    const _images = images.subscribe((val) => {
        chapterImages = val;
    });

    const _currentImage = currentImageIndex.subscribe((val) => { 
        src = chapterImages[val];
    }); 
</script>

<img {src} alt="" id="page-image"/>

<style>
    img {
        width: 100%;
    }
</style>
