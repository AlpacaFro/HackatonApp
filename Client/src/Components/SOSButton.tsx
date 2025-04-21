


const SOSButton = () => {
  const handleSOSClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(position);
          

          try {
            const response = await fetch("http://localhost:3000/api/sos", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                latitude,
                longitude,
                message: "{User stored phone} triggered an SOS alert!",
              }),
            });

            const data = await response.json();
            console.log("SOS Response:", data);
            alert("SOS alert sent successfully!");
          } catch (error) {
            console.error("Error sending SOS alert:", error);
            alert("Failed to send SOS alert.");
          }
        },
        (error) => {
          console.error("Error retrieving location:", error);
          alert("Failed to retrieve location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <button
      onClick={handleSOSClick}
      className="cursor-pointer "
    >
      סיוע מיידי
    </button>
  );
};

export default SOSButton;
