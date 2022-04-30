import { useEffect, useRef, useState } from "react";
import { arrayMove, arrayRemove, List } from "react-movable";

export default function App({ audio, idb }) {

	const files = useRef();

	const [shuffle, setShuffle] = useState(false);
	const [tracks, setTracks] = useState([]);
	const [track, setTrack] = useState('');
	const [duration, setDuration] = useState(0);
	const [current, setCurrent] = useState(0);
	const [index, setIndex] = useState(0);
	const [message, setMessage] = useState('Click track name to play');

	const playNext = () => {
		const ix = shuffle ? Math.random() * tracks.length | 0 : index + 1;
		const track = tracks[ix] ?? tracks[0];
		if (!track) setCurrentTrack();
		else setCurrentTrack(track, tracks.indexOf(track));
	};

	const playPrev = () => {
		const ix = shuffle ? Math.random() * tracks.length | 0 : index - 1;
		const track = tracks[ix] ?? tracks[tracks.length - 1];
		if (!track) setCurrentTrack();
		else setCurrentTrack(track, tracks.indexOf(track));
	};

	const setCurrentTrack = (val = '', ind = 0) => {
		try {
			URL.revokeObjectURL(audio.src);
			setIndex(ind);
			setTrack(val);
			setMessage(val ?? 'Click track name to play');
			idb.transaction('Tracks').objectStore('Tracks').get(val).onsuccess = e => {
				if (e.target.result)
					audio.src = URL.createObjectURL(e.target.result);
				else
					audio.src = '';
			};
		} catch (err) {
			// console.log(err);
			setMessage(err.message);
		}
	};

	const setTimestamps = () => { setDuration(audio.duration); setCurrent(audio.currentTime); audio.play(); };

	const updateTimestamps = () => { setDuration(isNaN(audio.duration) ? 0 : audio.duration); setCurrent(audio.currentTime); };

	const trackEnded = () => !audio.loop && playNext();

	useEffect(() => {
		audio.addEventListener('ended', trackEnded);
		return () => audio.removeEventListener('ended', trackEnded);
	}, [shuffle, index, tracks]);

	useEffect(() => {
		audio.addEventListener('canplaythrough', setTimestamps);
		audio.addEventListener('timeupdate', updateTimestamps);
		audio.addEventListener('error', updateTimestamps);
		try {
			const req = idb.transaction('Tracks').objectStore('Tracks').getAllKeys();
			req.onsuccess = ev => setTracks(ev.target.result);
		} catch (error) {
			// console.log(error);
			setMessage(error.message);
		}
		return () => {
			audio.removeEventListener('canplaythrough', setTimestamps);
			audio.removeEventListener('timeupdate', updateTimestamps);
			audio.removeEventListener('error', updateTimestamps);
			idb.close();
		};
	}, []);

	const addTracks = fls => {
		try {
			const names = [];
			const txn = idb.transaction('Tracks', 'readwrite');
			const store = txn.objectStore('Tracks');
			txn.oncomplete = () => setTracks(trx => [...trx, ...names]);
			for (const f of fls) {
				const req = store.add(f);
				req.onsuccess = () => names.push(f.name);
			}
		} catch (err) {
			// console.log(err);
			setMessage(err.message);
		}
	};

	const deleteTracks = (val, ind) => {
		try {
			const txn = idb.transaction('Tracks', 'readwrite');
			txn.objectStore('Tracks').delete(val);
			txn.oncomplete = () => setTracks(trx => arrayRemove(trx, ind));
		} catch (err) {
			// console.log(err);
			setMessage(err.message);
		}
	};

	return (
		<main className="player">

			<header className="header">
				<p>{message}</p>
				<button className="button button-sm" onClick={() => files.current.click()}>
					<i className="fas fa-search" aria-hidden></i>
					<span className="sr-only">A</span>
				</button>
			</header>

			<List
				values={tracks}
				onChange={({ oldIndex, newIndex }) => {
					const shifted = arrayMove(tracks, oldIndex, newIndex);
					setTracks(shifted);
					if (track)
						setIndex(shifted.indexOf(track));
				}}
				renderList={({ children, props }) => (<ul {...props} className="songs">{children}</ul>)}
				renderItem={({ value, props, index }) => (
					<li {...props} className="song">
						<button data-movable-handle className="button button-sm">
							<i className="fas fa-search" aria-hidden></i>
							<span className="sr-only">M</span>
						</button>
						<p onClick={() => setCurrentTrack(value, index)}>{value}</p>
						{
							value === track ? (
								<button className="button button-sm" onClick={() => setCurrentTrack()}>
									<i className="fas fa-search" aria-hidden></i>
									<span className="sr-only">S</span>
								</button>
							) : (
								<button className="button button-sm" onClick={() => deleteTracks(value, index)}>
									<i className="fas fa-search" aria-hidden></i>
									<span className="sr-only">D</span>
								</button>
							)// ^ this buttons onclick has to do some idb shit
						}
					</li>
				)}
			/>

			<aside className="prog">
				<div className="prog-time">
					<span className="left">{parseInt(current / 60, 10)}:{parseInt(current % 60)}</span>
					<span className="right">{parseInt(duration / 60, 10)}:{parseInt(duration % 60)}</span>
				</div>
				<div className="prog-bar">
					<div className="prog-bar-inner" style={{ width: `${100 * (current / duration)}%` }}></div>
				</div>
			</aside>

			<footer className="buttons">
				<button className="button button-sm" onClick={() => setShuffle(s => !s)}>
					<i className="fas fa-random fa-sm" aria-hidden></i>
					<span className="sr-only">S</span>
				</button>
				<button className="button button-md" onClick={() => playPrev()}>
					<i className="fas fa-step-backward" aria-hidden></i>
					<span className="sr-only">P</span>
				</button>
				<button className="button button-lg" onClick={() => audio.paused && audio.src ? audio.play() : audio.pause()}>
					<i className="fas fa-pause fa-lg" aria-hidden></i>
					<span className="sr-only">P</span>
				</button>
				<button className="button button-md" onClick={() => playNext()}>
					<i className="fas fa-step-forward"></i>
					<span className="sr-only">N</span>
				</button>
				<button className="button button-sm" onClick={() => audio.loop = !audio.loop}>
					<i className="fas fa-circle-notch fa-sm" aria-hidden></i>
					<span className="sr-only">L</span>
				</button>
			</footer>

			<input ref={files} onChange={e => addTracks(e.target.files)} type="file" accept="audio/*" multiple />
		</main>
	);
};
