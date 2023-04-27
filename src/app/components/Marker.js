import React, { useState } from "react";
import { InfoBox, Marker } from "@react-google-maps/api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export default function MarkerWithInfoBox({ marker }) {
  const [isOpen, setOpen] = useState();
  const style = {
    position: "absolute",
    top: "12.5%",
    left: "0%",
    width: 400,
    bgcolor: "#dbf4f4",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    whiteSpace: "pre-line",
  };

  return (
    <Marker
      icon={{
        url: marker["url"],
        scaledSize: new google.maps.Size(20, 20),
        origin: new google.maps.Point(0, 0),
      }}
      position={{ lat: marker.Lat, lng: marker.Long }}
      title={marker["Asset Name"] + " \n" + marker["Business Category"]}
      optimized={true}
      onClick={() => setOpen(!isOpen)}
    >
      {isOpen && (
        <InfoBox
          onCloseClick={() => setOpen(false)}
          options={{ closeBoxURL: ``, enableEventPropagation: true }}
        >
          <Modal
            open={isOpen}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {marker["Asset Name"]}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {"Business Category: " + marker["Business Category"] + "\n"}
                {"Region: " + marker["Region"] + "\n"}
                {"Year: " + marker["Year"] + "\n"}
                {"Risk Rating: " + marker["Risk Rating"] + "\n"}
                {"Risk Factors: " +
                  Object.keys(marker["Risk Factors"]).join(", ") +
                  "\n"}
              </Typography>
            </Box>
          </Modal>
        </InfoBox>
      )}
    </Marker>
  );
}
