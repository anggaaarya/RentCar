import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import CryptoJS from "crypto-js";

export const client = createClient({
  projectId: "uziwszbr", // find this at manage.sanity.io or in your sanity.json
  dataset: "production", // this is from those question during 'sanity init'
  useCdn: false,
  perspective: "published",
  apiVersion: "2023-06-30",
  token:
    "skVHprLJ26loj7NeEj2P7A6yNkFHN4XMQMsDfw1tAcp0GuvdaluiYiUHD7uYq44wgvIvdq6Mz3JLN9j0nlttYVhFxgb89CIrk5mWbRxp4JTPqWi1MFttmUpWnrRzIikNJwpI92Lr5l7DjZPgF8mu6YJwY4t0VLGRUpMemZ0joyfNQlCRKkIV",
});

const builder = imageUrlBuilder(client);

export const urlImg = (resource) => {
  return builder.image(resource);
};

export const getCars = async () => {
  const res = await client.fetch(`*[_type == "cars" ]`);

  return res;
};

export const getCarById = async (id) => {
  const res = await client.fetch(`*[_type == "cars" && _id == '${id}']`);

  return res;
};

const encryptData = (text) => {
  const secretPass = "XkhZG4fW2t2W";
  const data = CryptoJS.AES.encrypt(
    JSON.stringify(text),
    secretPass
  ).toString();

  return data;
};

const decryptData = (text) => {
  const secretPass = "XkhZG4fW2t2W";
  const bytes = CryptoJS.AES.decrypt(text, secretPass);
  const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return data;
};

function transformUser(user) {
  return {
    email: user.email,
    name: user.name,
    username: user.username,
    numberPhone: user.numberPhone,
    _id: user._id,
  };
}

export const login = async (dataForm) => {
  const isUserExist = await client.fetch(
    `*[_type == 'user' &&  email == '${dataForm.email}']`
  );

  if (
    isUserExist.length > 0 &&
    dataForm.password === decryptData(isUserExist[0].password)
  ) {
    localStorage.setItem("user", JSON.stringify(transformUser(isUserExist[0])));
    return transformUser(isUserExist[0]);
  } else {
    return null;
  }
};

export const registerUser = async (dataForm) => {
  delete dataForm["confPassword"];
  const doc = {
    _type: "user",
    ...dataForm,
    password: encryptData(dataForm.password),
  };

  const isUserExist = await client.fetch(
    `*[_type == 'user' &&  email == '${dataForm.email}']`
  );

  if (isUserExist.length > 0) return false;

  const user = await client.create(doc);
  localStorage.setItem("user", JSON.stringify(transformUser(user)));

  if (user._id) {
    return true;
  } else {
    return false;
  }
};

export const setTransaction = async (data) => {
  const docTransaction = {
    _type: "transaction",
    methodPayment: data.methodPayment,
    user: {
      _type: "user",
      _ref: data.idUser,
    },
    car: {
      _type: "car",
      _ref: data.idCar,
    },
  };

  const res = await client.create(docTransaction);
  if (res._id) {
    return { status: true, id: res._id };
  } else {
    return { status: false, id: null };
  }
};

export const getTransactionByIdCar = async (id_car) => {
  const res = await client.fetch(
    `*[_type == "transaction" && statusBooking == true && car._ref in *[_type=="cars" && _id=="${id_car}"]._id ]`
  );

  return res;
};
