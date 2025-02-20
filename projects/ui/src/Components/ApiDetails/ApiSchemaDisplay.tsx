import { Button } from "@mantine/core";
import { useMemo, useState } from "react";
import { di } from "react-magnetic-di";
import { useParams } from "react-router-dom";
import { useGetApiDetails, useListApis } from "../../Apis/hooks";
import { createBackstageYaml } from "../../Utility/backstage_demo_utility";
import { downloadFile } from "../../Utility/utility";
import { Loading } from "../Common/Loading";
import { RedocDisplay } from "./RedocDisplay";
import { SwaggerDisplay } from "./SwaggerDisplay";

// This is a flag to enable the backstage yaml download button.
const BACKSTAGE_YAML_DEMO_ENABLED = false;

/**
 * MAIN COMPONENT
 **/
export function ApiSchemaDisplay() {
  di(useGetApiDetails, useParams, useListApis);
  const { apiId } = useParams();
  const { isLoading: isLoadingApiDetails, data: apiSchema } =
    useGetApiDetails(apiId);
  const { isLoading: isLoadingApisList, data: apisList } = useListApis();
  const isLoading = isLoadingApiDetails || isLoadingApisList;

  const backstageYaml = useMemo(() => {
    if (!BACKSTAGE_YAML_DEMO_ENABLED) return undefined;
    const apiSummary = apisList?.find((a) => a.apiId === apiId);
    if (!apiSummary || !apiSchema) return undefined;
    return createBackstageYaml(apiSummary, apiSchema);
  }, [apisList, apiSchema]);

  const [isSwagger, setIsSwagger] = useState(false);

  if (isLoading) {
    return <Loading message={`Retrieving schema for ${apiId}...`} />;
  }

  return (
    <>
      <div className="swaggerViewToggleHolder">
        <Button
          variant="subtle"
          onClick={() => setIsSwagger(!isSwagger)}
          size="xs"
        >
          {isSwagger ? "Redoc" : "Swagger"} View
        </Button>
        {backstageYaml !== undefined && (
          <Button
            variant="subtle"
            onClick={() =>
              downloadFile(`catalog-info-${apiId}.yaml`, backstageYaml)
            }
            size="xs"
          >
            Download Backstage YAML
          </Button>
        )}
      </div>
      <main className="page-container-wrapper">
        {!isSwagger ? (
          //
          // Redoc - Default
          //
          <RedocDisplay spec={apiSchema} />
        ) : (
          //
          // Swagger - Alternative
          //
          <SwaggerDisplay
            spec={apiSchema}
            apiId={apiId ?? "Unsupported schema display"}
          />
        )}
      </main>
    </>
  );
}
