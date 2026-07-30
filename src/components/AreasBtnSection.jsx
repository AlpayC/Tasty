import { useContext } from "react";
import "./AreasBtnSection.css";
import { FilteredAreaContext } from "../context/Context";
import { AREAS } from "../data/areas";

const AreasBtnSection = (props) => {
  const { filteredArea, setFilteredArea } = useContext(FilteredAreaContext);

  // # Speichern des Inputfeldes auf der AreaPage

  const filterByArea = (e) => {
    setFilteredArea(e.target.value);
  };

  return (
    <>
      <section className="area-btn-wrapper">
        <article className="area-see-all-box">
          <h2 className="area-see-all">See All</h2>
        </article>
        <section className="area-btn-container">
          {AREAS.map((area) => (
            <button
              key={area}
              onClick={filterByArea}
              value={area}
              className={filteredArea === area ? "active" : ""}
            >
              {area}
            </button>
          ))}
        </section>
      </section>
    </>
  );
};

export default AreasBtnSection;
