// useState hook
import { useState } from "react";

// mdb
import "./assets/mdb.min.css";
import "./assets/mdb.umd.min.js";

// qrcode & html2canvas
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  // State hook to store the value of the QR code
  let [qrValue, setQrValue] = useState("");
  // State hook to store the data URL of the QR code image
  let [qrCopy, setQrCopy] = useState("");

  //  Function to download the QR code image as a PNG file.
  let download = async () => {
    // Convert the canvas to a data URL
    const canvas = await html2canvas(document.getElementById("canvas"));
    const dataURL = await canvas.toDataURL();
    if (dataURL) {
      // Update the QR code data URL state
      setQrCopy(dataURL);
      //  Create a download link element
      let downloadLink = document.createElement("a");
      downloadLink.download = "qrcode.png";
      downloadLink.href = dataURL;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  //  Function to copy the QR code data URL to the clipboard.
  let copy = async () => {
    // Copy the QR code data URL to the clipboard
    await navigator.clipboard.writeText(qrCopy);
    //  Show a toast message indicating the copy operation is complete
    toast("Copy completed successfully");
  };

  return (
    <div
      className="app container d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      {/* Navbar */}
      <nav className="fixed-top bg-primary-color text-white py-3 text-center">
        <h2>QR Code Generator</h2>
      </nav>
      <div className="content w-50 d-flex flex-column align-items-center justify-content-center gap-4 border">
        {/* Text input for QR code value */}
        <div className="form-outline" data-mdb-input-init>
          <input
            type="text"
            id="form12"
            className="form-control border border-primary"
            onChange={(e) => setQrValue(e.target.value)}
          />
          <label className="form-label" htmlFor="form12">
            Type the content you want to convert into a QR code
          </label>
        </div>
        {/* QR code canvas */}
        <div
          id="canvas"
          className="qrcode border border-primary d-flex align-items-center justify-content-center"
        >
          <QRCodeCanvas
            value={qrValue}
            size={200}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"H"}
            includeMargin={false}
            imageSettings={{
              src: "https://static.zpao.com/favicon.png",
              x: undefined,
              y: undefined,
              height: 24,
              width: 24,
              excavate: true,
            }}
          />
        </div>
        {/* Download and copy buttons */}
        <button
          data-mdb-ripple-init
          type="submit"
          className="btn btn-primary btn-block"
        >
          Sign in
        </button>
        <div className="btns d-flex align-items-center justify-content-between w-100">
          <button
            type="button"
            className="btn mx-2 btn-outline-primary d-flex gap-2 align-items-center justify-content-center"
            data-mdb-ripple-init
            onClick={() => download()}
          >
            Download
            <i className="fa-solid fa-file-arrow-down"></i>
          </button>
          <button
            type="button"
            className="btn mx-2 btn-outline-primary d-flex gap-2 align-items-center justify-content-center"
            data-mdb-ripple-init
            onClick={() => copy()}
          >
            Copy
            <i className="fa-solid fa-copy"></i>
          </button>
        </div>
      </div>
      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}
