import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Playfair+Display:wght@800;900&display=swap" rel="stylesheet"></link>

const searchStyle = {display:'flex' , justifyContent:'center'};
const cardStyle = { maxWidth: 320 , borderRadius:'1rem', mb:'1rem'};
const titleStyle = {display:'flex', justifyContent:'center', fontSize:'1.3rem', fontFamily: 'DM Serif Display'};
const signupStyle = {color:'white',position:'absolute', right:'18%', top:'10%', borderRadius:'4rem', border:'2px solid white'
, marginLeft:'1.2rem'};
const loginStyle = {backgroundColor:'white', color:'black', position:'absolute', right:'10%', top:'10%', border:'2px solid white'
, borderRadius:'4rem'};

const Home = () => {
  const [recipeData , setRecipeData] = useState([]);
  const [recipe , setRecipe ] = useState(recipeData[0])
  const sendGetRequest = async () => {

      try {
          axios.post('https://therecipepool.pythonanywhere.com/api/filter-meal/',
          { meal:'dinner'},
          {
              headers:{
                  'Authorization' : 'Bearer' + localStorage.getItem('accessToken'),
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
          })
          // .then((response) => console.log(response))
          .then(response => setRecipeData(response.data))
          .catch(err => console.log("error in try sGR : ", err));
      } catch (err) {
          console.log("error in sendGetRequest",err);
      }
  };
  // console.log(recipeData);
  sendGetRequest();

  // header functions start
  
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "20ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  // cards functions start

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  
  const RecipeReviewCard = () => {
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    display:'flex' , justifyContent:'center',
    color: theme.palette.text.secondary,
  }));

  const [like , setLike] = useState(false);

  return (
    <>
    {/* header start */}
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"
      sx={{background: 
        "url('https://media.istockphoto.com/id/1170956682/photo/rolling-pin-with-flour-on-dark-black-baking-background-top-view-copy-space-for-text-menu.jpg?s=612x612&w=0&k=20&c=qvHQl26g3lcoC-Q2WoC72-_ldbnLt51H-QxfAOtRr_A=') no-repeat center ", 
        backgroundSize:'cover',
        height:'230px', pt:'1%'}}>
        <Toolbar style={searchStyle}>

          <Search  sx={{borderRadius:'10rem', color:'#eceff1', flexShrink:'6', display:'inline'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Recipes…"
              inputProps={{ "aria-label": "search" }}
              sx = {{width:'30rem'}}
            />
          </Search>
        <Stack spacing={5} direction="row">
          <Button variant="text"
          sx={signupStyle}>Sign Up </Button>
          <Button variant="outlined"
          sx={loginStyle}>Login </Button>
        </Stack>
        </Toolbar>


        <p style={{display:'flex', justifyContent:'center', fontSize:'2rem', fontFamily: 'Playfair Display'}}>Explore Recipes</p>
      </AppBar>
      
    </Box>

    {/* card start */}
    
    <Box sx={{ flexGrow: 1, backgroundColor:'#424242' }}>
      <Grid container spacing={{sm:2,md:3}} 
      sx={{p:'2rem'}}>
        <Grid item md={3} sm={6} xs={12} >
            <Card sx={cardStyle}>
      <CardMedia
        component="img"
        height="194"
        image={recipeData[0].cuisine.image}
        alt="Paella dish"
        sx={{borderRadius:'0.5rem', margin:'0.8rem', display:'inline-block', width:'90%'}}
      />
      <p style={titleStyle}>Shrimp and Chorizo Paella</p>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteBorderOutlinedIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={RecipeReviewCard.expanded}
          onClick={RecipeReviewCard.handleExpandClick}
          aria-expanded={RecipeReviewCard.expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>

      </CardActions>
      
      <Collapse in={RecipeReviewCard.expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>

      
    </Card>
        </Grid>
      </Grid>
    </Box>

    
    

    </>
  );
};

export default Home;
