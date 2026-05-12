// Navy legal footer. Copy taken verbatim from app.fundsmart.ai footer.
import Logo from "./ui/Logo";

export default function Footer() {
  return (
    <footer className="legal" data-screen-label="Footer">
      <div className="container narrow center">
        <div className="legal-logo">
          <Logo variant="light" className="legal-logo-link" />
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: "72ch", margin: "0 auto" }}>
          Fundsmart AI is an independent credit broker, not a lender. We are not tied to any single
          lender and offer access to a panel of FCA-regulated lenders. We do not charge you any fee
          for our service.
        </p>
        <p
          className="mt-4"
          style={{ fontSize: 14, lineHeight: 1.7, maxWidth: "72ch", margin: "16px auto 0" }}
        >
          By submitting your details, you consent to Fundsmart AI and its lending partners using
          your information to assess your eligibility for business finance products. A soft credit
          search may be conducted which will not affect your credit score.
        </p>
        <p
          className="mt-4"
          style={{ fontSize: 14, lineHeight: 1.7, maxWidth: "72ch", margin: "16px auto 0" }}
        >
          We may receive a commission or fee from lenders when you take out a product. This does not
          affect the rate or terms you receive. We always act in your best interest.
        </p>
        <p className="mt-4" style={{ marginTop: 20 }}>
          <a href="#" onClick={(e) => e.preventDefault()}>
            Privacy Policy
          </a>
        </p>

        <hr className="legal-rule" />

        <div className="legal-meta">
          Fundsmart AI is a trading name of FS AI Technologies Limited.
          <br />
          © 2025 FS AI Technologies Limited
          <br />
          Company Number: 16824563 | ICO: ZC078605
          <br />
          167–169 Great Portland Street, 5th Floor, London, England, W1W 5PF
        </div>
      </div>
    </footer>
  );
}
