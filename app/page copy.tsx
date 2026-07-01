'use client';

import React, { useEffect, useState } from 'react';
import RewadPopup from '@/components/RewadPopup'
declare global {
  interface Window {
	googletag: any;
	geoTarget: any;
  }
}

export default function Home() {

	const playGame = (url: string) => {
		// console.log(url);
		window.location.href = "https://xpbattlehub.com/games/" + url;
	}

	const [showRewardPopup, setShowRewardPopup] = useState(false);

	useEffect(() => {
		(window as any).googletag = (window as any).googletag || { cmd: [] };
		const googletag = (window as any).googletag;
		let displaySlots = [];

		googletag.cmd.push(function() {
			try {
				displaySlots[0] = googletag.defineSlot("/23334516659/h5_1", [[300, 250], [336, 280], [300, 600], [320, 480], [250, 250]], "div-gpt-ad-123456789-1").addService(googletag.pubads());
				

				googletag.pubads().addEventListener('slotRenderEnded', (event: any) => {});
				googletag.pubads().enableSingleRequest();
				googletag.pubads().collapseEmptyDivs();
				googletag.pubads().enableLazyLoad({
					fetchMarginPercent: 100,
					renderMarginPercent: 50,
					mobileScaling: 2.0
				});
				googletag.enableServices();
			} catch (error) {
				console.error('Ad initialization error:', error);
			}
		});

		setTimeout(() => {
			showRewardAd();
			googletag.cmd.push(function() {
				googletag.display("div-gpt-ad-123456789-1");
			});
		}, 1000);
	}, []);

	const showInterstitial = (nextPath: any) => {
		(window as any).googletag = (window as any).googletag || { cmd: [] };
    	const googletag = (window as any).googletag;
		googletag.cmd.push(() => {
			try {
				const pubads = googletag.pubads();

				const interstitialSlot = googletag.defineOutOfPageSlot(
					"/23334516659/h5_3",
					googletag.enums.OutOfPageFormat.INTERSTITIAL,
				);

				if (interstitialSlot) {
					interstitialSlot.addService(googletag.pubads()).setConfig({
						interstitial: {
							triggers: {
								navBar: true,
								unhideWindow: true,
							},
						},
					});

					// ✅ Called after ad finishes rendering (or fails)
					pubads.addEventListener("slotRenderEnded", (event: any) => {
						if (event.slot === interstitialSlot) {
							if (!event.isEmpty) {
								console.log("Interstitial ad rendered");
							} else {
								console.warn("Interstitial ad failed to load");
								if (nextPath) {
									playGame(nextPath); // ✅ Your function runs here
								}
								else{
									window.location.href = "https://xpbattlehub.com/"
								}
							}
						}
					});

					googletag.pubads().addEventListener("slotOnload", (event: any) => {
						if (interstitialSlot === event.slot) {}
					});

					// When ad is closed or hidden
					pubads.addEventListener("slotVisibilityChanged", (event: any) => {
						if (event.slot === interstitialSlot && event.inViewPercentage === 0) {
							console.log("Interstitial closed");
							if (nextPath) {
								playGame(nextPath); // ✅ Your function runs here
							}
							else{
								window.location.href = "https://xpbattlehub.com/"
							}
						}
					});
				}
				else {
					if (nextPath) {
						playGame(nextPath); // ✅ Your function runs here
					}
					else{
						window.location.href = "https://xpbattlehub.com/"
					}
				}

				// Enable SRA and services.
				googletag.pubads().enableSingleRequest();
				googletag.enableServices();
				googletag.display(interstitialSlot);
			} catch (e) {
				console.error("Interstitial ad failed due to exception:", e);
				if (nextPath) {
					playGame(nextPath); // ✅ Your function runs here
				}
			}
		});
    };

	const showRewardAd = () => {
		if (!window.googletag || !window.googletag.cmd) {
			console.error("Google Ad Manager is not properly initialized.");
			return; 
		}

		window.googletag.cmd.push(function () {
			try {
				const rewardedSlot = window.googletag
					.defineOutOfPageSlot('/23334516659/h5_4', window.googletag.enums.OutOfPageFormat.REWARDED)
					.addService(window.googletag.pubads());

				window.googletag.enableServices();
				window.googletag.display(rewardedSlot);
				console.log("Attempting to display rewarded ad...");

				window.googletag.pubads().addEventListener("rewardedSlotReady", function (evt: any) {
					console.log("Rewarded ad ready.");
					evt.makeRewardedVisible();
				});

				window.googletag.pubads().addEventListener("rewardedSlotClosed", function () {
					console.log("Ad closed.");
					window.googletag.destroySlots([rewardedSlot]);
					setShowRewardPopup(false);
				});
			} catch (error) {
			  	console.error("Error during ad setup:", error);
			}
		});
	}

	return (
		<>
		<div className="w-full md:w-[400px] bg-main h-full border-x-1 border-gray-600">
			{ showRewardPopup && <RewadPopup showRewardAd={showRewardAd} /> }
			<div className="flex justify-center items-center">
				<div id="div-gpt-ad-123456789-1" style={{ minWidth: '250px', minHeight: '250px', width: 'fit-content', display: 'flex', justifyContent: 'center' }} />
			</div>
			<div className="m-5 p-5 border border-gray-600 bg-blue-200/10 rounded-xl shadow-lg/10 text-center">
				<div className="text-sm text-center text-gray-400">Redeem rewards to play free games</div>
				<button className="bg-indigo-400 rounded-md w-full py-2 text-white font-semibold text-md mt-2 shadow-lg/10 cursor-pointer" onClick={() => showInterstitial("")}>Lets Play 🔥</button>
			</div>
			<div className="grid grid-cols-2 gap-4 mx-5">
				<div className="flex flex-col justify-center items-center mb-5 border border-gray-600 bg-blue-200/10 rounded-3xl p-2 shadow-lg/10 text-center" onClick={() => showInterstitial('block-solver')}>
					<img src="/block-solver.webp" className="rounded-4xl" />
					<div className="mt-2 text-white uppercase font-semibold tracking-tight text-xs">Block Solver</div>
					<button className="bg-indigo-400 rounded-md w-5/6 py-2 text-white font-semibold text-sm my-2 shadow-lg/10 cursor-pointer tracking-tight">Play Now</button>
				</div>
				<div className="flex flex-col justify-center items-center mb-5 border border-gray-600 bg-blue-200/10 rounded-3xl p-2 shadow-lg/10 text-center" onClick={() => showInterstitial('brick-out')}>
					<img src="/brick-out.webp" className="rounded-4xl" />
					<div className="mt-2 text-white uppercase font-semibold tracking-tight text-xs">Brick Out</div>
					<button className="bg-indigo-400 rounded-md w-5/6 py-2 text-white font-semibold text-sm my-2 shadow-lg/10 cursor-pointer tracking-tight">Play Now</button>
				</div>
				<div className="flex flex-col justify-center items-center mb-5 border border-gray-600 bg-blue-200/10 rounded-3xl p-2 shadow-lg/10 text-center" onClick={() => showInterstitial('castle-crusaders')}>
					<img src="/castle-crusaders.webp" className="rounded-4xl" />
					<div className="mt-2 text-white uppercase font-semibold tracking-tight text-xs">Castle Crusaders</div>
					<button className="bg-indigo-400 rounded-md w-5/6 py-2 text-white font-semibold text-sm my-2 shadow-lg/10 cursor-pointer tracking-tight">Play Now</button>
				</div>
				<div className="flex flex-col justify-center items-center mb-5 border border-gray-600 bg-blue-200/10 rounded-3xl p-2 shadow-lg/10 text-center" onClick={() => showInterstitial('card-master')}>
					<img src="/card-master.webp" className="rounded-4xl" />
					<div className="mt-2 text-white uppercase font-semibold tracking-tight text-xs">Card Master</div>
					<button className="bg-indigo-400 rounded-md w-5/6 py-2 text-white font-semibold text-sm my-2 shadow-lg/10 cursor-pointer tracking-tight">Play Now</button>
				</div>
				<div className="flex flex-col justify-center items-center mb-5 border border-gray-600 bg-blue-200/10 rounded-3xl p-2 shadow-lg/10 text-center" onClick={() => showInterstitial('drop-the-number')}>
					<img src="/drop-the-number.webp" className="rounded-4xl" />
					<div className="mt-2 text-white uppercase font-semibold tracking-tight text-xs">Drop the Number</div>
					<button className="bg-indigo-400 rounded-md w-5/6 py-2 text-white font-semibold text-sm my-2 shadow-lg/10 cursor-pointer tracking-tight">Play Now</button>
				</div>
				<div className="flex flex-col justify-center items-center mb-5 border border-gray-600 bg-blue-200/10 rounded-3xl p-2 shadow-lg/10 text-center" onClick={() => showInterstitial('magnet-fun')}>
					<img src="/magnet-fun.webp" className="rounded-4xl" />
					<div className="mt-2 text-white uppercase font-semibold tracking-tight text-xs">Magnet Fun</div>
					<button className="bg-indigo-400 rounded-md w-5/6 py-2 text-white font-semibold text-sm my-2 shadow-lg/10 cursor-pointer tracking-tight">Play Now</button>
				</div>
				<div className="flex flex-col justify-center items-center mb-5 border border-gray-600 bg-blue-200/10 rounded-3xl p-2 shadow-lg/10 text-center" onClick={() => showInterstitial('crystal-crush')}>
					<img src="/crystal-crush.webp" className="rounded-4xl" />
					<div className="mt-2 text-white uppercase font-semibold tracking-tight text-xs">Crystal Crush</div>
					<button className="bg-indigo-400 rounded-md w-5/6 py-2 text-white font-semibold text-sm my-2 shadow-lg/10 cursor-pointer tracking-tight">Play Now</button>
				</div>
				<div className="flex flex-col justify-center items-center mb-5 border border-gray-600 bg-blue-200/10 rounded-3xl p-2 shadow-lg/10 text-center" onClick={() => showInterstitial('fruit-slasher')}>
					<img src="/fruit-slasher.webp" className="rounded-4xl" />
					<div className="mt-2 text-white uppercase font-semibold tracking-tight text-xs">Fruit Slasher</div>
					<button className="bg-indigo-400 rounded-md w-5/6 py-2 text-white font-semibold text-sm my-2 shadow-lg/10 cursor-pointer tracking-tight">Play Now</button>
				</div>
				<div className="flex flex-col justify-center items-center mb-5 border border-gray-600 bg-blue-200/10 rounded-3xl p-2 shadow-lg/10 text-center" onClick={() => showInterstitial('magical-match')}>
					<img src="/magical-match.webp" className="rounded-4xl" />
					<div className="mt-2 text-white uppercase font-semibold tracking-tight text-xs">Magical Match</div>
					<button className="bg-indigo-400 rounded-md w-5/6 py-2 text-white font-semibold text-sm my-2 shadow-lg/10 cursor-pointer tracking-tight">Play Now</button>
				</div>
				<div className="flex flex-col justify-center items-center mb-5 border border-gray-600 bg-blue-200/10 rounded-3xl p-2 shadow-lg/10 text-center" onClick={() => showInterstitial('germ-killar')}>
					<img src="/germ-killar.webp" className="rounded-4xl" />
					<div className="mt-2 text-white uppercase font-semibold tracking-tight text-xs">Germ Killar</div>
					<button className="bg-indigo-400 rounded-md w-5/6 py-2 text-white font-semibold text-sm my-2 shadow-lg/10 cursor-pointer tracking-tight">Play Now</button>
				</div>
			</div>
			<div className="text-center">
				<button className="bg-indigo-400 rounded-xl w-5/6 py-2 text-white font-semibold text-md mt-2 shadow-lg/10 cursor-pointer" onClick={() => showInterstitial("")}>More Games</button>
			</div>
			<div className='my-4'>
				<p className="text-center text-lg font-semibold">About xpbattlehub</p>
				<div className="mt-2 mx-5">
					<p>Play free games online at xpbattlehub.com and enjoy endless fun! Choose from a variety of genres, including puzzle games, card games, adventure games, sports games, racing games, and car games.</p>
					<br />
					<p>Dive into the smooth gameplay of free HTML5 games online and create unforgettable memories. Start playing now and discover the excitement!</p>
					<br />
					<p>Each free game features unique, well-designed levels filled with exciting challenges. Playing is easy and fun, but mastering it requires skill and strategy!</p>
					<br />
					<p>Stay tuned for more thrilling levels and updates to our free online games more fun is on the way!</p>
				</div>
			</div>
			<footer className="flex mx-5 border-t py-2 justify-between">
				<a href="#">Privacy Policy</a>
				<span>xpbattlehub.com</span>
			</footer>
		</div>
		</>
	);
}
