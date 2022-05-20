import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Footer() {
  const [date, setDate] = useState({});
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setDate({
      time: new Date().getFullYear(),
    });
  }, [currentUser]);

  return (
    <footer className="footer">
      <p className="footer__author" lang="en">
        &copy; {date.time} Mesto Russia
      </p>
    </footer>
  );
}

export default Footer;
