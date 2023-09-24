import { useState } from "react";
import ErrorPage from "./ErrorPage";
import { fetchData } from "../utils/fetchData";
import Download from "./Download";

const Form = () => {
  const [pageSize, setPageSize] = useState(0);
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pageSize === 0 || address.length === 0) {
      alert("PLease enter correct data");
      return;
    }
    setIsLoading(true);
    try {
      const listings = await fetchData(pageSize, address);

      const formattedListings = listings.map((item) => ({
        listingId: item.listingId,
        propertyMetadata: item.propertyMetadata,
        rateSummary: item.rateSummary,
      }));

      setListing(formattedListings);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label for="address">Enter address</label>
            <input
              type="text"
              id="address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label for="pageSize">Enter page size</label>
            <input
              type="text"
              id="pageSize"
              onChange={(e) => setPageSize(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}

      {listing.length > 0 && (
        <Download
          listing={listing}
          setPageSize={setPageSize}
          setAddress={setAddress}
          setListing={setListing}
        />
      )}
    </>
  );
};

export default Form;
