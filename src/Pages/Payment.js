import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Layout from "../Layout";
import {
  PayPalScriptProvider,
  PayPalButtons
  // usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import axios from "axios";
import PrimaryButton from "../Component/PrimaryButton";
import { API_GET_MODELS_URI, DEFAULT_CONFIG } from "../store/Constants";

const Payment = () => {
  // const [{ options }, dispatch] = usePayPalScriptReducer();
  const { t } = useTranslation("common");
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    // const fields = ["display_name", "id"];
    return axios
      .post(API_GET_MODELS_URI, {
        configName: DEFAULT_CONFIG,
        model: "product.product",
        fields: [],
        outputrecords: { fields: [], limit: 1000 }
      })
      .then((resp) => {
        setProducts(resp.data);
        console.log(resp.data);
        return resp.data;
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-start h-full">
        <h1 className="text-xl font-medium mb-6">{t("Subscription Plans")}</h1>
        <div>
          <PayPalScriptProvider
            options={{
              // eslint-disable-next-line no-undef
              "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
              vault: true
            }}>
            <PayPalButtons
              createSubscription={(data, actions) => {
                return actions.subscription
                  .create({
                    plan_id: "P-5J9591155B9749448MMMNQNQ"
                  })
                  .then((orderId) => {
                    // Your code here after create the order
                    return orderId;
                  });
              }}
              style={{
                label: "subscribe"
              }}
            />
          </PayPalScriptProvider>
        </div>
        <div className="grid grid-cols-3 gap-4 overflow-hidden w-full">
          {products.map((product) => (
            <div className="p-2 rounded bg-white" key={product.id}>
              <h2 className="text-xl font-medium">{product.name}</h2>
              <p>Type: {product.type}</p>
              <p>Sales count: {product.sales_count}</p>
              <p>
                Price: {product.list_price} {product.currency_id[1]} + Tax {product.tax_string}
              </p>
              {/* <img
                src={"data:image/jpeg;base64, " + product.image_512}
                alt="..."
                className="w-auto h-10"
              /> */}
              <div className="text-center mt-4">
                <PrimaryButton>Subscribe</PrimaryButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
