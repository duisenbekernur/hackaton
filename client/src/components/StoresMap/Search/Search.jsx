import React from "react";
import s from "./Search.module.scss";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxPopover,
  ComboboxList,
} from "@reach/combobox";

const Search = ({ panTo, setSelectedCoord, fetchDirections }) => {
  const center = { lat: 51.14665642264855, lng: 71.44849094974086 };
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => center.lat,
        lng: () => center.lng,
      },
      radius: 200 * 1000,
    },
  });
  return (
    <div className={s.searchField}>
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            setSelectedCoord({ lat: lat, lng: lng });
            panTo({ lat, lng });
            fetchDirections({ lat, lng });
          } catch (error) {
            console.log("ERROR OCCURED WITH FETCHING", error);
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(event) => setValue(event.target.value)}
          disabled={!ready}
          placeholder="Enter an adress"
          style={{
            padding: "12px 16px",
            border: "1px solid rgba(0,0,0,0.5)",
            marginLeft: "102px",
          }}
        />
        
        <ComboboxPopover>
          <ComboboxList style={{ listStyle: "none", backgroundColor: "azure" }}>
            {status === "OK" &&
              data.map(({ id, description }) => {
                return (
                  <ComboboxOption
                    key={id}
                    value={description}
                    style={{ padding: "6px 8px" }}
                  />
                );
              })}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default Search;
