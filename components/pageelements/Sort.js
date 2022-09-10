import { useFilterContext } from "../../context/filter_context"; 
import { Select } from "./Select";

const Sort = () => {

    const {
      sort,
      updateSort,
    } = useFilterContext();


    const options = [
      {
        value: "latest",
        text: "Latest"
      },
      {
        value: "earliest",
        text: "Earliest"
      },{
        value: "a-z",
        text: " a-z"
      },{
        value: "z-a",
        text: "z-a"
      },
    ]

    return (
      <div className="dropdown">
          <label htmlFor="sort">Sort by</label>

          <Select
            value={sort}
            onChange={updateSort}
            options={options}
          />
 
      </div>
    );
  
}   

export default Sort;