// import { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import axios from "axios";
// import {
//   Button,
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   CircularProgress,
//   Grid,
//   Paper,
//   styled,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const GRAPHQL_ENDPOINT = "http://localhost:9000/graphql";

// const fetchCarById = async (id) => {
//   const query = `
// query {
//   cars {
//     id
//     model
//     year
//     price
//     description
//     createdAt
//     company {
//       id
//       name
//       description
//     }
//     supplier {
//       availability
//       quantity
//     }
//   }
// }
//   `;

//   try {
//     const response = await axios.post(GRAPHQL_ENDPOINT, { query });
//     return response.data.data.carSupplierCompanyInfo; // Update to match response structure
//   } catch (error) {
//     console.error(`Error fetching car with ID ${id}:`, error);
//     throw error;
//   }
// };

// const BackButton = styled(Button)(({ theme }) => ({
//   marginBottom: theme.spacing(2),
//   backgroundColor: theme.palette.secondary.main,
//   color: theme.palette.secondary.contrastText,
//   "&:hover": {
//     backgroundColor: theme.palette.secondary.dark,
//   },
// }));

// const CardWrapper = styled(Card)(({ theme }) => ({
//   marginBottom: theme.spacing(4),
//   boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
// }));

// const Title = styled(Typography)({
//   marginBottom: "16px",
// });

// const DetailsCard = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   backgroundColor: theme.palette.background.default,
//   boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
// }));

// const AvailabilityText = styled(Typography)(({ theme, available }) => ({
//   backgroundColor: available === "true"
//     ? theme.palette.success.main
//     : theme.palette.error.main,
//   color: theme.palette.common.white,
//   padding: theme.spacing(1),
//   borderRadius: theme.shape.borderRadius,
//   display: "inline-block",
// }));

// function CarPage() {
//   const { id } = useParams();
//   const [car, setCar] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const carData = await fetchCarById(id);
//         console.log(carData);
//         setCar(carData);
//       } catch (error) {
//         console.error("Error fetching car data:", error);
//       }
//     };

//     fetchData();
//   }, [id]);

//   if (!car) {
//     return (
//       <Container>
//         <CircularProgress />
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <BackButton
//         variant="contained"
//         onClick={() => {
//           navigate("/");
//         }}
//       >
//         Back to Home
//       </BackButton>

//       <CardWrapper>
//         <CardContent>
//           <Title variant="h4">
//             {car.car.year} {car.car.model} - {car.car.company.name}
//           </Title>
//           <Typography variant="body2" color="textSecondary">
//             Added: {new Date(car.car.createdAt).toLocaleDateString()}
//           </Typography>
//           <Typography variant="body1" paragraph>
//             {car.car.description}
//           </Typography>
//           <Typography variant="h6">Price: ${car.car.price}</Typography>
//         </CardContent>
//       </CardWrapper>

//       <Grid container spacing={4}>
//         <Grid item xs={12} md={6}>
//           <DetailsCard elevation={0}>
//             <Typography variant="h5" gutterBottom>
//               Company Details
//             </Typography>
//             <Typography variant="body1">
//               <strong>Name:</strong> {car.car.company.name}
//             </Typography>
//             <Typography variant="body2" color="textSecondary" paragraph>
//               {car.car.company.description}
//             </Typography>
//           </DetailsCard>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <DetailsCard elevation={0}>
//             <Typography variant="h5" gutterBottom>
//               Availability
//             </Typography>
//             <AvailabilityText variant="body1" available={car.availability}>
//               {car.availability ? "Available" : "Not Available"}
//             </AvailabilityText>
//             <Typography variant="body1" paragraph>
//               <strong>Quantity:</strong> {car.quantity}
//             </Typography>
//           </DetailsCard>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }

// export default CarPage;

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const GRAPHQL_ENDPOINT = "http://localhost:9000/graphql";

const fetchCarById = async (id) => {
  const query = `
    query ($id: ID!) {
      car(id: $id) {
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
        supplier {
          availability
          quantity
        }
      }
    }
  `;

  try {
    const response = await axios.post(GRAPHQL_ENDPOINT, {
      query,
      variables: { id },
    });
    return response.data.data.car; // Update to match response structure
  } catch (error) {
    console.error(`Error fetching car with ID ${id}:`, error);
    throw error;
  }
};

const BackButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

const CardWrapper = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
}));

const Title = styled(Typography)({
  marginBottom: "16px",
});

const DetailsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
}));

const AvailabilityText = styled(Typography)(({ theme, available }) => ({
  backgroundColor: available === "true"
    ? theme.palette.success.main
    : theme.palette.error.main,
  color: theme.palette.common.white,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  display: "inline-block",
}));

function CarPage() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carData = await fetchCarById(id);
        console.log(carData);
        setCar(carData);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!car) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <BackButton
        variant="contained"
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Home
      </BackButton>

      <CardWrapper>
        <CardContent>
          <Title variant="h4">
            {car.year} {car.model} - {car.company.name}
          </Title>
          <Typography variant="body2" color="textSecondary">
            Added: {new Date(car.createdAt).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" paragraph>
            {car.description}
          </Typography>
          <Typography variant="h6">Price: ${car.price}</Typography>
        </CardContent>
      </CardWrapper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <DetailsCard elevation={0}>
            <Typography variant="h5" gutterBottom>
              Company Details
            </Typography>
            <Typography variant="body1">
              <strong>Name:</strong> {car.company.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              {car.company.description}
            </Typography>
          </DetailsCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <DetailsCard elevation={0}>
            <Typography variant="h5" gutterBottom>
              Availability
            </Typography>
            <AvailabilityText variant="body1" available={car.supplier.availability.toString()}>
              {car.supplier.availability ? "Available" : "Not Available"}
            </AvailabilityText>
            <Typography variant="body1" paragraph>
              <strong>Quantity:</strong> {car.supplier.quantity}
            </Typography>
          </DetailsCard>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CarPage;
