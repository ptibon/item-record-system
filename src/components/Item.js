import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { ItemRecordContext } from "../context/ItemRecordContext";

const useStyles = makeStyles({
  card: {
    maxWidth: 550,
    minWidth: 420
  },
  media: {
    height: 100
  }
});

const Item = ({ item }) => {
  const classes = useStyles();
  const { dispatch } = useContext(ItemRecordContext);

  const onHandleRemove = id => {
    dispatch({ type: "DELETE_ITEM", payload: id });
  };

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={item.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {item.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          to={`/item/${item.id}/edit`}
          size="small"
          color="primary"
          component={Link}
        >
          Edit
        </Button>
        <Button
          onClick={onHandleRemove.bind(this, item.id)}
          size="small"
          color="secondary"
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default Item;
