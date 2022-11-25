import React, { useState } from "react";
import s from "./Map.module.scss";
import { useDispatch } from "react-redux";
import { addCords } from "../../app/slices/mapSlice";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const position = [51.505, -0.09];
const iconImg = L.icon({
  iconUrl: "location.png",
  iconSize: [22, 22],
});

function LocationMarker() {
  const dispatch = useDispatch();
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click(e) {
      dispatch(addCords(e.latlng));
      setPosition(e.latlng);
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={iconImg}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const MapComp = () => {
  const [center, setCenter] = useState({
    lat: 51.14665642264855,
    lng: 71.44849094974086,
  });
  const ZOOM_LEVEL = 13;
  return (
    <div className={s.mainMap}>
      <div className={s.map}>
        <MapContainer
          center={center}
          zoom={ZOOM_LEVEL}
          scrollWheelZoom={true}
          className={s.mapContainer}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={iconImg}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <LocationMarker />
        </MapContainer>
        ;
      </div>
    </div>
  );
};

export default MapComp;
