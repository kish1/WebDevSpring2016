/**
 * Created by kishore on 3/5/16.
 */
"use strict";

function clientReady(){
    gapi.client.setApiKey("AIzaSyCx9cGg3yPKiWiMJyUGRAxKCCg5hlMKOqw");
    gapi.client.load("youtube", "v3", function () {});
}
