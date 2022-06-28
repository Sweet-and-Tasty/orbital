import React, { useEffect, useState } from "react";
import axios from "axios";
import { loadUser } from "../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";

const Credit = ({ auth: { user } }) => {
  const [credit, setCredit] = useState(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    loadUser();
    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const res = await axios(`/api/users/${user._id}`, config);
      setCredit(res.data.credits);
      console.log(res.data.credits);
    };
    fetchData();
  }, [user._id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setCredit(credit + Number(value));
    console.log(value.type);
    // const res = await axios.put(
    //     `/api/user/${localStorage.getItem("userId")}`,
    //     { credit: credit + value }
    //     );
    // setCredit(res.data.credit);
  };

  async function handleToken(token, addresses) {
    const response = await axios.post("/checkout", { token });
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  return (
    <div className="fullscreen text-center">
      <div className="mt-40">
        <span class="block font-large text-bold text-2xl text-white-100">
          {user.name} you have {credit} credits remaining
        </span>
        <p class="mt-2  text-xl text-white-300">Amount of credits to top up:</p>
        <form onSubmit={submitHandler} className="text-sm">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <p className="text-xl">Credits</p>
        </form>
        <StripeCheckout
          stripeKey="pk_live_51LFcqeBWcKV8HbRDQImL6P8iGolVQLU9wmbrVx8znXn4uT2vDOy7u75ZAbqwuLlwiW39yE39cU0P6VfF5L53sI9i00KB4uTiZo"
          token={handleToken}
          billingAddress
          shippingAddress
          amount={value * 100}
          name="Credit"
        />
      </div>
    </div>
  );
};

Credit.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Credit);
