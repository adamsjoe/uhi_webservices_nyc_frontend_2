import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Map from "../Map";
import { translateDay } from "../../helpers/translateDay";
import { translateMonth } from "../../helpers/translateMonth";
import { getLargest, getLowest } from "../../helpers/getMaxMinFromData";
import "../../style/Modal.css";

// import SunnyAnimation from "../weatherAnims/sunny/sunny";
// import FogAnimation from "../weatherAnims/fog/fog";

const DailyInfoModal = ({ open, onClose, clickedData, maxTemp, minTemp }) => {
  const [foggy, setFoggy] = useState(false);
  const [goodDay, setGoodDay] = useState(true);
  const [snow, setSnowy] = useState(false);
  const [gusts, setGusts] = useState(false);
  const [rainfall, setRainfall] = useState(false);

  const [isWarmest, setIsWarmest] = useState(false);
  const [isColdest, setIsColdest] = useState(false);

  const [cyclistDeaths, setCyclistDeaths] = useState(false);
  const [motoristDeaths, setMotoristDeaths] = useState(false);
  const [pedestrianDeaths, setPedestrianDeaths] = useState(false);
  const [personDeaths, setPersonDeaths] = useState(false);

  useEffect(() => {
    if (clickedData) {
      setFoggy(clickedData.FOG === 1);
      setSnowy(clickedData.SNDP !== 999.9);
      setGusts(clickedData.GUST !== 999.9);
      setCyclistDeaths(clickedData.CYC_KILL !== 0);
      setMotoristDeaths(clickedData.MOTO_KILL !== 0);
      setPedestrianDeaths(clickedData.PEDS_KILL !== 0);
      setPersonDeaths(clickedData.PERS_KILL !== 0);
      setRainfall(clickedData.PRCP !== 0);
    }
  }, [clickedData]);

  useEffect(() => {
    if (clickedData) {
      if (
        clickedData.CYC_KILL === 0 &&
        clickedData.MOTO_KILL === 0 &&
        clickedData.PEDS_KILL === 0 &&
        clickedData.PERS_KILL === 0
      ) {
        setGoodDay(true);
      } else {
        setGoodDay(false);
      }
    }
  }, [clickedData]);

  useEffect(() => {
    if (maxTemp && clickedData) {
      clickedData.TEMP === maxTemp ? setIsWarmest(true) : setIsWarmest(false);
    }
  }, [clickedData, maxTemp]);

  useEffect(() => {
    if (minTemp && clickedData) {
      clickedData.TEMP === minTemp ? setIsColdest(true) : setIsColdest(false);
    }
  }, [clickedData, minTemp]);

  if (!open || clickedData === null) {
    // Modal is not open or clickedData is null, do not show the modal
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="Detailed Information for day"
      aria-describedby="Contains specific information for the day"
      sx={{
        "& .MuiModal-backdrop": {
          backgroundColor: "rgba(0, 0, 0, 0.75);",
        },
      }}
    >
      <div className="modal-container">
        <Typography id="modal-title" variant="h3">
          Informations for {clickedData.COLLISION_DATE}
          <hr />
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div style={{ paddingRight: "80px" }}>
                <p style={{ paddingLeft: "20px" }}>
                  <br />
                  During {translateDay(clickedData.WEEKDAY)}, &nbsp;
                  {translateMonth(clickedData.MONTH)} {clickedData.DAY},{" "}
                  {clickedData.YEAR} in {clickedData.BOROUGH} there were: <br />
                  <table id="dataTable">
                    <tr>
                      <td></td>
                      <td>Injured</td>
                      <td>Killed</td>
                    </tr>
                    <tr>
                      <td>Cyclists</td>
                      <td>{clickedData.CYC_INJD}</td>
                      {cyclistDeaths === true ? (
                        <td className="alert">{clickedData.CYC_KILL}</td>
                      ) : (
                        <td>{clickedData.CYC_KILL}</td>
                      )}
                    </tr>
                    <tr>
                      <td>Motorists</td>
                      <td>{clickedData.MOTO_INJD}</td>
                      {motoristDeaths === true ? (
                        <td className="alert">{clickedData.MOTO_KILL}</td>
                      ) : (
                        <td>{clickedData.MOTO_KILL}</td>
                      )}
                    </tr>
                    <tr>
                      <td>Pedestrians</td>
                      <td>{clickedData.PEDS_INJD}</td>
                      {pedestrianDeaths === true ? (
                        <td className="alert">{clickedData.PEDS_KILL}</td>
                      ) : (
                        <td>{clickedData.PEDS_KILL}</td>
                      )}
                    </tr>
                    <tr>
                      <td>Persons</td>
                      <td>{clickedData.PERS_INJD}</td>
                      {personDeaths === true ? (
                        <td className="alert">{clickedData.PERS_KILL}</td>
                      ) : (
                        <td>{clickedData.PERS_KILL}</td>
                      )}
                    </tr>
                    <tr>
                      <td>Collisions</td>
                      <td colspan="2">{clickedData.NUM_COLS}</td>
                    </tr>
                  </table>
                  <h5>Weather Report</h5>
                  The temperature was an average of {clickedData.TEMP}&deg;F
                  with the maximmum temperature being {clickedData.MAX}&deg;F
                  and the minumum temperature being {clickedData.MIN}&deg;F. The
                  dewpoint was at {clickedData.DEWP}&deg;F. <br />
                  The visibility was {clickedData.VISIB} miles and there{" "}
                  {foggy === true ? " was fog present." : " was no fog present"}
                  <br /> <br />
                  The windspeed was {clickedData.WDSP} miles per hour, with a
                  maximmum of {clickedData.MXPSD} miles per hour.{" "}
                  {gusts === true
                    ? `Gusts were recorded at ${clickedData.GUST} miles per hour`
                    : `No information for gusts was recorded.`}
                  <br />
                  {snow === true
                    ? `Snow fell today and was ${clickedData.SNDP} deep`
                    : `There was no snow today.`}
                  <br />
                  {rainfall === true
                    ? `The was ${clickedData.PRCP} inches of rain.`
                    : `No rain was recorded today.`}
                  <br />
                  {goodDay === true
                    ? `There were no deaths recorded today.`
                    : `Unfortunately, there were deaths today`}
                  {isWarmest === true
                    ? "Today was the warmest day this month"
                    : ""}
                  {isColdest === true
                    ? "Today was the coldest day this month"
                    : ""}
                </p>
              </div>
            </Grid>
            <Grid item xs={6}>
              <Map pathId={clickedData.BOROUGH} />
            </Grid>
          </Grid>
        </Typography>
        <Button variant="contained" onClick={onClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default DailyInfoModal;
