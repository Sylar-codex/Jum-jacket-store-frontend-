import React from "react";
import "../../css/footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer-div">
        <div className="returns">
          <p>purchase & returns</p>
          <p>store policy</p>
          <p>payment method</p>
        </div>
        <div className="contacts">
          <p>contact</p>
          <p>123-2542-900</p>
        </div>
        <div className="socials">
          <p>facebook</p>
          <p>instagram</p>
          <p>pinterest</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
