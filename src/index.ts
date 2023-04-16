import puppeteer, { Browser, Page } from "puppeteer"

//get page object
// get vote input element
//make function to inject Jacob Greve - Niteowl as target.value - STEP 1
//make function to arrayify the csv of people
// make function that loops over array of people and answers the form with single person- STEP 2
// make function that submits vote and disposes page object

//repeat

type VotinatorOptions = {
    url: string,
}
export class Votinator {
    browser: Browser | undefined
    page: Page | undefined
    url: string | undefined
    constructor(url: string) {
        this.url = url
        // this.init()
    }

    /**
     * name
     */
    public async init() {
        await this.makeBrowser()
        if (this.browser !== undefined) {
            await this.makePage(this.browser)
        }
    }

    private async makeBrowser() {
        try {
            this.browser = await puppeteer.launch({ headless: false })
            return true
        } catch (error) {
            console.log(`Browser Creation Failure`, error)
            return false
        }
    }

    public async nukeBrowser() {
        if (this.browser == undefined) { return }
        try {
            this.browser?.close()
            this.browser = undefined
            return true
        } catch (error) {
            console.log(`Browser Deletion Failure`, error)
            return false
        }
    }

    private async makePage(browser: Browser) {
        if (this.url == undefined) { return }
        try {
            this.page = await browser.newPage()
            await this.page.goto(this.url)
            return true
        } catch (error) {
            console.log(`Page Creation Failure`, error)
            return false
        }
    }

    private async deletePage() {
        if (this.page == undefined) { return }
        try {
            this.page?.close()
            return true
        } catch (error) {
            console.log(`Page Close Failure`, error)
            return false
        }
    }

    //  @dev this takes in a puppeteer HTMLElement. 
    //  If you're having trouble, try casting return as HTMLElement
    //  here is an example of input element Signature
    //  @param elementSignature 'div > .class-name'

    public async fetchElement(className: string) {
        if (this.page == undefined) { return }
        try {
            let data = await this.page.waitForSelector(`${className}`)
            // const element = (await this.page.waitForSelector(elementSignature))
            return data
        } catch (error) {
            console.log(`Element Failed to Load`, error)
            return false
        }
    }

}

const main = async () => {
    const voter = new Votinator("https://app.contezo.com/contests/3f41260c-3f69-3f43-3f3f-631668563f3f")
    await voter.init()
    console.log(voter.browser)
    console.log(voter.page)
    //click drinks
    const element = await voter.fetchElement("#root > div.app-container > div > div > div > div > div > div > div.ballot-card-wrapper > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.cardContainer.css-s18byi > div.MuiCardContent-root.CardContent.css-1qw96cp > div.ballot-layout.landing-ballot > div.gallery-grid > div > div > div.contestant-list.col-grid-sec > div > div:nth-child(4)")
    await voter.page?.click("#root > div.app-container > div > div > div > div > div > div > div.ballot-card-wrapper > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.cardContainer.css-s18byi > div.MuiCardContent-root.CardContent.css-1qw96cp > div.ballot-layout.landing-ballot > div.gallery-grid > div > div > div.contestant-list.col-grid-sec > div > div:nth-child(4)")
    //type input
    const newElement = await voter.fetchElement("#standard-error")
    await voter.page?.type("#standard-error", "Jacob Greve - Niteowl")
    //click vote
    await voter.page?.click(`ul > li > div > div > div.nominate-action`)
    //type email input

    const formItem1 = await voter.page?.waitForXPath("/html/body/div[3]/div[3]/div/div[2]/div[2]/div/div/div/div/div/div[1]/div/div/div/input")
    const formItem2 = await voter.page?.waitForXPath("/html/body/div[3]/div[3]/div/div[2]/div[2]/div/div/div/div/div/div[2]/div/div/div/input")
    const formItem3 = await voter.page?.waitForXPath("/html/body/div[3]/div[3]/div/div[2]/div[2]/div/div/div/div/div/div[3]/div/div/div/input")
    const formItem4 = await voter.page?.waitForXPath("/html/body/div[3]/div[3]/div/div[2]/div[2]/div/div/div/div/div/div[4]/div/div/div/div/input")
    const formItem5 = await voter.page?.waitForXPath("/html/body/div[3]/div[3]/div/div[2]/div[2]/div/div/div/div/div/div[5]/div/div[1]/div[2]/div/input")

    //type name

    await formItem1.type("omm+11@gmail.com", { delay: 100 })

    await formItem2.type("Billy", { delay: 100 })

    //type name last
    await formItem3.type("Liebermann", { delay: 100 })
    // //type phone
    await formItem4.type("4026572200", { delay: 100 })
    await formItem5.type("68105", { delay: 100 })



    voter.page?.click("body > div.MuiModal-root.MuiDialog-root.title-modal.large-size-modal.register-modal.css-126xj0f > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div > div.modal-content > div.reg-form > div > div > div > div > div > div:nth-child(6) > div > h4")
    voter.page?.click("body > div.MuiModal-root.MuiDialog-root.title-modal.large-size-modal.register-modal.css-126xj0f > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div > div.modal-content > div.reg-form > div > div > div > div > div > div:nth-child(7) > div > button")
    console.log(element)
    console.log(newElement)
    const pauseCause = async () => new Promise(() => {
        return setTimeout(async () => {
            return await voter.page?.click(`xpath//html/body/div[1]/div[1]/div/div/div/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div[2]/ul/li/div/div/div[2]`)

        }, 5000)
    })
    await pauseCause()
    // await voter.page?.click("ul > div:nth-child(35) > li > div:nth-child(1) > p")
    await voter.page?.click(`xpath//html/body/div[1]/div[1]/div/div/div/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div[2]/ul/li/div/div/div[2]`)
    await voter.page?.click(`xpath//html/body/div[1]/div[1]/div/div/div/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div[2]/ul/li/div/div/div[2]`)
    console.log("finished")
    // voter.nukeBrowser()
}

main()


