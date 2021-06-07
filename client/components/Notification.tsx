import axios from "axios";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { w3cwebsocket as WebSocket } from "websocket";
import { ToastContainer, toast } from "react-toastify";

const client = new WebSocket("ws://localhost:8080", "echo-protocol");

const Notification = () => {
  const notify = () => {
    setInterval(() => {
      // console.log("Every 5 sec it's calling");

      axios
        .get("http://localhost:8080/api/next-call")
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data.message);
            // setCallId(res.data.message);
            client.send(
              JSON.stringify({
                message: res.data,
              })
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 5000);
  };

  useEffect(() => notify(), []);

  useEffect(() => {
    client.onopen = () => {
      console.log("ws connected!");
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data.toString());
      if (!dataFromServer.status) {
        toast("Hey");
        console.log(dataFromServer);
      }
    };
  }, []);

  // useEffect(() => {
  //   client?.send(
  //     JSON.stringify({
  //       type: "message",
  //       msg: callId,
  //     })
  //   );
  // }, []);

  return <ToastContainer />;
};

export default Notification;
