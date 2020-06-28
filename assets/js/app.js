let app = document.getElementById('app');
let searchBox = document.getElementById('searchBox')
let sortBtn = document.getElementById('sort-btn')
let list = document.getElementById('list')

class Gallery {
    constructor(myImages) {
        if (localStorage.getItem("images") == undefined) {
            this.images = myImages;
        } else {
            this.images = this.getFromStorage();
        }
    }
    render() {
        this.images.forEach(element => {
            this.paint(element)
        });
    }

    sort() {
        this.images = this.images.sort((element1, element2) => {
            return (element2.like.count - element1.like.count)
        });
        this.paint(this.images)
    }

    search() {
        this.images = this.images.filter((item) => {
            return item.description.toLowerCase().includes(searchBox.value.toLowerCase());
        });
        this.paint(this.images)
    }

    getFromStorage() {
        const images = localStorage.getItem('images')
        if (images)
            return JSON.parse(images)

    }
    setToStorage() {
        localStorage.setItem('images', JSON.stringify(this.images))
    }

    paint() {
        app.innerHTML = '';
        this.images.forEach((element) => {

            let divparent = builder
                .create('div')
                .className('flexBox')
                .appendTo(app)
                .build()

            let gallerybox = builder
                .create('div')
                .className('gallery')
                .appendTo(divparent)
                .build()

            let linkBox = builder
                .create('a')
                .href(element.href)
                .appendTo(gallerybox)
                .build();

            let img = builder
                .create('img')
                .src(element.src)
                .appendTo(linkBox)
                .build()

            let boxDesc = builder
                .create('div')
                .className('desc')
                .appendTo(gallerybox)
                .text(element.description)
                .build()

            let aIcon = builder.create('a')
                .className('alike')
                .appendTo(gallerybox)
                .build();

            let iconLike = builder
                .create('i')
                .className('fa fa-heart')
                .appendTo(aIcon)
                .text(element.like.count)

            .on('click', () => {
                    iconLike.textContent = ++element.like.count;
                    this.setToStorage()
                })
                .build()
        });
    }

}
const image = new Gallery(myImages)
image.render()

searchBox.addEventListener('input', () => {
    image.search();

})
sortBtn.addEventListener('click', () => {
    image.sort()

})