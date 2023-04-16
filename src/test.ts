import { Votinator } from ".";

const main = async () => {
    const voter = new Votinator("https://omaha.com/contests/omahas-choice-awards/")
    const element = voter.fetchElement("div > MuiOutlinedInput-input MuiInputBase-input css-1x5jdmq")
    console.log(element)
}

main()