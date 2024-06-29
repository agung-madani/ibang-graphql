import axios from "axios";
import { useEffect, useState } from "react";
import CarList from "../components/CarList";
import { Container, Typography, AppBar, Toolbar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GRAPHQL_ENDPOINT = "http://localhost:9000/graphql";

const fetchAllCars = async () => {
  const query = `
    query {
      cars {
        id
        model
        year
        price
        description
        createdAt
        company {
          id
          name
          description
        }
      }
    }
  `;

  try {
    const response = await axios.post(GRAPHQL_ENDPOINT, { query });
    return response.data.data.cars;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

function HomePage() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carsData = await fetchAllCars();
        console.log(carsData);
        setCars(carsData);
      } catch (error) {
        console.error("Error fetching cars data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  console.log("[HomePage] cars:", cars);
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Car Listings
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <CarList cars={cars} />
    </Container>
  );
}

export default HomePage;
