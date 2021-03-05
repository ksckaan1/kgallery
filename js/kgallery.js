class kGallery {
    constructor(
        element,
        width = "100%",
        height = "600px",
        duration = 0,
        arrows = true,
        dots = true,
        title = null,
        subTitle = null
    ) {
        this.element = document.querySelector(element)
        this.Imgs = this.element.querySelectorAll("img")
        this.width = width
        this.height = height
        this.imgNum = 0
        this.imgLen = 0
        this.Imgs.forEach(() => {
            this.imgLen++
        })
        this.arrows = arrows
        this.dots = dots
        this.duration = duration
        this.title = title
        this.subTitle = subTitle
    }

    init() {
        this.element.classList.add("kgallery")
        this.element.style.width = this.width
        this.element.style.height = this.height

        var numerator = document.createElement("div")
        numerator.classList.add("keNumerator")
        this.element.appendChild(numerator)

        this.Imgs.forEach((img, index) => {
            img.classList.add("kgalleryImg")
            var imgDot = document.createElement("div")
            imgDot.classList.add("keNumDot")
            imgDot.setAttribute("jumpNum", index)
            numerator.appendChild(imgDot)
            imgDot.addEventListener("click", () => {
                this.jumpTo(imgDot.getAttribute("jumpNum"))
            })
        })
        this.Imgs[0].classList.add("activeImg")

        var nextButton = document.createElement("div")
        nextButton.classList.add("nextButton")
        nextButton.addEventListener("click", () => {
            this.next()
        })
        var previousButton = document.createElement("div")
        previousButton.classList.add("previousButton")
        previousButton.addEventListener("click", () => {
            this.previous()
        })
        this.element.appendChild(nextButton)
        this.element.appendChild(previousButton)
        this.Dots = document.querySelectorAll(".keNumerator .keNumDot")
        this.Dots[0].classList.add("activeDot")

        if (this.duration != 0) {
            setInterval(() => {
                this.next()
            }, this.duration);
        }
        if (this.arrows != true) {
            nextButton.style.display = "none"
            previousButton.style.display = "none"
        }

        if (this.dots != true) {
            numerator.style.display = "none"
        }

        if (this.title != null) {
            var kTitle = document.createElement("div")
            kTitle.classList.add("kTitle")
            var kTitleText = document.createTextNode(this.title)
            kTitle.appendChild(kTitleText)
            var kHero = document.createElement("div")
            kHero.classList.add("kHero")
            kHero.appendChild(kTitle)
            this.element.appendChild(kHero)
            if (this.subTitle != null) {
                var kSubTitle = document.createElement("div")
                var kSubTitleText = document.createTextNode(this.subTitle)
                kSubTitle.classList.add("kSubTitle")
                kSubTitle.appendChild(kSubTitleText)
                kHero.appendChild(kSubTitle)
            }
        }
    }

    next() {
        this.imgNum++
        if (this.imgNum > this.imgLen - 1) {
            this.imgNum = 0
        }
        this.Imgs.forEach((img, index) => {
            img.classList.remove("activeImg")
            this.Dots[index].classList.remove("activeDot")
        })
        this.Imgs[this.imgNum].classList.add("activeImg")
        this.Dots[this.imgNum].classList.add("activeDot")

    }

    previous() {
        this.imgNum--
        if (this.imgNum < 0) {
            this.imgNum = this.imgLen - 1
        }
        this.Imgs.forEach((img, index) => {
            img.classList.remove("activeImg")
            this.Dots[index].classList.remove("activeDot")
        })
        this.Imgs[this.imgNum].classList.add("activeImg")
        this.Dots[this.imgNum].classList.add("activeDot")
    }

    jumpTo(jumpNum) {
        this.imgNum = jumpNum
        this.Imgs.forEach((img, index) => {
            img.classList.remove("activeImg")
            this.Dots[index].classList.remove("activeDot")
        })
        this.Imgs[jumpNum].classList.add("activeImg")
        this.Dots[jumpNum].classList.add("activeDot")
    }
}