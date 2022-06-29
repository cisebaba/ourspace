function Footer() {
    return (
      <>
        <section className="footer">
        <footer className="text-center text-white">
            <div className="container p-4 pb-0">
            <section className="">
                <p className="d-flex justify-content-center align-items-center">
                <span className="me-3">Register for free!</span>
                <button type="button" to="/signup" className="btn btn-outline-light btn-rounded">
                    <a className="text-white" href="/signup">
                    Signup
                    </a>
                </button>
                </p>
            </section>
            </div>

            <div className="text-center p-3 sub-footer">
            © 2022 Copyright: Bits Please
            </div>
        </footer>
        </section>
      </>
    );
  }
  
  export default Footer;