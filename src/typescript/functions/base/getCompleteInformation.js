import cheerio from "cheerio";
import got from "got";
import pretty from "pretty";
import { convert } from "html-to-text";
import removeWhiteSpaces from "remove-whitespace";
import getVideoId from "get-video-id";
import getInformation from "./getInformation.js";
export default async function getCompleteInformation(name) {
    const uriToFetch = await getInformation(`${name}`);
    console.log(uriToFetch);
    const request = await got(`${uriToFetch}`);
    const rawBody = request.body;
    const body = pretty(rawBody);
    const $ = cheerio.load(body);
    const editTitle = await $(".edit-info");
    const title = editTitle.find(".h1-title").text().trim();
    const descriptionPath = $(".wrapper > #contentWrapper")
        .find("#content > table")
        .find("tbody")
        .find(".js-scrollfix-bottom-rel")
        .find("table")
        .find("tbody")
        .find("tr")
        .find("td")
        .find("p")
        .html();
    const moduleDescription = convert(`${descriptionPath}`, {
        wordwrap: 130,
    });
    const description = moduleDescription.replace(/(\r\n|\n|\r)/gm, " ");
    const image = $(".wrapper > #contentWrapper")
        .find("#content > table")
        .find("tbody")
        .find("tr")
        .find("td[class='borderClass']")
        .find("a")
        .html()
        ?.trim();
    const imageArray = [];
    const $_imageArray = cheerio.load(`${image}`);
    $_imageArray("img").each((index, element) => {
        const imageSource = $(element).attr("data-src");
        imageArray.push(`${imageSource}`);
    });
    console.log(imageArray);
    const score = $(".wrapper > #contentWrapper")
        .find("#content > table")
        .find("tbody")
        .find(".js-scrollfix-bottom-rel")
        .find("table")
        .find("tbody")
        .find("tr")
        .find("td")
        .find(".pb16")
        .find(".mt12")
        .find(".anime-detail-header-stats")
        .find(".score")
        .text()
        .trim();
    const ranked = $(".wrapper > #contentWrapper")
        .find("#content > table")
        .find("tbody")
        .find(".js-scrollfix-bottom-rel")
        .find("table")
        .find("tbody")
        .find("tr")
        .find("td")
        .find(".pb16")
        .find(".mt12")
        .find(".anime-detail-header-stats")
        .find(".pt8")
        .find("span")
        .find("strong")
        .html();
    const popularity = $(".wrapper > #contentWrapper")
        .find("#content > table")
        .find("tbody")
        .find(".js-scrollfix-bottom-rel")
        .find("table")
        .find("tbody")
        .find("tr")
        .find("td")
        .find(".pb16")
        .find(".mt12")
        .find(".anime-detail-header-stats")
        .find(".pt8")
        .find("span.popularity")
        .find("strong")
        .html();
    const membersLists = $(".wrapper > #contentWrapper")
        .find("#content > table")
        .find("tbody")
        .find(".js-scrollfix-bottom-rel")
        .find("table")
        .find("tbody")
        .find("tr")
        .find("td")
        .find(".pb16")
        .find(".mt12")
        .find(".anime-detail-header-stats")
        .find(".pt8")
        .find("span.members")
        .find("strong")
        .html();
    const trailer = $("a.iframe.js-fancybox-video.video-unit.promotion").attr("href");
    let genres;
    const _id = getVideoId(`${trailer}`)?.id;
    const trailerLink = `https://www.youtube.com/watch?v=${_id}`;
    const broadcast = getFromBorder($, "Broadcast:");
    const type = getFromBorder($, "Type:");
    const japaneseTitle = getFromBorder($, "Japanese:");
    const episodes = getFromBorder($, "Episodes:");
    const durationPerEpisode = getFromBorder($, "Duration");
    const currentStatus = getFromBorder($, "Status:");
    genres = getFromBorder($, "Genres:");
    genres === "" ? (genres = getFromBorder($, "Genre:")) : genres;
    const animeSource = getFromBorder($, "Source:");
    const animeRating = getFromBorder($, "Rating:");
    const animeAired = getFromBorder($, "Aired:");
    const officialSite = $(".wrapper > #contentWrapper")
        .find("#content > table")
        .find("tbody")
        .find(".external_links")
        .find("a")
        .attr("href");
    const mainPlatformArray = [];
    $(".wrapper > #contentWrapper")
        .find("#content > table")
        .find("tbody")
        .find(".broadcasts")
        .find(".broadcast")
        .each((index, element) => {
        const $element = $(element);
        const allNames = $element.find("a").find(".caption").html();
        const allLinks = $element.find("a").attr("href");
        mainPlatformArray.push({
            siteName: `${allNames}`,
            siteURI: allLinks,
        });
    });
    const animeFavorites = getFromBorder($, "Favorites:");
    const picturesArray = await getPictures(`${uriToFetch}`);
    const producers = getFromBorder($, "Producers:");
    const clean = removeWhiteSpaces(producers);
    const a = clean.split(",");
    const animeTheme = getFromBorder($, "Theme:");
    const animeDemographic = getFromBorder($, "Demographic:");
    const allCharacters = await getCharacters(uriToFetch);
    const allEpisodes = await getEpisodes(uriToFetch);
    return {
        title,
        description,
        image: imageArray[0],
        score,
        ranked,
        popularityRanking: popularity,
        totalMembers: membersLists,
        trailer: trailerLink,
        broadcast,
        type,
        japaneseTitle,
        totalEpisodes: episodes,
        durationPerEpisode,
        currentStatus,
        genres,
        source: animeSource,
        rating: animeRating,
        airedOn: animeAired,
        officialSite,
        watchOn: mainPlatformArray,
        favorites: animeFavorites,
        pictures: picturesArray,
        producers: a,
        theme: animeTheme,
        demographic: animeDemographic,
        characters: allCharacters,
        episodes: allEpisodes,
    };
}
const getEpisodes = async (uri) => {
    const episodesArray = [];
    const baseURI = `${uri}/episode`;
    const rawBody = await got(baseURI);
    const body = await rawBody.body;
    const $ = cheerio.load(body);
    $(".wrapper")
        .find("#contentWrapper > #content")
        .find("tbody")
        .find("tr")
        .find("table")
        .each((index, element) => {
        $(element)
            .find("tr.episode-list-data")
            .each((index, e) => {
            const japaneseEpisodeTitle = $(e).find("span.di-ib").text();
            const englishEpisodeTitle = $(e).find("a.fw-b ").text();
            const airedDate = $(e).find("td.episode-aired").text();
            const voteAverage = $(e)?.find("span.value").text();
            episodesArray.push({
                airedOn: airedDate,
                englishTitle: englishEpisodeTitle,
                japaneseTitle: japaneseEpisodeTitle,
                voteAverage,
            });
        });
    });
    return episodesArray;
};
const getCharacters = async (uri) => {
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
};
const getPictures = async (uri) => {
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
};
const getFromBorder = ($, t) => {
    return $(`span:contains("${t}")`)
        .parent()
        .text()
        .trim()
        .split(" ")
        .slice(1)
        .join(" ")
        .split("\n")[0]
        .trim();
};
