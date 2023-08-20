const express =require('express')

const handleGetTrain = async(req, res) =>{
    const token = req.headers.authorization;
    console.log(token)
    try {
            const type = {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "authorization":
                  `Bearer ${token}`,
              },
            };
            const url = "http://20.244.56.144/train/trains";
          
            try {
              const response = await fetch(url, type);
              const json = await response.json();
              console.log("train data", json);
              return;
            } catch (error) {
              console.log(error);
            }
    } catch (error) {
        console.log(error, "error fetching")
    }
}

module.exports = {handleGetTrain}