/**
 * Plays muted Enlisted Cheats background clips without blocking interaction.
 * - hero: eager muted autoplay (real src in HTML; poster is first paint)
 * - product / lazy: hydrate data-src only when near the viewport
 */
(function () {
	var reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');

	function armMuted(video) {
		if (!(video instanceof HTMLVideoElement)) return;
		video.muted = true;
		video.defaultMuted = true;
		video.setAttribute('muted', '');
		video.setAttribute('playsinline', '');
		video.setAttribute('webkit-playsinline', '');
		video.playsInline = true;
	}

	function hydrateSrc(video) {
		if (!(video instanceof HTMLVideoElement)) return false;
		var dataSrc = video.getAttribute('data-src');
		if (!dataSrc) return Boolean(video.getAttribute('src') || video.querySelector('source'));

		if (video.getAttribute('src') !== dataSrc) {
			video.setAttribute('src', dataSrc);
		}

		var sources = video.querySelectorAll('source[data-src]');
		for (var i = 0; i < sources.length; i++) {
			var source = sources[i];
			var sourceSrc = source.getAttribute('data-src');
			if (sourceSrc && source.getAttribute('src') !== sourceSrc) {
				source.setAttribute('src', sourceSrc);
			}
		}
		return true;
	}

	function markReady(video) {
		video.classList.add('is-ready');
	}

	function tryPlay(video) {
		if (!(video instanceof HTMLVideoElement)) return;
		if (video.classList.contains('is-hidden')) return;
		if (!hydrateSrc(video)) return;
		armMuted(video);

		function attempt() {
			armMuted(video);
			var playPromise = video.play();
			if (playPromise && typeof playPromise.then === 'function') {
				playPromise
					.then(function () {
						markReady(video);
					})
					.catch(function () {
						window.setTimeout(function () {
							armMuted(video);
							video.play().then(function () {
								markReady(video);
							}).catch(function () {});
						}, 200);
					});
			} else {
				markReady(video);
			}
		}

		if (video.readyState >= 2) {
			attempt();
			return;
		}

		video.addEventListener('loadeddata', attempt, { once: true });
		video.addEventListener('canplay', attempt, { once: true });
		video.addEventListener(
			'playing',
			function () {
				markReady(video);
			},
			{ once: true },
		);
		try {
			video.load();
		} catch (_) {
			/* ignore */
		}
		attempt();
	}

	function observeLazy(videos) {
		if (!videos.length) return;

		if (!('IntersectionObserver' in window)) {
			videos.forEach(tryPlay);
			return;
		}

		var observer = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (!entry.isIntersecting) return;
					var video = entry.target;
					tryPlay(video);
					observer.unobserve(video);
				});
			},
			{ rootMargin: '160px 0px', threshold: 0.01 },
		);

		videos.forEach(function (video) {
			observer.observe(video);
		});
	}

	function bindHero() {
		if (reduceMq.matches) return;

		var heroes = Array.prototype.slice.call(
			document.querySelectorAll('[data-enlisted-cheats-video="hero"]'),
		);
		if (!heroes.length) return;

		heroes.forEach(function (video) {
			tryPlay(video);
			video.addEventListener(
				'pause',
				function () {
					if (video.classList.contains('is-hidden')) return;
					if (document.visibilityState === 'hidden') return;
					tryPlay(video);
				},
				{ passive: true },
			);
		});
	}

	bindHero();
	observeLazy(
		Array.prototype.slice.call(
			document.querySelectorAll(
				'[data-enlisted-cheats-video="product"], [data-enlisted-cheats-video="lazy"]',
			),
		),
	);
})();
