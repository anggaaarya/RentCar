import { useEffect } from "react";

import { runFireworks } from "../utils/confetti";

const Success = () => {
  useEffect(() => {
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a
            className="email"
            href="mailto:anggaar3112@gmail.com"
            target="_blank">
            maulidifauzan8@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Success;
