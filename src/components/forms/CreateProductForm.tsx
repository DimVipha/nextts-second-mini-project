
"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import Image from "next/image";
import axios from "axios";
import {baseApi} from "@/constants/baseApi";

const FILE_SIZE = 1024 * 1024 * 5; // 5MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const validationSchema = Yup.object().shape({
  image: Yup.mixed()
    .test("fileSize", "File too large", (value: any) => {
      if (!value) {
        return true;
      }
      return value.size <= FILE_SIZE;
    })
    .test("fileFormat", "Unsupported Format", (value: any) => {
      if (!value) {
        return true;
      }
      return SUPPORTED_FORMATS.includes(value.type);
    })
    .required("Required"),
});

const fieldStyle = "border border-gray-300 rounded-md";

const CreateProductForm = () => {

  const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0MTg4NjYwLCJpYXQiOjE3MTIwMjg2NjAsImp0aSI6IjdmMGE2MGY2ODhiMjQ1MWZiZjk3OTQyMDY2NTY2NWRhIiwidXNlcl9pZCI6MjB9.1xNUsQ8Am2iOUwvi59mMfhmV1QSBgS-7S_TB709YXJk");
myHeaders.append("Cookie", "csrftoken=Up7Re2A1KCVJ7tdDYbD0k4VFDdfjzzeugrS6hOdNq959IDzoFLg6rF17e38ZFNCL; sessionid=koqxxwzvwv0p5hrdr1eqvh7kek9pk4qt");

  const handleSubmitToServer = async (values: any) => {
    // axios is used to make HTTP requests to the server
    try {
      const response = await axios.post(
        `${baseApi}file/product/`,
        values.image
      );
      return response.data.image;
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateProduct = async (values: any, imageData: any) => {
    try {
      const imageUrl = await handleSubmitToServer(imageData);
      console.log("data: ", values);
      const postData = await fetch(`${baseApi}products/`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          ...values,
          image: imageUrl,
        }),
      });
      console.log("post data: ", postData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full mt-8 ml-72 rounded-lg pt-9 bg-gray-100 h-[600px]">
      <Formik
        onSubmit={(values: any, { setSubmitting, resetForm }) => {
          console.log(values);
          const formData = new FormData();
          formData.append("image", values.image);
             handleSubmitToServer({ image: formData });
          handleCreateProduct(values, { image: formData });
          setSubmitting(false);
          resetForm();
        }}
        validationSchema={validationSchema}
        initialValues={{
          category: {
            name: "Hiking shoes",
            icon: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1693342954-rincon-3-64ee5ca62e001.jpg?crop=1xw:1xh;center,top&resize=980:*",
          },
          name: "",
          desc: "",
          image: undefined,
          price: 0,
          quantity: 0,
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="flex m-[30px] flex-col gap-4">
            {/* name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Product Name: </label>
              <Field
                placeholder="T-shirt"
                className={fieldStyle}
                name="name"
                type="text"
              />
              {/* <ErrorMessage name="email">
                {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
              </ErrorMessage> */}
            </div>
            {/* description */}
            <div className="flex flex-col gap-2">
              <label htmlFor="desc">Description: </label>
              <Field
                placeholder="This is a t-shirt"
                className={fieldStyle}
                name="desc"
                type="text"
              />
              {/* <ErrorMessage name="email">
                {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
              </ErrorMessage> */}
            </div>
            {/* price */}
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Price: </label>
              <Field
                placeholder="100"
                className={fieldStyle}
                name="price"
                type="number"
              />
              {/* <ErrorMessage name="email">
                {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
              </ErrorMessage> */}
            </div>
            {/* quantity */}
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Quantity: </label>
              <Field
                placeholder="1"
                className={fieldStyle}
                name="quantity"
                type="number"
              />
              {/* <ErrorMessage name="email">
                {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
              </ErrorMessage> */}

              {/* Image  */}
              <div>
                <Field
                  name="image"
                  className={fieldStyle}
                  type="file"
                  title="Select a file"
                  setFieldValue={setFieldValue} // Set Formik value
                  component={CustomInput} // component prop used to render the custom input
                />
                <ErrorMessage name="image">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-blue-800 text-white rounded-md"
                disabled={isSubmitting}
              >
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProductForm;

// custom Input
function CustomInput({ field, form, setFieldValue, ...props }: any) {
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined
  );
  const name = field.name;
  const onChange: any = (event: any) => {
    console.log("event:", event.currentTarget.files);
    const file = event.currentTarget.files[0];
    setFieldValue(name, file);
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col gap-4 justify-center">
      <input
        type="file"
        onChange={onChange}
        {...props}
        className="border border-gray-300 rounded-md"
      />
      {previewImage && (
        <Image
          className="rounded-md"
          src={previewImage}
          alt="preview Image"
          width={100}
          height={100}
        />
      )}
    </div>
  );
}
