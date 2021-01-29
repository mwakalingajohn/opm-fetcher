<script>
import { log } from "console";

    import { currentImageIndex, imageLoading, images } from "./store/store";

    let src;
    let chapterImages;

    const _images = images.subscribe((val) => {
        chapterImages = val;
    });

    const _currentImage = currentImageIndex.subscribe((val) => { 
        src = chapterImages[val];
    }); 
    
    function imageLoaded(){
        imageLoading.update(val=>false)
    }
</script>

<img {src} alt="" id="page-image" on:load="{imageLoaded}"/>

<style>
    img {
        width: 100%;
    }
</style>
