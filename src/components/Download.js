import { useState } from "react";
import {
  getDateDifference,
  getDate,
  generateCsv,
  downloadCsv,
} from "../utils/helper";

const Download = ({ listing, setPageSize, setAddress, setListing }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const formatData = (data) => {
    return data.map((item) => {
      const { listingId, propertyMetadata, rateSummary } = item;

      const diffDays = getDateDifference(rateSummary.beginDate);
      const rentNightsFromToday = rateSummary?.rentNights?.slice(diffDays);

      const obj = {
        "Unit Id": listingId,
        Name: propertyMetadata.headline,
      };
      rentNightsFromToday?.forEach((rentNight, idx) => {
        obj[getDate(idx)] = rentNight;
      });
      return obj;
    });
  };

  const handleDownload = () => {
    setIsDownloading(true);
    const formattedListings = formatData(listing);

    const csv = generateCsv(formattedListings);
    downloadCsv(csv);
    setAddress("");
    setPageSize(0);
    setListing([]);
    setIsDownloading(false);
  };
  return (
    <>
      <button onClick={handleDownload}>Download Report</button>
      {isDownloading && <p>Downloading...</p>}
    </>
  );
};

export default Download;
