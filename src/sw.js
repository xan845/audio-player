const CACHE__NAME = 'v0';

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE__NAME)
			.then(function (cache) {
				return cache.addAll([
					'/index.html',
					'/manifest.json',
					'/icon.png',
					'/favicon.png', '/img/notfound.png']);
			})
	);
	return self.skipWating();
});

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys()
			.then(function (keyList) {
				return Promise.all(keyList.map(function (key) {
					if (key !== CACHE__NAME) {
						console.log('Removing old cache.', key);
						return caches.delete(key);
					}
				}));
			})
	);
	return self.clients.claim(); // return could be omitted
});

self.addEventListener('fetch', function (event) {
	event.respondWith(
		fetch(event.request)
			.then(function (res) {
				return caches.open(CACHE__NAME)
					.then(function (cache) {
						cache.put(event.request.url, res.clone());
						return res;
					})
			})
			.catch(function (err) {
				console.error(err);
				return caches.match(event.request)
					.then(function (res) {
						return res ? res : caches.match('/img/notfound.png')
					});
			})
	);
});
