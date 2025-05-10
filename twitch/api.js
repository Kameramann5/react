import axios from "axios";

//insert your Twitch API key into this variable for the project to works
let API_KEY = "vhlel0y8zu671yx1iephvjps0k99eh";
let api = axios.create({
  headers: {
    "Client-ID": "ciicbxp57ut6cvt2lh4s9b817v8bzt",
    Authorization: "Bearer " + "tr9uawlc3kjukrcei52klcj90qxryo",
  },
});

export default api;
