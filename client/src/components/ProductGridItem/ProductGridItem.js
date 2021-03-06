import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  IconButton,
  CardMedia,
  CardContent,
  Avatar,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import { useState } from 'react';

import {useDispatch} from 'react-redux';


// Icons
// import ChatBubbleOutlineSharpIcon from '@material-ui/icons/ChatBubbleOutlineSharp';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

// Relative imports
import {getOneProduct} from '../../actions/products'
import useStyles from './styles'


function ProductGridItem (props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    // console.log(`clicked first! ${props.productId}`);
    e.preventDefault();
    props.setCurrentProduct(props.product);
    dispatch(getOneProduct(props.product._id));
  }

  const handleAddItem = (e) => {
    /* dispatch(addItemCart(props.product));
    console.log(props.product); */
    var item = props.product;
    console.log(item);
    let cartstring = localStorage.getItem('cart')
    if (!cartstring) {
      cartstring = localStorage.setItem('cart', '[]')
    }
    
    let cart = JSON.parse(cartstring);
    var inCart = false;

    for(var i in cart) {
      if(cart[i]._id === item._id && cart[i].name === item.name){
        inCart = true;
        cart[i].quantity += item.quantity;
        break;
      }
    }
    if(!inCart)
      cart.push(item);

    console.log(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }


    return (
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardActionArea onClick={handleClick}>
              <CardMedia
                className={classes.media}
                image={!props.product.image ? "https://picsum.photos/200/300" : props.product.image}
                title={props.product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {props.product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {props.product.desc}
                </Typography>
              </CardContent>
  
          </CardActionArea>
          <CardActions className={classes.cardActions}>
            <Box className={classes.buyer}>
              <Avatar src={!props.product.avatar ? 'https://i.pinimg.com/originals/5b/c6/e6/5bc6e6b23f963cb859ac7aa748029a78.png' : props.product.avatar} />
  
              <Box ml={2}>
                <Typography variant='h5'>
                  {'₹' + props.product.price}
                </Typography>
              </Box>
            </Box>
  
            <IconButton className={classes.review} onClick={handleAddItem}>
                <AddShoppingCartIcon/>
            </IconButton>
          </CardActions>  
        </Card>
      </Grid>
    );
}

export default withRouter(ProductGridItem);