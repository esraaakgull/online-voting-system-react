const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-3">
      <p className="text-center color-whitesmoke">
        &copy; {currentYear} Online Voting System. Tüm Hakları Saklıdır.
      </p>
    </footer>
  );
};

export default Footer;
