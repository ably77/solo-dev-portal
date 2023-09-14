import Banner from "../../../Assets/banner.png";
import Breadcrumbs from "../Breadcrumbs";

/**
 * MAIN COMPONENT
 **/
export function BannerHeading({
  title,
  description,
  fullIcon,
  additionalContent,
  tall,
  breadcrumbItems,
}: {
  title: React.ReactNode;
  description: React.ReactNode;
  fullIcon?: React.ReactNode;
  additionalContent?: React.ReactNode;
  tall?: boolean;
  breadcrumbItems?: { link?: string; label: string }[];
}) {
  return (
    <>
      <Breadcrumbs items={breadcrumbItems ?? []} />
      <div className={`bannerHeading ${tall ? "tall" : ""}`}>
        <div className="bannerContent">
          {!!fullIcon && <div className="bigLeftIcon">{fullIcon}</div>}
          <div className="coreContent">
            {title}
            <div className="description">{description}</div>
            {!!additionalContent && (
              <div className="additionalContent">{additionalContent}</div>
            )}
          </div>
        </div>

        <div className="banner">
          <img src={Banner} alt="" role="banner" />
        </div>
      </div>
    </>
  );
}
