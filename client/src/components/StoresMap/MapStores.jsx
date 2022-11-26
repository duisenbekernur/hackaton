import React from "react";
import s from "./MapStores.module.scss";
import { debounce } from "lodash";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
  CircleF,
  MarkerClusterer,
  DirectionsRenderer,
} from "@react-google-maps/api";

import Search from "./Search/Search";

const center = { lat: 51.14665642264855, lng: 71.44849094974086 };

const MapStores = () => {
  const [selectedCoord, setSelectedCoord] = React.useState(null);
  const [circleR, setCircleR] = React.useState(0);
  const [directions, setDirections] = React.useState(null);
  const [selected, setSelected] = React.useState(null);
  const [localPosition, setLocalPosition] = React.useState(null);

  const [stores, setStores] = React.useState([
    { lat: 51.14665642264855, lng: 71.44849094974086, category: 2 },
    { lat: 51.14837940137575, lng: 71.48179325686976, category: 3 },
    { lat: 51.15925422009232, lng: 71.51217732059047, category: 5 },
    { lat: 51.11844328997825, lng: 71.49878773318812, category: 4 },
    { lat: 51.12291912090751, lng: 71.45163821415798, category: 6 },
  ]);

  useJsApiLoader({
    googleMapsApiKey: "AIzaSyAEK1DZMHEp61t9OMxl3CCEPKjvjosDvjA", // Connectin API
    libraries: ["places", "drawing", "geometry"],
  });

  const options = {
    zoomControl: true,
  };
  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
  }, []);

  const handleChangeRadius = debounce((event) => {
    setCircleR(event.target.value);
  }, 1000);

  const fetchDirections = (position) => {
    if (!selectedCoord) {
      return;
    }
    // eslint-disable-next-line no-undef
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: localPosition,
        destination: position,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (results, status) => {
        if (status === "OK" && results) {
          setDirections(results);
        }
      }
    );
  };

  React.useEffect(() => {
    try {
    } catch (error) {
      console.log(error);
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocalPosition(pos);
      });
    } else {
      alert("Разрешите доступ к геолокаций чтобы увидить магазины рядом!");
    }
  }, []);

  return (
    <div className={s.mainMap}>
      <div className={s.map}>
        <div className={s.destination}>
          <Search
            panTo={panTo}
            setSelectedCoord={setSelectedCoord}
            fetchDirections={fetchDirections}
          />
          <p>Расстояние (в м.)</p>
          <input
            type="number"
            placeholder="Введите цифру"
            onChange={handleChangeRadius}
          />
        </div>
        <GoogleMap
          mapContainerClassName={s.mapContainer}
          zoom={13}
          center={center}
          mapContainerStyle={{ width: "80%", height: "80%" }}
          ref={mapRef}
          options={options}
          onLoad={onMapLoad}
        >
          s
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "red",
                  strokeWeight: 4,
                },
              }}
            />
          )}
          <CircleF
            radius={circleR * 1}
            center={localPosition}
            draggable={false}
            visible={true}
            editable={false}
            options={{
              strokeColor: "#EAAA02",
              fillOpacity: 0.3,
              fillColor: "green",
            }}
          />
          {selectedCoord === null ? null : (
            <>
              <Marker
                position={selectedCoord}
                onClick={() => setSelected(selectedCoord)}
              />
            </>
          )}
          <MarkerClusterer>
            {(clusterer) =>
              stores.map((el) => {
                return (
                  <Marker
                    position={{ lat: el.lat, lng: el.lng }}
                    clusterer={clusterer}
                    onClick={() => {
                      setSelected(el);
                    }}
                  />
                );
              })
            }
          </MarkerClusterer>
          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => setSelected(null)}
            >
              <div>
                ss<h3>Selected Place</h3>
                <p>With category {selected.category}</p>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapStores;
