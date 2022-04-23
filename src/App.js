
export default function App() {
	const trackName = "The Beatles Elanor Rigby";
	const trackCurrent = 0.00
	const trackDuration = 2.06
	return (
		<main className="player">

			<header className="header">
				<p>{trackName}</p>
			</header>

			{/* <nav> */}
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
			{/* </nav> */}

			<aside className="prog">
				<div className="prog-time">
					<p className="left">{trackCurrent.toFixed(2)}</p>
					<p className="right">{trackDuration.toFixed(2)}</p>
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
