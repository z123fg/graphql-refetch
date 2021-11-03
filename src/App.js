import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
import ReactJson from "react-json-view";
export const COUNTRIES = gql`
  query COUNTRIES($code: ID!) {
    country(code: $code) {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

function App() {
  const { loading, error, data, refetch } = useQuery(COUNTRIES, {
    variables: { code: "BR" },
  });
  const handleClick = (e) => {
    refetch({ code: "BR"});
  };
  return (
    <div>
      {loading ? (
        "loading......"
      ) : error?"Something Wrong!!!!!!":(
        <div>
          <button onClick={handleClick}>refetch</button>
          <div>{data&&data.country.capital}</div>
        </div>
      )}
    </div>
  );
}

export default App;
