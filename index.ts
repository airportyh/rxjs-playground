import * as $ from "jquery";
import { deactivate } from "./activate";

window["$"] = $;
import "./01-of";
import "./02-from";
import "./03-map";
import "./04-filter";
import "./08-pipe";
import "./05-first";
import "./06-take";
import "./06.5-subscribe";
import "./07-distinct-until-changed";
import "./10-from-event";
import "./09-interval";
import "./10-from-event";
import "./11-throttle";
import "./12-debounce";
import "./exercise";

$("#clear-transcript").on("click", () => {
    $("#transcript").html("");
});

$("#deactivate").on("click", deactivate);

