import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next"; // Import i18next
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Grow,
  Fade,
} from "@mui/material";
import {
  WbSunny,
  Cloud,
  AcUnit,
  Thunderstorm,
  Grain,
  Search,
  WaterDrop,
  Air,
  Brightness2,
  WbSunnyOutlined,
} from "@mui/icons-material";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const { t, i18n } = useTranslation(); // Hook z i18n

  const apiKey = "78ba5d09f6d157e5f7abc3c0f069544d"; // Wstaw swój klucz API

  const getWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (err) {
      setWeatherData(null);
      setError(t("Failed to find city"));
    }
    setLoading(false);
  };

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "Clear":
        return (
          <Grow in={true} timeout={1000}>
            <WbSunny
              sx={{
                fontSize: 80,
                color: darkMode ? "#f39c12" : "#f1c40f",
                animation: "rotate 10s linear infinite", // Animacja obracania
              }}
            />
          </Grow>
        );
      case "Clouds":
        return (
          <Grow in={true} timeout={1000}>
            <Cloud
              sx={{
                fontSize: 80,
                color: darkMode ? "#7f8c8d" : "#bdc3c7",
                animation: "fade 5s ease-in-out infinite", // Animacja migotania
              }}
            />
          </Grow>
        );
      case "Rain":
        return (
          <Grow in={true} timeout={1000}>
            <Grain
              sx={{
                fontSize: 80,
                color: darkMode ? "#3498db" : "#2980b9",
                animation: "bounce 1.5s infinite", // Animacja odbijania
              }}
            />
          </Grow>
        );
      case "Snow":
        return (
          <Grow in={true} timeout={1000}>
            <AcUnit
              sx={{
                fontSize: 80,
                color: darkMode ? "#ecf0f1" : "#95a5a6",
                animation: "spin 3s linear infinite", // Animacja wirowania
              }}
            />
          </Grow>
        );
      case "Thunderstorm":
        return (
          <Grow in={true} timeout={1000}>
            <Thunderstorm
              sx={{
                fontSize: 80,
                color: darkMode ? "#34495e" : "#2c3e50",
                animation: "pulse 2s infinite", // Animacja pulsowania
              }}
            />
          </Grow>
        );
      default:
        return (
          <Grow in={true} timeout={1000}>
            <Cloud
              sx={{
                fontSize: 80,
                color: darkMode ? "#7f8c8d" : "#bdc3c7",
              }}
            />
          </Grow>
        );
    }
  };

  // Funkcja przełączania trybu jasny/ciemny
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Funkcja zmiany języka (z EN na PL i odwrotnie)
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "pl" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: darkMode ? "#2c3e50" : "#ecf0f1",
        color: darkMode ? "#ecf0f1" : "#2c3e50",
        transition: "background-color 0.5s ease, color 0.5s ease",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: "30px",
          borderRadius: "20px",
          background: darkMode
            ? "rgba(0, 0, 0, 0.7)"
            : "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          textAlign: "center",
          color: darkMode ? "#fff" : "#2c3e50",
          width: "300px",
          position: "relative",
          animation: "fadeIn 1s", // Dodana animacja fadeIn
        }}
      >
        {/* Przełączniki języka i trybu jasny/ciemny */}
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Przełącznik trybu jasny/ciemny */}
          <IconButton
            onClick={toggleDarkMode}
            sx={{
              color: darkMode ? "#f39c12" : "#2980b9",
              transition: "transform 0.5s ease", // Animacja przycisku
              "&:hover": {
                transform: "rotate(360deg)", // Obrót na hover
              },
            }}
          >
            {darkMode ? <Brightness2 /> : <WbSunnyOutlined />}
          </IconButton>

          {/* Pogrubiony tekst zmiany języka */}
          <Typography
            onClick={toggleLanguage}
            sx={{
              cursor: "pointer",
              fontWeight: "bold",
              ml: 1,
              color: darkMode ? "#f39c12" : "#2980b9",
              animation: "pulse 2s infinite", // Animacja pulsowania tekstu
            }}
          >
            {i18n.language === "en" ? "PL" : "EN"}{" "}
          </Typography>
        </Box>

        {/* Nazwa aplikacji */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: "20px",
            marginTop: "20px",
            color: darkMode ? "#f1c40f" : "#3498db",
            animation: "fadeInUp 1s ease-in-out", // Animacja pojawiania się tekstu
          }}
        >
          {t("Weather App")}
        </Typography>

        {/* Formularz do wyszukiwania */}
        <form onSubmit={getWeather}>
          <Fade in={true} timeout={1000}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <TextField
                fullWidth
                placeholder={t("Enter city")} // Tłumaczenie placeholdera
                variant="outlined"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                sx={{
                  borderRadius: "50px",
                  backgroundColor: darkMode
                    ? "#34495e"
                    : "rgba(255, 255, 255, 0.8)",
                  color: "#fff",
                  border: "none", // Usunięcie obramowania
                  "& input": {
                    color: darkMode ? "#fff" : "#2c3e50", // Kolor tekstu
                  },
                  animation: "scaleUp 0.5s ease-in-out", // Animacja powiększania
                }}
              />
              <IconButton
                type="submit"
                sx={{
                  marginLeft: "10px",
                  backgroundColor: "#2980b9",
                  color: "#fff",
                  borderRadius: "50%",
                  padding: "10px",
                  "&:hover": { backgroundColor: "#3498db" },
                }}
              >
                <Search />
              </IconButton>
            </Box>
          </Fade>
        </form>

        {/* Wyświetlanie pogody */}
        {loading ? (
          <CircularProgress sx={{ color: "#fff" }} />
        ) : (
          weatherData && (
            <Box>
              <Box>{getWeatherIcon(weatherData.weather[0].main)}</Box>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  fontSize: "50px",
                  marginTop: "10px",
                  animation: "zoomIn 1s ease-in-out", // Animacja zoomu
                }}
              >
                {`${weatherData.main.temp}°C`}
              </Typography>
              <Typography variant="h6">{weatherData.name}</Typography>

              <Grid container spacing={2} sx={{ marginTop: "20px" }}>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <WaterDrop
                      sx={{
                        color: darkMode ? "#00d9ff" : "#3498db",
                        fontSize: "30px",
                        marginRight: "5px",
                        animation: "drop 1s ease-in-out infinite", // Animacja kropli
                      }}
                    />
                    {`${weatherData.main.humidity}%`}
                  </Typography>
                  <Typography variant="body2">{t("Humidity")}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Air
                      sx={{
                        color: darkMode ? "#a0d6f6" : "#3498db",
                        fontSize: "30px",
                        marginRight: "5px",
                        animation: "wind 1s ease-in-out infinite", // Animacja wiatru
                      }}
                    />
                    {`${weatherData.wind.speed} km/h`}
                  </Typography>
                  <Typography variant="body2">{t("Wind Speed")}</Typography>
                </Grid>
              </Grid>
            </Box>
          )
        )}

        {error && (
          <Typography color="error" sx={{ marginTop: "20px" }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Weather;
