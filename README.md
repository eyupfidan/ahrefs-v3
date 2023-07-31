
# Ahrefs API v3 Node.js Client

This library allows you to interact with the Ahrefs API v3 with ease. You can use Ahrefs' comprehensive SEO data and analysis tools directly in your Node.js applications.

## Getting Started


```shell
npm install ahrefs-v3
```
## Usage
First, import the **SiteExplore**r class and create a new instance with an API key.

```javascript
const { SiteExplorer } = require("ahrefs-v3");
const explorer = new SiteExplorer("YOUR_API_KEY");
```
Use your Ahrefs API key in place of **YOUR_API_KEY**.

To retrieve a domain rating information:

```javascript
const currentDate = new Date();

const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const day = String(currentDate.getDate()).padStart(2, "0");

const formattedDate = `${year}-${month}-${day}`;
const url = "w3schools.com";

explorer.domainRating.get(url, formattedDate).then((response) => {
  const { domain_rating, ahrefs_rank } = response.data.domain_rating;
  console.log(url + " Domain Rating:", domain_rating);
  console.log(url + " Ahrefs Rank:", ahrefs_rank);
});
```
Optionally you can send **"output"** and **"protocol"** parameters.

To examine in more detail [Ahrefs Api V3 Documentation](https://docs.ahrefs.com/docs/api/site-explorer/operations/get-a-domain-rating)

In this example, the **domainRating.get** function fetches a domain rating and prints the information to the console.

## Feedback

If you have any feedback, please reach out to info@eyupfidan.com

## License

This project is licensed under the MIT License.








