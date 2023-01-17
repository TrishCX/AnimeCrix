export default function getFromSpan($, t) {
    return $(`span:contains("${t}")`)
        .parent()
        .text()
        .trim()
        .split(" ")
        .slice(1)
        .join(" ")
        .split("\n")[0]
        .trim();
}
