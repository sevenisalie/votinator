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
    browser?: string
}
class Votinator {
    browser: Browser | undefined
    page: Page | undefined
    url: string | undefined
    constructor(parameters: VotinatorOptions) {
        this.url = parameters.url
    }

    private async makeBrowser() {
        try {
            this.browser = await puppeteer.launch()
            return true
        } catch (error) {
            console.log(`Browser Creation Failure`, error)
            return false
        }
    }

    private async nukeBrowser() {
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

    private async fetchElement(elementSignature: string) {
        if (this.page == undefined) { return }
        try {
            const element = await this.page.waitForSelector(elementSignature)
            return element
        } catch (error) {
            console.log(`Element Failed to Load`, error)
            return false
        }
    }

}



