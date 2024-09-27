import styles from "./AuthWrapper.module.css";
import React from "react";

function AuthWrapper({
  children,
  title,
  description,
  helpText,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  helpText?: React.ReactNode;
}) {
  return (
    <div className={styles.wrapper}>
      <div style={{ textAlign: "center" }}>
        <h2 className="title" style={{ marginBottom: "8px" }}>
          {title}
        </h2>
        <p>{description}</p>
      </div>
      {children}
      <p
        style={{
          alignSelf: "start",
        }}
      >
        {/* You already have an account? <Link to="/signin">Log in</Link>
         */}
        {helpText}
      </p>
    </div>
  );
}

export default AuthWrapper;
