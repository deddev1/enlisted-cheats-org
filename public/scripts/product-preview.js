(function () {
	function toContentSrcSet(baseSrc) {
		var match = baseSrc.match(/^(.+\/)(.+)\.webp$/i);
		if (!match) return undefined;
		var dir = match[1];
		var name = match[2];
		if (name.endsWith('-640w') || name.endsWith('-960w') || name.endsWith('-1400w')) {
			return undefined;
		}
		return [480, 960]
			.map(function (width) {
				return dir + name + '-' + width + 'w.webp ' + width + 'w';
			})
			.join(', ');
	}

	document.querySelectorAll('[data-product]').forEach(function (root) {
		var mainImage = root.querySelector('[data-main-image]');
		var mainVideo = root.querySelector('[data-main-video]');
		var videoPlayer = root.querySelector('[data-video-player]');
		var playButton = root.querySelector('[data-video-play]');
		var thumbs = Array.from(root.querySelectorAll('[data-thumb]'));
		if (!(mainImage instanceof HTMLImageElement) || thumbs.length === 0) return;

		function syncPlayButton() {
			if (!(mainVideo instanceof HTMLVideoElement) || !(playButton instanceof HTMLButtonElement)) {
				return;
			}
			var playerHidden =
				videoPlayer instanceof HTMLElement && videoPlayer.classList.contains('is-hidden');
			var showOverlay = !playerHidden && (mainVideo.paused || mainVideo.ended);
			playButton.classList.toggle('is-hidden', !showOverlay);
		}

		if (mainVideo instanceof HTMLVideoElement && playButton instanceof HTMLButtonElement) {
			playButton.addEventListener('click', function () {
				mainVideo.controls = true;
				var playPromise = mainVideo.play();
				if (playPromise && typeof playPromise.then === 'function') {
					playPromise.then(syncPlayButton).catch(syncPlayButton);
				} else {
					syncPlayButton();
				}
			});

			mainVideo.addEventListener('play', syncPlayButton);
			mainVideo.addEventListener('pause', syncPlayButton);
			mainVideo.addEventListener('ended', syncPlayButton);
			syncPlayButton();
		}

		function showVideo() {
			thumbs.forEach(function (btn) {
				btn.classList.remove('is-active');
				btn.setAttribute('aria-pressed', 'false');
			});
			mainImage.classList.add('is-hidden');
			if (videoPlayer instanceof HTMLElement) {
				videoPlayer.classList.remove('is-hidden');
			}
			if (mainVideo instanceof HTMLVideoElement) {
				mainVideo.pause();
			}
			syncPlayButton();
		}

		function select(index) {
			var thumb = thumbs[index];
			if (!(thumb instanceof HTMLElement)) return;

			var src = thumb.getAttribute('data-src');
			var alt = thumb.getAttribute('data-alt');
			var srcset = thumb.getAttribute('data-srcset') || (src ? toContentSrcSet(src) : null);
			if (!src) return;

			thumbs.forEach(function (btn, i) {
				var on = i === index;
				btn.classList.toggle('is-active', on);
				btn.setAttribute('aria-pressed', on ? 'true' : 'false');
			});

			if (mainVideo instanceof HTMLVideoElement) {
				mainVideo.pause();
			}
			if (videoPlayer instanceof HTMLElement) {
				videoPlayer.classList.add('is-hidden');
			}

			mainImage.style.opacity = '0';
			mainImage.classList.remove('is-hidden');
			window.setTimeout(function () {
				mainImage.src = src;
				if (srcset) mainImage.srcset = srcset;
				else mainImage.removeAttribute('srcset');
				if (alt) mainImage.alt = alt;
				mainImage.style.opacity = '1';
			}, 140);
		}

		thumbs.forEach(function (thumb, index) {
			thumb.addEventListener('click', function () {
				if (thumb.classList.contains('is-active')) {
					showVideo();
					return;
				}
				select(index);
			});
		});
	});
})();
