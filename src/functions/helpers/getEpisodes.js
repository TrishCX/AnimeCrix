import cheerio from "cheerio";
import got from "got";
export default async function getEpisodes(uri) {
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
}
