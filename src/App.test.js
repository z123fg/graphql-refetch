import { MockedProvider } from "@apollo/react-testing";
import { fireEvent, render, screen } from "@testing-library/react";
import App, { COUNTRIES } from "./App";

let count = 0
const mocks = [
  {
    request: {
      query: COUNTRIES,
      variables: { code: "BR" },
    },
    result:[

    ],
    newData: () => {
      count++;
      return count===1?{data: {
        country: {
          name: "Brazil",
          native: "Brasil",
          capital: "Brasília",
          emoji: "🇧🇷",
          currency: "BRL",
          languages: [
            {
              code: "pt",
              name: "Portuguese",
              __typename: "Language",
            },
          ],
          __typename: "Country",
        },
      }}:{
        data: {
          country: {
            __typename: "Country",
            name: "United Arab Emirates",
            native: "دولة الإمارات العربية المتحدة",
            capital: "Abu Dhabi",
            emoji: "🇦🇪",
            currency: "AED",
            languages: [
              {
                __typename: "Language",
                code: "ar",
                name: "Arabic",
              },
            ],
          },
        }
      }
    }
  }
];

test("renders learn react link", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );
  let countryElement = await screen.findByText("Brasília");
  const buttonELement = screen.getByText("refetch");
  expect(countryElement).toBeInTheDocument();
  fireEvent.click(buttonELement);
  countryElement = await screen.findByText("Abu Dhabi");
  expect(countryElement).toBeInTheDocument();



  
});
