import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useFormik } from "formik";
import * as Router from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { POST_USER_SIGN_UP_API } from "../../redux/constants";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = (props) => {
  const dispatch = useDispatch();
  const isSignUpSuccess = useSelector(
    (state) => state.MessengerReducer.isSignUpSuccess
  );
  const classes = useStyles();

  if (isSignUpSuccess) {
    props.history.replace("/join/login");
  }
  const formik = useFormik({
    initialValues: {
      fullName: "",
      accountName: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string("Invalid account format").required("Required!"),
      accountName: Yup.string("Invalid account format").required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
    }),
    onSubmit: (values) => {
      dispatch({
        type: POST_USER_SIGN_UP_API,
        values,
      });
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="fullName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Tên"
                autoFocus
                onChange={formik.handleChange}
                value={formik.values.fullname}
              />
              {formik.touched.fullName && formik.errors.fullName ? (
                <div>{formik.errors.fullName}</div>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Tên tài khoản"
                name="accountName"
                onChange={formik.handleChange}
                value={formik.values.accountName}
              />
              {formik.touched.accountName && formik.errors.accountName ? (
                <div>{formik.errors.accountName}</div>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // onClick={handleSubmit}
          >
            Đăng kí để chém
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/join/login" variant="body2" component={Router.Link}>
                Đã có tài khoản để chém? Chém ngay!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
