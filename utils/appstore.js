import { configureStore } from "@reduxjs/toolkit";
import userdefault from "./userslice";
import feeddefault from "./feedslice"
import connectiondefault from "./conectionslice";
import connectionrequestdefault, { showconnectionrequest } from "./connectionrequestslice";

const appStore=configureStore({
    reducer:{
        user:userdefault,
        feed:feeddefault,
        connections:connectiondefault,
        showconnectionrequest:connectionrequestdefault
    }
});

export default appStore