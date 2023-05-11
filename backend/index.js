const express = require("express");
require("dotenv").config();
const path = require("path");
const axios = require("axios");

const app = express();

const example_res = {
  status: "ok",
  totalResults: 34,
  articles: [
    {
      source: { id: "the-washington-post", name: "The Washington Post" },
      author:
        "Shayna Jacobs, Devlin Barrett, Isaac Stanley-Becker, Perry Stein",
      title:
        "George Santos charged with 13 crimes including money laundering, fraud - The Washington Post",
      description:
        "Rep. George Santos (R-N.Y.) has been charged with federal crimes after a months-long investigation and is expected to appear in court on Long Island Wednesday.",
      url: "https://www.washingtonpost.com/national-security/2023/05/10/george-santos-charges/",
      urlToImage:
        "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/4UAYE3UTOVJDVNDA2XFVUDLMEU.jpg&w=1440",
      publishedAt: "2023-05-10T16:24:00Z",
      content:
        "Comment on this story\r\nComment\r\nCENTRAL ISLIP, New York Rep. George Santos, the freshman Republican congressman whose myriad falsehoods became both a scandal and a national punchline, was charged wit… [+10194 chars]",
    },
    {
      source: { id: "associated-press", name: "Associated Press" },
      author: "Munir Ahmed",
      title:
        "Pakistan's ex-PM Khan ordered detained amid unrest - The Associated Press",
      description:
        "ISLAMABAD (AP) — Former Pakistani Prime Minister Imran Khan can be held for eight days, a court ruled Wednesday, a day after the popular opposition leader was dragged from a courtroom and arrested on corruption charges , deepening the country's political turm…",
      url: "https://apnews.com/article/imran-khan-pakistan-arrest-unrest-9132cc405262531fc472c3f4eb1ea07e",
      urlToImage:
        "https://storage.googleapis.com/afs-prod/media/1c60b47c526b4000a7e558e7fbe4cc97/3000.webp",
      publishedAt: "2023-05-10T16:17:22Z",
      content:
        "ISLAMABAD (AP) Former Pakistani Prime Minister Imran Khan can be held for eight days, a court ruled Wednesday, a day after the popular opposition leader was dragged from a courtroom and arrested on c… [+7741 chars]",
    },
    {
      source: { id: null, name: "CNBC" },
      author: "Sarah Whitten",
      title:
        "Disney is set to report earnings after the bell — here's what to expect - CNBC",
      description:
        "Disney is in the process of laying off thousands of employees under CEO Bob Iger's restructuring plan.",
      url: "https://www.cnbc.com/2023/05/10/disney-dis-earnings-report-q2-2023.html",
      urlToImage:
        "https://image.cnbcfm.com/api/v1/image/107235002-1683136923705-gettyimages-1252568928-AFP_33EC8KL.jpeg?v=1683734472&w=1920&h=1080",
      publishedAt: "2023-05-10T16:01:12Z",
      content:
        "A writers strike, a feud in Florida and ongoing company-wide layoffs there is a lot more than quarterly earnings for CEO Bob Iger and the Walt Disney Company to address on Wednesday.\r\nAs the pandemic… [+1582 chars]",
    },
    {
      source: { id: "associated-press", name: "Associated Press" },
      author: "Seung Min Kim",
      title:
        "Biden ramps up pressure on House GOP in debt limit battle - The Associated Press",
      description:
        "WASHINGTON (AP) — Fresh off a White House meeting with no serious breakthrough on the debt limit standoff , President Joe Biden is launching a new phase of his pressure campaign against House Republicans as he makes his case that lawmakers should lift the nat…",
      url: "https://apnews.com/article/debt-limit-biden-mccarthy-18429bf22f147faed41c4925e14f61ba",
      urlToImage:
        "https://storage.googleapis.com/afs-prod/media/b8c4a2e4c55c4b59aaf96e2665eeab75/3000.webp",
      publishedAt: "2023-05-10T16:01:10Z",
      content:
        "WASHINGTON (AP) Fresh off a White House meeting with no serious breakthrough on the debt limit standoff, President Joe Biden is launching a new phase of his pressure campaign against House Republican… [+4806 chars]",
    },
    {
      source: { id: "the-verge", name: "The Verge" },
      author: "Emma Roth",
      title:
        "Another Pixel Fold ad leaks hours before Google's event - The Verge",
      description:
        "A leaked ad for the upcoming Google Pixel Fold shows off just how thin the phone is but also indicates that dual-screen support won’t be available at launch.",
      url: "https://www.theverge.com/2023/5/10/23718344/google-pixel-fold-leak-promo-delay-dual-screen-multitasking",
      urlToImage:
        "https://cdn.vox-cdn.com/thumbor/rAP_Uiqmhzo-kemEm6QWHUWt-N0=/0x0:2852x1546/1200x628/filters:focal(1426x773:1427x774)/cdn.vox-cdn.com/uploads/chorus_asset/file/24647324/google_pixel_fold_leak.png",
      publishedAt: "2023-05-10T15:44:29Z",
      content:
        "Another Pixel Fold ad leaks hours before Googles event\r\nAnother Pixel Fold ad leaks hours before Googles event\r\n / The ad shows off the devices multitasking features but also says that dual-screen su… [+1304 chars]",
    },
    {
      source: { id: null, name: "NASA" },
      author: "https://www.jpl.nasa.gov/",
      title:
        "NASA's Webb Takes Closest Look Yet at Mysterious Planet - NASA Jet Propulsion Laboratory",
      description:
        "A science team gains new insight into the atmosphere of a “mini-Neptune,” a class of planet common in the galaxy but about which little is known.",
      url: "https://www.jpl.nasa.gov/news/nasas-webb-takes-closest-look-yet-at-mysterious-planet",
      urlToImage:
        "https://d2pn8kiwq2w21t.cloudfront.net/original_images/1-HazyminiNeptune-16.jpg",
      publishedAt: "2023-05-10T15:37:28Z",
      content:
        "And while the planet is hot by human standards, it is much cooler than expected, Kempton noted. Thats because its unusually shiny atmosphere, which came as a surprise to the researchers, reflects a l… [+1810 chars]",
    },
    {
      source: { id: "cnn", name: "CNN" },
      author: "Ashley Strickland",
      title:
        "Webb telescope spies evidence of hidden planets around nearby star - WRAL News",
      description:
        "The James Webb Space Telescope observed massive belts of dust around a nearby star that suggest hidden planets are orbiting it.",
      url: "https://www.cnn.com/2023/05/08/world/webb-telescope-fomalhaut-belts-scn/index.html",
      urlToImage:
        "https://media.cnn.com/api/v1/images/stellar/prod/230508111211-james-webb-space-telescope-dusty-debris-fomalhaut.jpg?c=16x9&q=w_800,c_fill",
      publishedAt: "2023-05-10T15:37:03Z",
      content:
        "Sign up for CNNs Wonder Theory science newsletter. Explore the universe with news on fascinating discoveries, scientific advancements and more.\r\nAstronomers used the James Webb Space Telescope to obs… [+4082 chars]",
    },
    {
      source: { id: null, name: "The Guardian" },
      author: "Hannah Devlin",
      title:
        "Soap can make humans more attractive to mosquitoes, study finds - The Guardian",
      description:
        "Researchers say mosquitoes may be attracted to soap because when not feeding on blood they supplement sugar intake with nectar",
      url: "https://www.theguardian.com/environment/2023/may/10/soap-can-make-humans-more-attractive-mosquitoes-study",
      urlToImage:
        "https://i.guim.co.uk/img/media/2b079caff5d03b611e92580404b82d186322d24a/0_276_5076_3045/master/5076.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=736a9406014f6f9ed2c2eabbf99ce73e",
      publishedAt: "2023-05-10T15:33:00Z",
      content:
        "Lathering up with soap might seem a reasonable mosquito-evasion strategy on the basis that if they cant smell you, they cant bite you.\r\nHowever, a study suggests that rather than helping you go incog… [+2177 chars]",
    },
    {
      source: { id: "espn", name: "ESPN" },
      author: "Pete Thamel",
      title:
        "Sources - Bob Huggins to take $1M salary reduction for anti-gay slur - ESPN - ESPN",
      description:
        "West Virginia coach Bob Huggins is expected to return next season after he agreed to a million-dollar pay cut, a three-game regular-season suspension and sensitivity training in the wake of using an anti-gay slur in a radio interview.",
      url: "https://www.espn.com/mens-college-basketball/story/_/id/37595150/sources-bob-huggins-take-1m-salary-reduction-anti-gay-slur",
      urlToImage:
        "https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2023%2F0510%2Fr1171049_1296x729_16%2D9.jpg",
      publishedAt: "2023-05-10T14:41:00Z",
      content:
        "West Virginia basketball coach Bob Huggins is expected to return to the sideline next season in the wake of using an anti-gay slur in a radio interview earlier this week, sources told ESPN on Wednesd… [+2160 chars]",
    },
    {
      source: { id: "reuters", name: "Reuters" },
      author: null,
      title:
        "Russia's war on Ukraine latest: Russian infantry brigade near Bakhmut seriously damaged, Kyiv says - Reuters",
      description:
        "Ukraine's military said on Wednesday its forces had seriously <a href=\"/world/europe/ukraine-says-russian-brigade-seriously-damaged-bakhmut-still-moscows-top-target-2023-05-10/\">damaged</a> though not destroyed Russia's 72nd Separate Motor-rifle Brigade near …",
      url: "https://www.reuters.com/world/russias-war-ukraine-latest-eu-discuss-sanctions-chinese-iranian-firms-2023-05-10/",
      urlToImage:
        "https://www.reuters.com/resizer/hcmrTtEwSnzckZSqorfBH97hnJc=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/HRGT7CARTFOBDPLYJUGIQSVV3I.jpg",
      publishedAt: "2023-05-10T14:28:00Z",
      content:
        "May 10 (Reuters) - Ukraine's military said on Wednesday its forces had seriously damaged though not destroyed Russia's 72nd Separate Motor-rifle Brigade near Bakhmut, and that the eastern city remain… [+3031 chars]",
    },
    {
      source: { id: "cnn", name: "CNN" },
      author: "Lisa Respers France",
      title:
        "Andy Cohen says he’s ‘very surprised’ by Kim Zolciak and Kroy Biermann’s split - CNN",
      description:
        'Sounds like Andy Cohen was as shocked as viewers about "Real Housewives of Atlanta\'s" Kim Zolciak and Kroy Biermann parting ways.',
      url: "https://www.cnn.com/2023/05/10/entertainment/andy-cohen-kim-zolciak/index.html",
      urlToImage:
        "https://media.cnn.com/api/v1/images/stellar/prod/230510094443-01-bieramann-zolciak-file-2020.jpg?c=16x9&q=w_800,c_fill",
      publishedAt: "2023-05-10T14:11:00Z",
      content:
        "Sounds like Andy Cohen was as shocked as viewers about Real Housewives of Atlantas Kim Zolciak and Kroy Biermann parting ways.\r\nThe Bravo producer and host said on his show SiriusXMs Andy Cohen Live … [+1032 chars]",
    },
    {
      source: { id: "usa-today", name: "USA Today" },
      author: "Chris Bumbaca",
      title:
        "Who is playing in first-ever NFL Black Friday game? NY Jets play Miami Dolphins on Amazon - USA TODAY",
      description:
        "For the first time ever, the NFL will air a game on Black Friday. The New York Jets will face the Miami Dolphins on Amazon's Prime Video.",
      url: "https://www.usatoday.com/story/sports/nfl/2023/05/10/nfl-black-friday-game-2023-ny-jets-aaron-rodgers-vs-miami-dolphins/70202689007/",
      urlToImage:
        "https://www.gannett-cdn.com/presto/2023/05/02/USAT/941e6086-a036-4b2e-99e8-27c5b9402c21-USATSI_20542405.jpg?crop=2879,1620,x0,y360&width=2879&height=1620&format=pjpg&auto=webp",
      publishedAt: "2023-05-10T13:53:05Z",
      content:
        "The NFL owns Thanksgiving. In 2023, it will make its mark on the day after as well, with the inaugural Black Friday game that will air on Amazon's Prime Video.\r\nAnd the biggest acquisition of the off… [+1250 chars]",
    },
    {
      source: { id: "engadget", name: "Engadget" },
      author: null,
      title:
        "Vast and SpaceX plan to launch the first commercial space station in 2025 | Engadget - Engadget",
      description:
        "Vast is teaming with SpaceX to launch what could be the first commercial space station..",
      url: "https://www.engadget.com/vast-and-spacex-plan-to-launch-the-first-commercial-space-station-in-2025-134256156.html",
      urlToImage:
        "https://s.yimg.com/uu/api/res/1.2/znGlMV7cbD9.pYE6ueOmxA--~B/Zmk9ZmlsbDtoPTYzMDtweW9mZj0wO3c9MTIwMDthcHBpZD15dGFjaHlvbg--/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2023-05/8e1e4a70-ef2d-11ed-bef6-3f5e3276e76e.cf.jpg",
      publishedAt: "2023-05-10T13:43:37Z",
      content:
        "Another company is racing to launch the first commercial space station. Vast is partnering with SpaceX to launch its Haven-1 station as soon as August 2025. A Falcon 9 rocket will carry the platform … [+1356 chars]",
    },
    {
      source: { id: null, name: "BBC News" },
      author: "https://www.facebook.com/bbcnews",
      title:
        "Tucker Carlson: Former Fox anchor to launch new show on Twitter - BBC",
      description:
        "The former Fox host says a new version of his show is coming to the social media platform.",
      url: "https://www.bbc.com/news/world-us-canada-65536392",
      urlToImage:
        "https://ichef.bbci.co.uk/news/1024/branded_news/BFDB/production/_129651194_gettyimages-1332867180.jpg",
      publishedAt: "2023-05-10T13:38:58Z",
      content:
        "Ousted Fox News host Tucker Carlson has announced he is launching a new show on Twitter. \r\nThe announcement came in a video on the social media site two weeks after his sudden exit from Fox News.\r\nCa… [+2730 chars]",
    },
    {
      source: { id: "usa-today", name: "USA Today" },
      author: ", USA TODAY",
      title:
        "Ukraine, Russia live updates: Nuke plant issue could be 'catastrophic' - USA TODAY",
      description:
        "Russia plans to relocate more than 3,000 Ukrainian staff from the nuclear power plant in Zaporizhzhia, leaving Europe's largest nuke plant at risk.",
      url: "https://www.usatoday.com/story/news/world/2023/05/10/ukraine-russia-war-live-updates/70202441007/",
      urlToImage:
        "https://www.gannett-cdn.com/presto/2023/05/10/USAT/d0094da3-6821-4970-b8d9-c009794f7bf2-AFP_AFP_33ER6C9.jpg?auto=webp&crop=5999,3375,x0,y400&format=pjpg&width=1200",
      publishedAt: "2023-05-10T13:20:14Z",
      content:
        'Russia plans to relocate more than 3,000 Ukrainian staff from the nuclear power plant in Zaporizhzhia, leaving Europes largest nuclear plant with a "catastrophic lack of qualified personnel," Ukraine… [+2428 chars]',
    },
    {
      source: { id: "cnn", name: "CNN" },
      author: "Annie Grayer,Alayna Treene,Jeremy Herb,Sara Murray",
      title:
        "House Republicans allege Biden family members received millions in payments from foreign entities in new bank records report - CNN",
      description:
        "House Oversight Chairman James Comer laid out new details to support allegations that members of Joe Biden's family including his son Hunter received millions of dollars in payments from foreign entities in China and Romania including when Biden was vice pres…",
      url: "https://www.cnn.com/2023/05/10/politics/comer-bank-records-biden-family-members-payments-foreign-entities/index.html",
      urlToImage:
        "https://media.cnn.com/api/v1/images/stellar/prod/230119095717-james-comer-file.jpg?c=16x9&q=w_800,c_fill",
      publishedAt: "2023-05-10T13:14:00Z",
      content:
        "House Oversight Chairman James Comer laid out new details to support allegations that members of Joe Bidens family including his son Hunter received millions of dollars in payments from foreign entit… [+1956 chars]",
    },
    {
      source: { id: null, name: "Cosmopolitan.com" },
      author: "Mehera  Bonner",
      title:
        'Tom Cruise Is “Extremely Interested" in "Pursuing” Shakira and Sent Her Flowers - Cosmopolitan',
      description:
        'Prepare yourself for Tomkira, because "there is chemistry."',
      url: "https://www.cosmopolitan.com/entertainment/celebs/a43848830/tom-cruise-extremely-interested-shakira/",
      urlToImage:
        "https://hips.hearstapps.com/hmg-prod/images/actor-tom-cruise-and-colombian-singer-shakira-attend-the-news-photo-1683719206.jpg?crop=1xw:0.75xh;center,top&resize=1200:*",
      publishedAt: "2023-05-10T12:50:21Z",
      content:
        "So, you know how \r\nTom Cruise and Shakira were spotted hanging out at the Miami Grand Prixand spent time together in a VIP section? Here's a video in case you missed it and immediately need to witnes… [+1587 chars]",
    },
    {
      source: { id: "financial-times", name: "Financial Times" },
      author: "Nicholas Megaw",
      title:
        "US inflation eased to 4.9% in April as Fed tightening takes effect - Financial Times",
      description:
        "News, analysis and comment from the Financial Times, the worldʼs leading global business publication",
      url: "https://www.ft.com/content/38c56ada-dba3-425b-9d5e-5494d12a3877",
      urlToImage: null,
      publishedAt: "2023-05-10T12:37:53Z",
      content:
        "What is included in my trial?\r\nDuring your trial you will have complete digital access to FT.com with everything in both of our Standard Digital and Premium Digital packages.\r\nStandard Digital includ… [+1494 chars]",
    },
    {
      source: { id: null, name: "CBS Sports" },
      author: "",
      title:
        "2023 NFL schedule: International slate includes back-to-back Jaguars games in London, two games in Germany - CBS Sports",
      description:
        "The NFL revealed the international schedule for the 2023 season",
      url: "https://www.cbssports.com/nfl/news/2023-nfl-schedule-international-slate-includes-back-to-back-jaguars-games-in-london-two-games-in-germany/",
      urlToImage:
        "https://sportshub.cbsistatic.com/i/r/2022/12/13/fb4419b0-fefb-41d4-b342-a868a40988c2/thumbnail/1200x675/88e5b03e2a3ad94cc4a59f7d428898d3/usatsi-trevor-lawrence-jaguars-1.jpg",
      publishedAt: "2023-05-10T12:34:00Z",
      content:
        "The NFL has announced its slate of international games for the 2023 season. For the first time ever, a team will play consecutive games overseas, and the schedule also features two games in Germany f… [+1315 chars]",
    },
    {
      source: { id: null, name: "Eonline.com" },
      author: "Jess Cohen",
      title: "Robert De Niro Speaks Out After Welcoming Baby No. 7 - E! NEWS",
      description:
        "After Robert De Niro revealed he recently welcomed his seventh baby, the Oscar winner stepped out on May 9 for the New York premiere of his new film, coincidentally titled, About My Father.",
      url: "https://www.eonline.com/news/1373958/robert-de-niro-speaks-out-after-welcoming-baby-no-7",
      urlToImage:
        "https://akns-images.eonline.com/eol_images/Entire_Site/2023410/rs_1200x1200-230510041930-1200-Robert_De_Niro.jpg?fit=around%7C1080:1080&output-quality=90&crop=1080:1080;center,top",
      publishedAt: "2023-05-10T12:08:00Z",
      content:
        "Robert De Niro might be a pro at parenting, but he knows it's not the easiest job.\r\nWhile attending the New York premiere of his new movieaptly titled About My Fatherthe 79-year-old, who recently wel… [+659 chars]",
    },
  ],
};

const NEWS_API_KEY = process.env.NEWS_API_KEY;

app.get("/api/news", (req, res) => {
//   base_url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;
//   if (req.query.keyword) {
//     base_url += `&q=${req.query.keyword}`;
//   }
//   if (req.query.category) {
//     base_url += `&category=${req.query.category}`;
//   }
//   axios.get(base_url).then((response) => {
//     console.log(response.data);
//     res.json(response.data);
//   });
  res.json(example_res);
  // res.json({base_url});
});

app.use(express.static(path.join(__dirname, "public")));
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.listen(process.env.PORT || 3000);