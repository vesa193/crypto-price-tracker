# Crypto Price Track

The Project runs on React code together with Vite local development server.
Appliction gives option to user, review the top 6 crypto currencies and look details, actially variations about history prices through chart.

## Prerequisites

Before actuall installation, user should have compatible node version.
Version should be greater or equal to 16 version, as mentioned in `package.json` file.

`"engines": {
    "node": ">=16"
},`


## Installation

After the repository of the project fetched on user's local machine, user should finish following steps:

- Install the packages within the project.

```bash
npm install
```

## Run the app

- Needs provide this command for running the application.

```bash
    npm run dev
```

- After this command, terminal should display _<http://localhost:4000>_ link where's application run.

## Usage

- Initial screen of the app display all of the crypto currencies in the table with following details (name, symbol, current-price, logo).

![Intial screen](/src/assets/screenshoots/cpt_screen_1.png)

- User is able to select desired currency from select-option input with provided options (EUR, USD, GBP) and display forrmated price along with currency sign.

![Currency selection input](/src/assets/screenshoots/cpt_screen_2.png)

- Over the search input, user needs to provide the search term and search item per name or symbol.
It should look like on the image underneath.

![Currency Search Input](/src/assets/screenshoots/cpt_screen_3.png)

- When user clicks on certain item in the table, should be redirected to CryptoCurrencyDetailsPage, it displays all of details about currency clicked with chart prices history.

![Crypto Currency Details](/src/assets/screenshoots/cpt_screen_4.png)

- Back button in the header component, should redirect user to main screen.
- Chart is able to provide informations on mouseover every single point on the chart.