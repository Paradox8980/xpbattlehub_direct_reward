'use client';

import React, { useEffect, useState } from 'react';
import RewadPopup from '@/components/RewadPopup'
declare global {
  interface Window {
	googletag: any;
	geoTarget: any;
  }
}

type Props = {
  showInterstitial: (slug: string) => void;
  showRewardAd: () => void;
  showRewardPopup: boolean;
};

type Game = {
  slug: string;
  title: string;
  img: string;
};

const games: Game[] = [
  { slug: "block-solver", title: "Block Solver", img: "/block-solver.webp" },
  { slug: "brick-out", title: "Brick Out", img: "/brick-out.webp" },
  { slug: "castle-crusaders", title: "Castle Crusaders", img: "/castle-crusaders.webp" },
  { slug: "card-master", title: "Card Master", img: "/card-master.webp" },
  { slug: "drop-the-number", title: "Drop the Number", img: "/drop-the-number.webp" },
  { slug: "magnet-fun", title: "Magnet Fun", img: "/magnet-fun.webp" },
  { slug: "crystal-crush", title: "Crystal Crush", img: "/crystal-crush.webp" },
  { slug: "fruit-slasher", title: "Fruit Slasher", img: "/fruit-slasher.webp" },
  { slug: "magical-match", title: "Magical Match", img: "/magical-match.webp" },
  { slug: "germ-killar", title: "Germ Killar", img: "/germ-killar.webp" }, // keep slug if routes rely on it
];

function GameCard({
  g,
  onPlay,
}: {
  g: Game;
  onPlay: (slug: string) => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onPlay(g.slug)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onPlay(g.slug)}
      className="group flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-2 text-center outline-none transition hover:border-indigo-400/40 focus:ring-2 focus:ring-indigo-400/40"
      aria-label={`Play ${g.title}`}
    >
      <img
        src={g.img}
        alt={`${g.title} cover`}
        loading="lazy"
        className="h-28 w-full rounded-xl object-cover"
      />
      <div className="mt-2 line-clamp-1 text-[11px] font-semibold uppercase tracking-tight text-white">
        {g.title}
      </div>
      <button
        className="mt-2 w-5/6 rounded-md bg-indigo-400 py-2 text-xs font-semibold text-white shadow-lg/10 group-hover:opacity-95"
        onClick={(e) => {
          e.stopPropagation();
          onPlay(g.slug);
        }}
      >
        Play Now
      </button>
    </div>
  );
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
		let displayAdId = "/23334516659/h5_1";

		googletag.cmd.push(function() {
			try {
				// displaySlots[0] = googletag.defineSlot("/23334516659/h5_1", [[300, 250], [336, 280], [300, 600], [320, 480], [250, 250]], "div-gpt-ad-123456789-1").addService(googletag.pubads());
				

				// googletag.pubads().addEventListener('slotRenderEnded', (event: any) => {});
				// googletag.pubads().enableSingleRequest();
				// googletag.pubads().collapseEmptyDivs();
				// googletag.pubads().enableLazyLoad({
				// 	fetchMarginPercent: 100,
				// 	renderMarginPercent: 50,
				// 	mobileScaling: 2.0
				// });
				// googletag.enableServices();


				googletag.pubads().collapseEmptyDivs();
				googletag.enableServices();

				// Define ad slots
				const adSlots = {
					'ad1': googletag.defineSlot(displayAdId, [[300, 250], [336, 280], [300, 600], [320, 480], [250, 250]], 'div-gpt-ad-123456789-1')
						.addService(googletag.pubads())
				};

				// Display all slots
				googletag.display('div-gpt-ad-123456789-1');

				// Hide empty slots
				googletag.pubads().addEventListener('slotRenderEnded', function (event: any) {
					Object.entries(adSlots).forEach(([adId, slot]) => {
						if (event.slot === slot && event.isEmpty) {
							const adContainer = document.getElementById(adId);
							if (adContainer) adContainer.classList.add('hidden');
						}
					});
				});
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
		<aside className="w-full md:w-[400px] bg-[#0b0f12] text-white border-x border-white/10 relative">
		{/* subtle geometric bg */}
		<div
			aria-hidden
			className="pointer-events-none absolute inset-0 mix-blend-screen opacity-20"
			style={{
			backgroundImage:
				"radial-gradient(80rem 40rem at 120% -10%, rgba(99,102,241,.2), transparent), radial-gradient(60rem 30rem at -20% 0%, rgba(56,189,248,.18), transparent), linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.04) 1px, transparent 1px)",
			backgroundSize: "auto, auto, 24px 24px, 24px 24px",
			}}
		/>

		{/* Optional reward popup */}
		{showRewardPopup && showRewardAd && (
			<div className="relative z-10">
			<RewadPopup showRewardAd={showRewardAd} />
			</div>
		)}

		{/* Ad slot */}
		<div className="relative z-10 flex justify-center items-center py-3">
			<div
			id="div-gpt-ad-123456789-1"
			role="complementary"
			aria-label="Advertisement"
			className="flex min-h-[250px] min-w-[250px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]"
			style={{ width: "fit-content" }}
			/>
		</div>

		{/* Rewards CTA (simple) */}
		<div className="relative z-10 m-5 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-center">
			<div className="text-xs text-white/70">Redeem rewards to play free games</div>
			<button
			className="mt-2 w-full rounded-md bg-indigo-400 py-2 text-sm font-semibold text-white shadow-lg/10"
			onClick={() => showInterstitial("")}
			>
			Let’s Play 🔥
			</button>
		</div>

		{/* Grid */}
		<div className="relative z-10 grid grid-cols-2 gap-4 px-5 pb-4">
			{games.map((g) => (
			<GameCard key={g.slug} g={g} onPlay={showInterstitial} />
			))}
		</div>

		<section className="relative my-6">
			{/* soft geometric glow */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10 opacity-30"
				style={{
				backgroundImage:
					"radial-gradient(40rem 20rem at 20% -10%, rgba(99,102,241,0.20), transparent), radial-gradient(30rem 16rem at 110% 10%, rgba(56,189,248,0.16), transparent)"
				}}
			/>

			{/* gradient border / glass card */}
			<div className="mx-5 rounded-3xl p-[1px] bg-gradient-to-r from-indigo-500/40 via-sky-400/30 to-emerald-400/30">
				<div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur px-6 py-6 sm:px-8 sm:py-8">
				{/* badge + heading */}
				<div className="flex items-center justify-center gap-2">
					<span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
					🎮 100% HTML5 • No installs
					</span>
				</div>
				<h2 className="mt-3 text-center text-2xl font-semibold tracking-tight">
					<span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
					About xpbattlehub
					</span>
				</h2>

				{/* copy */}
				<div className="mt-4 space-y-4 text-white/80 leading-relaxed">
					<p>
					Step into a world of free online games at <strong>xpbattlehub.com</strong>. From
					puzzles and cards to adventures, racing, and sports—dive in and start playing instantly.
					</p>
					<p>
					Enjoy buttery-smooth HTML5 gameplay right in your browser. No downloads, no waiting—just pure fun,
					anywhere, anytime.
					</p>
					<p>
					Every title packs creative levels and fresh challenges. Easy to pick up, rewarding to master.
					</p>
					<p>
					We ship new games and updates regularly—your next favorite level is just around the corner.
					</p>
				</div>

				{/* feature chips */}
				<div className="mt-5 grid grid-cols-2 gap-2 text-sm text-white/80">
					<span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center">🧩 Puzzle</span>
					<span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center">🏎️ Racing</span>
					<span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center">🃏 Cards</span>
					<span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center">⚔️ Adventure</span>
				</div>

				{/* CTA */}
				<div className="mt-6 flex justify-center">
					<button
					onClick={() => showInterstitial?.("")}
					className="rounded-2xl bg-indigo-400 px-6 py-3 font-semibold text-white shadow-[0_0_0_0_rgba(99,102,241,0.6)] hover:opacity-95 transition
								focus:outline-none focus:ring-2 focus:ring-indigo-400/50
								[box-shadow:0_0_40px_-10px_rgba(99,102,241,0.6)]"
					>
					Start Playing Now
					</button>
				</div>
				</div>
			</div>

			{/* tiny footer link row (optional) */}
			<div className="mx-5 mt-3 flex items-center justify-between text-sm text-white/60">
				<a href="/privacy" className="hover:text-white hover:underline">Privacy Policy</a>
				<span>xpbattlehub.com</span>
			</div>
			</section>

		</aside>
		</>
	);
}
