import getStats from "../helpers/getStats.js";
import getInformation from "../base/getInformation.js";
export default async function getStatsOnly(name) {
    const uriToFetch = await getInformation(name || `${name}`);
    const result = await getStats(`${uriToFetch}`);
    return result;
}
