import { useEffect, useRef, useState } from "react";
import { arrayMove, arrayRemove, List } from "react-movable";

const audio = new Audio();
// audio.currentTime


export default function App() {

	const files = useRef();

	const [shuffle, setShuffle] = useState(false);
	const [tracks, setTracks] = useState([]);
	const [playing, nowPlaying] = useState({});

	const playNext = () => {
		const index = shuffle ? Math.random() * tracks.length | 0 : playing.index + 1;
		const track = tracks[index];
		console.log(tracks, index);
		if (!track) setCurrentTrack(null);
		else setCurrentTrack(track, index);
	};

	const playPrev = () => {
		const index = shuffle ? Math.random() * tracks.length | 0 : playing.index - 1;
		const track = tracks[index];
		if (!track) setCurrentTrack(null);
		else setCurrentTrack(track, index);
	};

	const setCurrentTrack = (file, index = 0) => {
		audio.src = file ? URL.createObjectURL(file) : null
		nowPlaying({ file, index, duration: 0, current: 0 });
	};

	const setDurations = () => nowPlaying(nP => {
		URL.revokeObjectURL(audio.src);
		audio.play();
		return {
			...nP,
			duration: audio.duration,
			current: audio.currentTime
		};
	});

	const updateCurrent = () => nowPlaying(nP => ({ ...nP, current: audio.currentTime }));

	const trackEnded = () => !audio.loop && playNext();

	useEffect(() => {
		audio.addEventListener('canplaythrough', setDurations)
		audio.addEventListener('timeupdate', updateCurrent);
		audio.addEventListener('ended', trackEnded)

		return () => {
			audio.removeEventListener('canplaythrough', setDurations);
			audio.removeEventListener('timeupdate', updateCurrent);
			audio.removeEventListener('ended', trackEnded);
		};
	}, []);

	return (
		<>
			<main className="player">

				<header className="header">
					<p>{playing.file?.name ?? "Select a track"}</p>
					<button className="button button-sm" onClick={() => files.current.click()}>
						<i className="fas fa-search" aria-hidden></i>
						<span className="sr-only">A</span>
					</button>
				</header>
				<>
					<List
						values={tracks}
						onChange={({ oldIndex, newIndex }) => {
							const shifted = arrayMove(tracks, oldIndex, newIndex);
							const index = shifted.findIndex(trx => Object.is(trx, playing.file));
							nowPlaying(nP => ({ ...nP, index }));
							setTracks(shifted);
						}}
						renderList={({ children, props }) => (<ul {...props} className="songs">{children}</ul>)}
						renderItem={({ value, props, index }) => (
							<li {...props} className="song">
								<button data-movable-handle className="button button-sm">
									<i className="fas fa-search" aria-hidden></i>
									<span className="sr-only">M</span>
								</button>
								<p onClick={() => setCurrentTrack(value, index)}>{value.name}</p>
								{
									Object.is(playing.file, value) ? (
										<button className="button button-sm" onClick={() => setCurrentTrack(null)}>
											<i className="fas fa-search" aria-hidden></i>
											<span className="sr-only">S</span>
										</button>
									) : (
										<button className="button button-sm" onClick={() => setTracks(arrayRemove(tracks, index))}>
											<i className="fas fa-search" aria-hidden></i>
											<span className="sr-only">D</span>
										</button>
									)
								}
							</li>
						)}
					/>
				</>
				<aside className="prog">
					<div className="prog-time">
						{/* convert current to good format */}
						<span className="left">{parseInt(playing.current/60, 10)}:{parseInt(playing.current%60)}</span>
						<span className="right">{parseInt(playing.duration/60, 10)}:{parseInt(playing.duration%60)}</span>
						{/* convert duration to good format */}
					</div>
					<div className="prog-bar">
						<div className="prog-bar-inner" style={{ width: `${100 * (playing.current / playing.duration)}%`}}></div>
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
					<button className="button button-lg" onClick={() => audio.paused ? audio.play() : audio.pause()}>
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

			</main>
			<input ref={files} onChange={e => setTracks(trx => [...trx, ...e.target.files])} type="file" accept="audio/*" multiple />
		</>
	)
};
/*
<ul className="songs">
	<li className="song">
		<button className="button button-sm">
			<i className="fas fa-search" aria-hidden></i>
			<span className="sr-only">M</span>
		</button>
		<p>{trackName}</p>
		<button className="button button-sm">
			<i className="fas fa-search" aria-hidden></i>
			<span className="sr-only">D</span>
		</button>
	</li>
	<li className="song">
		<button className="button button-sm">
			<i className="fas fa-search" aria-hidden></i>
			<span className="sr-only">M</span>
		</button>
		<p>{trackName + trackName}</p>
		<button className="button button-sm">
			<i className="fas fa-search" aria-hidden></i>
			<span className="sr-only">S</span>
		</button>
	</li>
</ul>
*/
/*
const trackCurrent = 0.00;
const [tracks, setTracks] = useState([
	{ name: "The Beatles Elanor Rigby", duration: 2.06 },
	{ name: "The Rigby Beatles Elanor", duration: 1.27 },
	{ name: "The Elanor Beatles Rigby", duration: 3.42 },
	{ name: "The Beatles Rigby Elanor", duration: 4.17 },
]);
*/