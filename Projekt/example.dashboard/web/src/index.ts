//#region imports
import { connect } from "@smartdesign/web-api";
import { polyfill as polyfillPromise } from "es6-promise";
import "@smartdesign/styles/dist/theme.css";
import "../node_modules/chartist/dist/index.css";
import "../styles/styles.css";
import Dashboard from "./Dashboard";
//#endregion

polyfillPromise();

// Change "http://localhost:9494" to the origin of your SmartDesign instance, e.g. "http://crm.company.org".
// The connect parameter is optional and can be omitted when the web app is hosted by SmartDesign.
// (see "Hosted vs. Non-hosted Web Apps" in the web apps documentation).
// Don't forget to adjust the target address with the App Designer or App Editor accordingly:
//   'index.html' (when the app is hosted by SmartDesign)
//   'http://app.company.org' (when app is hosted externally)

connect("http://localhost:9494")
    .then((api) => {
        new Dashboard(api).initialize(window.location.hash);

        api.trackUrlChanges();
    })
    .catch((error) => console.log(error));
