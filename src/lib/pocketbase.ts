import PocketBase from "pocketbase";
import Urls from "../redux/actions/Urls";

const pb = new PocketBase(Urls.domain);

export default pb;
