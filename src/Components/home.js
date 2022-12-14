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
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Playfair+Display:wght@800;900&display=swap" rel="stylesheet"></link>

const searchStyle = {display:'flex' , justifyContent:'center'};
const cardStyle = { width:'17rem', borderRadius:'1rem', mb:'1rem'};
const titleStyle = {display:'flex', justifyContent:'center', fontSize:'1.3rem', fontFamily: 'DM Serif Display'};
const signupStyle = {color:'white',position:'absolute', right:'18%', top:'10%', borderRadius:'4rem', border:'2px solid white'
, marginLeft:'1.2rem',textDecoration:'none'};
const loginStyle = {backgroundColor:'white', color:'black', position:'absolute', right:'10%', top:'10%', border:'2px solid white'
, borderRadius:'4rem',textDecoration:'none'};
const tabStyle = {borderRadius:'10rem', backgroundColor:'#eceff1', color:'white', border:'2px solid pink'}


const Home = () => {
  const [recipeData , setRecipeData] = useState([]);
  
  // Tab function start
  const [value, setValue] = useState('dinner');
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  }
  
  useEffect(()=>{
    sendGetRequest();
  },[value])
  
  const sendGetRequest = async () => {
      try {
          await axios.post('https://therecipepool.pythonanywhere.com/api/filter-meal/',
          { meal: value },
          { 
              headers:{
                  'Authorization' : 'Bearer' + localStorage.getItem('accessToken'),
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
          })
          // .then((response) => console.log(response))
          .then(response => setRecipeData(response.data))
          .catch(err => console.log("error in try sGR : ", err));
          // .catch(error => handleError(error));
      } catch (err) {
          console.log("error in sendGetRequest",err);
      }
  };



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
  
  
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    display:'flex' , justifyContent:'center',
    color: theme.palette.text.secondary,
  }));

  const baseURL = 'https://therecipepool.pythonanywhere.com'

  function RenderSteps(props){
    const recipeSteps = props.data;
    const steps = recipeSteps.map(
      (step) => 
      <span key={step.id}>
          <Typography paragraph>
            {step.steps}
            </Typography>
      </span>
    );
    return(
      <> {steps} </> );
  }

  function RenderData(props){
    const recipeDataCopy = props.data;
    // props.data = entire array of recipes
    const recipes = recipeDataCopy.map(
      (recipe) => 
      // enter {} here leads to blank page ???
      <span key={recipe.id}
      style={{display:'inline-block',width:'300px'}}>
    <Grid item  sm={6} md={4} xs={12} >
      <Card sx={cardStyle}>
        <CardMedia
          component="img"
          height="194"
          image={baseURL+recipe.image}
          alt={recipe.label}
          sx={{borderRadius:'0.5rem', margin:'0.8rem', display:'inline-block', width:'90%'}}
        />
        <p style={titleStyle}>{recipe.label}</p>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {recipe.healthLabels}
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
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>

        </CardActions>
        
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
              {<RenderSteps data={recipe.steps_list}/>}

            {/* <Typography paragraph>
            {recipe.steps_list[i].steps}
             </Typography> */}
          </CardContent>
        </Collapse>

        
      </Card>
      </Grid>
      </span>

      );
      return(
      <> {recipes} </> );  
  }


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
          sx={signupStyle}>
          <Link to="/signup" underline="hover ">
                Sign Up
          </Link> 
          </Button>

          <Button variant="text"

          sx={loginStyle}>
          <Link to="/login" underline="hover">
                Login
          </Link>
          </Button>

        </Stack>
        </Toolbar>


        <p style={{display:'flex', justifyContent:'center', fontSize:'2rem', fontFamily: 'Playfair Display'}}>Explore Recipes</p>
      </AppBar>
      
    </Box>

    {/* tabs start */}

    <Box sx={{ maxWidth: '100%', bgcolor: '#424242', p:'1rem' }}>
      <Tabs value={value} centered
      indicatorColor="white"
      textColor="white"
      onChange={handleChange}
      style={{m:'1rem', color:'white'}}>
        <Tab label="Breakfast" value='breakfast' />
        <Tab label="Lunch"  value='lunch' />
        <Tab label="Dinner" value='dinner'  />
      </Tabs>
    </Box>

    {/* cards start */}

    <Box sx={{ flexGrow: 1, backgroundColor:'#424242'}}>
      <Grid container spacing={{sm:2,md:4,lg:5}} 
      sx={{p:'2rem 2rem 0rem 5rem', position:'relative',top:'1.5rem'}}>
        
        <RenderData data={recipeData}/>
        
      </Grid>
    </Box>

    </>

  );
};

export default Home;
