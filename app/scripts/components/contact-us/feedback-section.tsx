import React, { useState } from 'react';

const FeedbackSection = ({ register }) => {

  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <div className="">
      <h2 className="heading">Contact Us</h2>
      <h3 className="subheading">We would love to hear from you!</h3>
      <p className="info">
        To get in touch for queries or feedback, just fill out the short form
        below :
      </p>
      <div className="form-input">
        <input
          className="input"
          type="text"
          placeholder="Full Name"
          required
          minLength={2}
          maxLength={50}
          {...register('fullName')}
          autoComplete="chrome-off"
        />
      </div>
      <div className="form-row">
        <div className="form-input">
          <input
            className="input"
            type="email"
            placeholder="Email address"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            title="Invalid email address"
            {...register('email')}
            autoComplete="chrome-off"
          />
        </div>
        <div className="form-input">
          <input
            className="input"
            type="tel"
            placeholder="Mobile No."
            title="No leading zero & should be in 10 digits"
            pattern="^[6-9]\d{9}$"
            required
            {...register('phone')}
            autoComplete="chrome-off"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>
      <p className="tx-left fs-12-13 colorX ff-roboto mobile-info">
        Enter the same mobile number that was used to place order.
      </p>
    </div>
  );
};

export default FeedbackSection;
