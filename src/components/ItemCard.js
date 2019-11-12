import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { ItemRecordContext } from "../context/ItemRecordContext";

const useStyles = makeStyles({
  card: {
    maxWidth: 500
  },
  media: {
    height: 100
  }
});

const ItemCard = ({ item }) => {
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
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {item.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.description.trim().length > 10
              ? item.description
              : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          to={"/edit/" + item.id}
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

export default ItemCard;
