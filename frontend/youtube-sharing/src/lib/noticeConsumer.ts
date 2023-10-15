import ActionCable from "actioncable";

const URL = "wss://api-local.youtubesharing.com:3001/cable";
const consumer = ActionCable.createConsumer(URL);

export default consumer;
