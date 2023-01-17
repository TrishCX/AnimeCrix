import cheerio from "cheerio";
import got from "got";
export default async function getPictures(uri) {
    const baseURI = `${uri}/pics`;
    const rawBody = await got(baseURI);
    const body = await rawBody.body;
    const $ = cheerio.load(body);
    const imagesArray = [];
    const items = $(".wrapper > #contentWrapper")
        .find("#content > table")
        .find("tbody")
        .last()
        .find("a")
        .each((index, element) => {
        const imageSource = $(element).attr("href");
        imagesArray.push(`${imageSource}`);
    });
    const filteredArray = imagesArray.filter((value, index) => {
        return value.includes("/modules.php?go=report&type=animepic&id=") !== true;
    });
    return filteredArray;
}
