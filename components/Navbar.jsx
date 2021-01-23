import React, { useState } from "react";
import {
  AppBar,
  Button,
  Drawer,
  Fab,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
  useScrollTrigger,
  Zoom,
} from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import HomeIcon from "@material-ui/icons/Home";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  zoom: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
  },
}));

const ScrollTop = (props) => {
  const { children } = props;
  const classes = styles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (e) => {
    const anchor = (e.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.zoom}>
        {children}
      </div>
    </Zoom>
  );
};

const Navbar = (props) => {
  const { children } = props;
  const classes = styles();
  const router = useRouter();
  const [anchor, setAnchor] = useState(false);
  const [id, setId] = useState("");
  const [idError, setIdError] = useState("");

  const toggleDrawer = (open) => (e) => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }

    setAnchor(open);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    id === "" ? setIdError(true) : setIdError(false);

    if (id !== "") {
      router.push(`/pokemon/${id.toLowerCase()}`);
      setId("");
    }
  };

  const handleHomeButton = (e) => {
    e.preventDefault();

    router.push(`/`);
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton> */}
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="secondary"
            aria-label="hpme button"
            onClick={(e) => handleHomeButton(e)}
          >
            <HomeIcon />
          </IconButton>
          <Link href="/">
            <Typography className={classes.title} variant="h6" noWrap>
              Pokédex
            </Typography>
          </Link>
          <Paper component="form" className={classes.search}>
            <InputBase
              className={classes.input}
              style={{ color: "#000" }}
              placeholder="Search by Name or #"
              onChange={(e) => setId(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              onClick={(e) => handleSubmit(e)}
            >
              Search
            </Button>
          </Paper>
        </Toolbar>
      </AppBar>
      <div>
        <Drawer anchor="top" open={anchor} onClose={toggleDrawer(false)}>
          <h1>Work in Progress</h1>
        </Drawer>
      </div>
      <Toolbar id="back-to-top-anchor" />
      {children}
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default Navbar;
