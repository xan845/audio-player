import "./css/header.css";

export default function Header({trackName}) {
	return (
		<header>
			<p>{trackName}</p>
		</header>
	);
};
