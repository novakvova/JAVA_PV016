import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APP_ENV } from "../../../env";
import { ICategoryItem } from "./types";

const AdminHome = () => {

  //Зберігає список категорій
  const [list, setList] = useState<ICategoryItem[]>([]);

  useEffect(() => {
    axios.get<ICategoryItem[]>(`${APP_ENV.REMOTE_HOST_NAME}api/categories`) //запит на сервер
      .then(resp => {
        //const list = resp.data;
        setList(resp.data); //ми змінуємо список на ті дані, які прийшли із сервер
        console.log("Resp server ", resp);
      });
  }, []);

  //useEff
  
  return (
    <>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900">Категорії</h2>
            <div className="my-4">
              <Link
                to="/admin/categories/create"
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
              >
                Додати категорію
              </Link>
            </div>

            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {list.map((category) => (
                <div key={category.id} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                    <div className="picture-main">
                      <img
                        src={
                          `${APP_ENV.REMOTE_HOST_NAME}files/600_` +
                          category.image
                        }
                        alt={category.name}
                        className="picture-container"
                      />
                    </div>
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <a href="#">
                      <span className="absolute inset-0" />
                      {category.name}
                    </a>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminHome;
