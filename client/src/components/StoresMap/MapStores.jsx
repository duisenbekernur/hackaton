import React from "react";
import s from "./MapStores.module.scss";
import { debounce } from "lodash";
import data from "../../const/stores.json";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
  CircleF,
  MarkerClusterer,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Select } from "@chakra-ui/react";

import Search from "./Search/Search";

const center = { lat: 51.14665642264855, lng: 71.44849094974086 };
// data = data.filter( (el) => el.category == "Магазин бытовой техники")
const MapStores = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedCoord, setSelectedCoord] = React.useState(null);
  const [circleR, setCircleR] = React.useState(0);
  const [directions, setDirections] = React.useState(null);
  const [selected, setSelected] = React.useState(null);
  const [localPosition, setLocalPosition] = React.useState(null);
  const [tr, setTr] = React.useState(" ");

  const [stores, setStores] = React.useState([]);
  data = data.filter(
    (el) =>
      el.category === "Бытовая техника" ||
      el.category == "Appliance shop" ||
      el.category == "Магазин электроники" ||
      el.category == "Поставщик аудио- и видеоаппаратуры" ||
      el.category == "Computer Shop" ||
      el.category == "Computer Shop" ||
      el.category == "Computer Software Shop" ||
      el.category == "Комиссионный магазин компьютерной техники"
  );
  setTimeout(() => {
    setTr("s");
  }, 1000);
  const { isLoaded } = useJsApiLoader({
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

  const uniqueCategory = Array.from(
    new Set(
      data.map((el) => {
        return el.category;
      })
    )
  );

  React.useEffect(() => {
    try {
      if (Boolean(selectedCategory)) {
        return setStores(data.filter((el) => el.category === selectedCategory));
      }
      console.log(data);
      setStores(data);
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
  }, [selectedCategory]);
  console.log("render");
  return (
    <div className={s.mainMap}>
      <div className={s.map}>
        <div className={s.destination}>
          <Search
            panTo={panTo}
            setSelectedCoord={setSelectedCoord}
            fetchDirections={fetchDirections}
          />

          <Select
            placeholder="Select option"
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
          >
            {uniqueCategory.map((value, i) => (
              <option key={i} value={value}>
                {value}
              </option>
            ))}
          </Select>

          <p>Расстояние от вас(в м.)</p>
          <input
            type="number"
            placeholder="Введите цифру"
            onChange={handleChangeRadius}
          />
        </div>
        {isLoaded && (
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
                      position={{ lat: el.latitude, lng: el.longitude }}
                      clusterer={clusterer}
                      onClick={() => {
                        console.log(el);
                        setSelected(el);
                      }}
                    />
                  );
                })
              }
            </MarkerClusterer>
            {selected ? (
              <InfoWindow
                position={{ lat: selected.latitude, lng: selected.longitude }}
                onCloseClick={() => setSelected(null)}
              >
                <div>
                  <h5>Город: {selected.city}</h5>
                  <p>Название магазина: {selected.name}</p>
                  <p>Категория: {selected.category}</p>
                  <p>Адресс: {selected.full_address}</p>
                  <p>Улица: {selected.street}</p>
                  <p>Контактные данные: {selected.phone}</p>
                  {selected.site ? (
                    <a href={selected.cite}>Сайт магазина: {selected.site}</a>
                  ) : null}
                </div>
              </InfoWindow>
            ) : null}
          </GoogleMap>
        )}
        {tr}
      </div>
    </div>
  );
};

export default MapStores;
