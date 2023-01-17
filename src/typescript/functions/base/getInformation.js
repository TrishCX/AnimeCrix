import got from "got";
import pretty from "pretty";
import cheerio from "cheerio";
import getHrefs from "get-hrefs";
export default async function getInformation(animeName) {
    const request = await got(`https://myanimelist.net/search/all?cat=all&q=${animeName}`);
    const rawBody = request.body;
    const body = pretty(rawBody);
    const $ = cheerio.load(body);
    const articles = $("article");
    const info = articles.find(".information");
    const icon = info.find(".icon-watch2");
    const _uri = getHrefs(`${icon.html()}`)[0];
    const uri = _uri.replace("/video", "");
    return typeof uri !== "string" ? undefined || null : uri;
}
