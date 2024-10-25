import mqtt from "mqtt";
import { useEffect, useState } from "react";

const Iot = () => {
  const [client, setClient] = useState(null);
  const [isSubed, setIsSub] = useState(false);
  const [isLed, setIsLed] = useState(false);
  const [payload, setPayload] = useState({});
  const [connectStatus, setConnectStatus] = useState("Connect");
  const [checked, setChecked] = useState(false);
  const [messages, setMessages] = useState(false);
  const handleToggle = () => {
    mqttPublish("send");
    setChecked(!checked);
  };
  const onFinish = () => {
    const initialConnectionOptions = {
      protocol: "wss",
      host: "477f457ef11344998de412532af27470.s1.eu.hivemq.cloud",
      clientId: "emqx_react_" + Math.random().toString(16).substring(2, 8),
      port: 8884,
      username: "kianai99",
      password: "thoailap99",
    };
    const { protocol, host, clientId, port, username, password } =
      initialConnectionOptions;
    const url = `${protocol}://${host}:${port}/mqtt`;
    const options = {
      clientId,
      username,
      password,
      clean: true,
      reconnectPeriod: 1000, // ms
      connectTimeout: 30 * 1000, // ms
    };
    setConnectStatus("Connecting");
    setClient(mqtt.connect(url, options));
  };
  useEffect(() => {
    onFinish();
  }, []);

  // useEffect(() => {
  //   console.log(messages);
  // }, [messages]);

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        setConnectStatus("Connected");
      });
      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });
      client.on("reconnect", () => {
        setConnectStatus("Reconnecting");
      });
      client.on("message", (topic, message) => {
        const payload = { topic, message: message.toString() };
        console.log(payload.message);
        if (payload.message) {
          const obj = JSON.parse(payload.message);
          console.log(obj);
          if (obj.Motor == "On") {
            setMessages(true);
            setChecked(true);
          }
          if (obj.Motor == "Off") {
            setMessages(true);
            setChecked(false);
          }
        }
        setPayload(payload);
      });
    }
  }, [client]);

  useEffect(() => {
    console.log(connectStatus);
    if (connectStatus == "Connected") {
      mqttSub();
      mqttPublish();
    }
  }, [connectStatus]);

  const mqttSub = () => {
    if (client) {
      const record = {
        topic: "esp8266_data",
        qos: 0,
      };
      const { topic, qos } = record;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        setIsSub(true);
      });
    }
  };
  const mqttPublish = (payload = '{Check: "Yes" }') => {
    if (client) {
      if (!checked && payload == "send") {
        payload = '{"Motor":"On"}';
      }
      if (checked == true && payload == "send") {
        payload = '{"Motor":"Off"}';
      }
      const record = {
        topic: "led_state",
        qos: 0,
      };

      // topic, QoS & payload for publishing message
      const { topic, qos } = record;
      client.publish(topic, payload, { qos }, (error) => {
        if (error) {
          console.log("Publish error: ", error);
        }
      });
    }
  };

  const qosOption = [
    {
      label: "0",
      value: 0,
    },
    {
      label: "1",
      value: 1,
    },
    {
      label: "2",
      value: 2,
    },
  ];

  let stat = <>Loading....</>;
  if (messages) {
    stat = (
      <>
        <h3>Led</h3>
        <div className="toggle-slider">
          <input
            type="checkbox"
            id="toggle"
            checked={checked}
            onChange={handleToggle}
          />
          <label htmlFor="toggle" className="slider" />
        </div>
      </>
    );
  }

  return <div className="all">{stat}</div>;
};
export default Iot;
