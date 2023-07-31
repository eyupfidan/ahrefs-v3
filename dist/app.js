"use strict";
const { SiteExplorer } = require("./src/index");
const { domainRating } = new SiteExplorer("iLB2-sUWwhTCVuVEPbF_66Q2cypjdsoiH1liS9zY");
domainRating.get("views4you.com", "2023-07-31").then((response) => {
    console.log(response.data.domain_rating.ahrefs_rank);
});
