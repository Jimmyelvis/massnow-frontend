import { useFilterContext } from "../../context/filter_context"; 

const Sort = () => {

    const {
      sort,
      updateSort,
    } = useFilterContext();



    return (
      <div className="dropdown">
          <label htmlFor="sort">Sort by</label>

          <div className="selector">
            <select
              name="sort"
              id="sort"
              className="sort-input"
              value={sort}
              onChange={updateSort}
            >
              <option value="latest">Latest</option>
              <option value="earliest">Earliest</option>
              <option value="a-z">Title (a-z)</option>
              <option value="z-a">Title (z-a)</option>
            </select>
            <div class="custom-arrow"></div>
          </div>

      </div>
    );
  
}   

export default Sort;