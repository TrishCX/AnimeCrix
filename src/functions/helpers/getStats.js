import cheerio from "cheerio";
import { superscript } from "numbers-to-superscript";
import pretty from "pretty";
import got from "got";
import getFromSpan from "./getFromSpan.js";
export default async function getStats(uri) {
    const baseURI = `${uri}/stats`;
    const request = await got(baseURI);
    const rawBody = request.body;
    const body = pretty(rawBody);
    const $ = cheerio.load(body);
    const watching = getFromSpan($, "Watching:");
    const completed = getFromSpan($, "Completed:");
    const onHold = getFromSpan($, "On-Hold:");
    const dropped = getFromSpan($, "Dropped:");
    const planToWatch = getFromSpan($, "Plan to Watch:")
        .replace("to Watch:", "")
        .trim();
    const total = getFromSpan($, "Total:");
    const score = getFromSpan($, "Score:");
    const ranked = getRanked($, "Ranked:");
    const popularity = getFromSpan($, "Popularity:");
    const result = {
        completed,
        onGoingWatching: watching,
        onHold,
        dropped,
        planToWatch,
        totalScore: score,
        overallScore: total,
        popularity,
        ranked,
    };
    return result;
}
const getRanked = ($, t) => {
    const superScriptNumber = $(`span:contains("${t}")`)
        .parent()
        .find("sup")
        .html();
    const sNumber = superscript(typeof superScriptNumber !== "string"
        ? `${superScriptNumber}`
        : superScriptNumber);
    const mainElement = $(`span:contains("${t}")`)
        .parent()
        .text()
        .trim()
        .split(" ")
        .slice(1)
        .join(" ")
        .split("\n")[0]
        .trim();
    const el = `${mainElement}${sNumber || ""}`;
    return el;
};
