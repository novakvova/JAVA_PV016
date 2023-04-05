import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { APP_ENV } from "../../../env";
import { AuthUserActionType, IAuthResponse, ILogin, IUser } from "../types";
import * as yup from "yup";
import { useFormik } from "formik";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { AuthUserToken } from "../action";
import GoogleAuth from "../google/GoogleAuth";

const LoginePage = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const navigator = useNavigate();

  const dispatch = useDispatch();

  const initValues: ILogin = {
    email: "",
    password: "",
    reCaptchaToken: ""
  };

  const loginSchema = yup.object({
    email: yup.string().required("Поле не повинне бути пустим"),
    password: yup.string().required("Поле не повинне бути пустим"),
  });


  const onSubmitHandler = async (values: ILogin) => {
    try {
      if(!executeRecaptcha)
        return;
      //Перевірка чи пройшов перевірку гугл, користувач, чи не є він бот  
      values.reCaptchaToken=await executeRecaptcha();

      const resp = await axios.post<IAuthResponse>(
        `${APP_ENV.REMOTE_HOST_NAME}account/login`,
        values
      );
      
      AuthUserToken(resp.data.token, dispatch);

      console.log("Login user token", resp);
      navigator("/");
    } catch (error: any) {
      console.log("Щось пішло не так", error);
    }
  };

  const formik = useFormik({
    initialValues: initValues,
    onSubmit: onSubmitHandler,
    validationSchema: loginSchema,
  });

  const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
    formik;

  return (
    <div className="mx-auto max-w-7xl px-8">
      <div className="p-8 rounded mx-auto max-w-xl">
        <h1 className="font-medium text-3xl text-center">Вхід на сайт</h1>

        <form onSubmit={handleSubmit}>
          <div className="mt-8 grid lg:grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="email"
                className="text-sm text-gray-700 block mb-1 font-medium"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                value={values.email}
                id="email"
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              />
              {errors.email && touched.email && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">{errors.email}</span>
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm text-gray-700 block mb-1 font-medium"
              >
                Пароль
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                id="password"
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              />
              {errors.password && touched.password && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">{errors.password}</span>
                </p>
              )}
            </div>
          </div>
          <div className="space-x-4 mt-8">
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
            >
              Вхід
            </button>
            <Link to="/" className="">
              Реєстрація
            </Link>
            <div className="flex justify-between py-8">
                <GoogleAuth />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginePage;
