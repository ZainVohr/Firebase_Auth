import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Spin } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { UserAuth } from "../Context/AuthContext";
const SignIn = () => {
  const { googleSignIn } = UserAuth();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const [userCredentials, setuserCredentials] = useState([]);
  const [loading, setloading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    // setloading(true);
    // if (loading) {
    //   return <Spin size="large" />;
    // }
    if (token) {
      navigate("/");
    }
  });
  // setloading(false);
  const onFinish = async (values) => {
    // try {
    //   console.log("Received values of form: ", values);
    //    signInWithEmailAndPassword(auth, values.email, values.password)
    //     .then((user) => {
    //       console.log(user);
    //       setuserCredentials(user);
    //       localStorage.setItem("token", user.user.accessToken);
    //       localStorage.setItem("user", JSON.stringify(user));
    //       console.log(userCredentials, "userstte");
    //       navigate("/");
    //       // console.log(userCredentials.user.accessToken, "asdsad");
    //     })
    //     .catch((error) => {
    //       toast.error("Invalid Credentials");
    //       console.log(error);
    //     });
    //   // const user = userCredentials.user;
    // } catch (error) {
    //   console.log(error);
    // }
    try {
      console.log("Received values of form: ", values);

      const userCredentials = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      console.log(userCredentials);
      setuserCredentials(userCredentials);
      localStorage.setItem("token", userCredentials.user.accessToken);
      localStorage.setItem("user", JSON.stringify(userCredentials));
      console.log(userCredentials, "userstte");
      navigate("/");
    } catch (error) {
      toast.error("Invalid Credentials");
      console.log(error);
    }
  };
  return (
    <div className="login">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
            {
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
            {
              min: 6,
              message: "Length greater than 5",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <div className="googlebtn">
            <GoogleButton onClick={handleGoogleSignIn} />
          </div>
          Or <Link to="/signup">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
export default SignIn;
