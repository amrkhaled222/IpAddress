import { Icon } from "leaflet";
import {
	MapContainer,
	Marker,
	TileLayer,
	useMap,
	useMapEvent,
} from "react-leaflet";
import markicon from "../assets/icon-location.svg";
import { useState } from "react";

export default function IpdData(props) {
	//make state to save ip address
	const [ip, setip] = useState("");
	// make button arrow
	function Svgbutton() {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="11"
				height="14">
				<path
					fill="none"
					stroke="#FFF"
					strokeWidth="3"
					d="M2 1l6 6-6 6"
				/>
			</svg>
		);
	}
	// get the ip location on the map
	function Getiplocation() {
		const map = useMap();
		map.flyTo([props.lat, props.lng], 17);
		return null;
	}
	function handleIP(event) {
		let value = event.target.value;
		setip(value);
	}
	// make the marker for the map
	const svgIcon = new Icon({
		iconUrl: markicon,
		className: "svg-icon",
		iconSize: [26, 36],
		iconAnchor: [
			window.outerWidth < 840 ? 12 : -50,
			window.outerWidth < 840 ? -70 : -70,
		],
	});

	return (
		<div className="ipdatacontainer">
			<div className="container container-ipaddresstracker ">
				<div className="IPAddressTracker">
					<h1>IP Address Tracker</h1>
					<div className="ipInput">
						<input
							type="text"
							placeholder="Search for any IP address or domain"
							name="ipValue"
							value={ip}
							onChange={handleIP}
						/>
						<button
							onClick={(e) => {
								props.ipchanging(event, ip);
							}}>
							<Svgbutton />
						</button>
					</div>
				</div>
				<div className="ipShowData">
					<div>
						<h6>IP Address</h6>
						<p>{props.ip}</p>
					</div>
					<div>
						<h6>location</h6>
						<p>{`${props.location.city} ,${props.location.city} ${props.location.postalCode}`}</p>
					</div>
					<div>
						<h6>time zone</h6>
						<p>{props.location.timezone}</p>
					</div>

					<div>
						<h6>isp</h6>
						<p>{props.isp}</p>
					</div>
				</div>
			</div>

			<div className="mapBox">
				<MapContainer
					center={{ lat: props.lat, lng: props.lng }}
					zoom={13}
					style={{ height: "100%" }}
					scrollWheelZoom={false}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Getiplocation />
					<Marker
						icon={svgIcon}
						position={{ lat: props.lat, lng: props.lng }}></Marker>
				</MapContainer>
			</div>
		</div>
	);
}
