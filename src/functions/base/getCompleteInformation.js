import cheerio from "cheerio";
import got from "got";
import pretty from "pretty";
import { convert } from "html-to-text";
import removeWhiteSpaces from "remove-whitespace";
import getVideoId from "get-video-id";
import getInformation from "./getInformation.js";
import getCharacters from "../helpers/getCharacters.js";
import getFromSpan from "../helpers/getFromSpan.js";
import getPictures from "../helpers/getPictures.js";
import getEpisodes from "../helpers/getEpisodes.js";
export default async function getCompleteInformation(name) {
    const uriToFetch = await getInformation(`${name}`);
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
    const broadcast = getFromSpan($, "Broadcast:");
    const type = getFromSpan($, "Type:");
    const japaneseTitle = getFromSpan($, "Japanese:");
    const episodes = getFromSpan($, "Episodes:");
    const durationPerEpisode = getFromSpan($, "Duration");
    const currentStatus = getFromSpan($, "Status:");
    genres = getFromSpan($, "Genres:");
    genres === "" ? (genres = getFromSpan($, "Genre:")) : genres;
    const animeSource = getFromSpan($, "Source:");
    const animeRating = getFromSpan($, "Rating:");
    const animeAired = getFromSpan($, "Aired:");
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
    const animeFavorites = getFromSpan($, "Favorites:");
    const picturesArray = await getPictures(`${uriToFetch}`);
    const producers = getFromSpan($, "Producers:");
    const clean = removeWhiteSpaces(producers);
    const a = clean.split(",");
    const animeTheme = getFromSpan($, "Theme:");
    const animeDemographic = getFromSpan($, "Demographic:");
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
