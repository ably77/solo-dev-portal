import { ApiSummaryGridCard } from "./ApiSummaryGridCard";
import { ApiSummaryListCard } from "./ApiSummaryListCard";
import { useListApis } from "../../Apis/hooks";
import { FilterPair, FilterType } from "./ApisFilter";
import { Loading } from "../Common/Loading";

export function ApisList({
  allFilters,
  nameFilter,
  usingGridView,
}: {
  allFilters: FilterPair[];
  nameFilter: string;
  usingGridView: boolean;
}) {
  const { isLoading, data: apisList } = useListApis();

  /* eslint-disable no-console */
  //console.log(apisList);
  /* eslint-enable no-console */

  const displayedApisList = apisList
    ? apisList
        .filter((api) => {
          return (
            (!nameFilter && !allFilters.length) ||
            (!!nameFilter &&
              api.title
                .toLocaleLowerCase()
                .includes(nameFilter.toLocaleLowerCase())) ||
            allFilters.some((filter) => {
              return (
                (filter.type === FilterType.name &&
                  api.title
                    .toLocaleLowerCase()
                    .includes(filter.displayName.toLocaleLowerCase())) ||
                (filter.type === FilterType.keyValuePair &&
                  api.customMetadata[filter.key] === filter.value) ||
                (filter.type === FilterType.apiType && true)
              );
            })
          );
        })
        .sort((filterA, filterB) => filterA.title.localeCompare(filterB.title))
    : [];

  if (isLoading) {
    return <Loading message="Getting list of apis..." />;
  }

  return (
    <div className={usingGridView ? "apiGridList" : ""}>
      {usingGridView
        ? displayedApisList.map((api) => (
            <ApiSummaryGridCard api={api} key={api.apiId} />
          ))
        : displayedApisList.map((api) => (
            <ApiSummaryListCard api={api} key={api.apiId} />
          ))}
    </div>
  );
}
