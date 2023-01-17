<h1 align="center">Anime-Gen</h1>
<p align="center">Flexible & Restful anime api fetching information from <a href="https://myanimelist.net/">MyAnimeList.</a></p>
<p align="center">
    <img
        src="https://www.kindpng.com/picc/m/70-706026_freetoedit-animeboy-blackhair-greeneyes-anime-boy-black-anime.png" alt="Freetoedit Animeboy Blackhair Greeneyes Anime"
        style="
            width: 150px
        "
    />
  <p align="center">
  <a href="http://forthebadge.com/" target="_blank">
    <img src="http://forthebadge.com/images/badges/built-with-love.svg"/>
  </a>
</p>

<p align="center">
  <a href="http s://standardjs.com/" target="_blank">
    <img src="https://cdn.rawgit.com/feross/standard/master/badge.svg" />
  </a>
  
</p>

<p align="center">

  <p align="center">
    <a href="https://github.com/riimuru/gogoanime/actions/workflows/docker-build.yml">
      <img src="https://github.com/riimuru/gogoanime/actions/workflows/docker-build.yml/badge.svg" alt="stars">
    </a>
     <a href="https://github.com/riimuru/gogoanime/actions/workflows/codeql-analysis.yml">
      <img src="https://github.com/riimuru/gogoanime/actions/workflows/codeql-analysis.yml/badge.svg" alt="stars">
    </a>
  <a href="https://codecov.io/gh/Kylart/MalScraper" target="_blank">
    <img src="https://codecov.io/gh/Kylart/MalScraper/branch/master/graph/badge.svg" alt="Codecov" />
  </a>
        <a href="https://github.com/consumet/extensions/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/consumet/extensions" alt="GitHub">
    </a>
  </p>
</p>

# Installation

### Local Machine

#####

- Clone the github repository, and simply install the dependencies.

```bash
  $ git clone https://github.com/TrishCX/AnimeCrix
 cd AnimeCrix
 npm install # using yarn? --> yarn run dev
```

- Starting up the development server.

```bash
 $ npm run dev # using yarn? --> yarn run dev
```

Server

| Port   | Number            | Default |
| ------ | ----------------- | ------- |
| Number | <code>9000</code> | 9000    |

</p>

- The initial port is 9000, the development server will be up on now: [http://localhost:9000](http://localhost:9000/v1/)

### Heroku

_Host the project on heroku._

[![Deploy on Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/TrishCX/AnimeCrix/tree/main)

### Render

_Host the project on render._

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/TrishCX/AnimeCrix)

### Replit

_Try the project on replit._

  <a href="https://replit.com/@mynoislitaf/Anime-Gen" target="_blank">
    <img src="https://img.shields.io/badge/Replit-DD1200?style=for-the-badge&logo=Replit&logoColor=white"
    style="width: 140px;"
     />
  </a>
  
<h1 align="center">Examples</h1>
<h2>Statistics :- </h2>

```ts
const baseName = "Death Note";
const request = await fetch(
	`https://anime-gen.mynoislitaf.repl.co/v1/information/stats?baseName=${baseName}`
); // Replace with your own uri.
const response = await request.json();
console.log(response);

// Output
//   {
//   completed: '2,991,760',
//   onGoingWatching: '178,834',
//   onHold: '102,634',
//   dropped: '109,897',
//   planToWatch: '219,381',
//   totalScore: '8.621 (scored by 25439952,543,995 users)',
//   overallScore: '3,602,506',
//   popularity: '#2',
//   ranked: '#782²'
// }
```

<h2>Characters -:</h2>

```ts
const baseName = "Death Note";
const request = await fetch(
	`https://anime-gen.mynoislitaf.repl.co/v1/information/characters?baseName=${baseName}`
);
const response = await request.json();
console.log(response);

//Output

// {
// 	characters: [
// 		{
// 			images:
// 				"https://cdn.myanimelist.net/r/42x62/images/characters/10/249647.jpg?s=95cecc21f3db10318c68a0863f0132c8",
// 			name: "Lawliet, L",
// 			favorites: "122,113 Favorites",
// 			role: "Main",
// 		},
// 		{
// 			images:
// 				"https://cdn.myanimelist.net/r/42x62/images/characters/10/59125.jpg?s=e258ccc6e6f6ed00c837b5ae8bced941",
// 			name: "Ryuk",
// 			favorites: "11,903 Favorites",
// 			role: "Main",
// 		},
// 		{
// 			images:
// 				"https://cdn.myanimelist.net/r/42x62/images/characters/2/470067.jpg?s=0b808cc428cb60c13fb75178fe6f854f",
// 			name: "Yagami, Souichirou",
// 			favorites: "146 Favorites",
// 			role: "Main",
// 		},
// 		{
// 			images:
// 				"https://cdn.myanimelist.net/r/42x62/images/characters/6/63870.jpg?s=3adaed92c13123a9649ccc0cc6551f7d",
// 			name: "Yagami, Light",
// 			favorites: "91,959 Favorites",
// 			role: "Main",
// 		},
// 		{
// 			images:
// 				"https://cdn.myanimelist.net/r/42x62/images/characters/11/206675.jpg?s=4c7b666683ee1f79ce6a727b3aa92f85",
// 			name: "Aizawa, Yumi",
// 			favorites: "2 Favorites",
// 			role: "Supporting",
// 		},
// 		{
// 			images:
// 				"https://cdn.myanimelist.net/r/42x62/images/characters/9/206679.jpg?s=e6580fe00d043400733fd69018f96063",
// 			name: "Aizawa, Eriko",
// 			favorites: "0 Favorites",
// 			role: "Supporting",
//             },
// 80+ more...
```

<h2>Pictures -:</h2>

```ts
const baseName = "Death Note";
const request = await fetch(
	`https://anime-gen.mynoislitaf.repl.co/v1/information/pictures?baseName=${baseName}`
);
const response = await request.json();
console.log(response);

//Output
// {
// 	images: [
// 		"https://cdn.myanimelist.net/images/anime/9/9453l.jpg",
// 		"https://cdn.myanimelist.net/images/anime/7/20451l.jpg",
// 		"https://cdn.myanimelist.net/images/anime/9/21498l.jpg",
// 		"https://cdn.myanimelist.net/images/anime/3/22530l.jpg",
// 		"https://cdn.myanimelist.net/images/anime/3/22531l.jpg",
// 		"https://cdn.myanimelist.net/images/anime/13/22532l.jpg",
// 		"https://cdn.myanimelist.net/images/anime/1528/107948l.jpg",
// 		"https://cdn.myanimelist.net/images/anime/1001/121564l.jpg",
// 	];
// }
```

<h2>Complete Information -:</h2>

```ts
const baseName = "Death Note";
const request = await fetch(
	`https://anime-gen.mynoislitaf.repl.co/v1/information/anime?name=${baseName}`
);
const response = await request.json();
console.log(response);

// Ouput
// {
//   title: 'Death Note',
//   description: `Brutal murders, petty thefts, and senseless violence pollute the human world. In contrast, the realm of death gods is a humdrum, unchanging gambling den... [Read more]`,
//   image: 'https://cdn.myanimelist.net/images/anime/9/9453.jpg',
//   score: '8.62',
//   ranked: '#78',
//   popularityRanking: '#2',
//   totalMembers: '3,602,506',
//   trailer: 'https://www.youtube.com/watch?v=Vt_3c8BgxV4',
//   broadcast: 'Wednesdays at 00:56 (JST)',
//   type: 'TV',
//   japaneseTitle: 'デスノート',
//   totalEpisodes: '37',
//   durationPerEpisode: '23 min. per ep.',
//   currentStatus: 'Finished Airing',
//   genres: 'SupernaturalSupernatural, SuspenseSuspense',
//   source: 'Manga',
//   rating: 'R - 17+ (violence & profanity)',
//   airedOn: 'Oct 4, 2006 to Jun 27, 2007',
//   officialSite: 'http://www.ntv.co.jp/deathnote/',
//   watchOn: [
//     {
//       siteName: 'Crunchyroll',
//       siteURI: 'http://www.crunchyroll.com/series-278866'
//     },
//     {
//       siteName: 'Funimation',
//       siteURI: 'https://www.funimation.com/shows/death-note-2'
//     },
//     {
//       siteName: 'Netflix',
//       siteURI: 'https://www.netflix.com/title/70204970'
//     },
//     {
//       siteName: 'Shahid',
//       siteURI: 'https://shahid.mbc.net/en/series/Death-Note/series-913256'
//     }
//   ],
//   favorites: '163,380',
//   pictures: [
//     'https://cdn.myanimelist.net/images/anime/9/9453l.jpg',
//     'https://cdn.myanimelist.net/images/anime/7/20451l.jpg',
//     'https://cdn.myanimelist.net/images/anime/9/21498l.jpg',
//     'https://cdn.myanimelist.net/images/anime/3/22530l.jpg',
//     'https://cdn.myanimelist.net/images/anime/3/22531l.jpg',
//     'https://cdn.myanimelist.net/images/anime/13/22532l.jpg',
//     'https://cdn.myanimelist.net/images/anime/1528/107948l.jpg',
//     'https://cdn.myanimelist.net/images/anime/1001/121564l.jpg'
//   ],
//   producers: [
//     'VAP',
//     'Konami',
//     'AshiProductions',
//     'NipponTelevisionNetwork',
//     'Shueisha'
//   ],
//   theme: 'PsychologicalPsychological',
//   demographic: 'ShounenShounen',
//   characters: [
//     {
//       images: 'https://cdn.myanimelist.net/r/42x62/images/characters/10/249647.jpg?s=95cecc21f3db10318c68a0863f0132c8',
//       name: 'Lawliet, L',
//       favorites: '122,113 Favorites',
//       role: 'Main'
//     },
//     {
//       images: 'https://cdn.myanimelist.net/r/42x62/images/characters/10/59125.jpg?s=e258ccc6e6f6ed00c837b5ae8bced941',
//       name: 'Ryuk',
//       favorites: '11,903 Favorites',
//       role: 'Main'
//     },
//     {
//       images: 'https://cdn.myanimelist.net/r/42x62/images/characters/2/470067.jpg?s=0b808cc428cb60c13fb75178fe6f854f',
//       name: 'Yagami, Souichirou',
//       favorites: '146 Favorites',
//       role: 'Main'
//     },
//     {
//       images: 'https://cdn.myanimelist.net/r/42x62/images/characters/6/63870.jpg?s=3adaed92c13123a9649ccc0cc6551f7d',
//       name: 'Yagami, Light',
//       favorites: '91,959 Favorites',
//       role: 'Main'
//     },
// 60+ more...
//   ],
//   episodes: [
//     {
//       airedOn: 'Oct 4, 2006',
//       englishTitle: 'Rebirth',
//       japaneseTitle: 'Shinsei (新生)',
//       voteAverage: '4.5'
//     },
//     {
//       airedOn: 'Oct 11, 2006',
//       englishTitle: 'Confrontation',
//       japaneseTitle: 'Taiketsu (対決)',
//       voteAverage: '4.7'
//     },
//     {
//       airedOn: 'Oct 18, 2006',
//       englishTitle: 'Dealings',
//       japaneseTitle: 'Torihiki (取引)',
//       voteAverage: '4.6'
//     },
//     {
//       airedOn: 'Oct 25, 2006',
//       englishTitle: 'Pursuit',
//       japaneseTitle: 'Tsuiseki (追跡)',
//       voteAverage: '4.7'
//     },
//20+ more...
//   ]
// }
```

<h1>License</h1>
 MIT
