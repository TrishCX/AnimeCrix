import { got } from "got";
import cheerio from "cheerio";
export default async function getCharacters(uri) {
    const arrayOfAll = [];
    const baseURI = `${uri}/characters`;
    const rawBody = await got(baseURI);
    const body = await rawBody.body;
    const $ = cheerio.load(body);
    $(".wrapper")
        .find("#contentWrapper > #content")
        .find("tbody")
        .find(".anime-character-container")
        .find("table")
        .each((index, element) => {
        const $$ = $(element);
        const mainPicture = $$.find("tbody")
            .find("tr")
            .first()
            .find("div")
            .find("img")
            .attr("data-src");
        const allNames = $$.find("tbody")
            .find("tr")
            .first()
            .find("td.borderClass")
            .find(".spaceit_pad")
            .first()
            .text()
            .trim();
        const allRoles = $$.find("tbody")
            .find("tr")
            .first()
            .find("td.borderClass")
            .find(".spaceit_pad")
            .eq(1)
            .text()
            .trim();
        const allFavorites = $$.find("tbody")
            .find("tr")
            .first()
            .find("td.borderClass")
            .find(".spaceit_pad")
            .eq(2)
            .text()
            .trim();
        arrayOfAll.push({
            images: `${mainPicture}`,
            name: allNames,
            favorites: allFavorites,
            role: allRoles,
        });
    });
    const filteredArray = arrayOfAll.filter((value, index) => {
        return (value.favorites !== "" &&
            value.name !== "" &&
            value.images !== "" &&
            value.role !== "");
    });
    return filteredArray;
}
