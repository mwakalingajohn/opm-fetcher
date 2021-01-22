<script>
    import axios from "axios";
    import { currentImageIndex, images, ROOT_URL } from "./store/store";

    var prevScrollpos = window.pageYOffset;

    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("navigation").style.bottom = "30px";
        } else {
            document.getElementById("navigation").style.bottom = "-80px";
        }
        prevScrollpos = currentScrollPos;
    };

    let chapters = getChapters();
    let loadedImages = []  
    let pageIndex

    async function getChapters() {
        return axios.get(ROOT_URL + "/api/chapters");
    }

    function onChapterChangeHandler(e) {
        axios.get(`${ROOT_URL}/api/chapters/${e.target.value}/images`).then(res=>{
            images.update(val=>res.data)
        });
    }

    function onPageChangeHandler(e){
        currentImageIndex.update(val=>e.target.value)
    }

    function onNextPressHandler(){
        currentImageIndex.update(val=>{            
            let newImageIndex = parseInt(val) + 1
            return newImageIndex >= 0?
                newImageIndex:
                0
        })
    }

    function onPreviousPressHandler(){
        currentImageIndex.update(val=>{
            let newImageIndex = parseInt(val) - 1
            return newImageIndex >= 0?
                newImageIndex:
                0
        })
    }

    const _loadedImages = images.subscribe(val=>{
        loadedImages = val
    });

    const _pageIndex = currentImageIndex.subscribe(val =>{
        pageIndex = val
    })
</script>

<div class="navigation shadow-lg p-3" id="navigation">
    <div class="container">
        <div class="row">
            <div class="form-group col-md-4">
                <select
                    name=""
                    id=""
                    on:blur="{onChapterChangeHandler}"
                    class="form-control rounded-0  border border-dark">
                    <option value="">Chapter</option>
                    {#await chapters}
                        <option value="" selected>Getting chapters...</option>
                    {:then res}
                        {#each res.data.response as { id, chapter }, i}
                            <option value={id}>{chapter}</option>
                        {/each}
                    {:catch error}
                        <option value="">...</option>
                    {/await}
                </select>
            </div>
            <div class="form-group col-md-2">
                <select
                    on:blur="{onPageChangeHandler}"
                    bind:value={pageIndex}
                    name=""
                    id=""
                    class="form-control rounded-0  border border-dark">
                    <option value="">Page</option>
                    {#each loadedImages as img, i}
                        <option value={i}>{i}</option>
                    {/each}
                </select>
            </div>
            <div class="form-group col-md-3">
                <button class="btn btn-light border border-dark w-100 rounded-0" on:click="{onPreviousPressHandler}"
                    >&lt; Previous</button>
            </div>
            <div class="form-group col-md-3">
                <button class="btn btn-white border border-dark w-100 rounded-0" on:click="{onNextPressHandler}"
                    >Next &gt;</button>
            </div>
        </div>
    </div>
</div>

<style>
    .navigation {
        width: 900px;
        background: white;
        position: fixed;
        z-index: 30;
        bottom: 30px;
        left: 15%;
        transition: bottom 0.3s;
    }
</style>
