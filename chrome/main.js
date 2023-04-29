// (async () => {
// 	const src = chrome.runtime.getURL('./chrome/script.js');
// 	const _ = await import(src);
// })();

// chrome.runtime.onInstalled.addListener((_reason) => {
// 	chrome.tabs.create({
// 	  url: 'demo/index.html'
// 	});
//   });
// import { ClearCache, DefaultOptions, BlockQueue, SetBlockQueue, SetOptions, HandleInstructionsResponse, HandleHomeTimeline } from '../shared.js';
// SetBlockQueue(new BlockQueue(chrome.storage.local));
const TwitterRegex = /^https?:\/\/(?:\w+\.)?twitter.com/;

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (TwitterRegex.exec(tab.url)) {
		chrome.scripting.executeScript({
			target: { tabId : tabId },
			files: ['./inject.js'],
			world: "MAIN",
		})
		.then(() => console.log("script injected"))
		.catch(e => console.error(e));
	}
})

// chrome.webRequest.onCompleted.addListener(
// 	function (e) {
// 		console.log(e);
// 		// ClearCache();

// 		// // retrieve option
// 		// chrome.storage.sync.get(DefaultOptions, items => {
// 		// 	SetOptions(items);
// 		// 	const body = JSON.parse(e.detail.body);

// 		// 	switch (e.detail.parsedUrl[1]) {
// 		// 		case "HomeLatestTimeline":
// 		// 		case "HomeTimeline":
// 		// 		case "UserTweets":
// 		// 		case "TweetDetail":
// 		// 			return HandleInstructionsResponse(e, body);
// 		// 		case "timeline/home.json":
// 		// 			return HandleHomeTimeline(e, body);
// 		// 		default:
// 		// 			console.error("found an unexpected url that we don't know how to handle:", e.detail.url);
// 		// 	}
// 		// });
// 	},
// 	{
// 		urls: [
// 			"*://*.twitter.com/*",
// 			"*://twitter.com/*"
// 		],
// 	},
// );
