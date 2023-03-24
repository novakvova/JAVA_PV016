import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { APP_ENV } from "../../../env";
import { ILogin } from "../types";

const LoginePage = () => {
  const navigator = useNavigate();

  const [model, setModel] = useState<ILogin>({
    email: "",
    password: "",
  });



  const onChangeHandler = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    //console.log(e.target.name, e.target.value);
    setModel({ ...model, [e.target.name]: e.target.value });
  };


  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        `${APP_ENV.REMOTE_HOST_NAME}account/login`,
        model,
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
        //axios.defaults.headers
      );
      console.log("Login user token", data);
      //navigator("/");
    } catch (error: any) {
      console.log("Щось пішло не так", error);
    }
  };



  return (
    <div className="mx-auto max-w-7xl px-8">
      <div className="p-8 rounded mx-auto max-w-xl">
        <h1 className="font-medium text-3xl text-center">Вхід на сайт</h1>

        <form onSubmit={onSubmitHandler}>
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
                onChange={onChangeHandler}
                value={model.email}
                id="email"
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"

              />
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
                onChange={onChangeHandler}
                value={model.password}
                id="password"
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"

              />
            </div>

             
          </div>
          <div className="space-x-4 mt-8">
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
            >
              Вхід
            </button>
            <Link
              to="/"
              className=""
            >
              Реєстрація
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginePage;
