import { useState } from "react";
import { arrayMove, arrayRemove, List } from "react-movable";

export default function App() {
	const trackCurrent = 0.00;
	const [tracks, setTracks] = useState([
		{ name: "The Beatles Elanor Rigby", duration: 2.06 },
		{ name: "The Rigby Beatles Elanor", duration: 1.27 },
		{ name: "The Elanor Beatles Rigby", duration: 3.42 },
		{ name: "The Beatles Rigby Elanor", duration: 4.17 },
	]);
	const [currentTrack, setCurrentTrack] = useState(null);
	return (
		<main className="player">

			<header className="header">
				<p>{currentTrack?.name ?? "Select a track"}</p>
			</header>

			<List
				values={tracks}
				onChange={({ oldIndex, newIndex }) => setTracks(arrayMove(tracks, oldIndex, newIndex))}
				renderList={({ children, props }) => (<ul {...props} className="songs">{children}</ul>)}
				renderItem={({ value, props, index }) => (
					<li {...props} className="song">
						<button data-movable-handle className="button button-sm">
							<i className="fas fa-search" aria-hidden></i>
							<span className="sr-only">M</span>
						</button>
						<p onClick={() => setCurrentTrack(value)}>{value.name}</p>
						{
							Object.is(currentTrack, value) ? (
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

			<aside className="prog">
				<div className="prog-time">
					<p className="left">{currentTrack ? trackCurrent.toFixed(2) : '-.-'}</p>
					<p className="right">{currentTrack?.duration.toFixed(2) ?? '-.-'}</p>
				</div>
				<div className="prog-bar">
					<div className="prog-bar-inner"></div>
				</div>
			</aside>

			<footer className="buttons">
				<button className="button button-sm">
					<i className="fas fa-random fa-sm" aria-hidden></i>
					<span className="sr-only">S</span>
				</button>
				<button className="button button-md">
					<i className="fas fa-step-backward" aria-hidden></i>
					<span className="sr-only">P</span>
				</button>
				<button className="button button-lg">
					<i className="fas fa-pause fa-lg" aria-hidden></i>
					<span className="sr-only">P</span>
				</button>
				<button className="button button-md">
					<i className="fas fa-step-forward"></i>
					<span className="sr-only">N</span>
				</button>
				<button className="button button-sm">
					<i className="fas fa-circle-notch fa-sm" aria-hidden></i>
					<span className="sr-only">L</span>
				</button>
			</footer>

		</main>
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