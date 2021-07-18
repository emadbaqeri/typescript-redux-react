import * as React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";

import { useActions } from "../hooks/useActions";

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = React.useState("");
  const { searchRepositories } = useActions();
  const { data, loading, error } = useTypedSelector(
    (state) => state.repositories
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchRepositories(term);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={term} onChange={(event) => setTerm(event.target.value)} />
        <button type="submit">Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3> PLEASE WAIT! TRYING TO GET DATA :)</h3>}
      <ul>
        {!error &&
          !loading &&
          data.map((result) => {
            return <li> {result.toString()} </li>;
          })}
      </ul>
    </div>
  );
};

export default RepositoriesList;
