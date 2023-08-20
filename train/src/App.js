import logo from "./logo.svg";
import "./App.css";
import {useEffect, useState} from 'react'

function App() {
  // const registerdata = async () => {
  //   const obj = {
  //     companyName: "train scheduler",
  //     ownerName: "Gaurav Panwar",
  //     rollNo: "A60205220105",
  //     ownerEmail: "gauxraavv@gmail.com",
  //     accessCode: "oJnNPG",
  //   };

  //   const type = {
  //     method: "POST",
  //     body: JSON.stringify(obj),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   const url = "http://20.244.56.144/train/register";

  //   try {
  //     const response = await fetch(url, type);
  //     const json = await response.json();
  //     console.log("response", json);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const [train, setTrain] = useState(null)
  
  const getToken = async () => {
    const object = {
      companyName: "train scheduler",
      clientID: "3838b1f4-d270-4843-8c04-18a6db5c7050",
      clientSecret: "ranxGMNCcCdlEBYq",
      ownerName: "Gaurav Panwar",
      ownerEmail: "gauxraavv@gmail.com",
      rollNo: "A60205220105",
    };

    const type = {
      method: "POST",
      body: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const url = "http://20.244.56.144/train/auth";

    try {
      const response = await fetch(url, type);
      const json = await response.json();
      console.log("token", json);
      localStorage.setItem("token_expire", json.expires_in);
      localStorage.setItem("token", json.access_token);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchTrains = async(req, res) => {
    const token = localStorage.getItem("token");
    console.log(token)
    const type = {
      method:'GET', 
      headers:{
        'Content-Type': 'application/json', 
        'authorization':token
      }
    }
    try {
      const response = await fetch('http://localhost:5000/api/getTrains',type);
      const json = await response.json();
      console.log(json);
      setTrain(json);

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    getToken();
  },[])

  return (
    <div className="App">
      <button onClick={fetchTrains}>fetch trains</button>
      <div className="traindata">
      {
        train?(
          train.map((e)=>{
          return <Traincard name = {e.trainName} number = {e.trainNumber} time = {e.departureTime}/>
        })):null
      }
      </div>
    </div>
  );
}

const Traincard = (props)=>{
  return (
    <ul>
      <li>{props.name}</li>
      <li>{props.number}</li>
      <li><ul>
        <li>{props.time.hours}</li>
        <li>{props.time.minutes}</li>
        </ul></li>
    </ul>
  )
}

export default App;
