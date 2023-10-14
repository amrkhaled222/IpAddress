import { useEffect, useState } from "react";
import IpdData from "./components/IpData";

function App() {
	const [ipdata, setIpData] = useState({});
	const [myip, setmyip] = useState("");

	//first ip

	useEffect(() => {
		fetch("https://api.ipify.org?format=json")
			.then((data) => data.json())
			.then((data1) => {
				setmyip(data1.ip);
			});
		getdataofip(myip);
	}, []);

	// get data after get new IP
	useEffect(() => {
		getdataofip(myip);
	}, [myip]);

	// function retrun data of ip

	function getdataofip(ip) {
		fetch(
			`https://geo.ipify.org/api/v2/country,city?apiKey=at_1ZBzUuVXz13xbm6GEO92ygEgoKOc1&ipAddress=${ip}`
		)
			.then((response) => response.json())
			.then((e) => {
				setIpData(e);
			});
	}
	// function save  the ip

	function ipchanging(event, ip) {
		setmyip(ip);
	}
	function Alldata() {
		if (Object.keys(ipdata).length > 1) {
			return (
				<IpdData
					lat={ipdata.location.lat}
					lng={ipdata.location.lng}
					ipchanging={ipchanging}
					{...ipdata}></IpdData>
			);
		}
	}

	return (
		<div>
			<Alldata />
		</div>
	);
}

export default App;
