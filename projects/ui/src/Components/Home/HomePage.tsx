import { NavLink } from "react-router-dom";
import { BannerHeading } from "../Common/Banner/BannerHeading";
import { BannerHeadingTitle } from "../Common/Banner/BannerHeadingTitle";
import { Button } from "../Common/Button";
import { PageContainer } from "../Common/PageContainer";

/* TODO: Clean this up. Is there a better way to display this? Should 
    these images be coming from the backend */
import CardImage1 from "../../Assets/card-option-1.png";
import CardImage2 from "../../Assets/card-option-2.png";
import CardImage3 from "../../Assets/card-option-3.png";
import { companyName } from "../../user_variables.tmplr";

/**
 * MAIN COMPONENT
 **/
export function HomePage() {
  return (
    <PageContainer>
      <div>
        <BannerHeading
          title={<BannerHeadingTitle text={"Solo.io External Developer Portal"} />}
          description={<>Welcome to the {companyName} Developer Portal Demo! To get started, log in to generate API keys and use them to explore and consume the external facing APIs.<br/><br/>Dont have an account yet? Sign up through Okta using Self Service Registration!</>}
          additionalContent={
            <NavLink to="/apis">
              <Button style={{ width: "150px", marginTop: "10px" }}>
                VIEW APIS
              </Button>
            </NavLink>
          }
          tall={true}
        />
      </div>

      <div role="region" aria-labelledby="" className="homePageCategories">
        <h3>This Portal Demo is Powered By:</h3>
        <div className="categoriesList">
          <div className="categoryCard">
            <div className="categoryImageHolder">
              <img src={CardImage1} alt="" role="banner" />
            </div>
            <div className="categoryName">Gloo Gateway</div>
            <div className="categoryDescription">
              Gloo Gateway is a lightweight and fast Kubernetes-native API gateway with swappable developer portal, cloud-native API management, OpenTelemetry powered analytics, Ingress, and built-in GraphQL server.
            </div>
          </div>
          <div className="categoryCard">
            <div className="categoryImageHolder">
              <img src={CardImage2} alt="" role="banner" />
            </div>
            <div className="categoryName">Gloo Mesh</div>
            <div className="categoryDescription">
              Today's Kubernetes environments need help in scaling, securing and observing modern cloud-native applications. Gloo Mesh, based on the industry's leading Istio service mesh, simplifies multi-cloud and multi-cluster management of service mesh for containers and virtual machines. Gloo Mesh helps platform engineering teams to reduce costs, reduce risks, and improve application agility.
            </div>
          </div>
          <div className="categoryCard">
            <div className="categoryImageHolder">
              <img src={CardImage3} alt="" role="banner" />
            </div>
            <div className="categoryName">Gloo Portal</div>
            <div className="categoryDescription">
              Secure, bundle, and share your APIs in a developer portal that you can customize with Gloo Platform Portal.
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
