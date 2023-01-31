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
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { motion, useAnimation } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../index.css";
import "../App.css";
import { useInView } from "react-intersection-observer";

<link
  href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Playfair+Display:wght@800;900&display=swap"
  rel="stylesheet"
></link>;
<link
  href="https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap"
  rel="stylesheet"
></link>;

const Home = () => {
  // adding event listener for responsiveness
  const [width, setWindowWidth] = useState(0);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const response = { responsive: width < 1000 };
  const resp = response.responsive;
  //

  const searchStyle = {
    display: "flex",
    justifyContent: resp ? "flex-start" : "center",
  };
  const searchBarStyle = {
    borderRadius: "10rem",
    color: "#eceff1",
    flexShrink: "6",
    display: "inline",
    width: resp ? "40vw" : "35vw",
  };
  const cardStyle = { width: "17rem", borderRadius: "1rem", mb: "1rem" };
  const titleStyle = {
    display: "flex",
    justifyContent: "center",
    fontSize: "1.3rem",
    fontFamily: "DM Serif Display",
  };
  
  const tabStyle = {
    color: "orange",
    fontSize: "1rem",
    fontFamily: "Raleway, sans-serif",
  };

  const [recipeData, setRecipeData] = useState([]);

  // Tab function start
  const [value, setValue] = useState("dinner");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    sendGetRequest();
  }, [value]);

  const sendGetRequest = async () => {
    try {
      await axios
        .post(
          "https://therecipepool.pythonanywhere.com/api/filter-meal/",
          { meal: [value] },
          {
            headers: {
              Authorization: "Bearer" + localStorage.getItem("accessToken"),
              "Content-Type": "application/json",
            },
          },
        )
        .then((response) => setRecipeData(response.data))
        .catch((err) => console.log("error in try sGR : ", err));
    } catch (err) {
      console.log("error in sendGetRequest", err);
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
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    color: theme.palette.text.secondary,
  }));

  const baseURL = "https://therecipepool.pythonanywhere.com";

  function RenderSteps(props) {
    // reicpesteps = steps ka list , step = each step
    const recipeSteps = props.data;
    const steps = recipeSteps.map((step) => (
      <span key={step.id}>
        <Typography paragraph>{step.steps}</Typography>
      </span>
    ));
    return <> {steps} </>;
  }

  // function changeColor(e, recipes) {
  //   const c = recipes.map((recipe) => (
  //     <span key={recipe.id}>
  //       recipe.id = e.currentTarget.id ? setLikeClr(!likeclr) :
  //       setLikeClr(likeclr)
  //     </span>
  //   ));
  //   return c;
  // }

  const { ref, inView } = useInView({
    threshold: 0.2,
  });
  const animation = useAnimation();
  useEffect(() => {
    if (inView) {
      animation.start({
        x: 0,
        transition: { type: "spring", duration: 1, bounce: 0.3 },
      });
    }
    if (!inView) {
      animation.start({ x: "-100vw" });
    }
  }, [inView]);

  const [likeclr, setLikeClr] = useState(false);
  const [selectedOperationId, selectOperation] = useState(-1);
  const [selected, setSelected] = useState([]);

  const handleLike = (recipeId, likeId) => {
    if (recipeId == likeId) {
      setSelected([...new Set(selected.concat([likeId]))]);
      selectOperation(likeId);
      console.log(selected);
      console.log(selectedOperationId);
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  function RenderData() {
    // const recipeDataCopy = props.data;
    // props.data = entire array of recipes

    const recipes = recipeData.map((recipe) => (
      // enter {} here leads to blank page ???
      <span key={recipe.id} style={{ display: "inline-block", width: "300px" }}>
        <Grid item sm={6} md={4} xs={12} onLoad={() => setIsLoading(false)}>
          <Card sx={cardStyle}>
            <CardMedia
              component="img"
              height="194"
              image={baseURL + recipe.image}
              alt={recipe.label}
              sx={{
                borderRadius: "0.5rem",
                margin: "0.8rem",
                display: "inline-block",
                width: "90%",
              }}
            />
            <p style={titleStyle}>{recipe.label}</p>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {recipe.healthLabels}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                {selectedOperationId in selected ? (
                  <FavoriteIcon
                    id={recipe.id}
                    style={{ color: "red" }}
                    onClick={(e) => {
                      handleLike(recipe.id, e.currentTarget);
                    }}
                  />
                ) : (
                  <FavoriteIcon
                    id={recipe.id}
                    style={{ color: "#bdbdbd" }}
                    onClick={(e) => {
                      handleLike(recipe.id, e.currentTarget);
                    }}
                  />
                )}
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
                {<RenderSteps data={recipe.steps_list} />}
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </span>
    ));
    return <> {recipes} </>;
  }

  const LoginButton = styled(Button)({
    backgroundColor: "white",
    position: "absolute",
    right: resp ? "12vw" : "10vw",
    top: "2vh",
    borderRadius: "3rem",
    marginLeft: "1.2rem",
    textDecoration: "none",
    p:'7px',
    "&:hover": { backgroundColor: "orange", color: "white" },
  });

  const SignupButton = styled(Button)({
    backgroundColor: "white",
    position: "absolute",
    right: resp ? "23vw" : "18vw",
    top: "2vh",
    borderRadius: "3rem",
    marginLeft: "1.2rem",
    textDecoration: "none",
    p:'7px',
    "&:hover": { backgroundColor: "orange", color: "white" },
  });

  return (
    <>
      {/* header start */}

      <Box sx={{ flexGrow: 1 }} ref={ref}>
        <AppBar
          position="static"
          sx={{
            background:
              "url('https://media.istockphoto.com/id/1170956682/photo/rolling-pin-with-flour-on-dark-black-baking-background-top-view-copy-space-for-text-menu.jpg?s=612x612&w=0&k=20&c=qvHQl26g3lcoC-Q2WoC72-_ldbnLt51H-QxfAOtRr_A=') no-repeat center ",
            backgroundSize: "cover",
            height: "230px",
            pt: "1%",
          }}
        >
          <Toolbar style={searchStyle}>
            <Search style={searchBarStyle}>
              <SearchIconWrapper>
                <SearchIcon style={{ color: "orange" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search Recipes…"
                inputProps={{ "aria-label": "search" }}
                sx={{ width: "20rem" }}
              />
            </Search>
            <Stack spacing={5} direction="row">

              <SignupButton>
              <Link
                  to="/signup"
                  underline="hover"
                  style={{textDecoration:'none',"&:hover": { backgroundColor: "orange", color: "white" }}}

                >
                  Sign Up
                </Link>
              </SignupButton>

              <LoginButton>
                <Link to="/login" style={{textDecoration:'none'}}>
                  Login
                </Link>
              </LoginButton>              

            </Stack>
          </Toolbar>

          <motion.p
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "2rem",
              color: "orange",
              fontFamily: "Playfair Display",
            }}
            animate={animation}
          >
            Explore Recipes
          </motion.p>
        </AppBar>
      </Box>

      {/* tabs start */}

      <Box sx={{ maxWidth: "100%", bgcolor: "#424242", p: "1rem" }}>
        <Tabs
          value={value}
          centered
          indicatorColor="white"
          textColor="white"
          onChange={handleChange}
          style={{ m: "1rem", color: "white" }}
        >
          <Tab
            label="Breakfast"
            value="breakfast"
            style={tabStyle}
            className={"tabClass"}
          />
          <Tab
            label="Lunch"
            value="lunch"
            style={tabStyle}
            className={"tabClass"}
          />
          <Tab
            label="Dinner"
            value="dinner"
            style={tabStyle}
            className={"tabClass"}
          />
        </Tabs>
      </Box>

      {/* cards start */}

      {/* {isLoading ? (
        <div
          className="dots-7"
          style={{ position: "relative", left: "47vw", top: "10rem" }}
        ></div>
      ) : ( */}
        <Box
          sx={{
            flexGrow: 1,
            backgroundImage:
              "linear-gradient(0deg, #1c1c1c 5%, rgba(246, 139, 26, 0.82) 100%)",
            position: "relative",
            top: "2rem",
          }}
          // onLoad={() => setIsLoading(false)}
        >
          <Grid
            container
            spacing={{ sm: 2, md: 4, lg: 5 }}
            sx={{
              p: "2rem 2rem 0rem 5rem",
              position: "relative",
              top: "1.5rem",
            }}
          >
            <RenderData />
          </Grid>
        </Box>

    </>
  );
};

export default Home;
