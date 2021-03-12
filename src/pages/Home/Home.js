import React, { useState, useEffect } from "react";
import "./styles.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import SignUp from "./../../components/SignUp";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import {
  FETCH_ACCOUNT_API,
  FETCH_MESSAGES_API,
  GET_USER_STORAGE,
  POST_MESSAGES_API,
  USER_LOGIN,
} from "./../../redux/constants";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      width: "90%",
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [messenger, setMessenger] = useState({
    fullName: "",
    accountName: "",
    messenger: "",
  });
  const [disable, setDisable] = useState(true);
  const messengerList = useSelector(
    (state) => state.MessengerReducer.messengerList
  );

  const credentials = useSelector(
    (state) => state.MessengerReducer.credentials
  );
  let isDisabled = useSelector((state) => state.MessengerReducer.isDisabled);
  useEffect(() => {
    setDisable(isDisabled);
  }, [isDisabled]);

  useEffect(() => {
    dispatch({
      type: FETCH_ACCOUNT_API,
    });
  });

  useEffect(() => {
    dispatch({
      type: FETCH_MESSAGES_API,
    });
    setMessenger(credentials);
  }, []);

  useEffect(() => {
    getCredentialsFromLocal();
  }, []);

  const getCredentialsFromLocal = () => {
    const credentialsStr = localStorage.getItem("credentials");
    if (credentialsStr) {
      dispatch({
        type: GET_USER_STORAGE,
        values: JSON.parse(credentialsStr),
      });
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: POST_MESSAGES_API,
      messenger,
    });
    setMessenger({
      ...messenger,
      messenger: "",
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessenger({
      ...messenger,
      [name]: value,
    });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {console.log("1")}
      <main>
        <section className="glass">
          <div className="container">
            {messengerList.map((item, index) => {
              return messenger.fullName == item.fullName ? (
                <div className="row" key={index}>
                  <div className="col-6 mt-3 d-flex"></div>
                  <div className="col-6 mt-3 text-right">
                    <span className="ml-2 mr-2">{item.messenger}</span>
                    <Avatar
                      className={classes.orange}
                      style={{ display: "inline-flex" }}
                    >
                      {item.fullName.substr(0, 2)}
                    </Avatar>
                  </div>
                </div>
              ) : (
                <div className="row" key={index}>
                  <div className="col-6 mt-3 d-flex">
                    <Avatar className={classes.orange}>
                      {item.fullName.substr(0, 2)}
                    </Avatar>
                    <span className="ml-2 mt-2">{item.messenger}</span>
                  </div>
                  <div className="col-6 text-right mt-3"></div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="btn">
          {credentials?.fullName ? (
            <>
              <a
                onClick={handleOpen}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                Hello bạn, {credentials.fullName}
              </a>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Link onClick={handleOpen} component="a" to="/join/sign-up">
                Đăng kí AHBP
              </Link>
              <Link onClick={handleOpen} component="a" to="/join/login">
                Đăng nhập để chém
              </Link>
            </>
          )}
        </div>
        <div className="glass1">
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="row">
              <div className="col-11">
                <TextField
                  id="outlined-basic"
                  label="Hãy gõ đi nào những anh hùng bàn phím..."
                  variant="outlined"
                  name="messenger"
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  value={messenger.messenger}
                  disabled={disable}
                />
              </div>
              <div className="col-1">
                <button
                  style={{
                    padding: "0.8rem 1.3rem",
                    backgroundColor: "transparent",
                    border: "1px solid #000",
                    borderRadius: "10px",
                  }}
                  onClick={handleSubmit}
                  disabled={disable}
                >
                  Chém
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <div className="circle1"></div>
      <div className="circle2"></div>
    </div>
  );
};

export default Home;
