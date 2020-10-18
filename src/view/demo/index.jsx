import React, { useState, Fragment, useRef } from "react";
import useHockAxios from "./axios";
import { Input } from "antd";
function Index() {
  const [query, setQuery] = useState("redux");
  const refSave = useRef(null);
  const [setUrl, state] = useHockAxios(
    "https://hn.algolia.com/api/v1/search?query=redux",
    {
      hits: [],
    }
  );
  return (
    <Fragment>
      <Input
        type="text"
        value={query}
        ref={refSave}
        onChange={(event) => setQuery(event.target.value)}
      ></Input>
      <button
        type="button"
        onClick={() =>
          setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        search
      </button>
      {state.isError && <div>Something went wrong ...</div>}
      {state.isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {state.data.hits.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}

export default Index;
