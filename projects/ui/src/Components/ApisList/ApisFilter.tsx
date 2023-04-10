import { Icon } from "../../Assets/Icons";
import { TextInput, Select } from "@mantine/core";
import { useState } from "react";
import { KeyValuePair } from "../Common/DataPairPill";

/**
 * HELPER TYPE DEFS
 **/
export enum FilterType {
  name,
  keyValuePair,
  apiType,
}
export type FilterPair = { displayName: string; type: FilterType };

/**
 * HELPER FUNCTION
 **/
function getPairString(pair: KeyValuePair) {
  return `${pair.pairKey} : ${pair.value}`;
}
export function parsePairString(pairString: string): KeyValuePair {
  const [pairKey, value] = pairString.split(":");
  return {
    pairKey,
    value,
  };
}

/**
 * MAIN COMPONENT
 **/
type ApisFiltrationProp = {
  showingGrid: boolean;
  allFilters: FilterPair[];
  setAllFilters: (newFiltersList: FilterPair[]) => void;
  setShowingGrid: (showGrid: boolean) => void;
  nameFilter: string;
  setNameFilter: (newNamesList: string) => void;
};

export function ApisFilter({ filters }: { filters: ApisFiltrationProp }) {
  const [pairFilter, setPairFilter] = useState<KeyValuePair>({
    pairKey: "",
    value: "",
  });

  const addNameFilter = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value !== "") {
      filters.setAllFilters([
        ...filters.allFilters,
        { displayName: evt.target.value, type: FilterType.name },
      ]);
    }
    filters.setNameFilter("");
  };

  const alterPairKey = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newKey = evt.target.value;
    setPairFilter({
      pairKey: newKey,
      value: pairFilter.value,
    });
  };
  const alterKeyValuePair = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = evt.target.value;
    setPairFilter({
      pairKey: pairFilter.pairKey,
      value: newValue,
    });
  };

  const addKeyValuePairFilter = () => {
    filters.setAllFilters([
      ...filters.allFilters,
      { displayName: getPairString(pairFilter), type: FilterType.keyValuePair },
    ]);

    setPairFilter({ pairKey: "", value: "" });
  };

  const addTypeFilter = (addedType: string) => {
    filters.setAllFilters([
      ...filters.allFilters,
      { displayName: addedType, type: FilterType.apiType },
    ]);
  };

  const removeFilter = (filterPair: FilterPair) => {
    filters.setAllFilters(
      filters.allFilters.filter(
        (filter) =>
          filter.type !== filterPair.type ||
          filter.displayName !== filterPair.displayName
      )
    );
  };

  const clearAll = () => {
    filters.setAllFilters([]);
  };

  const selectableTypes = [
    {
      label: "OpenAPI",
      value: "OpenAPI",
    },
  ].filter(
    (selectableType) =>
      !filters.allFilters.some(
        (filter) =>
          filter.type === FilterType.apiType &&
          filter.displayName === selectableType.value
      )
  );

  return (
    <div className="filterArea">
      <div className="choicesArea">
        <h3 className="title">Filters</h3>
        <div className="textFilter">
          <TextInput
            placeholder="Filter by name or keyword"
            onChange={(e) => filters.setNameFilter(e.target.value)}
            onBlur={addNameFilter}
            value={filters.nameFilter}
          />
          <Icon.MagnifyingGlass style={{ cursor: "pointer" }} />
        </div>
        <div className="pairsFilter">
          <div className="tagHolder">
            <Icon.Tag />
          </div>
          <div className="pairHolder">
            <TextInput
              placeholder="Key"
              onChange={alterPairKey}
              value={pairFilter.pairKey}
            />
            <span>:</span>
            <TextInput
              placeholder="Value"
              onChange={alterKeyValuePair}
              value={pairFilter.value}
            />
          </div>
          <div className="addButtonHolder">
            <button
              aria-label="Add Pair Filter"
              onClick={addKeyValuePairFilter}
            >
              <Icon.Add />
            </button>
          </div>
        </div>
        <div className="dropdownFilter">
          <div className="gearHolder">
            <Icon.CodeGear />
          </div>
          <Select
            disabled={(selectableTypes ?? []).length === 0}
            data={selectableTypes}
            onChange={addTypeFilter}
            label={
              <div
                className="dropdownTrigger"
                onClick={(e) => e.preventDefault()}
              >
                <span>API Type </span> <Icon.DownArrow />
              </div>
            }
          />
        </div>
        <div className="gridListToggle">
          <button
            aria-hidden="true"
            className={`listingTypeToggle ${
              filters.showingGrid ? "isActive" : ""
            }`}
            onClick={() => filters.setShowingGrid(true)}
          >
            <Icon.TileViewIcon />
          </button>
          <button
            aria-hidden="true"
            className={`listingTypeToggle ${
              !filters.showingGrid ? "isActive" : ""
            }`}
            onClick={() => filters.setShowingGrid(false)}
          >
            <Icon.ListViewIcon />
          </button>
        </div>
      </div>

      {filters.allFilters.length > 0 && (
        <div className="currentFiltersArea">
          <div className="activeFiltersGrid">
            {filters.allFilters.map((activeFilter) => (
              <div className="activeFilter">
                {activeFilter.displayName}
                <button
                  className="closingX"
                  aria-label={`Remove ${activeFilter.displayName} filter`}
                  onClick={() => removeFilter(activeFilter)}
                >
                  <Icon.SmallX />
                </button>
              </div>
            ))}
          </div>
          <button
            aria-label={`Remove all filters`}
            className="clearAll"
            onClick={clearAll}
          >
            Clear All
            <span className="closingX">
              <Icon.SmallX />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
