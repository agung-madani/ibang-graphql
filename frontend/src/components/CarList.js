import { formatDate } from "../lib/formatters";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

function CarList({ cars }) {
  console.log("[CarList] cars:", cars);
  return (
    <List>
      {cars.map((car) => (
        <CarItem key={car.id} car={car} />
      ))}
    </List>
  );
}

function CarItem({ car }) {
  const navigate = useNavigate();
  const title = `${car.year} ${car.model}`;
  return (
    <ListItem>
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <ListItemAvatar>
            <Avatar>
              <DirectionsCarIcon />
            </Avatar>
          </ListItemAvatar>
          <Typography variant="subtitle1" color="textSecondary">
            {formatDate(car.createdAt)}
          </Typography>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            ${car.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            onClick={() => {
              navigate(`/cars/${car.id}`);
            }}
          >
            Details
          </Button>
        </CardActions>
      </Card>
    </ListItem>
  );
}

export default CarList;
