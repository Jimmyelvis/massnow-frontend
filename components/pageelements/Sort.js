import { useGlobalContext } from "../../filter_context";

const Sort = () => {

    const {
      sort,
      updateSort,
    } = useGlobalContext();



    return (
      <>
        <form style={{
          width:"100%"
        }}>
          <label htmlFor="sort">Sort by</label>
          <select
            name="sort"
            id="sort"
            className="sort-input"
            value={sort}
            onChange={updateSort}
          >
            <option value="latest">Latest</option>
            <option value="earliest">Earliest</option>
            <option value="a-z">name (a-z)</option>
            <option value="z-a">name (z-a)</option>
          </select>
        </form>
      </>
    );
  
}   

export default Sort;