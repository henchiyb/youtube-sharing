import ActionCable from "actioncable";

const URL = "wss://" + process.env.REACT_APP_API_HOST + "/cable";
const consumer = ActionCable.createConsumer(URL);

export default consumer;
