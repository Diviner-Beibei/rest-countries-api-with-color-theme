import PropTypes from "prop-types";
CountryItem.propTypes = {
  data: PropTypes.object,
  checkDetails: PropTypes.func,
};

function CountryItem({ data, checkDetails }) {
  function handleClick(e) {
    e.preventDefault();
    checkDetails(e, data);
  }

  return (
    <div
      className="rounded-xl overflow-hidden bg-theme-light-block w-[264px] flex flex-col gap-5 font-nunito-sans shadow-sm"
      onClick={handleClick}
    >
      <img
        src={data["flags"]["svg"]}
        alt="national flag"
        className="min-h-[160px] shadow-sm"
      />
      <h2 className="text-lg font-extrabold pl-8">{data["name"]}</h2>
      <div className="text-sm font-light pl-8 pb-12 flex flex-col gap-1">
        <p className="">
          <span className="font-semibold">Population:</span>
          {data["population"]}
        </p>
        <p className="">
          <span className="font-semibold">Region:</span>
          {data["region"]}
        </p>
        <p className="">
          <span className="font-semibold">Capital:</span>
          {data["capital"]}
        </p>
      </div>
    </div>
  );
}

export default CountryItem;
